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