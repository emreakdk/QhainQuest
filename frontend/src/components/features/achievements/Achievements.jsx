import { useState, useEffect, useContext } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useQuest } from '../../../context/QuestContext';
import { WalletContext } from '../../../context/WalletContext';
import { useBalance } from '../../../context/BalanceContext';
import { useToken } from '../../../context/TokenContext';
import { Card, CardContent } from '../../ui/Card';
import Badge from '../../ui/Badge';
import Button from '../../ui/Button';

const Achievements = () => {
  const { t } = useLanguage();
  const { publicKey } = useContext(WalletContext);
  const { userStats } = useQuest();
  const { totalEarned } = useBalance(); // Live token balance
  const { tokenData } = useToken(); // Live quest data
  const [selectedPeriod, setSelectedPeriod] = useState('all-time');
  
  // CRITICAL FIX: Real user data from global context
  const currentUser = {
    rank: 1, // Always #1 for personal dashboard
    address: publicKey || "Not Connected",
    username: "Sen", // "You" in Turkish
    totalTokens: totalEarned || 0, // Live token balance
    certificates: tokenData.completedQuests || 0, // Live completed quests count
    completedQuests: tokenData.completedQuests || 0, // Live completed quests count
    isCurrentUser: true
  };

  // Handle no data case
  if (!publicKey) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            🏆 Başarı Panosu
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Kişisel başarılarınızı ve ilerlemenizi takip edin.
          </p>
        </div>
        <div className="max-w-md mx-auto">
          <Card className="text-center p-8">
            <div className="text-6xl mb-4">🔐</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Cüzdan Bağlantısı Gerekli
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {t('profile.connectWalletForAchievements')}
            </p>
          </Card>
        </div>
      </div>
    );
  }

  const periods = [
    { id: 'all-time', label: 'Tüm Zamanlar' },
    { id: 'monthly', label: 'Bu Ay' },
    { id: 'weekly', label: 'Bu Hafta' }
  ];

  // Helper functions removed - no longer needed for single user display

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          🏆 Başarı Panosu
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Kişisel başarılarınızı ve ilerlemenizi takip edin.
        </p>
      </div>

      {/* Period Selector */}
      <div className="flex justify-center">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
          {periods.map(period => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                selectedPeriod === period.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Personal Achievement Card */}
      <div className="max-w-md mx-auto">
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
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-mono">
              {currentUser.address}
            </p>

            {/* Stats - CRITICAL FIX: Remove Seviye (Level) system */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Token:</span>
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
                Başarılı Öğrenci
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Achievement Stats */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 text-center">
            Detaylı İstatistikler
          </h3>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-2 border-indigo-200 dark:border-indigo-700 rounded-lg p-6">
              {/* User Info */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {currentUser.username.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 text-lg">
                    {currentUser.username}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">
                    {currentUser.address}
                  </p>
                </div>
              </div>

              {/* Stats - CRITICAL FIX: Remove Seviye (Level) system */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-medium text-slate-900 dark:text-white text-2xl">
                    {currentUser.totalTokens.toLocaleString()}
                  </div>
                  <div className="text-slate-500 dark:text-slate-400">Token</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-slate-900 dark:text-white text-2xl">
                    {currentUser.certificates}
                  </div>
                  <div className="text-slate-500 dark:text-slate-400">Sertifika</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-slate-900 dark:text-white text-2xl">
                    {currentUser.completedQuests}
                  </div>
                  <div className="text-slate-500 dark:text-slate-400">{t('profile.completedQuests')}</div>
                </div>
              </div>

              {/* Achievement Badge */}
              <div className="mt-4 text-center">
                <Badge variant="primary" className="text-lg px-4 py-2">
                  Başarılı Öğrenci
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          Daha fazla görev tamamlayarak başarılarınızı artırın!
        </h3>
        <Button variant="primary" size="lg">
          Görevleri Keşfet
        </Button>
      </div>
    </div>
  );
};

export default Achievements;
