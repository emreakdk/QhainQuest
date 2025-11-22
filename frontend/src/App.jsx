import { useContext, useState, useEffect, useMemo } from 'react';
import { WalletContext } from './context/WalletContext';
import { TokenProvider, useToken } from './context/TokenContext';
import { BalanceProvider, useBalance } from './context/BalanceContext';
import { TestProvider } from './context/TestContext';
import { useQuest } from './context/QuestContext';
import Header from './components/layout/Header';
import HeroSection from './components/layout/HeroSection';
import QuestGrid from './components/features/quest/QuestGrid';
import UserProfile from './components/features/profile/UserProfile';
import Achievements from './components/features/achievements/Achievements';
import HowToClaimPage from './pages/HowToClaimPage';
import LearnWeb3 from './pages/LearnWeb3';
import GlobalLoader from './components/ui/GlobalLoader';
import AIAssistantWidget from './components/features/ai/AIAssistantWidget';

function App() {
  return (
    <TokenProvider>
      <BalanceProvider>
        <TestProvider>
          <AppContent />
        </TestProvider>
      </BalanceProvider>
    </TokenProvider>
  );
}

function AppContent() {
  const { publicKey, isDemoMode, isInitialized } = useContext(WalletContext);
  const { loadTokenData, isLoading: isTokenLoading } = useToken();
  const { loadBalanceForUser } = useBalance();
  const { loading: isQuestLoading } = useQuest();
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('chainquest-current-page');
    if (savedPage) {
      return savedPage;
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    return page || 'quests';
  });
  const [isInitialDataLoading, setIsInitialDataLoading] = useState(true);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    
    localStorage.setItem('chainquest-current-page', page);
    
    const url = new URL(window.location);
    url.searchParams.set('page', page);
    window.history.pushState({}, '', url);
  };

  // Track initial data loading
  useEffect(() => {
    if (isInitialized) {
      const userIdentifier = isDemoMode ? 'demo' : publicKey;
      if (userIdentifier) {
        // Start loading data
        loadTokenData(userIdentifier);
        loadBalanceForUser(userIdentifier);
      }
      
      // Set initial loading to false after a brief moment to allow data fetching to start
      // This ensures we show the loader only when actually loading
      const timer = setTimeout(() => {
        setIsInitialDataLoading(false);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [publicKey, isDemoMode, isInitialized, loadTokenData, loadBalanceForUser]);

  // Determine if we should show the global loader
  const showGlobalLoader = useMemo(() => {
    // Show loader if wallet is not initialized yet
    if (!isInitialized) {
      return true;
    }
    
    // If user is connected (has wallet or demo mode), check if data is loading
    const userIdentifier = isDemoMode ? 'demo' : publicKey;
    if (userIdentifier) {
      // Show loader during initial data loading phase or if critical data is still loading
      if (isInitialDataLoading || isTokenLoading || isQuestLoading) {
        return true;
      }
    }
    
    return false;
  }, [isInitialized, isInitialDataLoading, isTokenLoading, isQuestLoading, publicKey, isDemoMode]);

  const renderPage = () => {
    switch (currentPage) {
      case 'quests':
        return <QuestGrid />;
      case 'profile':
        return <UserProfile onPageChange={handlePageChange} />;
      case 'leaderboard':
        return <Achievements />;
      case 'how-to-claim':
        return <HowToClaimPage onPageChange={handlePageChange} />;
      case 'learn-web3':
        return <LearnWeb3 onPageChange={handlePageChange} />;
      default:
        return <QuestGrid />;
    }
  };
  
  return (
    <>
      <GlobalLoader isVisible={showGlobalLoader} />
      <div className={`min-h-screen transition-colors duration-300 ${(publicKey || isDemoMode) ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white' : 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white'}`}>
        <Header currentPage={currentPage} onPageChange={handlePageChange} />
        <main className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"> 
          {(publicKey || isDemoMode) ? (
            <div className="container mx-auto p-4 pt-24">
              {renderPage()}
            </div>
          ) : currentPage === 'learn-web3' ? (
            <div className="pt-20">
              {renderPage()}
            </div>
          ) : (
            <HeroSection onPageChange={handlePageChange} />
          )}
        </main>
        {/* Global AI Assistant Widget - Available on all pages */}
        {(publicKey || isDemoMode) && <AIAssistantWidget />}
      </div>
    </>
  );
}

export default App;