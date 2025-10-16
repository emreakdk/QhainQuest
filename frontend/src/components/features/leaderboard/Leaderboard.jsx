import { useState, useEffect, useContext } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useQuest } from '../../../context/QuestContext';
import { WalletContext } from '../../../context/WalletContext';
import { Card, CardContent } from '../../ui/Card';
import Badge from '../../ui/Badge';
import Button from '../../ui/Button';

const Leaderboard = () => {
  const { t } = useLanguage();
  const { publicKey } = useContext(WalletContext);
  const { userStats } = useQuest();
  const [selectedPeriod, setSelectedPeriod] = useState('all-time');
  
  // Mock leaderboard data - component içinde tanımlanmalı
  const mockLeaderboard = [
    {
      rank: 1,
      address: "GABC...XYZ1",
      username: "BlockchainMaster",
      totalTokens: 2500,
      certificates: 8,
      completedQuests: 15,
      level: 10,
      isCurrentUser: false
    },
    {
      rank: 2,
      address: "GDEF...XYZ2",
      username: "SorobanExpert",
      totalTokens: 2200,
      certificates: 7,
      completedQuests: 13,
      level: 9,
      isCurrentUser: false
    },
    {
      rank: 3,
      address: "GHIJ...XYZ3",
      username: "DeFiHunter",
      totalTokens: 2000,
      certificates: 6,
      completedQuests: 12,
      level: 8,
      isCurrentUser: false
    },
    {
      rank: 4,
      address: "GKLM...XYZ4",
      username: "NFTCollector",
      totalTokens: 1800,
      certificates: 5,
      completedQuests: 11,
      level: 7,
      isCurrentUser: false
    },
    {
      rank: 5,
      address: "GNOP...XYZ5",
      username: "ChainExplorer",
      totalTokens: 1600,
      certificates: 4,
      completedQuests: 10,
      level: 6,
      isCurrentUser: false
    },
    {
      rank: 15,
      address: publicKey || "GQRS...XYZ6", // Current user
      username: "You",
      totalTokens: userStats?.totalTokens || 1250,
      certificates: Array.isArray(userStats?.certificates) ? userStats.certificates.length : (userStats?.certificates || 3),
      completedQuests: Array.isArray(userStats?.completedQuests) ? userStats.completedQuests.length : (userStats?.completedQuests || 8),
      level: userStats?.level || 5,
      isCurrentUser: true
    }
  ];
  
  const [leaderboard] = useState(mockLeaderboard);

  const periods = [
    { id: 'all-time', label: 'Tüm Zamanlar' },
    { id: 'monthly', label: 'Bu Ay' },
    { id: 'weekly', label: 'Bu Hafta' }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-600';
      case 2:
        return 'from-gray-300 to-gray-500';
      case 3:
        return 'from-orange-400 to-orange-600';
      default:
        return 'from-slate-400 to-slate-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          🏆 {t('nav.leaderboard')}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          En başarılı ChainQuest kullanıcılarıyla yarışın ve liderlik tablosunda yer alın.
        </p>
      </div>

      {/* Period Selector */}
      <div className="flex justify-center">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
          {periods.map(period => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                selectedPeriod === period.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {leaderboard.slice(0, 3).map((user, index) => (
          <Card key={user.rank} className={`relative overflow-hidden ${
            user.rank === 1 ? 'md:order-2 scale-110' : 
            user.rank === 2 ? 'md:order-1' : 'md:order-3'
          }`}>
            <CardContent className="p-6 text-center">
              {/* Rank Badge */}
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${getRankColor(user.rank)} flex items-center justify-center text-2xl font-bold text-white`}>
                {getRankIcon(user.rank)}
              </div>

              {/* User Info */}
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {user.username}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 font-mono">
                {user.address}
              </p>

              {/* Stats */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Token:</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {user.totalTokens.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Sertifika:</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {/* FIX: Rendered certificates count instead of the entire certificates object to prevent React error #31 */}
                    {Array.isArray(user.certificates) ? user.certificates.length : user.certificates}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Seviye:</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {user.level}
                  </span>
                </div>
              </div>

              {/* Level Badge */}
              <div className="mt-4">
                <Badge variant="primary">Seviye {user.level}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full Leaderboard */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {leaderboard.map((user, index) => (
              <div
                key={user.rank}
                className={`flex items-center space-x-4 p-4 rounded-lg transition-all ${
                  user.isCurrentUser
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-2 border-indigo-200 dark:border-indigo-700'
                    : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {/* Rank */}
                <div className="flex-shrink-0 w-12 text-center">
                  {user.rank <= 3 ? (
                    <span className="text-2xl">{getRankIcon(user.rank)}</span>
                  ) : (
                    <span className={`text-lg font-bold ${user.isCurrentUser ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}>
                      #{user.rank}
                    </span>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className={`font-semibold ${user.isCurrentUser ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-900 dark:text-white'}`}>
                        {user.username}
                        {user.isCurrentUser && (
                          <Badge variant="primary" size="sm" className="ml-2">
                            Sen
                          </Badge>
                        )}
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">
                        {user.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="hidden md:flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-medium text-slate-900 dark:text-white">
                      {user.totalTokens.toLocaleString()}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400">Token</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-slate-900 dark:text-white">
                      {/* FIX: Rendered certificates count instead of the entire certificates object to prevent React error #31 */}
                      {Array.isArray(user.certificates) ? user.certificates.length : user.certificates}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400">Sertifika</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-slate-900 dark:text-white">
                      {user.completedQuests}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400">Görev</div>
                  </div>
                </div>

                {/* Level Badge */}
                <div className="flex-shrink-0">
                  <Badge variant={user.isCurrentUser ? "primary" : "outline"}>
                    Seviye {user.level}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          Liderlik tablosunda yükselmek için daha fazla görev tamamlayın!
        </h3>
        <Button variant="primary" size="lg">
          Görevleri Keşfet
        </Button>
      </div>
    </div>
  );
};

export default Leaderboard;
