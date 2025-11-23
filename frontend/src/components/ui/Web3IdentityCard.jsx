'use client';

import { useRef, useCallback, useState, useEffect } from 'react';
import { toCanvas, toBlob } from 'html-to-image';
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
  
  // Ensure we're on the client side and verify element exists
  useEffect(() => {
    if (typeof window === 'undefined') {
      console.warn('[Web3IdentityCard] Running on server, download feature will not work');
      return;
    }

    // Verify element exists after mount
    const checkElement = () => {
      if (shareCardRef.current) {
        console.log('[Web3IdentityCard] Element #share-card found:', {
          id: shareCardRef.current.id,
          inDOM: document.body.contains(shareCardRef.current),
          dimensions: {
            width: shareCardRef.current.offsetWidth,
            height: shareCardRef.current.offsetHeight,
          }
        });
      } else {
        console.warn('[Web3IdentityCard] Element #share-card ref is null');
        // Try to find by ID
        const byId = document.getElementById('share-card');
        if (byId) {
          console.warn('[Web3IdentityCard] Element found by ID but ref is null');
        } else {
          console.error('[Web3IdentityCard] Element #share-card not found in DOM');
        }
      }

      // Verify button exists
      const btn = document.getElementById('download-btn');
      if (btn) {
        console.log('[Web3IdentityCard] Download button found');
      } else {
        console.warn('[Web3IdentityCard] Download button not found');
      }
    };

    // Check immediately and after a short delay
    checkElement();
    const timeout = setTimeout(checkElement, 500);
    
    return () => clearTimeout(timeout);
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

  const handleDownload = useCallback(async (e) => {
    // Prevent any default behavior
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    console.log('[Download] Button clicked - handler fired');

    // Client-side only check
    if (typeof window === 'undefined') {
      console.error('[Download Error] Download feature requires client-side execution');
      alert(language === 'tr' ? 'İndirme özelliği tarayıcıda çalışmalıdır.' : 'Download feature must run in browser.');
      return;
    }

    // Verify element exists
    if (!shareCardRef.current) {
      console.error('[Download Error] shareCardRef.current is null');
      // Try to find by ID as fallback
      const fallbackElement = document.getElementById('share-card');
      if (fallbackElement) {
        console.warn('[Download] Found element by ID, but ref is null');
        alert(language === 'tr' ? 'Kart elementi bulundu ama referans eksik. Lütfen sayfayı yenileyin.' : 'Card element found but ref is missing. Please refresh the page.');
      } else {
        console.error('[Download Error] Element #share-card not found in DOM');
        alert(language === 'tr' ? 'Kart elementi bulunamadı. Lütfen sayfayı yenileyin.' : 'Card element not found. Please refresh the page.');
      }
      return;
    }

    // Verify element is in DOM
    if (!document.body.contains(shareCardRef.current)) {
      console.error('[Download Error] Element exists but is not in DOM');
      alert(language === 'tr' ? 'Kart elementi DOM\'da değil. Lütfen sayfayı yenileyin.' : 'Card element not in DOM. Please refresh the page.');
      return;
    }

    if (isDownloading) {
      console.warn('[Download] Already downloading, skipping...');
      return;
    }

    console.log('[Download] Starting download process...');
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
      await new Promise((resolve) => setTimeout(resolve, 300));

      // 2. Force reflow to ensure all styles are applied
      const offsetHeight = shareCardRef.current.offsetHeight;
      const scrollWidth = shareCardRef.current.scrollWidth;
      const scrollHeight = shareCardRef.current.scrollHeight;
      console.log('[Download] Element dimensions:', { offsetHeight, scrollWidth, scrollHeight });

      // 3. Verify element is still in DOM
      if (!document.body.contains(shareCardRef.current)) {
        throw new Error('Element removed from DOM during processing');
      }

      // 4. Check for any external images that might cause CORS issues
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

      // 5. Generate initial canvas from element
      console.log('[Download] Generating initial canvas from element...');
      let sourceCanvas;
      
      try {
        sourceCanvas = await toCanvas(shareCardRef.current, {
          cacheBust: true,
          pixelRatio: 2, // High quality
          // CRITICAL: Background color fills any edge cases
          backgroundColor: '#0f172a', // Matches gradient start/end
          // Filter to exclude download button
          filter: (node) => {
            if (node.id === 'download-btn') return false;
            if (node.hasAttribute?.('data-ignore-export')) return false;
            return true;
          },
          // Style overrides
          style: {
            opacity: '1',
            visibility: 'visible',
            transform: 'none',
          },
        });

        if (!sourceCanvas) {
          throw new Error('toCanvas returned null');
        }

        console.log('[Download] Source canvas created, dimensions:', sourceCanvas.width, 'x', sourceCanvas.height);
      } catch (canvasError) {
        console.error('[Download] toCanvas error:', canvasError);
        console.error('[Download] Error details:', {
          message: canvasError?.message,
          stack: canvasError?.stack,
          name: canvasError?.name,
        });
        throw new Error(`Canvas generation failed: ${canvasError?.message || 'Unknown error'}`);
      }

      // 6. Create a second blank canvas with solid background (no transparency)
      console.log('[Download] Creating flattened canvas with solid background...');
      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = sourceCanvas.width;
      finalCanvas.height = sourceCanvas.height;
      const finalCtx = finalCanvas.getContext('2d', { alpha: false }); // Disable alpha channel
      
      if (!finalCtx) {
        throw new Error('Failed to get 2D context from final canvas');
      }

      // Fill the entire canvas with the card's background color (no transparency)
      // Using the darkest color from the gradient to ensure it matches
      finalCtx.fillStyle = '#0f172a'; // Solid dark slate background
      finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
      
      console.log('[Download] Background filled with #0f172a');

      // 7. Draw the source canvas on top of the solid background
      finalCtx.drawImage(sourceCanvas, 0, 0);
      console.log('[Download] Source canvas drawn on top of background');

      // 8. Convert final canvas to Blob (completely opaque, no transparency)
      let blob;
      try {
        blob = await new Promise((resolve, reject) => {
          finalCanvas.toBlob(
            (resultBlob) => {
              if (resultBlob) {
                resolve(resultBlob);
              } else {
                reject(new Error('Final canvas toBlob returned null'));
              }
            },
            'image/png', // PNG format
            1.0 // Maximum quality
          );
        });

        if (!blob) {
          throw new Error('Final canvas toBlob returned null');
        }

        console.log('[Download] Final Blob created successfully, size:', blob.size, 'bytes, type:', blob.type);
      } catch (blobError) {
        console.error('[Download] Final canvas toBlob error:', blobError);
        throw new Error(`Final Blob generation failed: ${blobError?.message || 'Unknown error'}`);
      }

      if (!blob || blob.size === 0) {
        throw new Error('Generated final blob is null or empty');
      }

      // 9. Create object URL from Blob (completely opaque, no transparency)
      const objectUrl = URL.createObjectURL(blob);
      console.log('[Download] Object URL created from opaque Blob:', objectUrl);

      if (!objectUrl || objectUrl === '') {
        throw new Error('Failed to create object URL from blob');
      }

      // 7. Create download link with object URL
      const link = document.createElement('a');
      const filename = `ChainQuest-Kimlik-${publicKey ? publicKey.substring(0, 4) : 'User'}-${Date.now()}.png`;
      link.download = filename;
      link.href = objectUrl;
      link.style.display = 'none'; // Hide the link
      link.style.position = 'absolute';
      link.style.left = '-9999px';
      
      // Append to body
      document.body.appendChild(link);
      console.log('[Download] Link element created and appended to body');
      
      // Trigger download with error handling
      try {
        link.click();
        console.log('[Download] Download triggered successfully');
      } catch (clickError) {
        console.error('[Download] Link click failed:', clickError);
        // Fallback: try programmatic download
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          // IE/Edge fallback
          window.navigator.msSaveOrOpenBlob(blob, filename);
          console.log('[Download] Used IE/Edge fallback');
        } else {
          throw new Error(`Download trigger failed: ${clickError?.message || 'Unknown error'}`);
        }
      }

      // Clean up: remove link and revoke object URL after a delay
      setTimeout(() => {
        try {
          if (document.body.contains(link)) {
            document.body.removeChild(link);
          }
          URL.revokeObjectURL(objectUrl);
          console.log('[Download] Cleanup completed');
        } catch (cleanupError) {
          console.warn('[Download] Cleanup error (non-critical):', cleanupError);
        }
      }, 200);

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
      
      // Always show alert for download failures (user needs to know)
      alert(`${errorMessage}\n\n${language === 'tr' ? 'Hata detayları konsola yazıldı. Lütfen konsolu kontrol edin.' : 'Error details logged to console. Please check the console.'}`);
      
      // Additional debugging info
      console.error('[Download] Element state at error:', {
        refExists: !!shareCardRef.current,
        inDOM: shareCardRef.current ? document.body.contains(shareCardRef.current) : false,
        elementId: shareCardRef.current?.id,
      });
      
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
          onClick={(e) => {
            console.log('[Download] Button onClick handler called');
            handleDownload(e);
          }}
          onMouseDown={(e) => {
            // Additional event binding for reliability
            console.log('[Download] Button onMouseDown fired');
          }}
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

