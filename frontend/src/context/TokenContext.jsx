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
    inProgressQuests: 0,   // Quest'ler in progress
    totalQuests: 0,        // Total available quests
    lastUpdated: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const loadTokenData = useCallback(async (userAddress) => {
    console.log(`[TokenContext] loadTokenData called with userAddress: ${userAddress}`);
    
    if (!userAddress) {
      setCurrentUser(null);
      setTokenData({
        totalEarned: 0,
        claimableBalance: 0,
        claimedBalance: 0,
        totalBalance: 0,
        completedQuests: 0,
        inProgressQuests: 0,
        totalQuests: 0,
        lastUpdated: null
      });
      return;
    }

    setIsLoading(true);
    try {
      setCurrentUser(userAddress);
      
      const breakdown = getTokenBalanceBreakdown(userAddress);
      const claimableBalance = questApiService.getClaimableBalance(userAddress);
      
      const { questDatabase } = await import('../data/questData');
      
      const totalQuests = questDatabase.length;
      const inProgressQuests = Math.max(0, totalQuests - breakdown.questCount);
      
      const tokenData = {
        totalEarned: breakdown.totalBalance,           // FIXED: Now correctly calculated
        claimableBalance: breakdown.claimableBalance,  // Ready to claim
        claimedBalance: breakdown.claimedBalance,      // Already claimed
        totalBalance: breakdown.totalBalance,          // Total current balance
        completedQuests: breakdown.questCount,        // FIXED: Use questCount from breakdown
        inProgressQuests: inProgressQuests,
        totalQuests: totalQuests,
        lastUpdated: new Date().toISOString()
      };
      
      console.log(`[TokenContext] ${userAddress}: breakdown.questCount:`, breakdown.questCount);
      console.log(`[TokenContext] ${userAddress}: breakdown.completedQuests:`, breakdown.completedQuests);
      console.log(`[TokenContext] ${userAddress}: tokenData.completedQuests:`, tokenData.completedQuests);
      
      if (userAddress === 'demo') {
        console.log('[TokenContext DEBUG] Demo Mode - Full breakdown:', breakdown);
        console.log('[TokenContext DEBUG] Demo Mode - Quest count from breakdown:', breakdown.questCount);
        console.log('[TokenContext DEBUG] Demo Mode - Completed quests from breakdown:', breakdown.completedQuests);
      }
      
      setTokenData(tokenData);
      console.log('Token data loaded:', tokenData);
      
    } catch (error) {
      console.error('Error loading token data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addToClaimableBalance = useCallback((userAddress, amount) => {
    if (!userAddress || amount <= 0) return;
    
    try {
      questApiService.addToClaimableBalance(userAddress, amount);
      
      loadTokenData(userAddress);
      
      console.log(`Added ${amount} tokens to claimable balance`);
    } catch (error) {
      console.error('Error adding to claimable balance:', error);
    }
  }, [loadTokenData]);

  const claimTokens = useCallback(async (userAddress, amount) => {
    if (!userAddress || amount <= 0) return { success: false, error: 'Invalid parameters' };
    
    setIsLoading(true);
    try {
      const result = await questApiService.claimTokens(userAddress, amount);
      
      if (result.success) {
        questApiService.resetClaimableBalance(userAddress);
        
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

  const refreshTokenData = useCallback(() => {
    if (currentUser) {
      loadTokenData(currentUser);
    }
  }, [currentUser, loadTokenData]);

  const value = {
    tokenData,
    isLoading,
    currentUser,
    
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
