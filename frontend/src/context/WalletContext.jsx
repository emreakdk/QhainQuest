import { createContext, useState } from 'react';

export const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const [publicKey, setPublicKey] = useState('');

  return (
    <WalletContext.Provider value={{ publicKey, setPublicKey }}>
      {children}
    </WalletContext.Provider>
  );
};