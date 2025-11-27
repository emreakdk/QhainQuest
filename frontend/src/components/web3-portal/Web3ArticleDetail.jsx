import { useParams, useNavigate } from 'react-router-dom';
import { TbArrowLeft, TbClock, TbUser, TbCalendar, TbCoins } from 'react-icons/tb';
import { useLanguage } from '../../context/LanguageContext';
import { getArticleById } from '../../data/web3ArticlesData';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

/**
 * Web3ArticleDetail Component
 * Displays detailed article view with full content
 */
const Web3ArticleDetail = ({ onPageChange }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const article = getArticleById(id);

  // If article not found
  if (!article) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Article Not Found
          </h1>
          <Button onClick={() => navigate('/learn-web3')}>
            Go Back to Learning Portal
          </Button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    // Navigate back to learn-web3 page
    navigate('/learn-web3');
    if (onPageChange) {
      onPageChange('learn-web3');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Difficulty colors
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };

  // Dummy rich content - This would typically come from a CMS or markdown
  const renderContent = () => {
    return (
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2>{t('portal.article.content.intro')}</h2>
        <p>{t(`portal.article.${id}.content.intro`) || t('portal.article.content.dummy.intro')}</p>
        
        <h3>{t('portal.article.content.section1.title') || 'Key Concepts'}</h3>
        <p>{t(`portal.article.${id}.content.section1`) || t('portal.article.content.dummy.section1')}</p>
        
        <ul>
          <li>{t('portal.article.content.dummy.list1') || 'Understanding the fundamentals'}</li>
          <li>{t('portal.article.content.dummy.list2') || 'Practical implementation strategies'}</li>
          <li>{t('portal.article.content.dummy.list3') || 'Best practices and common pitfalls'}</li>
        </ul>
        
        <h3>{t('portal.article.content.section2.title') || 'Advanced Topics'}</h3>
        <p>{t(`portal.article.${id}.content.section2`) || t('portal.article.content.dummy.section2')}</p>
        
        <h3>{t('portal.article.content.conclusion.title') || 'Conclusion'}</h3>
        <p>{t(`portal.article.${id}.content.conclusion`) || t('portal.article.content.dummy.conclusion')}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Back Button - Fixed/Sticky */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <TbArrowLeft className="w-5 h-5" />
            <span>{t('portal.article.back') || 'Back to Learning Portal'}</span>
          </Button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/80 via-purple-600/80 to-pink-600/80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl sm:text-7xl md:text-8xl text-white/20 font-black">
            {t(article.titleKey).charAt(0)}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <article className="max-w-3xl mx-auto">
          {/* Title & Badges */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <Badge
                variant="default"
                size="sm"
                className={difficultyColors[article.difficulty] || difficultyColors.beginner}
              >
                {t(`portal.card.difficulty.${article.difficulty}`)}
              </Badge>
              <Badge variant="gradient" size="sm" className="flex items-center gap-1">
                <TbCoins className="w-3 h-3" />
                +{article.tokenReward} {t('portal.card.token')}
              </Badge>
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                {article.category || 'Web3'}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              {t(article.titleKey)}
            </h1>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <TbUser className="w-5 h-5" />
              <span className="font-medium">{article.author}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <TbCalendar className="w-5 h-5" />
              <span>{formatDate(article.publishDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <TbClock className="w-5 h-5" />
              <span>{article.duration} {t('portal.duration.min')}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
              {t(article.descriptionKey)}
            </p>
          </div>

          {/* Main Article Content */}
          <div className="article-content text-slate-700 dark:text-slate-300 leading-relaxed space-y-6">
            {renderContent()}
          </div>

          {/* CTA Section */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {t('portal.article.cta.title') || 'Ready to Start Learning?'}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {t('portal.article.cta.description') || 'Complete this lesson and earn tokens!'}
              </p>
              <Button
                onClick={() => onPageChange && onPageChange('quests')}
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                {t('portal.article.cta.button') || 'Start Quest'}
              </Button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Web3ArticleDetail;

