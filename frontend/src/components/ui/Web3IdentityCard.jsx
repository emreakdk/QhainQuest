import { useRef } from 'react';
import { toPng } from 'html-to-image';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { TbDownload, TbCheck } from 'react-icons/tb';
import Button from './Button';

const Web3IdentityCard = ({ 
  publicKey, 
  totalEarned = 0, 
  completedQuests = 0,
  isDemoMode = false 
}) => {
  const { t, language } = useLanguage();
  const { isDarkMode } = useTheme();
  const cardRef = useRef(null);

  const formatAddress = (address) => {
    if (!address) return 'Demo Mode';
    if (address.length <= 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  const getRank = () => {
    if (completedQuests === 0) return language === 'tr' ? 'Yeni Başlayan' : 'Beginner';
    if (completedQuests < 3) return language === 'tr' ? 'Web3 Keşfedici' : 'Web3 Explorer';
    if (completedQuests < 10) return language === 'tr' ? 'Blockchain Uzmanı' : 'Blockchain Expert';
    return language === 'tr' ? 'Web3 Master' : 'Web3 Master';
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      // Dynamic background color based on current theme
      const captureBackgroundColor = isDarkMode ? '#0f172a' : '#ffffff'; // slate-900 (dark) or white (light)

      const dataUrl = await toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: captureBackgroundColor,
        cacheBust: true,
        style: {
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
        },
      });

      const link = document.createElement('a');
      link.download = `ChainQuest-Profile-${publicKey?.slice(0, 8) || 'demo'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  // Simple QR Code SVG Placeholder
  const QRCodePlaceholder = () => {
    const qrColor = isDarkMode ? 'white' : 'black';
    const qrBgOpacity = isDarkMode ? 0.1 : 0.05;
    return (
      <svg width="80" height="80" viewBox="0 0 80 80" className="opacity-60">
        <rect width="80" height="80" fill={qrColor} fillOpacity={qrBgOpacity} rx="4" />
        <rect x="8" y="8" width="12" height="12" fill={qrColor} />
        <rect x="60" y="8" width="12" height="12" fill={qrColor} />
        <rect x="8" y="60" width="12" height="12" fill={qrColor} />
        <rect x="20" y="20" width="4" height="4" fill={qrColor} />
        <rect x="28" y="20" width="4" height="4" fill={qrColor} />
        <rect x="36" y="20" width="4" height="4" fill={qrColor} />
        <rect x="20" y="28" width="4" height="4" fill={qrColor} />
        <rect x="36" y="28" width="4" height="4" fill={qrColor} />
        <rect x="20" y="36" width="4" height="4" fill={qrColor} />
        <rect x="28" y="36" width="4" height="4" fill={qrColor} />
        <rect x="36" y="36" width="4" height="4" fill={qrColor} />
        <rect x="48" y="20" width="4" height="4" fill={qrColor} />
        <rect x="56" y="20" width="4" height="4" fill={qrColor} />
        <rect x="48" y="28" width="4" height="4" fill={qrColor} />
        <rect x="56" y="28" width="4" height="4" fill={qrColor} />
        <rect x="20" y="48" width="4" height="4" fill={qrColor} />
        <rect x="28" y="48" width="4" height="4" fill={qrColor} />
        <rect x="36" y="48" width="4" height="4" fill={qrColor} />
        <rect x="48" y="48" width="4" height="4" fill={qrColor} />
        <rect x="56" y="48" width="4" height="4" fill={qrColor} />
        <rect x="20" y="56" width="4" height="4" fill={qrColor} />
        <rect x="36" y="56" width="4" height="4" fill={qrColor} />
        <rect x="48" y="56" width="4" height="4" fill={qrColor} />
        <rect x="56" y="56" width="4" height="4" fill={qrColor} />
      </svg>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Identity Card */}
      <div
        ref={cardRef}
        className="relative bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 rounded-2xl p-8 shadow-2xl border border-purple-200 dark:border-purple-500/20 overflow-hidden"
        style={{
          aspectRatio: '16/9',
          minHeight: '320px',
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${isDarkMode ? 'white' : 'black'} 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Main Content Row */}
          <div className="flex-1 flex items-center gap-8">
            {/* Left Side - Avatar & Rank */}
            <div className="flex-shrink-0 flex flex-col items-center">
              {/* Avatar with Glowing Ring */}
              <div className="relative mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl shadow-lg">
                  {publicKey ? '👤' : '🎮'}
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 opacity-50 blur-xl animate-pulse"></div>
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 opacity-30 blur-2xl"></div>
              </div>
              
              {/* Rank Badge */}
              <div className="bg-white/10 dark:bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-300/50 dark:border-white/20">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  {getRank()}
                </span>
              </div>
            </div>

            {/* Right Side - Info */}
            <div className="flex-1 flex flex-col justify-between h-full">
              {/* Top Section - Logo & Wallet */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-1">
                    ChainQuest
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    {language === 'tr' ? 'Web3 Öğrenme Platformu' : 'Web3 Learning Platform'}
                  </div>
                </div>
                <QRCodePlaceholder />
              </div>

              {/* Wallet Address */}
              <div className="mb-4">
                <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                  {language === 'tr' ? 'Cüzdan Adresi' : 'Wallet Address'}
                </div>
                <div className="font-mono text-sm text-slate-900 dark:text-white bg-white/50 dark:bg-white/5 rounded px-3 py-2 border border-slate-300/50 dark:border-white/10">
                  {formatAddress(publicKey)}
                </div>
              </div>

              {/* CQT Earned - Large Gold Text */}
              <div className="mb-4">
                <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  {language === 'tr' ? 'Toplam Kazanılan' : 'Total Earned'}
                </div>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400">
                  {totalEarned.toLocaleString()} CQT
                </div>
              </div>

              {/* Footer - Verified Badge & Date */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-300/50 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <TbCheck className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                    {language === 'tr' ? 'Doğrulanmış Öğrenci' : 'Verified Student'}
                  </span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {getCurrentDate()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Button - Outside the card */}
      <div className="mt-6 flex justify-center">
        <Button
          onClick={handleDownload}
          className="cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 flex items-center gap-2"
        >
          <TbDownload className="w-5 h-5" />
          {language === 'tr' ? 'Kartı İndir / Paylaş' : 'Download / Share Card'}
        </Button>
      </div>
    </div>
  );
};

export default Web3IdentityCard;

