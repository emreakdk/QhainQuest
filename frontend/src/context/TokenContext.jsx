import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { questApiService } from '../services/questApi';
import { getTokenBalanceBreakdown } from '../utils/tokenBalanceCalculator';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [tokenData, setTokenData] = useState({
    totalEarned: 0,        // Total lifetime tokens earned (all quests)
    claimableBalance: 0,   // Tokens ready to claim
    claimedBalance: 0,     // Tokens already transferred to wallet
    totalBalance: 0,       // claimable + claimed
    completedQuests: 0,
    lastUpdated: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Load token data for a user
  const loadTokenData = useCallback(async (userAddress) => {
    if (!userAddress) {
      setCurrentUser(null);
      setTokenData({
        totalEarned: 0,
        claimableBalance: 0,
        claimedBalance: 0,
        totalBalance: 0,
        completedQuests: 0,
        lastUpdated: null
      });
      return;
    }

    setIsLoading(true);
    try {
      setCurrentUser(userAddress);
      
      // Get comprehensive breakdown
      const breakdown = getTokenBalanceBreakdown(userAddress);
      const claimableBalance = questApiService.getClaimableBalance(userAddress);
      
      const tokenData = {
        totalEarned: breakdown.totalBalance,           // All-time earned (including claimable)
        claimableBalance: claimableBalance,            // Ready to claim
        claimedBalance: breakdown.claimedBalance,      // Already claimed
        totalBalance: breakdown.totalBalance,          // Total current balance
        completedQuests: breakdown.questCount,
        lastUpdated: new Date().toISOString()
      };
      
      setTokenData(tokenData);
      console.log('Token data loaded:', tokenData);
      
    } catch (error) {
      console.error('Error loading token data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Add tokens to claimable balance (when quest completed)
  const addToClaimableBalance = useCallback((userAddress, amount) => {
    if (!userAddress || amount <= 0) return;
    
    try {
      questApiService.addToClaimableBalance(userAddress, amount);
      
      // Refresh data
      loadTokenData(userAddress);
      
      console.log(`Added ${amount} tokens to claimable balance`);
    } catch (error) {
      console.error('Error adding to claimable balance:', error);
    }
  }, [loadTokenData]);

  // Claim tokens (transfer to wallet)
  const claimTokens = useCallback(async (userAddress, amount) => {
    if (!userAddress || amount <= 0) return { success: false, error: 'Invalid parameters' };
    
    setIsLoading(true);
    try {
      const result = await questApiService.claimTokens(userAddress, amount);
      
      if (result.success) {
        // Reset claimable balance
        questApiService.resetClaimableBalance(userAddress);
        
        // Refresh data
        await loadTokenData(userAddress);
        
        console.log('Tokens claimed successfully:', result.data);
        return { success: true, data: result.data };
      } else {
        throw new Error(result.error || 'Claim failed');
      }
    } catch (error) {
      console.error('Error claiming tokens:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, [loadTokenData]);

  // Refresh token data
  const refreshTokenData = useCallback(() => {
    if (currentUser) {
      loadTokenData(currentUser);
    }
  }, [currentUser, loadTokenData]);

  // Context value
  const value = {
    // State
    tokenData,
    isLoading,
    currentUser,
    
    // Actions
    loadTokenData,
    addToClaimableBalance,
    claimTokens,
    refreshTokenData
  };

  return (
    <TokenContext.Provider value={value}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
