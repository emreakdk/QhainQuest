import { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * Global Balance Context for Claimable Token Management
 * 
 * This context provides a single source of truth for claimable balance
 * across the entire application. It synchronizes with localStorage
 * and ensures all components display consistent data.
 * 
 * Architecture Benefits:
 * - Single source of truth for claimable balance
 * - Automatic localStorage synchronization
 * - Real-time updates across all components
 * - Eliminates data inconsistencies
 * - Centralized balance management logic
 */
const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  // Global claimable balance state (amount ready to claim)
  const [claimableBalance, setClaimableBalance] = useState(0);
  // Global total earned state (lifetime earnings - never resets)
  const [totalEarned, setTotalEarned] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  /**
   * Initialize balances from localStorage
   * This runs once on application startup
   */
  useEffect(() => {
    // Initialize with 0 balances
    // Real balances will be loaded when user connects
    setClaimableBalance(0);
    setTotalEarned(0);
    setCurrentUser(null);
    setLastUpdated(null);
  }, []);

  /**
   * Load claimable balance for a specific user
   * @param {string} userAddress - User's wallet address
   */
  const loadBalanceForUser = useCallback((userAddress) => {
    if (!userAddress) {
      setCurrentUser(null);
      setClaimableBalance(0);
      setTotalEarned(0);
      setLastUpdated(null);
      return;
    }

    try {
      setCurrentUser(userAddress);
      
      // Load claimable balance
      const claimableKey = `claimableBalance_${userAddress}`;
      const storedClaimableBalance = localStorage.getItem(claimableKey);
      const claimableBalance = storedClaimableBalance ? parseFloat(storedClaimableBalance) : 0;
      
      // Load total earned
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

  /**
   * Update claimable balance and total earned (add amount)
   * @param {string} userAddress - User's wallet address
   * @param {number} amount - Amount to add to balance
   */
  const addToClaimableBalance = useCallback((userAddress, amount) => {
    if (!userAddress || amount <= 0) {
      console.warn('[BalanceContext] Invalid parameters for addToClaimableBalance');
      return;
    }

    try {
      const claimableKey = `claimableBalance_${userAddress}`;
      const totalEarnedKey = `totalEarned_${userAddress}`;
      
      const currentClaimableBalance = claimableBalance;
      const currentTotalEarned = totalEarned;
      
      const newClaimableBalance = currentClaimableBalance + amount;
      const newTotalEarned = currentTotalEarned + amount;
      
      // Update React state
      setClaimableBalance(newClaimableBalance);
      setTotalEarned(newTotalEarned);
      setLastUpdated(new Date().toISOString());
      
      // Update localStorage
      localStorage.setItem(claimableKey, newClaimableBalance.toString());
      localStorage.setItem(totalEarnedKey, newTotalEarned.toString());
      
      console.log(`[BalanceContext] Added ${amount} to balances. New claimable: ${newClaimableBalance}, new totalEarned: ${newTotalEarned}`);
    } catch (error) {
      console.error('[BalanceContext] Error adding to balances:', error);
    }
  }, [claimableBalance, totalEarned]);

  /**
   * Reset claimable balance to 0 (CRITICAL: totalEarned remains unchanged)
   * @param {string} userAddress - User's wallet address
   */
  const resetClaimableBalance = useCallback((userAddress) => {
    if (!userAddress) {
      console.warn('[BalanceContext] No user address provided for reset');
      return;
    }

    try {
      const claimableKey = `claimableBalance_${userAddress}`;
      
      // CRITICAL FIX: Only reset claimable balance, totalEarned stays the same
      setClaimableBalance(0);
      setLastUpdated(new Date().toISOString());
      
      // Update localStorage - only claimable balance
      localStorage.setItem(claimableKey, '0');
      
      console.log(`[BalanceContext] Reset claimable balance to 0 for ${userAddress}. Total earned remains: ${totalEarned}`);
    } catch (error) {
      console.error('[BalanceContext] Error resetting claimable balance:', error);
    }
  }, [totalEarned]);

  /**
   * Set claimable balance to a specific value
   * @param {string} userAddress - User's wallet address
   * @param {number} amount - New balance amount
   */
  const setClaimableBalanceValue = useCallback((userAddress, amount) => {
    if (!userAddress || amount < 0) {
      console.warn('[BalanceContext] Invalid parameters for setClaimableBalanceValue');
      return;
    }

    try {
      const key = `claimableBalance_${userAddress}`;
      
      // Update React state
      setClaimableBalance(amount);
      setLastUpdated(new Date().toISOString());
      
      // Update localStorage
      localStorage.setItem(key, amount.toString());
      
      console.log(`[BalanceContext] Set balance to ${amount} for ${userAddress}`);
    } catch (error) {
      console.error('[BalanceContext] Error setting claimable balance:', error);
    }
  }, []);

  /**
   * Get claimable balance from localStorage (for external use)
   * @param {string} userAddress - User's wallet address
   * @returns {number} Current claimable balance
   */
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

  /**
   * Refresh balance from localStorage (useful for sync)
   * @param {string} userAddress - User's wallet address
   */
  const refreshBalance = useCallback((userAddress) => {
    loadBalanceForUser(userAddress);
  }, [loadBalanceForUser]);

  // Context value object
  const value = {
    // State
    claimableBalance,
    totalEarned,
    currentUser,
    isLoading,
    lastUpdated,
    
    // Actions
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

/**
 * Custom hook for consuming BalanceContext
 * @returns {Object} Balance context value
 */
export const useBalance = () => {
  const context = useContext(BalanceContext);
  
  if (!context) {
    throw new Error('useBalance must be used within a BalanceProvider');
  }
  
  return context;
};

export default BalanceContext;
