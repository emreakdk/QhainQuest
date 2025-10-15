import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { questService } from '../services/questService';
import { questDatabase } from '../data/questData';
import { useDataManager } from '../systems/dataManager.js';
import { LevelCalculator } from '../systems/levelSystem.js';

const QuestContext = createContext();

export const QuestProvider = ({ children }) => {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userProgress, setUserProgress] = useState(new Map());
  const [userStats, setUserStats] = useState(null);
  const [userCertificates, setUserCertificates] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Quest'leri yükle - useCallback ile optimize edildi
  const loadQuests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Gerçek verileri kullan
      setQuests(questDatabase);
    } catch (err) {
      setError('Quest\'ler yüklenirken hata oluştu');
      console.error('Quest yükleme hatası:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Kullanıcı ilerlemesini yükle - useCallback ile optimize edildi
  const loadUserProgress = useCallback(async (userAddress) => {
    if (!userAddress) {
      setCurrentUser(null);
      setUserProgress(new Map());
      setUserStats(null);
      setUserCertificates([]);
      return;
    }
    
    try {
      setCurrentUser(userAddress);
      
      // Gerçek veri yöneticisini kullan
      const { DataManager } = await import('../systems/dataManager.js');
      const dataManager = new DataManager(userAddress);
      const stats = dataManager.getUserStats();
      
      setUserStats(stats);
      
      // Sertifikaları güvenli hale getir
      const safeCertificates = Array.isArray(stats.certificates) ? stats.certificates.map(cert => ({
        id: cert?.id || 'unknown',
        questId: cert?.questId || 'unknown',
        questName: cert?.questName || 'Unknown Quest',
        title: cert?.title || cert?.questName || 'Sertifika',
        description: cert?.description || `${cert?.questName || 'Quest'} başarıyla tamamlandı`,
        category: cert?.category || 'Blockchain',
        rarity: cert?.rarity || 'Common',
        completedAt: cert?.completedAt || null,
        earnedAt: cert?.earnedAt || new Date().toISOString(),
        nftUrl: cert?.nftUrl || null,
        transactionHash: cert?.transactionHash || null
      })) : [];
      
      setUserCertificates(safeCertificates);
      
      // Progress map'i oluştur
      const progressMap = new Map();
      if (stats.questHistory) {
        stats.questHistory.forEach(quest => {
          progressMap.set(quest.id, quest);
        });
      }
      setUserProgress(progressMap);
      
    } catch (err) {
      console.error('Kullanıcı verileri yüklenirken hata:', err);
      setError('Kullanıcı verileri yüklenemedi');
    }
  }, []);

  // Cevap gönder - useCallback ile optimize edildi
  const submitAnswer = useCallback(async (userAddress, questId, lessonId, answer, performance = {}) => {
    try {
      if (!userAddress) {
        throw new Error('Kullanıcı adresi bulunamadı');
      }

      // Quest verilerini al
      const quest = quests.find(q => q.id === questId);
      if (!quest) {
        throw new Error('Quest bulunamadı');
      }

      // Sadece quest tamamlandığında completeQuest çağır
      if (lessonId === quest.lessons.length - 1) {
        // Gerçek veri yöneticisini kullan
        const { DataManager } = await import('../systems/dataManager.js');
        const dataManager = new DataManager(userAddress);
        
        // Quest tamamlama işlemini gerçekleştir
        const result = await dataManager.completeQuest(quest, performance);
      
      if (result.success) {
        // Context state'ini güncelle
        setUserStats(result.stats);
        
        // Progress'i güncelle
        setUserProgress(prev => {
          const newProgress = new Map(prev);
          newProgress.set(questId, {
            currentStep: quest.lessons.length,
            totalSteps: quest.lessons.length,
            progress: 100,
            completed: true,
            completedAt: new Date().toISOString(),
            xpGained: result.level.xpGained,
            tokensGained: result.tokens.gained
          });
          return newProgress;
        });

        // Sertifikaları güncelle
        if (result.certificate) {
          setUserCertificates(prev => {
            const current = Array.isArray(prev) ? prev : [];
            // Sertifika objesini güvenli şekilde ekle
            const safeCertificate = {
              id: result.certificate.id || 'unknown',
              questId: result.certificate.questId || 'unknown',
              questName: result.certificate.questName || 'Unknown Quest',
              title: result.certificate.title || result.certificate.questName || 'Sertifika',
              description: result.certificate.description || `${result.certificate.questName || 'Quest'} başarıyla tamamlandı`,
              category: result.certificate.category || 'Blockchain',
              rarity: result.certificate.rarity || 'Common',
              completedAt: result.certificate.completedAt || null,
              earnedAt: result.certificate.earnedAt || new Date().toISOString(),
              nftUrl: result.certificate.nftUrl || null,
              transactionHash: result.certificate.transactionHash || null
            };
            return [...current, safeCertificate];
          });
        }
        
        return result;
      }
      } else {
        // Sadece cevap kaydedildi, quest tamamlanmadı
        return { success: true };
      }
    } catch (err) {
      console.error('Cevap gönderme hatası:', err);
      throw err;
    }
  }, [quests]);

  // Quest durumunu getir - useMemo ile optimize edildi
  const getQuestStatus = useCallback((quest) => {
    const progress = userProgress.get(quest.id) || 0;
    return questService.getQuestStatus(quest, progress);
  }, [userProgress]);

  // Quest ilerlemesini getir - useMemo ile optimize edildi
  const getQuestProgress = useCallback((quest) => {
    const progress = userProgress.get(quest.id) || 0;
    return {
      currentStep: progress,
      totalSteps: quest.lessons.length,
      progress: quest.lessons.length > 0 ? (progress / quest.lessons.length) * 100 : 0
    };
  }, [userProgress]);

  // Quest tamamlanmış mı kontrol et - useMemo ile optimize edildi
  const isQuestCompleted = useCallback((quest) => {
    return getQuestStatus(quest) === 'completed';
  }, [getQuestStatus]);

  // Kullanıcının sertifikası var mı kontrol et - useMemo ile optimize edildi
  const hasCertificate = useCallback((questId) => {
    return userCertificates.some(cert => cert.questId === questId);
  }, [userCertificates]);

  // Cache'i temizle - useCallback ile optimize edildi
  const refreshData = useCallback(async (userAddress) => {
    questService.clearCache();
    await loadQuests();
    if (userAddress) {
      await loadUserProgress(userAddress);
    }
  }, [loadQuests, loadUserProgress]);

  // İlk yükleme
  useEffect(() => {
    loadQuests();
  }, [loadQuests]);

  // Context value'yu useMemo ile optimize et
  const value = useMemo(() => ({
    // State
    quests,
    loading,
    error,
    userProgress,
    userStats,
    userCertificates,
    
    // Actions
    loadQuests,
    loadUserProgress,
    submitAnswer,
    refreshData,
    
    // Helpers
    getQuestStatus,
    getQuestProgress,
    isQuestCompleted,
    hasCertificate
  }), [
    quests,
    loading,
    error,
    userProgress,
    userStats,
    userCertificates,
    loadQuests,
    loadUserProgress,
    submitAnswer,
    refreshData,
    getQuestStatus,
    getQuestProgress,
    isQuestCompleted,
    hasCertificate
  ]);

  return (
    <QuestContext.Provider value={value}>
      {children}
    </QuestContext.Provider>
  );
};

export const useQuest = () => {
  const context = useContext(QuestContext);
  if (!context) {
    throw new Error('useQuest must be used within a QuestProvider');
  }
  return context;
};
