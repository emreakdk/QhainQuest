import { useContext } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useQuest } from '../../../context/QuestContext';
import { WalletContext } from '../../../context/WalletContext';
import { useBalance } from '../../../context/BalanceContext';
import { useToken } from '../../../context/TokenContext';
import { Card, CardContent } from '../../ui/Card';
import Badge from '../../ui/Badge';
import Button from '../../ui/Button';
import PublicKeyTooltip from '../../ui/PublicKeyTooltip';

const Achievements = ({ onPageChange }) => {
  const { t } = useLanguage();
  const { publicKey } = useContext(WalletContext);
  const { userStats } = useQuest();
  const { totalEarned } = useBalance(); // Live token balance
  const { tokenData } = useToken(); // Live quest data
  
  const currentUser = {
    rank: 1, // Always #1 for personal dashboard
    address: publicKey || "Not Connected",
    username: t('achievements.you'), // "You" in Turkish
    totalTokens: totalEarned || 0, // Live token balance
    certificates: tokenData.completedQuests || 0, // Live completed quests count
    completedQuests: tokenData.completedQuests || 0, // Live completed quests count
    isCurrentUser: true
  };

  if (!publicKey) {
    return (
      <div className="space-y-8 pt-4 sm:pt-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            🏆 {t('achievements.pageTitle')}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t('achievements.pageSubtitle')}
          </p>
        </div>
        <div className="max-w-md mx-auto">
          <Card className="text-center p-8">
            <div className="text-6xl mb-4">🔐</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              {t('achievements.walletRequired')}
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {t('profile.connectWalletForAchievements')}
            </p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pt-4 sm:pt-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          🏆 {t('achievements.pageTitle')}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          {t('achievements.pageSubtitle')}
        </p>
      </div>

      {/* Personal Achievement Card */}
      <div className="max-w-md mx-auto mt-6 sm:mt-8">
        <Card className="relative overflow-hidden border-2 border-indigo-200 dark:border-indigo-700 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
          <CardContent className="p-8 text-center">
            {/* Achievement Badge */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white">
              🏆
            </div>

            {/* User Info */}
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {currentUser.username}
            </h3>
            <div className="mb-6">
              <PublicKeyTooltip
                publicKey={currentUser.address}
                textClassName="text-sm text-slate-500 dark:text-slate-400 font-mono"
              />
            </div>

            {/* Stats - CRITICAL FIX: Remove Seviye (Level) system */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">{t('achievements.token')}:</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {currentUser.totalTokens.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">{t('profile.certificatePrefix')}</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {currentUser.certificates}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">{t('profile.completedQuests')}:</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {currentUser.completedQuests}
                </span>
              </div>
            </div>

            {/* Achievement Badge */}
            <div className="mt-6">
              <Badge variant="primary" className="text-lg px-4 py-2">
                {t('achievements.successfulStudent')}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          {t('achievements.cta.title')}
        </h3>
        <Button 
          variant="primary" 
          size="lg"
          onClick={() => onPageChange && onPageChange('quests')}
          className="cursor-pointer"
        >
          {t('achievements.cta.button')}
        </Button>
      </div>
    </div>
  );
};

export default Achievements;
