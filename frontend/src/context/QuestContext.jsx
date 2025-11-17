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
  const [activeQuizId, setActiveQuizId] = useState(null); // Track active quiz

  const loadQuests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setQuests(questDatabase);
    } catch (err) {
      setError('Quest\'ler yüklenirken hata oluştu');
      console.error('Quest yükleme hatası:', err);
    } finally {
      setLoading(false);
    }
  }, []);

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
      
      const { DataManager } = await import('../systems/dataManager.js');
      const dataManager = new DataManager(userAddress);
      const stats = dataManager.getUserStats();
      
      setUserStats(stats);
      
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

  const submitAnswer = useCallback(async (userAddress, questId, lessonId, answer, performance = {}) => {
    try {
      if (!userAddress) {
        throw new Error('Kullanıcı adresi bulunamadı');
      }

      const quest = quests.find(q => q.id === questId);
      if (!quest) {
        throw new Error('Quest bulunamadı');
      }

      if (lessonId === quest.lessons.length - 1) {
        const { DataManager } = await import('../systems/dataManager.js');
        const dataManager = new DataManager(userAddress);
        
        const result = await dataManager.completeQuest(quest, performance);
      
      if (result.success) {
        setUserStats(result.stats);
        
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

        if (result.certificate) {
          setUserCertificates(prev => {
            const current = Array.isArray(prev) ? prev : [];
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
        return { success: true };
      }
    } catch (err) {
      console.error('Cevap gönderme hatası:', err);
      throw err;
    }
  }, [quests]);

  const getQuestStatus = useCallback((quest) => {
    const progress = userProgress.get(quest.id) || 0;
    return questService.getQuestStatus(quest, progress);
  }, [userProgress]);

  const getQuestProgress = useCallback((quest) => {
    const progress = userProgress.get(quest.id) || 0;
    return {
      currentStep: progress,
      totalSteps: quest.lessons.length,
      progress: quest.lessons.length > 0 ? (progress / quest.lessons.length) * 100 : 0
    };
  }, [userProgress]);

  const isQuestCompleted = useCallback((quest) => {
    return getQuestStatus(quest) === 'completed';
  }, [getQuestStatus]);

  const hasCertificate = useCallback((questId) => {
    return userCertificates.some(cert => cert.questId === questId);
  }, [userCertificates]);

  const refreshData = useCallback(async (userAddress) => {
    questService.clearCache();
    await loadQuests();
    if (userAddress) {
      await loadUserProgress(userAddress);
    }
  }, [loadQuests, loadUserProgress]);

  useEffect(() => {
    loadQuests();
  }, [loadQuests]);

  const refreshUserBalance = useCallback(async (userAddress) => {
    if (!userAddress) return;
    
    try {
      console.log('Refreshing user balance for:', userAddress);
      
      await loadUserProgress(userAddress);
      
      console.log('User balance refreshed successfully');
    } catch (error) {
      console.error('Error refreshing user balance:', error);
    }
  }, [loadUserProgress]);

  const setActiveQuiz = useCallback((quizId) => {
    setActiveQuizId(quizId);
  }, []);

  const clearActiveQuiz = useCallback(() => {
    setActiveQuizId(null);
  }, []);

  const value = useMemo(() => ({
    quests,
    loading,
    error,
    userProgress,
    userStats,
    userCertificates,
    activeQuizId,
    
    loadQuests,
    loadUserProgress,
    submitAnswer,
    refreshData,
    refreshUserBalance,
    setActiveQuiz,
    clearActiveQuiz,
    
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
    activeQuizId,
    loadQuests,
    loadUserProgress,
    submitAnswer,
    refreshData,
    refreshUserBalance,
    setActiveQuiz,
    clearActiveQuiz,
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
