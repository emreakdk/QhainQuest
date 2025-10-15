import { useState, useEffect, useContext, lazy, Suspense } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useQuest } from '../../../context/QuestContext';
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
  const { t } = useLanguage();
  const { publicKey } = useContext(WalletContext);
  const { quests, loading, error, userStats, userProgress, getQuestStatus, getQuestProgress, refreshData } = useQuest();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Gerçek quest verilerini kullan
  const realQuests = quests.length > 0 ? quests : questDatabase;
  const realUserStats = userStats || { 
    level: 1, 
    totalXP: 0, 
    totalTokens: 0, 
    completedQuests: [], 
    perfectScores: 0,
    dailyStreak: 0,
    certificates: []
  };

  useEffect(() => {
    if (publicKey) {
      refreshData();
    }
  }, [publicKey, refreshData]);

  const getQuestCategory = (quest) => {
    return quest.category || 'blockchain';
  };

  const getQuestDifficulty = (quest) => {
    return quest.difficulty || 'beginner';
  };

  const filteredQuests = realQuests.filter(quest => {
    const matchesCategory = selectedCategory === 'all' || getQuestCategory(quest) === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || getQuestDifficulty(quest) === selectedDifficulty;
    const matchesSearch = quest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quest.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const handleStartQuest = (quest) => {
    setSelectedQuest(quest);
  };

  const handleContinueQuest = (quest) => {
    setSelectedQuest(quest);
  };

  // Loading state
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

  // Error state
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
          }} 
          onClose={() => setSelectedQuest(null)}
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
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {t('quest.description')}
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Görev ara..."
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">
                <AnimatedCounter value={realQuests.length} duration={1500} />
              </div>
              <div className="text-blue-100 text-sm">{t('stats.totalQuests')}</div>
            </div>
            <div className="text-4xl opacity-80">📚</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">
                <AnimatedCounter value={realUserStats.completedQuests?.length || 0} duration={1500} />
              </div>
              <div className="text-green-100 text-sm">{t('stats.completedQuests')}</div>
            </div>
            <div className="text-4xl opacity-80">✅</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">
                <AnimatedCounter value={realQuests?.filter(q => getQuestStatus(q) === 'in-progress').length || 0} duration={1500} />
              </div>
              <div className="text-purple-100 text-sm">{t('stats.inProgress')}</div>
            </div>
            <div className="text-4xl opacity-80">🔄</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">
                <AnimatedCounter value={realUserStats.totalTokens || 0} duration={1500} />
              </div>
              <div className="text-yellow-100 text-sm">{t('stats.earnedTokens')}</div>
            </div>
            <div className="text-4xl opacity-80">💰</div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {questCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all cursor-pointer ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
                <Badge 
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  className="ml-1"
                >
                  {realQuests.filter(q => getQuestCategory(q) === category.id || category.id === 'all').length}
                </Badge>
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
            </svg>
            Filtreler
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Zorluk:</span>
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
                  <span>{level.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quest Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuests.map(quest => (
          <QuestCard
            key={quest.id}
            quest={quest}
            userProgress={userProgress.get(quest.id)}
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
            Filtreleri Temizle
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuestGrid;