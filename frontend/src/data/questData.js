// Gerçek Quest Verileri
export const questDatabase = [
  {
    id: 'stellar-fundamentals',
    nameKey: 'quests.stellar_fundamentals.title',
    descriptionKey: 'quests.stellar_fundamentals.description',
    category: 'blockchain',
    difficulty: 'beginner',
    rewardAmount: 100,
    timeEstimate: 15,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmStellarCert1',
    lessons: [
      {
        id: 'stellar-1',
        questionKey: 'quests.stellar_fundamentals.q1.question',
        choices: [
          'quests.stellar_fundamentals.q1.option1',
          'quests.stellar_fundamentals.q1.option2',
          'quests.stellar_fundamentals.q1.option3',
          'quests.stellar_fundamentals.q1.option4'
        ],
        correctAnswerKey: 'quests.stellar_fundamentals.q1.option2',
        explanationKey: 'quests.stellar_fundamentals.q1.explanation'
      },
      {
        id: 'stellar-2',
        questionKey: 'quests.stellar_fundamentals.q2.question',
        choices: [
          'quests.stellar_fundamentals.q2.option1',
          'quests.stellar_fundamentals.q2.option2',
          'quests.stellar_fundamentals.q2.option3',
          'quests.stellar_fundamentals.q2.option4'
        ],
        correctAnswerKey: 'quests.stellar_fundamentals.q2.option3',
        explanationKey: 'quests.stellar_fundamentals.q2.explanation'
      },
      {
        id: 'stellar-3',
        questionKey: 'quests.stellar_fundamentals.q3.question',
        choices: [
          'quests.stellar_fundamentals.q3.option1',
          'quests.stellar_fundamentals.q3.option2',
          'quests.stellar_fundamentals.q3.option3',
          'quests.stellar_fundamentals.q3.option4'
        ],
        correctAnswerKey: 'quests.stellar_fundamentals.q3.option2',
        explanationKey: 'quests.stellar_fundamentals.q3.explanation'
      },
      {
        id: 'stellar-4',
        questionKey: 'quests.stellar_fundamentals.q4.question',
        choices: [
          'quests.stellar_fundamentals.q4.option1',
          'quests.stellar_fundamentals.q4.option2',
          'quests.stellar_fundamentals.q4.option3',
          'quests.stellar_fundamentals.q4.option4'
        ],
        correctAnswerKey: 'quests.stellar_fundamentals.q4.option3',
        explanationKey: 'quests.stellar_fundamentals.q4.explanation'
      },
      {
        id: 'stellar-5',
        questionKey: 'quests.stellar_fundamentals.q5.question',
        choices: [
          'quests.stellar_fundamentals.q5.option1',
          'quests.stellar_fundamentals.q5.option2',
          'quests.stellar_fundamentals.q5.option3',
          'quests.stellar_fundamentals.q5.option4'
        ],
        correctAnswerKey: 'quests.stellar_fundamentals.q5.option4',
        explanationKey: 'quests.stellar_fundamentals.q5.explanation'
      }
    ],
    prerequisites: [],
    tags: ['blockchain', 'stellar', 'fundamentals'],
    estimatedTime: '15 dakika',
    completionRate: 78
  },
  {
    id: 'soroban-smart-contracts',
    nameKey: 'quests.soroban_smart_contracts.title',
    descriptionKey: 'quests.soroban_smart_contracts.description',
    category: 'smart-contracts',
    difficulty: 'intermediate',
    rewardAmount: 250,
    timeEstimate: 45,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmSorobanCert1',
    lessons: [
      {
        id: 'soroban-1',
        questionKey: 'quests.soroban_smart_contracts.q1.question',
        choices: [
          'quests.soroban_smart_contracts.q1.option1',
          'quests.soroban_smart_contracts.q1.option2',
          'quests.soroban_smart_contracts.q1.option3',
          'quests.soroban_smart_contracts.q1.option4'
        ],
        correctAnswerKey: 'quests.soroban_smart_contracts.q1.option2',
        explanationKey: 'quests.soroban_smart_contracts.q1.explanation'
      },
      {
        id: 'soroban-2',
        questionKey: 'quests.soroban_smart_contracts.q2.question',
        choices: [
          'quests.soroban_smart_contracts.q2.option1',
          'quests.soroban_smart_contracts.q2.option2',
          'quests.soroban_smart_contracts.q2.option3',
          'quests.soroban_smart_contracts.q2.option4'
        ],
        correctAnswerKey: 'quests.soroban_smart_contracts.q2.option3',
        explanationKey: 'quests.soroban_smart_contracts.q2.explanation'
      },
      {
        id: 'soroban-3',
        questionKey: 'quests.soroban_smart_contracts.q3.question',
        choices: [
          'quests.soroban_smart_contracts.q3.option1',
          'quests.soroban_smart_contracts.q3.option2',
          'quests.soroban_smart_contracts.q3.option3',
          'quests.soroban_smart_contracts.q3.option4'
        ],
        correctAnswerKey: 'quests.soroban_smart_contracts.q3.option2',
        explanationKey: 'quests.soroban_smart_contracts.q3.explanation'
      },
      {
        id: 'soroban-4',
        questionKey: 'quests.soroban_smart_contracts.q4.question',
        choices: [
          'quests.soroban_smart_contracts.q4.option1',
          'quests.soroban_smart_contracts.q4.option2',
          'quests.soroban_smart_contracts.q4.option3',
          'quests.soroban_smart_contracts.q4.option4'
        ],
        correctAnswerKey: 'quests.soroban_smart_contracts.q4.option2',
        explanationKey: 'quests.soroban_smart_contracts.q4.explanation'
      },
      {
        id: 'soroban-5',
        questionKey: 'quests.soroban_smart_contracts.q5.question',
        choices: [
          'quests.soroban_smart_contracts.q5.option1',
          'quests.soroban_smart_contracts.q5.option2',
          'quests.soroban_smart_contracts.q5.option3',
          'quests.soroban_smart_contracts.q5.option4'
        ],
        correctAnswerKey: 'quests.soroban_smart_contracts.q5.option3',
        explanationKey: 'quests.soroban_smart_contracts.q5.explanation'
      }
    ],
    prerequisites: ['stellar-fundamentals'],
    tags: ['smart-contracts', 'soroban', 'rust', 'development'],
    estimatedTime: '45 dakika',
    completionRate: 45
  },
  {
    id: 'defi-protocols',
    nameKey: 'quests.defi_protocols.title',
    descriptionKey: 'quests.defi_protocols.description',
    category: 'defi',
    difficulty: 'intermediate',
    rewardAmount: 300,
    timeEstimate: 30,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmDeFiCert1',
    lessons: [
      {
        id: 'defi-1',
        questionKey: 'quests.defi_protocols.q1.question',
        choices: [
          'quests.defi_protocols.q1.option1',
          'quests.defi_protocols.q1.option2',
          'quests.defi_protocols.q1.option3',
          'quests.defi_protocols.q1.option4'
        ],
        correctAnswerKey: 'quests.defi_protocols.q1.option2',
        explanationKey: 'quests.defi_protocols.q1.explanation'
      },
      {
        id: 'defi-2',
        questionKey: 'quests.defi_protocols.q2.question',
        choices: [
          'quests.defi_protocols.q2.option1',
          'quests.defi_protocols.q2.option2',
          'quests.defi_protocols.q2.option3',
          'quests.defi_protocols.q2.option4'
        ],
        correctAnswerKey: 'quests.defi_protocols.q2.option2',
        explanationKey: 'quests.defi_protocols.q2.explanation'
      },
      {
        id: 'defi-3',
        questionKey: 'quests.defi_protocols.q3.question',
        choices: [
          'quests.defi_protocols.q3.option1',
          'quests.defi_protocols.q3.option2',
          'quests.defi_protocols.q3.option3',
          'quests.defi_protocols.q3.option4'
        ],
        correctAnswerKey: 'quests.defi_protocols.q3.option2',
        explanationKey: 'quests.defi_protocols.q3.explanation'
      },
      {
        id: 'defi-4',
        questionKey: 'quests.defi_protocols.q4.question',
        choices: [
          'quests.defi_protocols.q4.option1',
          'quests.defi_protocols.q4.option2',
          'quests.defi_protocols.q4.option3',
          'quests.defi_protocols.q4.option4'
        ],
        correctAnswerKey: 'quests.defi_protocols.q4.option2',
        explanationKey: 'quests.defi_protocols.q4.explanation'
      },
      {
        id: 'defi-5',
        questionKey: 'quests.defi_protocols.q5.question',
        choices: [
          'quests.defi_protocols.q5.option1',
          'quests.defi_protocols.q5.option2',
          'quests.defi_protocols.q5.option3',
          'quests.defi_protocols.q5.option4'
        ],
        correctAnswerKey: 'quests.defi_protocols.q5.option1',
        explanationKey: 'quests.defi_protocols.q5.explanation'
      }
    ],
    prerequisites: ['stellar-fundamentals'],
    tags: ['defi', 'amm', 'yield-farming', 'liquidity'],
    estimatedTime: '30 dakika',
    completionRate: 32
  },
  {
    id: 'nft-ecosystem',
    nameKey: 'quests.nft_ecosystem.title',
    descriptionKey: 'quests.nft_ecosystem.description',
    category: 'nft',
    difficulty: 'intermediate',
    rewardAmount: 200,
    timeEstimate: 25,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmNFTCert1',
    lessons: [
      {
        id: 'nft-1',
        questionKey: 'quests.nft_ecosystem.q1.question',
        choices: [
          'quests.nft_ecosystem.q1.option1',
          'quests.nft_ecosystem.q1.option2',
          'quests.nft_ecosystem.q1.option3',
          'quests.nft_ecosystem.q1.option4'
        ],
        correctAnswerKey: 'quests.nft_ecosystem.q1.option1',
        explanationKey: 'quests.nft_ecosystem.q1.explanation'
      },
      {
        id: 'nft-2',
        questionKey: 'quests.nft_ecosystem.q2.question',
        choices: [
          'quests.nft_ecosystem.q2.option1',
          'quests.nft_ecosystem.q2.option2',
          'quests.nft_ecosystem.q2.option3',
          'quests.nft_ecosystem.q2.option4'
        ],
        correctAnswerKey: 'quests.nft_ecosystem.q2.option3',
        explanationKey: 'quests.nft_ecosystem.q2.explanation'
      },
      {
        id: 'nft-3',
        questionKey: 'quests.nft_ecosystem.q3.question',
        choices: [
          'quests.nft_ecosystem.q3.option1',
          'quests.nft_ecosystem.q3.option2',
          'quests.nft_ecosystem.q3.option3',
          'quests.nft_ecosystem.q3.option4'
        ],
        correctAnswerKey: 'quests.nft_ecosystem.q3.option2',
        explanationKey: 'quests.nft_ecosystem.q3.explanation'
      },
      {
        id: 'nft-4',
        questionKey: 'quests.nft_ecosystem.q4.question',
        choices: [
          'quests.nft_ecosystem.q4.option1',
          'quests.nft_ecosystem.q4.option2',
          'quests.nft_ecosystem.q4.option3',
          'quests.nft_ecosystem.q4.option4'
        ],
        correctAnswerKey: 'quests.nft_ecosystem.q4.option1',
        explanationKey: 'quests.nft_ecosystem.q4.explanation'
      },
      {
        id: 'nft-5',
        questionKey: 'quests.nft_ecosystem.q5.question',
        choices: [
          'quests.nft_ecosystem.q5.option1',
          'quests.nft_ecosystem.q5.option2',
          'quests.nft_ecosystem.q5.option3',
          'quests.nft_ecosystem.q5.option4'
        ],
        correctAnswerKey: 'quests.nft_ecosystem.q5.option1',
        explanationKey: 'quests.nft_ecosystem.q5.explanation'
      }
    ],
    prerequisites: ['stellar-fundamentals'],
    tags: ['nft', 'digital-assets', 'marketplace', 'metadata'],
    estimatedTime: '25 dakika',
    completionRate: 28
  },
  {
    id: 'advanced-stellar',
    nameKey: 'quests.advanced_stellar.title',
    descriptionKey: 'quests.advanced_stellar.description',
    category: 'blockchain',
    difficulty: 'advanced',
    rewardAmount: 500,
    timeEstimate: 60,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmAdvancedCert1',
    lessons: [
      {
        id: 'advanced-1',
        questionKey: 'quests.advanced_stellar.q1.question',
        choices: [
          'quests.advanced_stellar.q1.option1',
          'quests.advanced_stellar.q1.option2',
          'quests.advanced_stellar.q1.option3',
          'quests.advanced_stellar.q1.option4'
        ],
        correctAnswerKey: 'quests.advanced_stellar.q1.option1',
        explanationKey: 'quests.advanced_stellar.q1.explanation'
      },
      {
        id: 'advanced-2',
        questionKey: 'quests.advanced_stellar.q2.question',
        choices: [
          'quests.advanced_stellar.q2.option1',
          'quests.advanced_stellar.q2.option2',
          'quests.advanced_stellar.q2.option3',
          'quests.advanced_stellar.q2.option4'
        ],
        correctAnswerKey: 'quests.advanced_stellar.q2.option2',
        explanationKey: 'quests.advanced_stellar.q2.explanation'
      },
      {
        id: 'advanced-3',
        questionKey: 'quests.advanced_stellar.q3.question',
        choices: [
          'quests.advanced_stellar.q3.option1',
          'quests.advanced_stellar.q3.option2',
          'quests.advanced_stellar.q3.option3',
          'quests.advanced_stellar.q3.option4'
        ],
        correctAnswerKey: 'quests.advanced_stellar.q3.option2',
        explanationKey: 'quests.advanced_stellar.q3.explanation'
      },
      {
        id: 'advanced-4',
        questionKey: 'quests.advanced_stellar.q4.question',
        choices: [
          'quests.advanced_stellar.q4.option1',
          'quests.advanced_stellar.q4.option2',
          'quests.advanced_stellar.q4.option3',
          'quests.advanced_stellar.q4.option4'
        ],
        correctAnswerKey: 'quests.advanced_stellar.q4.option1',
        explanationKey: 'quests.advanced_stellar.q4.explanation'
      },
      {
        id: 'advanced-5',
        questionKey: 'quests.advanced_stellar.q5.question',
        choices: [
          'quests.advanced_stellar.q5.option1',
          'quests.advanced_stellar.q5.option2',
          'quests.advanced_stellar.q5.option3',
          'quests.advanced_stellar.q5.option4'
        ],
        correctAnswerKey: 'quests.advanced_stellar.q5.option1',
        explanationKey: 'quests.advanced_stellar.q5.explanation'
      }
    ],
    prerequisites: ['stellar-fundamentals', 'soroban-smart-contracts'],
    tags: ['advanced', 'multi-sig', 'path-payment', 'complex-transactions'],
    estimatedTime: '60 dakika',
    completionRate: 15
  },
  
  // === YENİ QUEST 1: Blockchain Güvenliği ===
  {
    id: 'blockchain-security',
    nameKey: 'quests.blockchain_security.title',
    descriptionKey: 'quests.blockchain_security.description',
    category: 'blockchain',
    difficulty: 'intermediate',
    rewardAmount: 350,
    timeEstimate: 35,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmBlockchainSecurityCert',
    lessons: [
      {
        id: 'security-1',
        questionKey: 'quests.blockchain_security.q1.question',
        choices: [
          'quests.blockchain_security.q1.option1',
          'quests.blockchain_security.q1.option2',
          'quests.blockchain_security.q1.option3',
          'quests.blockchain_security.q1.option4',
          'quests.blockchain_security.q1.option5'
        ],
        correctAnswerKey: 'quests.blockchain_security.q1.option3',
        explanationKey: 'quests.blockchain_security.q1.explanation'
      },
      {
        id: 'security-2',
        questionKey: 'quests.blockchain_security.q2.question',
        choices: [
          'quests.blockchain_security.q2.option1',
          'quests.blockchain_security.q2.option2',
          'quests.blockchain_security.q2.option3',
          'quests.blockchain_security.q2.option4',
          'quests.blockchain_security.q2.option5'
        ],
        correctAnswerKey: 'quests.blockchain_security.q2.option2',
        explanationKey: 'quests.blockchain_security.q2.explanation'
      },
      {
        id: 'security-3',
        questionKey: 'quests.blockchain_security.q3.question',
        choices: [
          'quests.blockchain_security.q3.option1',
          'quests.blockchain_security.q3.option2',
          'quests.blockchain_security.q3.option3',
          'quests.blockchain_security.q3.option4',
          'quests.blockchain_security.q3.option5'
        ],
        correctAnswerKey: 'quests.blockchain_security.q3.option3',
        explanationKey: 'quests.blockchain_security.q3.explanation'
      },
      {
        id: 'security-4',
        questionKey: 'quests.blockchain_security.q4.question',
        choices: [
          'quests.blockchain_security.q4.option1',
          'quests.blockchain_security.q4.option2',
          'quests.blockchain_security.q4.option3',
          'quests.blockchain_security.q4.option4',
          'quests.blockchain_security.q4.option5'
        ],
        correctAnswerKey: 'quests.blockchain_security.q4.option1',
        explanationKey: 'quests.blockchain_security.q4.explanation'
      },
      {
        id: 'security-5',
        questionKey: 'quests.blockchain_security.q5.question',
        choices: [
          'quests.blockchain_security.q5.option1',
          'quests.blockchain_security.q5.option2',
          'quests.blockchain_security.q5.option3',
          'quests.blockchain_security.q5.option4',
          'quests.blockchain_security.q5.option5'
        ],
        correctAnswerKey: 'quests.blockchain_security.q5.option3',
        explanationKey: 'quests.blockchain_security.q5.explanation'
      }
    ],
    prerequisites: [],
    tags: ['security', 'blockchain', 'attacks'],
    estimatedTime: '35 dakika',
    completionRate: 0
  },

  // === YENİ QUEST 2: Merkeziyetsiz Kimlik (DID) ===
  {
    id: 'decentralized-identity',
    nameKey: 'quests.decentralized_identity.title',
    descriptionKey: 'quests.decentralized_identity.description',
    category: 'blockchain',
    difficulty: 'advanced',
    rewardAmount: 450,
    timeEstimate: 40,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmDIDCert',
    lessons: [
      {
        id: 'did-1',
        questionKey: 'quests.decentralized_identity.q1.question',
        choices: [
          'quests.decentralized_identity.q1.option1',
          'quests.decentralized_identity.q1.option2',
          'quests.decentralized_identity.q1.option3',
          'quests.decentralized_identity.q1.option4',
          'quests.decentralized_identity.q1.option5'
        ],
        correctAnswerKey: 'quests.decentralized_identity.q1.option2',
        explanationKey: 'quests.decentralized_identity.q1.explanation'
      },
      {
        id: 'did-2',
        questionKey: 'quests.decentralized_identity.q2.question',
        choices: [
          'quests.decentralized_identity.q2.option1',
          'quests.decentralized_identity.q2.option2',
          'quests.decentralized_identity.q2.option3',
          'quests.decentralized_identity.q2.option4',
          'quests.decentralized_identity.q2.option5'
        ],
        correctAnswerKey: 'quests.decentralized_identity.q2.option3',
        explanationKey: 'quests.decentralized_identity.q2.explanation'
      },
      {
        id: 'did-3',
        questionKey: 'quests.decentralized_identity.q3.question',
        choices: [
          'quests.decentralized_identity.q3.option1',
          'quests.decentralized_identity.q3.option2',
          'quests.decentralized_identity.q3.option3',
          'quests.decentralized_identity.q3.option4',
          'quests.decentralized_identity.q3.option5'
        ],
        correctAnswerKey: 'quests.decentralized_identity.q3.option4',
        explanationKey: 'quests.decentralized_identity.q3.explanation'
      },
      {
        id: 'did-4',
        questionKey: 'quests.decentralized_identity.q4.question',
        choices: [
          'quests.decentralized_identity.q4.option1',
          'quests.decentralized_identity.q4.option2',
          'quests.decentralized_identity.q4.option3',
          'quests.decentralized_identity.q4.option4',
          'quests.decentralized_identity.q4.option5'
        ],
        correctAnswerKey: 'quests.decentralized_identity.q4.option2',
        explanationKey: 'quests.decentralized_identity.q4.explanation'
      },
      {
        id: 'did-5',
        questionKey: 'quests.decentralized_identity.q5.question',
        choices: [
          'quests.decentralized_identity.q5.option1',
          'quests.decentralized_identity.q5.option2',
          'quests.decentralized_identity.q5.option3',
          'quests.decentralized_identity.q5.option4',
          'quests.decentralized_identity.q5.option5'
        ],
        correctAnswerKey: 'quests.decentralized_identity.q5.option3',
        explanationKey: 'quests.decentralized_identity.q5.explanation'
      }
    ],
    prerequisites: [],
    tags: ['did', 'identity', 'web3', 'ssi'],
    estimatedTime: '40 dakika',
    completionRate: 0
  },

  // === YENİ QUEST 3: Layer 2 Çözümleri ===
  {
    id: 'layer2-scaling',
    nameKey: 'quests.layer2_scaling.title',
    descriptionKey: 'quests.layer2_scaling.description',
    category: 'blockchain',
    difficulty: 'advanced',
    rewardAmount: 500,
    timeEstimate: 45,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmLayer2Cert',
    lessons: [
      {
        id: 'l2-1',
        questionKey: 'quests.layer2_scaling.q1.question',
        choices: [
          'quests.layer2_scaling.q1.option1',
          'quests.layer2_scaling.q1.option2',
          'quests.layer2_scaling.q1.option3',
          'quests.layer2_scaling.q1.option4',
          'quests.layer2_scaling.q1.option5'
        ],
        correctAnswerKey: 'quests.layer2_scaling.q1.option2',
        explanationKey: 'quests.layer2_scaling.q1.explanation'
      },
      {
        id: 'l2-2',
        questionKey: 'quests.layer2_scaling.q2.question',
        choices: [
          'quests.layer2_scaling.q2.option1',
          'quests.layer2_scaling.q2.option2',
          'quests.layer2_scaling.q2.option3',
          'quests.layer2_scaling.q2.option4',
          'quests.layer2_scaling.q2.option5'
        ],
        correctAnswerKey: 'quests.layer2_scaling.q2.option3',
        explanationKey: 'quests.layer2_scaling.q2.explanation'
      },
      {
        id: 'l2-3',
        questionKey: 'quests.layer2_scaling.q3.question',
        choices: [
          'quests.layer2_scaling.q3.option1',
          'quests.layer2_scaling.q3.option2',
          'quests.layer2_scaling.q3.option3',
          'quests.layer2_scaling.q3.option4',
          'quests.layer2_scaling.q3.option5'
        ],
        correctAnswerKey: 'quests.layer2_scaling.q3.option2',
        explanationKey: 'quests.layer2_scaling.q3.explanation'
      },
      {
        id: 'l2-4',
        questionKey: 'quests.layer2_scaling.q4.question',
        choices: [
          'quests.layer2_scaling.q4.option1',
          'quests.layer2_scaling.q4.option2',
          'quests.layer2_scaling.q4.option3',
          'quests.layer2_scaling.q4.option4',
          'quests.layer2_scaling.q4.option5'
        ],
        correctAnswerKey: 'quests.layer2_scaling.q4.option3',
        explanationKey: 'quests.layer2_scaling.q4.explanation'
      },
      {
        id: 'l2-5',
        questionKey: 'quests.layer2_scaling.q5.question',
        choices: [
          'quests.layer2_scaling.q5.option1',
          'quests.layer2_scaling.q5.option2',
          'quests.layer2_scaling.q5.option3',
          'quests.layer2_scaling.q5.option4',
          'quests.layer2_scaling.q5.option5'
        ],
        correctAnswerKey: 'quests.layer2_scaling.q5.option4',
        explanationKey: 'quests.layer2_scaling.q5.explanation'
      }
    ],
    prerequisites: [],
    tags: ['layer2', 'scaling', 'rollup'],
    estimatedTime: '45 dakika',
    completionRate: 0
  },

  // === YENİ QUEST 4: Web3 Geliştirme Temelleri ===
  {
    id: 'web3-dev-basics',
    nameKey: 'quests.web3_dev_basics.title',
    descriptionKey: 'quests.web3_dev_basics.description',
    category: 'smart-contracts',
    difficulty: 'intermediate',
    rewardAmount: 400,
    timeEstimate: 30,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmWeb3DevCert',
    lessons: [
      {
        id: 'w3d-1',
        questionKey: 'quests.web3_dev_basics.q1.question',
        choices: [
          'quests.web3_dev_basics.q1.option1',
          'quests.web3_dev_basics.q1.option2',
          'quests.web3_dev_basics.q1.option3',
          'quests.web3_dev_basics.q1.option4',
          'quests.web3_dev_basics.q1.option5'
        ],
        correctAnswerKey: 'quests.web3_dev_basics.q1.option3',
        explanationKey: 'quests.web3_dev_basics.q1.explanation'
      },
      {
        id: 'w3d-2',
        questionKey: 'quests.web3_dev_basics.q2.question',
        choices: [
          'quests.web3_dev_basics.q2.option1',
          'quests.web3_dev_basics.q2.option2',
          'quests.web3_dev_basics.q2.option3',
          'quests.web3_dev_basics.q2.option4',
          'quests.web3_dev_basics.q2.option5'
        ],
        correctAnswerKey: 'quests.web3_dev_basics.q2.option2',
        explanationKey: 'quests.web3_dev_basics.q2.explanation'
      },
      {
        id: 'w3d-3',
        questionKey: 'quests.web3_dev_basics.q3.question',
        choices: [
          'quests.web3_dev_basics.q3.option1',
          'quests.web3_dev_basics.q3.option2',
          'quests.web3_dev_basics.q3.option3',
          'quests.web3_dev_basics.q3.option4',
          'quests.web3_dev_basics.q3.option5'
        ],
        correctAnswerKey: 'quests.web3_dev_basics.q3.option3',
        explanationKey: 'quests.web3_dev_basics.q3.explanation'
      },
      {
        id: 'w3d-4',
        questionKey: 'quests.web3_dev_basics.q4.question',
        choices: [
          'quests.web3_dev_basics.q4.option1',
          'quests.web3_dev_basics.q4.option2',
          'quests.web3_dev_basics.q4.option3',
          'quests.web3_dev_basics.q4.option4',
          'quests.web3_dev_basics.q4.option5'
        ],
        correctAnswerKey: 'quests.web3_dev_basics.q4.option4',
        explanationKey: 'quests.web3_dev_basics.q4.explanation'
      },
      {
        id: 'w3d-5',
        questionKey: 'quests.web3_dev_basics.q5.question',
        choices: [
          'quests.web3_dev_basics.q5.option1',
          'quests.web3_dev_basics.q5.option2',
          'quests.web3_dev_basics.q5.option3',
          'quests.web3_dev_basics.q5.option4',
          'quests.web3_dev_basics.q5.option5'
        ],
        correctAnswerKey: 'quests.web3_dev_basics.q5.option3',
        explanationKey: 'quests.web3_dev_basics.q5.explanation'
      }
    ],
    prerequisites: [],
    tags: ['web3', 'development', 'dapp'],
    estimatedTime: '30 dakika',
    completionRate: 0
  }
];

// Quest kategorileri
export const questCategories = [
  { id: 'all', nameKey: 'category.all', icon: '📚', color: 'slate' },
  { id: 'blockchain', nameKey: 'category.blockchain', icon: '⛓️', color: 'blue' },
  { id: 'smart-contracts', nameKey: 'category.smartContracts', icon: '🤖', color: 'purple' },
  { id: 'defi', nameKey: 'category.defi', icon: '💰', color: 'green' },
  { id: 'nft', nameKey: 'category.nft', icon: '🎨', color: 'pink' }
];

// Zorluk seviyeleri
export const difficultyLevels = {
  beginner: { 
    nameKey: 'category.beginner', 
    color: 'green', 
    icon: '🟢',
    descriptionKey: 'difficulty.beginner.description'
  },
  intermediate: { 
    nameKey: 'category.intermediate', 
    color: 'yellow', 
    icon: '🟡',
    descriptionKey: 'difficulty.intermediate.description'
  },
  advanced: { 
    nameKey: 'category.advanced', 
    color: 'red', 
    icon: '🔴',
    descriptionKey: 'difficulty.advanced.description'
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
