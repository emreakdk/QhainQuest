import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [selectedAvatarId, setSelectedAvatarId] = useState(() => {
    // Initialize from localStorage or default to 'default'
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chainquest-selectedAvatarId');
      return saved || 'default';
    }
    return 'default';
  });

  const [displayName, setDisplayName] = useState(() => {
    // Initialize from localStorage or default to 'Web3 Keşfedici'
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chainquest-userDisplayName');
      return saved || 'Web3 Keşfedici';
    }
    return 'Web3 Keşfedici';
  });

  // Persist to localStorage whenever selectedAvatarId changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chainquest-selectedAvatarId', selectedAvatarId);
    }
  }, [selectedAvatarId]);

  // Persist to localStorage whenever displayName changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chainquest-userDisplayName', displayName);
    }
  }, [displayName]);

  // Function to update display name
  const updateDisplayName = (name) => {
    if (name && name.trim()) {
      setDisplayName(name.trim());
    }
  };

  const value = {
    selectedAvatarId,
    setSelectedAvatarId,
    displayName,
    updateDisplayName,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

