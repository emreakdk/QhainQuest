import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { WalletContext } from '../../../context/WalletContext';
import { useLanguage } from '../../../context/LanguageContext';
import { useQuest } from '../../../context/QuestContext';
import ProfileStats from './ProfileStats';
import CertificateCard from './CertificateCard';
import ProfileDashboard from './ProfileDashboard';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';

const UserProfile = () => {
  const { publicKey } = useContext(WalletContext);
  const { t } = useLanguage();
  const { userStats, userCertificates, loadUserProgress } = useQuest();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Kullanıcı verilerini yükle
  useEffect(() => {
    if (publicKey) {
      loadUserProgress(publicKey);
    }
  }, [publicKey, loadUserProgress]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'overview', label: t('profile.overview'), icon: '👤' },
    { id: 'certificates', label: t('profile.certificates'), icon: '🏆' },
    { id: 'achievements', label: t('profile.achievements'), icon: '🎯' }
  ];

  const truncateKey = (key) => `${key.slice(0, 6)}...${key.slice(-6)}`;

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-3xl">👤</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {t('profile.title')}
        </h1>
        <div className="flex items-center justify-center space-x-2">
          <Badge variant="primary">
            {truncateKey(publicKey)}
          </Badge>
          <Badge variant="success">
            {t('profile.level')} {userStats?.level || 1}
          </Badge>
        </div>
      </div>

      {/* Profile Stats */}
      <ProfileStats userStats={userStats} />

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-700">
        <nav className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'dashboard' && (
          <ProfileDashboard />
        )}

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Son Aktiviteler
                </h3>
                <div className="space-y-3">
                  {[
                    { action: "Stellar Temelleri görevini tamamladı", time: "2 saat önce", type: "quest" },
                    { action: "150 Token ödülü kazandı", time: "2 saat önce", type: "reward" },
                    { action: "Yeni sertifika aldı", time: "1 gün önce", type: "certificate" },
                    { action: "DeFi Protokolleri görevine başladı", time: "3 gün önce", type: "quest" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'quest' ? 'bg-blue-500' :
                        activity.type === 'reward' ? 'bg-yellow-500' : 'bg-purple-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {activity.action}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Chart Placeholder */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  İlerleme Grafiği
                </h3>
                <div className="h-48 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                  <p className="text-slate-500 dark:text-slate-400">
                    Grafik burada görünecek
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {t('profile.nftCertificates')}
              </h3>
              <Badge variant="primary">
                {userCertificates ? userCertificates.length : 0} {t('profile.certificates')}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userCertificates && userCertificates.length > 0 ? userCertificates.map(certificate => {
                // Sertifika objesini güvenli hale getir
                const safeCertificate = {
                  id: certificate?.id || 'unknown',
                  questId: certificate?.questId || 'unknown',
                  questName: certificate?.questName || 'Unknown Quest',
                  title: certificate?.title || certificate?.questName || 'Sertifika',
                  description: certificate?.description || `${certificate?.questName || 'Quest'} başarıyla tamamlandı`,
                  category: certificate?.category || 'Blockchain',
                  rarity: certificate?.rarity || 'Common',
                  completedAt: certificate?.completedAt || null,
                  earnedAt: certificate?.earnedAt || new Date().toISOString(),
                  nftUrl: certificate?.nftUrl || null,
                  transactionHash: certificate?.transactionHash || null
                };
                return <CertificateCard key={safeCertificate.id} certificate={safeCertificate} />;
              }) : (
                <div className="col-span-full text-center py-8 text-slate-500 dark:text-slate-400">
                  Henüz sertifika kazanmadınız. Quest'leri tamamlayarak sertifika kazanın!
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Başarılarınız
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "İlk Adım", description: "İlk görevinizi tamamladınız", icon: "🚀", unlocked: true },
                { title: "Token Toplayıcı", description: "1000+ token kazandınız", icon: "💰", unlocked: true },
                { title: "Sertifika Avcısı", description: "3+ sertifika aldınız", icon: "🏆", unlocked: true },
                { title: "Uzman", description: "10+ görev tamamladınız", icon: "⭐", unlocked: false },
                { title: "Hız Makinesi", description: "1 saatte 5 görev tamamlayın", icon: "⚡", unlocked: false },
                { title: "Efsane", description: "Tüm görevleri tamamlayın", icon: "👑", unlocked: false }
              ].map((achievement, index) => (
                <div key={index} className={`p-6 rounded-xl border-2 ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-700' 
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-60'
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className={`text-3xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${achievement.unlocked ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-sm ${achievement.unlocked ? 'text-slate-600 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500'}`}>
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.unlocked && (
                      <Badge variant="success">✓</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
