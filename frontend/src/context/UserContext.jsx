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

  // Persist to localStorage whenever selectedAvatarId changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chainquest-selectedAvatarId', selectedAvatarId);
    }
  }, [selectedAvatarId]);

  const value = {
    selectedAvatarId,
    setSelectedAvatarId,
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

