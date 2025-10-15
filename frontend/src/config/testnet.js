// Testnet Configuration for ChainQuest
// This file contains all the necessary configuration for Stellar Testnet

export const TESTNET_CONFIG = {
  // Stellar Testnet RPC URLs
  rpcUrls: {
    soroban: 'https://soroban-testnet.stellar.org',
    horizon: 'https://horizon-testnet.stellar.org',
    futurenet: 'https://soroban-rpc.futurenet.stellar.org:443'
  },
  
  // Network Passphrases
  networkPassphrases: {
    testnet: 'Test SDF Network ; September 2015',
    futurenet: 'Test SDF Future Network ; October 2022'
  },
  
  // Contract Addresses (to be updated after deployment)
  contracts: {
    chainquest: import.meta.env.VITE_CHAINQUEST_CONTRACT_ADDRESS || 'CONTRACT_ADDRESS_HERE',
    token: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS || 'TOKEN_ADDRESS_HERE',
    certificate: 'CERTIFICATE_CONTRACT_ADDRESS_HERE'
  },
  
  // Quest Configuration
  quest: {
    defaultReward: parseInt(import.meta.env.VITE_DEFAULT_QUEST_REWARD) || 100,
    maxAttempts: parseInt(import.meta.env.VITE_MAX_QUEST_ATTEMPTS) || 3,
    timeout: parseInt(import.meta.env.VITE_QUEST_TIMEOUT) || 300000, // 5 minutes
    difficultyLevels: ['beginner', 'intermediate', 'advanced']
  },
  
  // Token Configuration
  token: {
    symbol: 'CQT',
    name: 'ChainQuest Token',
    decimals: 7,
    totalSupply: 1000000000, // 1 billion tokens
    initialDistribution: 100000000 // 100 million for initial rewards
  },
  
  // Wallet Configuration
  wallet: {
    network: import.meta.env.VITE_WALLET_NETWORK || 'testnet',
    timeout: parseInt(import.meta.env.VITE_WALLET_TIMEOUT) || 30000,
    requiredAssets: ['XLM', 'CQT']
  },
  
  // UI Configuration
  ui: {
    defaultTheme: import.meta.env.VITE_DEFAULT_THEME || 'dark',
    defaultLanguage: import.meta.env.VITE_DEFAULT_LANGUAGE || 'tr',
    enableSound: import.meta.env.VITE_ENABLE_SOUND === 'true',
    enableAnimations: import.meta.env.VITE_ENABLE_ANIMATIONS === 'true',
    enableDebug: import.meta.env.VITE_ENABLE_DEBUG === 'true'
  },
  
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.chainquest.testnet',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
    retryAttempts: 3
  },
  
  // Environment
  environment: import.meta.env.VITE_APP_ENVIRONMENT || 'testnet',
  
  // Feature Flags
  features: {
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    enableNotifications: true,
    enableLeaderboard: true,
    enableCertificates: true,
    enableTokenRewards: true
  }
};

// Helper functions
export const getRpcUrl = () => {
  return TESTNET_CONFIG.rpcUrls.soroban;
};

export const getNetworkPassphrase = () => {
  return TESTNET_CONFIG.networkPassphrases.testnet;
};

export const getContractAddress = (contractType) => {
  return TESTNET_CONFIG.contracts[contractType] || null;
};

export const isTestnet = () => {
  return TESTNET_CONFIG.environment === 'testnet';
};

export const isFeatureEnabled = (feature) => {
  return TESTNET_CONFIG.features[feature] || false;
};

// Export default config
export default TESTNET_CONFIG;
