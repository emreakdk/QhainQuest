'use client';

import { useRef, useCallback, useState, useEffect } from 'react';
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
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Ensure we're on the client side
  useEffect(() => {
    if (typeof window === 'undefined') {
      console.warn('Web3IdentityCard: Running on server, download feature will not work');
    }
  }, []);

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
    // Client-side only check
    if (typeof window === 'undefined') {
      console.error('Download feature requires client-side execution');
      alert(language === 'tr' ? 'İndirme özelliği tarayıcıda çalışmalıdır.' : 'Download feature must run in browser.');
      return;
    }

    if (shareCardRef.current === null) {
      console.error('[Download Error] Share card wrapper element not found');
      alert(language === 'tr' ? 'Kart elementi bulunamadı.' : 'Card element not found.');
      return;
    }

    if (isDownloading) {
      console.warn('[Download] Already downloading, skipping...');
      return;
    }

    setIsDownloading(true);

    try {
      // Visual feedback
      const btn = document.getElementById('download-btn');
      const originalText = btn?.innerText || '';
      if (btn) {
        btn.innerText = language === 'tr' ? 'İndiriliyor...' : 'Downloading...';
        btn.disabled = true;
      }

      console.log('[Download] Starting card export...');

      // 1. Wait for all styles, gradients, and effects to render completely
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 2. Force reflow to ensure all styles are applied
      const offsetHeight = shareCardRef.current.offsetHeight;
      console.log('[Download] Card height:', offsetHeight);

      // 3. Check for any external images that might cause CORS issues
      const images = shareCardRef.current.querySelectorAll('img');
      const externalImages = Array.from(images).filter(img => {
        try {
          return img.src && !img.src.startsWith('data:') && !img.src.startsWith(window.location.origin);
        } catch (e) {
          return false;
        }
      });

      if (externalImages.length > 0) {
        console.warn('[Download] Found external images, may cause CORS issues:', externalImages.map(img => img.src));
      }

      // 4. Pixel-perfect capture using html2canvas with optimized settings
      console.log('[Download] Capturing canvas...');
      const canvas = await html2canvas(shareCardRef.current, {
        // High quality rendering
        scale: 2, // Reduced from 3 to avoid memory issues, still high quality
        useCORS: true, // Allow cross-origin images
        allowTaint: false, // Prevent canvas tainting (will fail if CORS issues)
        // CRITICAL: Background color fills any edge cases
        backgroundColor: '#0f172a', // Matches gradient start/end
        // Logging for debugging
        logging: process.env.NODE_ENV === 'development',
        // Window width/height for accurate sizing
        windowWidth: shareCardRef.current.scrollWidth,
        windowHeight: shareCardRef.current.scrollHeight,
        // Ensure all elements are captured
        ignoreElements: (element) => {
          // Exclude download button if somehow inside wrapper
          if (element.id === 'download-btn') return true;
          // Exclude any elements with data-ignore-export attribute
          if (element.hasAttribute?.('data-ignore-export')) return true;
          return false;
        },
        // Image loading timeout
        imageTimeout: 10000, // Reduced timeout
        // Remove control characters that might cause issues
        removeContainer: false,
        // Foreign object rendering (for better SVG support)
        foreignObjectRendering: true,
        // Better font rendering
        letterRendering: true,
        // Onclone callback to ensure styles are applied
        onclone: (clonedDoc) => {
          // Ensure all styles are preserved in cloned document
          const clonedElement = clonedDoc.getElementById('share-card');
          if (clonedElement) {
            clonedElement.style.backgroundColor = '#0f172a';
            clonedElement.style.backgroundImage = 'linear-gradient(135deg, #0f172a 0%, #3b0764 50%, #0f172a 100%)';
          }
        },
      }).catch((canvasError) => {
        console.error('[Download] html2canvas error:', canvasError);
        console.error('[Download] Error details:', {
          message: canvasError?.message,
          stack: canvasError?.stack,
          name: canvasError?.name,
        });
        throw new Error(`Canvas capture failed: ${canvasError?.message || 'Unknown error'}`);
      });

      console.log('[Download] Canvas created, dimensions:', canvas.width, 'x', canvas.height);

      // 5. Convert canvas to Blob (more reliable than data URL, especially in Firefox)
      let blob;
      try {
        blob = await new Promise((resolve, reject) => {
          canvas.toBlob(
            (resultBlob) => {
              if (resultBlob) {
                resolve(resultBlob);
              } else {
                reject(new Error('Canvas toBlob returned null'));
              }
            },
            'image/png',
            1.0 // Maximum quality
          );
        });
        console.log('[Download] Blob created, size:', blob.size, 'bytes');
      } catch (blobError) {
        console.error('[Download] toBlob error:', blobError);
        // If toBlob fails due to tainted canvas, try with allowTaint
        console.warn('[Download] Retrying with allowTaint: true...');
        const retryCanvas = await html2canvas(shareCardRef.current, {
          scale: 2,
          useCORS: false,
          allowTaint: true, // Allow tainted canvas as fallback
          backgroundColor: '#0f172a',
          logging: process.env.NODE_ENV === 'development',
          windowWidth: shareCardRef.current.scrollWidth,
          windowHeight: shareCardRef.current.scrollHeight,
        });
        
        blob = await new Promise((resolve, reject) => {
          retryCanvas.toBlob(
            (resultBlob) => {
              if (resultBlob) {
                resolve(resultBlob);
              } else {
                reject(new Error('Retry canvas toBlob returned null'));
              }
            },
            'image/png',
            1.0
          );
        });
        console.log('[Download] Retry successful, blob size:', blob.size, 'bytes');
      }

      if (!blob || blob.size === 0) {
        throw new Error('Failed to generate image blob');
      }

      // 6. Create object URL from Blob (more reliable than data URL)
      const objectUrl = URL.createObjectURL(blob);
      console.log('[Download] Object URL created:', objectUrl);

      // 7. Create download link with object URL
      const link = document.createElement('a');
      const filename = `ChainQuest-Kimlik-${publicKey ? publicKey.substring(0, 4) : 'User'}-${Date.now()}.png`;
      link.download = filename;
      link.href = objectUrl;
      link.style.display = 'none'; // Hide the link
      
      // Append to body, click, then remove
      document.body.appendChild(link);
      
      // Trigger download
      link.click();
      
      console.log('[Download] Download triggered successfully');

      // Clean up: remove link and revoke object URL after a short delay
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(objectUrl);
        console.log('[Download] Cleanup completed');
      }, 100);

      // 7. Restore button state
      if (btn) {
        btn.innerText = originalText;
        btn.disabled = false;
      }

      setIsDownloading(false);
    } catch (err) {
      // Detailed error logging
      console.error('[Download] Download failed with error:', err);
      console.error('[Download] Error name:', err?.name);
      console.error('[Download] Error message:', err?.message);
      console.error('[Download] Error stack:', err?.stack);
      
      // More specific error messages
      let errorMessage = language === 'tr' 
        ? 'İndirme sırasında bir hata oluştu.' 
        : 'An error occurred during download.';
      
      if (err?.message?.includes('tainted')) {
        errorMessage = language === 'tr'
          ? 'Görüntü güvenlik nedeniyle engellendi. Lütfen farklı bir tarayıcı deneyin.'
          : 'Image blocked due to security. Please try a different browser.';
      } else if (err?.message?.includes('CORS')) {
        errorMessage = language === 'tr'
          ? 'CORS hatası. Lütfen sayfayı yenileyin ve tekrar deneyin.'
          : 'CORS error. Please refresh the page and try again.';
      } else if (err?.message?.includes('blob') || err?.message?.includes('Blob')) {
        errorMessage = language === 'tr'
          ? 'Görüntü oluşturulamadı. Lütfen sayfayı yenileyin ve tekrar deneyin.'
          : 'Failed to create image. Please refresh the page and try again.';
      } else if (err?.message?.includes('Canvas')) {
        errorMessage = language === 'tr'
          ? 'Görüntü yakalama hatası. Lütfen sayfayı yenileyin.'
          : 'Image capture error. Please refresh the page.';
      }
      
      // Only show alert if Blob creation failed (critical error)
      if (err?.message?.includes('blob') || err?.message?.includes('Blob') || err?.message?.includes('Failed to generate')) {
        alert(`${errorMessage}\n\n${language === 'tr' ? 'Hata detayları konsola yazıldı.' : 'Error details logged to console.'}`);
      } else {
        // For other errors, just log to console
        console.warn('[Download] Non-critical error, download may have succeeded:', err?.message);
      }
      
      // Restore button on error
      const btn = document.getElementById('download-btn');
      if (btn) {
        btn.innerText = language === 'tr' ? 'Kartı İndir / Paylaş' : 'Download / Share Card';
        btn.disabled = false;
      }
      
      setIsDownloading(false);
    }
  }, [shareCardRef, publicKey, language, isDownloading]);


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

