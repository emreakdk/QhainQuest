import { useState, useEffect, useCallback } from 'react';
import { useContext } from 'react';
import { WalletContext } from '../../../context/WalletContext';
import { useLanguage } from '../../../context/LanguageContext';
import { useQuest } from '../../../context/QuestContext';
import { useToken } from '../../../context/TokenContext';
import { useBalance } from '../../../context/BalanceContext';
import { useNotification } from '../../../context/NotificationContext';
import useSound from '../../../hooks/useSound';
import { questApiService } from '../../../services/questApi';
import { questDatabase } from '../../../data/questData';
import { Card, CardContent, CardHeader } from '../../ui/Card';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';
import CelebrationModal from './CelebrationModal';

const QuestQuiz = ({ questId, onComplete, onClose }) => {
  const { publicKey, isDemoMode } = useContext(WalletContext);
  const { t } = useLanguage();
  const { showSuccess, showError } = useNotification();
  const { submitAnswer, getQuestProgress, refreshUserBalance } = useQuest();
  const { refreshTokenData } = useToken();
  const { addToClaimableBalance } = useBalance(); // Use global balance context
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

  // DEBUG: isSubmitting state değişimini izle
  useEffect(() => {
    console.log('DEBUG: isSubmitting state changed to:', isSubmitting);
  }, [isSubmitting]);

  // DEBUG: showCelebration state değişimini izle
  useEffect(() => {
    console.log('DEBUG: showCelebration state changed to:', showCelebration);
  }, [showCelebration]);

  // Check if quest is already completed
  useEffect(() => {
    const checkQuestCompletion = async () => {
      if (publicKey && questId) {
        const isCompleted = await questApiService.isQuestCompleted(publicKey, questId);
        setQuestCompleted(isCompleted);
      }
    };
    
    checkQuestCompletion();
  }, [publicKey, questId]);

  // Zorluk seviyeleri için quest kategorileri
  const getDifficultyLevel = (quest) => {
    // Quest object'inden difficulty property'sini kullan
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

  // generateMultipleChoice ve ilgili fonksiyonlar artık gereksiz
  // Quest data zaten i18n key'leri ile hazır geliyor

  useEffect(() => {
    // Quest verilerini yükle
    const loadQuest = async () => {
      try {
        // questDatabase'den gerçek quest verilerini al
        const realQuest = questDatabase.find(q => q.id === questId);
        
        if (!realQuest) {
          console.error('Quest bulunamadı:', questId);
          showError('Quest Bulunamadı', 'Bu quest mevcut değil.');
          return;
        }

        // Quest data zaten i18n key'leri ile hazır, direkt kullan
        setQuest(realQuest);
        
        // Kullanıcının mevcut ilerlemesini al
        const progress = getQuestProgress(realQuest);
        setCurrentLessonIndex(progress.currentStep);
        
        console.log(`Quest yüklendi: ${t(realQuest.nameKey)}, Soru sayısı: ${realQuest.lessons.length}`);
      } catch (error) {
        console.error('Quest yükleme hatası:', error);
        showError('Hata', 'Quest yüklenirken bir hata oluştu.');
      }
    };

    loadQuest();
  }, [questId, getQuestProgress, showError]);

  const currentLesson = quest?.lessons[currentLessonIndex];
  const difficulty = quest ? getDifficultyLevel(quest) : { level: 'easy', color: 'green', label: 'Kolay' };

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

      // Store the user's answer
      const newAnswers = [...userAnswers, selectedChoiceKey];
      setUserAnswers(newAnswers);

      if (isAnswerCorrect) {
        showSuccess(t('quiz.correct'), t('quiz.greatJob'));
        playSuccessSound();
        
        // Sonraki derse geç veya quest'i tamamla
        if (currentLessonIndex < quest.lessons.length - 1) {
          setTimeout(() => {
            setCurrentLessonIndex(currentLessonIndex + 1);
            setSelectedAnswer(null);
            setShowResult(false);
            setIsSubmitting(false);
          }, 2000);
        } else {
          // Quest tamamlandı - secure API'ye gönder
          await completeQuestSecurely(newAnswers);
        }
      } else {
        // Yanlış cevap - wrongAnswers listesine ekle
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

  // Secure quest completion function
  const completeQuestSecurely = async (answers) => {
    try {
      console.log('Completing quest securely with answers:', answers);
      
      // Validate that all questions are answered
      if (answers.length !== quest.lessons.length) {
        throw new Error(`Quest tamamlanamadı: ${answers.length}/${quest.lessons.length} soru cevaplandı. Tüm soruları cevaplamalısınız.`);
      }
      
      // Determine user identifier (wallet address or demo mode)
      const userIdentifier = isDemoMode ? 'demo' : publicKey;
      
      // Check if quest is already completed (ALWAYS check, including demo mode)
      const isAlreadyCompleted = await questApiService.isQuestCompleted(userIdentifier, questId);
      
      if (isAlreadyCompleted) {
        // Quest already completed - show message and don't transfer tokens
        setQuestCompleted(true);
        setIsSubmitting(false);
        showError('Quest Zaten Tamamlandı', 'Bu testi zaten tamamlamıştınız.');
        return;
      }
      
      // Call the secure API (with demo mode support)
      const result = await questApiService.completeQuest(userIdentifier, questId, answers, isDemoMode);
      
      if (result.success) {
        // Mark quest as completed locally (ALWAYS save, including demo mode)
        questApiService.markQuestCompleted(userIdentifier, questId);
        setQuestCompleted(true);
        
        // Add reward to claimable balance using global balance context
        addToClaimableBalance(userIdentifier, result.data.rewardAmount);
        
        // CRITICAL: Set loading to false immediately on success
        setIsSubmitting(false);
        
        // Show celebration
        setShowCelebration(true);
        showSuccess(
          'Tebrikler! Görevi tamamladınız.', 
          `${result.data.rewardAmount} token claimable balance'a eklendi!`
        );
        
        // Update user stats in context (skip for demo mode)
        if (!isDemoMode) {
          await submitAnswer(publicKey, questId, currentLessonIndex, answers[answers.length - 1]);
          
          // CRITICAL: Refresh user balance to show updated token amount
          await refreshUserBalance(publicKey);
          
          // Refresh centralized token data (no more page reload needed!)
          refreshTokenData();
        }
        
        console.log('Quest completed successfully:', result.data);
      } else {
        throw new Error(result.error || 'Quest completion failed');
      }
    } catch (error) {
      console.error('Secure quest completion error:', error);
      showError('Quest Tamamlanamadı', error.message);
      // CRITICAL: Set loading to false on error too
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

  // Yanlış cevapları tekrar etme modu
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

  // Guard clause: Prevent crash if quest data is not loaded yet or quest is not found
  // This must be checked BEFORE accessing any quest properties
  // Skip this check if showing celebration or completed state (quest data should already be loaded)
  if (!showCelebration && !questCompleted && (!quest || !currentLesson)) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Additional guard clause: Prevent crash if questId is invalid or quest is not found
  if (!questId) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Quest Bulunamadı
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Geçersiz quest ID. Lütfen ana sayfaya dönün ve tekrar deneyin.
          </p>
          <Button
            onClick={onClose}
            className="cursor-pointer"
          >
            Ana Sayfaya Dön
          </Button>
        </div>
      </div>
    );
  }

  // Show completed quest message
  if (questCompleted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="mb-6">
          <CardHeader>
            <div className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {t('profile.questCompleted')}!
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-6">
                {t('quest.alreadyCompleted')}
              </p>
              <Button
                onClick={onClose}
                className="cursor-pointer"
              >
                Ana Sayfaya Dön
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Kutlama Modal'ı
  if (showCelebration) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md mx-4 text-center animate-scale-in">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {t('celebration.title')}
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            {t('celebration.message')}
          </p>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <span className="text-slate-600 dark:text-slate-300">{t('celebration.tokensEarned')}</span>
              <span className="font-bold text-slate-900 dark:text-white">{quest.rewardAmount || 100}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <span className="text-slate-600 dark:text-slate-300">{t('celebration.certificate')}</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {(quest.certificateNftUrl || quest.nftUrl) ? '✓' : '✗'}
              </span>
            </div>
          </div>
          <Button
            onClick={onComplete}
            className="w-full mt-6 cursor-pointer"
          >
            {t('celebration.continue')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
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
                onClick={onClose}
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
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {t('quiz.progress')}
                </span>
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
                {t(currentLesson.questionKey)}
              </h3>
              
              {!showResult ? (
                <div className="space-y-3 sm:space-y-4">
                  {currentLesson.choices.map((choiceKey, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 sm:p-5 text-left rounded-lg border-2 transition-all cursor-pointer min-h-[60px] sm:min-h-[70px] ${
                        selectedAnswer === index
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                          : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 mr-3 sm:mr-4 flex-shrink-0 ${
                          selectedAnswer === index
                            ? 'border-indigo-500 bg-indigo-500'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}>
                          {selectedAnswer === index && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                        <span className="text-sm sm:text-base text-slate-900 dark:text-white leading-relaxed">{t(choiceKey)}</span>
                      </div>
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
                <div className={`p-4 sm:p-6 rounded-lg ${
                  isCorrect 
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700' 
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700'
                }`}>
                  <div className="text-center">
                    <div className={`text-3xl sm:text-4xl mb-4 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                      {isCorrect ? '✅' : '❌'}
                    </div>
                    <h4 className={`text-lg sm:text-xl font-semibold mb-2 ${
                      isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                    }`}>
                      {isCorrect ? t('quiz.correct') : t('quiz.incorrect')}
                    </h4>
                    <p className={`text-sm sm:text-base ${
                      isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                    }`}>
                      {isCorrect ? t('quiz.greatJob') : t('quiz.tryAgain')}
                    </p>
                    {!isCorrect && (
                      <div className="mt-4 p-3 sm:p-4 bg-white dark:bg-slate-800 rounded-lg">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          {t('quiz.correctAnswer')}:
                        </p>
                        <p className="font-medium text-slate-900 dark:text-white text-sm sm:text-base">
                          {t(currentLesson.correctAnswerKey)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quest İstatistikleri - Mobile-first grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl mb-2">🪙</div>
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-400">{t('quest.reward')}</div>
            <div className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
              {quest.rewardAmount || 100}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl mb-2">📚</div>
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-400">{t('quiz.totalLessons')}</div>
            <div className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
              {quest.lessons.length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl mb-2">🏆</div>
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-400">{t('quiz.certificate')}</div>
            <div className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
              {(quest.certificateNftUrl || quest.nftUrl) ? '✓' : '✗'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Celebration Modal */}
      {showCelebration && (
        <CelebrationModal
          quest={quest}
          onClose={() => {
            console.log('DEBUG: CelebrationModal closed');
            setShowCelebration(false);
            onComplete();
          }}
          onComplete={onComplete}
        />
      )}
    </div>
  );
};

export default QuestQuiz;