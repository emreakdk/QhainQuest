import { useState, useEffect, useMemo, useCallback } from 'react';
import { useContext } from 'react';
import { WalletContext } from '../../../context/WalletContext';
import { useLanguage } from '../../../context/LanguageContext';
import { useQuest } from '../../../context/QuestContext';
import { useToken } from '../../../context/TokenContext';
import { getCompletedQuestsForUser } from '../../../utils/tokenBalanceCalculator';
import ProfileStats from './ProfileStats';
import CertificateCard from './CertificateCard';
import ProfileDashboard from './ProfileDashboard';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';

const UserProfile = () => {
  const { publicKey, isDemoMode } = useContext(WalletContext);
  const { t } = useLanguage();
  const { userStats, userCertificates, loadUserProgress } = useQuest();
  const { tokenData } = useToken(); // Use centralized token data
  const [activeTab, setActiveTab] = useState('overview');
  const [completedQuests, setCompletedQuests] = useState([]);
  // Remove completedQuestsCount state - use tokenData.completedQuests instead

  // Kullanıcı verilerini yükle - Fixed: Removed userStats from dependencies to prevent infinite loop
  useEffect(() => {
    if (publicKey) {
      loadUserProgress(publicKey);
    }
  }, [publicKey, loadUserProgress]);

  // Load completed quests from localStorage - Fixed: Separate useEffect for completed quests
  useEffect(() => {
    const userIdentifier = isDemoMode ? 'demo' : publicKey;
    if (userIdentifier) {
      const completedQuestsData = getCompletedQuestsForUser(userIdentifier);
      setCompletedQuests(completedQuestsData);
    }
  }, [publicKey, isDemoMode, tokenData.completedQuests]); // Use tokenData.completedQuests for updates

  // Memoized tabs array to prevent unnecessary re-renders
  const tabs = useMemo(() => [
    { id: 'overview', label: t('profile.overview'), icon: '📊' },
    { id: 'certificates', label: t('profile.certificates'), icon: '🏆' }
  ], [t]);

  // Memoized function to prevent recreation on every render
  const truncateKey = useCallback((key) => `${key.slice(0, 6)}...${key.slice(-6)}`, []);

  // Memoized tab change handler to prevent recreation on every render
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);


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
            {tokenData.completedQuests || 0} {t('profile.questCompleted')}
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
              onClick={() => handleTabChange(tab.id)}
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
        {activeTab === 'overview' && (
          <ProfileDashboard />
        )}

        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {t('profile.yourCertificates')}
              </h3>
              <Badge variant="primary">
                {tokenData.completedQuests || 0} {t('profile.certificates')}
              </Badge>
            </div>
            
            {isDemoMode ? (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-8 text-center">
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
                  <span>🏆</span>
                  <span>{tokenData.completedQuests || 0} {t('profile.certificates')} {t('demo.earnedInDemo')}</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedQuests.length > 0 ? completedQuests.map(quest => {
                  // FIX: Added null check to prevent React error #31 when quest object is undefined
                  if (!quest || !quest.name) {
                    return null;
                  }
                  
                  return (
                    <div key={quest.id} className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
                      <div className="text-center">
                        <div className="text-4xl mb-4">🏆</div>
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                          {/* FIX: Rendered quest.name instead of the entire quest object to prevent React error #31 */}
                          {t('profile.certificatePrefix')} {t(quest.nameKey || quest.name)}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                          {/* FIX: Rendered quest.description instead of the entire quest object */}
                          {quest.description || 'Açıklama bulunamadı'}
                        </p>
                        <div className="flex items-center justify-center space-x-4 text-sm">
                          <Badge variant="success">
                            {/* FIX: Rendered quest.rewardAmount instead of the entire quest object */}
                            +{quest.rewardAmount || 0} Token
                          </Badge>
                          <Badge variant="primary">
                            {/* FIX: Rendered quest.difficulty string instead of the entire quest object */}
                            {quest.difficulty || 'beginner'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                }) : (
                  <div className="col-span-full text-center py-8 text-slate-500 dark:text-slate-400">
                    {t('emptyState.certificates')}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default UserProfile;
