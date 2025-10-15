// Seviye Sistemi ve Kuralları
export const LEVEL_SYSTEM = {
  // Seviye gereksinimleri (XP)
  LEVELS: {
    1: { xp: 0, name: 'Başlangıç', color: 'gray', icon: '🌱' },
    2: { xp: 100, name: 'Öğrenci', color: 'green', icon: '📚' },
    3: { xp: 300, name: 'Gelişen', color: 'blue', icon: '🚀' },
    4: { xp: 600, name: 'Deneyimli', color: 'purple', icon: '⭐' },
    5: { xp: 1000, name: 'Uzman', color: 'yellow', icon: '🏆' },
    6: { xp: 1500, name: 'Master', color: 'red', icon: '👑' },
    7: { xp: 2200, name: 'Legends', color: 'pink', icon: '💎' },
    8: { xp: 3000, name: 'Efsane', color: 'indigo', icon: '🌟' }
  },

  // XP kazanma kuralları
  XP_RULES: {
    // Quest tamamlama
    QUEST_COMPLETED: 50,
    QUEST_FIRST_TIME: 75, // İlk kez tamamlama bonusu
    
    // Ders tamamlama
    LESSON_COMPLETED: 10,
    LESSON_PERFECT: 15, // Hiç yanlış yapmadan tamamlama
    
    // Streak bonusları
    DAILY_STREAK: 5, // Günlük streak bonusu
    WEEKLY_STREAK: 25, // Haftalık streak bonusu
    MONTHLY_STREAK: 100, // Aylık streak bonusu
    
    // Zorluk bonusları
    DIFFICULTY_BONUS: {
      beginner: 1.0,
      intermediate: 1.5,
      advanced: 2.0
    },
    
    // Sosyal bonuslar
    FIRST_CERTIFICATE: 25,
    MILESTONE_REACHED: 50, // 5, 10, 25, 50 quest tamamlama
    PERFECT_WEEK: 100, // Haftada tüm quest'leri doğru tamamlama
  },

  // Token kazanma kuralları
  TOKEN_RULES: {
    // Base token (quest tamamlama)
    BASE_QUEST_REWARD: 10,
    
    // Zorluk çarpanları
    DIFFICULTY_MULTIPLIER: {
      beginner: 1.0,
      intermediate: 1.5,
      advanced: 2.0
    },
    
    // Performans bonusları
    PERFECT_SCORE: 1.5, // Tüm soruları doğru cevaplama
    SPEED_BONUS: 1.2, // Hızlı tamamlama (zamanın yarısında)
    STREAK_BONUS: 1.1, // Streak bonusu
    
    // Seviye bonusları
    LEVEL_BONUS: {
      1: 1.0,
      2: 1.1,
      3: 1.2,
      4: 1.3,
      5: 1.4,
      6: 1.5,
      7: 1.6,
      8: 1.7
    }
  },

  // Milestone'lar
  MILESTONES: {
    QUESTS_COMPLETED: [5, 10, 25, 50, 100, 200],
    PERFECT_SCORES: [3, 7, 15, 30, 50],
    STREAK_DAYS: [3, 7, 14, 30, 60, 100],
    CERTIFICATES: [1, 3, 5, 10, 20, 50],
    TOTAL_XP: [500, 1000, 2000, 5000, 10000, 25000]
  }
};

// XP hesaplama fonksiyonları
class LevelCalculator {
  static calculateXP(questData, userStats) {
    let totalXP = 0;
    
    // Quest tamamlama XP'si
    const baseXP = LEVEL_SYSTEM.XP_RULES.QUEST_COMPLETED;
    const difficultyMultiplier = LEVEL_SYSTEM.XP_RULES.DIFFICULTY_BONUS[questData.difficulty] || 1.0;
    
    totalXP += baseXP * difficultyMultiplier;
    
    // İlk kez tamamlama bonusu
    if (!userStats.completedQuests.includes(questData.id)) {
      totalXP += LEVEL_SYSTEM.XP_RULES.QUEST_FIRST_TIME;
    }
    
    // Ders bazlı XP
    questData.lessons.forEach((lesson, index) => {
      if (lesson.completed) {
        totalXP += LEVEL_SYSTEM.XP_RULES.LESSON_COMPLETED;
        
        // Perfect score bonusu
        if (lesson.perfect) {
          totalXP += LEVEL_SYSTEM.XP_RULES.LESSON_PERFECT;
        }
      }
    });
    
    // Streak bonusları
    if (userStats.dailyStreak >= 3) {
      totalXP += LEVEL_SYSTEM.XP_RULES.DAILY_STREAK;
    }
    if (userStats.weeklyStreak >= 7) {
      totalXP += LEVEL_SYSTEM.XP_RULES.WEEKLY_STREAK;
    }
    if (userStats.monthlyStreak >= 30) {
      totalXP += LEVEL_SYSTEM.XP_RULES.MONTHLY_STREAK;
    }
    
    return Math.floor(totalXP);
  }

  static calculateTokens(questData, userStats, performance) {
    let totalTokens = 0;
    
    // Base token
    const baseTokens = LEVEL_SYSTEM.TOKEN_RULES.BASE_QUEST_REWARD * questData.lessons.length;
    
    // Zorluk çarpanı
    const difficultyMultiplier = LEVEL_SYSTEM.TOKEN_RULES.DIFFICULTY_MULTIPLIER[questData.difficulty] || 1.0;
    
    // Seviye bonusu
    const levelBonus = LEVEL_SYSTEM.TOKEN_RULES.LEVEL_BONUS[userStats.level] || 1.0;
    
    totalTokens = baseTokens * difficultyMultiplier * levelBonus;
    
    // Performans bonusları
    if (performance.perfectScore) {
      totalTokens *= LEVEL_SYSTEM.TOKEN_RULES.PERFECT_SCORE;
    }
    
    if (performance.speedBonus) {
      totalTokens *= LEVEL_SYSTEM.TOKEN_RULES.SPEED_BONUS;
    }
    
    if (performance.streakBonus) {
      totalTokens *= LEVEL_SYSTEM.TOKEN_RULES.STREAK_BONUS;
    }
    
    return Math.floor(totalTokens);
  }

  static getCurrentLevel(totalXP) {
    let currentLevel = 1;
    
    for (const [level, data] of Object.entries(LEVEL_SYSTEM.LEVELS)) {
      if (totalXP >= data.xp) {
        currentLevel = parseInt(level);
      } else {
        break;
      }
    }
    
    return currentLevel;
  }

  static getXPToNextLevel(currentXP, currentLevel) {
    const nextLevel = currentLevel + 1;
    const nextLevelData = LEVEL_SYSTEM.LEVELS[nextLevel];
    
    if (!nextLevelData) {
      return 0; // Max level
    }
    
    return nextLevelData.xp - currentXP;
  }

  static getLevelProgress(currentXP, currentLevel) {
    const currentLevelData = LEVEL_SYSTEM.LEVELS[currentLevel];
    const nextLevelData = LEVEL_SYSTEM.LEVELS[currentLevel + 1];
    
    if (!nextLevelData) {
      return 100; // Max level
    }
    
    const levelXP = nextLevelData.xp - currentLevelData.xp;
    const userXPInLevel = currentXP - currentLevelData.xp;
    
    return Math.min(100, Math.max(0, (userXPInLevel / levelXP) * 100));
  }

  static checkMilestones(userStats) {
    const newMilestones = [];
    
    // Quest tamamlama milestone'ları
    LEVEL_SYSTEM.MILESTONES.QUESTS_COMPLETED.forEach(milestone => {
      if (userStats.completedQuests.length === milestone && !userStats.achievedMilestones.includes(`quests_${milestone}`)) {
        newMilestones.push({
          type: 'quests_completed',
          value: milestone,
          reward: { xp: 50, tokens: 100 },
          message: `${milestone} quest tamamladınız!`
        });
      }
    });
    
    // Perfect score milestone'ları
    LEVEL_SYSTEM.MILESTONES.PERFECT_SCORES.forEach(milestone => {
      if (userStats.perfectScores === milestone && !userStats.achievedMilestones.includes(`perfect_${milestone}`)) {
        newMilestones.push({
          type: 'perfect_scores',
          value: milestone,
          reward: { xp: 75, tokens: 150 },
          message: `${milestone} mükemmel puan aldınız!`
        });
      }
    });
    
    // Streak milestone'ları
    LEVEL_SYSTEM.MILESTONES.STREAK_DAYS.forEach(milestone => {
      if (userStats.dailyStreak === milestone && !userStats.achievedMilestones.includes(`streak_${milestone}`)) {
        newMilestones.push({
          type: 'streak_days',
          value: milestone,
          reward: { xp: 100, tokens: 200 },
          message: `${milestone} günlük streak!`
        });
      }
    });
    
    return newMilestones;
  }
}

// Kullanıcı istatistikleri sınıfı
class UserStatsManager {
  constructor(userAddress) {
    this.userAddress = userAddress;
    this.stats = this.loadStats();
  }

  loadStats() {
    // localStorage'dan kullanıcı istatistiklerini yükle
    const saved = localStorage.getItem(`chainquest_stats_${this.userAddress}`);
    return saved ? JSON.parse(saved) : this.getDefaultStats();
  }

  getDefaultStats() {
    return {
      level: 1,
      totalXP: 0,
      totalTokens: 0,
      completedQuests: [],
      perfectScores: 0,
      dailyStreak: 0,
      weeklyStreak: 0,
      monthlyStreak: 0,
      lastActiveDate: null,
      totalTimeSpent: 0, // dakika
      certificates: [],
      achievements: [],
      achievedMilestones: [],
      questHistory: [],
      performanceStats: {
        averageScore: 0,
        bestStreak: 0,
        totalLessonsCompleted: 0,
        perfectLessons: 0
      }
    };
  }

  saveStats() {
    localStorage.setItem(`chainquest_stats_${this.userAddress}`, JSON.stringify(this.stats));
  }

  updateStreak() {
    const today = new Date().toDateString();
    const lastActive = this.stats.lastActiveDate ? new Date(this.stats.lastActiveDate).toDateString() : null;
    
    if (lastActive !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toDateString();
      
      if (lastActive === yesterdayString) {
        // Streak devam ediyor
        this.stats.dailyStreak++;
      } else if (lastActive !== today) {
        // Streak kırıldı
        this.stats.dailyStreak = 1;
      }
      
      this.stats.lastActiveDate = new Date().toISOString();
    }
  }

  addQuestCompletion(questData, performance) {
    // XP hesapla ve ekle
    const xpGained = LevelCalculator.calculateXP(questData, this.stats);
    this.stats.totalXP += xpGained;
    
    // Token hesapla ve ekle
    const tokensGained = LevelCalculator.calculateTokens(questData, this.stats, performance);
    this.stats.totalTokens += tokensGained;
    
    // Quest'i tamamlanan listesine ekle
    if (!this.stats.completedQuests.includes(questData.id)) {
      this.stats.completedQuests.push(questData.id);
    }
    
    // Perfect score kontrolü
    if (performance.perfectScore) {
      this.stats.perfectScores++;
    }
    
    // Performans istatistiklerini güncelle
    this.updatePerformanceStats(questData, performance);
    
    // Yeni seviye kontrolü
    const newLevel = LevelCalculator.getCurrentLevel(this.stats.totalXP);
    const leveledUp = newLevel > this.stats.level;
    this.stats.level = newLevel;
    
    // Milestone kontrolü
    const newMilestones = LevelCalculator.checkMilestones(this.stats);
    newMilestones.forEach(milestone => {
      this.stats.achievedMilestones.push(`${milestone.type}_${milestone.value}`);
      this.stats.totalXP += milestone.reward.xp;
      this.stats.totalTokens += milestone.reward.tokens;
      this.stats.achievements.push(milestone);
    });
    
    // Streak güncelle
    this.updateStreak();
    
    // İstatistikleri kaydet
    this.saveStats();
    
    return {
      xpGained,
      tokensGained,
      leveledUp,
      newLevel,
      newMilestones
    };
  }

  updatePerformanceStats(questData, performance) {
    const stats = this.stats.performanceStats;
    
    // Toplam ders sayısını güncelle
    stats.totalLessonsCompleted += questData.lessons.length;
    
    // Perfect ders sayısını güncelle
    if (performance.perfectScore) {
      stats.perfectLessons += questData.lessons.length;
    }
    
    // Ortalama skor hesapla
    const totalQuests = this.stats.completedQuests.length;
    if (totalQuests > 0) {
      stats.averageScore = (stats.averageScore * (totalQuests - 1) + performance.score) / totalQuests;
    } else {
      stats.averageScore = performance.score;
    }
    
    // En iyi streak güncelle
    stats.bestStreak = Math.max(stats.bestStreak, this.stats.dailyStreak);
  }

  getStats() {
    return {
      ...this.stats,
      xpToNextLevel: LevelCalculator.getXPToNextLevel(this.stats.totalXP, this.stats.level),
      levelProgress: LevelCalculator.getLevelProgress(this.stats.totalXP, this.stats.level),
      levelData: LEVEL_SYSTEM.LEVELS[this.stats.level]
    };
  }
}

// Export the classes
export { LevelCalculator, UserStatsManager };
