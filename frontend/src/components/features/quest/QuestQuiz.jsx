import { useState, useEffect, useCallback } from 'react';
import { useContext } from 'react';
import { WalletContext } from '../../../context/WalletContext';
import { useLanguage } from '../../../context/LanguageContext';
import { useQuest } from '../../../context/QuestContext';
import { useNotification } from '../../../context/NotificationContext';
import useSound from '../../../hooks/useSound';
import { questApiService } from '../../../services/questApi';
import { questDatabase } from '../../../data/questData';
import { Card, CardContent, CardHeader } from '../../ui/Card';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';
import CelebrationModal from './CelebrationModal';

const QuestQuiz = ({ questId, onComplete, onClose }) => {
  const { publicKey } = useContext(WalletContext);
  const { t } = useLanguage();
  const { showSuccess, showError } = useNotification();
  const { submitAnswer, getQuestProgress, refreshUserBalance } = useQuest();
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
  const getDifficultyLevel = (questName) => {
    if (questName.toLowerCase().includes('temel') || questName.toLowerCase().includes('başlangıç')) {
      return { level: 'easy', color: 'green', label: 'Kolay' };
    } else if (questName.toLowerCase().includes('orta')) {
      return { level: 'medium', color: 'yellow', label: 'Orta' };
    } else if (questName.toLowerCase().includes('ileri') || questName.toLowerCase().includes('gelişmiş')) {
      return { level: 'hard', color: 'red', label: 'Zor' };
    }
    return { level: 'easy', color: 'green', label: 'Kolay' };
  };

  // 4 şıklı soru oluştur
  const generateMultipleChoice = useCallback((question, correctAnswer) => {
    const incorrectAnswers = generateIncorrectAnswers(correctAnswer);
    const allAnswers = [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5);
    
    return {
      question,
      correctAnswer,
      choices: allAnswers,
      correctIndex: allAnswers.indexOf(correctAnswer)
    };
  }, []);

  // Yanlış cevaplar oluştur
  const generateIncorrectAnswers = (correctAnswer) => {
    const answerType = detectAnswerType(correctAnswer);
    let incorrectAnswers = [];

    switch (answerType) {
      case 'protocol':
        incorrectAnswers = [
          'Proof of Work',
          'Proof of Stake', 
          'Delegated Proof of Stake'
        ];
        break;
      case 'time':
        incorrectAnswers = [
          '5 saniye',
          '30 saniye',
          '2 dakika'
        ];
        break;
      case 'token':
        incorrectAnswers = [
          'Bitcoin',
          'Ethereum',
          'Litecoin'
        ];
        break;
      case 'language':
        incorrectAnswers = [
          'JavaScript',
          'Python',
          'Go'
        ];
        break;
      default:
        incorrectAnswers = [
          'Seçenek A', 
          'Seçenek B', 
          'Seçenek C'
        ];
    }

    return incorrectAnswers.slice(0, 3);
  };

  // Cevap tipini tespit et
  const detectAnswerType = (answer) => {
    const lowerAnswer = answer.toLowerCase();
    if (lowerAnswer.includes('protocol') || lowerAnswer.includes('consensus')) return 'protocol';
    if (lowerAnswer.includes('saniye') || lowerAnswer.includes('dakika') || lowerAnswer.includes('saat')) return 'time';
    if (lowerAnswer.includes('token') || lowerAnswer.includes('coin') || lowerAnswer.includes('xlm')) return 'token';
    if (lowerAnswer.includes('rust') || lowerAnswer.includes('javascript') || lowerAnswer.includes('python')) return 'language';
    return 'concept';
  };

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

        // Her ders için multiple choice oluştur
        const lessonsWithChoices = realQuest.lessons.map(lesson => 
          generateMultipleChoice(lesson.question, lesson.correctAnswer)
        );

        setQuest({
          ...realQuest,
          lessons: lessonsWithChoices
        });
        
        // Kullanıcının mevcut ilerlemesini al
        const progress = getQuestProgress(realQuest);
        setCurrentLessonIndex(progress.currentStep);
        
        console.log(`Quest yüklendi: ${realQuest.name}, Soru sayısı: ${realQuest.lessons.length}`);
      } catch (error) {
        console.error('Quest yükleme hatası:', error);
        showError('Hata', 'Quest yüklenirken bir hata oluştu.');
      }
    };

    loadQuest();
  }, [questId, getQuestProgress, generateMultipleChoice, showError]);

  const currentLesson = quest?.lessons[currentLessonIndex];
  const difficulty = quest ? getDifficultyLevel(quest.name) : { level: 'easy', color: 'green', label: 'Kolay' };

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null || questCompleted) return;

    setIsSubmitting(true);
    try {
      const isAnswerCorrect = currentLesson.choices[selectedAnswer] === currentLesson.correctAnswer;
      setIsCorrect(isAnswerCorrect);
      setShowResult(true);

      // Store the user's answer
      const newAnswers = [...userAnswers, currentLesson.choices[selectedAnswer]];
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
          correctAnswer: currentLesson.correctAnswer
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
      
      // Check if quest is already completed
      const isAlreadyCompleted = await questApiService.isQuestCompleted(publicKey, questId);
      
      if (isAlreadyCompleted) {
        // Quest already completed - show message and don't transfer tokens
        setQuestCompleted(true);
        setIsSubmitting(false);
        showError('Quest Zaten Tamamlandı', 'Bu testi zaten tamamlamıştınız.');
        return;
      }
      
      // Call the secure API
      const result = await questApiService.completeQuest(publicKey, questId, answers);
      
      if (result.success) {
        // Mark quest as completed locally
        questApiService.markQuestCompleted(publicKey, questId);
        setQuestCompleted(true);
        
        // Add reward to claimable balance instead of immediate transfer
        questApiService.addToClaimableBalance(publicKey, result.data.rewardAmount);
        
        // CRITICAL: Set loading to false immediately on success
        setIsSubmitting(false);
        
        // Show celebration
        setShowCelebration(true);
        showSuccess(
          'Tebrikler! Görevi tamamladınız.', 
          `${result.data.rewardAmount} token claimable balance'a eklendi!`
        );
        
        // Update user stats in context
        await submitAnswer(publicKey, questId, currentLessonIndex, answers[answers.length - 1]);
        
        // CRITICAL: Refresh user balance to show updated token amount
        await refreshUserBalance(publicKey);
        
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
                  {wrongLesson.lesson.question}
                </h3>
                <div className="space-y-3">
                  {wrongLesson.lesson.choices.map((choice, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border-2 ${
                        index === wrongLesson.wrongAnswer
                          ? 'border-red-500 bg-red-100 dark:bg-red-800/30'
                          : index === wrongLesson.lesson.choices.indexOf(wrongLesson.correctAnswer)
                          ? 'border-green-500 bg-green-100 dark:bg-green-800/30'
                          : 'border-slate-200 dark:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full border-2 mr-3 ${
                          index === wrongLesson.wrongAnswer
                            ? 'border-red-500 bg-red-500'
                            : index === wrongLesson.lesson.choices.indexOf(wrongLesson.correctAnswer)
                            ? 'border-green-500 bg-green-500'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}>
                          {index === wrongLesson.wrongAnswer && (
                            <div className="w-full h-full rounded-full bg-white scale-50">❌</div>
                          )}
                          {index === wrongLesson.lesson.choices.indexOf(wrongLesson.correctAnswer) && (
                            <div className="w-full h-full rounded-full bg-white scale-50">✅</div>
                          )}
                        </div>
                        <span className="text-slate-900 dark:text-white">{choice}</span>
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

  if (!quest || !currentLesson) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
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
                Quest Tamamlandı!
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-6">
                Bu quest'i zaten başarıyla tamamladınız. Yeni quest'leri keşfetmek için ana sayfaya dönün.
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
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {quest.name}
                </h2>
                <Badge 
                  variant="outline" 
                  className={`text-xs px-2 py-1 bg-${difficulty.color}-100 text-${difficulty.color}-800 border-${difficulty.color}-300`}
                >
                  {difficulty.label}
                </Badge>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                {quest.description}
              </p>
            </div>
            <Button
              onClick={onClose}
              variant="outline"
              size="sm"
              className="cursor-pointer"
            >
              {t('quiz.close')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {t('quiz.progress')}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentLessonIndex + 1) / quest.lessons.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {currentLessonIndex + 1} / {quest.lessons.length}
                </span>
              </div>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              {t('quiz.timeEstimate')}: {quest.lessons.length * 2} {t('quiz.minutes')}
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                {currentLesson.question}
              </h3>
              
              {!showResult ? (
                <div className="space-y-3">
                  {currentLesson.choices.map((choice, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all cursor-pointer ${
                        selectedAnswer === index
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                          : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full border-2 mr-3 ${
                          selectedAnswer === index
                            ? 'border-indigo-500 bg-indigo-500'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}>
                          {selectedAnswer === index && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                        <span className="text-slate-900 dark:text-white">{choice}</span>
                      </div>
                    </button>
                  ))}
                  
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null || isSubmitting}
                    loading={isSubmitting}
                    size="lg"
                    className="w-full cursor-pointer"
                  >
                    {isSubmitting ? t('quiz.submitting') : t('quiz.submitAnswer')}
                  </Button>
                </div>
              ) : (
                <div className={`p-6 rounded-lg ${
                  isCorrect 
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700' 
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700'
                }`}>
                  <div className="text-center">
                    <div className={`text-4xl mb-4 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                      {isCorrect ? '✅' : '❌'}
                    </div>
                    <h4 className={`text-xl font-semibold mb-2 ${
                      isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                    }`}>
                      {isCorrect ? t('quiz.correct') : t('quiz.incorrect')}
                    </h4>
                    <p className={`text-sm ${
                      isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                    }`}>
                      {isCorrect ? t('quiz.greatJob') : t('quiz.tryAgain')}
                    </p>
                    {!isCorrect && (
                      <div className="mt-4 p-4 bg-white dark:bg-slate-800 rounded-lg">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          {t('quiz.correctAnswer')}:
                        </p>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {currentLesson.correctAnswer}
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

      {/* Quest İstatistikleri */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl mb-2">🪙</div>
            <div className="text-sm text-slate-700 dark:text-slate-400">{t('quest.reward')}</div>
            <div className="font-semibold text-slate-900 dark:text-white">
              {quest.rewardAmount || 100}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl mb-2">📚</div>
            <div className="text-sm text-slate-700 dark:text-slate-400">{t('quiz.totalLessons')}</div>
            <div className="font-semibold text-slate-900 dark:text-white">
              {quest.lessons.length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl mb-2">🏆</div>
            <div className="text-sm text-slate-700 dark:text-slate-400">{t('quiz.certificate')}</div>
            <div className="font-semibold text-slate-900 dark:text-white">
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