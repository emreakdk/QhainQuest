import { useContext, useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { WalletContext } from './context/WalletContext';
import { TokenProvider, useToken } from './context/TokenContext';
import { BalanceProvider, useBalance } from './context/BalanceContext';
import { TestProvider } from './context/TestContext';
import { UserProvider } from './context/UserContext';
import { useQuest } from './context/QuestContext';
import Header from './components/layout/Header';
import HeroSection from './components/layout/HeroSection';
import Footer from './components/layout/Footer';
import QuestGrid from './components/features/quest/QuestGrid';
import UserProfile from './components/features/profile/UserProfile';
import Achievements from './components/features/achievements/Achievements';
import HowToClaimPage from './pages/HowToClaimPage';
import LearnWeb3 from './pages/LearnWeb3';
import AIQuizGenerator from './pages/AIQuizGenerator';
import AboutPage from './pages/AboutPage';
import Web3ArticleDetail from './components/web3-portal/Web3ArticleDetail';
import GlobalLoader from './components/ui/GlobalLoader';
import AIAssistantWidget from './components/features/ai/AIAssistantWidget';
import AppTour from './components/features/onboarding/AppTour';

function App() {
  return (
    <BrowserRouter>
      <TokenProvider>
        <BalanceProvider>
          <UserProvider>
            <TestProvider>
              <AppContent />
            </TestProvider>
          </UserProvider>
        </BalanceProvider>
      </TokenProvider>
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { publicKey, isDemoMode, isInitialized } = useContext(WalletContext);
  const { loadTokenData, isLoading: isTokenLoading } = useToken();
  const { loadBalanceForUser } = useBalance();
  const { loading: isQuestLoading } = useQuest();
  
  // Check if we're on an article detail page
  const isArticleDetailPage = location.pathname.startsWith('/web3-article/');
  
  // Check if we're on the about page
  const isAboutPage = location.pathname === '/about';
  
  const [currentPage, setCurrentPage] = useState(() => {
    // If on article detail page, set page to 'learn-web3'
    if (isArticleDetailPage) {
      return 'learn-web3';
    }
    
    // Check if user is connected first (we need to check this after context is available)
    // For now, we'll handle this in useEffect
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
    
    // If we're on /about route, navigate away from it first
    if (location.pathname === '/about') {
      // If changing to learn-web3, navigate to it directly
      if (page === 'learn-web3') {
        navigate('/learn-web3');
        return;
      }
      // For other pages, navigate to root with page param
      navigate(`/?page=${page}`);
      return;
    }
    
    // If changing to learn-web3, navigate to it
    if (page === 'learn-web3' && !isArticleDetailPage) {
      navigate('/learn-web3');
      return;
    }
    
    // For other pages, use URL params as before
    const url = new URL(window.location);
    url.searchParams.set('page', page);
    window.history.pushState({}, '', url);
  };
  
  // Sync currentPage with location and handle initial page for unauthenticated users
  useEffect(() => {
    if (isArticleDetailPage) {
      setCurrentPage('learn-web3');
    } else if (location.pathname === '/learn-web3') {
      setCurrentPage('learn-web3');
    } else if (isInitialized && !publicKey && !isDemoMode) {
      // If user is not authenticated and not on learn-web3, ensure HeroSection shows
      // The rendering logic will handle showing HeroSection when user is not authenticated
      // currentPage can be anything, but HeroSection will be shown regardless
    }
    // Note: We don't change currentPage when publicKey or isDemoMode changes
    // This ensures users stay on their current page when disconnecting wallet
  }, [location.pathname, isArticleDetailPage, isInitialized]);

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
        return <QuestGrid onPageChange={handlePageChange} />;
      case 'profile':
        return <UserProfile onPageChange={handlePageChange} />;
      case 'leaderboard':
        return <Achievements onPageChange={handlePageChange} />;
      case 'how-to-claim':
        return <HowToClaimPage onPageChange={handlePageChange} />;
      case 'learn-web3':
        return <LearnWeb3 onPageChange={handlePageChange} />;
      case 'ai-quiz':
        return <AIQuizGenerator onPageChange={handlePageChange} />;
      default:
        return <QuestGrid onPageChange={handlePageChange} />;
    }
  };
  
  // Render article detail page directly if on that route
  if (isArticleDetailPage) {
    return (
      <>
        <GlobalLoader isVisible={showGlobalLoader} />
        <div className={`min-h-screen transition-colors duration-300 ${(publicKey || isDemoMode) ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white' : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white'}`}>
          <Header currentPage="learn-web3" onPageChange={handlePageChange} />
          <main className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
            <Web3ArticleDetail onPageChange={handlePageChange} />
          </main>
          {(publicKey || isDemoMode) && <AIAssistantWidget />}
          <Footer onPageChange={handlePageChange} />
        </div>
      </>
    );
  }
  
  // Render about page directly if on that route
  if (isAboutPage) {
    return (
      <>
        <GlobalLoader isVisible={showGlobalLoader} />
        <div className="min-h-screen transition-colors duration-300 bg-slate-950 text-slate-300">
          <Header currentPage="about" onPageChange={handlePageChange} />
          <main className="bg-slate-950 text-slate-300">
            <AboutPage />
          </main>
          {(publicKey || isDemoMode) && <AIAssistantWidget />}
          <Footer onPageChange={handlePageChange} />
        </div>
      </>
    );
  }
  
  return (
    <>
      <GlobalLoader isVisible={showGlobalLoader} />
      <AppTour currentPage={currentPage} isAuthenticated={!!(publicKey || isDemoMode)} />
      <div className={`min-h-screen transition-colors duration-300 ${(publicKey || isDemoMode) ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white' : 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white'}`}>
        <Header currentPage={currentPage} onPageChange={handlePageChange} />
        <main className={(publicKey || isDemoMode) ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white" : ""}> 
          {(publicKey || isDemoMode) ? (
            <div className="container mx-auto p-4 pt-24">
              {renderPage()}
            </div>
          ) : currentPage === 'learn-web3' ? (
            <div className="pt-20 bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
              {renderPage()}
            </div>
          ) : (
            // Show HeroSection (landing page) when user is not authenticated
            <HeroSection onPageChange={handlePageChange} />
          )}
        </main>
        {/* Global AI Assistant Widget - Available on all pages */}
        {(publicKey || isDemoMode) && <AIAssistantWidget />}
        <Footer onPageChange={handlePageChange} />
      </div>
    </>
  );
}

export default App;