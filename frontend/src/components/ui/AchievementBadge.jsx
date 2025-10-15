import { useState, useEffect } from 'react';

const AchievementBadge = ({ 
  achievement, 
  isUnlocked = false, 
  showAnimation = true,
  className = "" 
}) => {
  const [showPopAnimation, setShowPopAnimation] = useState(false);

  useEffect(() => {
    if (isUnlocked && showAnimation) {
      setShowPopAnimation(true);
      const timer = setTimeout(() => setShowPopAnimation(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isUnlocked, showAnimation]);

  return (
    <div 
      className={`
        relative group cursor-pointer transition-all duration-300
        ${isUnlocked 
          ? 'opacity-100 scale-100' 
          : 'opacity-50 scale-95'
        }
        ${showPopAnimation 
          ? 'animate-bounce scale-110' 
          : ''
        }
        ${className}
      `}
    >
      {/* Achievement Icon */}
      <div className={`
        w-16 h-16 rounded-full flex items-center justify-center text-2xl
        transition-all duration-300
        ${isUnlocked 
          ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/25' 
          : 'bg-gray-300 dark:bg-gray-600'
        }
        ${showPopAnimation 
          ? 'shadow-xl shadow-yellow-500/50' 
          : ''
        }
      `}>
        {isUnlocked ? (
          <span className="text-white drop-shadow-sm">
            {achievement.icon}
          </span>
        ) : (
          <span className="text-gray-500 dark:text-gray-400">
            🔒
          </span>
        )}
      </div>

      {/* Achievement Info */}
      <div className="mt-2 text-center">
        <h4 className={`
          text-sm font-semibold transition-colors duration-300
          ${isUnlocked 
            ? 'text-slate-900 dark:text-white' 
            : 'text-gray-500 dark:text-gray-400'
          }
        `}>
          {achievement.title}
        </h4>
        <p className={`
          text-xs mt-1 transition-colors duration-300
          ${isUnlocked 
            ? 'text-slate-600 dark:text-slate-300' 
            : 'text-gray-400 dark:text-gray-500'
          }
        `}>
          {achievement.description}
        </p>
        {achievement.reward && (
          <div className="mt-1 text-xs font-medium text-yellow-600 dark:text-yellow-400">
            +{achievement.reward} XP
          </div>
        )}
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 dark:bg-slate-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
        {achievement.tooltip}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900 dark:border-t-slate-700"></div>
      </div>
    </div>
  );
};

export default AchievementBadge;
