import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import { TbX, TbClock, TbTag } from 'react-icons/tb';
import { useEffect } from 'react';

const ArticleModal = ({ article, isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  const content = article?.[language] || article?.en;

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!article || !content) return null;

  // Format markdown-like content
  const formatContent = (text) => {
    if (!text) return '';
    
    const lines = text.split('\n');
    const elements = [];
    let currentList = [];
    let listKey = 0;

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      
      if (!trimmed) {
        if (currentList.length > 0) {
          elements.push(
            <ul key={`list-${listKey++}`} className="list-disc list-inside space-y-2 mb-4 ml-4">
              {currentList.map((item, i) => (
                <li key={i} className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
                  {item}
                </li>
              ))}
            </ul>
          );
          currentList = [];
        }
        return;
      }

      // Headings
      if (trimmed.startsWith('#')) {
        if (currentList.length > 0) {
          elements.push(
            <ul key={`list-${listKey++}`} className="list-disc list-inside space-y-2 mb-4 ml-4">
              {currentList.map((item, i) => (
                <li key={i} className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
                  {item}
                </li>
              ))}
            </ul>
          );
          currentList = [];
        }
        const level = trimmed.match(/^#+/)[0].length;
        const text = trimmed.replace(/^#+\s*/, '');
        const HeadingTag = `h${Math.min(level, 3)}`;
        const className = level === 1 
          ? 'text-3xl font-bold mb-4 mt-8' 
          : level === 2 
          ? 'text-2xl font-bold mb-3 mt-6' 
          : 'text-xl font-semibold mb-2 mt-4';
        elements.push(
          <HeadingTag 
            key={index} 
            className={`${className} ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
          >
            {text}
          </HeadingTag>
        );
        return;
      }

      // Lists
      if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
        const item = trimmed.replace(/^[-*]\s*/, '');
        currentList.push(item);
        return;
      }

      // Tables
      if (trimmed.includes('|') && trimmed.split('|').length > 2) {
        if (currentList.length > 0) {
          elements.push(
            <ul key={`list-${listKey++}`} className="list-disc list-inside space-y-2 mb-4 ml-4">
              {currentList.map((item, i) => (
                <li key={i} className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
                  {item}
                </li>
              ))}
            </ul>
          );
          currentList = [];
        }
        // Simple table rendering
        const cells = trimmed.split('|').map(c => c.trim()).filter(c => c);
        if (cells.length > 0 && !cells[0].includes('---')) {
          elements.push(
            <div key={index} className="overflow-x-auto mb-4">
              <table className="min-w-full border-collapse">
                <tbody>
                  <tr className={isDarkMode ? 'border-b border-slate-700' : 'border-b border-slate-200'}>
                    {cells.map((cell, i) => (
                      <td 
                        key={i} 
                        className={`px-4 py-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          );
        }
        return;
      }

      // Code blocks
      if (trimmed.startsWith('```')) {
        return; // Skip code block markers for now
      }

      // Regular paragraphs
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${listKey++}`} className="list-disc list-inside space-y-2 mb-4 ml-4">
            {currentList.map((item, i) => (
              <li key={i} className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
                {item}
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }

      // Bold text
      const boldText = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      elements.push(
        <p 
          key={index} 
          className={`mb-4 leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}
          dangerouslySetInnerHTML={{ __html: boldText }}
        />
      );
    });

    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${listKey++}`} className="list-disc list-inside space-y-2 mb-4 ml-4">
          {currentList.map((item, i) => (
            <li key={i} className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
              {item}
            </li>
          ))}
        </ul>
      );
    }

    return elements;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className={`
              fixed inset-4 md:inset-8 lg:inset-16 z-50
              ${isDarkMode 
                ? 'bg-slate-900/95 backdrop-blur-xl border border-slate-700/50' 
                : 'bg-white border border-slate-200'
              }
              rounded-2xl shadow-2xl overflow-hidden flex flex-col
            `}
          >
            {/* Header */}
            <div className={`
              flex items-start justify-between p-6 border-b
              ${isDarkMode ? 'border-slate-700/50' : 'border-slate-200'}
            `}>
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{article.icon}</span>
                  <div>
                    <h2 className={`
                      text-2xl md:text-3xl font-bold mb-2
                      ${isDarkMode ? 'text-white' : 'text-slate-900'}
                    `}>
                      {content.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm">
                      <span className={`
                        flex items-center gap-1
                        ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}
                      `}>
                        <TbClock size={16} />
                        {article.readTime} {language === 'tr' ? 'dakika okuma' : 'min read'}
                      </span>
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-semibold
                        ${isDarkMode 
                          ? 'bg-indigo-900/30 text-indigo-300' 
                          : 'bg-indigo-100 text-indigo-800'
                        }
                      `}>
                        {article.category}
                      </span>
                    </div>
                  </div>
                </div>
                {article.tags && article.tags.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    {article.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`
                          flex items-center gap-1 px-2 py-1 rounded-md text-xs
                          ${isDarkMode 
                            ? 'bg-slate-800 text-slate-300' 
                            : 'bg-slate-100 text-slate-600'
                          }
                        `}
                      >
                        <TbTag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={onClose}
                className={`
                  p-2 rounded-lg hover:bg-slate-800/50 transition-colors
                  ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}
                `}
              >
                <TbX size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert max-w-none">
                {formatContent(content.content)}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ArticleModal;

