import { createContext, useContext, useState } from 'react';

const TestContext = createContext();

export const TestProvider = ({ children }) => {
  const [isTestActive, setIsTestActive] = useState(false);

  return (
    <TestContext.Provider value={{ isTestActive, setIsTestActive }}>
      {children}
    </TestContext.Provider>
  );
};

export const useTestStatus = () => {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('useTestStatus must be used within a TestProvider');
  }
  return context;
};

