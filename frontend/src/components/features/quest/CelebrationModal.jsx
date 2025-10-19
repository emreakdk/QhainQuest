import { useState, useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { Card, CardContent, CardHeader } from '../../ui/Card';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';
import AnimatedCounter from '../../ui/AnimatedCounter';

const CelebrationModal = ({ quest, onClose, onComplete }) => {
  const { t } = useLanguage();
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Animasyonu başlat
    setShowAnimation(true);
  }, []);

  const handleClose = () => {
    setShowAnimation(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleComplete = () => {
    setShowAnimation(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`transform transition-all duration-300 ${
        showAnimation ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        <Card className="w-full max-w-lg mx-auto bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-200 dark:border-purple-700">
          <CardHeader className="text-center pb-4">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-2">
              {t('celebration.questCompleted')}
            </h2>
            <p className="text-purple-600 dark:text-purple-300">
              {t('celebration.congratulations')}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6 px-8 py-8">
            {/* Quest Bilgileri */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {t(quest?.nameKey || quest?.name) || t('profile.questCompleted')}
              </h3>
              <Badge 
                variant="success" 
                className="text-sm"
              >
                {t('celebration.completed')}
              </Badge>
            </div>

            {/* Ödüller */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                <div className="text-2xl mb-2">🪙</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  {t('celebration.tokensEarned')}
                </div>
                <div className="font-bold text-lg text-slate-900 dark:text-white">
                  <AnimatedCounter 
                    value={quest?.rewardAmount || 100} 
                    duration={2000}
                  />
                </div>
              </div>
              
              <div className="text-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                <div className="text-2xl mb-2">🏆</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  {t('celebration.certificate')}
                </div>
                <div className="font-bold text-lg text-slate-900 dark:text-white">
                  {(quest?.certificateNftUrl || quest?.nftUrl) ? '✓' : '✗'}
                </div>
              </div>
            </div>

            {/* Butonlar */}
            <div className="flex gap-4 px-2 pt-2">
              <Button
                onClick={handleClose}
                variant="outline"
                className="flex-1 cursor-pointer"
              >
                {t('celebration.close')}
              </Button>
              <Button
                onClick={handleComplete}
                className="flex-1 cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
              >
                {t('celebration.continue')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CelebrationModal;
