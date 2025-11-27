import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useToken } from '../context/TokenContext';
import { WalletContext } from '../context/WalletContext';
import { web3Articles } from '../data/web3ArticlesData';
import Web3Hero from '../components/web3-portal/Web3Hero';
import Web3Sidebar from '../components/web3-portal/Web3Sidebar';
import Web3Card from '../components/web3-portal/Web3Card';

const LearnWeb3 = ({ onPageChange }) => {
  const { t } = useLanguage();
  const { tokenData } = useToken();
  const { publicKey, isDemoMode } = useContext(WalletContext);
  const navigate = useNavigate();
  
  // Sync URL with page state - only if user explicitly navigated to learn-web3
  // Don't force navigation when wallet connection changes
  useEffect(() => {
    // Only update URL if we're actually on the learn-web3 page
    // This prevents unwanted redirects when wallet connection changes
    const currentPath = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    
    // Only navigate if:
    // 1. We're not already on /learn-web3 AND
    // 2. The page param is 'learn-web3' (user explicitly navigated here)
    if (currentPath !== '/learn-web3' && pageParam === 'learn-web3') {
      navigate('/learn-web3', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section - Full Width */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Web3Hero onPageChange={onPageChange} />
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          {/* Left Column - Articles (70%) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {t('portal.section.title')}
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  {t('portal.section.subtitle')}
                </p>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="space-y-6">
              {web3Articles.map((article) => (
                <Web3Card
                  key={article.id}
                  articleId={article.id}
                  title={t(article.titleKey)}
                  description={t(article.descriptionKey)}
                  duration={`${article.duration} ${t('portal.duration.min')}`}
                  tokenReward={article.tokenReward}
                  category={article.category}
                  difficulty={article.difficulty}
                />
              ))}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center pt-6">
              <button 
                onClick={() => onPageChange('quests')}
                className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-700"
              >
                {t('portal.loadMore')}
              </button>
            </div>
          </div>

          {/* Right Column - Sidebar (30%) */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <Web3Sidebar 
                tokenBalance={tokenData?.totalBalance || 0}
                isConnected={!!(publicKey || isDemoMode)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnWeb3;

