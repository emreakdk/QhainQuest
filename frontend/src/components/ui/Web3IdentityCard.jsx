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

  // Card capture style - FORCE opaque gradient background (no transparency)
  // Using standard CSS syntax for html2canvas compatibility
  const cardCaptureStyle = {
    background: 'linear-gradient(135deg, #0f172a 0%, #3b0764 50%, #0f172a 100%)', // Explicit Gradient
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    aspectRatio: '16/9',
    minHeight: '320px',
  };

  const handleDownload = useCallback(async () => {
    if (cardRef.current === null) return;
    
    try {
      // html2canvas captures the element exactly as rendered
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // Higher quality
        useCORS: true, // Handle cross-origin images (like avatars)
        backgroundColor: '#0f172a', // FORCE Dark Background (Slate-900) as a fallback
        logging: false,
        allowTaint: true,
      });
      
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `ChainQuest-Kimlik-${publicKey ? publicKey.substring(0, 6) : 'Demo'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Kimlik oluşturma hatası:', err);
    }
  }, [publicKey]);


  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Identity Card - Always Dark/Premium appearance */}
      <div
        ref={cardRef}
        className="relative rounded-2xl p-8 shadow-2xl overflow-hidden"
        style={cardCaptureStyle}
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
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl shadow-lg">
                  {publicKey ? '👤' : '🎮'}
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 opacity-50 blur-xl animate-pulse"></div>
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 opacity-30 blur-2xl"></div>
              </div>
              
              {/* Rank Badge */}
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <span className="text-sm font-semibold text-white">
                  {getRank()}
                </span>
              </div>
            </div>

            {/* Right Side - Info */}
            <div className="flex-1 flex flex-col justify-between h-full">
              {/* Top Section - Logo */}
              <div className="mb-4">
                <div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-1">
                    ChainQuest
                  </div>
                  <div className="text-xs text-slate-400">
                    {language === 'tr' ? 'Web3 Öğrenme Platformu' : 'Web3 Learning Platform'}
                  </div>
                </div>
              </div>

              {/* Wallet Address */}
              <div className="mb-4">
                <div className="text-xs text-slate-400 mb-1">
                  {language === 'tr' ? 'Cüzdan Adresi' : 'Wallet Address'}
                </div>
                <div className="font-mono text-sm text-white bg-white/5 rounded px-3 py-2 border border-white/10">
                  {formatAddress(publicKey)}
                </div>
              </div>

              {/* CQT Earned - Large Gold Text */}
              <div className="mb-4">
                <div className="text-xs text-slate-400 mb-2">
                  {language === 'tr' ? 'Toplam Kazanılan' : 'Total Earned'}
                </div>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400">
                  {totalEarned.toLocaleString()} CQT
                </div>
              </div>

              {/* Footer - Verified Badge & Date */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <TbCheck className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs text-slate-300 font-medium">
                    {language === 'tr' ? 'Doğrulanmış Öğrenci' : 'Verified Student'}
                  </span>
                </div>
                <div className="text-xs text-slate-400">
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

