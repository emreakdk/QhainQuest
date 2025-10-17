import { useState, useEffect, useContext, memo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { WalletContext } from '../../../context/WalletContext';
import { useToken } from '../../../context/TokenContext';
import { useBalance } from '../../../context/BalanceContext';
import { useNotification } from '../../../context/NotificationContext';
import { useDataManager } from '../../../systems/dataManager.js';
import { Card, CardContent, CardHeader } from '../../ui/Card';
import AnimatedCounter from '../../ui/AnimatedCounter';
import ProgressRing from '../../ui/ProgressRing';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';

// Basit grafik komponenti (Chart.js olmadan)
const SimpleChart = ({ data, type = 'line', height = 200 }) => {
  if (!data || data.length === 0) return <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">Veri yok</div>;

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
  const { publicKey } = useContext(WalletContext);
  const { tokenData, claimTokens } = useToken(); // Use centralized token data
  const { claimableBalance, totalEarned, resetClaimableBalance } = useBalance(); // Use global balances
  const { showSuccess, showError } = useNotification();
  const { getDashboardData, getPerformanceData, getUserStats } = useDataManager(publicKey);
  
  const [dashboardData, setDashboardData] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    if (publicKey) {
      loadDashboardData();
    }
  }, [publicKey]);

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
          'Token\'lar Başarıyla Aktarıldı!',
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
  const stats = dashboardData?.stats || { level: 1, totalXP: 0, completedQuests: [], perfectScores: 0, levelData: { name: t('level.beginner'), icon: '🌱' } };
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
                  Tokens ready to claim
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
                  <AnimatedCounter value={Array.isArray(stats.completedQuests) ? stats.completedQuests.length : 0} duration={1500} />
                </div>
                <div className="text-purple-100 text-sm">{t('profile.completedQuests')}</div>
                <div className="text-xs text-purple-200 mt-1">
                  Perfect skor: {stats.perfectScores}
                </div>
              </div>
              <div className="text-4xl opacity-80">🎯</div>
            </div>
          </CardContent>
        </Card>
      </div>


      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {[
          { id: 'overview', label: t('profile.overview'), icon: '📊' },
          { id: 'achievements', label: t('profile.achievements'), icon: '🏆' },
          { id: 'activity', label: t('profile.tabs.activity'), icon: '🕒' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeTab === 'overview' && (
          <>
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
                    <span className="font-semibold">{tokenData.completedQuests}</span>
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
                            <span>Aktarılıyor...</span>
                          </div>
                        ) : (
                          `💰 ${claimableBalance} CQT Çek`
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}


        {activeTab === 'achievements' && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{t('profile.recentAchievements')}</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.isArray(achievements) && achievements.length > 0 ? achievements.map((achievement, index) => (
                  <div key={index} className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-4 text-white">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">🏆</span>
                      <span className="font-semibold">{achievement.type || 'Başarı'}</span>
                    </div>
                    <p className="text-sm text-yellow-100">{achievement.message || 'Başarı kazanıldı!'}</p>
                    <div className="text-xs text-yellow-200 mt-2">
                      +{achievement.reward?.tokens || 0} Token
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full text-center py-8 text-slate-500 dark:text-slate-400">
                    Henüz başarı kazanmadınız. Quest'leri tamamlayarak başarılar kazanın!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'activity' && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{t('profile.dashboard.recentActivities')}</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.isArray(recentActivity) && recentActivity.length > 0 ? recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="text-2xl">
                      {activity.type === 'quest' ? '🎯' : '💰'}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900 dark:text-white">{activity.title || t('profile.dashboard.activity')}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{activity.description || 'Açıklama yok'}</div>
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-500">
                      {activity.timestamp ? new Date(activity.timestamp).toLocaleDateString('tr-TR') : 'Tarih yok'}
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                    Henüz aktivite bulunmuyor.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

// Memoized component to prevent unnecessary re-renders
export default memo(ProfileDashboard);
