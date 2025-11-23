'use client';

import { forwardRef } from 'react';

/**
 * ShareCardExport - Pure React component for card export
 * Uses only inline styles with hex/rgb colors (no Tailwind, no oklch)
 */
const ShareCardExport = forwardRef(({ 
  publicKey, 
  totalEarned = 0, 
  completedQuests = 0,
  language = 'en'
}, ref) => {
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

  const formattedWallet = formatAddress(publicKey);
  const rank = getRank();
  const date = getCurrentDate();

  // All styles are inline with hex/rgb colors only
  return (
    <div
      ref={ref}
      style={{
        width: '1293px',
        height: '768px',
        backgroundColor: 'rgb(5, 0, 18)',
        backgroundImage: 'linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(59, 7, 100) 50%, rgb(15, 23, 42) 100%)',
        padding: '60px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '60px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        position: 'relative',
      }}
    >
      {/* Main Card Container */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '60px',
          padding: '60px',
          backgroundColor: 'transparent',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Left Side - Avatar & Rank */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          {/* Avatar Circle */}
          <div
            style={{
              width: '144px',
              height: '144px',
              borderRadius: '50%',
              background: 'linear-gradient(to bottom right, rgb(99, 102, 241), rgb(168, 85, 247), rgb(236, 72, 153))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '72px',
            }}
          >
            {publicKey ? '👤' : '🎮'}
          </div>

          {/* Rank Badge */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '9999px',
              padding: '12px 24px',
              color: 'rgb(255, 255, 255)',
              fontSize: '18px',
              fontWeight: '600',
            }}
          >
            {rank}
          </div>
        </div>

        {/* Right Side - Info */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            flex: 1,
          }}
        >
          {/* Top Section - Logo */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, rgb(129, 140, 248), rgb(167, 139, 250))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'rgb(129, 140, 248)',
              }}
            >
              ChainQuest
            </div>
            <div
              style={{
                fontSize: '18px',
                color: 'rgb(148, 163, 184)',
                marginTop: '8px',
              }}
            >
              {language === 'tr' ? 'Web3 Öğrenme Platformu' : 'Web3 Learning Platform'}
            </div>
          </div>

          {/* Wallet Address */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                fontSize: '18px',
                color: 'rgb(148, 163, 184)',
                marginBottom: '12px',
              }}
            >
              {language === 'tr' ? 'Cüzdan Adresi' : 'Wallet Address'}
            </div>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '20px',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                color: 'rgb(255, 255, 255)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '12px 18px',
              }}
            >
              {formattedWallet}
            </div>
          </div>

          {/* CQT Earned */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                fontSize: '18px',
                color: 'rgb(148, 163, 184)',
                marginBottom: '12px',
              }}
            >
              {language === 'tr' ? 'Toplam Kazanılan' : 'Total Earned'}
            </div>
            <div
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, rgb(251, 191, 36), rgb(251, 146, 60), rgb(251, 191, 36))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'rgb(251, 191, 36)',
              }}
            >
              {totalEarned.toLocaleString()} CQT
            </div>
          </div>

          {/* Footer - Verified Badge & Date */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgb(34, 197, 94)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgb(255, 255, 255)',
                  fontSize: '24px',
                }}
              >
                ✓
              </div>
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: '500',
                  color: 'rgb(203, 213, 225)',
                }}
              >
                {language === 'tr' ? 'Doğrulanmış Öğrenci' : 'Verified Student'}
              </span>
            </div>
            <div
              style={{
                fontSize: '18px',
                color: 'rgb(148, 163, 184)',
              }}
            >
              {date}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ShareCardExport.displayName = 'ShareCardExport';

export default ShareCardExport;

