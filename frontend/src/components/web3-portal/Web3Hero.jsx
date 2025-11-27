import { TbRocket, TbSparkles } from 'react-icons/tb';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../ui/Button';

/**
 * Web3Hero Component
 * A visually striking top banner for the Web3 Learning Portal
 */
const Web3Hero = ({ onPageChange }) => {
  const { t } = useLanguage();
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 rounded-2xl mb-8">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-400/20 rounded-full mix-blend-overlay filter blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold border border-white/30">
            <TbSparkles className="w-4 h-4" />
            <span>{t('portal.hero.badge')}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
            {t('portal.hero.title')}
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-8 leading-relaxed font-medium">
            {t('portal.hero.subtitle')}
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg text-white/80 mb-8 max-w-2xl leading-relaxed">
            {t('portal.hero.description')}
          </p>

          {/* CTA Button */}
          <Button
            onClick={() => onPageChange && onPageChange('quests')}
            size="lg"
            className="bg-white text-indigo-600 hover:bg-indigo-100 dark:bg-white dark:text-indigo-600 dark:hover:bg-indigo-50 font-bold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
          >
            <TbRocket className="w-5 h-5 mr-2" />
            {t('portal.hero.button')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Web3Hero;

