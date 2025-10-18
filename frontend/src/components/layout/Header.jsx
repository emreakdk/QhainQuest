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
        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className={`w-10 h-10 rounded-lg transition-colors flex items-center justify-center cursor-pointer ${
              (publicKey || isDemoMode) 
                ? 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-slate-300'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-slate-300'
            }`}
            title={language === 'tr' ? 'Switch to English' : 'Türkçeye Geç'}
          >
            {language === 'tr' ? 'EN' : 'TR'}
          </button>

          {/* Mobile Menu Button */}
          {publicKey && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          {/* Token Balance Display - CRITICAL FIX: Show only claimable balance */}
          {(publicKey || isDemoMode) && claimableBalance > 0 && (
            <div className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 px-3 py-1.5 rounded-lg border border-yellow-200 dark:border-yellow-700">
              <span className="text-yellow-600 dark:text-yellow-400">💰</span>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {claimableBalance} CQT
              </span>
            </div>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`w-10 h-10 rounded-lg transition-colors flex items-center justify-center cursor-pointer ${
              (publicKey || isDemoMode) 
                ? 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-slate-300'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-slate-300'
            }`}
            title={isDarkMode ? t('theme.switchToLight') : t('theme.switchToDark')}
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Wallet Connection */}
          <div>
            {publicKey ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden sm:block">
                    {t('home.connected')}
                  </span>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
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
                  }}
                  className="hidden sm:block"
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
        <div className="lg:hidden bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
          <div className="container mx-auto p-4 space-y-2">
            {navigationItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  currentPage === item.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
