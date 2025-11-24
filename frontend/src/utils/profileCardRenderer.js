/**
 * Pure Canvas-based profile card renderer
 * No DOM/CSS reading, no Tailwind, no oklch - only Canvas 2D API
 */

/**
 * Render profile card to canvas
 * @param {Object} options
 * @param {string} options.publicKey - Wallet address
 * @param {number} options.totalEarned - Total CQT earned
 * @param {number} options.completedQuests - Number of completed quests
 * @param {string} options.language - Language ('tr' or 'en')
 * @returns {HTMLCanvasElement} - Canvas element with rendered card
 */
export function renderProfileCardToCanvas(options = {}) {
  const {
    publicKey = '',
    totalEarned = 0,
    completedQuests = 0,
    language = 'en',
  } = options;

  // Card dimensions
  const width = 1293;
  const height = 768;

  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Helper functions
  const formatAddress = (address) => {
    if (!address || address === 'Demo Mode') return 'Demo Mode';
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

  // Helper function to draw background with dotted grid
  const drawBackground = (ctx, width, height) => {
    // Fill with dark background color
    ctx.fillStyle = '#050012';
    ctx.fillRect(0, 0, width, height);
    
    // Draw dotted grid pattern
    const gridSpacing = 56;
    const dotSize = 3;
    ctx.fillStyle = 'rgba(148, 163, 184, 0.35)'; // slate-400 with opacity
    
    // Iterate over grid positions
    for (let x = 0; x < width; x += gridSpacing) {
      for (let y = 0; y < height; y += gridSpacing) {
        // Draw small square dots
        ctx.fillRect(x, y, dotSize, dotSize);
      }
    }
  };

  // Helper function to draw avatar glow
  const drawAvatarGlow = (ctx, centerX, centerY, radius) => {
    // Outer glow - larger radius with blur effect
    const outerRadius = radius * 2.5;
    const outerGradient = ctx.createRadialGradient(
      centerX, centerY, radius * 0.8,
      centerX, centerY, outerRadius
    );
    outerGradient.addColorStop(0, 'rgba(129, 140, 248, 0.5)'); // indigo-400
    outerGradient.addColorStop(0.5, 'rgba(167, 139, 250, 0.3)'); // purple-400
    outerGradient.addColorStop(1, 'rgba(129, 140, 248, 0)'); // transparent
    
    ctx.fillStyle = outerGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Inner glow - smaller radius
    const innerRadius = radius * 1.8;
    const innerGradient = ctx.createRadialGradient(
      centerX, centerY, radius * 0.6,
      centerX, centerY, innerRadius
    );
    innerGradient.addColorStop(0, 'rgba(129, 140, 248, 0.3)'); // indigo-400
    innerGradient.addColorStop(1, 'rgba(129, 140, 248, 0)'); // transparent
    
    ctx.fillStyle = innerGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
    ctx.fill();
  };

  // 1. Draw background with dotted grid
  drawBackground(ctx, width, height);
  
  // Overlay gradient on top of background
  const bgGradient = ctx.createLinearGradient(0, 0, width, height);
  bgGradient.addColorStop(0, 'rgba(15, 23, 42, 0.6)');
  bgGradient.addColorStop(0.5, 'rgba(59, 7, 100, 0.6)');
  bgGradient.addColorStop(1, 'rgba(15, 23, 42, 0.6)');
  
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);

  // Card container area (with padding)
  const padding = 60;
  const cardX = padding;
  const cardY = padding;
  const cardWidth = width - (padding * 2);
  const cardHeight = height - (padding * 2);

  // Helper function for rounded rectangles
  const roundRect = (x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  // Draw card border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  roundRect(cardX, cardY, cardWidth, cardHeight, 24);
  ctx.stroke();

  // Inner padding for content
  const innerPadding = 60;
  const contentX = cardX + innerPadding;
  const contentY = cardY + innerPadding;
  const contentWidth = cardWidth - (innerPadding * 2);
  const contentHeight = cardHeight - (innerPadding * 2);

  // Left side - Avatar area
  const avatarX = contentX;
  const avatarY = contentY + (contentHeight / 2) - 100;
  const avatarSize = 144;
  const avatarCenterX = avatarX + avatarSize / 2;
  const avatarCenterY = avatarY + avatarSize / 2;

  // 2. Draw avatar glow (before avatar circle)
  drawAvatarGlow(ctx, avatarCenterX, avatarCenterY, avatarSize / 2);

  // 3. Draw avatar circle with gradient
  const avatarGradient = ctx.createLinearGradient(
    avatarX, avatarY,
    avatarX + avatarSize, avatarY + avatarSize
  );
  avatarGradient.addColorStop(0, 'rgb(99, 102, 241)');
  avatarGradient.addColorStop(0.5, 'rgb(168, 85, 247)');
  avatarGradient.addColorStop(1, 'rgb(236, 72, 153)');

  ctx.fillStyle = avatarGradient;
  ctx.beginPath();
  ctx.arc(avatarCenterX, avatarCenterY, avatarSize / 2, 0, Math.PI * 2);
  ctx.fill();

  // Avatar emoji
  ctx.font = '72px system-ui';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.fillText(publicKey ? '👤' : '🎮', avatarCenterX, avatarCenterY);

  // Rank badge below avatar
  const badgeY = avatarY + avatarSize + 24;
  const badgePadding = 12;
  ctx.font = '600 18px system-ui';
  const badgeText = rank;
  const badgeMetrics = ctx.measureText(badgeText);
  const badgeWidth = badgeMetrics.width + (badgePadding * 2);
  const badgeHeight = 24 + (badgePadding * 2);
  const badgeX = avatarCenterX - (badgeWidth / 2);

  // Badge background
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  roundRect(badgeX, badgeY, badgeWidth, badgeHeight, badgeHeight / 2);
  ctx.fill();

  // Badge border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1;
  roundRect(badgeX, badgeY, badgeWidth, badgeHeight, badgeHeight / 2);
  ctx.stroke();

  // Badge text
  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(badgeText, avatarCenterX, badgeY + badgeHeight / 2);

  // Right side - Info area
  const infoX = avatarX + avatarSize + 60;
  const infoY = contentY;
  const infoWidth = contentWidth - avatarSize - 60;

  // 4. ChainQuest title
  const titleY = infoY;
  ctx.font = 'bold 48px system-ui';
  const titleText = 'ChainQuest';
  const titleGradient = ctx.createLinearGradient(infoX, titleY, infoX + 300, titleY);
  titleGradient.addColorStop(0, 'rgb(129, 140, 248)');
  titleGradient.addColorStop(1, 'rgb(167, 139, 250)');
  
  ctx.fillStyle = titleGradient;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(titleText, infoX, titleY);

  // Subtitle
  const subtitleY = titleY + 60;
  ctx.font = '18px system-ui';
  ctx.fillStyle = 'rgb(148, 163, 184)';
  const subtitleText = language === 'tr' ? 'Web3 Öğrenme Platformu' : 'Web3 Learning Platform';
  ctx.fillText(subtitleText, infoX, subtitleY);

  // 5. Wallet address
  const walletLabelY = subtitleY + 50;
  ctx.font = '18px system-ui';
  ctx.fillStyle = 'rgb(148, 163, 184)';
  const walletLabelText = language === 'tr' ? 'Cüzdan Adresi' : 'Wallet Address';
  ctx.fillText(walletLabelText, infoX, walletLabelY);

  const walletBoxY = walletLabelY + 30;
  ctx.font = '20px monospace';
  const walletMetrics = ctx.measureText(formattedWallet);
  const walletBoxWidth = walletMetrics.width + 36;
  const walletBoxHeight = 20 + 24;

  // Wallet box background
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  roundRect(infoX, walletBoxY, walletBoxWidth, walletBoxHeight, 12);
  ctx.fill();

  // Wallet box border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;
  roundRect(infoX, walletBoxY, walletBoxWidth, walletBoxHeight, 12);
  ctx.stroke();

  // Wallet text
  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(formattedWallet, infoX + 18, walletBoxY + walletBoxHeight / 2);

  // 6. CQT Earned
  const cqtLabelY = walletBoxY + walletBoxHeight + 40;
  ctx.font = '18px system-ui';
  ctx.fillStyle = 'rgb(148, 163, 184)';
  const cqtLabelText = language === 'tr' ? 'Toplam Kazanılan' : 'Total Earned';
  ctx.fillText(cqtLabelText, infoX, cqtLabelY);

  const cqtValueY = cqtLabelY + 40;
  const cqtText = `${totalEarned.toLocaleString()} CQT`;
  ctx.font = 'bold 72px system-ui';
  const cqtGradient = ctx.createLinearGradient(infoX, cqtValueY, infoX + 400, cqtValueY);
  cqtGradient.addColorStop(0, 'rgb(251, 191, 36)');
  cqtGradient.addColorStop(0.5, 'rgb(251, 146, 60)');
  cqtGradient.addColorStop(1, 'rgb(251, 191, 36)');
  
  ctx.fillStyle = cqtGradient;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(cqtText, infoX, cqtValueY);

  // 7. Footer - Verified badge & date
  const footerY = contentY + contentHeight - 50;
  const footerLineY = footerY - 30;

  // Footer line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(infoX, footerLineY);
  ctx.lineTo(infoX + infoWidth, footerLineY);
  ctx.stroke();

  // Verified badge
  const checkSize = 36;
  const checkX = infoX;
  const checkY = footerY - checkSize / 2;

  // Check circle
  ctx.fillStyle = 'rgb(34, 197, 94)';
  ctx.beginPath();
  ctx.arc(checkX + checkSize / 2, checkY + checkSize / 2, checkSize / 2, 0, Math.PI * 2);
  ctx.fill();

  // Check mark
  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.font = '24px system-ui';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('✓', checkX + checkSize / 2, checkY + checkSize / 2);

  // Verified text
  const verifiedTextX = checkX + checkSize + 12;
  ctx.font = '500 18px system-ui';
  ctx.fillStyle = 'rgb(203, 213, 225)';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  const verifiedText = language === 'tr' ? 'Doğrulanmış Öğrenci' : 'Verified Student';
  ctx.fillText(verifiedText, verifiedTextX, footerY);

  // Date
  ctx.font = '18px system-ui';
  ctx.fillStyle = 'rgb(148, 163, 184)';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillText(date, infoX + infoWidth, footerY);

  return canvas;
}

/**
 * Download profile card as JPEG image
 * @param {Object} props
 * @param {string} props.publicKey - Wallet address
 * @param {number} props.totalEarned - Total CQT earned
 * @param {number} props.completedQuests - Number of completed quests
 * @param {string} props.language - Language ('tr' or 'en')
 */
export async function downloadProfileCardImage(props = {}) {
  try {
    // Render card to canvas
    const canvas = renderProfileCardToCanvas(props);

    // Convert to JPEG blob (no alpha channel)
    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (resultBlob) => {
          if (resultBlob) {
            resolve(resultBlob);
          } else {
            reject(new Error('Blob generation failed'));
          }
        },
        'image/jpeg',
        0.95
      );
    });

    if (!blob) {
      throw new Error('Blob generation returned null');
    }

    // Trigger download
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const filename = `ChainQuest-Kimlik-${props.publicKey ? props.publicKey.substring(0, 4) : 'User'}-${Date.now()}.jpg`;
    link.download = filename;
    link.href = objectUrl;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
    }, 100);

    console.log('[Download] Profile card downloaded successfully');
  } catch (error) {
    console.error('[Download] Error:', error);
    throw error;
  }
}

