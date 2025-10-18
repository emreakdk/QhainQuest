import { useContext, useState, useEffect } from 'react';
import { WalletContext } from './context/WalletContext';
import { TokenProvider, useToken } from './context/TokenContext';
import { BalanceProvider, useBalance } from './context/BalanceContext';
import Header from './components/layout/Header';
import HeroSection from './components/layout/HeroSection';
import QuestGrid from './components/features/quest/QuestGrid';
import UserProfile from './components/features/profile/UserProfile';
import Achievements from './components/features/achievements/Achievements';

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
    // Önce localStorage'dan al
    const savedPage = localStorage.getItem('chainquest-current-page');
    if (savedPage) {
      return savedPage;
    }
    
    // Sonra URL'den al
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    return page || 'quests';
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    
    // LocalStorage'a kaydet
    localStorage.setItem('chainquest-current-page', page);
    
    // URL'yi güncelle
    const url = new URL(window.location);
    url.searchParams.set('page', page);
    window.history.pushState({}, '', url);
  };

  // Load token data and balance when user changes
  useEffect(() => {
    const userIdentifier = isDemoMode ? 'demo' : publicKey;
    console.log(`[App] Loading data for userIdentifier: ${userIdentifier}, isDemoMode: ${isDemoMode}, publicKey: ${publicKey}`);
    loadTokenData(userIdentifier);
    loadBalanceForUser(userIdentifier);
  }, [publicKey, isDemoMode, loadTokenData, loadBalanceForUser]);

  const renderPage = () => {
    console.log('🎯 [App] renderPage called with currentPage:', currentPage);
    switch (currentPage) {
      case 'quests':
        console.log('🎯 [App] Rendering QuestGrid for quests page');
        return <QuestGrid />;
      case 'profile':
        console.log('🎯 [App] Rendering UserProfile for profile page');
        return <UserProfile />;
      case 'leaderboard':
        console.log('🎯 [App] Rendering Achievements for leaderboard page');
        return <Achievements />;
      default:
        console.log('🎯 [App] Rendering QuestGrid as default');
        return <QuestGrid />;
    }
  };

  // Debug logging
  console.log('🔍 [DEBUG] App render - publicKey:', publicKey, 'isDemoMode:', isDemoMode, 'isInitialized:', isInitialized, 'currentPage:', currentPage);
  
  // Show loading spinner while wallet state is being initialized
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