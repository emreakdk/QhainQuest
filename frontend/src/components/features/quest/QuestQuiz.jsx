import { useState, useEffect, useCallback } from 'react';
import { useContext } from 'react';
import { WalletContext } from '../../../context/WalletContext';
import { useLanguage } from '../../../context/LanguageContext';
import { useQuest } from '../../../context/QuestContext';
import { useToken } from '../../../context/TokenContext';
import { useBalance } from '../../../context/BalanceContext';
import { useNotification } from '../../../context/NotificationContext';
import { useTestStatus } from '../../../context/TestContext';
import useSound from '../../../hooks/useSound';
import { questApiService } from '../../../services/questApi';
import { questDatabase } from '../../../data/questData';
import { Card, CardContent, CardHeader } from '../../ui/Card';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';
import QuestCompletionModal from './QuestCompletionModal';
import ExitWarningModal from '../../ui/ExitWarningModal';
import { TbCoin, TbStack2, TbTrophy, TbCheck, TbX, TbRefresh } from 'react-icons/tb';

// Reward constants
const AI_QUIZ_REWARD = 20;
const STANDARD_QUEST_REWARD_DEFAULT = 100;

const QuestQuiz = ({ questId, onComplete, onClose, onPageChange, customQuestions = null, customQuestTitle = null, customQuestTopic = null, customDifficulty = null }) => {
  const { publicKey, isDemoMode } = useContext(WalletContext);
  const { t } = useLanguage();
  const { showSuccess, showError } = useNotification();
  const { submitAnswer, getQuestProgress, refreshUserBalance, setActiveQuiz, clearActiveQuiz } = useQuest();
  const { refreshTokenData } = useToken();
  const { addToClaimableBalance } = useBalance(); // Use global balance context
  const { setIsTestActive } = useTestStatus();
  const { playSuccessSound, playErrorSound, playClickSound } = useSound();
  
  const [quest, setQuest] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [showWrongAnswers, setShowWrongAnswers] = useState(false);
  const [currentWrongIndex, setCurrentWrongIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]); // Track all user answers
  const [questCompleted, setQuestCompleted] = useState(false); // Track quest completion
  const [showCloseWarning, setShowCloseWarning] = useState(false);
  const [questReward, setQuestReward] = useState(0); // Final reward amount
  const [questSuccess, setQuestSuccess] = useState(true); // Whether quest was completed successfully
  const [hasMadeMistake, setHasMadeMistake] = useState(false); // Track if user made any mistake (for AI Quiz: 100% First Try rule)

  useEffect(() => {
    console.log('DEBUG: isSubmitting state changed to:', isSubmitting);
  }, [isSubmitting]);

  useEffect(() => {
    console.log('DEBUG: showCelebration state changed to:', showCelebration);
  }, [showCelebration]);

  useEffect(() => {
    const checkQuestCompletion = async () => {
      if (publicKey && questId) {
        const isCompleted = await questApiService.isQuestCompleted(publicKey, questId);
        setQuestCompleted(isCompleted);
      }
    };
    
    checkQuestCompletion();
  }, [publicKey, questId]);

  const getDifficultyLevel = (quest) => {
    switch (quest.difficulty) {
      case 'beginner':
        return { level: 'easy', color: 'green', label: t('category.beginner') };
      case 'intermediate':
        return { level: 'medium', color: 'yellow', label: t('category.intermediate') };
      case 'advanced':
        return { level: 'hard', color: 'red', label: t('category.advanced') };
      default:
        return { level: 'easy', color: 'green', label: t('category.beginner') };
    }
  };


  useEffect(() => {
    const loadQuest = async () => {
      try {
        // CASE 1: AI Generated Quest (Passed directly via customQuestions prop)
        if (customQuestions && customQuestions.length > 0) {
          console.log('[QuestQuiz] Loading Custom AI Quest...', customQuestions.length, 'questions');
          
          // Map UI Difficulty to System Keys (if needed)
          const difficultyMap = {
            'Kolay': 'beginner',
            'Orta': 'intermediate',
            'Zor': 'advanced',
            'Easy': 'beginner',
            'Medium': 'intermediate',
            'Hard': 'advanced'
          };
          
          // Use customDifficulty if provided, otherwise default to 'intermediate'
          const systemDifficulty = customDifficulty 
            ? (difficultyMap[customDifficulty] || customDifficulty) 
            : 'intermediate';
          
          const customQuest = {
            id: 'ai-generated-quiz',
            nameKey: customQuestTitle || 'AI Generated Quiz',
            descriptionKey: customQuestTopic || 'AI Generated Quiz',
            category: 'ai-generated',
            difficulty: systemDifficulty, // FIX: Use the selected difficulty
            rewardAmount: 20, // FIX: AI quizzes give 20 CQT
            timeEstimate: customQuestions.length * 2,
            certificateNftUrl: null,
            lessons: customQuestions.map((q, index) => ({
              id: q.id || `ai-lesson-${index + 1}`,
              questionKey: q.question,
              choices: q.choices,
              correctAnswerKey: q.correctAnswer,
              explanationKey: q.explanation || ''
            }))
          };

          setQuest(customQuest);
          setCurrentLessonIndex(0);
          
          // Reset state for new quiz
          setUserAnswers(new Array(customQuestions.length).fill(null)); // Initialize with null values
          setHasMadeMistake(false); // Reset mistake tracking
          setQuestCompleted(false);
          setQuestReward(0);
          setQuestSuccess(true);
          
          // Set a dummy ID for context (AI quizzes don't need real quest tracking)
          setActiveQuiz('ai-generated-quiz');
          
          // Set test as active for navigation guard
          setIsTestActive(true);
          
          console.log(`[QuestQuiz] AI Quiz loaded: ${customQuestTitle || 'AI Generated Quiz'}, Questions: ${customQuestions.length}`);
          return; // STOP HERE, do not look in DB
        }

        // CASE 2: Standard Static Quest (Look up by ID in database)
        // Only proceed if questId is provided and valid
        if (!questId) {
          console.warn('[QuestQuiz] No questId provided and no customQuestions. Cannot load quest.');
          return;
        }

        const realQuest = questDatabase.find(q => q.id === questId);
        
        if (!realQuest) {
          console.error('[QuestQuiz] Quest not found in DB:', questId);
          // Only show error if we don't have a custom quest
          if (!customQuestions) {
            showError('Quest Bulunamadı', 'Bu quest mevcut değil.');
            setQuest(null); // Trigger the "Not Found" UI
          }
          return;
        }

        setQuest(realQuest);
        
        const progress = getQuestProgress(realQuest);
        setCurrentLessonIndex(progress.currentStep);
        
        // Set active quiz when quiz starts
        setActiveQuiz(questId);
        
        // Set test as active for navigation guard
        setIsTestActive(true);
        
        console.log(`[QuestQuiz] Quest loaded: ${t(realQuest.nameKey)}, Questions: ${realQuest.lessons.length}`);
      } catch (error) {
        console.error('[QuestQuiz] Quest loading error:', error);
        showError('Hata', 'Quest yüklenirken bir hata oluştu.');
      }
    };

    // Load quest if we have either questId or customQuestions
    if (questId || (customQuestions && customQuestions.length > 0)) {
      loadQuest();
    }
    
    // Cleanup: clear active quiz and test status when component unmounts
    return () => {
      clearActiveQuiz();
      setIsTestActive(false);
    };
  }, [questId, customQuestions, customQuestTitle, customQuestTopic, customDifficulty, getQuestProgress, showError, setActiveQuiz, clearActiveQuiz, setIsTestActive, t, publicKey, isDemoMode]);

  const currentLesson = quest?.lessons[currentLessonIndex];
  const difficulty = quest ? getDifficultyLevel(quest) : { level: 'easy', color: 'green', label: 'Kolay' };

  // Helper functions to support both translation keys and direct text
  const getQuestionText = (lesson) => {
    if (!lesson) return '';
    // If it's a translation key (starts with 'quests.'), use t()
    // Otherwise, it's direct text from AI
    return lesson.questionKey?.startsWith('quests.') ? t(lesson.questionKey) : (lesson.questionKey || lesson.question || '');
  };

  const getChoiceText = (choice) => {
    if (!choice) return '';
    // If it's a translation key (starts with 'quests.'), use t()
    // Otherwise, it's direct text from AI
    return choice.startsWith('quests.') ? t(choice) : choice;
  };

  const getCorrectAnswerText = (lesson) => {
    if (!lesson) return '';
    // If it's a translation key (starts with 'quests.'), use t()
    // Otherwise, it's direct text from AI
    return lesson.correctAnswerKey?.startsWith('quests.') ? t(lesson.correctAnswerKey) : (lesson.correctAnswerKey || lesson.correctAnswer || '');
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null || questCompleted) return;

    setIsSubmitting(true);
    try {
      const selectedChoiceKey = currentLesson.choices[selectedAnswer];
      const isAnswerCorrect = selectedChoiceKey === currentLesson.correctAnswerKey;
      setIsCorrect(isAnswerCorrect);
      setShowResult(true);

      // UPDATE ANSWER AT INDEX INSTEAD OF PUSHING (Fixes retry length issue)
      const newAnswers = [...userAnswers];
      newAnswers[currentLessonIndex] = selectedChoiceKey;
      setUserAnswers(newAnswers);

      if (isAnswerCorrect) {
        showSuccess(t('quiz.correct'), t('quiz.greatJob'));
        playSuccessSound();
        
        if (currentLessonIndex < quest.lessons.length - 1) {
          setTimeout(() => {
            setCurrentLessonIndex(currentLessonIndex + 1);
            setSelectedAnswer(null);
            setShowResult(false);
            setIsSubmitting(false);
          }, 2000);
        } else {
          await completeQuestSecurely(newAnswers);
        }
      } else {
        // WRONG ANSWER - Mark that this run is not perfect
        setHasMadeMistake(true);
        
        setWrongAnswers(prev => [...prev, {
          lesson: currentLesson,
          wrongAnswer: selectedAnswer,
          correctAnswer: currentLesson.correctAnswerKey
        }]);
        showError(t('quiz.incorrect'), t('quiz.tryAgain'));
        playErrorSound();
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Cevap gönderme hatası:', error);
      setIsCorrect(false);
      setShowResult(true);
      setIsSubmitting(false);
    }
  };

  const completeQuestSecurely = async (answers) => {
    try {
      console.log('Completing quest securely with answers:', answers);
      
      // Filter out null values (unanswered questions) for length check
      const answeredCount = answers.filter(a => a !== null && a !== undefined).length;
      
      if (answeredCount !== quest.lessons.length) {
        throw new Error(`Quest tamamlanamadı: ${answeredCount}/${quest.lessons.length} soru cevaplandı. Tüm soruları cevaplamalısınız.`);
      }
      
      const userIdentifier = isDemoMode ? 'demo' : publicKey;
      
      const isAlreadyCompleted = await questApiService.isQuestCompleted(userIdentifier, questId);
      
      if (isAlreadyCompleted) {
        setQuestCompleted(true);
        setIsSubmitting(false);
        showError('Quest Zaten Tamamlandı', 'Bu testi zaten tamamlamıştınız.');
        return;
      }
      
      // Handle AI-generated quizzes with strict reward logic
      if (customQuestions) {
        const isAiQuiz = quest.id === 'ai-generated-quiz' || quest.category === 'ai-generated';
        
        // Check if ALL answers are correct
        const allAnswersCorrect = answers.every((answer, index) => {
          const lesson = quest.lessons[index];
          if (!lesson) return false;
          
          // Get the correct answer (handle both translation keys and direct text)
          const correctAnswer = lesson.correctAnswerKey || lesson.correctAnswer;
          const userAnswer = answer;
          
          // Compare answers (case-insensitive, trimmed)
          return userAnswer && correctAnswer && 
                 userAnswer.toString().trim().toLowerCase() === correctAnswer.toString().trim().toLowerCase();
        });
        
        let reward = 0;
        let isSuccess = false;
        
        // AI Quiz Rule: If user made ANY mistake (retried), Reward = 0
        if (isAiQuiz) {
          if (hasMadeMistake || !allAnswersCorrect) {
            // User retried or has wrong answers = 0 CQT, no reward
            reward = 0;
            isSuccess = false;
            
            showError(
              t('quiz.failed') || 'Test Tamamlandı',
              t('quiz.failedMessage') || 'Maalesef testte yanlış cevaplarınız olduğu için CQT Token kazanamadınız. Tekrar deneyerek kendinizi geliştirebilirsiniz.'
            );
          } else {
            // 100% correct on first try = 20 CQT reward
            reward = AI_QUIZ_REWARD;
            isSuccess = true;
            
            const userIdentifier = isDemoMode ? 'demo' : publicKey;
            addToClaimableBalance(userIdentifier, reward);
            
            showSuccess(
              t('quiz.completed') || 'Tebrikler! Testi tamamladınız.',
              `${reward} CQT token claimable balance'a eklendi!`
            );
          }
        } else {
          // Non-AI quiz: Standard logic
          if (allAnswersCorrect) {
            reward = AI_QUIZ_REWARD;
            isSuccess = true;
            
            const userIdentifier = isDemoMode ? 'demo' : publicKey;
            addToClaimableBalance(userIdentifier, reward);
            
            showSuccess(
              t('quiz.completed') || 'Tebrikler! Testi tamamladınız.',
              `${reward} CQT token claimable balance'a eklendi!`
            );
          } else {
            reward = 0;
            isSuccess = false;
            
            showError(
              t('quiz.failed') || 'Test Tamamlandı',
              t('quiz.failedMessage') || 'Maalesef testte yanlış cevaplarınız olduğu için CQT Token kazanamadınız. Tekrar deneyerek kendinizi geliştirebilirsiniz.'
            );
          }
        }
        
        // Set reward and success state for modal
        setQuestReward(reward);
        setQuestSuccess(isSuccess);
        
        setIsSubmitting(false);
        setQuestCompleted(true);
        clearActiveQuiz();
        setShowCelebration(true);
        
        console.log(`[AI Quiz] Completed - Success: ${isSuccess}, Reward: ${reward} CQT`);
        return;
      }
      
      const result = await questApiService.completeQuest(userIdentifier, questId, answers, isDemoMode);
      
      if (result.success) {
        questApiService.markQuestCompleted(userIdentifier, questId);
        setQuestCompleted(true);
        
        // Clear active quiz when quest is completed
        clearActiveQuiz();
        
        // Standard quest reward
        const standardReward = result.data.rewardAmount || quest.rewardAmount || STANDARD_QUEST_REWARD_DEFAULT;
        
        addToClaimableBalance(userIdentifier, standardReward);
        
        // Set reward and success state for modal
        setQuestReward(standardReward);
        setQuestSuccess(true);
        
        setIsSubmitting(false);
        
        setShowCelebration(true);
        showSuccess(
          'Tebrikler! Görevi tamamladınız.', 
          `${standardReward} token claimable balance'a eklendi!`
        );
        
        if (!isDemoMode) {
          await submitAnswer(publicKey, questId, currentLessonIndex, answers[answers.length - 1]);
          
          await refreshUserBalance(publicKey);
          
          refreshTokenData();
        }
        
        console.log('Quest completed successfully:', result.data);
      } else {
        throw new Error(result.error || 'Quest completion failed');
      }
    } catch (error) {
      console.error('Secure quest completion error:', error);
      showError('Quest Tamamlanamadı', error.message);
      setIsSubmitting(false);
    }
  };

  const handleNextWrongAnswer = () => {
    if (currentWrongIndex < wrongAnswers.length - 1) {
      setCurrentWrongIndex(currentWrongIndex + 1);
    } else {
      setShowWrongAnswers(false);
      setWrongAnswers([]);
      setCurrentWrongIndex(0);
    }
  };

  const handleSkipWrongAnswers = () => {
    setShowWrongAnswers(false);
    setWrongAnswers([]);
    setCurrentWrongIndex(0);
  };

  const handleConfirmQuit = () => {
    // Execute the exit logic
    clearActiveQuiz();
    setIsTestActive(false);
    onClose(); // The prop passed from parent
    setShowCloseWarning(false);
  };

  const handleRetryQuestion = () => {
    // Reset the current question's state without restarting the whole quiz
    setShowResult(false);      // Hide the result card
    setSelectedAnswer(null);   // Clear selection
    setIsSubmitting(false);    // Allow submitting again
    setIsCorrect(false);       // Reset correctness
    playClickSound();          // Play click sound for feedback
  };

  if (showWrongAnswers && wrongAnswers.length > 0) {
    const wrongLesson = wrongAnswers[currentWrongIndex];
    const isLastWrong = currentWrongIndex === wrongAnswers.length - 1;
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {t('quiz.wrongAnswers')}
                </h2>
                <p className="text-slate-700 dark:text-slate-300">
                  {t('quiz.wrongAnswersDesc')}
                </p>
              </div>
              <Badge variant="warning" className="text-sm">
                {currentWrongIndex + 1} / {wrongAnswers.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">
                  {t(wrongLesson.lesson.questionKey)}
                </h3>
                <div className="space-y-3">
                  {wrongLesson.lesson.choices.map((choiceKey, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border-2 ${
                        index === wrongLesson.wrongAnswer
                          ? 'border-red-500 bg-red-100 dark:bg-red-800/30'
                          : choiceKey === wrongLesson.correctAnswer
                          ? 'border-green-500 bg-green-100 dark:bg-green-800/30'
                          : 'border-slate-200 dark:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full border-2 mr-3 ${
                          index === wrongLesson.wrongAnswer
                            ? 'border-red-500 bg-red-500'
                            : choiceKey === wrongLesson.correctAnswer
                            ? 'border-green-500 bg-green-500'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}>
                          {index === wrongLesson.wrongAnswer && (
                            <div className="w-full h-full rounded-full bg-white scale-50">❌</div>
                          )}
                          {choiceKey === wrongLesson.correctAnswer && (
                            <div className="w-full h-full rounded-full bg-white scale-50">✅</div>
                          )}
                        </div>
                        <span className="text-slate-900 dark:text-white">{t(choiceKey)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={handleSkipWrongAnswers}
                  variant="outline"
                  className="flex-1 cursor-pointer"
                >
                  {t('quiz.skip')}
                </Button>
                <Button
                  onClick={handleNextWrongAnswer}
                  className="flex-1 cursor-pointer"
                >
                  {isLastWrong ? t('quiz.finish') : t('quiz.next')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!showCelebration && !questCompleted && (!quest || !currentLesson)) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Allow rendering if EITHER questId exists OR customQuestions is provided
  if (!questId && !(customQuestions && customQuestions.length > 0)) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {t('quest.notFound') || 'Quest Başlatılamadı'}
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            {t('quest.invalidParams') || 'Geçersiz parametreler.'}
          </p>
          <Button
            onClick={onClose}
            className="cursor-pointer"
          >
            {t('common.back') || 'Geri Dön'}
          </Button>
        </div>
      </div>
    );
  }

  if (questCompleted) {
    return (
        <QuestCompletionModal
          quest={quest}
          reward={questReward}
          isSuccess={questSuccess}
          onClose={() => {
            setIsTestActive(false);
            onClose();
          }}
          onComplete={() => {
            setIsTestActive(false);
            onClose();
          }}
          onPageChange={onPageChange}
        />
    );
  }


  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <style>{`
        /* --- BASE HOVER (Unselected) --- */
        
        /* Light Mode */
        .quiz-opt-btn:hover {
          background-color: #eef2ff !important; /* indigo-50 */
          border-color: #a5b4fc !important; /* indigo-300 */
        }
        .quiz-opt-btn:hover span {
          color: #4338ca !important; /* indigo-700 */
        }
        
        /* Dark Mode */
        .dark .quiz-opt-btn:hover {
          background-color: #334155 !important; /* slate-700 */
          border-color: #475569 !important; /* slate-600 */
        }
        .dark .quiz-opt-btn:hover span {
          color: #ffffff !important;
        }
        
        /* --- SELECTED STATE (Static & Hover) --- */
        
        /* LIGHT MODE: Force Text to be Dark Purple */
        .quiz-opt-btn.selected,
        .quiz-opt-btn.selected:hover {
          background-color: #eef2ff !important;
          border-color: #4f46e5 !important;
        }
        /* TARGET THE SPAN DIRECTLY */
        .quiz-opt-btn.selected span,
        .quiz-opt-btn.selected:hover span {
          color: #4338ca !important; /* indigo-700 - ALWAYS DARK */
        }
        
        /* DARK MODE: Force Text to be White */
        .dark .quiz-opt-btn.selected,
        .dark .quiz-opt-btn.selected:hover {
          background-color: #4f46e5 !important;
          border-color: #6366f1 !important;
        }
        /* TARGET THE SPAN DIRECTLY */
        .dark .quiz-opt-btn.selected span,
        .dark .quiz-opt-btn.selected:hover span {
          color: #ffffff !important; /* ALWAYS WHITE */
        }
        
        /* Ensure Checkmark Icon colors */
        .quiz-opt-btn.selected:hover svg,
        .quiz-opt-btn.selected svg {
          color: #4338ca !important;
          stroke: #4338ca !important;
        }
        .dark .quiz-opt-btn.selected:hover svg,
        .dark .quiz-opt-btn.selected svg {
          color: #ffffff !important;
          stroke: #ffffff !important;
        }
      `}</style>
      <Card className="mb-6">
        <CardHeader className="p-4 sm:p-6">
          {/* Mobile-first header layout */}
          <div className="space-y-4">
            {/* Title and Close Button Row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                  {t(quest.nameKey)}
                </h2>
              </div>
              <Button
                onClick={() => setShowCloseWarning(true)}
                variant="outline"
                size="sm"
                className="cursor-pointer flex-shrink-0"
              >
                {t('quiz.close')}
              </Button>
            </div>
            
            {/* Difficulty Badge */}
            <div className="flex justify-start">
              <Badge 
                variant="outline" 
                className={`text-xs px-3 py-1 bg-${difficulty.color}-100 text-${difficulty.color}-800 border-${difficulty.color}-300`}
              >
                {difficulty.label}
              </Badge>
            </div>
            
            {/* Description */}
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {t(quest.descriptionKey)}
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {/* Mobile-first progress section */}
          <div className="space-y-4 mb-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-end">
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {currentLessonIndex + 1} / {quest.lessons.length}
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                <div 
                  className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${((currentLessonIndex + 1) / quest.lessons.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Time Estimate */}
            <div className="text-center sm:text-right">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {t('quiz.timeEstimate')}: {quest.lessons.length * 2} {t('quiz.minutes')}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-4 sm:mb-6 leading-relaxed">
                {getQuestionText(currentLesson)}
              </h3>
              
              {!showResult ? (
                <div className="space-y-3 sm:space-y-4">
                  {currentLesson.choices.map((choiceKey, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`quiz-opt-btn w-full p-4 sm:p-5 text-left rounded-lg border-2 transition-all duration-200 cursor-pointer min-h-[60px] sm:min-h-[70px] flex items-center justify-between group ${
                        selectedAnswer === index
                          ? 'selected bg-indigo-50 dark:bg-indigo-600 border-indigo-600 dark:border-indigo-500 shadow-md'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 shadow-sm'
                      }`}
                    >
                      <span className={`text-sm sm:text-base leading-relaxed flex-1 ${
                        selectedAnswer === index
                          ? 'text-indigo-700 dark:text-white font-semibold'
                          : 'text-slate-900 dark:text-white'
                      }`}>
                        {getChoiceText(choiceKey)}
                      </span>
                      {selectedAnswer === index && (
                        <TbCheck 
                          size={20} 
                          className="text-indigo-600 dark:text-white ml-3 flex-shrink-0" 
                          strokeWidth={2.5}
                        />
                      )}
                    </button>
                  ))}
                  
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null || isSubmitting}
                    loading={isSubmitting}
                    size="lg"
                    className="w-full cursor-pointer mt-6 sm:mt-8 py-3 sm:py-4"
                  >
                    {isSubmitting ? t('quiz.submitting') : t('quiz.submitAnswer')}
                  </Button>
                </div>
              ) : (
                <div className={`w-full py-8 px-6 rounded-2xl border-2 flex flex-col items-center justify-center text-center gap-4 transition-all duration-300 ${
                  isCorrect 
                    ? 'bg-white border-green-500 shadow-[0_4px_20px_rgba(34,197,94,0.15)] dark:bg-green-950/20 dark:border-green-500 dark:shadow-[0_0_30px_rgba(34,197,94,0.15)]' 
                    : 'bg-white border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)] dark:bg-red-950/20 dark:border-red-500 dark:shadow-[0_0_30px_rgba(239,68,68,0.15)]'
                }`}>
                  {/* Large Animated Icon */}
                  <div className="scale-110">
                    {isCorrect ? (
                      <div className="p-4 rounded-full mb-4 bg-slate-50 text-green-500 dark:bg-green-900/30 dark:text-green-400 flex items-center justify-center transition-colors">
                        <TbCheck size={48} className="drop-shadow-sm" strokeWidth={3} />
                      </div>
                    ) : (
                      <div className="p-4 rounded-full mb-4 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 flex items-center justify-center">
                        <TbX size={48} className="drop-shadow-md" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  
                  {/* Text Content */}
                  <div>
                    <h3 className={`text-2xl font-bold mb-2 ${
                      isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                    }`}>
                      {isCorrect ? t('quiz.correct') : t('quiz.incorrect')}
                    </h3>
                    
                    <p className={`font-medium ${
                      isCorrect ? 'text-green-600/90 dark:text-green-400/90' : 'text-red-600/80 dark:text-red-400/80'
                    }`}>
                      {isCorrect ? t('quiz.greatJob') : t('quiz.tryAgain')}
                    </p>
                  </div>
                  
                  {/* Show correct answer if wrong */}
                  {!isCorrect && (
                    <>
                      <div className="mt-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm">
                        <span className="text-slate-500 dark:text-slate-400 mr-2">{t('quiz.correctAnswer')}:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{getCorrectAnswerText(currentLesson)}</span>
                      </div>
                      
                      {/* Try Again Button */}
                      <div className="mt-6">
                        <Button
                          onClick={handleRetryQuestion}
                          className="bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-100 dark:hover:bg-red-900/60 border border-red-200 dark:border-red-700 transition-colors w-full sm:w-auto px-8 cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <TbRefresh size={20} className="flex-shrink-0" />
                            {t('quiz.tryAgain') || 'Tekrar Dene'}
                          </span>
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quest İstatistikleri - Adaptive Design (White in Light, Glass in Dark) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        {/* Card 1: Reward */}
        <div className="flex flex-col items-center p-4 sm:p-6 rounded-2xl border transition-all bg-white border-slate-200 shadow-sm dark:bg-slate-800/50 dark:border-slate-700/50 dark:backdrop-blur-md">
          <div className="p-3 rounded-full bg-yellow-500/20 text-yellow-500 dark:text-yellow-400 mb-2">
            <TbCoin size={24} strokeWidth={1.5} />
          </div>
          <span className="text-slate-500 dark:text-slate-400 text-sm mb-1">{t('quest.reward')}</span>
          <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {quest?.rewardAmount || 0} CQT
          </span>
        </div>
        
        {/* Card 2: Total Questions */}
        <div className="flex flex-col items-center p-4 sm:p-6 rounded-2xl border transition-all bg-white border-slate-200 shadow-sm dark:bg-slate-800/50 dark:border-slate-700/50 dark:backdrop-blur-md">
          <div className="p-3 rounded-full bg-blue-500/20 text-blue-500 dark:text-blue-400 mb-2">
            <TbStack2 size={24} strokeWidth={1.5} />
          </div>
          <span className="text-slate-500 dark:text-slate-400 text-sm mb-1">{t('quiz.totalLessons')}</span>
          <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {quest.lessons.length}
          </span>
        </div>
        
        {/* Card 3: Certificate */}
        <div className="flex flex-col items-center p-4 sm:p-6 rounded-2xl border transition-all bg-white border-slate-200 shadow-sm dark:bg-slate-800/50 dark:border-slate-700/50 dark:backdrop-blur-md">
          <div className="p-3 rounded-full bg-purple-500/20 text-purple-500 dark:text-purple-400 mb-2">
            <TbTrophy size={24} strokeWidth={1.5} />
          </div>
          <span className="text-slate-500 dark:text-slate-400 text-sm mb-1">{t('quiz.certificate')}</span>
          <div className="mt-1 flex items-center justify-center h-8">
            {(quest.certificateNftUrl || quest.nftUrl) ? (
              <TbCheck size={36} className="text-green-500" strokeWidth={3} />
            ) : (
              <TbX size={32} className="text-slate-300 dark:text-slate-600" strokeWidth={2} />
            )}
          </div>
        </div>
      </div>

      {/* Quest Completion Modal */}
      {showCelebration && (
        <QuestCompletionModal
          quest={quest}
          onClose={() => {
            console.log('DEBUG: QuestCompletionModal closed');
            setShowCelebration(false);
            setIsTestActive(false);
            onComplete();
          }}
          onComplete={() => {
            setIsTestActive(false);
            onComplete();
          }}
          onPageChange={onPageChange}
        />
      )}

      {/* Exit Warning Modal */}
      <ExitWarningModal
        isOpen={showCloseWarning}
        onConfirm={handleConfirmQuit}
        onCancel={() => setShowCloseWarning(false)}
      />
    </div>
  );
};

export default QuestQuiz;