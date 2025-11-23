import { useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { useLanguage } from '../../context/LanguageContext';
import { TbDownload, TbCheck } from 'react-icons/tb';
import Button from './Button';

const Web3IdentityCard = ({ 
  publicKey, 
  totalEarned = 0, 
  completedQuests = 0,
  isDemoMode = false 
}) => {
  const { t, language } = useLanguage();
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

  // Define styles using ONLY standard CSS and HEX/RGBA colors. No Tailwind variables.
  // Style-First Architecture: Inline styles to ensure html-to-image captures correctly
  const finalCardStyle = {
    // Hardcoded Gradient to ensure it's captured
    background: 'linear-gradient(135deg, #0f172a 0%, #3b0764 50%, #0f172a 100%)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    // Ensure background is clipped correctly
    backgroundClip: 'padding-box',
    aspectRatio: '16/9',
    minHeight: '320px',
  };

  const mutedTextStyle = {
    color: '#94a3b8', // Hex for slate-400
  };

  const goldTextStyle = {
    color: '#fbbf24', // Hex for amber-400
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

  const handleDownload = useCallback(() => {
    if (cardRef.current === null) return;

    toPng(cardRef.current, {
      cacheBust: true,
      pixelRatio: 3, // High Quality
      // FORCE the background color behind the element to be Dark Slate (filling any transparency)
      backgroundColor: '#0f172a',
      style: {
        // Ensure the captured node ignores any parent opacity
        opacity: '1',
        visibility: 'visible',
      }
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `ChainQuest-Kimlik-${publicKey ? publicKey.substring(0, 4) : 'User'}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Download Error:', err);
        alert("İndirme hatası oluştu. Lütfen tekrar deneyin.");
      });
  }, [cardRef, publicKey]);


  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Identity Card - Always Dark/Premium appearance */}
      <div
        ref={cardRef}
        className="relative rounded-2xl p-8 overflow-hidden"
        style={finalCardStyle}
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
          <div className="flex-1 flex items-center gap-8">
            {/* Left Side - Avatar & Rank */}
            <div className="flex-shrink-0 flex flex-col items-center">
              {/* Avatar with Glowing Ring */}
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-lg" style={avatarGradientStyle}>
                  {publicKey ? '👤' : '🎮'}
                </div>
                <div className="absolute inset-0 rounded-full blur-xl" style={avatarGlowStyle1}></div>
                <div className="absolute -inset-1 rounded-full blur-2xl" style={avatarGlowStyle2}></div>
              </div>
              
              {/* Rank Badge */}
              <div className="backdrop-blur-sm rounded-full px-4 py-2" style={rankBadgeStyle}>
                <span className="text-sm font-semibold">
                  {getRank()}
                </span>
              </div>
            </div>

            {/* Right Side - Info */}
            <div className="flex-1 flex flex-col justify-between h-full">
              {/* Top Section - Logo */}
              <div className="mb-4">
                <div>
                  <div className="text-2xl font-bold mb-1" style={logoGradientStyle}>
                    ChainQuest
                  </div>
                  <div className="text-xs" style={mutedTextStyle}>
                    {language === 'tr' ? 'Web3 Öğrenme Platformu' : 'Web3 Learning Platform'}
                  </div>
                </div>
              </div>

              {/* Wallet Address */}
              <div className="mb-4">
                <div className="text-xs mb-1" style={mutedTextStyle}>
                  {language === 'tr' ? 'Cüzdan Adresi' : 'Wallet Address'}
                </div>
                <div className="font-mono text-sm rounded px-3 py-2" style={inputStyle}>
                  {formatAddress(publicKey)}
                </div>
              </div>

              {/* CQT Earned - Large Gold Text */}
              <div className="mb-4">
                <div className="text-xs mb-2" style={mutedTextStyle}>
                  {language === 'tr' ? 'Toplam Kazanılan' : 'Total Earned'}
                </div>
                <div className="text-4xl font-bold" style={cqtGradientStyle}>
                  {totalEarned.toLocaleString()} CQT
                </div>
              </div>

              {/* Footer - Verified Badge & Date */}
              <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#22c55e' }}>
                    <TbCheck className="w-4 h-4" style={{ color: '#ffffff' }} />
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

