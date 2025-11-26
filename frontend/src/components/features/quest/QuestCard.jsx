import { useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useQuest } from '../../../context/QuestContext';
import { useTheme } from '../../../context/ThemeContext';
import { questApiService } from '../../../services/questApi';
import { Card, CardContent, CardHeader, CardFooter } from '../../ui/Card';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';
import ProgressRing from '../../ui/ProgressRing';
import SpotlightCard from '../../ui/SpotlightCard';
import { difficultyLevels } from '../../../data/questData';
import { 
  TbCheck, 
  TbRefresh, 
  TbTarget, 
  TbTrophy, 
  TbLink, 
  TbRobot, 
  TbCoins, 
  TbBook, 
  TbPalette,
  TbClock,
  TbUsers,
  TbSchool
} from 'react-icons/tb';

const QuestCard = ({ quest, userProgress, onStart, onContinue, userAddress }) => {
  const { t } = useLanguage();
  const { getQuestStatus, getQuestProgress, hasCertificate } = useQuest();
  const { isDarkMode } = useTheme();
  const [isApiCompleted, setIsApiCompleted] = useState(false);

  useEffect(() => {
    const checkApiCompletion = async () => {
      if (userAddress && quest.id) {
        const completed = await questApiService.isQuestCompleted(userAddress, quest.id);
        setIsApiCompleted(completed);
        console.log(`[QuestCard] Quest ${quest.id} completion status for ${userAddress}:`, completed);
      }
    };
    
    checkApiCompletion();
  }, [userAddress, quest.id]);

  const questStatus = isApiCompleted ? 'completed' : 
    (userProgress ? 
      (userProgress.completed ? 'completed' : 
       (userProgress.currentStep > 0 ? 'in-progress' : 'available')) : 
      'available');
  
  const questProgress = userProgress || { currentStep: 0, totalSteps: quest.lessons.length, progress: 0 };
  const hasQuestCertificate = hasCertificate(quest.id);
  const difficulty = difficultyLevels[quest.difficulty];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success" className="flex items-center gap-1">
          <TbCheck size={18} className="text-[#4ade80] dark:text-gray-300" />
          <span>{t('quest.finished')}</span>
        </Badge>;
      case 'in-progress':
        return <Badge variant="warning" className="flex items-center gap-1">
          <TbRefresh size={18} className="text-[#fb923c] dark:text-gray-300" />
          <span>{Math.round(questProgress.progress || 0)}%</span>
        </Badge>;
      default:
        return <Badge variant="primary" className="flex items-center gap-1">
          <TbTarget size={18} className="text-[#8b5cf6] dark:text-gray-300" />
          <span>{t('quest.available')}</span>
        </Badge>;
    }
  };

  const getActionButton = (status) => {
    switch (status) {
      case 'completed':
        return (
          <Button variant="outline" disabled className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 text-sm sm:text-base">
            <TbCheck size={18} className="opacity-40 flex-shrink-0" />
            {t('quest.finished')}
          </Button>
        );
      case 'in-progress':
        return (
          <Button variant="primary" onClick={() => onContinue(quest)} className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 text-sm sm:text-base">
            <TbRefresh size={18} className="text-[#fb923c] dark:text-gray-300 group-hover:text-white dark:group-hover:text-gray-200 transition-colors flex-shrink-0" />
            {t('quest.continue')}
          </Button>
        );
      default:
        return (
          <Button variant="primary" onClick={() => onStart(quest)} className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 group text-sm sm:text-base">
            <TbTarget size={18} className="text-[#8b5cf6] dark:text-gray-300 group-hover:text-white dark:group-hover:text-gray-200 transition-colors flex-shrink-0" />
            {t('quest.start')}
          </Button>
        );
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'blockchain': TbLink,
      'smart-contracts': TbRobot,
      'defi': TbCoins,
      'nft': TbPalette
    };
    const IconComponent = icons[category] || TbSchool;
    const categoryColors = {
      'blockchain': '#2ab3a6',
      'smart-contracts': '#8b5cf6',
      'defi': '#facc15',
      'nft': '#fb923c'
    };
    const iconColor = categoryColors[category] || '#8b5cf6';
    return <IconComponent size={22} style={{ color: iconColor }} className="dark:text-gray-300 group-hover:opacity-100 dark:group-hover:text-gray-200 transition-colors opacity-80" />;
  };

  return (
    <SpotlightCard className="h-full">
      <Card className="h-full flex flex-col hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group border-0 bg-white dark:bg-slate-800">
      <CardHeader className="relative overflow-hidden p-4 sm:p-6">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-50"></div>
        
        <div className="relative flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 sm:mb-2 flex-wrap">
              {getCategoryIcon(quest.category)}
              {quest.difficulty === 'beginner' && (
                <div 
                  className="rounded-full px-2.5 sm:px-2 py-1 sm:py-[2px] border text-[10px] sm:text-[11px] font-medium transition-all"
                  style={isDarkMode ? {
                    backgroundColor: 'rgba(34, 197, 94, 0.15)',
                    color: 'rgba(34, 197, 94, 0.9)',
                    borderColor: 'rgba(34, 197, 94, 0.4)',
                    boxShadow: '0 0 8px rgba(34, 197, 94, 0.1)',
                  } : {
                    backgroundColor: '#D4F5DD',
                    color: '#167A3E',
                    borderColor: '#A8E6C1',
                  }}
                >
                  {t(difficulty.nameKey || difficulty.name)}
                </div>
              )}
              {quest.difficulty === 'intermediate' && (
                <div 
                  className="rounded-full px-2.5 sm:px-2 py-1 sm:py-[2px] border text-[10px] sm:text-[11px] font-medium transition-all"
                  style={isDarkMode ? {
                    backgroundColor: 'rgba(234, 179, 8, 0.15)',
                    color: 'rgba(234, 179, 8, 0.9)',
                    borderColor: 'rgba(234, 179, 8, 0.4)',
                    boxShadow: '0 0 8px rgba(234, 179, 8, 0.1)',
                  } : {
                    backgroundColor: '#FFE9C2',
                    color: '#885400',
                    borderColor: '#FFD699',
                  }}
                >
                  {t(difficulty.nameKey || difficulty.name)}
                </div>
              )}
              {quest.difficulty === 'advanced' && (
                <div 
                  className="rounded-full px-2.5 sm:px-2 py-1 sm:py-[2px] border text-[10px] sm:text-[11px] font-medium transition-all"
                  style={isDarkMode ? {
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    color: 'rgba(239, 68, 68, 0.9)',
                    borderColor: 'rgba(239, 68, 68, 0.4)',
                    boxShadow: '0 0 8px rgba(239, 68, 68, 0.1)',
                  } : {
                    backgroundColor: '#FFD4D4',
                    color: '#9C1A1A',
                    borderColor: '#FFB3B3',
                  }}
                >
                  {t(difficulty.nameKey || difficulty.name)}
                </div>
              )}
            </div>
            
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight line-clamp-1">
              {t(quest.nameKey || quest.name)}
            </h3>
            
            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
              {t(quest.descriptionKey || quest.description)}
            </p>
          </div>
          
          <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 sm:space-y-2 flex-shrink-0">
            {getStatusBadge(questStatus)}
            {hasQuestCertificate && (
              <Badge variant="info" className="flex items-center gap-1">
                <TbTrophy size={18} className="text-[#facc15] dark:text-gray-300" />
                <span className="text-xs sm:text-sm">Sertifika</span>
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow flex flex-col p-4 sm:p-6">
        <div className="flex-grow flex flex-col space-y-3 sm:space-y-4">
          {/* Progress Ring - Mobile optimized */}
          {questStatus === 'in-progress' && (
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <ProgressRing 
                progress={questProgress?.progress || 0}
                size={64}
                strokeWidth={6}
                color="#8b5cf6"
                showPercentage={false}
                className="sm:w-20 sm:h-20"
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-1">
                  {t('quest.progress')}
                </div>
                <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                  {questProgress?.currentStep || 0}/{questProgress?.totalSteps || 0} {t('quest.lessons')}
                </div>
              </div>
            </div>
          )}

          {/* Quest Stats - Mobile optimized spacing */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div className="flex items-center space-x-2 p-2.5 sm:p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                <TbCoins size={16} className="text-white sm:w-[18px] sm:h-[18px]" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400">{t('quest.reward')}</div>
                <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white truncate">
                  {quest.rewardAmount || 100} Token
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 p-2.5 sm:p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <TbBook size={16} className="text-white sm:w-[18px] sm:h-[18px]" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400">{t('quiz.totalLessons')}</div>
                <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                  {quest.lessons.length}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info - Mobile optimized */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 gap-2">
            <div className="flex items-center space-x-1 min-w-0">
              <TbClock size={16} className="text-[#4a90e2] dark:text-gray-300 opacity-80 flex-shrink-0" />
              <span className="truncate">~{quest.timeEstimate} {t('quest.minutes')}</span>
            </div>
            
            <div className="flex items-center space-x-1 min-w-0">
              <TbUsers size={16} className="text-[#2ab3a6] dark:text-gray-300 opacity-80 flex-shrink-0" />
              <span className="truncate">%{quest.completionRate} tamamlandı</span>
            </div>
          </div>

          {/* Tags - Mobile optimized */}
          {quest.tags && quest.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-1">
              {quest.tags.slice(0, 3).map(tag => (
                <span 
                  key={tag}
                  className="px-2 py-1 text-[10px] sm:text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full transition-all duration-200 ease-in-out hover:bg-slate-200 dark:hover:bg-slate-600 hover:text-slate-800 dark:hover:text-slate-300 hover:shadow-sm cursor-default"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 p-4 sm:p-6">
        {getActionButton(questStatus)}
      </CardFooter>
    </Card>
    </SpotlightCard>
  );
};

export default QuestCard;