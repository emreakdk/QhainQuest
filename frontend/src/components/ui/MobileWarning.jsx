import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const MobileWarning = ({ className = "", variant = "dark" }) => {
  const { t } = useLanguage();

  // Dark variant (default) - for entry page
  const darkClasses = "bg-gray-700 bg-opacity-50 border border-gray-600 text-gray-200";
  const darkIconClasses = "text-yellow-400";
  const darkTitleClasses = "text-yellow-100";
  const darkTextClasses = "text-gray-300";

  // Light variant - for Quests and Profile pages
  const lightClasses = "bg-yellow-100 border border-yellow-300 text-yellow-800";
  const lightIconClasses = "text-yellow-600";
  const lightTitleClasses = "text-yellow-900";
  const lightTextClasses = "text-yellow-700";

  // Entry variant - for entry page with transparent white background
  const entryClasses = "bg-white bg-opacity-15 border border-white border-opacity-30 text-white";
  const entryIconClasses = "text-yellow-300";
  const entryTitleClasses = "text-white";
  const entryTextClasses = "text-white text-opacity-90";

  let containerClasses, iconClasses, titleClasses, textClasses;

  if (variant === "light") {
    containerClasses = lightClasses;
    iconClasses = lightIconClasses;
    titleClasses = lightTitleClasses;
    textClasses = lightTextClasses;
  } else if (variant === "entry") {
    containerClasses = entryClasses;
    iconClasses = entryIconClasses;
    titleClasses = entryTitleClasses;
    textClasses = entryTextClasses;
  } else {
    containerClasses = darkClasses;
    iconClasses = darkIconClasses;
    titleClasses = darkTitleClasses;
    textClasses = darkTextClasses;
  }

  return (
    <div className={`${containerClasses} p-3 rounded-md text-sm flex items-start space-x-2 ${className}`}>
      <div className="flex-shrink-0 mt-0.5">
        <svg className={`w-4 h-4 ${iconClasses}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <div className="flex-1">
        <p className={`font-medium ${titleClasses} mb-1`}>
          {t('warnings.mobileTitle')}
        </p>
        <p className={`${textClasses} text-xs leading-relaxed`}>
          {t('warnings.mobileClaim')}
        </p>
      </div>
    </div>
  );
};

export default MobileWarning;
