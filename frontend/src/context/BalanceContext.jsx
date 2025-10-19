import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  const [claimableBalance, setClaimableBalance] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    setClaimableBalance(0);
    setTotalEarned(0);
    setCurrentUser(null);
    setLastUpdated(null);
  }, []);

  const loadBalanceForUser = useCallback((userAddress) => {
    if (!userAddress) {
      setCurrentUser(null);
      setClaimableBalance(0);
      setTotalEarned(0);
      setLastUpdated(null);
      return;
    }

    if (userAddress === 'demo') {
      setCurrentUser('demo');
      
      const claimableKey = 'claimableBalance_demo';
      const totalEarnedKey = 'totalEarned_demo';
      
      const storedClaimableBalance = localStorage.getItem(claimableKey);
      const storedTotalEarned = localStorage.getItem(totalEarnedKey);
      
      const claimableBalance = storedClaimableBalance ? parseFloat(storedClaimableBalance) : 0;
      const totalEarned = storedTotalEarned ? parseFloat(storedTotalEarned) : 0;
      
      setClaimableBalance(claimableBalance);
      setTotalEarned(totalEarned);
      setLastUpdated(new Date().toISOString());
      
      console.log(`[BalanceContext] Loaded demo balances: claimable=${claimableBalance}, totalEarned=${totalEarned}`);
      return;
    }

    try {
      setCurrentUser(userAddress);
      
      const claimableKey = `claimableBalance_${userAddress}`;
      const storedClaimableBalance = localStorage.getItem(claimableKey);
      const claimableBalance = storedClaimableBalance ? parseFloat(storedClaimableBalance) : 0;
      
      const totalEarnedKey = `totalEarned_${userAddress}`;
      const storedTotalEarned = localStorage.getItem(totalEarnedKey);
      const totalEarned = storedTotalEarned ? parseFloat(storedTotalEarned) : 0;
      
      setClaimableBalance(claimableBalance);
      setTotalEarned(totalEarned);
      setLastUpdated(new Date().toISOString());
      
      console.log(`[BalanceContext] Loaded balances for ${userAddress}: claimable=${claimableBalance}, totalEarned=${totalEarned}`);
    } catch (error) {
      console.error('[BalanceContext] Error loading balances:', error);
      setClaimableBalance(0);
      setTotalEarned(0);
    }
  }, []);

  const addToClaimableBalance = useCallback((userAddress, amount) => {
    if (!userAddress || amount <= 0) {
      console.warn('[BalanceContext] Invalid parameters for addToClaimableBalance');
      return;
    }

    try {
      const claimableKey = userAddress === 'demo' ? 'claimableBalance_demo' : `claimableBalance_${userAddress}`;
      const totalEarnedKey = userAddress === 'demo' ? 'totalEarned_demo' : `totalEarned_${userAddress}`;
      
      const currentClaimableBalance = claimableBalance;
      const currentTotalEarned = totalEarned;
      
      const newClaimableBalance = currentClaimableBalance + amount;
      const newTotalEarned = currentTotalEarned + amount;
      
      setClaimableBalance(newClaimableBalance);
      setTotalEarned(newTotalEarned);
      setLastUpdated(new Date().toISOString());
      
      localStorage.setItem(claimableKey, newClaimableBalance.toString());
      localStorage.setItem(totalEarnedKey, newTotalEarned.toString());
      
      console.log(`[BalanceContext] Added ${amount} to balances. New claimable: ${newClaimableBalance}, new totalEarned: ${newTotalEarned}`);
    } catch (error) {
      console.error('[BalanceContext] Error adding to balances:', error);
    }
  }, [claimableBalance, totalEarned]);

  const resetClaimableBalance = useCallback((userAddress) => {
    if (!userAddress) {
      console.warn('[BalanceContext] No user address provided for reset');
      return;
    }

    try {
      const claimableKey = `claimableBalance_${userAddress}`;
      
      setClaimableBalance(0);
      setLastUpdated(new Date().toISOString());
      
      localStorage.setItem(claimableKey, '0');
      
      console.log(`[BalanceContext] Reset claimable balance to 0 for ${userAddress}. Total earned remains: ${totalEarned}`);
    } catch (error) {
      console.error('[BalanceContext] Error resetting claimable balance:', error);
    }
  }, [totalEarned]);

  const setClaimableBalanceValue = useCallback((userAddress, amount) => {
    if (!userAddress || amount < 0) {
      console.warn('[BalanceContext] Invalid parameters for setClaimableBalanceValue');
      return;
    }

    try {
      const key = `claimableBalance_${userAddress}`;
      
      setClaimableBalance(amount);
      setLastUpdated(new Date().toISOString());
      
      localStorage.setItem(key, amount.toString());
      
      console.log(`[BalanceContext] Set balance to ${amount} for ${userAddress}`);
    } catch (error) {
      console.error('[BalanceContext] Error setting claimable balance:', error);
    }
  }, []);

  const getClaimableBalanceFromStorage = useCallback((userAddress) => {
    if (!userAddress) return 0;
    
    try {
      const key = `claimableBalance_${userAddress}`;
      const storedBalance = localStorage.getItem(key);
      return storedBalance ? parseFloat(storedBalance) : 0;
    } catch (error) {
      console.error('[BalanceContext] Error getting balance from storage:', error);
      return 0;
    }
  }, []);

  const refreshBalance = useCallback((userAddress) => {
    loadBalanceForUser(userAddress);
  }, [loadBalanceForUser]);

  const value = {
    claimableBalance,
    totalEarned,
    currentUser,
    isLoading,
    lastUpdated,
    
    loadBalanceForUser,
    addToClaimableBalance,
    resetClaimableBalance,
    setClaimableBalanceValue,
    getClaimableBalanceFromStorage,
    refreshBalance
  };

  return (
    <BalanceContext.Provider value={value}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => {
  const context = useContext(BalanceContext);
  
  if (!context) {
    throw new Error('useBalance must be used within a BalanceProvider');
  }
  
  return context;
};

export default BalanceContext;
