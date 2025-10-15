// Gerçek Quest Verileri
export const questDatabase = [
  {
    id: 'stellar-fundamentals',
    name: 'Stellar Temelleri',
    description: 'Stellar blockchain\'in temel kavramlarını öğrenin ve ilk işlemlerinizi gerçekleştirin. Bu quest ile Stellar ekosisteminin temellerini keşfedin.',
    category: 'blockchain',
    difficulty: 'beginner',
    rewardAmount: 100,
    timeEstimate: 15,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmStellarCert1',
    lessons: [
      {
        id: 'stellar-1',
        question: 'Stellar ağında işlemler hangi konsensüs algoritması ile doğrulanır?',
        choices: [
          'Proof of Work (PoW)',
          'Stellar Consensus Protocol (SCP)',
          'Proof of Stake (PoS)',
          'Delegated Proof of Stake (DPoS)'
        ],
        correctAnswer: 'Stellar Consensus Protocol (SCP)',
        explanation: 'SCP, Stellar\'ın benzersiz federated Byzantine agreement algoritmasıdır.'
      },
      {
        id: 'stellar-2',
        question: 'Stellar ağının yerel tokenı nedir?',
        choices: ['Ether', 'Bitcoin', 'XLM (Stellar Lumens)', 'Ripple'],
        correctAnswer: 'XLM (Stellar Lumens)',
        explanation: 'XLM, Stellar ağının yerel kripto para birimidir.'
      },
      {
        id: 'stellar-3',
        question: 'Stellar\'da "Anchors" nedir?',
        choices: [
          'Konsensüs düğümleri',
          'Geleneksel finansal sistem ile köprü kuran kuruluşlar',
          'Mining pool\'ları',
          'Smart contract\'lar'
        ],
        correctAnswer: 'Geleneksel finansal sistem ile köprü kuran kuruluşlar',
        explanation: 'Anchors, geleneksel para birimlerini Stellar ağına bağlayan güvenilir kuruluşlardır.'
      },
      {
        id: 'stellar-4',
        question: 'Stellar\'da minimum hesap bakiyesi nedir?',
        choices: ['0.5 XLM', '1 XLM', '2 XLM', '5 XLM'],
        correctAnswer: '2 XLM',
        explanation: 'Her Stellar hesabında en az 2 XLM bulunmalıdır (base reserve).'
      },
      {
        id: 'stellar-5',
        question: 'Stellar geliştiricileri için ana SDK hangi dillerde mevcuttur?',
        choices: [
          'Python, Java',
          'Go, JavaScript',
          'Rust, C++',
          'Python, JavaScript, Go, Java, C++'
        ],
        correctAnswer: 'Python, JavaScript, Go, Java, C++',
        explanation: 'Stellar, çoklu dil desteği ile geniş geliştirici topluluğuna hizmet verir.'
      }
    ],
    prerequisites: [],
    tags: ['blockchain', 'stellar', 'fundamentals'],
    estimatedTime: '15 dakika',
    completionRate: 78
  },
  {
    id: 'soroban-smart-contracts',
    name: 'Soroban Smart Contracts',
    description: 'Soroban platformunda akıllı kontrat geliştirme temellerini öğrenin. Rust ile Stellar\'da smart contract yazma becerilerini geliştirin.',
    category: 'smart-contracts',
    difficulty: 'intermediate',
    rewardAmount: 250,
    timeEstimate: 45,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmSorobanCert1',
    lessons: [
      {
        id: 'soroban-1',
        question: 'Soroban nedir?',
        choices: [
          'Bir Stellar cüzdanı',
          'Stellar üzerinde bir akıllı kontrat platformu',
          'Bir kripto para birimi',
          'Bir konsensüs algoritması'
        ],
        correctAnswer: 'Stellar üzerinde bir akıllı kontrat platformu',
        explanation: 'Soroban, Stellar ağı üzerinde çalışan Turing-complete smart contract platformudur.'
      },
      {
        id: 'soroban-2',
        question: 'Soroban akıllı kontratları hangi dilde yazılır?',
        choices: ['Solidity', 'Vyper', 'Rust', 'JavaScript'],
        correctAnswer: 'Rust',
        explanation: 'Soroban smart contract\'ları Rust programlama dili ile yazılır.'
      },
      {
        id: 'soroban-3',
        question: 'Soroban\'da "host functions" nedir?',
        choices: [
          'Ana konsensüs fonksiyonları',
          'Smart contract\'ların Stellar ağı ile etkileşim kurmasını sağlayan fonksiyonlar',
          'Mining fonksiyonları',
          'Wallet bağlantı fonksiyonları'
        ],
        correctAnswer: 'Smart contract\'ların Stellar ağı ile etkileşim kurmasını sağlayan fonksiyonlar',
        explanation: 'Host functions, smart contract\'ların Stellar ledger\'ı ile güvenli etkileşim kurmasını sağlar.'
      },
      {
        id: 'soroban-4',
        question: 'Soroban\'da "storage" nasıl çalışır?',
        choices: [
          'Global state olarak',
          'Contract bazlı izole storage',
          'Shared storage',
          'Memory-only storage'
        ],
        correctAnswer: 'Contract bazlı izole storage',
        explanation: 'Her contract kendi storage alanına sahiptir ve diğer contract\'lardan izole edilmiştir.'
      }
    ],
    prerequisites: ['stellar-fundamentals'],
    tags: ['smart-contracts', 'soroban', 'rust', 'development'],
    estimatedTime: '45 dakika',
    completionRate: 45
  },
  {
    id: 'defi-protocols',
    name: 'DeFi Protokolleri',
    description: 'Stellar ekosistemindeki DeFi protokollerini keşfedin ve kullanın. AMM, lending ve yield farming konularını öğrenin.',
    category: 'defi',
    difficulty: 'intermediate',
    rewardAmount: 300,
    timeEstimate: 30,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmDeFiCert1',
    lessons: [
      {
        id: 'defi-1',
        question: 'Merkeziyetsiz finans (DeFi) ne anlama gelir?',
        choices: [
          'Geleneksel bankacılık',
          'Blockchain tabanlı finansal hizmetler',
          'Merkezi borsalar',
          'Devlet destekli para birimleri'
        ],
        correctAnswer: 'Blockchain tabanlı finansal hizmetler',
        explanation: 'DeFi, merkezi kurumlara ihtiyaç duymadan blockchain üzerinde çalışan finansal hizmetlerdir.'
      },
      {
        id: 'defi-2',
        question: 'Stellar\'da en popüler AMM protokolü nedir?',
        choices: ['Uniswap', 'StellarSwap', 'PancakeSwap', 'SushiSwap'],
        correctAnswer: 'StellarSwap',
        explanation: 'StellarSwap, Stellar ekosisteminin ana AMM protokolüdür.'
      },
      {
        id: 'defi-3',
        question: 'DeFi\'de "yield farming" nedir?',
        choices: [
          'Tarım arazisi yönetimi',
          'Likidite sağlayarak token ödülleri kazanma',
          'Kripto madenciliği',
          'Staking işlemi'
        ],
        correctAnswer: 'Likidite sağlayarak token ödülleri kazanma',
        explanation: 'Yield farming, likidite pool\'larına fon sağlayarak ödül token\'ları kazanma stratejisidir.'
      },
      {
        id: 'defi-4',
        question: 'DeFi\'de "impermanent loss" nedir?',
        choices: [
          'Kalıcı fon kaybı',
          'Likidite sağlarken token fiyat değişimlerinden kaynaklanan kayıp',
          'Hack kaybı',
          'Gas fee kaybı'
        ],
        correctAnswer: 'Likidite sağlarken token fiyat değişimlerinden kaynaklanan kayıp',
        explanation: 'Impermanent loss, AMM pool\'larında likidite sağlarken token fiyat değişimlerinden kaynaklanan geçici kayıptır.'
      }
    ],
    prerequisites: ['stellar-fundamentals'],
    tags: ['defi', 'amm', 'yield-farming', 'liquidity'],
    estimatedTime: '30 dakika',
    completionRate: 32
  },
  {
    id: 'nft-ecosystem',
    name: 'NFT Ekosistemi',
    description: 'Stellar üzerinde NFT\'lerin nasıl oluşturulduğunu, satıldığını ve kullanıldığını öğrenin. NFT marketplace\'lerini keşfedin.',
    category: 'nft',
    difficulty: 'intermediate',
    rewardAmount: 200,
    timeEstimate: 25,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmNFTCert1',
    lessons: [
      {
        id: 'nft-1',
        question: 'NFT\'nin açılımı nedir?',
        choices: [
          'Non-Fungible Token',
          'New Financial Technology',
          'Network File Transfer',
          'Next Future Technology'
        ],
        correctAnswer: 'Non-Fungible Token',
        explanation: 'NFT, benzersiz ve değiştirilemez dijital varlıkları temsil eden token\'lardır.'
      },
      {
        id: 'nft-2',
        question: 'Stellar\'da NFT\'ler hangi standarda göre oluşturulur?',
        choices: ['ERC-721', 'ERC-1155', 'SEP-005', 'Stellar NFT Standard'],
        correctAnswer: 'SEP-005',
        explanation: 'SEP-005, Stellar\'ın NFT standardıdır.'
      },
      {
        id: 'nft-3',
        question: 'NFT\'lerin "metadata"\'sı nerede saklanır?',
        choices: [
          'Blockchain\'de',
          'IPFS\'de',
          'Merkezi sunucularda',
          'Local storage\'da'
        ],
        correctAnswer: 'IPFS\'de',
        explanation: 'NFT metadata\'ları genellikle merkeziyetsiz IPFS ağında saklanır.'
      }
    ],
    prerequisites: ['stellar-fundamentals'],
    tags: ['nft', 'digital-assets', 'marketplace', 'metadata'],
    estimatedTime: '25 dakika',
    completionRate: 28
  },
  {
    id: 'advanced-stellar',
    name: 'İleri Seviye Stellar',
    description: 'Stellar\'ın gelişmiş özelliklerini öğrenin. Multi-sig, path payments ve complex transactions konularını keşfedin.',
    category: 'blockchain',
    difficulty: 'advanced',
    rewardAmount: 500,
    timeEstimate: 60,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmAdvancedCert1',
    lessons: [
      {
        id: 'advanced-1',
        question: 'Stellar\'da "multi-signature" nedir?',
        choices: [
          'Çoklu imza gerektiren işlemler',
          'Çoklu token transferi',
          'Çoklu hesap yönetimi',
          'Çoklu network bağlantısı'
        ],
        correctAnswer: 'Çoklu imza gerektiren işlemler',
        explanation: 'Multi-sig, bir işlemin onaylanması için birden fazla imza gerektiren güvenlik mekanizmasıdır.'
      },
      {
        id: 'advanced-2',
        question: 'Stellar\'da "path payment" nedir?',
        choices: [
          'Direkt ödeme',
          'Farklı asset\'ler arasında otomatik dönüşüm yapan ödeme',
          'Batch ödeme',
          'Scheduled ödeme'
        ],
        correctAnswer: 'Farklı asset\'ler arasında otomatik dönüşüm yapan ödeme',
        explanation: 'Path payment, alıcının istediği asset\'i, göndericinin sahip olduğu asset\'ten otomatik olarak dönüştürerek gönderir.'
      },
      {
        id: 'advanced-3',
        question: 'Stellar\'da "operation" ve "transaction" arasındaki fark nedir?',
        choices: [
          'Aynı şeyler',
          'Transaction birden fazla operation içerebilir',
          'Operation birden fazla transaction içerebilir',
          'Farklı network\'lerde çalışırlar'
        ],
        correctAnswer: 'Transaction birden fazla operation içerebilir',
        explanation: 'Bir transaction içinde birden fazla operation bulunabilir ve hepsi atomik olarak işlenir.'
      }
    ],
    prerequisites: ['stellar-fundamentals', 'soroban-smart-contracts'],
    tags: ['advanced', 'multi-sig', 'path-payment', 'complex-transactions'],
    estimatedTime: '60 dakika',
    completionRate: 15
  }
];

// Quest kategorileri
export const questCategories = [
  { id: 'all', name: 'Tümü', icon: '📚', color: 'slate' },
  { id: 'blockchain', name: 'Blockchain', icon: '⛓️', color: 'blue' },
  { id: 'smart-contracts', name: 'Smart Contracts', icon: '🤖', color: 'purple' },
  { id: 'defi', name: 'DeFi', icon: '💰', color: 'green' },
  { id: 'nft', name: 'NFT', icon: '🎨', color: 'pink' }
];

// Zorluk seviyeleri
export const difficultyLevels = {
  beginner: { 
    name: 'Başlangıç', 
    color: 'green', 
    icon: '🟢',
    description: 'Temel kavramlar ve basit uygulamalar'
  },
  intermediate: { 
    name: 'Orta', 
    color: 'yellow', 
    icon: '🟡',
    description: 'Orta seviye teknik bilgi gerektirir'
  },
  advanced: { 
    name: 'İleri', 
    color: 'red', 
    icon: '🔴',
    description: 'Gelişmiş teknik bilgi ve deneyim gerektirir'
  }
};

// Kullanıcı istatistikleri (mock data)
export const mockUserStats = {
  totalTokens: 1250,
  completedQuests: 3,
  inProgressQuests: 2,
  totalQuests: 5,
  certificates: 3,
  level: 2,
  xp: 850,
  xpToNextLevel: 150,
  streak: 7,
  totalTimeSpent: 180 // dakika
};

// Kullanıcı progress verileri (mock data)
export const mockUserProgress = {
  'stellar-fundamentals': {
    currentStep: 3,
    totalSteps: 5,
    progress: 60,
    completed: false,
    startedAt: '2024-01-15T10:00:00Z',
    lastAccessed: '2024-01-15T14:30:00Z'
  },
  'soroban-smart-contracts': {
    currentStep: 1,
    totalSteps: 4,
    progress: 25,
    completed: false,
    startedAt: '2024-01-16T09:00:00Z',
    lastAccessed: '2024-01-16T09:15:00Z'
  },
  'defi-protocols': {
    currentStep: 0,
    totalSteps: 4,
    progress: 0,
    completed: false,
    startedAt: null,
    lastAccessed: null
  }
};

// Kullanıcı sertifikaları (mock data)
export const mockUserCertificates = [
  {
    id: 'cert-1',
    questId: 'stellar-fundamentals',
    questName: 'Stellar Temelleri',
    earnedAt: '2024-01-15T16:00:00Z',
    nftUrl: 'https://ipfs.io/ipfs/QmStellarCert1',
    rarity: 'common'
  }
];
