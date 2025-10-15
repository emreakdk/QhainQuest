// Gerçek Token Sistemi
import { SorobanClientService } from '../services/sorobanClient.js';

export const TOKEN_CONFIG = {
  // ChainQuest Token bilgileri
  CHAINQUEST_TOKEN: {
    contractId: 'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQAHHXCN3XH2', // Testnet contract ID
    symbol: 'CQT',
    name: 'ChainQuest Token',
    decimals: 7,
    issuer: 'GAUJ...HHXO', // Gerçek issuer address
    totalSupply: 1000000000 // 1 milyar token
  },
  
  // Token transfer fonksiyonları
  FUNCTIONS: {
    BALANCE: 'balance',
    TRANSFER: 'transfer',
    APPROVE: 'approve',
    ALLOWANCE: 'allowance',
    MINT: 'mint', // Sadece admin
    BURN: 'burn'
  }
};

class TokenManager {
  constructor(userAddress) {
    this.userAddress = userAddress;
    this.sorobanClient = new SorobanClientService();
  }

  // Kullanıcının token bakiyesini al
  async getBalance() {
    try {
      await this.sorobanClient.initialize();
      
      const contractId = TOKEN_CONFIG.CHAINQUEST_TOKEN.contractId;
      const result = await this.sorobanClient.callContractFunction(
        contractId,
        TOKEN_CONFIG.FUNCTIONS.BALANCE,
        [this.userAddress]
      );
      
      // Soroban'dan gelen sonucu parse et
      const balance = this.parseBalance(result);
      return balance;
    } catch (error) {
      console.error('Token balance alma hatası:', error);
      return 0;
    }
  }

  // Token transfer et
  async transfer(toAddress, amount) {
    try {
      await this.sorobanClient.initialize();
      
      const contractId = TOKEN_CONFIG.CHAINQUEST_TOKEN.contractId;
      
      // Transfer fonksiyonunu çağır
      const result = await this.sorobanClient.callContractFunction(
        contractId,
        TOKEN_CONFIG.FUNCTIONS.TRANSFER,
        [this.userAddress, toAddress, amount]
      );
      
      return {
        success: true,
        transactionHash: result.transactionHash,
        amount: amount,
        to: toAddress
      };
    } catch (error) {
      console.error('Token transfer hatası:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Quest tamamlama ödülü ver
  async awardQuestTokens(questId, amount) {
    try {
      await this.sorobanClient.initialize();
      
      // Quest contract'ından token mint et
      const questContractId = 'QUEST_CONTRACT_ID'; // Quest contract ID'si
      
      const result = await this.sorobanClient.callContractFunction(
        questContractId,
        'awardTokens',
        [this.userAddress, questId, amount]
      );
      
      return {
        success: true,
        transactionHash: result.transactionHash,
        amount: amount,
        questId: questId
      };
    } catch (error) {
      console.error('Quest token ödülü hatası:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Token'ları cüzdana çek
  async withdrawToWallet(amount) {
    try {
      // Kullanıcının bakiyesini kontrol et
      const balance = await this.getBalance();
      if (balance < amount) {
        throw new Error('Yetersiz bakiye');
      }

      // Token'ları kullanıcının ana cüzdanına transfer et
      const result = await this.transfer(this.userAddress, amount);
      
      if (result.success) {
        // Local storage'dan token'ları düş
        this.updateLocalBalance(-amount);
        
        return {
          success: true,
          transactionHash: result.transactionHash,
          amount: amount,
          message: 'Token\'lar cüzdanınıza aktarıldı'
        };
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Cüzdana çekme hatası:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Local storage'dan bakiye güncelle
  updateLocalBalance(amount) {
    const currentBalance = this.getLocalBalance();
    const newBalance = Math.max(0, currentBalance + amount);
    localStorage.setItem(`chainquest_balance_${this.userAddress}`, newBalance.toString());
    return newBalance;
  }

  // Local storage'dan bakiye al
  getLocalBalance() {
    const balance = localStorage.getItem(`chainquest_balance_${this.userAddress}`);
    return balance ? parseFloat(balance) : 0;
  }

  // Soroban'dan gelen balance'ı parse et
  parseBalance(sorobanResult) {
    try {
      // Soroban'dan gelen sonucu decimal'e çevir
      const rawBalance = sorobanResult.toString();
      const decimals = TOKEN_CONFIG.CHAINQUEST_TOKEN.decimals;
      return parseFloat(rawBalance) / Math.pow(10, decimals);
    } catch (error) {
      console.error('Balance parse hatası:', error);
      return 0;
    }
  }

  // Token geçmişi al
  async getTokenHistory() {
    try {
      await this.sorobanClient.initialize();
      
      // Kullanıcının token transaction geçmişini al
      const history = await this.sorobanClient.getUserTransactions(
        this.userAddress,
        TOKEN_CONFIG.CHAINQUEST_TOKEN.contractId
      );
      
      return history.map(tx => ({
        id: tx.id,
        type: tx.type, // 'earned', 'transferred', 'withdrawn'
        amount: tx.amount,
        timestamp: tx.timestamp,
        questId: tx.questId,
        transactionHash: tx.transactionHash,
        status: tx.status
      }));
    } catch (error) {
      console.error('Token geçmişi alma hatası:', error);
      return [];
    }
  }

  // Token istatistikleri
  async getTokenStats() {
    try {
      const balance = await this.getBalance();
      const history = await this.getTokenHistory();
      
      const totalEarned = history
        .filter(tx => tx.type === 'earned')
        .reduce((sum, tx) => sum + tx.amount, 0);
      
      const totalTransferred = history
        .filter(tx => tx.type === 'transferred')
        .reduce((sum, tx) => sum + tx.amount, 0);
      
      const totalWithdrawn = history
        .filter(tx => tx.type === 'withdrawn')
        .reduce((sum, tx) => sum + tx.amount, 0);
      
      return {
        currentBalance: balance,
        totalEarned,
        totalTransferred,
        totalWithdrawn,
        transactionCount: history.length,
        lastTransaction: history.length > 0 ? history[0].timestamp : null
      };
    } catch (error) {
      console.error('Token istatistikleri hatası:', error);
      return {
        currentBalance: 0,
        totalEarned: 0,
        totalTransferred: 0,
        totalWithdrawn: 0,
        transactionCount: 0,
        lastTransaction: null
      };
    }
  }
}

// Token işlemleri için hook
export const useTokenManager = (userAddress) => {
  if (!userAddress) {
    return {
      getBalance: () => Promise.resolve(0),
      transfer: () => Promise.resolve({ success: false, error: 'No user address' }),
      withdrawToWallet: () => Promise.resolve({ success: false, error: 'No user address' }),
      getTokenHistory: () => Promise.resolve([]),
      getTokenStats: () => Promise.resolve({ currentBalance: 0 })
    };
  }

  const tokenManager = new TokenManager(userAddress);
  
  return {
    getBalance: () => tokenManager.getBalance(),
    transfer: (toAddress, amount) => tokenManager.transfer(toAddress, amount),
    withdrawToWallet: (amount) => tokenManager.withdrawToWallet(amount),
    getTokenHistory: () => tokenManager.getTokenHistory(),
    getTokenStats: () => tokenManager.getTokenStats()
  };
};

// Export the class
export { TokenManager };
