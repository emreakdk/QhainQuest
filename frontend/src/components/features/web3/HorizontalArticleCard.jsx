import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { TbClock, TbTag, TbX, TbSparkles } from 'react-icons/tb';
import { aiService } from '../../../services/aiService';

/**
 * HorizontalArticleCard Component
 * Bundle News App tarzı yatay article card
 */
const HorizontalArticleCard = ({ article, language = 'en' }) => {
  const { isDarkMode } = useTheme();
  const content = article[language] || article.en;
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState(null);
  const [summaryError, setSummaryError] = useState(null);
  
  const categoryColors = {
    fundamentals: { light: 'bg-blue-100 text-blue-800', dark: 'bg-blue-900/30 text-blue-300' },
    stellar: { light: 'bg-purple-100 text-purple-800', dark: 'bg-purple-900/30 text-purple-300' },
    huawei: { light: 'bg-red-100 text-red-800', dark: 'bg-red-900/30 text-red-300' },
    security: { light: 'bg-green-100 text-green-800', dark: 'bg-green-900/30 text-green-300' },
    'smart-contracts': { light: 'bg-orange-100 text-orange-800', dark: 'bg-orange-900/30 text-orange-300' }
  };

  const categoryColor = categoryColors[article.category] || categoryColors.fundamentals;

  const handleSummarize = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (summary) {
      // If summary exists, close it
      setSummary(null);
      setSummaryError(null);
      return;
    }

    setIsSummarizing(true);
    setSummaryError(null);
    
    try {
      const result = await aiService.summarizeArticle(
        content.title,
        content.summary,
        article.tags || [],
        language
      );
      
      setSummary(result.summary);
      setIsSummarizing(false);
    } catch (error) {
      console.error('[Article Card] Summarize error:', error);
      setSummaryError(error.message || (language === 'tr' 
        ? 'Özet oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.'
        : 'An error occurred while generating the summary. Please try again.'));
      setIsSummarizing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <Link
        to={`/article/${article.id}`}
        className={`
          group block overflow-hidden rounded-xl
          ${isDarkMode 
            ? 'bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 hover:border-indigo-500/50' 
            : 'bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-300'
          }
          transition-all duration-300 hover:-translate-y-1
        `}
      >
        <div className="flex flex-col md:flex-row">
          {/* Image - Left Side */}
          <div className="md:w-64 md:flex-shrink-0">
            {article.image ? (
              <img
                src={article.image}
                alt={content.title}
                className="w-full h-48 md:h-full aspect-video md:aspect-auto object-cover"
              />
            ) : (
              <div className={`
                w-full h-48 md:h-full aspect-video md:aspect-auto
                bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
                flex items-center justify-center
              `}>
                <span className="text-4xl">{article.icon}</span>
              </div>
            )}
          </div>

          {/* Content - Right Side */}
          <div className="flex-1 p-6">
            {/* Category Badge */}
            <div className="mb-3">
              <span className={`
                inline-block px-3 py-1 rounded-full text-xs font-semibold
                ${isDarkMode ? categoryColor.dark : categoryColor.light}
              `}>
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h3 className={`
              text-xl md:text-2xl font-bold mb-3 line-clamp-2
              ${isDarkMode ? 'text-white group-hover:text-indigo-400' : 'text-slate-900 group-hover:text-indigo-600'}
              transition-colors duration-300
            `}>
              {content.title}
            </h3>

            {/* Summary */}
            <p className={`
              text-sm md:text-base mb-4 line-clamp-2
              ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}
            `}>
              {content.summary}
            </p>

            {/* AI Summary Section */}
            {summary && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`
                  mb-4 p-4 rounded-lg border
                  ${isDarkMode 
                    ? 'bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-indigo-900/30 border-purple-500/30 shadow-lg shadow-purple-500/10' 
                    : 'bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 border-purple-200 shadow-md'
                  }
                  relative
                `}
              >
                <button
                  onClick={handleSummarize}
                  className={`
                    absolute top-2 right-2 p-1 rounded-md transition-colors
                    ${isDarkMode 
                      ? 'text-purple-300 hover:bg-purple-800/50 hover:text-white' 
                      : 'text-purple-600 hover:bg-purple-100'
                    }
                  `}
                >
                  <TbX size={18} />
                </button>
                <div className="flex items-start gap-2 mb-2">
                  <TbSparkles 
                    size={18} 
                    className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} 
                  />
                  <span className={`
                    text-xs font-semibold
                    ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}
                  `}>
                    {language === 'tr' ? 'AI Özeti' : 'AI Summary'}
                  </span>
                </div>
                <p className={`
                  text-sm leading-relaxed pr-6
                  ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}
                `}>
                  {summary}
                </p>
              </motion.div>
            )}

            {/* Loading Animation */}
            {isSummarizing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`
                  mb-4 p-4 rounded-lg border
                  ${isDarkMode 
                    ? 'bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-indigo-900/20 border-purple-500/20' 
                    : 'bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 border-purple-200'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <TbSparkles 
                    size={18} 
                    className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} 
                  />
                  <span className={`
                    text-sm
                    ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}
                  `}>
                    {language === 'tr' ? 'Özetleniyor...' : 'Summarizing...'}
                  </span>
                  <div className="flex gap-1 ml-auto">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className={`
                          w-2 h-2 rounded-full
                          ${isDarkMode ? 'bg-purple-400' : 'bg-purple-600'}
                        `}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Error Display */}
            {summaryError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`
                  mb-4 p-4 rounded-lg border
                  ${isDarkMode 
                    ? 'bg-red-900/20 border-red-500/30' 
                    : 'bg-red-50 border-red-200'
                  }
                  relative
                `}
              >
                <button
                  onClick={() => setSummaryError(null)}
                  className={`
                    absolute top-2 right-2 p-1 rounded-md transition-colors
                    ${isDarkMode 
                      ? 'text-red-300 hover:bg-red-800/50 hover:text-white' 
                      : 'text-red-600 hover:bg-red-100'
                    }
                  `}
                >
                  <TbX size={18} />
                </button>
                <p className={`
                  text-sm pr-6
                  ${isDarkMode ? 'text-red-300' : 'text-red-700'}
                `}>
                  {summaryError}
                </p>
              </motion.div>
            )}

            {/* Footer: Tags, Read Time, and AI Summarize Button */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center gap-2 flex-wrap">
                {article.tags && article.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className={`
                      flex items-center gap-1 px-2 py-1 rounded-md text-xs
                      ${isDarkMode 
                        ? 'bg-slate-700/50 text-slate-300' 
                        : 'bg-slate-100 text-slate-600'
                      }
                    `}
                  >
                    <TbTag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSummarize}
                  disabled={isSummarizing}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                    transition-all duration-200
                    ${isSummarizing || summary
                      ? isDarkMode
                        ? 'bg-purple-600/30 text-purple-300 border border-purple-500/30'
                        : 'bg-purple-100 text-purple-700 border border-purple-300'
                      : isDarkMode
                        ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 border border-purple-500/30 hover:from-purple-600/30 hover:to-pink-600/30 hover:border-purple-400/50'
                        : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-300 hover:from-purple-200 hover:to-pink-200'
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  <TbSparkles size={14} />
                  <span>{language === 'tr' ? '✨ Özetle' : '✨ Summarize'}</span>
                </button>
                <div className={`
                  flex items-center gap-1 text-xs
                  ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}
                `}>
                  <TbClock size={14} />
                  <span>{article.readTime} {language === 'tr' ? 'dakika' : 'min'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default HorizontalArticleCard;

