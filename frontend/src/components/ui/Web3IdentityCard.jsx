'use client';

import { useRef, useCallback, useState } from 'react';
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
  const shareCardRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

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
    padding: '24px',
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

  // Download function using html2canvas + server-side API route
  const handleDownload = useCallback(async () => {
    if (isDownloading) return;
    
    setIsDownloading(true);
    
    try {
      // Get #share-card element
      const shareCardElement = document.getElementById('share-card');
      if (!shareCardElement) {
        throw new Error('Element #share-card not found');
      }

      console.log('[Download] Step 1: Capturing #share-card with html2canvas...');

      // Step 1: Capture element with html2canvas
      // Use onclone to remove oklch colors by removing Tailwind classes and forcing inline styles
      const canvas = await html2canvas(shareCardElement, {
        useCORS: true,
        backgroundColor: '#050012',
        scale: 2,
        foreignObjectRendering: false, // Disable foreign object rendering to avoid oklch issues
        onclone: (clonedDoc) => {
          // Find the cloned #share-card element
          const clonedElement = clonedDoc.getElementById('share-card');
          if (!clonedElement) return;

          console.log('[Download] Processing cloned element to remove oklch colors...');

          // Function to recursively remove Tailwind color classes and force inline styles
          const processElement = (el) => {
            if (!el) return;

            // Remove all Tailwind color-related classes that might compute to oklch
            if (el.className && typeof el.className === 'string') {
              const classes = el.className.split(' ').filter(cls => {
                // Remove color-related Tailwind classes (bg-*, text-*, border-*, from-*, to-*, etc.)
                return !cls.match(/^(bg-|text-|border-|from-|to-|via-|indigo-|purple-|slate-|amber-|green-|red-|blue-|yellow-|orange-|pink-|violet-)/);
              });
              el.className = classes.join(' ');
            }

            // Get the original element to preserve its computed styles (converted to hex)
            try {
              const originalId = el.id;
              const originalElement = originalId ? document.getElementById(originalId) : null;
              
              if (originalElement) {
                const computed = window.getComputedStyle(originalElement);
                const style = el.style;
                
                // Force all color properties to use hex/rgb (no oklch)
                const colorProps = ['color', 'backgroundColor', 'borderColor'];
                colorProps.forEach(prop => {
                  try {
                    let value = computed.getPropertyValue(prop);
                    if (value && value.trim() && value !== 'rgba(0, 0, 0, 0)' && !value.includes('transparent')) {
                      // If contains oklch, replace with hex
                      if (value.includes('oklch')) {
                        console.warn(`[Download] Replacing oklch in ${prop}:`, value);
                        // Use appropriate fallback based on property
                        if (prop === 'color') {
                          style.setProperty(prop, '#ffffff', 'important');
                        } else {
                          style.setProperty(prop, '#0f172a', 'important');
                        }
                      } else if (!value.includes('oklch')) {
                        // Keep non-oklch colors but ensure they're hex/rgb
                        style.setProperty(prop, value, 'important');
                      }
                    }
                  } catch (e) {
                    // Ignore errors
                  }
                });

                // Handle background-image (gradients)
                try {
                  const bgImage = computed.getPropertyValue('background-image');
                  if (bgImage && bgImage.includes('oklch')) {
                    console.warn('[Download] Replacing oklch in background-image');
                    style.setProperty('background-image', 
                      'linear-gradient(135deg, #0f172a 0%, #3b0764 50%, #0f172a 100%)', 
                      'important');
                  }
                } catch (e) {
                  // Ignore errors
                }
              }
            } catch (e) {
              // If we can't access original, element will use inline styles from component
              console.warn('[Download] Could not process element:', el.id || el.className);
            }

            // Process all children recursively
            Array.from(el.children).forEach(child => {
              processElement(child);
            });
          };

          // Process the cloned element and all its children
          processElement(clonedElement);
          
          console.log('[Download] Finished processing cloned element - all oklch colors removed');
        },
      });

      if (!canvas) {
        throw new Error('Canvas generation returned null');
      }

      console.log('[Download] Step 2: Canvas created:', canvas.width, 'x', canvas.height);

      // Step 2: Convert canvas to base64 data URL
      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      
      if (!dataUrl || dataUrl === 'data:,') {
        throw new Error('Failed to generate data URL from canvas');
      }

      console.log('[Download] Step 3: Data URL generated, length:', dataUrl.length);

      // Step 3: Prepare filename
      const filename = `ChainQuest-Kimlik-${publicKey ? publicKey.substring(0, 4) : 'User'}-${Date.now()}.jpg`;

      // Step 4: POST to API route
      console.log('[Download] Step 4: Sending image data to API route...');
      const response = await fetch('/api/download-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageData: dataUrl,
          filename: filename,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `API returned status ${response.status}`);
      }

      console.log('[Download] Step 5: API response received, triggering download...');

      // Step 5: Get blob from response and trigger download
      const blob = await response.blob();
      
      // Create object URL from blob
      const objectUrl = URL.createObjectURL(blob);
      
      // Trigger download using window.location (more reliable than a.click())
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = filename;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(objectUrl);
      }, 100);

      console.log('[Download] Download completed successfully');
      setIsDownloading(false);
    } catch (err) {
      console.error('[Download] Error:', err);
      alert(language === 'tr' 
        ? `İndirme sırasında bir hata oluştu: ${err.message || 'Bilinmeyen hata'}` 
        : `An error occurred during download: ${err.message || 'Unknown error'}`);
      setIsDownloading(false);
    }
  }, [publicKey, language, isDownloading]);


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

