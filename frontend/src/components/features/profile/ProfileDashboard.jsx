import { useState, useEffect, useContext } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { WalletContext } from '../../../context/WalletContext';
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

  const { stats, tokenStats, recentActivity, achievements, levelProgress, streakInfo } = dashboardData;

  return (
    <div className="space-y-6">
      {/* Ana İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">
                  <AnimatedCounter value={stats.level} duration={1500} />
                </div>
                <div className="text-blue-100 text-sm">Seviye</div>
                <div className="text-xs text-blue-200 mt-1">
                  {stats.levelData?.name || 'Başlangıç'}
                </div>
              </div>
              <div className="text-4xl opacity-80">
                {stats.levelData?.icon || '🌱'}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">
                  <AnimatedCounter value={stats.totalXP} duration={1500} />
                </div>
                <div className="text-green-100 text-sm">Toplam XP</div>
                <div className="text-xs text-green-200 mt-1">
                  Sonraki seviye: {levelProgress.xpToNextLevel} XP
                </div>
              </div>
              <div className="text-4xl opacity-80">⚡</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">
                  <AnimatedCounter value={tokenStats.currentBalance} duration={1500} />
                </div>
                <div className="text-yellow-100 text-sm">Token Bakiyesi</div>
                <div className="text-xs text-yellow-200 mt-1">
                  Toplam kazanılan: {tokenStats.totalEarned}
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
                  <AnimatedCounter value={stats.completedQuests.length} duration={1500} />
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

      {/* Seviye İlerlemesi */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Seviye İlerlemesi</h3>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-8">
            <ProgressRing 
              progress={levelProgress.levelProgress} 
              size={120} 
              strokeWidth={8}
              color="#8b5cf6"
            />
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                Seviye {stats.level}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {levelProgress.currentXP} / {levelProgress.currentXP + levelProgress.xpToNextLevel} XP
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                Sonraki seviye için {levelProgress.xpToNextLevel} XP gerekli
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Genel Bakış', icon: '📊' },
          { id: 'performance', label: 'Performans', icon: '📈' },
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
                    <span className="font-semibold text-green-600">{tokenStats.totalEarned} CQT</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Transfer Edilen</span>
                    <span className="font-semibold text-blue-600">{tokenStats.totalTransferred} CQT</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Cüzdana Çekilen</span>
                    <span className="font-semibold text-purple-600">{tokenStats.totalWithdrawn} CQT</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Toplam İşlem</span>
                    <span className="font-semibold">{tokenStats.transactionCount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'performance' && performanceData && (
          <>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Günlük İlerleme</h3>
              </CardHeader>
              <CardContent>
                <SimpleChart 
                  data={performanceData.dailyProgress.map(day => ({
                    label: new Date(day.date).toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' }),
                    value: day.xp
                  }))}
                  type="line"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Kategori Performansı</h3>
              </CardHeader>
              <CardContent>
                <SimpleChart 
                  data={Object.entries(performanceData.categoryStats).map(([category, data]) => ({
                    label: category,
                    value: data.completed
                  }))}
                  type="bar"
                />
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
                {achievements.length > 0 ? achievements.map((achievement, index) => (
                  <div key={index} className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-4 text-white">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">🏆</span>
                      <span className="font-semibold">{achievement.type || 'Başarı'}</span>
                    </div>
                    <p className="text-sm text-yellow-100">{achievement.message || 'Başarı kazanıldı!'}</p>
                    <div className="text-xs text-yellow-200 mt-2">
                      +{achievement.reward?.xp || 0} XP, +{achievement.reward?.tokens || 0} Token
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
                {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
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

export default ProfileDashboard;
