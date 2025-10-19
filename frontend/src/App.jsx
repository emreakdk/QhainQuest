import { useContext, useState, useEffect } from 'react';
import { WalletContext } from './context/WalletContext';
import { TokenProvider, useToken } from './context/TokenContext';
import { BalanceProvider, useBalance } from './context/BalanceContext';
import Header from './components/layout/Header';
import HeroSection from './components/layout/HeroSection';
import QuestGrid from './components/features/quest/QuestGrid';
import UserProfile from './components/features/profile/UserProfile';
import Achievements from './components/features/achievements/Achievements';
import HowToClaimPage from './pages/HowToClaimPage';

function App() {
  return (
    <TokenProvider>
      <BalanceProvider>
        <AppContent />
      </BalanceProvider>
    </TokenProvider>
  );
}

function AppContent() {
  const { publicKey, isDemoMode, isInitialized } = useContext(WalletContext);
  const { loadTokenData } = useToken();
  const { loadBalanceForUser } = useBalance();
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('chainquest-current-page');
    if (savedPage) {
      return savedPage;
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    return page || 'quests';
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    
    localStorage.setItem('chainquest-current-page', page);
    
    const url = new URL(window.location);
    url.searchParams.set('page', page);
    window.history.pushState({}, '', url);
  };

  useEffect(() => {
    const userIdentifier = isDemoMode ? 'demo' : publicKey;
    loadTokenData(userIdentifier);
    loadBalanceForUser(userIdentifier);
  }, [publicKey, isDemoMode, loadTokenData, loadBalanceForUser]);

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
      default:
        return <QuestGrid />;
    }
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium">Yükleniyor...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${(publicKey || isDemoMode) ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white' : 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white'}`}>
      <Header currentPage={currentPage} onPageChange={handlePageChange} />
      <main className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"> 
        {(publicKey || isDemoMode) ? (
          <div className="container mx-auto p-4 pt-24">
            {renderPage()}
          </div>
        ) : (
          <HeroSection onPageChange={handlePageChange} />
        )}
      </main>
    </div>
  );
}

export default App;