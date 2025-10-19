import { createContext, useState, useEffect } from 'react';

export const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const [publicKey, setPublicKey] = useState('');
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeWalletState = async () => {
      try {
        const savedDemoMode = localStorage.getItem('isDemoMode');
        if (savedDemoMode === 'true') {
          setIsDemoMode(true);
          setIsInitialized(true);
          return;
        }

        const savedPublicKey = localStorage.getItem('chainquest-publicKey');
        if (savedPublicKey) {
          try {
            const { isConnected } = await import('@stellar/freighter-api');
            const connected = await isConnected();
            if (connected?.isConnected) {
              setPublicKey(savedPublicKey);
              console.log('🔗 [WalletContext] Restored wallet connection:', savedPublicKey);
            } else {
              localStorage.removeItem('chainquest-publicKey');
              console.log('🔗 [WalletContext] Wallet disconnected, cleared saved state');
            }
          } catch (error) {
            console.log('🔗 [WalletContext] Freighter not available, using saved state');
            setPublicKey(savedPublicKey);
          }
        }

        setIsInitialized(true);
      } catch (error) {
        console.error('🔗 [WalletContext] Error initializing wallet state:', error);
        setIsInitialized(true);
      }
    };

    initializeWalletState();
  }, []);

  useEffect(() => {
    if (publicKey) {
      localStorage.setItem('chainquest-publicKey', publicKey);
    } else {
      localStorage.removeItem('chainquest-publicKey');
    }
  }, [publicKey]);

  useEffect(() => {
    localStorage.setItem('isDemoMode', isDemoMode.toString());
  }, [isDemoMode]);

  const enterDemoMode = () => {
    setIsDemoMode(true);
    setPublicKey(''); // Clear any existing wallet connection
  };

  const exitDemoMode = (walletAddress) => {
    console.log('🔄 [WalletContext] Exiting demo mode, transferring balances to wallet:', walletAddress);
    
    if (walletAddress) {
      const demoClaimableKey = 'claimableBalance_demo';
      const demoTotalEarnedKey = 'totalEarned_demo';
      
      const demoClaimableBalance = localStorage.getItem(demoClaimableKey);
      const demoTotalEarned = localStorage.getItem(demoTotalEarnedKey);
      
      if (demoClaimableBalance && parseFloat(demoClaimableBalance) > 0) {
        const realClaimableKey = `claimableBalance_${walletAddress}`;
        const currentRealClaimable = localStorage.getItem(realClaimableKey);
        const currentRealClaimableValue = currentRealClaimable ? parseFloat(currentRealClaimable) : 0;
        const newClaimableValue = currentRealClaimableValue + parseFloat(demoClaimableBalance);
        localStorage.setItem(realClaimableKey, newClaimableValue.toString());
        
        console.log(`💰 [WalletContext] Transferred ${demoClaimableBalance} claimable balance to ${walletAddress}`);
      }
      
      if (demoTotalEarned && parseFloat(demoTotalEarned) > 0) {
        const realTotalEarnedKey = `totalEarned_${walletAddress}`;
        const currentRealTotalEarned = localStorage.getItem(realTotalEarnedKey);
        const currentRealTotalEarnedValue = currentRealTotalEarned ? parseFloat(currentRealTotalEarned) : 0;
        const newTotalEarnedValue = currentRealTotalEarnedValue + parseFloat(demoTotalEarned);
        localStorage.setItem(realTotalEarnedKey, newTotalEarnedValue.toString());
        
        console.log(`💰 [WalletContext] Transferred ${demoTotalEarned} total earned to ${walletAddress}`);
      }
      
      const completedQuests = JSON.parse(localStorage.getItem('completedQuests') || '[]');
      const demoQuestKeys = completedQuests.filter(key => key.startsWith('demo-'));
      
      if (demoQuestKeys.length > 0) {
        const realUserQuestKeys = demoQuestKeys.map(key => key.replace('demo-', `${walletAddress}-`));
        
        const updatedCompletedQuests = [...completedQuests.filter(key => !key.startsWith('demo-')), ...realUserQuestKeys];
        localStorage.setItem('completedQuests', JSON.stringify(updatedCompletedQuests));
        
        console.log(`🎯 [WalletContext] Transferred ${demoQuestKeys.length} completed quests to ${walletAddress}`);
      }
      
      localStorage.removeItem(demoClaimableKey);
      localStorage.removeItem(demoTotalEarnedKey);
      console.log('🧹 [WalletContext] Cleared demo mode balances');
    }
    
    setIsDemoMode(false);
    setPublicKey(walletAddress);
  };

  const isConnected = () => {
    return publicKey || isDemoMode;
  };

  return (
    <WalletContext.Provider value={{ 
      publicKey, 
      setPublicKey, 
      isDemoMode, 
      setIsDemoMode,
      isInitialized,
      enterDemoMode,
      exitDemoMode,
      isConnected
    }}>
      {children}
    </WalletContext.Provider>
  );
};