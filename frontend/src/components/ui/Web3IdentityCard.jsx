'use client';

import { useCallback, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useUser } from '../../context/UserContext';
import { TbDownload, TbCheck } from 'react-icons/tb';
import Button from './Button';
import { downloadProfileCardImage } from '../../utils/profileCardRenderer';
import { AVATARS } from '../../data/avatarData';

const Web3IdentityCard = ({ 
  publicKey, 
  totalEarned = 0, 
  completedQuests = 0,
  isDemoMode = false 
}) => {
  const { t, language } = useLanguage();
  const { selectedAvatarId, displayName } = useUser();
  const [isDownloading, setIsDownloading] = useState(false);

  // Get current avatar SVG
  const currentAvatar = AVATARS.find(avatar => avatar.id === selectedAvatarId) || AVATARS[0];

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

  // Wrapper style with explicit dark background for export
  const shareCardWrapperStyle = {
    backgroundColor: '#050012', // Explicit dark background
    backgroundImage: 'linear-gradient(135deg, #0f172a 0%, #3b0764 50%, #0f172a 100%)',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    padding: '20px',
    display: 'inline-block',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    position: 'relative',
  };

  // Card container style (inside wrapper)
  const cardContainerStyle = {
    // Card-specific styles
    backgroundColor: 'transparent', // Transparent so wrapper gradient shows through
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    // Shadow for depth (will be captured within wrapper)
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
    aspectRatio: '16/9',
    minHeight: '320px',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '100%',
  };

  const mutedTextStyle = {
    color: '#94a3b8', // Hex for slate-400
  };

  const inputStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  };

  const logoGradientStyle = {
    background: 'linear-gradient(to right, #818cf8, #a78bfa)', // indigo-400 to purple-400
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const cqtGradientStyle = {
    background: 'linear-gradient(to right, #fbbf24, #fb923c, #fbbf24)', // yellow-400 to orange-400
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const rankBadgeStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
  };

  const verifiedTextStyle = {
    color: '#cbd5e1', // slate-300
  };

  const avatarGradientStyle = {
    background: 'linear-gradient(to bottom right, #6366f1, #a855f7, #ec4899)', // indigo-500, purple-500, pink-500
  };

  const avatarGlowStyle1 = {
    background: 'linear-gradient(to bottom right, #818cf8, #a78bfa)', // indigo-400, purple-400
    opacity: 0.5,
  };

  const avatarGlowStyle2 = {
    background: 'linear-gradient(to bottom right, #818cf8, #a78bfa)', // indigo-400, purple-400
    opacity: 0.3,
  };

  // Download function using pure Canvas renderer
  const handleDownload = useCallback(async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    
    try {
      await downloadProfileCardImage({
        publicKey,
        totalEarned,
        completedQuests,
        language,
        avatarId: selectedAvatarId,
        displayName: displayName,
      });
      
      setIsDownloading(false);
    } catch (err) {
      console.error('[Download] Error:', err);
      alert(language === 'tr' 
        ? `İndirme sırasında bir hata oluştu: ${err.message || 'Bilinmeyen hata'}` 
        : `An error occurred during download: ${err.message || 'Unknown error'}`);
      setIsDownloading(false);
    }
  }, [publicKey, totalEarned, completedQuests, language, selectedAvatarId]);


  return (
    <div className="w-full max-w-2xl mx-auto px-2 sm:px-0">
      {/* Dedicated Share Card Wrapper - Explicit background for pixel-perfect export */}
      <div
        id="share-card"
        style={shareCardWrapperStyle}
      >
        {/* Identity Card - Always Dark/Premium appearance */}
        <div
          id="identity-card"
          className="relative p-6 sm:p-8 md:p-12"
          style={cardContainerStyle}
        >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Main Content Row */}
          <div className="flex-1 flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 md:gap-8">
            {/* Left Side - Avatar & Rank */}
            <div className="flex-shrink-0 flex flex-col items-center">
              {/* Avatar with Glowing Ring */}
              <div className="relative mb-3 sm:mb-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full flex items-center justify-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl shadow-lg overflow-hidden" style={avatarGradientStyle}>
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: currentAvatar.svg }}
                  />
                </div>
                <div className="absolute inset-0 rounded-full blur-xl" style={avatarGlowStyle1}></div>
                <div className="absolute -inset-1 rounded-full blur-2xl" style={avatarGlowStyle2}></div>
              </div>
              
              {/* Display Name Badge */}
              <div className="backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2" style={rankBadgeStyle}>
                <span className="text-xs sm:text-sm md:text-base font-semibold">
                  {displayName}
                </span>
              </div>
            </div>

            {/* Right Side - Info */}
            <div className="flex-1 flex flex-col justify-between h-full w-full sm:w-auto">
              {/* Top Section - Logo */}
              <div className="mb-3 sm:mb-4">
                <div>
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1" style={logoGradientStyle}>
                    ChainQuest
                  </div>
                  <div className="text-xs sm:text-sm md:text-base" style={mutedTextStyle}>
                    {language === 'tr' ? 'Web3 Öğrenme Platformu' : 'Web3 Learning Platform'}
                  </div>
                </div>
              </div>

              {/* Wallet Address */}
              <div className="mb-3 sm:mb-4">
                <div className="text-xs mb-1" style={mutedTextStyle}>
                  {language === 'tr' ? 'Cüzdan Adresi' : 'Wallet Address'}
                </div>
                <div className="font-mono text-xs sm:text-sm rounded px-2 py-1.5 sm:px-3 sm:py-2 break-all text-center overflow-wrap-anywhere" style={inputStyle}>
                  {formatAddress(publicKey)}
                </div>
              </div>

              {/* CQT Earned - Large Gold Text */}
              <div className="mb-3 sm:mb-4">
                <div className="text-xs sm:text-sm mb-1 sm:mb-2" style={mutedTextStyle}>
                  {language === 'tr' ? 'Toplam Kazanılan' : 'Total Earned'}
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold" style={cqtGradientStyle}>
                  {totalEarned.toLocaleString()} CQT
                </div>
              </div>

              {/* Footer - Verified Badge & Date */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 sm:pt-4 gap-2 sm:gap-0" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#22c55e' }}>
                    <TbCheck className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: '#ffffff' }} />
                  </div>
                  <span className="text-xs font-medium" style={verifiedTextStyle}>
                    {language === 'tr' ? 'Doğrulanmış Öğrenci' : 'Verified Student'}
                  </span>
                </div>
                <div className="text-xs" style={mutedTextStyle}>
                  {getCurrentDate()}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Download Button - Outside the wrapper and card */}
      <div className="mt-6 flex justify-center">
        <Button
          id="download-btn"
          onClick={handleDownload}
          disabled={isDownloading}
          className="cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 flex items-center gap-2"
        >
          <TbDownload className="w-5 h-5" />
          {isDownloading 
            ? (language === 'tr' ? 'İndiriliyor...' : 'Downloading...')
            : (language === 'tr' ? 'Kartı İndir / Paylaş' : 'Download / Share Card')
          }
        </Button>
      </div>

    </div>
  );
};

export default Web3IdentityCard;

