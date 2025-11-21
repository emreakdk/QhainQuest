import { useState, useEffect, memo } from 'react';
import { useContext } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { WalletContext } from '../../../context/WalletContext';
import { useToken } from '../../../context/TokenContext';
import { useBalance } from '../../../context/BalanceContext';
import { useNotification } from '../../../context/NotificationContext';
import { Card, CardContent } from '../../ui/Card';
import Badge from '../../ui/Badge';
import Button from '../../ui/Button';
import { TbCoins, TbClock, TbCheck, TbAward } from 'react-icons/tb';

const ProfileStats = ({ userStats, onPageChange }) => {
  const { t } = useLanguage();
  const { publicKey, isDemoMode } = useContext(WalletContext);
  const { showSuccess, showError } = useNotification();
  const { tokenData, isLoading, claimTokens } = useToken();
  const { claimableBalance, totalEarned, resetClaimableBalance } = useBalance(); // Use global balance context
  const [isClaiming, setIsClaiming] = useState(false);

  const handleClaimTokens = async () => {
    if (claimableBalance <= 0) {
      return;
    }

    if (isDemoMode) {
      showError(
        t('demo.claimError.title'),
        t('demo.claimError.message')
      );
      return;
    }

    if (!publicKey) {
      showError(
        t('wallet.connectionRequired.title'),
        t('wallet.connectionRequired.message')
      );
      return;
    }

    setIsClaiming(true);
    
    try {
      console.log(`[ProfileStats] Claiming ${claimableBalance} tokens for user ${publicKey}`);
      
      const result = await claimTokens(publicKey, claimableBalance);
      
      if (result.success) {
        resetClaimableBalance(publicKey);
        
        showSuccess(
          t('profile.stats.claimSuccess'),
          `${claimableBalance} ${t('token.transferredToWallet')} ${result.data.transactionHash}`
        );
        
        console.log('[ProfileStats] Tokens claimed successfully:', result.data);
      } else {
        throw new Error(result.error || 'Token claim failed');
      }
    } catch (error) {
      console.error('[ProfileStats] Token claim error:', error);
        showError(t('token.transferError'), error.message);
    } finally {
      setIsClaiming(false);
    }
  };

  console.log(`[ProfileStats] tokenData.completedQuests:`, tokenData.completedQuests);
  console.log(`[ProfileStats] tokenData:`, tokenData);

  const stats = [
    {
      title: t('profile.totalEarned'),
      value: totalEarned, // CRITICAL FIX: Use global totalEarned from BalanceContext
      icon: TbCoins,
      gradient: 'from-yellow-500 to-orange-500 dark:from-yellow-600 dark:to-orange-600',
      labelColor: 'text-yellow-100'
    },
    {
      title: t('profile.claimableBalance'),
      value: claimableBalance, // Use global balance context
      icon: TbClock,
      gradient: 'from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600',
      labelColor: 'text-blue-100'
    },
    ...(isDemoMode ? [] : [
      {
        title: t('profile.completedQuests'),
        value: tokenData.completedQuests,
        icon: TbCheck,
        gradient: 'from-green-500 to-teal-500 dark:from-green-600 dark:to-teal-600',
        labelColor: 'text-green-100'
      },
      {
        title: t('profile.certificates'),
        value: tokenData.completedQuests || 0,
        icon: TbAward,
        gradient: 'from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600',
        labelColor: 'text-purple-100'
      }
    ])
  ];

  if (isDemoMode) {
    return (
      <div className="space-y-6">
        {/* Demo Mode Indicator */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400">
            <span>🔒</span>
            <span className="text-sm font-medium">{t('demo.statsLocked.title')}</span>
          </div>
        </div>
        
        {/* Stats Grid - Show in demo mode but with limited functionality */}
        {/* Graceful fallback: 1 column on very small screens, 2 columns on mobile (>= 640px), 4 columns on large (>= 1024px) */}
        <div className="grid grid-cols-1 min-[375px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${stat.gradient} rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg opacity-75`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
                      {stat.value?.toLocaleString() || 0}
                    </div>
                    <div className={`${stat.labelColor} text-[10px] sm:text-xs lg:text-sm mt-1`}>
                      {stat.title}
                    </div>
                  </div>
                  <IconComponent size={24} className="opacity-80 text-white flex-shrink-0 sm:w-7 sm:h-7" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Claim Button - CRITICAL FIX: Show in demo mode to prompt wallet connection */}
        {claimableBalance > 0 && (
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {t('profile.claim.title')}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {claimableBalance} {t('profile.claim.description')}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleClaimTokens}
                    disabled={isClaiming}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3"
                  >
                    {isClaiming ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{t('profile.claim.transferring')}</span>
                      </div>
                    ) : (
                      t('profile.claim.button')
                    )}
                  </Button>
                  <Button
                    onClick={() => onPageChange && onPageChange('how-to-claim')}
                    variant="secondary"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3"
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{t('howToClaim.linkText')}</span>
                    </div>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid - Mobile optimized 2x2 layout matching Quests page */}
      {/* Graceful fallback: 1 column on very small screens, 2 columns on mobile (>= 375px), 4 columns on large (>= 1024px) */}
      <div className="grid grid-cols-1 min-[375px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.gradient} rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
                    {stat.value?.toLocaleString() || 0}
                  </div>
                  <div className={`${stat.labelColor} text-[10px] sm:text-xs lg:text-sm mt-1`}>
                    {stat.title}
                  </div>
                </div>
                <IconComponent size={24} className="opacity-80 text-white flex-shrink-0 sm:w-7 sm:h-7" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Claim Button */}
      {claimableBalance > 0 && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {t('profile.claim.title')}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {claimableBalance} {t('profile.claim.description')}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleClaimTokens}
                  disabled={isClaiming}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3"
                >
                  {isClaiming ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{t('profile.claim.transferring')}</span>
                    </div>
                  ) : (
                    t('profile.claimButton')
                  )}
                </Button>
                <Button
                  onClick={() => onPageChange && onPageChange('how-to-claim')}
                  variant="secondary"
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{t('howToClaim.linkText')}</span>
                  </div>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default memo(ProfileStats);
