import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { 
  TbBrandTwitter, 
  TbBrandDiscord, 
  TbBrandGithub, 
  TbBrandTelegram,
  TbMail,
  TbSchool,
  TbChecklist,
  TbCoins,
  TbTrophy,
  TbTarget,
  TbListDetails,
  TbUserHexagon
} from 'react-icons/tb';

const Footer = ({ onPageChange }) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  
  // Navigation items for Platform column
  const platformLinks = [
    { id: 'learn-web3', label: t('nav.learnWeb3'), icon: TbSchool },
    { id: 'how-to-claim', label: t('nav.howToClaim'), icon: TbListDetails },
    { id: 'quests', label: t('nav.quests'), icon: TbChecklist },
    { id: 'leaderboard', label: t('nav.leaderboard'), icon: TbTrophy },
    { id: 'profile', label: t('nav.profile'), icon: TbUserHexagon },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
    // Show success message (you can add a toast notification here)
  };

  return (
    <footer className="relative bg-slate-950 text-slate-300 border-t border-transparent bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 bg-clip-border">
      {/* Gradient Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-50"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content - Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CQ</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                ChainQuest
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              {language === 'tr' 
                ? 'Web3 öğrenmenin en eğlenceli yolu.'
                : 'The most fun way to learn Web3.'
              }
            </p>
            
            {/* Social Media Icons */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://twitter.com/chainquest"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-110"
                aria-label="Twitter"
              >
                <TbBrandTwitter size={20} />
              </a>
              <a
                href="https://discord.gg/chainquest"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-purple-500/50 text-slate-400 hover:text-purple-400 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-110"
                aria-label="Discord"
              >
                <TbBrandDiscord size={20} />
              </a>
              <a
                href="https://github.com/chainquest"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-400/50 text-slate-400 hover:text-slate-300 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/20 hover:scale-110"
                aria-label="GitHub"
              >
                <TbBrandGithub size={20} />
              </a>
              <a
                href="https://t.me/chainquest"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-110"
                aria-label="Telegram"
              >
                <TbBrandTelegram size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Platform (Keşfet) */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-4 pl-0">
              {language === 'tr' ? 'Keşfet' : 'Explore'}
            </h3>
            <ul className="space-y-3 pl-0">
              {platformLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.id}>
                    <button
                      onClick={() => onPageChange && onPageChange(link.id)}
                      className="relative text-sm text-slate-400 transition-colors duration-200 group w-full text-left pl-0 cursor-pointer"
                    >
                      <IconComponent size={16} className="absolute left-0 top-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                      <span className="pl-0 group-hover:pl-6 group-hover:text-cyan-400 dark:group-hover:text-cyan-400 transition-all">{link.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Corporate (Hakkımızda) */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-4 pl-0">
              {language === 'tr' ? 'Hakkımızda' : 'About Us'}
            </h3>
            <ul className="space-y-3 pl-0">
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="relative text-sm text-slate-400 transition-colors duration-200 group w-full text-left pl-0 cursor-pointer"
                >
                  <TbTarget size={16} className="absolute left-0 top-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
                  <span className="pl-0 group-hover:pl-6 group-hover:text-purple-400 dark:group-hover:text-purple-400 transition-all">{language === 'tr' ? 'Vizyonumuz / Misyonumuz' : 'Vision / Mission'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">
              {language === 'tr' 
                ? 'Gelişmelerden Haberdar Ol'
                : 'Stay Updated'
              }
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {language === 'tr'
                ? 'Yeni testler eklendiğinde haberin olsun.'
                : 'Get notified when new tests are added.'
              }
            </p>
            
            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="space-y-3 mt-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'tr' ? 'E-posta adresiniz' : 'Your email address'}
                  required
                  className="w-full px-4 py-3 pr-12 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-200"
                  style={{
                    background: 'rgba(30, 41, 59, 0.3)',
                    backdropFilter: 'blur(8px)',
                  }}
                />
                <TbMail 
                  size={20} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" 
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center space-x-2 group"
              >
                <TbMail size={18} className="group-hover:scale-110 transition-transform" />
                <span>{language === 'tr' ? 'Abone Ol' : 'Subscribe'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/50 pt-8 mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <p className="text-sm text-slate-500 text-center sm:text-left">
              © 2025 ChainQuest. {language === 'tr' ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}
            </p>
            <p className="text-sm text-slate-500 text-center sm:text-right">
              {language === 'tr' 
                ? 'Huawei Cloud Competition için geliştirildi'
                : 'Built for Huawei Cloud Competition'
              }
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

