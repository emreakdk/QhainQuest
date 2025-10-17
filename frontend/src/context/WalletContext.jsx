import { createContext, useState, useEffect } from 'react';

export const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const [publicKey, setPublicKey] = useState('');
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Load demo mode state from localStorage on mount
  useEffect(() => {
    const savedDemoMode = localStorage.getItem('isDemoMode');
    if (savedDemoMode === 'true') {
      setIsDemoMode(true);
    }
  }, []);

  // Save demo mode state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('isDemoMode', isDemoMode.toString());
  }, [isDemoMode]);

  // Function to enter demo mode
  const enterDemoMode = () => {
    setIsDemoMode(true);
    setPublicKey(''); // Clear any existing wallet connection
  };

  // Function to exit demo mode (when wallet is connected)
  const exitDemoMode = (walletAddress) => {
    console.log('🔄 [WalletContext] Exiting demo mode, transferring balances to wallet:', walletAddress);
    
    // Transfer demo mode balances to real user before switching
    if (walletAddress) {
      // Get demo mode balances
      const demoClaimableKey = 'claimableBalance_demo';
      const demoTotalEarnedKey = 'totalEarned_demo';
      
      const demoClaimableBalance = localStorage.getItem(demoClaimableKey);
      const demoTotalEarned = localStorage.getItem(demoTotalEarnedKey);
      
      if (demoClaimableBalance && parseFloat(demoClaimableBalance) > 0) {
        // Transfer claimable balance to real user
        const realClaimableKey = `claimableBalance_${walletAddress}`;
        const currentRealClaimable = localStorage.getItem(realClaimableKey);
        const currentRealClaimableValue = currentRealClaimable ? parseFloat(currentRealClaimable) : 0;
        const newClaimableValue = currentRealClaimableValue + parseFloat(demoClaimableBalance);
        localStorage.setItem(realClaimableKey, newClaimableValue.toString());
        
        console.log(`💰 [WalletContext] Transferred ${demoClaimableBalance} claimable balance to ${walletAddress}`);
      }
      
      if (demoTotalEarned && parseFloat(demoTotalEarned) > 0) {
        // Transfer total earned to real user
        const realTotalEarnedKey = `totalEarned_${walletAddress}`;
        const currentRealTotalEarned = localStorage.getItem(realTotalEarnedKey);
        const currentRealTotalEarnedValue = currentRealTotalEarned ? parseFloat(currentRealTotalEarned) : 0;
        const newTotalEarnedValue = currentRealTotalEarnedValue + parseFloat(demoTotalEarned);
        localStorage.setItem(realTotalEarnedKey, newTotalEarnedValue.toString());
        
        console.log(`💰 [WalletContext] Transferred ${demoTotalEarned} total earned to ${walletAddress}`);
      }
      
      // Transfer completed quests from demo mode to real user
      const completedQuests = JSON.parse(localStorage.getItem('completedQuests') || '[]');
      const demoQuestKeys = completedQuests.filter(key => key.startsWith('demo-'));
      
      if (demoQuestKeys.length > 0) {
        // Convert demo quest keys to real user keys
        const realUserQuestKeys = demoQuestKeys.map(key => key.replace('demo-', `${walletAddress}-`));
        
        // Add real user quest keys to completed quests
        const updatedCompletedQuests = [...completedQuests.filter(key => !key.startsWith('demo-')), ...realUserQuestKeys];
        localStorage.setItem('completedQuests', JSON.stringify(updatedCompletedQuests));
        
        console.log(`🎯 [WalletContext] Transferred ${demoQuestKeys.length} completed quests to ${walletAddress}`);
      }
      
      // Clear demo mode balances after transfer
      localStorage.removeItem(demoClaimableKey);
      localStorage.removeItem(demoTotalEarnedKey);
      console.log('🧹 [WalletContext] Cleared demo mode balances');
    }
    
    setIsDemoMode(false);
    setPublicKey(walletAddress);
  };

  // Function to check if user is connected (either wallet or demo mode)
  const isConnected = () => {
    return publicKey || isDemoMode;
  };

  return (
    <WalletContext.Provider value={{ 
      publicKey, 
      setPublicKey, 
      isDemoMode, 
      setIsDemoMode,
      enterDemoMode,
      exitDemoMode,
      isConnected
    }}>
      {children}
    </WalletContext.Provider>
  );
};