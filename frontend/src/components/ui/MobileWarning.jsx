import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

/**
 * MobileWarning - Modern, theme-aware warning component for mobile users
 * 
 * Displays a soft, professional warning message about desktop browser requirement
 * for token claiming. Uses Tailwind dark mode classes for consistent theming.
 */
const MobileWarning = ({ className = "", variant = "dark" }) => {
  const { t } = useLanguage();

  // Entry variant (for hero/landing pages with gradient backgrounds)
  if (variant === "entry") {
    return (
      <div className={`bg-white/15 border border-white/30 text-white rounded-lg flex items-center gap-2 px-4 py-3 ${className}`}>
        <div className="flex-shrink-0 mt-0.5">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M4.93 4.93l14.14 14.14M5 13a7 7 0 0114 0" />
          </svg>
        </div>
        <div className="flex-1 space-y-1 text-sm">
          <p className="font-semibold text-white">
            {t('warnings.mobileTitle')}
          </p>
          <p className="text-xs leading-relaxed text-white/90">
            {t('warnings.mobileClaim')}
          </p>
        </div>
      </div>
    );
  }

  // Default variant - Card-like design matching reward/token cards
  return (
    <div
      className={`
        bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700
        p-4 flex items-start gap-3
        ${className}
      `}
    >
      <div className="flex-shrink-0 mt-0.5">
        <svg
          className="w-5 h-5 text-amber-600 dark:text-amber-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v4m0 4h.01M4.93 4.93l14.14 14.14M5 13a7 7 0 0114 0"
          />
        </svg>
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <p className="font-semibold text-amber-700 dark:text-amber-300 text-sm">
          {t('warnings.mobileTitle')}
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          {t('warnings.mobileClaim')}
        </p>
      </div>
    </div>
  );
};

export default MobileWarning;
