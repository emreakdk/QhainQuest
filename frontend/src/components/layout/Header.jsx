import { useContext, useState, useEffect } from 'react';
import { WalletContext } from '../../context/WalletContext';
import { useToken } from '../../context/TokenContext';
import { useBalance } from '../../context/BalanceContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTestStatus } from '../../context/TestContext';
import Button from '../ui/Button';
import IconButton from '../ui/IconButton';
import FreighterConnect from '../features/wallet/FreighterConnect';
import PublicKeyTooltip from '../ui/PublicKeyTooltip';
import ExitWarningModal from '../ui/ExitWarningModal';
import { 
  TbSchool, 
  TbListDetails, 
  TbChecklist, 
  TbAward, 
  TbUserHexagon,
  TbWallet,
  TbLanguage,
  TbSun,
  TbMoon,
  TbMenu2,
  TbX,
  TbCoins
} from 'react-icons/tb';

const Header = ({ currentPage, onPageChange }) => {
  const { publicKey, setPublicKey, isDemoMode, exitDemoMode } = useContext(WalletContext);
  const { tokenData } = useToken(); // Get centralized token data
  const { claimableBalance, totalEarned } = useBalance(); // Get global balances
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const { t, toggleLanguage, language } = useLanguage();
  const { isTestActive, setIsTestActive } = useTestStatus();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);

  // Listen to window resize to toggle compact mode at 1500px breakpoint
  useEffect(() => {
    const checkWidth = () => {
      setIsCompact(window.innerWidth < 1500);
    };

    // Check on mount
    checkWidth();

    // Listen to resize events
    window.addEventListener('resize', checkWidth);

    return () => {
      window.removeEventListener('resize', checkWidth);
    };
  }, []);

  const navigationItems = [
    { id: 'learn-web3', label: t('nav.learnWeb3'), icon: TbSchool },
    { id: 'how-to-claim', label: t('nav.howToClaim'), icon: TbListDetails },
    { id: 'quests', label: t('nav.quests'), icon: TbChecklist },
    { id: 'leaderboard', label: t('nav.leaderboard'), icon: TbAward },
    { id: 'profile', label: t('nav.profile'), icon: TbUserHexagon },
  ];

  // Navigation guard: intercept navigation when test is active
  const handlePageChange = (pageId) => {
    if (isTestActive) {
      // Store the target page and show warning modal
      setPendingNavigation(pageId);
      setShowExitWarning(true);
    } else {
      // Navigate normally
      onPageChange(pageId);
    }
  };

  // Handle modal confirm: exit test and navigate
  const handleConfirmExit = () => {
    // 1. End the active test session
    if (setIsTestActive) setIsTestActive(false);
    
    // 2. Close the warning modal
    setShowExitWarning(false);
    
    // 3. Navigate to the pending page (if set)
    if (pendingNavigation !== null) {
      onPageChange(pendingNavigation);
      setPendingNavigation(null);
    }
  };

  // Handle modal cancel: stay on current page
  const handleCancelExit = () => {
    // User decided to stay in the test
    setShowExitWarning(false);
    setPendingNavigation(null);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-lg backdrop-blur-sm">
      <style>{`
        /* Base Hover State (Light Mode) */
        .nav-item-force:hover {
          background-color: #F3E8FF !important; /* purple-100 */
          color: #7E22CE !important; /* purple-700 */
        }
        
        /* ICON COLOR FIX (Light Mode) */
        .nav-item-force:hover svg,
        .nav-item-force.active svg {
          color: #7E22CE !important; /* purple-700 matches text */
          stroke: #7E22CE !important; /* Force stroke color if needed */
        }

        /* Active State (Light Mode) */
        .nav-item-force.active {
          background-color: #F3E8FF !important;
          color: #7E22CE !important;
        }

        /* Dark Mode Overrides */
        .dark .nav-item-force:hover {
          background-color: #1e293b !important; /* slate-800 */
          color: #ffffff !important;
        }
        
        .dark .nav-item-force.active {
          background-color: #4f46e5 !important; /* indigo-600 */
          color: #ffffff !important;
        }

        /* Dark Mode ICON FIX */
        .dark .nav-item-force:hover svg,
        .dark .nav-item-force.active svg {
          color: #ffffff !important;
          stroke: #ffffff !important;
        }
      `}</style>
      <nav className="container mx-auto flex items-center justify-between p-3 sm:p-4 gap-2 sm:gap-4">
        {/* Left Zone: Logo + CQT Chip (always visible) */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink-0">
          {/* Logo - Clickable to return home */}
          <button
            onClick={() => handlePageChange(null)}
            className="flex items-center space-x-2 flex-shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
            aria-label="Return to home"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CQ</span>
            </div>
            <span className="hidden sm:inline text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
              ChainQuest
            </span>
          </button>

          {/* Token Balance Display - Always visible when available */}
          {(publicKey || isDemoMode) && claimableBalance > 0 && (
            <div className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 px-2 sm:px-3 py-1.5 rounded-lg border border-yellow-200 dark:border-yellow-700 flex-shrink-0 whitespace-nowrap">
              <TbCoins size={16} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                {claimableBalance} CQT
              </span>
            </div>
          )}
        </div>

        {/* Center Zone: Navigation Menu - Desktop Only */}
        <div className="hidden lg:flex items-center gap-1 flex-1 justify-center max-w-2xl mx-4">
          {navigationItems.map(item => {
            const IconComponent = item.icon;
            // Hide all navigation links for public users (not connected)
            const canShow = (publicKey || isDemoMode);
            
            if (!canShow) return null;
            
            return (
              <button
                key={item.id}
                onClick={() => handlePageChange(item.id)}
                className={`nav-item-force inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                  currentPage === item.id
                    ? 'active shadow-lg'
                    : 'bg-transparent text-slate-600 dark:text-slate-400'
                }`}
              >
                <IconComponent size={18} className={`${currentPage === item.id ? 'text-purple-700 dark:text-white' : 'text-[#8b5cf6] dark:text-gray-300'} transition-colors flex-shrink-0`} />
                {!isCompact && <span className="inline">{item.label}</span>}
              </button>
            );
          })}
        </div>

        {/* Right Zone: Wallet Controls + Language/Theme Toggles */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 flex-shrink-0 min-w-0">
          {/* Wallet Connection - Desktop: Full info, Mobile: Compact */}
          <div className="hidden lg:flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {publicKey ? (
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    {t('home.connected')}
                  </span>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 px-2 sm:px-3 py-1.5 rounded-lg flex-shrink-0">
                  <PublicKeyTooltip
                    publicKey={publicKey}
                    textClassName="font-mono text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-nowrap"
                  />
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setPublicKey('');
                    if (isDemoMode) {
                      exitDemoMode();
                    }
                  }}
                  className="nav-item-force whitespace-nowrap flex-shrink-0 transition-colors"
                >
                  {t('wallet.disconnect')}
                </Button>
              </div>
            ) : (
              <FreighterConnect onConnect={(address) => {
                setPublicKey(address);
                if (isDemoMode) {
                  exitDemoMode(address);
                }
              }} />
            )}
          </div>

          {/* Language Toggle */}
          <IconButton
            onClick={toggleLanguage}
            title={language === 'tr' ? 'Switch to English' : 'Türkçeye Geç'}
            size="md"
            variant="noFocus"
            className="group hidden lg:flex"
          >
            <TbLanguage size={18} className="text-slate-700 dark:text-gray-300 group-hover:text-slate-900 dark:group-hover:text-gray-200 transition-colors" />
          </IconButton>

          {/* Theme Toggle Button */}
          <IconButton
            onClick={toggleTheme}
            title={isDarkMode ? t('theme.switchToLight') : t('theme.switchToDark')}
            size="md"
            variant="noFocus"
            className="group hidden lg:flex"
          >
            {isDarkMode ? (
              <TbSun size={18} className="text-slate-700 dark:text-gray-300 group-hover:text-slate-900 dark:group-hover:text-gray-200 transition-colors" />
            ) : (
              <TbMoon size={18} className="text-slate-700 dark:text-gray-300 group-hover:text-slate-900 dark:group-hover:text-gray-200 transition-colors" />
            )}
          </IconButton>

          {/* Mobile Menu Button - Always show on mobile */}
          <IconButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            title="Menü"
            size="md"
            variant="default"
            className="lg:hidden group"
          >
            <TbMenu2 size={18} className="text-[#8b5cf6] dark:text-gray-300 group-hover:text-[#7c3aed] dark:group-hover:text-gray-200 transition-colors" />
          </IconButton>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shadow-xl">
          <div className="container mx-auto p-4 space-y-2">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{t('nav.menu') || 'Menü'}</h3>
              <IconButton
                onClick={() => setMobileMenuOpen(false)}
                title="Menüyü Kapat"
                size="sm"
                variant="default"
                className="group"
              >
                <TbX size={18} className="text-[#4a90e2] dark:text-gray-300 group-hover:text-[#3b82f6] dark:group-hover:text-gray-200 transition-colors" />
              </IconButton>
            </div>
            
            {/* Mobile Token Balance - Show in menu when available */}
            {(publicKey || isDemoMode) && claimableBalance > 0 && (
              <div className="mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 px-3 py-2 rounded-lg border border-yellow-200 dark:border-yellow-700">
                  <TbCoins size={18} className="text-yellow-600 dark:text-yellow-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {claimableBalance} CQT {t('wallet.available') || 'Available'}
                  </span>
                </div>
              </div>
            )}
            
            {/* Navigation Items - Show only when wallet connected or in demo mode */}
            {navigationItems.map(item => {
              const IconComponent = item.icon;
              // Hide all navigation links for public users (not connected)
              const canShow = (publicKey || isDemoMode);
              
              if (!canShow) return null;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    handlePageChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`nav-item-force w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer inline-flex items-center gap-2 ${
                    currentPage === item.id
                      ? 'active shadow-lg'
                      : 'bg-transparent text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <IconComponent size={18} className={currentPage === item.id ? 'text-purple-700 dark:text-white' : 'text-[#8b5cf6] dark:text-gray-300 transition-colors'} />
                  {item.label}
                </button>
              );
            })}
            
            {/* Mobile Wallet Connect - Show when not connected */}
            {!publicKey && !isDemoMode && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <FreighterConnect onConnect={(address) => {
                  setPublicKey(address);
                  if (isDemoMode) {
                    exitDemoMode(address);
                  }
                  setMobileMenuOpen(false);
                }} />
              </div>
            )}
            
            {/* Mobile Wallet Info - Show when connected */}
            {publicKey && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {t('home.connected')}
                  </span>
                </div>
                <div className="bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-lg mb-2">
                  <PublicKeyTooltip
                    publicKey={publicKey}
                    textClassName="font-mono text-sm text-slate-700 dark:text-slate-300"
                  />
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setPublicKey('');
                    if (isDemoMode) {
                      exitDemoMode();
                    }
                    setMobileMenuOpen(false);
                  }}
                  className="nav-item-force w-full transition-colors"
                >
                  {t('wallet.disconnect')}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      <ExitWarningModal
        isOpen={showExitWarning}
        onConfirm={handleConfirmExit}
        onCancel={handleCancelExit}
      />
    </header>
  );
};

export default Header;
