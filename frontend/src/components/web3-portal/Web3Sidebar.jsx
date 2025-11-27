import { useState } from 'react';
import { 
  TbRobot, 
  TbTrendingUp, 
  TbWallet, 
  TbCoins,
  TbSparkles,
  TbSend,
  TbWifi
} from 'react-icons/tb';
import { useLanguage } from '../../context/LanguageContext';
import { Card, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

/**
 * Web3Sidebar Component
 * A sticky right-side menu with AI assistant, trending topics, and wallet status
 */
const Web3Sidebar = ({ tokenBalance = 0, isConnected = false }) => {
  const { t } = useLanguage();
  const [aiPrompt, setAiPrompt] = useState('');

  // Dummy data
  const trendingTopics = [
    { id: 1, title: 'DeFi Liquidity Pools', count: 1240 },
    { id: 2, title: 'Smart Contract Security', count: 892 },
    { id: 3, title: 'NFT Metadata Standards', count: 756 },
    { id: 4, title: 'Stellar Soroban', count: 634 },
    { id: 5, title: 'Yield Farming Basics', count: 521 },
  ];

  const handleAISubmit = (e) => {
    e.preventDefault();
    if (aiPrompt.trim()) {
      // TODO: Integrate with AI service
      console.log('AI Prompt:', aiPrompt);
      setAiPrompt('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Huawei AI Assistant Widget */}
      <Card className="relative overflow-hidden border-2 border-indigo-500/30 dark:border-indigo-400/30 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20">
        {/* Glowing Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl"></div>

        <CardContent className="relative z-10 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
              <TbRobot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {t('portal.sidebar.ai.title')}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {t('portal.sidebar.ai.powered')}
              </p>
            </div>
          </div>

          <form onSubmit={handleAISubmit} className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder={t('portal.sidebar.ai.placeholder')}
                className="w-full px-4 py-3 pr-12 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
              >
                <TbSend className="w-5 h-5" />
              </button>
            </div>
          </form>

          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              <TbSparkles className="w-3 h-3 inline mr-1" />
              {t('portal.sidebar.ai.footer')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Status */}
      <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-slate-200 dark:bg-slate-700 rounded-lg">
              <TbWallet className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              {t('portal.sidebar.wallet.title')}
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <TbCoins className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t('portal.sidebar.wallet.balance')}
                </span>
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                {Math.floor(tokenBalance) || 0}
              </span>
            </div>

            {isConnected && (
              <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                <TbWifi className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-medium text-indigo-700 dark:text-indigo-300">
                  {t('portal.sidebar.wallet.connected')}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
              <TbTrendingUp className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              {t('portal.sidebar.trending.title')}
            </h3>
          </div>

          <div className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <div
                key={topic.id}
                className="group p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                        #{index + 1}
                      </span>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {topic.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {topic.count} {t('portal.sidebar.trending.students')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-4 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
          >
            {t('portal.sidebar.trending.viewAll')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Web3Sidebar;

