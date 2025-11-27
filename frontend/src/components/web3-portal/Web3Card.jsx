import { Link } from 'react-router-dom';
import { 
  TbClock, 
  TbCoins, 
  TbArrowRight,
  TbBook,
  TbCode,
  TbWallet,
  TbShield,
  TbFlame
} from 'react-icons/tb';
import { useLanguage } from '../../context/LanguageContext';
import { Card, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

/**
 * Web3Card Component
 * A list item component for articles/lessons with image on left, content on right
 */
const Web3Card = ({ 
  articleId,
  title, 
  description, 
  duration, 
  tokenReward = 20,
  category,
  image,
  difficulty = 'beginner'
}) => {
  const { t } = useLanguage();
  // Icon mapping for categories
  const categoryIcons = {
    defi: TbWallet,
    smartcontract: TbCode,
    nft: TbBook,
    security: TbShield,
    default: TbFlame
  };

  const CategoryIcon = categoryIcons[category] || categoryIcons.default;

  // Difficulty colors
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };

  const difficultyLabels = {
    beginner: t('portal.card.difficulty.beginner'),
    intermediate: t('portal.card.difficulty.intermediate'),
    advanced: t('portal.card.difficulty.advanced')
  };

  const articleUrl = `/web3-article/${articleId}`;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 cursor-pointer">
      <Link to={articleUrl} className="block">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Image Section - Left */}
          <div className="relative w-full sm:w-48 h-48 sm:h-auto bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden flex-shrink-0">
            {/* Placeholder gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/80 via-purple-600/80 to-pink-600/80"></div>
            
            {/* Category Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-6 bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/30">
                <CategoryIcon className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Difficulty Badge */}
            <div className="absolute top-3 left-3">
              <Badge 
                variant="default" 
                size="sm"
                className={difficultyColors[difficulty] || difficultyColors.beginner}
              >
                {difficultyLabels[difficulty] || difficultyLabels.beginner}
              </Badge>
            </div>

            {/* Token Reward Badge */}
            <div className="absolute top-3 right-3">
              <Badge 
                variant="gradient" 
                size="sm"
                className="flex items-center gap-1"
              >
                <TbCoins className="w-3 h-3" />
                +{tokenReward}
              </Badge>
            </div>
          </div>

          {/* Content Section - Right */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              {/* Category */}
              <div className="flex items-center gap-2 mb-3">
                <CategoryIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                  {category || 'Web3'}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                {description}
              </p>

              {/* Meta Information */}
              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                <div className="flex items-center gap-1.5">
                  <TbClock className="w-4 h-4" />
                  <span>{duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TbCoins className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                    +{tokenReward} {t('portal.card.token')}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 font-semibold text-sm">
                {t('portal.card.readMore')}
                <TbArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      </Link>
    </Card>
  );
};

export default Web3Card;

