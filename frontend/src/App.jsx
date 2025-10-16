import { useContext, useState, useEffect } from 'react';
import { WalletContext } from './context/WalletContext';
import { TokenProvider, useToken } from './context/TokenContext';
import Header from './components/layout/Header';
import HeroSection from './components/layout/HeroSection';
import QuestGrid from './components/features/quest/QuestGrid';
import UserProfile from './components/features/profile/UserProfile';
import Leaderboard from './components/features/leaderboard/Leaderboard';

function App() {
  return (
    <TokenProvider>
      <AppContent />
    </TokenProvider>
  );
}

function AppContent() {
  const { publicKey } = useContext(WalletContext);
  const { loadTokenData } = useToken();
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

  // Load token data when user changes
  useEffect(() => {
    loadTokenData(publicKey);
  }, [publicKey, loadTokenData]);

  const renderPage = () => {
    switch (currentPage) {
      case 'quests':
        return <QuestGrid />;
      case 'profile':
        return <UserProfile />;
      case 'leaderboard':
        return <Leaderboard />;
      default:
        return <QuestGrid />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${publicKey ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white' : 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white'}`}>
      <Header currentPage={currentPage} onPageChange={handlePageChange} />
      <main> 
        {publicKey ? (
          <div className="container mx-auto p-4 pt-24">
            {renderPage()}
          </div>
        ) : (
          <HeroSection />
        )}
      </main>
    </div>
  );
}

export default App;