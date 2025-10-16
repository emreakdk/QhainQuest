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
  // Global claimable balance state
  const [claimableBalance, setClaimableBalance] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  /**
   * Initialize claimable balance from localStorage
   * This runs once on application startup
   */
  useEffect(() => {
    // Initialize with 0 balance
    // Real balance will be loaded when user connects
    setClaimableBalance(0);
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
      setLastUpdated(null);
      return;
    }

    try {
      setCurrentUser(userAddress);
      const key = `claimableBalance_${userAddress}`;
      const storedBalance = localStorage.getItem(key);
      const balance = storedBalance ? parseFloat(storedBalance) : 0;
      
      setClaimableBalance(balance);
      setLastUpdated(new Date().toISOString());
      
      console.log(`[BalanceContext] Loaded balance for ${userAddress}: ${balance}`);
    } catch (error) {
      console.error('[BalanceContext] Error loading balance:', error);
      setClaimableBalance(0);
    }
  }, []);

  /**
   * Update claimable balance (add amount)
   * @param {string} userAddress - User's wallet address
   * @param {number} amount - Amount to add to balance
   */
  const addToClaimableBalance = useCallback((userAddress, amount) => {
    if (!userAddress || amount <= 0) {
      console.warn('[BalanceContext] Invalid parameters for addToClaimableBalance');
      return;
    }

    try {
      const key = `claimableBalance_${userAddress}`;
      const currentBalance = claimableBalance;
      const newBalance = currentBalance + amount;
      
      // Update React state
      setClaimableBalance(newBalance);
      setLastUpdated(new Date().toISOString());
      
      // Update localStorage
      localStorage.setItem(key, newBalance.toString());
      
      console.log(`[BalanceContext] Added ${amount} to balance. New balance: ${newBalance}`);
    } catch (error) {
      console.error('[BalanceContext] Error adding to claimable balance:', error);
    }
  }, [claimableBalance]);

  /**
   * Reset claimable balance to 0 and add to claimed balance
   * @param {string} userAddress - User's wallet address
   */
  const resetClaimableBalance = useCallback((userAddress) => {
    if (!userAddress) {
      console.warn('[BalanceContext] No user address provided for reset');
      return;
    }

    try {
      const claimableKey = `claimableBalance_${userAddress}`;
      const claimedKey = `claimedBalance_${userAddress}`;
      
      // Get current values
      const currentClaimable = claimableBalance;
      const currentClaimed = parseFloat(localStorage.getItem(claimedKey) || '0');
      
      // Update React state
      setClaimableBalance(0);
      setLastUpdated(new Date().toISOString());
      
      // Update localStorage
      localStorage.setItem(claimableKey, '0');
      localStorage.setItem(claimedKey, (currentClaimed + currentClaimable).toString());
      
      console.log(`[BalanceContext] Reset claimable balance to 0 and added ${currentClaimable} to claimed balance for ${userAddress}`);
    } catch (error) {
      console.error('[BalanceContext] Error resetting claimable balance:', error);
    }
  }, [claimableBalance]);

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
