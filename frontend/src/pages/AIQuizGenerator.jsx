import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { aiQuizService } from '../services/aiQuizService';
import { useNotification } from '../context/NotificationContext';
import QuestQuiz from '../components/features/quest/QuestQuiz';
import Button from '../components/ui/Button';
import Web3Particles from '../components/ui/Web3Particles';
import { TbSparkles, TbLoader2, TbWand, TbSchool, TbBolt, TbFlame, TbCoin, TbDice5, TbTrophy, TbChevronLeft, TbChevronRight } from 'react-icons/tb';

const AIQuizGenerator = ({ onPageChange }) => {
  const { t, language } = useLanguage();
  const { showSuccess, showError } = useNotification();
  
  // Define Topics Array (Constant) - Must be before useState
  const TOPICS = language === 'tr' 
    ? ['Blockchain', 'Stellar', 'DeFi', 'NFT', 'Akıllı Kontratlar', 'Web3', 'Tokenomics', 'Rust', 'Solidity', 'Ethereum', 'Polkadot', 'Cosmos', 'Layer 2', 'DAO', 'Metaverse']
    : ['Blockchain', 'Stellar', 'DeFi', 'NFT', 'Smart Contracts', 'Web3', 'Tokenomics', 'Rust', 'Solidity', 'Ethereum', 'Polkadot', 'Cosmos', 'Layer 2', 'DAO', 'Metaverse'];

  const [topic, setTopic] = useState(TOPICS[0] || '');
  const [difficulty, setDifficulty] = useState('beginner');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState(null);
  const [generatedQuestTitle, setGeneratedQuestTitle] = useState(null);
  const [generatedQuestTopic, setGeneratedQuestTopic] = useState(null);
  const [generatedDifficulty, setGeneratedDifficulty] = useState(null);

  const difficultyOptions = [
    { 
      value: 'beginner', 
      label: language === 'tr' ? 'Kolay' : 'Easy', 
      icon: TbSchool,
      color: 'green',
      borderColor: 'border-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-slate-900 dark:text-green-200',
      iconColor: 'text-slate-900 dark:text-green-300'
    },
    { 
      value: 'intermediate', 
      label: language === 'tr' ? 'Orta' : 'Medium', 
      icon: TbBolt,
      color: 'yellow',
      borderColor: 'border-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      textColor: 'text-slate-900 dark:text-yellow-200',
      iconColor: 'text-slate-900 dark:text-yellow-300'
    },
    { 
      value: 'advanced', 
      label: language === 'tr' ? 'Zor' : 'Hard', 
      icon: TbFlame,
      color: 'red',
      borderColor: 'border-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      textColor: 'text-slate-900 dark:text-red-200',
      iconColor: 'text-slate-900 dark:text-red-300'
    }
  ];

  // Carousel State
  const [topicIndex, setTopicIndex] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);

  // Sync topic state with index
  useEffect(() => {
    if (TOPICS[topicIndex]) {
      setTopic(TOPICS[topicIndex]);
    }
  }, [topicIndex, language]);

  const handleGenerate = async () => {
    if (!topic || !topic.trim()) {
      showError(
        language === 'tr' ? 'Konu Gerekli' : 'Topic Required',
        language === 'tr' ? 'Lütfen bir konu seçin.' : 'Please select a topic.'
      );
      return;
    }

    setIsGenerating(true);
    setGeneratedQuestions(null);
    setGeneratedQuestTitle(null);
    setGeneratedQuestTopic(null);

    try {
      const questObject = await aiQuizService.generateQuiz(
        topic.trim(),
        difficulty,
        language || 'tr',
        3
      );

      if (!questObject || !questObject.questions || questObject.questions.length === 0) {
        throw new Error('No questions generated');
      }

      // Extract questions array from the full quest object
      setGeneratedQuestions(questObject.questions);
      setGeneratedQuestTitle(questObject.nameKey || (language === 'tr' ? `${topic} - AI Sınavı` : `${topic} - AI Quiz`));
      setGeneratedQuestTopic(questObject.descriptionKey || topic);
      setGeneratedDifficulty(questObject.difficulty || difficulty);
      
      showSuccess(
        language === 'tr' ? 'Test Oluşturuldu!' : 'Quiz Generated!',
        language === 'tr' 
          ? `${questObject.questions.length} soru hazırlandı.` 
          : `${questObject.questions.length} questions ready.`
      );
    } catch (error) {
      console.error('[AI Quiz Generator] Error:', error);
      showError(
        language === 'tr' ? 'Test Oluşturulamadı' : 'Failed to Generate Quiz',
        error.message || (language === 'tr' 
          ? 'Yapay zeka test oluşturamadı. Lütfen tekrar deneyin.' 
          : 'AI failed to generate quiz. Please try again.')
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCloseQuiz = () => {
    setGeneratedQuestions(null);
    setGeneratedQuestTitle(null);
    setGeneratedQuestTopic(null);
    setGeneratedDifficulty(null);
  };

  // Manual Cycle Function
  const cycleTopic = (direction) => {
    setTopicIndex((prev) => {
      let next = prev + direction;
      if (next >= TOPICS.length) next = 0;
      if (next < 0) next = TOPICS.length - 1;
      return next;
    });
  };

  // Slot Machine Shuffle Function
  const handleRandomShuffle = () => {
    setIsShuffling(true);
    let shuffles = 0;
    const maxShuffles = 15; // How many times it changes
    const interval = setInterval(() => {
      setTopicIndex(Math.floor(Math.random() * TOPICS.length));
      shuffles++;
      if (shuffles >= maxShuffles) {
        clearInterval(interval);
        setIsShuffling(false);
      }
    }, 80); // Speed of shuffle
  };

  // If quiz is generated, show the quiz runner
  if (generatedQuestions && generatedQuestions.length > 0) {
    return (
      <QuestQuiz
        questId={null}
        customQuestions={generatedQuestions}
        customQuestTitle={generatedQuestTitle}
        customQuestTopic={generatedQuestTopic}
        customDifficulty={generatedDifficulty}
        onComplete={() => {
          handleCloseQuiz();
          showSuccess(
            language === 'tr' ? 'Test Tamamlandı!' : 'Quiz Completed!',
            language === 'tr' ? 'Tebrikler!' : 'Congratulations!'
          );
        }}
        onClose={handleCloseQuiz}
        onPageChange={onPageChange}
      />
    );
  }

  return (
    <>
      {/* --- 1. BACKGROUND LAYER (Fixed to Viewport) --- */}
      <div className="fixed inset-0 w-screen h-screen z-0 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-800 dark:via-purple-800 dark:to-slate-800">
        {/* Particles */}
        <div className="absolute inset-0">
          <Web3Particles />
        </div>

        {/* Gradient Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* --- 2. CONTENT LAYER (Relative & Centered) --- */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] w-full p-4">
        {/* Main Glass Card - Light Mode Compatible */}
        <div className="relative w-full max-w-2xl p-6 rounded-3xl shadow-2xl border transition-all duration-300 bg-white border-slate-200 shadow-indigo-100/50 text-slate-900 dark:bg-slate-800/90 dark:backdrop-blur-xl dark:border-white/10 dark:shadow-black/50 dark:text-white flex flex-col gap-5">
        {/* Compact Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg mb-1">
            <TbSparkles size={24} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            {language === 'tr' ? 'AI Sınav Modu' : 'AI Quiz Mode'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {language === 'tr' 
              ? 'Konuyu seç, zorluğu belirle, yapay zeka seni test etsin.'
              : 'Choose a topic, set difficulty, let AI test you.'}
          </p>
        </div>

        {/* Topic Slot Machine Carousel */}
        <div className="flex flex-col items-center justify-center py-8 gap-6">
          {/* 1. THE MAGIC DICE (Randomizer) */}
          <button
            onClick={handleRandomShuffle}
            disabled={isShuffling}
            className="p-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-purple-500/40 hover:scale-110 hover:rotate-180 transition-all duration-500 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            title={language === 'tr' ? 'Rastgele Konu Seç' : 'Random Topic'}
          >
            <TbDice5 size={32} className={isShuffling ? "animate-spin" : ""} />
          </button>

          {/* 2. THE CAROUSEL (Arrows + Text) */}
          <div className="flex items-center justify-between w-full max-w-md gap-4">
            {/* Prev Button */}
            <button 
              onClick={() => cycleTopic(-1)}
              className="topic-arrow-btn p-3 rounded-full cursor-pointer transition-all duration-200 text-slate-700 dark:text-slate-300"
              aria-label={language === 'tr' ? 'Önceki Konu' : 'Previous Topic'}
            >
              <TbChevronLeft size={32} />
            </button>

            {/* The Topic Text Display */}
            <div className="flex-1 text-center overflow-hidden min-h-[80px] flex items-center justify-center px-2">
              <h2 
                key={topic} // Key forces re-render for animation
                className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white animate-in slide-in-from-bottom-2 fade-in duration-300 break-words hyphens-auto"
              >
                {topic || (language === 'tr' ? "Konu Seçin" : "Select Topic")}
              </h2>
            </div>

            {/* Next Button */}
            <button 
              onClick={() => cycleTopic(1)}
              className="topic-arrow-btn p-3 rounded-full cursor-pointer transition-all duration-200 text-slate-700 dark:text-slate-300"
              aria-label={language === 'tr' ? 'Sonraki Konu' : 'Next Topic'}
            >
              <TbChevronRight size={32} />
            </button>
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            {language === 'tr' ? 'Seçilen Konu' : 'Selected Topic'}
          </p>
        </div>

        {/* Compact Difficulty Selector - Light Mode Compatible */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
            {language === 'tr' ? 'Zorluk Seviyesi' : 'Difficulty Level'}
          </label>
          <div className="grid grid-cols-3 gap-3">
            {difficultyOptions.map((option) => {
              const IconComponent = option.icon;
              const isSelected = difficulty === option.value;
              
              return (
                <button
                  key={option.value}
                  onClick={() => setDifficulty(option.value)}
                  className={`relative p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer flex flex-col items-center gap-2 focus:outline-none ${
                    isSelected
                      ? `${option.borderColor} ${option.bgColor} shadow-md scale-105 ring-1 ${option.borderColor.replace('border-', 'ring-')}`
                      : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {/* Icon */}
                  <IconComponent 
                    size={24} 
                    className={`transition-colors ${
                      isSelected 
                        ? option.iconColor 
                        : 'text-slate-400 dark:text-slate-500'
                    }`} 
                  />
                  
                  {/* Label */}
                  <span className={`text-xs font-semibold ${
                    isSelected
                      ? option.textColor
                      : 'text-slate-600 dark:text-slate-400'
                  }`}>
                    {option.label}
                  </span>
                  
                  {/* Selection Ring Indicator */}
                  {isSelected && (
                    <div className={`absolute -inset-0.5 ${option.borderColor} rounded-xl opacity-20 blur-sm`}></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate Button - Compact */}
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !topic.trim()}
          className="w-full h-12 text-base font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] text-white rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 animate-gradient hover:scale-[1.02] active:scale-95"
        >
          {isGenerating ? (
            <>
              <TbLoader2 size={20} className="animate-spin" />
              <span>{language === 'tr' ? 'Hazırlanıyor...' : 'Preparing...'}</span>
            </>
          ) : (
            <>
              <TbBolt size={20} />
              <span>{language === 'tr' ? 'Test Oluştur' : 'Generate Quiz'}</span>
            </>
          )}
        </Button>

        {/* Reward Info - Gold/Amber Styled */}
        <div className="w-full py-4 rounded-xl border-2 text-center font-bold transition-all bg-amber-50/80 border-amber-200 text-amber-700 shadow-lg shadow-amber-100/50 hover:scale-[1.01] dark:bg-amber-900/20 dark:border-amber-500/30 dark:text-amber-400 flex items-center justify-center gap-2">
          <TbTrophy size={20} className="text-amber-600 dark:text-amber-400" />
          <span>
            {language === 'tr' ? 'Ödül: 20 CQT' : 'Reward: 20 CQT'}
          </span>
        </div>

        {/* Compact Info Text */}
        <p className="text-center text-xs text-slate-400 dark:text-slate-500">
          {language === 'tr' 
            ? 'Huawei Cloud AI tarafından desteklenmektedir.'
            : 'Powered by Huawei Cloud AI.'}
        </p>
      </div>

      {/* Animated Gradient CSS */}
      <style>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        /* Topic Tag Hover Fix (Light Mode Only) */
        .topic-tag-btn:hover {
          background-color: #eef2ff !important; /* indigo-50 */
          border-color: #a5b4fc !important; /* indigo-300 */
          color: #4338ca !important; /* indigo-700 */
        }

        /* Topic Tag Hover Fix (Dark Mode) */
        .dark .topic-tag-btn:hover {
          background-color: #334155 !important; /* slate-700 */
          color: #cbd5e1 !important; /* slate-300 */
        }

        /* Topic Arrow Buttons Hover Fix (Light Mode) - Same as Header */
        .topic-arrow-btn:hover {
          background-color: #e2e8f0 !important; /* slate-200 */
        }

        /* Topic Arrow Buttons Hover Fix (Dark Mode) */
        .dark .topic-arrow-btn:hover {
          background-color: rgba(255, 255, 255, 0.1) !important; /* white/10 */
        }
      `}</style>
      </div>
    </>
  );
};

export default AIQuizGenerator;
