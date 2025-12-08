import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import { TbClock, TbTag } from 'react-icons/tb';

const ArticleCard = ({ article, onClick, language = 'en' }) => {
  const { isDarkMode } = useTheme();
  const content = article[language] || article.en;
  const categoryColors = {
    fundamentals: { light: 'bg-blue-100 text-blue-800', dark: 'bg-blue-900/30 text-blue-300' },
    stellar: { light: 'bg-purple-100 text-purple-800', dark: 'bg-purple-900/30 text-purple-300' },
    huawei: { light: 'bg-red-100 text-red-800', dark: 'bg-red-900/30 text-red-300' },
    security: { light: 'bg-green-100 text-green-800', dark: 'bg-green-900/30 text-green-300' },
    'smart-contracts': { light: 'bg-orange-100 text-orange-800', dark: 'bg-orange-900/30 text-orange-300' }
  };

  const categoryColor = categoryColors[article.category] || categoryColors.fundamentals;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`
        group relative cursor-pointer overflow-hidden rounded-2xl
        ${isDarkMode 
          ? 'bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 shadow-lg hover:border-indigo-500/50 hover:shadow-indigo-500/20' 
          : 'bg-white border border-slate-200 shadow-md hover:shadow-xl hover:border-indigo-300'
        }
        transition-all duration-300
      `}
    >
      {/* Hover Glow Effect */}
      <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
        ${isDarkMode 
          ? 'bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10' 
          : 'bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50'
        }
      `} />

      <div className="relative p-6">
        {/* Icon and Category */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{article.icon}</div>
          <span className={`
            px-3 py-1 rounded-full text-xs font-semibold
            ${isDarkMode ? categoryColor.dark : categoryColor.light}
          `}>
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h3 className={`
          text-xl font-bold mb-2 line-clamp-2
          ${isDarkMode ? 'text-white group-hover:text-indigo-400' : 'text-slate-900 group-hover:text-indigo-600'}
          transition-colors duration-300
        `}>
          {content.title}
        </h3>

        {/* Summary */}
        <p className={`
          text-sm mb-4 line-clamp-3
          ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}
        `}>
          {content.summary}
        </p>

        {/* Footer: Tags and Read Time */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center gap-2 flex-wrap">
            {article.tags.slice(0, 2).map((tag, index) => (
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
          <div className={`
            flex items-center gap-1 text-xs
            ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}
          `}>
            <TbClock size={14} />
            <span>{article.readTime} {language === 'tr' ? 'dakika' : 'min'}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;

