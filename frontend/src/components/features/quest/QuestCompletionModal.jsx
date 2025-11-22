import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../../context/LanguageContext';
import Button from '../../ui/Button';
import { TbLoader, TbLock, TbCheck, TbWallet } from 'react-icons/tb';

const QuestCompletionModal = ({ quest, onClose, onComplete, onPageChange }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1); // 1: Proof of Work, 2: Smart Contract, 3: Success
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Modal açılış animasyonu
    setShowModal(true);

    // Step 1: Proof of Work Doğrulanıyor (0s - 1.5s)
    const step1Timer = setTimeout(() => {
      setStep(2);
    }, 1500);

    // Step 2: Akıllı Kontrat İmzalanıyor (1.5s - 3s)
    const step2Timer = setTimeout(() => {
      setStep(3);
      // Confetti patlat
      triggerConfetti();
    }, 3000);

    return () => {
      clearTimeout(step1Timer);
      clearTimeout(step2Timer);
    };
  }, []);

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

  const rewardAmount = quest?.rewardAmount || 150;

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
                    Proof of Work Doğrulanıyor...
                  </h3>
                  <p className="text-slate-400 text-sm">
                    İş kanıtınız blockchain üzerinde kontrol ediliyor
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
                    Akıllı Kontrat İmzalanıyor...
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Token transferi için güvenli imza oluşturuluyor
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col items-center justify-center space-y-4 py-8">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 animate-scale-in">
                    <TbCheck className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-green-400/30 rounded-full blur-2xl animate-pulse"></div>
                </div>
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2 animate-fade-in">
                    BAŞARILI!
                  </h2>
                  <p className="text-slate-300 text-sm">
                    İşleminiz blockchain'e kaydedildi
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Body Section - Details Area */}
          {step === 3 && (
            <div className="px-8 py-6 space-y-6 animate-fade-in">
              {/* Token Reward */}
              <div className="text-center">
                <div className="inline-block">
                  <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 mb-2 animate-glow">
                    +{rewardAmount} CQT
                  </div>
                  <div className="text-slate-400 text-sm">
                    Token'larınız claimable balance'a eklendi
                  </div>
                </div>
              </div>

              {/* Quest Info */}
              {quest && (
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-slate-400 text-xs mb-1">Tamamlanan Görev</div>
                  <div className="text-white font-semibold">
                    {t(quest?.nameKey || quest?.name) || 'Quest Tamamlandı'}
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
                  Cüzdanı Görüntüle
                </Button>
                <Button
                  onClick={handleNextQuest}
                  variant="outline"
                  className="flex-1 cursor-pointer border-white/20 text-white hover:bg-white/10"
                >
                  Sıradaki Görev
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

