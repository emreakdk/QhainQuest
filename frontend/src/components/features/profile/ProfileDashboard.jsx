import { useState, useEffect, useContext, memo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { WalletContext } from '../../../context/WalletContext';
import { useToken } from '../../../context/TokenContext';
import { useBalance } from '../../../context/BalanceContext';
import { useNotification } from '../../../context/NotificationContext';
import { useDataManager } from '../../../systems/dataManager.js';
import { isMobile } from 'react-device-detect';
import { Card, CardContent, CardHeader } from '../../ui/Card';
import AnimatedCounter from '../../ui/AnimatedCounter';
import ProgressRing from '../../ui/ProgressRing';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';
import MobileWarning from '../../ui/MobileWarning';

// Basit grafik komponenti (Chart.js olmadan)
const SimpleChart = ({ data, type = 'line', height = 200, t }) => {
  if (!data || data.length === 0) return <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">{t('common.noData')}</div>;

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));

  return (
    <div className="relative h-48 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <div className="absolute inset-4 flex items-end justify-between">
        {data.map((point, index) => {
          const height = maxValue > 0 ? (point.value / maxValue) * 100 : 0;
          const color = type === 'line' ? '#8b5cf6' : '#10b981';
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full rounded-t transition-all duration-500 hover:opacity-80"
                style={{ 
                  height: `${height}%`,
                  backgroundColor: color,
                  minHeight: '4px'
                }}
                title={`${point.label}: ${point.value}`}
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 truncate">
                {point.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ProfileDashboard = () => {
  const { t } = useLanguage();
  const { publicKey, isDemoMode } = useContext(WalletContext);
  const { tokenData, claimTokens } = useToken(); // Use centralized token data
  const { claimableBalance, totalEarned, resetClaimableBalance } = useBalance(); // Use global balances
  const { showSuccess, showError } = useNotification();
  const { getDashboardData, getPerformanceData, getUserStats } = useDataManager(publicKey);
  
  const [dashboardData, setDashboardData] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    if (publicKey && !isDemoMode) {
      loadDashboardData();
    } else if (isDemoMode) {
      setLoading(false);
    }
  }, [publicKey, isDemoMode]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [dashboard, performance] = await Promise.all([
        getDashboardData(),
        getPerformanceData()
      ]);
      
      setDashboardData(dashboard);
      setPerformanceData(performance);
    } catch (error) {
      console.error(t('quest.dashboardDataError'), error);
    } finally {
      setLoading(false);
    }
  };

  // CRITICAL FIX: Real claim function (same as ProfileStats)
  const handleClaimTokens = async () => {
    if (!publicKey || claimableBalance <= 0) {
      return;
    }

    setIsClaiming(true);
    
    try {
      console.log(`[ProfileDashboard] Claiming ${claimableBalance} tokens for user ${publicKey}`);
      
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
        
        console.log('[ProfileDashboard] Tokens claimed successfully:', result.data);
      } else {
        throw new Error(result.error || 'Token claim failed');
      }
    } catch (error) {
      console.error('[ProfileDashboard] Token claim error:', error);
      showError(t('token.transferError'), error.message);
    } finally {
      setIsClaiming(false);
    }
  };

  // Demo mode placeholder
  if (isDemoMode) {
    return (
      <div className="space-y-6">
        {/* Demo Mode Stats Placeholder */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
              🔒
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              {t('demo.statsLocked.title')}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {t('demo.statsLocked.message')}
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
              <span>💰</span>
              <span>{claimableBalance} CQT {t('demo.earnedInDemo')}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-xl h-32 animate-pulse"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-64 animate-pulse"></div>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-64 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">{t('profile.dashboard.loadingError')}</p>
        <Button onClick={loadDashboardData} className="mt-4">{t('profile.dashboard.retry')}</Button>
      </div>
    );
  }

  // Safe destructuring with fallbacks
  const stats = dashboardData?.stats || { level: 1, totalXP: 0, completedQuests: [], perfectScores: 0, levelData: { name: 'Başlangıç', icon: '🌱' } };
  const tokenStats = dashboardData?.tokenStats || { currentBalance: 0, totalEarned: 0, totalTransferred: 0, totalWithdrawn: 0, transactionCount: 0 };
  const recentActivity = dashboardData?.recentActivity || [];
  const achievements = dashboardData?.achievements || [];
  const levelProgress = dashboardData?.levelProgress || { levelProgress: 0, currentXP: 0, xpToNextLevel: 100 };
  const streakInfo = dashboardData?.streakInfo || { dailyStreak: 0, bestStreak: 0, lastActiveDate: null };

  return (
    <div className="space-y-6">
      {/* Ana İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">
                  <AnimatedCounter value={claimableBalance} duration={1500} />
                </div>
                <div className="text-yellow-100 text-sm">{t('profile.claimableBalance')}</div>
                <div className="text-xs text-yellow-200 mt-1">
                  {t('profile.claim.readyToClaim')}
                </div>
              </div>
              <div className="text-4xl opacity-80">💰</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">
                  <AnimatedCounter value={tokenData.completedQuests || 0} duration={1500} />
                </div>
                <div className="text-purple-100 text-sm">{t('profile.completedQuests')}</div>
                <div className="text-xs text-purple-200 mt-1">
                  {t('profile.stats.perfectScore')}: {stats.perfectScores}
                </div>
              </div>
              <div className="text-4xl opacity-80">🎯</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Warning */}
      {isMobile && (
        <div className="mb-6">
          <MobileWarning variant="light" />
        </div>
      )}

      {/* Overview Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{t('profile.streak.title')}</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">{t('profile.streak.daily')}</span>
                <Badge variant="success">{streakInfo.dailyStreak} {t('profile.streak.dayUnit')}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">{t('profile.streak.best')}</span>
                <Badge variant="primary">{streakInfo.bestStreak} {t('profile.streak.dayUnit')}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">{t('profile.streak.lastActive')}</span>
                <span className="text-sm text-slate-500 dark:text-slate-500">
                  {streakInfo.lastActiveDate ? 
                    new Date(streakInfo.lastActiveDate).toLocaleDateString('tr-TR') : 
                    t('profile.streak.unknown')
                  }
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{t('profile.tokenStats.title')}</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">{t('profile.totalEarned')}</span>
                <span className="font-semibold text-green-600">{totalEarned} CQT</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">{t('profile.claimableBalance')}</span>
                <span className="font-semibold text-blue-600">{claimableBalance} CQT</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">{t('profile.tokenStats.withdrawn')}</span>
                <span className="font-semibold text-purple-600">{tokenData.claimedBalance} CQT</span>
              </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">{t('profile.completedQuests')}</span>
                    <span className="font-semibold">{tokenData.completedQuests || 0}</span>
                  </div>
              
              {/* Token Çekme Butonu */}
              {claimableBalance > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600">
                  <Button 
                    onClick={handleClaimTokens}
                    disabled={isClaiming}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                  >
                    {isClaiming ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{t('profile.claim.transferring')}</span>
                      </div>
                    ) : (
                      `💰 ${claimableBalance} CQT ${t('profile.claim.button')}`
                    )}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Memoized component to prevent unnecessary re-renders
export default memo(ProfileDashboard);
