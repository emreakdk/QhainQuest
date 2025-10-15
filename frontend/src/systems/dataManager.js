// Gerçek Veri Yönetim Sistemi
import { UserStatsManager } from './levelSystem.js';
import { TokenManager } from './tokenSystem.js';

class DataManager {
  constructor(userAddress) {
    this.userAddress = userAddress;
    this.statsManager = new UserStatsManager(userAddress);
    this.tokenManager = new TokenManager(userAddress);
  }

  // Quest tamamlama işlemi
  async completeQuest(questData, performance) {
    try {
      // 1. Seviye sistemi güncelle
      const levelResult = this.statsManager.addQuestCompletion(questData, performance);
      
      // 2. Token ödülü ver
      const tokenResult = await this.tokenManager.awardQuestTokens(
        questData.id, 
        levelResult.tokensGained
      );
      
      // 3. Sertifika ver (eğer gerekiyorsa)
      let certificateResult = null;
      if (this.shouldAwardCertificate(questData, levelResult.newLevel)) {
        certificateResult = await this.awardCertificate(questData);
      }
      
      // 4. Sonuçları birleştir
      return {
        success: true,
        level: {
          leveledUp: levelResult.leveledUp,
          newLevel: levelResult.newLevel,
          xpGained: levelResult.xpGained,
          xpToNextLevel: levelResult.xpToNextLevel
        },
        tokens: {
          gained: levelResult.tokensGained,
          transactionHash: tokenResult.transactionHash,
          newBalance: await this.tokenManager.getBalance()
        },
        certificate: certificateResult ? {
          id: certificateResult.id || 'unknown',
          questId: certificateResult.questId || 'unknown',
          questName: certificateResult.questName || 'Unknown Quest',
          earnedAt: certificateResult.earnedAt || new Date().toISOString(),
          nftUrl: certificateResult.nftUrl || null,
          rarity: certificateResult.rarity || 'common',
          transactionHash: certificateResult.transactionHash || null
        } : null,
        milestones: levelResult.newMilestones,
        stats: this.statsManager.getStats()
      };
    } catch (error) {
      console.error('Quest tamamlama hatası:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Sertifika verme kontrolü
  shouldAwardCertificate(questData, userLevel) {
    // İlk kez tamamlama veya belirli seviye gereksinimleri
    return questData.certificateNftUrl && 
           (userLevel >= 2 || this.statsManager.stats.completedQuests.length === 1);
  }

  // Sertifika verme
  async awardCertificate(questData) {
    try {
      // NFT sertifikası oluştur ve ver
      const certificate = {
        id: `cert_${questData.id}_${Date.now()}`,
        questId: questData.id,
        questName: questData.name,
        earnedAt: new Date().toISOString(),
        nftUrl: questData.certificateNftUrl || null,
        rarity: this.calculateRarity(questData),
        transactionHash: null // Blockchain'den gelecek
      };
      
      // Sertifikayı kullanıcıya ekle
      if (!this.statsManager.stats.certificates) {
        this.statsManager.stats.certificates = [];
      }
      this.statsManager.stats.certificates.push(certificate);
      this.statsManager.saveStats();
      
      return {
        id: certificate.id || 'unknown',
        questId: certificate.questId || 'unknown',
        questName: certificate.questName || 'Unknown Quest',
        title: certificate.title || certificate.questName || 'Sertifika',
        description: certificate.description || `${certificate.questName || 'Quest'} başarıyla tamamlandı`,
        category: certificate.category || 'Blockchain',
        rarity: certificate.rarity || 'Common',
        completedAt: certificate.completedAt || null,
        earnedAt: certificate.earnedAt || new Date().toISOString(),
        nftUrl: certificate.nftUrl || null,
        transactionHash: certificate.transactionHash || null
      };
    } catch (error) {
      console.error('Sertifika verme hatası:', error);
      return null;
    }
  }

  // Sertifika nadirliği hesapla
  calculateRarity(questData) {
    if (questData.difficulty === 'advanced') return 'legendary';
    if (questData.difficulty === 'intermediate') return 'rare';
    return 'common';
  }

  // Kullanıcı dashboard verileri
  async getDashboardData() {
    try {
      const [stats, tokenStats, recentActivity] = await Promise.all([
        this.getUserStats(),
        this.tokenManager.getTokenStats(),
        this.getRecentActivity()
      ]);

      return {
        stats,
        tokenStats,
        recentActivity,
        achievements: this.getRecentAchievements(),
        levelProgress: this.getLevelProgress(stats),
        streakInfo: this.getStreakInfo(stats)
      };
    } catch (error) {
      console.error('Dashboard veri alma hatası:', error);
      return this.getDefaultDashboardData();
    }
  }

  // Kullanıcı istatistikleri
  getUserStats() {
    return this.statsManager.getStats();
  }

  // Son aktiviteler
  async getRecentActivity() {
    try {
      const tokenHistory = await this.tokenManager.getTokenHistory();
      const questHistory = this.statsManager.stats.questHistory || [];
      
      // Son 10 aktiviteyi birleştir ve sırala
      const activities = [
        ...(tokenHistory || []).slice(0, 5).map(tx => ({
          type: 'token',
          id: tx?.id || 'unknown',
          title: this.getTokenActivityTitle(tx) || 'Token İşlemi',
          description: this.getTokenActivityDescription(tx) || 'Token işlemi gerçekleştirildi',
          timestamp: tx?.timestamp || new Date().toISOString(),
          amount: tx?.amount || 0,
          status: tx?.status || 'completed'
        })),
        ...questHistory.slice(0, 5).map(quest => ({
          type: 'quest',
          id: quest?.id || 'unknown',
          title: `Quest Tamamlandı: ${quest?.name || 'Unknown Quest'}`,
          description: `${quest?.xpGained || 0} XP ve ${quest?.tokensGained || 0} token kazandınız`,
          timestamp: quest?.completedAt || new Date().toISOString(),
          xp: quest?.xpGained || 0,
          tokens: quest?.tokensGained || 0
        }))
      ];
      
      return activities
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 10);
    } catch (error) {
      console.error('Son aktivite alma hatası:', error);
      return [];
    }
  }

  getTokenActivityTitle(tx) {
    if (!tx || typeof tx !== 'object') return 'Token İşlemi';
    switch (tx.type) {
      case 'earned': return 'Token Kazandınız';
      case 'transferred': return 'Token Transfer';
      case 'withdrawn': return 'Cüzdana Çekim';
      default: return 'Token İşlemi';
    }
  }

  getTokenActivityDescription(tx) {
    if (!tx || typeof tx !== 'object') return 'Token işlemi gerçekleşti';
    switch (tx.type) {
      case 'earned': return `Quest tamamlama ödülü: ${tx.amount || 0} CQT`;
      case 'transferred': return `${tx.amount || 0} CQT transfer edildi`;
      case 'withdrawn': return `${tx.amount || 0} CQT cüzdanınıza aktarıldı`;
      default: return 'Token işlemi gerçekleşti';
    }
  }

  // Son başarılar
  getRecentAchievements() {
    return this.statsManager.stats.achievements.slice(-5);
  }

  // Seviye ilerlemesi
  getLevelProgress(stats) {
    return {
      currentLevel: stats.level,
      currentXP: stats.totalXP,
      xpToNextLevel: stats.xpToNextLevel,
      levelProgress: stats.levelProgress,
      levelData: stats.levelData
    };
  }

  // Streak bilgileri
  getStreakInfo(stats) {
    return {
      dailyStreak: stats.dailyStreak,
      weeklyStreak: stats.weeklyStreak,
      monthlyStreak: stats.monthlyStreak,
      lastActiveDate: stats.lastActiveDate,
      bestStreak: stats.performanceStats.bestStreak
    };
  }

  // Varsayılan dashboard verisi
  getDefaultDashboardData() {
    return {
      stats: {
        level: 1,
        totalXP: 0,
        totalTokens: 0,
        completedQuests: [],
        perfectScores: 0,
        dailyStreak: 0,
        certificates: []
      },
      tokenStats: {
        currentBalance: 0,
        totalEarned: 0,
        totalTransferred: 0,
        totalWithdrawn: 0,
        transactionCount: 0
      },
      recentActivity: [],
      achievements: [],
      levelProgress: {
        currentLevel: 1,
        currentXP: 0,
        xpToNextLevel: 100,
        levelProgress: 0
      },
      streakInfo: {
        dailyStreak: 0,
        weeklyStreak: 0,
        monthlyStreak: 0,
        bestStreak: 0
      }
    };
  }

  // Performans grafikleri için veri
  getPerformanceData() {
    const stats = this.statsManager.stats;
    
    // Son 30 günün verileri
    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      last30Days.push({
        date: dateString,
        xp: 0, // Gerçek implementasyonda günlük XP verileri
        tokens: 0, // Gerçek implementasyonda günlük token verileri
        questsCompleted: 0 // Gerçek implementasyonda günlük quest verileri
      });
    }
    
    // Kategori bazlı istatistikler
    const categoryStats = {
      blockchain: { completed: 0, totalXP: 0, totalTokens: 0 },
      'smart-contracts': { completed: 0, totalXP: 0, totalTokens: 0 },
      defi: { completed: 0, totalXP: 0, totalTokens: 0 },
      nft: { completed: 0, totalXP: 0, totalTokens: 0 }
    };
    
    // Zorluk bazlı istatistikler
    const difficultyStats = {
      beginner: { completed: 0, totalXP: 0, totalTokens: 0 },
      intermediate: { completed: 0, totalXP: 0, totalTokens: 0 },
      advanced: { completed: 0, totalXP: 0, totalTokens: 0 }
    };
    
    return {
      dailyProgress: last30Days,
      categoryStats,
      difficultyStats,
      overallStats: {
        totalQuests: stats.completedQuests.length,
        perfectScores: stats.perfectScores,
        averageScore: stats.performanceStats.averageScore,
        totalTimeSpent: stats.totalTimeSpent,
        certificates: stats.certificates.length
      }
    };
  }

  // Veri temizleme (test için)
  clearUserData() {
    localStorage.removeItem(`chainquest_stats_${this.userAddress}`);
    localStorage.removeItem(`chainquest_balance_${this.userAddress}`);
  }
}

// Export the class
export { DataManager };

// Hook olarak kullanım
export const useDataManager = (userAddress) => {
  if (!userAddress) {
    return {
      completeQuest: () => Promise.resolve({ success: false }),
      getDashboardData: () => Promise.resolve({}),
      getUserStats: () => ({}),
      getPerformanceData: () => ({})
    };
  }

  const dataManager = new DataManager(userAddress);
  
  return {
    completeQuest: (questData, performance) => dataManager.completeQuest(questData, performance),
    getDashboardData: () => dataManager.getDashboardData(),
    getUserStats: () => dataManager.getUserStats(),
    getPerformanceData: () => dataManager.getPerformanceData(),
    clearUserData: () => dataManager.clearUserData()
  };
};
