import { useContext, useState } from 'react';
import { WalletContext } from '../../context/WalletContext';
import { useToken } from '../../context/TokenContext';
import { useBalance } from '../../context/BalanceContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../ui/Button';
import FreighterConnect from '../features/wallet/FreighterConnect';

const Header = ({ currentPage, onPageChange }) => {
  const { publicKey, setPublicKey, isDemoMode, exitDemoMode } = useContext(WalletContext);
  const { tokenData } = useToken(); // Get centralized token data
  const { claimableBalance, totalEarned } = useBalance(); // Get global balances
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const { t, toggleLanguage, language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const truncateKey = (key) => `${key.slice(0, 4)}...${key.slice(-4)}`;

  const navigationItems = [
    { id: 'quests', label: t('nav.quests'), icon: '🎯' },
    { id: 'leaderboard', label: t('nav.leaderboard'), icon: '🏆' },
    { id: 'profile', label: t('nav.profile'), icon: '👤' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-lg backdrop-blur-sm">
      <nav className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CQ</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ChainQuest
          </span>
        </div>

        {/* Navigation Menu - Desktop */}
        {(publicKey || isDemoMode) && (
          <div className="hidden lg:flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
            {navigationItems.map(item => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  currentPage === item.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg transition-colors flex items-center justify-center cursor-pointer ${
              (publicKey || isDemoMode) 
                ? 'bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-slate-300'
                : 'bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-slate-300'
            }`}
            title={language === 'tr' ? 'Switch to English' : 'Türkçeye Geç'}
          >
            <span className="text-xs sm:text-sm font-medium">
              {language === 'tr' ? 'EN' : 'TR'}
            </span>
          </button>

          {/* Mobile Menu Button */}
          {(publicKey || isDemoMode) && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-slate-200 dark:border-slate-600"
              title="Menü"
            >
              <svg className="w-6 h-6 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          {/* Token Balance Display - CRITICAL FIX: Show only claimable balance */}
          {(publicKey || isDemoMode) && claimableBalance > 0 && (
            <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 px-2 sm:px-3 py-1.5 rounded-lg border border-yellow-200 dark:border-yellow-700">
              <span className="text-yellow-600 dark:text-yellow-400">💰</span>
              <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                {claimableBalance} CQT
              </span>
            </div>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg transition-colors flex items-center justify-center cursor-pointer ${
              (publicKey || isDemoMode) 
                ? 'bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-slate-300'
                : 'bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-slate-300'
            }`}
            title={isDarkMode ? t('theme.switchToLight') : t('theme.switchToDark')}
          >
            {isDarkMode ? (
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Wallet Connection */}
          <div className="hidden sm:block">
            {publicKey ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hidden md:block">
                    {t('home.connected')}
                  </span>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 px-2 sm:px-3 py-1.5 rounded-lg">
                  <span className="font-mono text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    {truncateKey(publicKey)}
                  </span>
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
                  className="hidden md:block"
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
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (publicKey || isDemoMode) && (
        <div className="lg:hidden bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shadow-xl">
          <div className="container mx-auto p-4 space-y-2">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Menü</h3>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
                title="Menüyü Kapat"
              >
                <svg className="w-5 h-5 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Navigation Items */}
            {navigationItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  currentPage === item.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
            
            {/* Mobile Wallet Info */}
            {publicKey && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {t('home.connected')}
                  </span>
                </div>
                <div className="bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-lg mb-2">
                  <span className="font-mono text-sm text-slate-700 dark:text-slate-300">
                    {truncateKey(publicKey)}
                  </span>
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
                  className="w-full"
                >
                  {t('wallet.disconnect')}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
