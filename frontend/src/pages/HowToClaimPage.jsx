import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useContext } from 'react';
import { WalletContext } from '../context/WalletContext';

const HowToClaimPage = ({ onPageChange }) => {
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();
  const { publicKey } = useContext(WalletContext);
  const [copied, setCopied] = useState(false);

  const issuerId = 'GAUJIIULEZWQ6WRKIZ5PMLUWA4B7XFIZPH7GXN53SC6DEBVSZ3LQHHXO';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(issuerId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const steps = [
    {
      id: 1,
      title: t('howToClaim.steps.step1.title'),
      description: t('howToClaim.steps.step1.description'),
      visual: (
        <img 
          src="/images/how-to-claim/step1-stellar-lab-network-selector.png"
          alt="Stellar Laboratory Network Selector - Testnet seçimi"
          className="w-full h-auto rounded-md object-contain"
        />
      )
    },
    {
      id: 2,
      title: t('howToClaim.steps.step2.title'),
      description: t('howToClaim.steps.step2.description'),
      visual: (
        <img 
          src="/images/how-to-claim/step2-stellar-lab-transaction-builder.png"
          alt="Stellar Laboratory Transaction Builder - Build Transaction seçimi"
          className="w-full h-auto rounded-md object-contain"
        />
      )
    },
    {
      id: 3,
      title: t('howToClaim.steps.step3.title'),
      description: t('howToClaim.steps.step3.description'),
      visual: (
        <img 
          src="/images/how-to-claim/step3-source-account-input.png"
          alt="Source Account alanına Public Key girilmesi"
          className="w-full h-auto rounded-md object-contain"
        />
      )
    },
    {
      id: 4,
      title: t('howToClaim.steps.step4.title'),
      description: t('howToClaim.steps.step4.description'),
      visual: (
        <img 
          src="/images/how-to-claim/step4-fetch-sequence-button.png"
          alt="Fetch next sequence butonuna tıklama"
          className="w-full h-auto rounded-md object-contain"
        />
      )
    },
    {
      id: 5,
      title: t('howToClaim.steps.step5.title'),
      description: t('howToClaim.steps.step5.description'),
      visual: (
        <img 
          src="/images/how-to-claim/step5-operation-type-change-trust.png"
          alt="Operation Type açılır menüsünden Change Trust seçimi"
          className="w-full h-auto rounded-md object-contain"
        />
      )
    },
    {
      id: 6,
      title: t('howToClaim.steps.step6.title'),
      description: t('howToClaim.steps.step6.description'),
      visual: (
        <img 
          src="/images/how-to-claim/step6-asset-information-form.png"
          alt="Asset bilgileri formu - CQT ve Issuer ID girişi"
          className="w-full h-auto rounded-md object-contain"
        />
      )
    },
    {
      id: 7,
      title: t('howToClaim.steps.step7.title'),
      description: t('howToClaim.steps.step7.description'),
      visual: (
        <img 
          src="/images/how-to-claim/step7-sign-transaction-button.png"
          alt="Sign in Transaction Signer butonu"
          className="w-full h-auto rounded-md object-contain"
        />
      )
    },
    {
      id: 8,
      title: t('howToClaim.steps.step8.title'),
      description: t('howToClaim.steps.step8.description'),
      visual: (
        <img 
          src="/images/how-to-claim/step8-sign-with-wallet-extension.png"
          alt="Cüzdan uzantısı ile imzalama seçeneği"
          className="w-full h-auto rounded-md object-contain"
        />
      )
    },
    {
      id: 9,
      title: t('howToClaim.steps.step9.title'),
      description: t('howToClaim.steps.step9.description'),
      visual: (
        <img 
          src="/images/how-to-claim/step9-submit-transaction-success.png"
          alt="Submit Transaction butonu ve başarılı imzalama"
          className="w-full h-auto rounded-md object-contain"
        />
      )
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {t('howToClaim.title')}
          </h1>
          <p className={`text-lg md:text-xl leading-relaxed max-w-3xl mx-auto ${
            isDarkMode ? 'text-slate-300' : 'text-gray-600'
          }`}>
            {t('howToClaim.subtitle')}
          </p>
        </div>

        {/* Why This Step Section */}
        <div className={`rounded-2xl p-8 mb-12 animate-fade-in-up ${
          isDarkMode 
            ? 'bg-slate-800/50 border border-slate-700' 
            : 'bg-white/70 border border-gray-200'
        }`} style={{ animationDelay: '0.1s' }}>
          <div className="flex items-start space-x-4">
            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
            }`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {t('howToClaim.whyNeeded.title')}
              </h2>
              <p className={`text-lg leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-gray-600'
              }`}>
                {t('howToClaim.whyNeeded.description')}
              </p>
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`rounded-2xl p-4 sm:p-6 lg:p-8 animate-fade-in-up ${
                isDarkMode 
                  ? 'bg-slate-800/50 border border-slate-700' 
                  : 'bg-white/70 border border-gray-200'
              }`}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Step Number & Content */}
                <div className="flex-1">
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 ${
                      isDarkMode ? 'bg-purple-600' : 'bg-purple-500'
                    }`}>
                      {step.id}
                    </div>
                    <h3 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {step.title}
                    </h3>
                  </div>
                  <p className={`text-lg leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-gray-600'
                  }`}>
                    {step.description}
                  </p>
                  
                  {/* Special content for step 6 */}
                  {step.id === 6 && (
                    <div className={`mt-6 p-4 rounded-lg ${
                      isDarkMode ? 'bg-slate-700' : 'bg-gray-100'
                    }`}>
                      <div className="space-y-4">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-slate-300' : 'text-gray-700'
                          }`}>
                            {t('howToClaim.assetCode')}
                          </label>
                          <code className={`px-3 py-2 rounded text-lg font-mono ${
                            isDarkMode ? 'bg-slate-800 text-green-400' : 'bg-gray-200 text-green-600'
                          }`}>
                            CQT
                          </code>
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${
                            isDarkMode ? 'text-slate-300' : 'text-gray-700'
                          }`}>
                            {t('howToClaim.issuerId')}
                          </label>
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 sm:items-center">
                            <code className={`px-3 py-2 rounded text-xs sm:text-sm font-mono break-all ${
                              isDarkMode ? 'bg-slate-800 text-blue-400' : 'bg-gray-200 text-blue-600'
                            }`}>
                              {issuerId}
                            </code>
                            <button
                              onClick={copyToClipboard}
                              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                copied
                                  ? 'bg-green-600 text-white'
                                  : isDarkMode
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                              }`}
                            >
                              {copied ? t('howToClaim.copied') : t('howToClaim.copy')}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Visual */}
                <div className={`w-full lg:w-80 h-48 rounded-lg flex items-center justify-center overflow-hidden ${
                  isDarkMode ? 'bg-slate-700' : 'bg-gray-200'
                }`}>
                  {typeof step.visual === 'string' ? (
                    <div className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                        isDarkMode ? 'bg-slate-600' : 'bg-gray-300'
                      }`}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-slate-400' : 'text-gray-500'
                      }`}>
                        {step.visual}
                      </p>
                    </div>
                  ) : (
                    step.visual
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Message */}
        <div className={`rounded-2xl p-8 mt-12 animate-fade-in-up ${
          isDarkMode 
            ? 'bg-green-900/30 border border-green-700' 
            : 'bg-green-50 border border-green-200'
        }`} style={{ animationDelay: '1.1s' }}>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className={`text-2xl font-bold mb-2 ${
                isDarkMode ? 'text-green-300' : 'text-green-800'
              }`}>
                {t('howToClaim.success.title')}
              </h3>
              <p className={`text-lg ${
                isDarkMode ? 'text-green-200' : 'text-green-700'
              }`}>
                {t('howToClaim.success.description')}
              </p>
            </div>
          </div>
        </div>

        {/* User's Public Key Display */}
        {publicKey && (
          <div className={`rounded-2xl p-6 mt-8 animate-fade-in-up ${
            isDarkMode 
              ? 'bg-blue-900/30 border border-blue-700' 
              : 'bg-blue-50 border border-blue-200'
          }`} style={{ animationDelay: '1.2s' }}>
            <h4 className={`text-lg font-bold mb-2 ${
              isDarkMode ? 'text-blue-300' : 'text-blue-800'
            }`}>
              {t('howToClaim.yourPublicKey')}
            </h4>
            <code className={`px-3 py-2 rounded text-xs sm:text-sm font-mono block break-all ${
              isDarkMode ? 'bg-slate-800 text-blue-400' : 'bg-white text-blue-600'
            }`}>
              {publicKey}
            </code>
          </div>
        )}

        {/* Back Button */}
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '1.3s' }}>
          <button
            onClick={() => onPageChange && onPageChange('profile')}
            className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 ${
              isDarkMode
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
          >
            {t('howToClaim.backToApp')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowToClaimPage;
