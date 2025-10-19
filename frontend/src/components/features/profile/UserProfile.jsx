import { useState, useEffect, useMemo, useCallback } from 'react';
import { useContext } from 'react';
import { WalletContext } from '../../../context/WalletContext';
import { useLanguage } from '../../../context/LanguageContext';
import { useQuest } from '../../../context/QuestContext';
import { useToken } from '../../../context/TokenContext';
import { getCompletedQuestsForUser } from '../../../utils/tokenBalanceCalculator';
import { isMobile } from 'react-device-detect';
import ProfileStats from './ProfileStats';
import CertificateCard from './CertificateCard';
import ProfileDashboard from './ProfileDashboard';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';
import MobileWarning from '../../ui/MobileWarning';

const UserProfile = ({ onPageChange }) => {
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
      console.log(`[UserProfile] Loaded completed quests for ${userIdentifier}:`, completedQuestsData);
      setCompletedQuests(completedQuestsData);
    }
  }, [publicKey, isDemoMode, tokenData.completedQuests]); // Use tokenData.completedQuests for updates

  // Memoized tabs array to prevent unnecessary re-renders
  // UI SIMPLIFICATION: Hide certificates tab in demo mode
  const tabs = useMemo(() => {
    const baseTabs = [
      { id: 'overview', label: t('profile.overview'), icon: '📊' }
    ];
    
    // Only add certificates tab when NOT in demo mode
    if (!isDemoMode) {
      baseTabs.push({ id: 'certificates', label: t('profile.certificates'), icon: '🏆' });
    }
    
    return baseTabs;
  }, [t, isDemoMode]);

  // Memoized function to prevent recreation on every render
  const truncateKey = useCallback((key) => `${key.slice(0, 6)}...${key.slice(-6)}`, []);

  // Memoized tab change handler to prevent recreation on every render
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);


  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Profile Header */}
      <div className="text-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl sm:text-3xl">👤</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {t('profile.title')}
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
          <Badge variant="primary" className="text-xs sm:text-sm">
            {truncateKey(publicKey)}
          </Badge>
          {/* UI SIMPLIFICATION: Hide quest completed badge in demo mode */}
          {!isDemoMode && (
            <Badge variant="success" className="text-xs sm:text-sm">
              {tokenData.completedQuests || 0} {t('profile.questCompleted')}
            </Badge>
          )}
        </div>
      </div>

      {/* Profile Stats */}
      <ProfileStats userStats={userStats} onPageChange={onPageChange} />

      {/* Mobile Warning */}
      {isMobile && (
        <div className="mb-6">
          <MobileWarning variant="light" />
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-700">
        <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
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
                {(() => {
                  console.log(`[UserProfile] Certificates tab - completedQuests:`, completedQuests);
                  console.log(`[UserProfile] Certificates tab - completedQuests.length:`, completedQuests.length);
                  return null;
                })()}
                {completedQuests.length > 0 ? completedQuests.map(quest => {
                  // FIX: Check for quest object and required properties
                  if (!quest || !quest.id) {
                    console.warn('Invalid quest object:', quest);
                    return null;
                  }
                  
                  return (
                    <div key={quest.id} className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
                      <div className="text-center">
                        <div className="text-4xl mb-4">🏆</div>
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                          {/* FIX: Use quest.nameKey for i18n translation */}
                          {t('profile.certificatePrefix')} {t(quest.nameKey || quest.name || 'Unknown Quest')}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                          {/* FIX: Use quest.descriptionKey for i18n translation */}
                          {t(quest.descriptionKey || quest.description || 'Açıklama bulunamadı')}
                        </p>
                        <div className="flex items-center justify-center space-x-4 text-sm">
                          <Badge variant="success">
                            {/* FIX: Use quest.rewardAmount */}
                            +{quest.rewardAmount || 0} Token
                          </Badge>
                          <Badge variant="primary">
                            {/* FIX: Use quest.difficulty */}
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
