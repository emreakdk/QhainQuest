import { useParams, useNavigate, Link } from 'react-router-dom';
import { TbArrowLeft, TbClock } from 'react-icons/tb';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { web3KnowledgeBase } from '../data/web3KnowledgeData';

/**
 * ArticleDetail Component
 * Bundle News App tarzı article detail sayfası
 */
const ArticleDetail = ({ onPageChange }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();

  // Find article by ID
  const article = web3KnowledgeBase.find(a => a.id === id);

  // If article not found
  if (!article) {
    return (
      <div className={`
        min-h-screen flex items-center justify-center
        ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}
      `}>
        <div className="text-center px-4">
          <h1 className={`
            text-3xl font-bold mb-4
            ${isDarkMode ? 'text-white' : 'text-slate-900'}
          `}>
            {language === 'tr' ? 'Makale Bulunamadı' : 'Article Not Found'}
          </h1>
          <p className={`
            text-lg mb-6
            ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}
          `}>
            {language === 'tr' 
              ? 'Aradığınız makale bulunamadı.'
              : 'The article you are looking for could not be found.'
            }
          </p>
          <Link
            to="/learn-web3"
            className={`
              inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
              transition-colors
              ${isDarkMode 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }
            `}
          >
            <TbArrowLeft size={20} />
            {language === 'tr' ? 'Feed\'e Dön' : 'Back to Feed'}
          </Link>
        </div>
      </div>
    );
  }

  const content = article[language] || article.en;
  const categoryColors = {
    fundamentals: { light: 'bg-blue-100 text-blue-800', dark: 'bg-blue-900/30 text-blue-300' },
    stellar: { light: 'bg-purple-100 text-purple-800', dark: 'bg-purple-900/30 text-purple-300' },
    huawei: { light: 'bg-red-100 text-red-800', dark: 'bg-red-900/30 text-red-300' },
    security: { light: 'bg-green-100 text-green-800', dark: 'bg-green-900/30 text-green-300' },
    'smart-contracts': { light: 'bg-orange-100 text-orange-800', dark: 'bg-orange-900/30 text-orange-300' }
  };

  const categoryColor = categoryColors[article.category] || categoryColors.fundamentals;

  const handleBack = () => {
    navigate('/learn-web3');
    if (onPageChange) {
      onPageChange('learn-web3');
    }
  };

  // Format content - convert markdown-like content to HTML
  const formatContent = (contentText) => {
    // Simple markdown to HTML conversion
    let html = contentText
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold mt-10 mb-6 text-slate-900 dark:text-white">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mt-12 mb-8 text-slate-900 dark:text-white">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      // Lists
      .replace(/^- (.*$)/gim, '<li class="ml-4 mb-2">$1</li>')
      // Paragraphs
      .split('\n\n')
      .map(para => {
        if (!para.trim()) return '';
        if (para.startsWith('<h') || para.startsWith('<li') || para.startsWith('<ul')) {
          return para;
        }
        return `<p class="mb-4 text-slate-700 dark:text-slate-300 leading-relaxed">${para.trim()}</p>`;
      })
      .join('');

    // Wrap consecutive <li> in <ul>
    html = html.replace(/(<li[^>]*>.*?<\/li>\n?)+/g, (match) => {
      return `<ul class="list-disc list-inside mb-6 space-y-2 text-slate-700 dark:text-slate-300">${match}</ul>`;
    });

    return html;
  };

  return (
    <div className={`
      min-h-screen
      ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}
    `}>
      {/* Hero Image - Full Width */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
        {article.image ? (
          <img
            src={article.image}
            alt={content.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`
            w-full h-full
            bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
          `} />
        )}
        <div className={`
          absolute inset-0
          ${isDarkMode ? 'bg-slate-950/40' : 'bg-black/20'}
        `} />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16 max-w-4xl">
        <div className="flex gap-4 lg:gap-8">
          {/* Back Button - Sticky like sidebar */}
          <div className="flex-shrink-0 -ml-4 lg:-ml-8">
            <div className="sticky top-24 h-fit">
              <button
                onClick={handleBack}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer
                  transition-all duration-200
                  ${isDarkMode 
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800/90' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/90'
                  }
                `}
              >
                <TbArrowLeft size={20} />
                <span className="font-medium">
                  {language === 'tr' ? 'Feed\'e Dön' : 'Back to Feed'}
                </span>
              </button>
            </div>
          </div>

          {/* Article Content */}
          <article className="flex-1 min-w-0">
            {/* Category Badge */}
            <div className="mb-4">
              <span className={`
                inline-block px-3 py-1 rounded-full text-xs font-semibold
                ${isDarkMode ? categoryColor.dark : categoryColor.light}
              `}>
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className={`
              text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight
              ${isDarkMode ? 'text-white' : 'text-slate-900'}
            `}>
              {content.title}
            </h1>

            {/* Metadata */}
            <div className={`
              flex flex-wrap items-center gap-4 sm:gap-6 mb-8 pb-8 border-b
              ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}
            `}>
            <div className={`
              flex items-center gap-2
              ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}
            `}>
              <TbClock size={18} />
              <span className="text-sm font-medium">
                {article.readTime} {language === 'tr' ? 'dakika' : 'min'} read
              </span>
            </div>
            {article.tags && article.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                {article.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className={`
                      px-2 py-1 rounded-md text-xs font-medium
                      ${isDarkMode 
                        ? 'bg-slate-800 text-slate-300' 
                        : 'bg-slate-100 text-slate-600'
                      }
                    `}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

            {/* Summary */}
            <div className="mb-8">
              <p className={`
                text-xl leading-relaxed
                ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}
              `}>
                {content.summary}
              </p>
            </div>

            {/* Article Content */}
            <div 
              className={`
                prose prose-slate dark:prose-invert max-w-none
                ${isDarkMode ? 'prose-invert' : ''}
              `}
              dangerouslySetInnerHTML={{ __html: formatContent(content.content) }}
            />
          </article>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;

