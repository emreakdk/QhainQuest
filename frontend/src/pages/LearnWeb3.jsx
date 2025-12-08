import { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { web3KnowledgeBase } from '../data/web3KnowledgeData';
import HorizontalArticleCard from '../components/features/web3/HorizontalArticleCard';
import { motion } from 'framer-motion';
import { 
  TbSearch, 
  TbBook, 
  TbStar, 
  TbCloud, 
  TbShield, 
  TbFileCode,
  TbX
} from 'react-icons/tb';
import { Landmark, Image, Terminal, Briefcase, Scale, Globe, BrainCircuit, Vote, BookA } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: { en: 'All Articles', tr: 'Tüm Makaleler' }, icon: TbBook },
  { id: 'fundamentals', label: { en: 'Fundamentals', tr: 'Temeller' }, icon: TbBook },
  { id: 'stellar', label: { en: 'Stellar', tr: 'Stellar' }, icon: TbStar },
  { id: 'huawei', label: { en: 'Huawei Cloud', tr: 'Huawei Cloud' }, icon: TbCloud },
  { id: 'security', label: { en: 'Security', tr: 'Güvenlik' }, icon: TbShield },
  { id: 'smart-contracts', label: { en: 'Smart Contracts', tr: 'Akıllı Kontratlar' }, icon: TbFileCode },
  { id: 'defi', label: { en: 'DeFi & Economy', tr: 'DeFi & Ekonomi' }, icon: Landmark },
  { id: 'nft', label: { en: 'NFT & Metaverse', tr: 'NFT & Metaverse' }, icon: Image },
  { id: 'devtools', label: { en: 'Dev Tools', tr: 'Geliştirici Araçları' }, icon: Terminal },
  { id: 'career', label: { en: 'Careers & Opportunities', tr: 'Kariyer & Fırsatlar' }, icon: Briefcase },
  { id: 'regulation', label: { en: 'Law & Regulation', tr: 'Hukuk & Regülasyon' }, icon: Scale },
  { id: 'usecases', label: { en: 'Real World Use Cases', tr: 'Gerçek Hayat Senaryoları' }, icon: Globe },
  { id: 'ai-web3', label: { en: 'AI & Web3', tr: 'Yapay Zeka & Web3' }, icon: BrainCircuit },
  { id: 'dao', label: { en: 'DAO & Governance', tr: 'DAO & Yönetişim' }, icon: Vote },
  { id: 'glossary', label: { en: 'Web3 Glossary', tr: 'Web3 Sözlüğü' }, icon: BookA }
];

const LearnWeb3 = ({ onPageChange }) => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter articles based on category and search
  const filteredArticles = useMemo(() => {
    return web3KnowledgeBase.filter(article => {
      // Category filter
      const categoryMatch = selectedCategory === 'all' || article.category === selectedCategory;
      
      // Search filter
      const content = article[language] || article.en;
      const searchLower = searchQuery.toLowerCase();
      const searchMatch = !searchQuery || 
        content.title.toLowerCase().includes(searchLower) ||
        content.summary.toLowerCase().includes(searchLower) ||
        content.content.toLowerCase().includes(searchLower) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchLower));
      
      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery, language]);


  return (
    <div className={`
      min-h-screen
      ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}
    `}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8 overflow-visible text-center max-w-4xl mx-auto">
          <h1 className={`
            text-4xl md:text-5xl font-black mb-4 leading-tight overflow-visible pb-1
            ${isDarkMode 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400' 
              : 'text-slate-900'
            }
          `}>
            {language === 'tr' ? 'Web3 & Blockchain Dünyasını Keşfedin' : 'Explore the Web3 & Blockchain World'}
          </h1>
          <p className={`
            text-lg md:text-xl
            ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}
          `}>
            {language === 'tr' 
              ? 'Sıfırdan ileri seviyeye; merkeziyetsiz teknolojiler, DeFi, NFT ve yazılım geliştirme üzerine en kapsamlı Türkçe rehberiniz.'
              : 'From zero to advanced level; your most comprehensive guide to decentralized technologies, DeFi, NFTs, and software development.'
            }
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <aside className={`
            lg:w-64 flex-shrink-0
            lg:sticky lg:top-24 lg:h-fit
          `}>
            <div className={`
              rounded-2xl p-6
              ${isDarkMode 
                ? 'bg-slate-800/50 backdrop-blur-xl border border-slate-700/50' 
                : 'bg-white border border-slate-200 shadow-sm'
              }
            `}>
              <h2 className={`
                text-lg font-bold mb-4 text-center
                ${isDarkMode ? 'text-white' : 'text-slate-900'}
              `}>
                {language === 'tr' ? 'Kategoriler' : 'Categories'}
              </h2>
              <nav className="space-y-2">
                {CATEGORIES.map((category) => {
                  const Icon = category.icon;
                  const isActive = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-lg
                        transition-all duration-200 relative min-w-0 cursor-pointer text-left
                        ${isActive
                          ? isDarkMode
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 font-semibold'
                            : 'bg-indigo-100 text-indigo-700 font-semibold'
                          : isDarkMode
                            ? 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }
                      `}
                    >
                      {isActive && (
                        <span className={`
                          absolute left-0 top-0 bottom-0 w-1.5 rounded-r
                          ${isDarkMode ? 'bg-indigo-300' : 'bg-indigo-600'}
                        `} />
                      )}
                      <Icon size={20} className="flex-shrink-0" />
                      <span className="truncate whitespace-nowrap flex-1 min-w-0 text-left">{category.label[language]}</span>
                      {isActive && (
                        <span className={`
                          ml-auto text-xs px-2 py-1 rounded-full flex-shrink-0
                          ${isDarkMode ? 'bg-white/20' : 'bg-indigo-200'}
                        `}>
                          {filteredArticles.length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Search Bar */}
            <div className={`
              mb-6 rounded-2xl p-4
              ${isDarkMode 
                ? 'bg-slate-800/50 backdrop-blur-xl border border-slate-700/50' 
                : 'bg-white border border-slate-200 shadow-sm'
              }
            `}>
              <div className="relative">
                <TbSearch 
                  className={`
                    absolute left-4 top-1/2 -translate-y-1/2
                    ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}
                  `}
                  size={20}
                />
                <input
                  type="text"
                  placeholder={language === 'tr' ? 'Makalelerde ara...' : 'Search articles...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`
                    w-full pl-12 pr-10 py-3 rounded-lg
                    ${isDarkMode 
                      ? 'bg-slate-900/50 text-white placeholder-slate-500 border border-slate-700/50 focus:border-indigo-500' 
                      : 'bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-200 focus:border-indigo-500'
                    }
                    focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all
                  `}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className={`
                      absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded
                      ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}
                    `}
                  >
                    <TbX size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Dynamic Category Heading */}
            {(() => {
              const selectedCat = CATEGORIES.find(cat => cat.id === selectedCategory);
              const categoryLabel = selectedCat ? selectedCat.label[language] : '';
              return (
                <h2 className={`
                  text-center text-2xl md:text-3xl font-bold mt-6 mb-4
                  ${isDarkMode ? 'text-white' : 'text-slate-900'}
                `}>
                  {categoryLabel}
                </h2>
              );
            })()}

            {/* Results Count */}
            <div className="mb-6">
              <p className={`
                text-sm
                ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}
              `}>
                {language === 'tr' 
                  ? `${filteredArticles.length} makale bulundu`
                  : `${filteredArticles.length} article${filteredArticles.length !== 1 ? 's' : ''} found`
                }
              </p>
            </div>

            {/* Articles Feed */}
            {filteredArticles.length > 0 ? (
              <div className="space-y-6 md:space-y-8">
                {filteredArticles.map((article, index) => (
                  <HorizontalArticleCard
                    key={article.id}
                    article={article}
                    language={language}
                  />
                ))}
              </div>
            ) : (
              <div className={`
                text-center py-16 rounded-2xl
                ${isDarkMode 
                  ? 'bg-slate-800/50 border border-slate-700/50' 
                  : 'bg-white border border-slate-200'
                }
              `}>
                <TbSearch 
                  className={`
                    mx-auto mb-4
                    ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}
                  `}
                  size={48}
                />
                <p className={`
                  text-lg font-semibold mb-2
                  ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}
                `}>
                  {language === 'tr' ? 'Makale bulunamadı' : 'No articles found'}
                </p>
                <p className={`
                  text-sm
                  ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}
                `}>
                  {language === 'tr' 
                    ? 'Arama kriterlerinizi değiştirmeyi deneyin'
                    : 'Try changing your search criteria'
                  }
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default LearnWeb3;
