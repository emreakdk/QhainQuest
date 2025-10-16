import { useState, useEffect, useContext, memo } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { WalletContext } from '../../../context/WalletContext';
import { useToken } from '../../../context/TokenContext';
import { useBalance } from '../../../context/BalanceContext';
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
  const { tokenData } = useToken(); // Use centralized token data
  const { claimableBalance, totalEarned } = useBalance(); // Use global balances
  const { getDashboardData, getPerformanceData, getUserStats } = useDataManager(publicKey);
  
  const [dashboardData, setDashboardData] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

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
      console.error('Dashboard veri yükleme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawTokens = async () => {
    if (!dashboardData?.tokenStats?.currentBalance) return;
    
    try {
      const { TokenManager } = await import('../../../systems/tokenSystem.js');
      const tokenManager = new TokenManager(publicKey);
      
      const result = await tokenManager.withdrawToWallet(dashboardData.tokenStats.currentBalance);
      
      if (result.success) {
        alert(`✅ ${result.amount} CQT cüzdanınıza aktarıldı!`);
        // Dashboard'u yenile
        loadDashboardData();
      } else {
        alert(`❌ Hata: ${result.error}`);
      }
    } catch (error) {
      console.error('Token çekme hatası:', error);
      alert('❌ Token çekme işlemi başarısız oldu');
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
        <p className="text-gray-500 dark:text-gray-400">Dashboard verileri yüklenemedi</p>
        <Button onClick={loadDashboardData} className="mt-4">Tekrar Dene</Button>
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
                  <AnimatedCounter value={totalEarned} duration={1500} />
                </div>
                <div className="text-yellow-100 text-sm">Token Bakiyesi</div>
                <div className="text-xs text-yellow-200 mt-1">
                  Toplam kazanılan: {totalEarned}
                  {claimableBalance > 0 && (
                    <span className="ml-2">(+{claimableBalance} claimable)</span>
                  )}
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
                <div className="text-purple-100 text-sm">Tamamlanan Quest</div>
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
          { id: 'overview', label: 'Genel Bakış', icon: '📊' },
          { id: 'achievements', label: 'Başarılar', icon: '🏆' },
          { id: 'activity', label: 'Aktivite', icon: '🕒' }
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
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Streak Bilgileri</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Günlük Streak</span>
                    <Badge variant="success">{streakInfo.dailyStreak} gün</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">En İyi Streak</span>
                    <Badge variant="primary">{streakInfo.bestStreak} gün</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Son Aktiflik</span>
                    <span className="text-sm text-slate-500 dark:text-slate-500">
                      {streakInfo.lastActiveDate ? 
                        new Date(streakInfo.lastActiveDate).toLocaleDateString('tr-TR') : 
                        'Bilinmiyor'
                      }
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Token İstatistikleri</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Toplam Kazanılan</span>
                    <span className="font-semibold text-green-600">{totalEarned} CQT</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Claimable Balance</span>
                    <span className="font-semibold text-blue-600">{claimableBalance} CQT</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Cüzdana Çekilen</span>
                    <span className="font-semibold text-purple-600">{tokenData.claimedBalance} CQT</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Tamamlanan Quest</span>
                    <span className="font-semibold">{tokenData.completedQuests}</span>
                  </div>
                  
                  {/* Token Çekme Butonu */}
                  {claimableBalance > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600">
                      <Button 
                        onClick={handleWithdrawTokens}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                      >
                        💰 {claimableBalance} CQT Çek
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
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Son Başarılar</h3>
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
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Son Aktiviteler</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.isArray(recentActivity) && recentActivity.length > 0 ? recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="text-2xl">
                      {activity.type === 'quest' ? '🎯' : '💰'}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900 dark:text-white">{activity.title || 'Aktivite'}</div>
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
