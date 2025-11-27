import { useContext } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useToken } from '../context/TokenContext';
import { WalletContext } from '../context/WalletContext';
import Web3Hero from '../components/web3-portal/Web3Hero';
import Web3Sidebar from '../components/web3-portal/Web3Sidebar';
import Web3Card from '../components/web3-portal/Web3Card';

const LearnWeb3 = ({ onPageChange }) => {
  const { t } = useLanguage();
  const { tokenData } = useToken();
  const { publicKey, isDemoMode } = useContext(WalletContext);

  // Articles/Lessons data
  const articles = [
    {
      id: 1,
      title: 'DeFi Liquidity Pools: Temel Kavramlar',
      description: 'Merkezi olmayan finans ekosisteminde likidite havuzlarının nasıl çalıştığını öğrenin. AMM protokollerini keşfedin ve token takas mekanizmalarını anlayın.',
      duration: '15 dk',
      tokenReward: 25,
      category: 'defi',
      difficulty: 'beginner'
    },
    {
      id: 2,
      title: 'Smart Contract Security: Reentrancy Saldırıları',
      description: 'Akıllı sözleşmelerdeki güvenlik açıklarını öğrenin. Reentrancy saldırılarını nasıl önleyeceğinizi ve güvenli kod yazma pratiklerini keşfedin.',
      duration: '25 dk',
      tokenReward: 30,
      category: 'smartcontract',
      difficulty: 'intermediate'
    },
    {
      id: 3,
      title: 'NFT Metadata ve IPFS Entegrasyonu',
      description: 'NFT metadata standartlarını öğrenin, IPFS ile merkezi olmayan depolama çözümlerini keşfedin ve metadata yapılarını anlayın.',
      duration: '20 dk',
      tokenReward: 28,
      category: 'nft',
      difficulty: 'beginner'
    },
    {
      id: 4,
      title: 'Stellar Soroban: Smart Contract Platform',
      description: 'Stellar blockchain üzerinde çalışan Soroban akıllı sözleşme platformunu keşfedin. Rust ile kontrat yazma ve deploy etme süreçlerini öğrenin.',
      duration: '30 dk',
      tokenReward: 35,
      category: 'smartcontract',
      difficulty: 'advanced'
    },
    {
      id: 5,
      title: 'Yield Farming Stratejileri ve Risk Yönetimi',
      description: 'Yield farming mekanizmalarını öğrenin, farklı stratejileri karşılaştırın ve risk yönetimi tekniklerini keşfedin.',
      duration: '22 dk',
      tokenReward: 30,
      category: 'defi',
      difficulty: 'intermediate'
    },
    {
      id: 6,
      title: 'Web3 Wallet Security: Best Practices',
      description: 'Web3 cüzdanlarınızı nasıl güvende tutacağınızı öğrenin. Seed phrase yönetimi, multi-sig cüzdanlar ve güvenlik pratikleri.',
      duration: '18 dk',
      tokenReward: 25,
      category: 'security',
      difficulty: 'beginner'
    },
    {
      id: 7,
      title: 'AMM (Automated Market Maker) Algoritmaları',
      description: 'Uniswap, Curve ve diğer AMM protokollerinin matematiksel temellerini öğrenin. Constant product formula ve farklı bonding curve türlerini keşfedin.',
      duration: '28 dk',
      tokenReward: 32,
      category: 'defi',
      difficulty: 'advanced'
    },
    {
      id: 8,
      title: 'ERC-721 vs ERC-1155: NFT Standartları Karşılaştırması',
      description: 'Ethereum NFT standartlarını karşılaştırın. Hangi standardın ne zaman kullanılacağını öğrenin ve pratik uygulama örneklerini inceleyin.',
      duration: '20 dk',
      tokenReward: 27,
      category: 'nft',
      difficulty: 'intermediate'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section - Full Width */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Web3Hero onPageChange={onPageChange} />
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          {/* Left Column - Articles (70%) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {t('portal.section.title')}
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  {t('portal.section.subtitle')}
                </p>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="space-y-6">
              {articles.map((article) => (
                <Web3Card
                  key={article.id}
                  title={article.title}
                  description={article.description}
                  duration={article.duration}
                  tokenReward={article.tokenReward}
                  category={article.category}
                  difficulty={article.difficulty}
                />
              ))}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center pt-6">
              <button 
                onClick={() => onPageChange('quests')}
                className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-700"
              >
                {t('portal.loadMore')}
              </button>
            </div>
          </div>

          {/* Right Column - Sidebar (30%) */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <Web3Sidebar 
                tokenBalance={tokenData?.totalBalance || 0}
                isConnected={!!(publicKey || isDemoMode)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnWeb3;

