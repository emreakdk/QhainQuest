import { useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
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
  const shareCardRef = useRef(null); // Dedicated wrapper for export

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

  // Dedicated wrapper style for export - explicit background that will be captured
  // This wrapper ensures the exported PNG has the exact same background as displayed
  // html2canvas will capture this wrapper's background perfectly
  const shareCardWrapperStyle = {
    // Explicit solid base color (ensures no transparency - matches gradient start/end)
    backgroundColor: '#0f172a',
    // Gradient overlay matching the card design exactly
    backgroundImage: 'linear-gradient(135deg, #0f172a 0%, #3b0764 50%, #0f172a 100%)',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    // Ensure background is always rendered (no clipping)
    backgroundClip: 'border-box',
    // Padding to include shadows and glow effects in export
    padding: '24px',
    // Display properties for proper rendering
    display: 'inline-block',
    width: '100%',
    maxWidth: '100%',
    // Ensure wrapper doesn't interfere with card styling
    boxSizing: 'border-box',
    // Force rendering context
    position: 'relative',
    isolation: 'isolate', // Creates new stacking context for better capture
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

  const handleDownload = useCallback(async () => {
    if (shareCardRef.current === null) {
      console.error('Share card wrapper not found');
      return;
    }

    try {
      // Visual feedback
      const btn = document.getElementById('download-btn');
      const originalText = btn?.innerText || '';
      if (btn) {
        btn.innerText = language === 'tr' ? 'İndiriliyor...' : 'Downloading...';
        btn.disabled = true;
      }

      // 1. Wait for all styles, gradients, and effects to render completely
      await new Promise((resolve) => setTimeout(resolve, 400));

      // 2. Force reflow to ensure all styles are applied
      shareCardRef.current.offsetHeight;

      // 3. Pixel-perfect capture using html2canvas with optimized settings
      // html2canvas handles backgrounds, gradients, and effects much better
      const canvas = await html2canvas(shareCardRef.current, {
        // High quality rendering
        scale: 3, // 3x for retina displays and crisp text
        useCORS: true, // Allow cross-origin images if any
        allowTaint: false, // Prevent canvas tainting
        // CRITICAL: Background color fills any edge cases
        backgroundColor: '#0f172a', // Matches gradient start/end
        // Logging for debugging (can be removed in production)
        logging: false,
        // Window width/height for accurate sizing
        windowWidth: shareCardRef.current.scrollWidth,
        windowHeight: shareCardRef.current.scrollHeight,
        // Ensure all elements are captured
        ignoreElements: (element) => {
          // Exclude download button if somehow inside wrapper
          return element.id === 'download-btn';
        },
        // Image loading timeout
        imageTimeout: 15000,
        // Remove control characters that might cause issues
        removeContainer: false,
        // Foreign object rendering (for better SVG support)
        foreignObjectRendering: true,
      });

      // 4. Convert canvas to PNG with maximum quality
      const dataUrl = canvas.toDataURL('image/png', 1.0);

      // 5. Create download link
      const link = document.createElement('a');
      link.download = `ChainQuest-Kimlik-${publicKey ? publicKey.substring(0, 4) : 'User'}-${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 6. Restore button state
      if (btn) {
        btn.innerText = originalText;
        btn.disabled = false;
      }
    } catch (err) {
      console.error('Download Failed:', err);
      alert(language === 'tr' ? 'İndirme sırasında bir hata oluştu. Lütfen tekrar deneyin.' : 'An error occurred during download. Please try again.');
      
      // Restore button on error
      const btn = document.getElementById('download-btn');
      if (btn) {
        btn.innerText = language === 'tr' ? 'Kartı İndir / Paylaş' : 'Download / Share Card';
        btn.disabled = false;
      }
    }
  }, [shareCardRef, publicKey, language]);


  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Dedicated Share Card Wrapper - Explicit background for pixel-perfect export */}
      <div
        ref={shareCardRef}
        id="share-card"
        style={shareCardWrapperStyle}
      >
        {/* Identity Card - Always Dark/Premium appearance */}
        <div
          id="identity-card"
          className="relative p-8"
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
      </div>

      {/* Download Button - Outside the wrapper and card */}
      <div className="mt-6 flex justify-center">
        <Button
          id="download-btn"
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

