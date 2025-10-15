import { useState, useEffect, useCallback } from 'react';
import { useContext } from 'react';
import { WalletContext } from '../../../context/WalletContext';
import { useLanguage } from '../../../context/LanguageContext';
import { useQuest } from '../../../context/QuestContext';
import { useNotification } from '../../../context/NotificationContext';
import useSound from '../../../hooks/useSound';
import { Card, CardContent, CardHeader } from '../../ui/Card';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';
import CelebrationModal from './CelebrationModal';

const QuestQuiz = ({ questId, onComplete, onClose }) => {
  const { publicKey } = useContext(WalletContext);
  const { t } = useLanguage();
  const { showSuccess, showError } = useNotification();
  const { submitAnswer, getQuestProgress } = useQuest();
  const { playSuccessSound, playErrorSound, playClickSound } = useSound();
  
  const [quest, setQuest] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]); // Yanlış cevaplar için
  const [showWrongAnswers, setShowWrongAnswers] = useState(false);
  const [currentWrongIndex, setCurrentWrongIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // DEBUG: isSubmitting state değişimini izle
  useEffect(() => {
    console.log('DEBUG: isSubmitting state changed to:', isSubmitting);
  }, [isSubmitting]);

  // DEBUG: showCelebration state değişimini izle
  useEffect(() => {
    console.log('DEBUG: showCelebration state changed to:', showCelebration);
  }, [showCelebration]);

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

  // Yanlış şıklar oluştur
  const generateIncorrectAnswers = (correctAnswer) => {
    const answerType = detectAnswerType(correctAnswer);
    const incorrectAnswers = [];

    switch (answerType) {
      case 'protocol':
        incorrectAnswers.push(
          'Proof of Work (PoW)',
          'Proof of Stake (PoS)',
          'Delegated Proof of Stake (DPoS)'
        );
        break;
      case 'time':
        incorrectAnswers.push(
          '10-15 saniye',
          '1-2 dakika',
          '5-10 dakika'
        );
        break;
      case 'token':
        incorrectAnswers.push(
          'ETH (Ethereum)',
          'BTC (Bitcoin)',
          'ADA (Cardano)'
        );
        break;
      case 'language':
        incorrectAnswers.push(
          'JavaScript',
          'Python',
          'Go'
        );
        break;
      case 'concept':
        incorrectAnswers.push(
          'Merkle Tree',
          'Hash Function',
          'Digital Signature'
        );
        break;
      default:
        incorrectAnswers.push(
          'Seçenek A',
          'Seçenek B', 
          'Seçenek C'
        );
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
        // Mock quest data - 4 şıklı sorular ile
        const mockQuest = {
          id: questId,
          name: "Stellar Temelleri",
          description: "Stellar blockchain'in temel kavramlarını öğrenin.",
          lessons: [
            {
              id: 0,
              question: "Stellar ağında işlemler hangi konsensüs algoritması ile doğrulanır?",
              correctAnswer: "Stellar Consensus Protocol (SCP)"
            },
            {
              id: 1,
              question: "Stellar'da bir işlem kaç saniyede onaylanır?",
              correctAnswer: "3-5 saniye"
            },
            {
              id: 2,
              question: "Stellar ağında kullanılan native token'ın adı nedir?",
              correctAnswer: "XLM (Lumen)"
            },
            {
              id: 3,
              question: "Soroban hangi programlama dili ile yazılır?",
              correctAnswer: "Rust"
            },
            {
              id: 4,
              question: "Stellar'da bir hesap oluşturmak için minimum kaç XLM gerekir?",
              correctAnswer: "1 XLM"
            }
          ],
          rewardAmount: 100,
          certificateNftUrl: 'https://ipfs.io/ipfs/QmMockCert'
        };

        // Her ders için 4 şıklı soru oluştur
        const enhancedLessons = mockQuest.lessons.map(lesson => ({
          ...lesson,
          ...generateMultipleChoice(lesson.question, lesson.correctAnswer)
        }));

        setQuest({
          ...mockQuest,
          lessons: enhancedLessons
        });
        
        // Kullanıcının mevcut ilerlemesini al
        const progress = getQuestProgress(mockQuest);
        setCurrentLessonIndex(progress.currentStep);
      } catch (error) {
        console.error('Quest yükleme hatası:', error);
      }
    };

    loadQuest();
  }, [questId, getQuestProgress, generateMultipleChoice]);

  const currentLesson = quest?.lessons[currentLessonIndex];
  const difficulty = quest ? getDifficultyLevel(quest.name) : { level: 'easy', color: 'green', label: 'Kolay' };

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null) return;

    setIsSubmitting(true);
    try {
      const isAnswerCorrect = currentLesson.choices[selectedAnswer] === currentLesson.correctAnswer;
      setIsCorrect(isAnswerCorrect);
      setShowResult(true);

      if (isAnswerCorrect) {
        // Doğru cevap - sadece son ders için blockchain'e gönder
        if (currentLessonIndex === quest.lessons.length - 1) {
          await submitAnswer(publicKey, questId, currentLessonIndex, currentLesson.choices[selectedAnswer]);
        }
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
          // Quest tamamlandı - kutlama göster
          console.log('DEBUG: Quest completed path - calling setShowCelebration(true)');
          setShowCelebration(true);
          showSuccess(t('celebration.questCompleted'), t('celebration.congratulations'));
          console.log('DEBUG: Quest completed path - calling setIsSubmitting(false)');
          setIsSubmitting(false);
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

  const handleNextWrongAnswer = () => {
    if (currentWrongIndex < wrongAnswers.length - 1) {
      setCurrentWrongIndex(currentWrongIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Tüm yanlış cevaplar tekrar edildi
      setShowWrongAnswers(false);
      setWrongAnswers([]);
      setCurrentWrongIndex(0);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleContinueFromWrong = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    
    // Yanlış cevaplar varsa onları göster
    if (wrongAnswers.length > 0) {
      setShowWrongAnswers(true);
      setCurrentWrongIndex(0);
    } else {
      // Sonraki derse geç
      if (currentLessonIndex < quest.lessons.length - 1) {
        setCurrentLessonIndex(currentLessonIndex + 1);
      } else {
        onComplete?.();
      }
    }
  };

  const handleSkipWrongAnswers = () => {
    setWrongAnswers([]);
    setShowWrongAnswers(false);
    setCurrentWrongIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    
    // Sonraki derse geç
    if (currentLessonIndex < quest.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else {
      onComplete?.();
    }
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
                <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
                  🔄 {t('quiz.wrongAnswers')}
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  {t('quiz.question')} {currentWrongIndex + 1} / {wrongAnswers.length}
                </p>
              </div>
              <Button variant="ghost" onClick={handleSkipWrongAnswers} className="cursor-pointer">
                ✕
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Yanlış cevap sorusu */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                {wrongLesson.lesson.question}
              </h3>

              {!showResult ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    {wrongLesson.lesson.choices.map((choice, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`p-4 rounded-lg border-2 text-left transition-all cursor-pointer ${
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
                  </div>
                  
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
                    }`}                    >
                      {isCorrect ? t('quiz.correct') : t('quiz.incorrect')}
                    </h4>
                    {!isCorrect && (
                      <p className="text-slate-600 dark:text-slate-300 mb-4">
                        {t('quiz.correctAnswer')}: <strong>{wrongLesson.lesson.correctAnswer}</strong>
                      </p>
                    )}
                    <div className="flex gap-3 justify-center">
                      <Button
                        onClick={handleNextWrongAnswer}
                        variant={isCorrect ? 'primary' : 'outline'}
                        className="cursor-pointer"
                      >
                        {isLastWrong ? t('common.save') : t('common.next')}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
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

  // Kutlama Modal'ı
  if (showCelebration) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md mx-4 text-center animate-scale-in">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {t('celebration.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            {t('celebration.message')}
          </p>
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-green-500">✓</span>
              <span className="text-slate-700 dark:text-slate-300">{quest.name}</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-yellow-500">💰</span>
              <span className="text-slate-700 dark:text-slate-300">{quest.rewardAmount || 100} {t('celebration.tokensEarned')}</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-purple-500">🏆</span>
              <span className="text-slate-700 dark:text-slate-300">{t('celebration.certificateEarned')}</span>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => {
                setShowCelebration(false);
                onComplete?.();
              }}
              variant="primary"
              size="lg"
              className="cursor-pointer"
            >
              {t('celebration.continue')}
            </Button>
          </div>
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
            <Button variant="ghost" onClick={onClose} className="cursor-pointer">
              ✕
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-700 dark:text-slate-400">
            {t('quiz.lesson')} {currentLessonIndex + 1} / {quest.lessons.length}
          </span>
          <span className="text-slate-700 dark:text-slate-400">
            {Math.round(((currentLessonIndex + 1) / quest.lessons.length) * 100)}% {t('quiz.completed')}
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${((currentLessonIndex + 1) / quest.lessons.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <Card className="mb-6">
        <CardContent className="p-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
              {currentLesson.question}
            </h3>

            {!showResult ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {currentLesson.choices.map((choice, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`p-4 rounded-lg border-2 text-left transition-all cursor-pointer ${
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
                </div>
                
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
                  }`}                    >
                      {isCorrect ? t('quiz.correct') : t('quiz.incorrect')}
                    </h4>
                    {!isCorrect && (
                      <p className="text-slate-600 dark:text-slate-300 mb-4">
                        {t('quiz.correctAnswer')}: <strong>{currentLesson.correctAnswer}</strong>
                      </p>
                    )}
                  <div className="flex gap-3 justify-center">
                    {isCorrect ? (
                      <Button
                        onClick={() => {
                          setShowResult(false);
                          setSelectedAnswer(null);
                          if (currentLessonIndex < quest.lessons.length - 1) {
                            setCurrentLessonIndex(currentLessonIndex + 1);
                          } else {
                            onComplete?.();
                          }
                        }}
                        variant="primary"
                        className="cursor-pointer"
                      >
                        {currentLessonIndex < quest.lessons.length - 1 ? t('quiz.nextLesson') : t('quiz.completeQuest')}
                      </Button>
                    ) : (
                      <Button
                        onClick={handleContinueFromWrong}
                        variant="primary"
                        className="cursor-pointer"
                      >
                        {t('quiz.continue')}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quest Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl mb-2">💰</div>
            <div className="text-sm text-slate-700 dark:text-slate-400">{t('quiz.reward')}</div>
            <div className="font-semibold text-slate-900 dark:text-white">
              {quest.rewardAmount || 100} Token
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
  );
};

export default QuestQuiz;