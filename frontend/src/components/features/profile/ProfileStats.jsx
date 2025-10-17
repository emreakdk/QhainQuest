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

const ProfileStats = ({ userStats }) => {
  const { t } = useLanguage();
  const { publicKey, isDemoMode } = useContext(WalletContext);
  const { showSuccess, showError } = useNotification();
  const { tokenData, isLoading, claimTokens } = useToken();
  const { claimableBalance, totalEarned, resetClaimableBalance } = useBalance(); // Use global balance context
  const [isClaiming, setIsClaiming] = useState(false);

  // Handle token claiming using global balance context
  const handleClaimTokens = async () => {
    if (claimableBalance <= 0) {
      return;
    }

    // Check if in demo mode
    if (isDemoMode) {
      showError(
        t('demo.claimError.title'),
        t('demo.claimError.message')
      );
      return;
    }

    // Check if wallet is connected
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
      
      // Use centralized token context for API call
      const result = await claimTokens(publicKey, claimableBalance);
      
      if (result.success) {
        // Reset global claimable balance to 0
        resetClaimableBalance(publicKey);
        
        // Show success message
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

  const stats = [
    {
      title: t('profile.totalEarned'),
      value: totalEarned, // CRITICAL FIX: Use global totalEarned from BalanceContext
      icon: '💰',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      textColor: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      title: t('profile.claimableBalance'),
      value: claimableBalance, // Use global balance context
      icon: '⏳',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: t('profile.completedQuests'),
      value: tokenData.completedQuests,
      icon: '✅',
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400'
    },
    {
      title: t('profile.certificates'),
      // FIX: Handle certificates as both array and number to prevent React error #31
      value: Array.isArray(userStats?.certificates) ? userStats.certificates.length : (userStats?.certificates || 0),
      icon: '🏆',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
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
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Memoized component to prevent unnecessary re-renders
export default memo(ProfileStats);
