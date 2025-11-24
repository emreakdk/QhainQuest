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
    backgroundColor: '#050012', // Base dark background
    backgroundImage: `
      radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(135deg, #0f172a 0%, #312e81 50%, #0f172a 100%)
    `,
    backgroundSize: '20px 20px, 100% 100%',
    backgroundRepeat: 'repeat, no-repeat',
    backgroundPosition: '0 0, center',
    display: 'inline-block',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    position: 'relative',
  };

  // Card container style (inside wrapper) - Premium deep space look
  const cardContainerStyle = {
    // Card-specific styles
    backgroundColor: 'transparent', // Transparent so wrapper gradient shows through
    color: '#ffffff', // Explicit white text
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    // Heavy deep shadow for premium look
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
    aspectRatio: '16/9', // Fixed aspect ratio - maintains shape on all screens
    minHeight: '200px', // Reduced for mobile - will scale with width
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '100%',
  };

  const mutedTextStyle = {
    color: '#94a3b8', // Hex for slate-400
  };

  const inputStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // More opaque for better visibility
    color: '#ffffff', // Explicit white
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
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
    color: '#fbbf24', // Fallback gold color
  };

  const rankBadgeStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
  };

  const verifiedTextStyle = {
    color: '#cbd5e1', // slate-300
  };

  // Avatar container with vivid gradient and soft glow
  const avatarGradientStyle = {
    background: 'linear-gradient(to bottom right, #ec4899, #a855f7, #6366f1)', // Pink to Purple to Blue
    padding: '4px', // Border effect
    boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)', // Softer glow
  };

  // Avatar inner container (the actual avatar circle)
  const avatarInnerStyle = {
    background: 'linear-gradient(to bottom right, #6366f1, #a855f7, #ec4899)', // indigo-500, purple-500, pink-500
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  };

  const avatarGlowStyle1 = {
    background: 'linear-gradient(to bottom right, #818cf8, #a78bfa)', // indigo-400, purple-400
    opacity: 0.3, // Reduced from 0.6
    boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)', // Reduced glow
  };

  const avatarGlowStyle2 = {
    background: 'linear-gradient(to bottom right, #818cf8, #a78bfa)', // indigo-400, purple-400
    opacity: 0.2, // Reduced from 0.4
    boxShadow: '0 0 30px rgba(99, 102, 241, 0.2)', // Reduced glow
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
    <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl mx-auto px-0.5 sm:px-1 md:px-2 lg:px-0">
      {/* Dedicated Share Card Wrapper - Explicit background for pixel-perfect export */}
      <div
        id="share-card"
        className="w-full p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12"
        style={shareCardWrapperStyle}
      >
        {/* Identity Card - Always Dark/Premium appearance */}
        <div
          id="identity-card"
          className="relative p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8"
          style={cardContainerStyle}
        >
        {/* Background Pattern - Enhanced grid texture */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.6,
        }}></div>

        {/* Content Container - New Layout */}
        <div className="relative z-10 h-full flex flex-col justify-center">
          {/* Main Content Row - Always horizontal, proportional scaling */}
          <div className="flex flex-row items-start gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-6">
            {/* Left Side - Avatar, Name & Wallet - Vertically Centered */}
            <div className="flex-shrink-0 flex flex-col items-start justify-center">
              {/* Avatar with Glowing Ring */}
              <div className="relative mb-1.5 sm:mb-2 md:mb-2.5 lg:mb-3">
                <div 
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full flex items-center justify-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl overflow-hidden"
                  style={avatarGradientStyle}
                >
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    style={avatarInnerStyle}
                    dangerouslySetInnerHTML={{ __html: currentAvatar.svg }}
                  />
                </div>
                <div className="absolute inset-0 rounded-full blur-xl" style={avatarGlowStyle1}></div>
                <div className="absolute -inset-1 rounded-full blur-2xl" style={avatarGlowStyle2}></div>
              </div>
              
              {/* Display Name */}
              <div className="text-left mb-1 sm:mb-1.5 md:mb-2">
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-0.5 sm:mb-1 md:mb-1.5">
                  {displayName}
                </h3>
                <div className="backdrop-blur-sm rounded-full px-1.5 py-0.5 sm:px-2 sm:py-0.5 md:px-3 md:py-1 inline-block" style={rankBadgeStyle}>
                  <span className="text-xs sm:text-xs md:text-sm font-semibold">
                    {getRank()}
                  </span>
                </div>
              </div>

              {/* Wallet Address - Below Name */}
              <div className="text-left w-full">
                <div className="text-xs mb-0.5" style={mutedTextStyle}>
                  {language === 'tr' ? 'Cüzdan Adresi' : 'Wallet Address'}
                </div>
                <div className="font-mono text-xs rounded px-1 py-0.5 sm:px-1.5 sm:py-1 md:px-2 md:py-1.5 break-all overflow-wrap-anywhere" style={inputStyle}>
                  {formatAddress(publicKey)}
                </div>
              </div>
            </div>

            {/* Right Side - ChainQuest Title, Subtitle, CQT & Footer */}
            <div className="flex-1 flex flex-col justify-center items-start w-full min-w-0">
              {/* ChainQuest Title - Proportional scaling */}
              <div className="text-left mb-1 sm:mb-1.5 md:mb-2 w-full">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-0.5 sm:mb-0.5 md:mb-1" style={logoGradientStyle}>
                  ChainQuest
                </div>
                <div className="text-xs sm:text-xs md:text-sm lg:text-base" style={mutedTextStyle}>
                  {language === 'tr' ? 'Web3 Öğrenme Platformu' : 'Web3 Learning Platform'}
                </div>
              </div>

              {/* CQT Earned - Proportional scaling */}
              <div className="text-left mb-1.5 sm:mb-2 md:mb-3 w-full">
                <div className="text-xs sm:text-xs md:text-sm mb-0.5 sm:mb-0.5 md:mb-1" style={mutedTextStyle}>
                  {language === 'tr' ? 'Toplam Kazanılan' : 'Total Earned'}
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold" style={cqtGradientStyle}>
                  {totalEarned.toLocaleString()} CQT
                </div>
              </div>

              {/* Footer - Verified Badge & Date - Left & Right */}
              <div className="flex flex-row items-center justify-between pt-1.5 sm:pt-2 md:pt-3 w-full" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="flex items-center gap-1 sm:gap-1 md:gap-1.5">
                  <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#22c55e' }}>
                    <TbCheck className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3" style={{ color: '#ffffff' }} />
                  </div>
                  <span className="text-xs sm:text-xs md:text-sm font-medium" style={verifiedTextStyle}>
                    {language === 'tr' ? 'Doğrulanmış Öğrenci' : 'Verified Student'}
                  </span>
                </div>
                <div className="text-xs sm:text-xs md:text-sm" style={mutedTextStyle}>
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

