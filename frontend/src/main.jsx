import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'driver.js/dist/driver.css';
import { WalletProvider } from './context/WalletContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { QuestProvider } from './context/QuestContext.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NotificationProvider>
      <WalletProvider>
        <ThemeProvider>
          <LanguageProvider>
            <QuestProvider>
              <App />
            </QuestProvider>
          </LanguageProvider>
        </ThemeProvider>
      </WalletProvider>
    </NotificationProvider>
  </React.StrictMode>
);