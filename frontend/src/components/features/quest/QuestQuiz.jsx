import { useState, useEffect } from 'react';
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
  const { addToClaimableBalance } = useBalance();
  const { setIsTestActive } = useTestStatus();
  const { playSuccessSound, playErrorSound, playClickSound } = useSound();
  
  const [quest, setQuest] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // UI için anlık yanlışlar (Tekrar dene deyince silinir)
  const [wrongAnswers, setWrongAnswers] = useState([]);
  
  // --- AI İÇİN KALICI YANLIŞLAR (ASLA SİLİNMEZ) ---
  const [allFailedQuestions, setAllFailedQuestions] = useState([]);
  
  const [showWrongAnswers, setShowWrongAnswers] = useState(false);
  const [currentWrongIndex, setCurrentWrongIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questCompleted, setQuestCompleted] = useState(false);
  const [showCloseWarning, setShowCloseWarning] = useState(false);
  const [questReward, setQuestReward] = useState(0);
  const [questSuccess, setQuestSuccess] = useState(true);
  
  // Güvenlik Sayaçları
  const [hasMadeMistake, setHasMadeMistake] = useState(false);
  const [mistakeCounter, setMistakeCounter] = useState(0);

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
      case 'beginner': return { level: 'easy', color: 'green', label: t('category.beginner') };
      case 'intermediate': return { level: 'medium', color: 'yellow', label: t('category.intermediate') };
      case 'advanced': return { level: 'hard', color: 'red', label: t('category.advanced') };
      default: return { level: 'easy', color: 'green', label: t('category.beginner') };
    }
  };

  useEffect(() => {
    const loadQuest = async () => {
      try {
        if (customQuestions && customQuestions.length > 0) {
          // AI Generated Quest Logic
           const difficultyMap = {
            'Kolay': 'beginner', 'Orta': 'intermediate', 'Zor': 'advanced',
            'Easy': 'beginner', 'Medium': 'intermediate', 'Hard': 'advanced'
          };
          const systemDifficulty = customDifficulty ? (difficultyMap[customDifficulty] || customDifficulty) : 'intermediate';
          
          const customQuest = {
            id: 'ai-generated-quiz',
            nameKey: customQuestTitle || 'AI Generated Quiz',
            descriptionKey: customQuestTopic || 'AI Generated Quiz',
            category: 'ai-generated',
            difficulty: systemDifficulty,
            rewardAmount: 20,
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
          setUserAnswers(new Array(customQuestions.length).fill(null));
          setHasMadeMistake(false);
          setMistakeCounter(0); 
          setAllFailedQuestions([]); // SIFIRLA
          setQuestCompleted(false);
          setQuestReward(0);
          setQuestSuccess(true);
          setActiveQuiz('ai-generated-quiz');
          setIsTestActive(true);
          return;
        }

        if (!questId) return;

        const realQuest = questDatabase.find(q => q.id === questId);
        if (!realQuest) {
          if (!customQuestions) {
            showError('Quest Bulunamadı', 'Bu quest mevcut değil.');
            setQuest(null);
          }
          return;
        }

        setQuest(realQuest);
        const progress = getQuestProgress(realQuest);
        setCurrentLessonIndex(progress.currentStep);
        setActiveQuiz(questId);
        setIsTestActive(true);
        
        // Resetler
        setMistakeCounter(0);
        setHasMadeMistake(false);
        setAllFailedQuestions([]); 
        
      } catch (error) {
        console.error('[QuestQuiz] Quest loading error:', error);
        showError('Hata', 'Quest yüklenirken bir hata oluştu.');
      }
    };

    if (questId || (customQuestions && customQuestions.length > 0)) {
      loadQuest();
    }
    
    return () => {
      clearActiveQuiz();
      setIsTestActive(false);
    };
  }, [questId, customQuestions]);

  const currentLesson = quest?.lessons[currentLessonIndex];
  const difficulty = quest ? getDifficultyLevel(quest) : { level: 'easy', color: 'green', label: 'Kolay' };

  const getQuestionText = (lesson) => lesson ? (lesson.questionKey?.startsWith('quests.') ? t(lesson.questionKey) : (lesson.questionKey || lesson.question || '')) : '';
  const getChoiceText = (choice) => choice ? (choice.startsWith('quests.') ? t(choice) : choice) : '';
  const getCorrectAnswerText = (lesson) => lesson ? (lesson.correctAnswerKey?.startsWith('quests.') ? t(lesson.correctAnswerKey) : (lesson.correctAnswerKey || lesson.correctAnswer || '')) : '';

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
        // --- YANLIŞ CEVAP MANTIĞI ---
        setHasMadeMistake(true); 
        setMistakeCounter(prev => prev + 1);
        
        const failedQuestionData = {
          lesson: currentLesson,
          wrongAnswer: selectedAnswer,
          correctAnswer: currentLesson.correctAnswerKey
        };

        // 1. UI için geçici listeye ekle
        setWrongAnswers(prev => [...prev, failedQuestionData]);
        
        // 2. AI için KALICI listeye ekle (Asla silinmez)
        setAllFailedQuestions(prev => [...prev, failedQuestionData]);

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
      const answeredCount = answers.filter(a => a !== null && a !== undefined).length;
      if (answeredCount !== quest.lessons.length) {
        throw new Error(`Quest tamamlanamadı: ${answeredCount}/${quest.lessons.length} soru cevaplandı.`);
      }
      
      const userIdentifier = isDemoMode ? 'demo' : publicKey;
      const isAlreadyCompleted = await questApiService.isQuestCompleted(userIdentifier, questId);
      
      if (isAlreadyCompleted) {
        setQuestCompleted(true);
        setIsSubmitting(false);
        showError('Quest Zaten Tamamlandı', 'Bu testi zaten tamamlamıştınız.');
        return;
      }
      
      if (customQuestions) {
          // AI Quiz Logic (Aynı)
          // ...
           const isAiQuiz = quest.id === 'ai-generated-quiz' || quest.category === 'ai-generated';
        const allAnswersCorrect = answers.every((answer, index) => {
          const lesson = quest.lessons[index];
          if (!lesson) return false;
          const correctAnswer = lesson.correctAnswerKey || lesson.correctAnswer;
          return answer && correctAnswer && 
                 answer.toString().trim().toLowerCase() === correctAnswer.toString().trim().toLowerCase();
        });
        
        let reward = 0;
        let isSuccess = false;
        
        if (isAiQuiz) {
          if (hasMadeMistake || !allAnswersCorrect) {
            reward = 0;
            isSuccess = false;
            showError(t('quiz.failed'), t('quiz.failedMessage'));
          } else {
            reward = AI_QUIZ_REWARD;
            isSuccess = true;
            addToClaimableBalance(userIdentifier, reward);
            showSuccess(t('quiz.completed'), `${reward} CQT token kazanıldı!`);
          }
        } else {
          if (allAnswersCorrect) {
            reward = AI_QUIZ_REWARD;
            isSuccess = true;
            addToClaimableBalance(userIdentifier, reward);
            showSuccess(t('quiz.completed'), `${reward} CQT token kazanıldı!`);
          } else {
            reward = 0;
            isSuccess = false;
            showError(t('quiz.failed'), t('quiz.failedMessage'));
          }
        }
        
        setQuestReward(reward);
        setQuestSuccess(isSuccess);
        setIsSubmitting(false);
        setQuestCompleted(true);
        clearActiveQuiz();
        setShowCelebration(true);
        return;
      }
      
      // --- NORMAL QUEST GÜVENLİK ---
      if (hasMadeMistake || mistakeCounter > 0) {
          console.log(`[QuestQuiz] Hata tespit edildi. AI listesi uzunluğu: ${allFailedQuestions.length}`);
          
          setQuestReward(0);
          setQuestSuccess(false);
          setQuestCompleted(true);
          setIsSubmitting(false);
          setShowCelebration(true);
          
          showError(t('quiz.failed'), 'Maalesef testte yanlış cevaplarınız olduğu için CQT Token kazanamadınız.');
          
          // Sunucuya bildir ama token isteme
          await questApiService.completeQuest(userIdentifier, questId, answers, isDemoMode, Math.max(mistakeCounter, 1));
          return;
      }

      const result = await questApiService.completeQuest(userIdentifier, questId, answers, isDemoMode, 0);
      
      if (result.success) {
        questApiService.markQuestCompleted(userIdentifier, questId);
        setQuestCompleted(true);
        clearActiveQuiz();
        
        const standardReward = result.data.rewardAmount || quest.rewardAmount || STANDARD_QUEST_REWARD_DEFAULT;
        addToClaimableBalance(userIdentifier, standardReward);
        
        setQuestReward(standardReward);
        setQuestSuccess(true);
        setIsSubmitting(false);
        setShowCelebration(true);
        showSuccess('Tebrikler!', `${standardReward} token kazanıldı!`);
        
        if (!isDemoMode) {
          await submitAnswer(publicKey, questId, currentLessonIndex, answers[answers.length - 1]);
          await refreshUserBalance(publicKey);
          refreshTokenData();
        }
      } else {
        setQuestReward(0);
        setQuestSuccess(false);
        setQuestCompleted(true);
        setIsSubmitting(false);
        setShowCelebration(true);
        showError('Ödül Kazanılamadı', result.error);
      }
    } catch (error) {
      console.error('Completion error:', error);
      showError('Hata', error.message);
      setIsSubmitting(false);
    }
  };

  const handleNextWrongAnswer = () => {
    if (currentWrongIndex < wrongAnswers.length - 1) {
      setCurrentWrongIndex(currentWrongIndex + 1);
    } else {
      setShowWrongAnswers(false);
      setWrongAnswers([]); // SADECE UI'ı TEMİZLE
      setCurrentWrongIndex(0);
    }
  };

  const handleSkipWrongAnswers = () => {
    setShowWrongAnswers(false);
    setWrongAnswers([]); // SADECE UI'ı TEMİZLE
    setCurrentWrongIndex(0);
  };

  const handleConfirmQuit = () => {
    clearActiveQuiz();
    setIsTestActive(false);
    onClose();
    setShowCloseWarning(false);
  };

  const handleRetryQuestion = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    setIsSubmitting(false);
    setIsCorrect(false);
    playClickSound();
  };

  // ... (UI Render kısımları aynı) ...
  // Şıkların görünümü vb. düzgün
  
  if (showWrongAnswers && wrongAnswers.length > 0) {
    const wrongLesson = wrongAnswers[currentWrongIndex];
    const isLastWrong = currentWrongIndex === wrongAnswers.length - 1;
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('quiz.wrongAnswers')}</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">{t(wrongLesson.lesson.questionKey)}</h3>
                <div className="space-y-3">
                  {wrongLesson.lesson.choices.map((choiceKey, index) => (
                    <div key={index} className={`p-3 rounded-lg border-2 ${index === wrongLesson.wrongAnswer ? 'border-red-500 bg-red-100 dark:bg-red-800/30' : choiceKey === wrongLesson.correctAnswer ? 'border-green-500 bg-green-100 dark:bg-green-800/30' : 'border-slate-200 dark:border-slate-600'}`}>
                      <span className="text-slate-900 dark:text-white">{t(choiceKey)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleSkipWrongAnswers} variant="outline" className="flex-1 cursor-pointer">{t('quiz.skip')}</Button>
                <Button onClick={handleNextWrongAnswer} className="flex-1 cursor-pointer">{isLastWrong ? t('quiz.finish') : t('quiz.next')}</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!showCelebration && !questCompleted && (!quest || !currentLesson)) {
    return <div className="flex items-center justify-center min-h-[400px]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  }
  
  if (!questId && !(customQuestions && customQuestions.length > 0)) {
    return <div className="flex items-center justify-center min-h-[400px]"><div className="text-center">❌</div></div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <style>{`
        .quiz-opt-btn:hover { background-color: #eef2ff !important; border-color: #a5b4fc !important; }
        .quiz-opt-btn:hover span { color: #4338ca !important; }
        .dark .quiz-opt-btn:hover { background-color: #334155 !important; border-color: #475569 !important; }
        .dark .quiz-opt-btn:hover span { color: #ffffff !important; }
      `}</style>
      
      <Card className="mb-6">
        <CardHeader className="p-4 sm:p-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{t(quest.nameKey)}</h2>
              <Button onClick={() => setShowCloseWarning(true)} variant="outline" size="sm">{t('quiz.close')}</Button>
            </div>
            <div className="flex justify-start"><Badge variant="outline" className={`bg-${difficulty.color}-100 text-${difficulty.color}-800`}>{difficulty.label}</Badge></div>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{t(quest.descriptionKey)}</p>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
           {/* Progress Bar */}
          <div className="space-y-4 mb-6">
            <div className="space-y-2">
              <div className="flex items-center justify-end"><span className="text-sm font-medium dark:text-white">{currentLessonIndex + 1} / {quest.lessons.length}</span></div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3"><div className="bg-indigo-600 h-3 rounded-full transition-all duration-300" style={{ width: `${((currentLessonIndex + 1) / quest.lessons.length) * 100}%` }}></div></div>
            </div>
          </div>
          
          {/* Soru Alanı */}
          <div className="space-y-6">
            <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-4 sm:mb-6">{getQuestionText(currentLesson)}</h3>
              {!showResult ? (
                <div className="space-y-3 sm:space-y-4">
                  {currentLesson.choices.map((choiceKey, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 sm:p-5 text-left rounded-lg border-2 transition-all duration-200 cursor-pointer min-h-[60px] flex items-center justify-between group
                        ${selectedAnswer === index
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-700 dark:bg-indigo-600 dark:border-indigo-500 dark:text-white shadow-md'
                          : 'bg-white border-slate-200 text-slate-900 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200 shadow-sm'
                        }`}
                    >
                      <span className="text-sm sm:text-base flex-1 font-medium">{getChoiceText(choiceKey)}</span>
                      {selectedAnswer === index && <TbCheck size={20} className="ml-3 flex-shrink-0" strokeWidth={2.5} />}
                    </button>
                  ))}
                  <Button onClick={handleSubmitAnswer} disabled={selectedAnswer === null || isSubmitting} loading={isSubmitting} size="lg" className="w-full mt-6 py-3">{isSubmitting ? t('quiz.submitting') : t('quiz.submitAnswer')}</Button>
                </div>
              ) : (
                <div className={`w-full py-8 px-6 rounded-2xl border-2 flex flex-col items-center justify-center text-center gap-4 ${isCorrect ? 'bg-white border-green-500 dark:bg-green-950/20 dark:border-green-500' : 'bg-white border-red-500 dark:bg-red-950/20 dark:border-red-500'}`}>
                   {/* Sonuç İkonu */}
                   <div className="scale-110">
                    {isCorrect ? <div className="p-4 rounded-full mb-4 bg-slate-50 text-green-500 dark:bg-green-900/30 dark:text-green-400"><TbCheck size={48} /></div> : <div className="p-4 rounded-full mb-4 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"><TbX size={48} /></div>}
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold mb-2 ${isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>{isCorrect ? t('quiz.correct') : t('quiz.incorrect')}</h3>
                    <p className={`font-medium ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{isCorrect ? t('quiz.greatJob') : t('quiz.tryAgain')}</p>
                  </div>
                  {!isCorrect && (
                    <>
                      <div className="mt-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm">
                        <span className="text-slate-500 dark:text-slate-400 mr-2">{t('quiz.correctAnswer')}:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{getCorrectAnswerText(currentLesson)}</span>
                      </div>
                      <div className="mt-6">
                        <Button onClick={handleRetryQuestion} className="bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-100 border border-red-200 dark:border-red-700 w-full sm:w-auto px-8">
                          <span className="flex items-center gap-2"><TbRefresh size={20} />{t('quiz.tryAgain')}</span>
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

      {/* --- FİNAL MODAL: KANIT --- */}
      {/* Burada artık 'wrongAnswers' yerine 'allFailedQuestions' gidiyor */}
      {showCelebration && (
        <QuestCompletionModal 
          quest={quest} 
          onClose={() => { setShowCelebration(false); setIsTestActive(false); onComplete(); }} 
          onComplete={() => { setIsTestActive(false); onComplete(); }} 
          onPageChange={onPageChange} 
          reward={questReward} 
          isSuccess={questSuccess} 
          wrongAnswers={allFailedQuestions} 
        />
      )}

      <ExitWarningModal isOpen={showCloseWarning} onConfirm={handleConfirmQuit} onCancel={() => setShowCloseWarning(false)} />
    </div>
  );
};

export default QuestQuiz;