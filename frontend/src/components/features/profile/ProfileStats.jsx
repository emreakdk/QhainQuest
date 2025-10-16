import { useState, useEffect, memo } from 'react';
import { useContext } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { WalletContext } from '../../../context/WalletContext';
import { calculateTotalTokenBalance, getTokenBalanceBreakdown } from '../../../utils/tokenBalanceCalculator';
import { Card, CardContent } from '../../ui/Card';
import Badge from '../../ui/Badge';

const ProfileStats = ({ userStats }) => {
  const { t } = useLanguage();
  const { publicKey } = useContext(WalletContext);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [completedQuestsCount, setCompletedQuestsCount] = useState(0);

  // Calculate token balance from localStorage - Fixed: Removed userStats from dependencies to prevent infinite loop
  useEffect(() => {
    if (publicKey) {
      const breakdown = getTokenBalanceBreakdown(publicKey);
      setTokenBalance(breakdown.totalBalance);
      setCompletedQuestsCount(breakdown.questCount);
    }
  }, [publicKey]); // Only recalculate when publicKey changes

  const stats = [
    {
      title: 'Toplam Token',
      value: tokenBalance,
      icon: '💰',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      textColor: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      title: 'Tamamlanan Quest',
      value: completedQuestsCount,
      icon: '✅',
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Sertifikalar',
      value: userStats?.certificates || 0,
      icon: '🏆',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      title: 'Toplam Quest',
      value: 5, // Total available quests
      icon: '🎯',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      textColor: 'text-indigo-600 dark:text-indigo-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Memoized component to prevent unnecessary re-renders
export default memo(ProfileStats);
