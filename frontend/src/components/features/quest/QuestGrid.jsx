import { useState, useEffect, useContext, lazy, Suspense } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useQuest } from '../../../context/QuestContext';
import { useToken } from '../../../context/TokenContext';
import { useBalance } from '../../../context/BalanceContext';
import { useTheme } from '../../../context/ThemeContext';
import { WalletContext } from '../../../context/WalletContext';
import { useDeviceType } from '../../../hooks/useDeviceType';
import { SkeletonCard, SkeletonStats } from '../../ui/Skeleton';
import AnimatedCounter from '../../ui/AnimatedCounter';
import QuestCard from './QuestCard';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';
import MobileWarning from '../../ui/MobileWarning';
import AIAssistant from '../ai/AIAssistant';
import { questDatabase, questCategories, difficultyLevels, mockUserStats, mockUserProgress } from '../../../data/questData';
import { 
  TbBook, 
  TbCheck, 
  TbRefresh, 
  TbCoins, 
  TbSearch, 
  TbX, 
  TbFilter,
  TbAlertCircle,
  TbLink,
  TbRobot,
  TbPalette,
  TbCircle,
  TbCircleDot
} from 'react-icons/tb';

const QuestQuiz = lazy(() => import('./QuestQuiz'));

const QuestGrid = () => {
  const { t } = useLanguage();
  const { publicKey, isDemoMode } = useContext(WalletContext);
  const { quests, loading, error, userStats, userProgress, getQuestStatus, getQuestProgress, refreshData } = useQuest();
  const { tokenData } = useToken(); // Use centralized token data
  const { totalEarned } = useBalance(); // Use global total earned
  const { isDarkMode } = useTheme();
  const { isMobile } = useDeviceType();

  // Category hover background classes matching quest card icon colors
  const getCategoryHoverClass = (categoryId) => {
    const hoverClasses = {
      'all': 'hover:bg-slate-200 dark:hover:bg-slate-600',
      'blockchain': 'hover:bg-cyan-50 dark:hover:bg-cyan-900/20', // matches #2ab3a6 (teal/cyan)
      'smart-contracts': 'hover:bg-purple-50 dark:hover:bg-purple-900/20', // matches #8b5cf6 (purple)
      'defi': 'hover:bg-yellow-50 dark:hover:bg-yellow-900/20', // matches #facc15 (yellow)
      'nft': 'hover:bg-orange-50 dark:hover:bg-orange-900/20' // matches #fb923c (orange)
    };
    return hoverClasses[categoryId] || hoverClasses['all'];
  };
  
  const realQuests = quests.length > 0 ? quests : questDatabase;
  
  const getCompletedQuestsCount = () => {
    if (isDemoMode) {
      const allCompletedQuests = JSON.parse(localStorage.getItem('completedQuests') || '[]');
      const demoQuests = allCompletedQuests.filter(key => key.startsWith('demo-'));
      return demoQuests.length;
    } else {
      return tokenData.completedQuests || 0;
    }
  };
  
  const completedQuestsCount = getCompletedQuestsCount();
  
  const inProgressQuestsCount = Math.max(0, realQuests.length - completedQuestsCount);
  
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

  const getQuestCategory = (quest) => {
    if (!quest) return 'blockchain';
    return quest.category || 'blockchain';
  };

  const getQuestDifficulty = (quest) => {
    if (!quest) return 'beginner';
    return quest.difficulty || 'beginner';
  };

  const userIdentifier = isDemoMode ? 'demo' : publicKey;
  
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
    const questProgress = userProgress.get(quest.id);
    if (questProgress && questProgress.completed) {
      console.log(`Quest ${quest.id} zaten tamamlanmış!`);
      return;
    }
    setSelectedQuest(quest);
  };

  const handleContinueQuest = (quest) => {
    const questProgress = userProgress.get(quest.id);
    if (questProgress && questProgress.completed) {
      console.log(`Quest ${quest.id} zaten tamamlanmış!`);
      return;
    }
    setSelectedQuest(quest);
  };

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
            console.log('Quest completed, staying on tasks page');
          }} 
          onClose={() => {
            setSelectedQuest(null);
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
                <TbSearch size={18} className="text-[#4a90e2] dark:text-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Section - Moved above stats */}
      <div className="mb-8">
        <AIAssistant />
      </div>

      {/* Mobile Warning */}
      {isMobile && (
        <div className="mb-6">
          <MobileWarning variant="light" />
        </div>
      )}

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
            <TbBook size={28} className="opacity-80 text-white" />
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
            <TbCheck size={28} className="opacity-80 text-white" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded-2xl p-4 sm:p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-3xl font-bold">
                <AnimatedCounter value={inProgressQuestsCount} duration={1500} />
              </div>
              <div className="text-purple-100 text-xs sm:text-sm">{t('stats.inProgress')}</div>
            </div>
            <TbRefresh size={28} className="opacity-80 text-white" />
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
            <TbCoins size={28} className="opacity-80 text-white" />
          </div>
        </div>
      </div>


      {/* Enhanced Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {questCategories.map(category => {
              const categoryIcons = {
                'all': TbBook,
                'blockchain': TbLink,
                'smart-contracts': TbRobot,
                'defi': TbCoins,
                'nft': TbPalette
              };
              const IconComponent = categoryIcons[category.id] || TbBook;
              const isActive = selectedCategory === category.id;
              // Icon colors matching quest card category icon colors exactly
              const categoryAccentColors = {
                'all': '#64748b',
                'blockchain': '#2ab3a6', // teal/cyan - matches quest card
                'smart-contracts': '#8b5cf6', // purple - matches quest card
                'defi': '#facc15', // yellow - matches quest card
                'nft': '#fb923c' // orange - matches quest card
              };
              const accentColor = categoryAccentColors[category.id] || categoryAccentColors['all'];
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group flex items-center gap-2 px-2 sm:px-4 py-2 rounded-xl font-medium transition-all duration-200 ease-in-out cursor-pointer text-sm focus:outline-none ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : `bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 ${getCategoryHoverClass(category.id)}`
                  }`}
                >
                  <IconComponent 
                    size={18} 
                    className={`transition-colors duration-200 ${
                      isActive 
                        ? 'text-white' 
                        : ''
                    }`}
                    style={!isActive ? { color: isDarkMode ? 'rgb(203, 213, 225)' : accentColor } : {}}
                  />
                  <span className="hidden sm:inline">{t(category.nameKey || category.name)}</span>
                  <span className="sm:hidden">{t(category.nameKey || category.name).slice(0, 3)}</span>
                  <Badge 
                    variant={isActive ? 'default' : 'outline'}
                    className="ml-1 text-xs transition-colors duration-200"
                  >
                    {realQuests.filter(q => {
                      if (!q) return false;
                      return getQuestCategory(q) === category.id || category.id === 'all';
                    }).length}
                  </Badge>
                </button>
              );
            })}
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
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl transition-all duration-200 ease-in-out cursor-pointer text-sm border border-red-200 dark:border-red-700 group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 hover:bg-red-200 dark:hover:bg-red-900/30 hover:border-red-300 dark:hover:border-red-600 hover:shadow-sm"
              >
                <TbX size={18} className="text-red-600 dark:text-red-400 transition-colors duration-200" />
                <span className="hidden sm:inline">{t('filters.clear')}</span>
                <span className="sm:hidden">Temizle</span>
              </button>
            )}

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 rounded-xl transition-all duration-200 ease-in-out cursor-pointer text-sm group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-700 border border-transparent"
            >
              <TbFilter size={18} className="text-[#4a90e2] dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" />
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
              {Object.entries(difficultyLevels).map(([key, level]) => {
                const getDifficultyStyles = (difficultyKey, isActive) => {
                  if (!isActive) return undefined;
                  
                  if (isDarkMode) {
                    switch (difficultyKey) {
                      case 'beginner':
                        return {
                          backgroundColor: 'rgba(34, 197, 94, 0.15)',
                          color: 'rgba(34, 197, 94, 0.9)',
                          borderColor: 'rgba(34, 197, 94, 0.4)',
                          boxShadow: '0 0 8px rgba(34, 197, 94, 0.1)',
                        };
                      case 'intermediate':
                        return {
                          backgroundColor: 'rgba(234, 179, 8, 0.15)',
                          color: 'rgba(234, 179, 8, 0.9)',
                          borderColor: 'rgba(234, 179, 8, 0.4)',
                          boxShadow: '0 0 8px rgba(234, 179, 8, 0.1)',
                        };
                      case 'advanced':
                        return {
                          backgroundColor: 'rgba(239, 68, 68, 0.15)',
                          color: 'rgba(239, 68, 68, 0.9)',
                          borderColor: 'rgba(239, 68, 68, 0.4)',
                          boxShadow: '0 0 8px rgba(239, 68, 68, 0.1)',
                        };
                      default:
                        return undefined;
                    }
                  } else {
                    switch (difficultyKey) {
                      case 'beginner':
                        return {
                          backgroundColor: '#D4F5DD',
                          color: '#167A3E',
                          borderColor: '#A8E6C1',
                        };
                      case 'intermediate':
                        return {
                          backgroundColor: '#FFE9C2',
                          color: '#885400',
                          borderColor: '#FFD699',
                        };
                      case 'advanced':
                        return {
                          backgroundColor: '#FFD4D4',
                          color: '#9C1A1A',
                          borderColor: '#FFB3B3',
                        };
                      default:
                        return undefined;
                    }
                  }
                };

                const getIconColor = (difficultyKey, isActive) => {
                  if (!isActive) return undefined;
                  
                  if (isDarkMode) {
                    switch (difficultyKey) {
                      case 'beginner':
                        return 'rgba(34, 197, 94, 0.9)';
                      case 'intermediate':
                        return 'rgba(234, 179, 8, 0.9)';
                      case 'advanced':
                        return 'rgba(239, 68, 68, 0.9)';
                      default:
                        return undefined;
                    }
                  } else {
                    switch (difficultyKey) {
                      case 'beginner':
                        return '#167A3E';
                      case 'intermediate':
                        return '#885400';
                      case 'advanced':
                        return '#9C1A1A';
                      default:
                        return undefined;
                    }
                  }
                };

                const isActive = selectedDifficulty === key;
                const difficultyHoverColors = {
                  'beginner': { light: '#dcfce7', dark: 'rgba(34, 197, 94, 0.18)' },
                  'intermediate': { light: '#fef3c7', dark: 'rgba(234, 179, 8, 0.18)' },
                  'advanced': { light: '#fee2e2', dark: 'rgba(239, 68, 68, 0.18)' }
                };
                const hoverColors = difficultyHoverColors[key] || difficultyHoverColors['beginner'];
                
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedDifficulty(selectedDifficulty === key ? 'all' : key)}
                    className={`flex items-center gap-2 rounded-full px-2 py-[2px] border text-[11px] font-medium transition-all duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      isActive
                        ? 'focus:ring-green-500'
                        : `bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-600 focus:ring-slate-400 ${
                            key === 'beginner' ? 'hover:bg-green-50 dark:hover:bg-green-900/20' :
                            key === 'intermediate' ? 'hover:bg-yellow-50 dark:hover:bg-yellow-900/20' :
                            'hover:bg-red-50 dark:hover:bg-red-900/20'
                          }`
                    }`}
                    style={isActive ? getDifficultyStyles(key, true) : {}}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        if (isDarkMode) {
                          e.currentTarget.style.backgroundColor = hoverColors.dark;
                          e.currentTarget.style.boxShadow = `0 0 8px ${hoverColors.dark.replace('0.18', '0.12')}`;
                        } else {
                          e.currentTarget.style.backgroundColor = hoverColors.light;
                        }
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = '';
                        e.currentTarget.style.boxShadow = '';
                      }
                    }}
                  >
                    {isActive ? (
                      <TbCircleDot size={18} style={{ color: getIconColor(key, true) }} />
                    ) : (
                      <TbCircle size={18} className="text-[#4a90e2] dark:text-gray-300 transition-colors duration-200" />
                    )}
                    <span>{t(level.nameKey || level.name)}</span>
                  </button>
                );
              })}
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
          <TbSearch size={48} className="mx-auto mb-4 text-[#4a90e2] dark:text-gray-300 opacity-80" />
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









