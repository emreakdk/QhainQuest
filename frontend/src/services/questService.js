import { sorobanClient } from './sorobanClient';

class QuestService {
  constructor() {
    this.cache = new Map(); // Quest verilerini cache'lemek için
    this.cacheTimeout = 5 * 60 * 1000; // 5 dakika
    this.maxCacheSize = 50; // Maksimum cache boyutu
  }

  // Cache boyutunu kontrol et ve gereksizleri temizle
  _cleanupCache() {
    if (this.cache.size > this.maxCacheSize) {
      const entries = Array.from(this.cache.entries());
      // En eski %20'yi sil
      const toDelete = entries.slice(0, Math.floor(entries.length * 0.2));
      toDelete.forEach(([key]) => this.cache.delete(key));
    }
  }

  // Tüm quest'leri getir (cache'li)
  async getAllQuests() {
    const cacheKey = 'all_quests';
    
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }
    }

    try {
      const quests = await sorobanClient.getAllQuests();
      this.cache.set(cacheKey, {
        data: quests,
        timestamp: Date.now()
      });
      this._cleanupCache();
      return quests;
    } catch (error) {
      console.error('Questler yuklenirken hata:', error);
      return [];
    }
  }

  // Belirli bir quest'i getir
  async getQuest(questId) {
    const cacheKey = `quest_${questId}`;
    
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }
    }

    try {
      const quest = await sorobanClient.getQuest(questId);
      this.cache.set(cacheKey, {
        data: quest,
        timestamp: Date.now()
      });
      return quest;
    } catch (error) {
      console.error('Quest yuklenirken hata:', error);
      return null;
    }
  }

  // Kullanıcının quest'teki ilerlemesini getir
  async getUserProgress(userAddress, questId) {
    try {
      return await sorobanClient.getUserProgress(userAddress, questId);
    } catch (error) {
      console.error('Kullanici ilerlemesi alinirken hata:', error);
      return 0;
    }
  }

  // Kullanıcının tüm quest'lerdeki ilerlemesini getir
  async getAllUserProgress(userAddress) {
    try {
      const quests = await this.getAllQuests();
      const progressMap = new Map();

      for (const quest of quests) {
        const progress = await this.getUserProgress(userAddress, quest.id);
        progressMap.set(quest.id, progress);
      }

      return progressMap;
    } catch (error) {
      console.error('Tum kullanici ilerlemeleri alinirken hata:', error);
      return new Map();
    }
  }

  // Kullanıcının sertifika durumunu kontrol et
  async hasCertificate(userAddress, questId) {
    try {
      return await sorobanClient.hasCertificate(userAddress, questId);
    } catch (error) {
      console.error('Sertifika kontrolu yapilirken hata:', error);
      return false;
    }
  }

  // Kullanıcının tüm sertifikalarını getir
  async getAllUserCertificates(userAddress) {
    try {
      const quests = await this.getAllQuests();
      const certificates = [];

      for (const quest of quests) {
        const hasCert = await this.hasCertificate(userAddress, quest.id);
        if (hasCert) {
          certificates.push({
            ...quest,
            completedAt: new Date().toISOString(), // Gerçek implementasyonda blockchain'den gelecek
            nftId: `${userAddress}_${quest.id}` // Mock NFT ID
          });
        }
      }

      return certificates;
    } catch (error) {
      console.error('Kullanici sertifikalari alinirken hata:', error);
      return [];
    }
  }

  // Cevap gönder
  async submitAnswer(userAddress, questId, lessonId, answer) {
    try {
      const result = await sorobanClient.submitAnswer(userAddress, questId, lessonId, answer);
      
      // Cache'i temizle çünkü ilerleme değişti
      this.cache.delete(`quest_${questId}`);
      this.cache.delete('all_quests');
      
      return result;
    } catch (error) {
      console.error('Cevap gonderilirken hata:', error);
      throw error;
    }
  }

  // Kullanıcı istatistiklerini hesapla
  async getUserStats(userAddress) {
    try {
      const [allQuests, allProgress, allCertificates, tokenBalance] = await Promise.all([
        this.getAllQuests(),
        this.getAllUserProgress(userAddress),
        this.getAllUserCertificates(userAddress),
        sorobanClient.getUserTokenBalance(userAddress)
      ]);

      let totalTokens = 0;
      let completedQuests = 0;

      for (const quest of allQuests) {
        const progress = allProgress.get(quest.id) || 0;
        if (progress >= quest.lessons.length) {
          completedQuests++;
          totalTokens += quest.rewardAmount || 100;
        }
      }

      const level = Math.floor(completedQuests / 2) + 1; // Her 2 quest'te 1 level

      return {
        totalTokens: Math.max(totalTokens, tokenBalance), // Blockchain'den gelen gerçek bakiye
        certificates: allCertificates.length,
        completedQuests,
        level,
        totalQuests: allQuests.length
      };
    } catch (error) {
      console.error('Kullanici istatistikleri hesaplanirken hata:', error);
      return {
        totalTokens: 0,
        certificates: 0,
        completedQuests: 0,
        level: 1,
        totalQuests: 0
      };
    }
  }

  // Quest durumunu belirle
  getQuestStatus(quest, progress) {
    if (progress >= quest.lessons.length) {
      return 'completed';
    } else if (progress > 0) {
      return 'in-progress';
    } else {
      return 'available';
    }
  }

  // Cache'i temizle
  clearCache() {
    this.cache.clear();
  }

  // Belirli bir quest'in cache'ini temizle
  clearQuestCache(questId) {
    this.cache.delete(`quest_${questId}`);
  }
}

// Singleton instance
export const questService = new QuestService();
export default questService;
