import { useLanguage } from '../../context/LanguageContext';

/**
 * GlobalLoader - Full-screen loading component with theme-consistent styling
 * 
 * Features:
 * - Matches ChainQuest dark purple gradient theme
 * - Centered logo/icon area with animated loader
 * - Localized loading message
 * - Smooth fade/scale transitions
 * - Uses Tailwind tokens (no magic numbers)
 */
const GlobalLoader = ({ isVisible }) => {
  const { t } = useLanguage();

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div 
        className={`flex flex-col items-center justify-center space-y-6 transition-all duration-500 ease-out ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Logo/Icon Area */}
        <div className="relative">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-purple-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
          
          {/* Logo container */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
            <span className="text-white font-bold text-2xl sm:text-3xl">CQ</span>
          </div>
          
          {/* Animated spinner ring */}
          <div className="absolute inset-0 border-4 border-purple-400 border-t-transparent rounded-2xl animate-spin opacity-30"></div>
        </div>

        {/* Loading message */}
        <div className="text-center space-y-2">
          <p className="text-lg sm:text-xl font-medium text-white">
            {t('common.loadingQuests')}
          </p>
          
          {/* Animated dots */}
          <div className="flex items-center justify-center space-x-1.5">
            <div 
              className="w-2 h-2 bg-purple-300 rounded-full animate-bounce" 
              style={{ animationDelay: '0s', animationDuration: '1.4s' }}
            ></div>
            <div 
              className="w-2 h-2 bg-purple-300 rounded-full animate-bounce" 
              style={{ animationDelay: '0.2s', animationDuration: '1.4s' }}
            ></div>
            <div 
              className="w-2 h-2 bg-purple-300 rounded-full animate-bounce" 
              style={{ animationDelay: '0.4s', animationDuration: '1.4s' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoader;

