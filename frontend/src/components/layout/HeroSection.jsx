import { useContext } from 'react';
import { WalletContext } from '../../context/WalletContext';
import { useLanguage } from '../../context/LanguageContext';
import { useBalance } from '../../context/BalanceContext';
import Button from '../ui/Button';
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

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white animate-gradient-x">
            ChainQuest
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl lg:text-3xl text-slate-200 mb-4 font-light leading-relaxed">
          {t('home.title')}
        </p>
        
        <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          {t('home.subtitle')}
        </p>

        {/* CTA Section */}
        <div className="space-y-6">
          {!isConnected() ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <FreighterConnect onConnect={setPublicKey} />
              <div className="flex items-center space-x-4">
                <div className="h-px bg-slate-400 w-16"></div>
                <span className="text-slate-400 text-sm">{t('common.or')}</span>
                <div className="h-px bg-slate-400 w-16"></div>
              </div>
              <Button
                onClick={handleDemoMode}
                variant="secondary"
                size="lg"
                className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 cursor-pointer"
              >
                {t('home.useWithoutWallet')}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-green-400">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-lg font-medium">
                  {isDemoMode ? t('home.demoMode') : t('home.connected')}
                </span>
              </div>
              <Button 
                variant="primary" 
                size="lg"
                className="animate-bounce cursor-pointer"
                onClick={handleGoToQuests}
              >
                {t('nav.quests')}
              </Button>
            </div>
          )}
        </div>

        {/* Features Preview */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{t('features.nftCertificates')}</h3>
            <p className="text-slate-300">{t('features.nftCertificatesDesc')}</p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{t('features.tokenRewards')}</h3>
            <p className="text-slate-300">{t('features.tokenRewardsDesc')}</p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{t('features.competition')}</h3>
            <p className="text-slate-300">{t('features.competitionDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
