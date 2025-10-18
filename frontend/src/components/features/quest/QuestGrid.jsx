import { useState, useEffect, useContext, lazy, Suspense } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useQuest } from '../../../context/QuestContext';
import { useToken } from '../../../context/TokenContext';
import { useBalance } from '../../../context/BalanceContext';
import { WalletContext } from '../../../context/WalletContext';
import { SkeletonCard, SkeletonStats } from '../../ui/Skeleton';
import AnimatedCounter from '../../ui/AnimatedCounter';
import QuestCard from './QuestCard';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';
import { questDatabase, questCategories, difficultyLevels, mockUserStats, mockUserProgress } from '../../../data/questData';

// Lazy load QuestQuiz
const QuestQuiz = lazy(() => import('./QuestQuiz'));

const QuestGrid = () => {
  // Moved all Hook calls to the top level to comply with the Rules of Hooks
  const { t } = useLanguage();
  const { publicKey, isDemoMode } = useContext(WalletContext);
  const { quests, loading, error, userStats, userProgress, getQuestStatus, getQuestProgress, refreshData } = useQuest();
  const { tokenData } = useToken(); // Use centralized token data
  const { totalEarned } = useBalance(); // Use global total earned
  
  // Data processing moved after all Hooks
  const realQuests = quests.length > 0 ? quests : questDatabase;
  
  // CRITICAL FIX: Direct localStorage reading for Demo Mode counters
  const getCompletedQuestsCount = () => {
    if (isDemoMode) {
      // For Demo Mode, read directly from localStorage
      const allCompletedQuests = JSON.parse(localStorage.getItem('completedQuests') || '[]');
      const demoQuests = allCompletedQuests.filter(key => key.startsWith('demo-'));
      return demoQuests.length;
    } else {
      // For Wallet Mode, use tokenData
      return tokenData.completedQuests || 0;
    }
  };
  
  const completedQuestsCount = getCompletedQuestsCount();
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (publicKey) {
      refreshData();
    }
  }, [publicKey, refreshData]);

  // Helper functions moved after all Hooks
  const getQuestCategory = (quest) => {
    // Fixed: Add null check for quest object
    if (!quest) return 'blockchain';
    return quest.category || 'blockchain';
  };

  const getQuestDifficulty = (quest) => {
    // Fixed: Add null check for quest object
    if (!quest) return 'beginner';
    return quest.difficulty || 'beginner';
  };

  // Determine user identifier (wallet address or demo mode)
  const userIdentifier = isDemoMode ? 'demo' : publicKey;
  
  // Use centralized token data instead of userStats
  const realUserStats = {
    level: 1, 
    totalXP: 0, 
    totalTokens: totalEarned,  // Use global total earned
    completedQuests: tokenData.completedQuests,  // Use centralized quest count
    perfectScores: 0,
    dailyStreak: 0,
    certificates: []
  };

  const filteredQuests = realQuests.filter(quest => {
    // Fixed: Add null checks for quest object properties
    if (!quest || (!quest.name && !quest.nameKey) || (!quest.description && !quest.descriptionKey)) {
      return false;
    }
    const matchesCategory = selectedCategory === 'all' || getQuestCategory(quest) === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || getQuestDifficulty(quest) === selectedDifficulty;
    const questName = t(quest.nameKey || quest.name);
    const questDescription = t(quest.descriptionKey || quest.description);
    const matchesSearch = questName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         questDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const handleStartQuest = (quest) => {
    // Quest tamamlanmış mı kontrol et
    const questProgress = userProgress.get(quest.id);
    if (questProgress && questProgress.completed) {
      console.log(`Quest ${quest.id} zaten tamamlanmış!`);
      return;
    }
    setSelectedQuest(quest);
  };

  const handleContinueQuest = (quest) => {
    // Quest tamamlanmış mı kontrol et
    const questProgress = userProgress.get(quest.id);
    if (questProgress && questProgress.completed) {
      console.log(`Quest ${quest.id} zaten tamamlanmış!`);
      return;
    }
    setSelectedQuest(quest);
  };

  // Conditional rendering moved after all Hooks
  if (loading) {
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="text-center">
          <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 w-96 bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse"></div>
        </div>

        {/* Stats Skeleton */}
        <SkeletonStats />

        {/* Quest Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">{t('common.error')}: {error}</p>
        <Button onClick={refreshData} className="mt-4">{t('common.tryAgain')}</Button>
      </div>
    );
  }

  if (selectedQuest) {
    return (
      <Suspense fallback={<div>{t('common.loading')}</div>}>
        <QuestQuiz 
          questId={selectedQuest.id} 
          onComplete={() => {
            setSelectedQuest(null);
            refreshData();
            // Quest completion sonrası tasks page'inde kal (homepage'e gitme)
            console.log('Quest completed, staying on tasks page');
          }} 
          onClose={() => {
            setSelectedQuest(null);
            // Close button'a tıklandığında da tasks page'inde kal
            console.log('Quest closed, staying on tasks page');
          }}
        />
      </Suspense>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl"></div>
        <div className="relative p-8 md:p-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            {t('quest.title')}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed" style={{ fontSize: 'calc(1.125rem - 2px)' }}>
            {t('quest.description')}
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder={t('search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 dark:text-white"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-2xl p-4 sm:p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">
                <AnimatedCounter value={realQuests.length} duration={1500} />
              </div>
              <div className="text-blue-100 text-xs sm:text-sm">{t('stats.totalQuests')}</div>
            </div>
            <div className="text-3xl sm:text-4xl opacity-80">📚</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-2xl p-4 sm:p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">
                <AnimatedCounter value={completedQuestsCount} duration={1500} />
              </div>
              <div className="text-green-100 text-xs sm:text-sm">{t('stats.completedQuests')}</div>
            </div>
            <div className="text-3xl sm:text-4xl opacity-80">✅</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded-2xl p-4 sm:p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">
                <AnimatedCounter value={tokenData.inProgressQuests || 0} duration={1500} />
              </div>
              <div className="text-purple-100 text-xs sm:text-sm">{t('stats.inProgress')}</div>
            </div>
            <div className="text-3xl sm:text-4xl opacity-80">🔄</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 dark:from-yellow-600 dark:to-orange-600 rounded-2xl p-4 sm:p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">
                <AnimatedCounter value={totalEarned || 0} duration={1500} />
              </div>
              <div className="text-yellow-100 text-xs sm:text-sm">{t('stats.earnedTokens')}</div>
            </div>
            <div className="text-3xl sm:text-4xl opacity-80">💰</div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {questCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-xl font-medium transition-all cursor-pointer text-sm ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                <span className="text-sm sm:text-base">{category.icon}</span>
                <span className="hidden sm:inline">{t(category.nameKey || category.name)}</span>
                <span className="sm:hidden">{t(category.nameKey || category.name).slice(0, 3)}</span>
                <Badge 
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  className="ml-1 text-xs"
                >
                  {realQuests.filter(q => {
                    // Fixed: Add null check for quest object
                    if (!q) return false;
                    return getQuestCategory(q) === category.id || category.id === 'all';
                  }).length}
                </Badge>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Clear Filters Button - Only visible when filters are active */}
            {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || searchQuery !== '') && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedDifficulty('all');
                  setSearchQuery('');
                }}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors cursor-pointer text-sm border border-red-200 dark:border-red-700"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="hidden sm:inline">{t('filters.clear')}</span>
                <span className="sm:hidden">Temizle</span>
              </button>
            )}

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-pointer text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
              </svg>
              <span className="hidden sm:inline">{t('filters.title')}</span>
              <span className="sm:hidden">Filter</span>
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">{t('filters.difficulty')}:</span>
              {Object.entries(difficultyLevels).map(([key, level]) => (
                <button
                  key={key}
                  onClick={() => setSelectedDifficulty(selectedDifficulty === key ? 'all' : key)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    selectedDifficulty === key
                      ? `bg-${level.color}-600 text-white`
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  <span>{level.icon}</span>
                  <span>{t(level.nameKey || level.name)}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quest Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredQuests.map(quest => (
          <QuestCard
            key={quest.id}
            quest={quest}
            userProgress={userProgress.get(quest.id)}
            userAddress={userIdentifier}
            onStart={handleStartQuest}
            onContinue={handleContinueQuest}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredQuests.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Aradığınız görev bulunamadı
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Farklı kategoriler veya zorluk seviyeleri deneyin
          </p>
          <Button onClick={() => {
            setSearchQuery('');
            setSelectedCategory('all');
            setSelectedDifficulty('all');
          }}>
            {t('filters.clear')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuestGrid;