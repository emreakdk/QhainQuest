import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const MobileWarning = ({ className = "" }) => {
  const { t } = useLanguage();

  return (
    <div className={`bg-gray-700 bg-opacity-50 border border-gray-600 p-3 rounded-md text-sm text-gray-200 flex items-start space-x-2 ${className}`}>
      <div className="flex-shrink-0 mt-0.5">
        <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="font-medium text-yellow-100 mb-1">
          {t('warnings.mobileTitle')}
        </p>
        <p className="text-gray-300 text-xs leading-relaxed">
          {t('warnings.mobileClaim')}
        </p>
      </div>
    </div>
  );
};

export default MobileWarning;
