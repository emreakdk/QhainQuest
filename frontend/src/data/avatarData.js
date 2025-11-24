/**
 * Avatar data with cool SVG illustrations
 * Exported separately to avoid circular dependencies
 */

export const AVATARS = [
  {
    id: 'default',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#6366f1"/><circle cx="50" cy="40" r="18" fill="#ffffff"/><path d="M 20 75 Q 20 60 30 55 Q 40 50 50 50 Q 60 50 70 55 Q 80 60 80 75 L 80 85 L 20 85 Z" fill="#ffffff"/></svg>',
    name: 'Default',
    nameTr: 'Varsayılan'
  },
  {
    id: 'cyberpunk',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="cyber1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#00f0ff;stop-opacity:1" /><stop offset="100%" style="stop-color:#ff00ff;stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(#cyber1)"/><rect x="30" y="25" width="40" height="30" rx="5" fill="#000000" opacity="0.7"/><circle cx="40" cy="40" r="3" fill="#00f0ff"/><circle cx="60" cy="40" r="3" fill="#00f0ff"/><path d="M 25 70 Q 25 55 35 50 Q 45 45 50 45 Q 55 45 65 50 Q 75 55 75 70 L 75 85 L 25 85 Z" fill="#000000" opacity="0.7"/><path d="M 35 50 L 50 60 L 65 50" stroke="#00f0ff" stroke-width="2" fill="none"/></svg>',
    name: 'Cyber Punk',
    nameTr: 'Siber Punk'
  },
  {
    id: 'crypto-ninja',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="ninja1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" /><stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(#ninja1)"/><circle cx="50" cy="45" r="20" fill="#1a1a1a"/><circle cx="45" cy="42" r="4" fill="#ffffff"/><circle cx="55" cy="42" r="4" fill="#ffffff"/><path d="M 50 50 Q 50 55 45 58" stroke="#ffffff" stroke-width="2" fill="none"/><path d="M 20 70 Q 20 60 30 55 Q 40 50 50 50 Q 60 50 70 55 Q 80 60 80 70 L 80 85 L 20 85 Z" fill="#1a1a1a"/><path d="M 30 55 L 50 65 L 70 55" stroke="#8b5cf6" stroke-width="2" fill="none"/></svg>',
    name: 'Crypto Ninja',
    nameTr: 'Kripto Ninja'
  },
  {
    id: 'blockchain-warrior',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="warrior1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" /><stop offset="100%" style="stop-color:#ef4444;stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(#warrior1)"/><rect x="35" y="30" width="30" height="25" rx="3" fill="#1a1a1a"/><circle cx="45" cy="42" r="3" fill="#fbbf24"/><circle cx="55" cy="42" r="3" fill="#fbbf24"/><rect x="40" y="48" width="20" height="3" fill="#1a1a1a"/><path d="M 25 70 Q 25 60 35 55 Q 45 50 50 50 Q 55 50 65 55 Q 75 60 75 70 L 75 85 L 25 85 Z" fill="#1a1a1a"/><path d="M 30 30 L 50 20 L 70 30" stroke="#fbbf24" stroke-width="2" fill="none"/></svg>',
    name: 'Blockchain Warrior',
    nameTr: 'Blockchain Savaşçısı'
  },
  {
    id: 'defi-master',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="defi1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#10b981;stop-opacity:1" /><stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(#defi1)"/><circle cx="50" cy="40" r="18" fill="#ffffff"/><circle cx="45" cy="37" r="3" fill="#10b981"/><circle cx="55" cy="37" r="3" fill="#10b981"/><path d="M 45 45 Q 50 50 55 45" stroke="#10b981" stroke-width="2" fill="none"/><path d="M 20 70 Q 20 60 30 55 Q 40 50 50 50 Q 60 50 70 55 Q 80 60 80 70 L 80 85 L 20 85 Z" fill="#ffffff"/><circle cx="50" cy="30" r="8" fill="#fbbf24" opacity="0.8"/></svg>',
    name: 'DeFi Master',
    nameTr: 'DeFi Ustası'
  },
  {
    id: 'nft-collector',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="nft1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#a855f7;stop-opacity:1" /><stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(#nft1)"/><rect x="30" y="25" width="40" height="35" rx="5" fill="#ffffff" opacity="0.9"/><circle cx="40" cy="42" r="4" fill="#a855f7"/><circle cx="60" cy="42" r="4" fill="#a855f7"/><path d="M 40 50 Q 50 55 60 50" stroke="#a855f7" stroke-width="2" fill="none"/><path d="M 25 70 Q 25 60 35 55 Q 45 50 50 50 Q 55 50 65 55 Q 75 60 75 70 L 75 85 L 25 85 Z" fill="#ffffff" opacity="0.9"/><rect x="45" y="20" width="10" height="8" rx="2" fill="#fbbf24"/></svg>',
    name: 'NFT Collector',
    nameTr: 'NFT Koleksiyoncusu'
  },
  {
    id: 'web3-explorer',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="explorer1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#06b6d4;stop-opacity:1" /><stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(#explorer1)"/><circle cx="50" cy="38" r="16" fill="#ffffff"/><circle cx="45" cy="35" r="3" fill="#06b6d4"/><circle cx="55" cy="35" r="3" fill="#06b6d4"/><path d="M 45 42 Q 50 47 55 42" stroke="#06b6d4" stroke-width="2" fill="none"/><path d="M 20 70 Q 20 60 30 55 Q 40 50 50 50 Q 60 50 70 55 Q 80 60 80 70 L 80 85 L 20 85 Z" fill="#ffffff"/><polygon points="50,20 55,30 45,30" fill="#fbbf24"/></svg>',
    name: 'Web3 Explorer',
    nameTr: 'Web3 Kaşifi'
  },
  {
    id: 'smart-contract-dev',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="dev1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" /><stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" /></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(#dev1)"/><rect x="32" y="28" width="36" height="28" rx="4" fill="#ffffff" opacity="0.9"/><rect x="36" y="32" width="8" height="6" rx="1" fill="#6366f1"/><rect x="46" y="32" width="8" height="6" rx="1" fill="#6366f1"/><rect x="56" y="32" width="8" height="6" rx="1" fill="#6366f1"/><rect x="36" y="42" width="28" height="4" rx="1" fill="#6366f1"/><rect x="36" y="48" width="20" height="4" rx="1" fill="#6366f1"/><path d="M 25 70 Q 25 60 35 55 Q 45 50 50 50 Q 55 50 65 55 Q 75 60 75 70 L 75 85 L 25 85 Z" fill="#ffffff" opacity="0.9"/></svg>',
    name: 'Smart Contract Dev',
    nameTr: 'Akıllı Sözleşme Geliştirici'
  }
];

