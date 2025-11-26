import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../../context/LanguageContext';
import Button from '../../ui/Button';
import { TbLoader, TbLock, TbCheck, TbWallet, TbAlertCircle } from 'react-icons/tb';

const QuestCompletionModal = ({ quest, onClose, onComplete, onPageChange, reward = null, isSuccess = true }) => {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(1); // 1: Proof of Work, 2: Smart Contract, 3: Minting Token, 4: Success
  const [showModal, setShowModal] = useState(false);

  // Translations for modal content
  const translations = {
    tr: {
      loading1: 'Proof of Work Doğrulanıyor...',
      loading1Desc: 'İş kanıtınız blockchain üzerinde kontrol ediliyor',
      loading2: 'Akıllı Kontrat İmzalanıyor...',
      loading2Desc: 'Token transferi için güvenli imza oluşturuluyor',
      loading3: 'CQT Token Basılıyor...',
      loading3Desc: 'Ödül token\'larınız blockchain\'e basılıyor',
      successTitle: 'GÖREV TAMAMLANDI!',
      successDesc: 'Tebrikler! Blockchain bilginizi kanıtladınız ve ödülünüzü hak ettiniz.',
      tokensAdded: 'Token\'larınız claimable balance\'a eklendi',
      completedQuest: 'Tamamlanan Görev',
      btnViewWallet: 'Cüzdanı Görüntüle',
      btnNextQuest: 'Sıradaki Görev',
    },
    en: {
      loading1: 'Verifying Proof of Work...',
      loading1Desc: 'Your proof of work is being verified on the blockchain',
      loading2: 'Signing Smart Contract...',
      loading2Desc: 'Creating secure signature for token transfer',
      loading3: 'Minting CQT Token...',
      loading3Desc: 'Your reward tokens are being minted on the blockchain',
      successTitle: 'QUEST COMPLETED!',
      successDesc: 'Congratulations! You\'ve proven your blockchain knowledge and earned your reward.',
      tokensAdded: 'Your tokens have been added to claimable balance',
      completedQuest: 'Completed Quest',
      btnViewWallet: 'View Wallet',
      btnNextQuest: 'Next Quest',
    },
  };

  const trans = translations[language] || translations.en;

  // Determine reward amount (use prop if provided, otherwise fallback to quest.rewardAmount)
  const finalReward = reward !== null ? reward : (quest?.rewardAmount || 150);
  const isFailure = finalReward === 0 || !isSuccess;

  useEffect(() => {
    // Modal açılış animasyonu
    setShowModal(true);

    // Only show loading steps if successful (has reward)
    if (!isFailure) {
      // Step 1: Proof of Work Doğrulanıyor (0s - 1.5s)
      const step1Timer = setTimeout(() => {
        setStep(2);
      }, 1500);

      // Step 2: Akıllı Kontrat İmzalanıyor (1.5s - 3s)
      const step2Timer = setTimeout(() => {
        setStep(3);
      }, 3000);

      // Step 3: CQT Token Basılıyor (3s - 4.5s)
      const step3Timer = setTimeout(() => {
        setStep(4);
        // Confetti patlat (only on success)
        triggerConfetti();
      }, 4500);

      return () => {
        clearTimeout(step1Timer);
        clearTimeout(step2Timer);
        clearTimeout(step3Timer);
      };
    } else {
      // Failure: Skip loading steps, go directly to step 4 (failure UI)
      const failureTimer = setTimeout(() => {
        setStep(4);
      }, 500);
      
      return () => {
        clearTimeout(failureTimer);
      };
    }
  }, [isFailure]);

  const triggerConfetti = () => {
    // Merkezden patlayan confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#f59e0b', '#d97706', '#f97316', '#ea580c'],
    });

    // Birkaç saniye sonra tekrar patlat
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#fbbf24', '#f59e0b', '#d97706'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f97316', '#ea580c', '#dc2626'],
      });
    }, 250);
  };

  const handleViewWallet = () => {
    if (onPageChange) {
      onPageChange('profile');
    }
    if (onComplete) {
      onComplete();
    }
  };

  const handleNextQuest = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className={`transform transition-all duration-500 ${
          showModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Glassmorphism Card */}
        <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">
          {/* Header Section - Animation Area */}
          <div className="relative px-8 pt-8 pb-6 border-b border-white/10">
            {step === 1 && (
              <div className="flex flex-col items-center justify-center space-y-4 py-8">
                <div className="relative">
                  <TbLoader className="w-16 h-16 text-yellow-400 animate-spin" />
                  <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {trans.loading1}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {trans.loading1Desc}
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col items-center justify-center space-y-4 py-8">
                <div className="relative">
                  <TbLock className="w-16 h-16 text-purple-400 animate-pulse" />
                  <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-xl animate-pulse"></div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {trans.loading2}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {trans.loading2Desc}
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col items-center justify-center space-y-4 py-8">
                <div className="relative">
                  <TbLoader className="w-16 h-16 text-orange-400 animate-spin" />
                  <div className="absolute inset-0 bg-orange-400/20 rounded-full blur-xl animate-pulse"></div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {trans.loading3}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {trans.loading3Desc}
                  </p>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col items-center justify-center space-y-4 py-8">
                {isFailure ? (
                  // Failure State
                  <>
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/50 animate-scale-in">
                        <TbAlertCircle className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-yellow-500/30 rounded-full blur-2xl animate-pulse"></div>
                    </div>
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-2 animate-fade-in">
                        {language === 'tr' ? 'Test Tamamlandı' : 'Quiz Completed'}
                      </h2>
                      <p className="text-slate-300 text-sm max-w-md">
                        {language === 'tr' 
                          ? 'Maalesef testte yanlış cevaplarınız olduğu için CQT Token kazanamadınız. Tekrar deneyerek kendinizi geliştirebilirsiniz.'
                          : 'Unfortunately, you had incorrect answers in the quiz, so you could not earn CQT Tokens. You can improve yourself by trying again.'}
                      </p>
                    </div>
                  </>
                ) : (
                  // Success State
                  <>
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 animate-scale-in">
                        <TbCheck className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-green-400/30 rounded-full blur-2xl animate-pulse"></div>
                    </div>
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2 animate-fade-in">
                        {trans.successTitle}
                      </h2>
                      <p className="text-slate-300 text-sm">
                        {trans.successDesc}
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Body Section - Details Area */}
          {step === 4 && (
            <div className="px-8 py-6 space-y-6 animate-fade-in">
              {/* Token Reward - Only show if reward > 0 */}
              {!isFailure && finalReward > 0 && (
                <div className="text-center">
                  <div className="inline-block">
                    <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 mb-2 animate-glow">
                      +{finalReward} CQT
                    </div>
                    <div className="text-slate-400 text-sm">
                      {trans.tokensAdded}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Failure State - Show 0 CQT or hide token display */}
              {isFailure && (
                <div className="text-center">
                  <div className="inline-block">
                    <div className="text-4xl font-bold text-slate-400 mb-2">
                      0 CQT
                    </div>
                    <div className="text-slate-500 text-sm">
                      {language === 'tr' ? 'Token kazanılamadı' : 'No tokens earned'}
                    </div>
                  </div>
                </div>
              )}

              {/* Quest Info */}
              {quest && (
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-slate-400 text-xs mb-1">{trans.completedQuest}</div>
                  <div className="text-white font-semibold">
                    {t(quest?.nameKey || quest?.name) || trans.successTitle}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  onClick={handleViewWallet}
                  className="flex-1 cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 flex items-center justify-center gap-2"
                >
                  <TbWallet className="w-5 h-5" />
                  {trans.btnViewWallet}
                </Button>
                <Button
                  onClick={handleNextQuest}
                  variant="outline"
                  className="flex-1 cursor-pointer border-white/20 text-white hover:bg-white/10"
                >
                  {trans.btnNextQuest}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(251, 191, 36, 0.8));
          }
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default QuestCompletionModal;

