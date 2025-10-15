// Simplified Soroban client - Mock implementation for now
// This avoids the large bundle size issue while maintaining functionality

import { TESTNET_CONFIG, getRpcUrl, getNetworkPassphrase, getContractAddress } from '../config/testnet.js';

// Soroban client konfigürasyonu - Config dosyasından al
const SOROBAN_RPC_URL = getRpcUrl();
const NETWORK_PASSPHRASE = getNetworkPassphrase();

// Contract adresleri (deploy edildikten sonra güncellenecek)
const CHAINQUEST_CONTRACT_ADDRESS = getContractAddress('chainquest');
const TOKEN_CONTRACT_ADDRESS = getContractAddress('token');

// Application configuration
const APP_ENVIRONMENT = TESTNET_CONFIG.environment;
const DEFAULT_QUEST_REWARD = TESTNET_CONFIG.quest.defaultReward;

class SorobanClientService {
  constructor() {
    this.initialized = false;
    this.config = {
      rpcUrl: SOROBAN_RPC_URL,
      networkPassphrase: NETWORK_PASSPHRASE,
      chainquestContract: CHAINQUEST_CONTRACT_ADDRESS,
      tokenContract: TOKEN_CONTRACT_ADDRESS,
      environment: APP_ENVIRONMENT,
      defaultReward: DEFAULT_QUEST_REWARD
    };
  }

  async initialize() {
    if (this.initialized) return;
    
    console.log('SorobanClient initializing with config:', {
      rpcUrl: this.config.rpcUrl,
      networkPassphrase: this.config.networkPassphrase,
      environment: this.config.environment
    });
    
    this.initialized = true;
  }

  // Configuration getter
  getConfig() {
    return this.config;
  }

  // Quest verilerini blockchain'den çek - Mock implementation
  async getQuest(questId) {
    await this.initialize();
    // Mock data döndür
    return {
      id: questId,
      name: "Mock Quest",
      description: "Mock quest description",
      lessons: [],
      reward_amount: 100,
      certificate_nft_url: "mock_url"
    };
  }

  // Tüm quest'leri çek (mock data)
  async getAllQuests() {
    await this.initialize();
    return [
      {
        id: 0,
        name: "Stellar Temelleri",
        description: "Stellar blockchain'in temel kavramlarını öğrenin ve ilk işlemlerinizi gerçekleştirin.",
        lessons: [
          {
            id: 0,
            question: "Stellar ağında işlemler hangi konsensüs algoritması ile doğrulanır?",
            correctAnswer: "Stellar Consensus Protocol (SCP)"
          },
          {
            id: 1,
            question: "Stellar'da bir işlem kaç saniyede onaylanır?",
            correctAnswer: "3-5 saniye"
          },
          {
            id: 2,
            question: "Stellar ağında kullanılan native token'ın adı nedir?",
            correctAnswer: "XLM (Lumen)"
          }
        ],
        rewardAmount: this.config.defaultReward,
        certificateNftUrl: "https://ipfs.io/ipfs/QmStellarBasics"
      },
      {
        id: 1,
        name: "Soroban Smart Contracts",
        description: "Soroban platformunda akıllı kontrat geliştirme temellerini öğrenin.",
        lessons: [
          {
            id: 0,
            question: "Soroban hangi programlama dili ile yazılır?",
            correctAnswer: "Rust"
          },
          {
            id: 1,
            question: "Soroban'da storage için hangi trait kullanılır?",
            correctAnswer: "Env"
          }
        ],
        rewardAmount: this.config.defaultReward * 2,
        certificateNftUrl: "https://ipfs.io/ipfs/QmSorobanBasics"
      },
      {
        id: 2,
        name: "DeFi Protokolleri",
        description: "Stellar ekosistemindeki DeFi protokollerini keşfedin ve kullanın.",
        lessons: [
          {
            id: 0,
            question: "Stellar'da en popüler DeFi protokolü hangisidir?",
            correctAnswer: "StellarX"
          }
        ],
        rewardAmount: Math.floor(this.config.defaultReward * 1.5),
        certificateNftUrl: "https://ipfs.io/ipfs/QmDeFiBasics"
      }
    ];
  }

  // Kullanıcının quest'teki ilerlemesini çek - Mock implementation
  async getUserProgress(userAddress, questId) {
    await this.initialize();
    // Mock: Her kullanıcı için rastgele ilerleme
    const progress = Math.floor(Math.random() * 3); // 0-2 arası
    return progress;
  }

  // Kullanıcının sertifikası olup olmadığını kontrol et - Mock implementation
  async hasCertificate(userAddress, questId) {
    await this.initialize();
    // Mock: %30 ihtimalle sertifika var
    return Math.random() < 0.3;
  }

  // Kullanıcı cevabını gönder - Mock implementation
  async submitAnswer(userAddress, questId, lessonId, answer) {
    await this.initialize();
    console.log('Mock: Cevap gönderiliyor:', { userAddress, questId, lessonId, answer });
    
    // Mock: Başarılı response döndür
    return { success: true, message: 'Cevap başarıyla gönderildi (Mock)' };
  }

  // Kullanıcının token bakiyesini çek - Mock implementation
  async getUserTokenBalance(userAddress) {
    await this.initialize();
    // Mock: Rastgele token bakiye
    return Math.floor(Math.random() * 1000) + 100;
  }

  // Quest verilerini parse et
  parseQuestData(data) {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      lessons: data.lessons.map((lesson, index) => ({
        id: index,
        question: lesson.question,
        correctAnswer: lesson.correctAnswer
      })),
      rewardAmount: data.reward_amount || data.rewardAmount || this.config.defaultReward,
      certificateNftUrl: data.certificate_nft_url || data.certificateNftUrl
    };
  }

  // Contract function çağır - Mock implementation
  async callContractFunction(contractAddress, functionName, args = []) {
    await this.initialize();
    console.log('Mock: Contract function çağrılıyor:', { contractAddress, functionName, args });
    
    // Mock: Başarılı response döndür
    return { 
      success: true, 
      result: 'Mock result',
      transactionHash: `mock_tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  // Token transfer - Mock implementation
  async transferTokens(fromAddress, toAddress, amount) {
    await this.initialize();
    console.log('Mock: Token transfer:', { fromAddress, toAddress, amount });
    
    // Mock: Başarılı transfer
    return { success: true, transactionHash: 'mock_tx_hash' };
  }

  // Token balance al - Mock implementation
  async getTokenBalance(userAddress, tokenContract) {
    await this.initialize();
    console.log('Mock: Token balance alınıyor:', { userAddress, tokenContract });
    
    // Mock: Rastgele balance döndür
    return Math.floor(Math.random() * 1000) + 100;
  }

  // Kullanıcı işlemlerini al - Mock implementation
  async getUserTransactions(userAddress, limit = 10) {
    await this.initialize();
    console.log('Mock: Kullanıcı işlemleri alınıyor:', { userAddress, limit });
    
    // Mock: Rastgele işlemler döndür
    const mockTransactions = [];
    for (let i = 0; i < limit; i++) {
      mockTransactions.push({
        id: `tx_${i}`,
        type: Math.random() > 0.5 ? 'reward' : 'transfer',
        amount: Math.floor(Math.random() * 100) + 10,
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        questId: Math.floor(Math.random() * 3),
        questName: `Quest ${Math.floor(Math.random() * 3) + 1}`,
        status: 'completed'
      });
    }
    
    return mockTransactions;
  }

  // Token istatistiklerini al - Mock implementation
  async getTokenStats(userAddress) {
    await this.initialize();
    console.log('Mock: Token istatistikleri alınıyor:', { userAddress });
    
    return {
      totalEarned: Math.floor(Math.random() * 1000) + 500,
      totalSpent: Math.floor(Math.random() * 200) + 50,
      currentBalance: Math.floor(Math.random() * 800) + 300,
      transactionCount: Math.floor(Math.random() * 50) + 10
    };
  }
}

// Export the class
export { SorobanClientService };

// Singleton instance
export const sorobanClient = new SorobanClientService();
export default sorobanClient;