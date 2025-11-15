import { useState, useEffect } from 'react';
import { aiService } from '../../../services/aiService';
import { useLanguage } from '../../../context/LanguageContext';
import { useToken } from '../../../context/TokenContext';
import { useQuest } from '../../../context/QuestContext';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';

/**
 * Learning Recommendations Component
 * 
 * AI-powered personalized learning recommendations based on user progress.
 * Integrates with Huawei Cloud LLM via backend API.
 */
const LearningRecommendations = ({ userAddress, isDemoMode = false }) => {
  const { t } = useLanguage();
  const { tokenData } = useToken();
  const { userStats, userProgress } = useQuest();
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRecommendations();
  }, [userAddress, tokenData.completedQuests]);

  const loadRecommendations = async () => {
    setLoading(true);
    setError(null);

    try {
      // Build context from user progress
      const context = {
        completedQuests: tokenData.completedQuests || 0,
        totalEarned: tokenData.totalEarned || 0,
        userStats: userStats || {},
        isDemoMode
      };

      const prompt = 'Based on my learning progress, what should I learn next?';
      const result = await aiService.getRecommendations(prompt, context, userAddress);

      setRecommendations(result.response);
    } catch (err) {
      console.error('[Learning Recommendations] Error:', err);
      setError(err.message || 'Failed to load recommendations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-2xl p-4 sm:p-6 border border-indigo-200 dark:border-indigo-700 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-xl">
            🎯
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              AI Learning Recommendations
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Powered by Huawei Cloud AI
            </p>
          </div>
        </div>
        <Button
          onClick={loadRecommendations}
          disabled={loading}
          className="px-3 py-1.5 text-xs bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg disabled:opacity-50"
        >
          {loading ? '...' : '🔄'}
        </Button>
      </div>

      {/* Content */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            <span className="text-sm text-slate-600 dark:text-slate-400 ml-2">
              Analyzing your progress...
            </span>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
          <p className="text-sm text-red-800 dark:text-red-200">
            {error}
          </p>
          <Button
            onClick={loadRecommendations}
            className="mt-2 px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Try Again
          </Button>
        </div>
      )}

      {!loading && !error && recommendations && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
              {recommendations}
            </p>
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                Completed Quests
              </div>
              <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                {tokenData.completedQuests || 0}
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                Total Earned
              </div>
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {tokenData.totalEarned || 0} CQT
              </div>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && !recommendations && (
        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
          <div className="text-4xl mb-3">💡</div>
          <p className="text-sm">
            Click refresh to get personalized learning recommendations!
          </p>
        </div>
      )}
    </div>
  );
};

export default LearningRecommendations;

