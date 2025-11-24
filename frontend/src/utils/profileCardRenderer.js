/**
 * Pure Canvas-based profile card renderer
 * No DOM/CSS reading, no Tailwind, no oklch - only Canvas 2D API
 */

// Import avatar data
import { AVATARS } from '../data/avatarData';

/**
 * Helper function to load SVG as image
 */
const loadSVGAsImage = (svgString) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    
    img.onerror = (error) => {
      URL.revokeObjectURL(url);
      reject(error);
    };
    
    img.src = url;
  });
};

/**
 * Render profile card to canvas
 * @param {Object} options
 * @param {string} options.publicKey - Wallet address
 * @param {number} options.totalEarned - Total CQT earned
 * @param {number} options.completedQuests - Number of completed quests
 * @param {string} options.language - Language ('tr' or 'en')
 * @param {string} options.avatarId - Selected avatar ID
 * @param {string} options.displayName - Custom display name
 * @returns {Promise<HTMLCanvasElement>} - Canvas element with rendered card
 */
export async function renderProfileCardToCanvas(options = {}) {
  const {
    publicKey = '',
    totalEarned = 0,
    completedQuests = 0,
    language = 'en',
    avatarId = 'default',
    displayName = 'Web3 Keşfedici',
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

  // Helper function to draw background with dotted grid - Premium deep space look
  const drawBackground = (ctx, width, height) => {
    // Fill with dark background color
    ctx.fillStyle = '#050012';
    ctx.fillRect(0, 0, width, height);
    
    // Draw gradient overlay (deep slate to indigo)
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, 'rgba(15, 23, 42, 0.8)'); // Dark slate
    bgGradient.addColorStop(0.5, 'rgba(49, 46, 129, 0.8)'); // Deep indigo
    bgGradient.addColorStop(1, 'rgba(15, 23, 42, 0.8)'); // Dark slate
    
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw fine dotted grid pattern (matching screen: 20px spacing, subtle dots)
    const gridSpacing = 20;
    const dotSize = 1;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'; // Subtle white dots
    
    // Iterate over grid positions
    for (let x = 0; x < width; x += gridSpacing) {
      for (let y = 0; y < height; y += gridSpacing) {
        // Draw small circular dots
        ctx.beginPath();
        ctx.arc(x + 2, y + 2, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  // Helper function to draw avatar glow - Reduced brightness
  const drawAvatarGlow = (ctx, centerX, centerY, radius) => {
    // Outer glow - reduced intensity
    const outerRadius = radius * 2.5;
    const outerGradient = ctx.createRadialGradient(
      centerX, centerY, radius * 0.9,
      centerX, centerY, outerRadius
    );
    outerGradient.addColorStop(0, 'rgba(168, 85, 247, 0.2)'); // Reduced from 0.4
    outerGradient.addColorStop(0.3, 'rgba(99, 102, 241, 0.15)'); // Reduced from 0.3
    outerGradient.addColorStop(0.6, 'rgba(236, 72, 153, 0.1)'); // Reduced from 0.2
    outerGradient.addColorStop(1, 'rgba(168, 85, 247, 0)'); // transparent
    
    ctx.fillStyle = outerGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Middle glow - reduced intensity
    const middleRadius = radius * 2;
    const middleGradient = ctx.createRadialGradient(
      centerX, centerY, radius * 0.7,
      centerX, centerY, middleRadius
    );
    middleGradient.addColorStop(0, 'rgba(129, 140, 248, 0.3)'); // Reduced from 0.5
    middleGradient.addColorStop(0.5, 'rgba(167, 139, 250, 0.2)'); // Reduced from 0.3
    middleGradient.addColorStop(1, 'rgba(129, 140, 248, 0)'); // transparent
    
    ctx.fillStyle = middleGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, middleRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Inner glow - reduced intensity
    const innerRadius = radius * 1.4;
    const innerGradient = ctx.createRadialGradient(
      centerX, centerY, radius * 0.5,
      centerX, centerY, innerRadius
    );
    innerGradient.addColorStop(0, 'rgba(168, 85, 247, 0.3)'); // Reduced from 0.6
    innerGradient.addColorStop(1, 'rgba(168, 85, 247, 0)'); // transparent
    
    ctx.fillStyle = innerGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
    ctx.fill();
  };

  // 1. Draw background with dotted grid and gradient (already includes gradient in drawBackground)
  drawBackground(ctx, width, height);

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

  // Left side - Avatar area (moved up and further to the right)
  const avatarX = contentX + 80; // Moved 80px to the right (increased from 50)
  const avatarSize = 160; // Increased size
  const avatarCenterX = avatarX + avatarSize / 2;
  const avatarY = contentY + (contentHeight / 2) - (avatarSize / 2) - 140; // Moved up from -80 to -140
  const avatarCenterY = avatarY + avatarSize / 2;

  // 2. Draw avatar glow (before avatar circle)
  drawAvatarGlow(ctx, avatarCenterX, avatarCenterY, avatarSize / 2);

  // 3. Draw avatar circle with gradient and border effect (4px padding)
  const avatarBorderSize = 4;
  const avatarOuterRadius = (avatarSize / 2) + avatarBorderSize;
  
  // Outer border circle (glow effect)
  const avatarBorderGradient = ctx.createLinearGradient(
    avatarX - avatarBorderSize, avatarY - avatarBorderSize,
    avatarX + avatarSize + avatarBorderSize, avatarY + avatarSize + avatarBorderSize
  );
  avatarBorderGradient.addColorStop(0, 'rgb(236, 72, 153)'); // Pink
  avatarBorderGradient.addColorStop(0.5, 'rgb(168, 85, 247)'); // Purple
  avatarBorderGradient.addColorStop(1, 'rgb(99, 102, 241)'); // Indigo
  
  ctx.fillStyle = avatarBorderGradient;
  ctx.beginPath();
  ctx.arc(avatarCenterX, avatarCenterY, avatarOuterRadius, 0, Math.PI * 2);
  ctx.fill();
  
  // Inner avatar circle
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

  // 4. Draw avatar SVG
  try {
    const selectedAvatar = AVATARS.find(avatar => avatar.id === avatarId) || AVATARS[0];
    const avatarImg = await loadSVGAsImage(selectedAvatar.svg);
    
    // Save context state
    ctx.save();
    
    // Clip to circle
    ctx.beginPath();
    ctx.arc(avatarCenterX, avatarCenterY, avatarSize / 2, 0, Math.PI * 2);
    ctx.clip();
    
    // Draw the SVG image
    const padding = 8; // Small padding inside the circle
    ctx.drawImage(
      avatarImg,
      avatarX + padding,
      avatarY + padding,
      avatarSize - (padding * 2),
      avatarSize - (padding * 2)
    );
    
    // Restore context state
    ctx.restore();
  } catch (error) {
    console.warn('[ProfileCardRenderer] Failed to load avatar SVG, using fallback emoji:', error);
    // Fallback to emoji if SVG loading fails
    ctx.font = '72px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillText(publicKey ? '👤' : '🎮', avatarCenterX, avatarCenterY);
  }

  // Display name below avatar (larger, reduced spacing)
  const nameY = avatarY + avatarSize + 30; // Reduced from 35
  ctx.font = 'bold 28px system-ui';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  const nameText = displayName || 'Web3 Keşfedici';
  ctx.fillText(nameText, avatarCenterX, nameY);

  // Rank badge below name (larger, reduced spacing)
  const badgeY = nameY + 35; // Reduced from 40
  const badgePadding = 14;
  ctx.font = '600 18px system-ui';
  const badgeText = getRank();
  const badgeMetrics = ctx.measureText(badgeText);
  const badgeWidth = badgeMetrics.width + (badgePadding * 2);
  const badgeHeight = 28 + (badgePadding * 2);
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
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(badgeText, avatarCenterX, badgeY + badgeHeight / 2);

  // Wallet address below badge (left side, larger, reduced spacing)
  const walletLabelY = badgeY + badgeHeight + 30; // Reduced from 35
  ctx.font = '18px system-ui';
  ctx.fillStyle = 'rgb(148, 163, 184)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  const walletLabelText = language === 'tr' ? 'Cüzdan Adresi' : 'Wallet Address';
  ctx.fillText(walletLabelText, avatarCenterX, walletLabelY);

  const walletBoxY = walletLabelY + 25; // Reduced from 28
  ctx.font = '20px monospace';
  const walletMetrics = ctx.measureText(formattedWallet);
  const walletBoxWidth = Math.max(walletMetrics.width + 40, 220);
  const walletBoxHeight = 28 + 18;
  const walletBoxX = avatarCenterX - (walletBoxWidth / 2);

  // Wallet box background
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  roundRect(walletBoxX, walletBoxY, walletBoxWidth, walletBoxHeight, 12);
  ctx.fill();

  // Wallet box border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  roundRect(walletBoxX, walletBoxY, walletBoxWidth, walletBoxHeight, 12);
  ctx.stroke();

  // Wallet text
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(formattedWallet, avatarCenterX, walletBoxY + walletBoxHeight / 2);

  // Right side - Info area (centered)
  const infoX = avatarX + avatarSize + 60;
  const infoY = contentY;
  const infoWidth = contentWidth - avatarSize - 60;
  const infoCenterX = infoX + (infoWidth / 2);

  // 4. ChainQuest title - Large & Centered (larger)
  const titleY = infoY + 20;
  ctx.font = 'bold 72px system-ui';
  const titleText = 'ChainQuest';
  const titleGradient = ctx.createLinearGradient(infoCenterX - 250, titleY, infoCenterX + 250, titleY);
  titleGradient.addColorStop(0, 'rgb(129, 140, 248)');
  titleGradient.addColorStop(1, 'rgb(167, 139, 250)');
  
  ctx.fillStyle = titleGradient;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(titleText, infoCenterX, titleY);

  // Subtitle (larger)
  const subtitleY = titleY + 80;
  ctx.font = '22px system-ui';
  ctx.fillStyle = 'rgb(148, 163, 184)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  const subtitleText = language === 'tr' ? 'Web3 Öğrenme Platformu' : 'Web3 Learning Platform';
  ctx.fillText(subtitleText, infoCenterX, subtitleY);

  // 5. CQT Earned - Large & Centered (moved down together)
  const cqtLabelY = subtitleY + 80; // Increased spacing from subtitle
  ctx.font = '22px system-ui';
  ctx.fillStyle = 'rgb(148, 163, 184)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  const cqtLabelText = language === 'tr' ? 'Toplam Kazanılan' : 'Total Earned';
  ctx.fillText(cqtLabelText, infoCenterX, cqtLabelY);

  // Reduced spacing between label and value (closer together)
  const cqtValueY = cqtLabelY + 35;
  const cqtText = `${totalEarned.toLocaleString()} CQT`;
  ctx.font = 'bold 90px system-ui';
  const cqtGradient = ctx.createLinearGradient(infoCenterX - 280, cqtValueY, infoCenterX + 280, cqtValueY);
  cqtGradient.addColorStop(0, 'rgb(251, 191, 36)');
  cqtGradient.addColorStop(0.5, 'rgb(251, 146, 60)');
  cqtGradient.addColorStop(1, 'rgb(251, 191, 36)');
  
  ctx.fillStyle = cqtGradient;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText(cqtText, infoCenterX, cqtValueY);

  // 6. Footer - Verified badge & date (centered)
  const footerY = contentY + contentHeight - 50;
  const footerLineY = footerY - 30;

  // Footer line (moved left - not full width)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(infoX, footerLineY);
  ctx.lineTo(infoX + infoWidth - 100, footerLineY); // Moved left by 100px
  ctx.stroke();

  // Verified badge (left side)
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

  // Verified text - Explicit color
  const verifiedTextX = checkX + checkSize + 12;
  ctx.font = '500 18px system-ui';
  ctx.fillStyle = '#cbd5e1'; // slate-300
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  const verifiedText = language === 'tr' ? 'Doğrulanmış Öğrenci' : 'Verified Student';
  ctx.fillText(verifiedText, verifiedTextX, footerY);

  // Date - Right side (moved left)
  ctx.font = '18px system-ui';
  ctx.fillStyle = '#94a3b8'; // slate-400
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillText(date, infoX + infoWidth - 120, footerY); // Moved left by 100px

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
    // Render card to canvas (now async)
    const canvas = await renderProfileCardToCanvas(props);

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

