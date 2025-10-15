import { useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useQuest } from '../../../context/QuestContext';
import { questApiService } from '../../../services/questApi';
import { Card, CardContent, CardHeader, CardFooter } from '../../ui/Card';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';
import ProgressRing from '../../ui/ProgressRing';
import { difficultyLevels } from '../../../data/questData';

const QuestCard = ({ quest, userProgress, onStart, onContinue, userAddress }) => {
  const { t } = useLanguage();
  const { getQuestStatus, getQuestProgress, hasCertificate } = useQuest();
  const [isApiCompleted, setIsApiCompleted] = useState(false);

  // Check API completion status
  useEffect(() => {
    const checkApiCompletion = async () => {
      if (userAddress && quest.id) {
        const completed = await questApiService.isQuestCompleted(userAddress, quest.id);
        setIsApiCompleted(completed);
      }
    };
    
    checkApiCompletion();
  }, [userAddress, quest.id]);

  // Determine quest status - prioritize API completion status
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
          <span>✅</span>
          <span>{t('quest.finished')}</span>
        </Badge>;
      case 'in-progress':
        return <Badge variant="warning" className="flex items-center gap-1">
          <span>🔄</span>
          <span>{Math.round(questProgress.progress || 0)}%</span>
        </Badge>;
      default:
        return <Badge variant="primary" className="flex items-center gap-1">
          <span>🎯</span>
          <span>{t('quest.available')}</span>
        </Badge>;
    }
  };

  const getActionButton = (status) => {
    switch (status) {
      case 'completed':
        return (
          <Button variant="outline" disabled className="w-full">
            ✅ {t('quest.finished')}
          </Button>
        );
      case 'in-progress':
        return (
          <Button variant="primary" onClick={() => onContinue(quest)} className="w-full">
            🔄 {t('quest.continue')}
          </Button>
        );
      default:
        return (
          <Button variant="primary" onClick={() => onStart(quest)} className="w-full">
            🚀 {t('quest.start')}
          </Button>
        );
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'blockchain': '⛓️',
      'smart-contracts': '🤖',
      'defi': '💰',
      'nft': '🎨'
    };
    return icons[category] || '📚';
  };

  return (
    <Card className="hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
      <CardHeader className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-50"></div>
        
        <div className="relative flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{getCategoryIcon(quest.category)}</span>
              <Badge 
                variant={difficulty.color} 
                className={`bg-${difficulty.color}-100 text-${difficulty.color}-800 border-${difficulty.color}-300 dark:bg-${difficulty.color}-900 dark:text-${difficulty.color}-200`}
              >
                {difficulty.icon} {difficulty.name}
              </Badge>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {quest.name}
            </h3>
            
            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
              {quest.description}
            </p>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            {getStatusBadge(questStatus)}
            {hasQuestCertificate && (
              <Badge variant="info" className="flex items-center gap-1">
                <span>🏆</span>
                <span>Sertifika</span>
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Ring */}
        {questStatus === 'in-progress' && (
          <div className="flex items-center justify-center space-x-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <ProgressRing 
              progress={questProgress?.progress || 0}
              size={80}
              strokeWidth={6}
              color="#8b5cf6"
              showPercentage={false}
            />
            <div className="flex-1">
              <div className="text-sm text-slate-700 dark:text-slate-300 mb-1">
                {t('quest.progress')}
              </div>
              <div className="text-lg font-semibold text-slate-900 dark:text-white">
                {questProgress?.currentStep || 0}/{questProgress?.totalSteps || 0} {t('quest.lessons')}
              </div>
            </div>
          </div>
        )}

        {/* Quest Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">💰</span>
            </div>
            <div>
              <div className="text-xs text-slate-600 dark:text-slate-400">{t('quest.reward')}</div>
              <div className="font-semibold text-slate-900 dark:text-white">
                {quest.rewardAmount || 100} Token
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">📚</span>
            </div>
            <div>
              <div className="text-xs text-slate-600 dark:text-slate-400">{t('quiz.totalLessons')}</div>
              <div className="font-semibold text-slate-900 dark:text-white">
                {quest.lessons.length}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>~{quest.timeEstimate} {t('quest.minutes')}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>%{quest.completionRate} tamamlandı</span>
          </div>
        </div>

        {/* Tags */}
        {quest.tags && quest.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {quest.tags.slice(0, 3).map(tag => (
              <span 
                key={tag}
                className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        {getActionButton(questStatus)}
      </CardFooter>
    </Card>
  );
};

export default QuestCard;