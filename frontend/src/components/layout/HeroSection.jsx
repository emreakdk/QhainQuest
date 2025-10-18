import { useContext } from 'react';
import { WalletContext } from '../../context/WalletContext';
import { useLanguage } from '../../context/LanguageContext';
import { useBalance } from '../../context/BalanceContext';
import { isMobile } from 'react-device-detect';
import Button from '../ui/Button';
import MobileWarning from '../ui/MobileWarning';
import FreighterConnect from '../features/wallet/FreighterConnect';

const HeroSection = ({ onPageChange }) => {
  const { publicKey, setPublicKey, isDemoMode, enterDemoMode, isConnected } = useContext(WalletContext);
  const { loadBalanceForUser } = useBalance();
  const { t } = useLanguage();

  const handleDemoMode = () => {
    console.log('🎮 [DEBUG] Entering demo mode...');
    enterDemoMode();
    loadBalanceForUser('demo');
    console.log('🎮 [DEBUG] Demo mode entered, isDemoMode should be true');
  };

  const handleGoToQuests = () => {
    console.log('🎯 [DEBUG] Görevler button clicked!');
    console.log('🎯 [DEBUG] onPageChange function:', onPageChange);
    console.log('🎯 [DEBUG] Current isDemoMode:', isDemoMode);
    onPageChange('quests');
    console.log('🎯 [DEBUG] Navigation call completed');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-800 dark:via-purple-800 dark:to-slate-800">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mt-24 sm:mt-16 md:mt-24 lg:mt-28 xl:mt-32 mb-3 sm:mb-4 md:mb-6 lg:mb-8">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white animate-gradient-x">
            ChainQuest
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-base md:text-lg lg:text-xl xl:text-2xl text-slate-200 mb-2 sm:mb-3 md:mb-4 font-light leading-relaxed max-w-3xl mx-auto">
          {t('home.title')}
        </p>
        
        <p className="text-base sm:text-sm md:text-base lg:text-lg text-slate-300 mb-8 sm:mb-6 md:mb-8 lg:mb-12 max-w-4xl mx-auto leading-relaxed px-2">
          {t('home.subtitle')}
        </p>

        {/* CTA Section */}
        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          {!isConnected() ? (
            <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 max-w-sm sm:max-w-md mx-auto">
              <FreighterConnect onConnect={setPublicKey} />
              <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                <div className="h-px bg-slate-400 w-6 sm:w-8 md:w-12 lg:w-16"></div>
                <span className="text-slate-400 text-xs sm:text-sm">{t('common.or')}</span>
                <div className="h-px bg-slate-400 w-6 sm:w-8 md:w-12 lg:w-16"></div>
              </div>
              <Button
                onClick={handleDemoMode}
                variant="secondary"
                size="lg"
                className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 !text-white font-semibold px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 cursor-pointer text-sm sm:text-base mb-4 sm:mb-3 md:mb-4"
              >
                {t('home.useWithoutWallet')}
              </Button>
              {/* Mobile Warning */}
              {isMobile && (
                <MobileWarning variant="entry" className="mt-4" />
              )}
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4 max-w-sm sm:max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-2 text-green-400">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm md:text-base lg:text-lg font-medium">
                  {isDemoMode ? t('home.demoMode') : t('home.connected')}
                </span>
              </div>
              <Button 
                variant="primary" 
                size="lg"
                className="w-full animate-bounce cursor-pointer text-sm sm:text-base px-4 sm:px-6 md:px-8 py-3 sm:py-4"
                onClick={handleGoToQuests}
              >
                {t('nav.quests')}
              </Button>
            </div>
          )}
        </div>

        {/* Learn -> Earn -> Certify Animated Section */}
        <div className="mt-12 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14 w-full">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-5xl px-4 sm:px-6 mx-auto">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                {t('entrypage.process.title')}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
                {t('entrypage.process.subtitle')}
              </p>
            </div>

            {/* Process Steps - Responsive Layout */}
            <div className="flex flex-col md:flex-row items-start justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            {/* Step 1: Learn */}
            <div className="group text-center max-w-xs sm:max-w-sm md:max-w-none flex-1 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                {/* Arrow for desktop */}
                <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-8 transform -translate-y-1/2">
                  <svg className="w-6 h-6 lg:w-8 lg:h-8 text-purple-400 animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-blue-300 transition-colors duration-300">
                {t('entrypage.features.learn.title')}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                {t('entrypage.features.learn.desc')}
              </p>
            </div>

            {/* Step 2: Earn */}
            <div className="group text-center max-w-xs sm:max-w-sm md:max-w-none flex-1 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="relative mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl mx-auto flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                {/* Arrow for desktop */}
                <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-8 transform -translate-y-1/2">
                  <svg className="w-6 h-6 lg:w-8 lg:h-8 text-purple-400 animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-yellow-300 transition-colors duration-300">
                {t('entrypage.features.earn.title')}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                {t('entrypage.features.earn.desc')}
              </p>
            </div>

            {/* Step 3: Certify */}
            <div className="group text-center max-w-xs sm:max-w-sm md:max-w-none flex-1 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="relative mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl mx-auto flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-green-300 transition-colors duration-300">
                {t('entrypage.features.certify.title')}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                {t('entrypage.features.certify.desc')}
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
