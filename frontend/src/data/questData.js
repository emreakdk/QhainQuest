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
  },
  
  // BEGINNER QUESTS (100-200 CQT)
  {
    id: 'bitcoin-history',
    nameKey: 'quests.bitcoin_history.title',
    descriptionKey: 'quests.bitcoin_history.description',
    category: 'blockchain',
    difficulty: 'beginner',
    rewardAmount: 150,
    timeEstimate: 20,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmBitcoinHistoryCert',
    lessons: [
      {
        id: 'btc-1',
        questionKey: 'quests.bitcoin_history.q1.question',
        choices: [
          'quests.bitcoin_history.q1.option1',
          'quests.bitcoin_history.q1.option2',
          'quests.bitcoin_history.q1.option3',
          'quests.bitcoin_history.q1.option4'
        ],
        correctAnswerKey: 'quests.bitcoin_history.q1.option2',
        explanationKey: 'quests.bitcoin_history.q1.explanation'
      },
      {
        id: 'btc-2',
        questionKey: 'quests.bitcoin_history.q2.question',
        choices: [
          'quests.bitcoin_history.q2.option1',
          'quests.bitcoin_history.q2.option2',
          'quests.bitcoin_history.q2.option3',
          'quests.bitcoin_history.q2.option4'
        ],
        correctAnswerKey: 'quests.bitcoin_history.q2.option3',
        explanationKey: 'quests.bitcoin_history.q2.explanation'
      },
      {
        id: 'btc-3',
        questionKey: 'quests.bitcoin_history.q3.question',
        choices: [
          'quests.bitcoin_history.q3.option1',
          'quests.bitcoin_history.q3.option2',
          'quests.bitcoin_history.q3.option3',
          'quests.bitcoin_history.q3.option4'
        ],
        correctAnswerKey: 'quests.bitcoin_history.q3.option1',
        explanationKey: 'quests.bitcoin_history.q3.explanation'
      },
      {
        id: 'btc-4',
        questionKey: 'quests.bitcoin_history.q4.question',
        choices: [
          'quests.bitcoin_history.q4.option1',
          'quests.bitcoin_history.q4.option2',
          'quests.bitcoin_history.q4.option3',
          'quests.bitcoin_history.q4.option4'
        ],
        correctAnswerKey: 'quests.bitcoin_history.q4.option2',
        explanationKey: 'quests.bitcoin_history.q4.explanation'
      }
    ],
    prerequisites: [],
    tags: ['bitcoin', 'history', 'blockchain'],
    estimatedTime: '20 dakika',
    completionRate: 0
  },
  {
    id: 'wallet-types',
    nameKey: 'quests.wallet_types.title',
    descriptionKey: 'quests.wallet_types.description',
    category: 'blockchain',
    difficulty: 'beginner',
    rewardAmount: 120,
    timeEstimate: 15,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmWalletTypesCert',
    lessons: [
      {
        id: 'wallet-1',
        questionKey: 'quests.wallet_types.q1.question',
        choices: [
          'quests.wallet_types.q1.option1',
          'quests.wallet_types.q1.option2',
          'quests.wallet_types.q1.option3',
          'quests.wallet_types.q1.option4'
        ],
        correctAnswerKey: 'quests.wallet_types.q1.option2',
        explanationKey: 'quests.wallet_types.q1.explanation'
      },
      {
        id: 'wallet-2',
        questionKey: 'quests.wallet_types.q2.question',
        choices: [
          'quests.wallet_types.q2.option1',
          'quests.wallet_types.q2.option2',
          'quests.wallet_types.q2.option3',
          'quests.wallet_types.q2.option4'
        ],
        correctAnswerKey: 'quests.wallet_types.q2.option3',
        explanationKey: 'quests.wallet_types.q2.explanation'
      },
      {
        id: 'wallet-3',
        questionKey: 'quests.wallet_types.q3.question',
        choices: [
          'quests.wallet_types.q3.option1',
          'quests.wallet_types.q3.option2',
          'quests.wallet_types.q3.option3',
          'quests.wallet_types.q3.option4'
        ],
        correctAnswerKey: 'quests.wallet_types.q3.option1',
        explanationKey: 'quests.wallet_types.q3.explanation'
      },
      {
        id: 'wallet-4',
        questionKey: 'quests.wallet_types.q4.question',
        choices: [
          'quests.wallet_types.q4.option1',
          'quests.wallet_types.q4.option2',
          'quests.wallet_types.q4.option3',
          'quests.wallet_types.q4.option4'
        ],
        correctAnswerKey: 'quests.wallet_types.q4.option4',
        explanationKey: 'quests.wallet_types.q4.explanation'
      }
    ],
    prerequisites: [],
    tags: ['wallet', 'security', 'crypto'],
    estimatedTime: '15 dakika',
    completionRate: 0
  },
  {
    id: 'gas-fees',
    nameKey: 'quests.gas_fees.title',
    descriptionKey: 'quests.gas_fees.description',
    category: 'blockchain',
    difficulty: 'beginner',
    rewardAmount: 180,
    timeEstimate: 18,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmGasFeesCert',
    lessons: [
      {
        id: 'gas-1',
        questionKey: 'quests.gas_fees.q1.question',
        choices: [
          'quests.gas_fees.q1.option1',
          'quests.gas_fees.q1.option2',
          'quests.gas_fees.q1.option3',
          'quests.gas_fees.q1.option4'
        ],
        correctAnswerKey: 'quests.gas_fees.q1.option3',
        explanationKey: 'quests.gas_fees.q1.explanation'
      },
      {
        id: 'gas-2',
        questionKey: 'quests.gas_fees.q2.question',
        choices: [
          'quests.gas_fees.q2.option1',
          'quests.gas_fees.q2.option2',
          'quests.gas_fees.q2.option3',
          'quests.gas_fees.q2.option4'
        ],
        correctAnswerKey: 'quests.gas_fees.q2.option2',
        explanationKey: 'quests.gas_fees.q2.explanation'
      },
      {
        id: 'gas-3',
        questionKey: 'quests.gas_fees.q3.question',
        choices: [
          'quests.gas_fees.q3.option1',
          'quests.gas_fees.q3.option2',
          'quests.gas_fees.q3.option3',
          'quests.gas_fees.q3.option4'
        ],
        correctAnswerKey: 'quests.gas_fees.q3.option1',
        explanationKey: 'quests.gas_fees.q3.explanation'
      },
      {
        id: 'gas-4',
        questionKey: 'quests.gas_fees.q4.question',
        choices: [
          'quests.gas_fees.q4.option1',
          'quests.gas_fees.q4.option2',
          'quests.gas_fees.q4.option3',
          'quests.gas_fees.q4.option4'
        ],
        correctAnswerKey: 'quests.gas_fees.q4.option4',
        explanationKey: 'quests.gas_fees.q4.explanation'
      }
    ],
    prerequisites: [],
    tags: ['gas', 'fees', 'ethereum', 'transactions'],
    estimatedTime: '18 dakika',
    completionRate: 0
  },
  {
    id: 'mining-vs-staking',
    nameKey: 'quests.mining_vs_staking.title',
    descriptionKey: 'quests.mining_vs_staking.description',
    category: 'blockchain',
    difficulty: 'beginner',
    rewardAmount: 160,
    timeEstimate: 20,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmMiningStakingCert',
    lessons: [
      {
        id: 'ms-1',
        questionKey: 'quests.mining_vs_staking.q1.question',
        choices: [
          'quests.mining_vs_staking.q1.option1',
          'quests.mining_vs_staking.q1.option2',
          'quests.mining_vs_staking.q1.option3',
          'quests.mining_vs_staking.q1.option4'
        ],
        correctAnswerKey: 'quests.mining_vs_staking.q1.option1',
        explanationKey: 'quests.mining_vs_staking.q1.explanation'
      },
      {
        id: 'ms-2',
        questionKey: 'quests.mining_vs_staking.q2.question',
        choices: [
          'quests.mining_vs_staking.q2.option1',
          'quests.mining_vs_staking.q2.option2',
          'quests.mining_vs_staking.q2.option3',
          'quests.mining_vs_staking.q2.option4'
        ],
        correctAnswerKey: 'quests.mining_vs_staking.q2.option3',
        explanationKey: 'quests.mining_vs_staking.q2.explanation'
      },
      {
        id: 'ms-3',
        questionKey: 'quests.mining_vs_staking.q3.question',
        choices: [
          'quests.mining_vs_staking.q3.option1',
          'quests.mining_vs_staking.q3.option2',
          'quests.mining_vs_staking.q3.option3',
          'quests.mining_vs_staking.q3.option4'
        ],
        correctAnswerKey: 'quests.mining_vs_staking.q3.option2',
        explanationKey: 'quests.mining_vs_staking.q3.explanation'
      },
      {
        id: 'ms-4',
        questionKey: 'quests.mining_vs_staking.q4.question',
        choices: [
          'quests.mining_vs_staking.q4.option1',
          'quests.mining_vs_staking.q4.option2',
          'quests.mining_vs_staking.q4.option3',
          'quests.mining_vs_staking.q4.option4'
        ],
        correctAnswerKey: 'quests.mining_vs_staking.q4.option4',
        explanationKey: 'quests.mining_vs_staking.q4.explanation'
      }
    ],
    prerequisites: [],
    tags: ['mining', 'staking', 'pow', 'pos', 'consensus'],
    estimatedTime: '20 dakika',
    completionRate: 0
  },
  {
    id: 'stablecoins',
    nameKey: 'quests.stablecoins.title',
    descriptionKey: 'quests.stablecoins.description',
    category: 'defi',
    difficulty: 'beginner',
    rewardAmount: 140,
    timeEstimate: 18,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmStablecoinsCert',
    lessons: [
      {
        id: 'stable-1',
        questionKey: 'quests.stablecoins.q1.question',
        choices: [
          'quests.stablecoins.q1.option1',
          'quests.stablecoins.q1.option2',
          'quests.stablecoins.q1.option3',
          'quests.stablecoins.q1.option4'
        ],
        correctAnswerKey: 'quests.stablecoins.q1.option2',
        explanationKey: 'quests.stablecoins.q1.explanation'
      },
      {
        id: 'stable-2',
        questionKey: 'quests.stablecoins.q2.question',
        choices: [
          'quests.stablecoins.q2.option1',
          'quests.stablecoins.q2.option2',
          'quests.stablecoins.q2.option3',
          'quests.stablecoins.q2.option4'
        ],
        correctAnswerKey: 'quests.stablecoins.q2.option1',
        explanationKey: 'quests.stablecoins.q2.explanation'
      },
      {
        id: 'stable-3',
        questionKey: 'quests.stablecoins.q3.question',
        choices: [
          'quests.stablecoins.q3.option1',
          'quests.stablecoins.q3.option2',
          'quests.stablecoins.q3.option3',
          'quests.stablecoins.q3.option4'
        ],
        correctAnswerKey: 'quests.stablecoins.q3.option3',
        explanationKey: 'quests.stablecoins.q3.explanation'
      },
      {
        id: 'stable-4',
        questionKey: 'quests.stablecoins.q4.question',
        choices: [
          'quests.stablecoins.q4.option1',
          'quests.stablecoins.q4.option2',
          'quests.stablecoins.q4.option3',
          'quests.stablecoins.q4.option4'
        ],
        correctAnswerKey: 'quests.stablecoins.q4.option4',
        explanationKey: 'quests.stablecoins.q4.explanation'
      }
    ],
    prerequisites: [],
    tags: ['stablecoin', 'usdt', 'usdc', 'dai', 'defi'],
    estimatedTime: '18 dakika',
    completionRate: 0
  },
  {
    id: 'web3-browsers',
    nameKey: 'quests.web3_browsers.title',
    descriptionKey: 'quests.web3_browsers.description',
    category: 'blockchain',
    difficulty: 'beginner',
    rewardAmount: 110,
    timeEstimate: 15,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmWeb3BrowsersCert',
    lessons: [
      {
        id: 'browser-1',
        questionKey: 'quests.web3_browsers.q1.question',
        choices: [
          'quests.web3_browsers.q1.option1',
          'quests.web3_browsers.q1.option2',
          'quests.web3_browsers.q1.option3',
          'quests.web3_browsers.q1.option4'
        ],
        correctAnswerKey: 'quests.web3_browsers.q1.option2',
        explanationKey: 'quests.web3_browsers.q1.explanation'
      },
      {
        id: 'browser-2',
        questionKey: 'quests.web3_browsers.q2.question',
        choices: [
          'quests.web3_browsers.q2.option1',
          'quests.web3_browsers.q2.option2',
          'quests.web3_browsers.q2.option3',
          'quests.web3_browsers.q2.option4'
        ],
        correctAnswerKey: 'quests.web3_browsers.q2.option3',
        explanationKey: 'quests.web3_browsers.q2.explanation'
      },
      {
        id: 'browser-3',
        questionKey: 'quests.web3_browsers.q3.question',
        choices: [
          'quests.web3_browsers.q3.option1',
          'quests.web3_browsers.q3.option2',
          'quests.web3_browsers.q3.option3',
          'quests.web3_browsers.q3.option4'
        ],
        correctAnswerKey: 'quests.web3_browsers.q3.option1',
        explanationKey: 'quests.web3_browsers.q3.explanation'
      },
      {
        id: 'browser-4',
        questionKey: 'quests.web3_browsers.q4.question',
        choices: [
          'quests.web3_browsers.q4.option1',
          'quests.web3_browsers.q4.option2',
          'quests.web3_browsers.q4.option3',
          'quests.web3_browsers.q4.option4'
        ],
        correctAnswerKey: 'quests.web3_browsers.q4.option4',
        explanationKey: 'quests.web3_browsers.q4.explanation'
      }
    ],
    prerequisites: [],
    tags: ['web3', 'browser', 'brave', 'wallet'],
    estimatedTime: '15 dakika',
    completionRate: 0
  },
  {
    id: 'crypto-exchanges',
    nameKey: 'quests.crypto_exchanges.title',
    descriptionKey: 'quests.crypto_exchanges.description',
    category: 'blockchain',
    difficulty: 'beginner',
    rewardAmount: 130,
    timeEstimate: 16,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmCryptoExchangesCert',
    lessons: [
      {
        id: 'exchange-1',
        questionKey: 'quests.crypto_exchanges.q1.question',
        choices: [
          'quests.crypto_exchanges.q1.option1',
          'quests.crypto_exchanges.q1.option2',
          'quests.crypto_exchanges.q1.option3',
          'quests.crypto_exchanges.q1.option4'
        ],
        correctAnswerKey: 'quests.crypto_exchanges.q1.option2',
        explanationKey: 'quests.crypto_exchanges.q1.explanation'
      },
      {
        id: 'exchange-2',
        questionKey: 'quests.crypto_exchanges.q2.question',
        choices: [
          'quests.crypto_exchanges.q2.option1',
          'quests.crypto_exchanges.q2.option2',
          'quests.crypto_exchanges.q2.option3',
          'quests.crypto_exchanges.q2.option4'
        ],
        correctAnswerKey: 'quests.crypto_exchanges.q2.option1',
        explanationKey: 'quests.crypto_exchanges.q2.explanation'
      },
      {
        id: 'exchange-3',
        questionKey: 'quests.crypto_exchanges.q3.question',
        choices: [
          'quests.crypto_exchanges.q3.option1',
          'quests.crypto_exchanges.q3.option2',
          'quests.crypto_exchanges.q3.option3',
          'quests.crypto_exchanges.q3.option4'
        ],
        correctAnswerKey: 'quests.crypto_exchanges.q3.option3',
        explanationKey: 'quests.crypto_exchanges.q3.explanation'
      },
      {
        id: 'exchange-4',
        questionKey: 'quests.crypto_exchanges.q4.question',
        choices: [
          'quests.crypto_exchanges.q4.option1',
          'quests.crypto_exchanges.q4.option2',
          'quests.crypto_exchanges.q4.option3',
          'quests.crypto_exchanges.q4.option4'
        ],
        correctAnswerKey: 'quests.crypto_exchanges.q4.option4',
        explanationKey: 'quests.crypto_exchanges.q4.explanation'
      }
    ],
    prerequisites: [],
    tags: ['exchange', 'cex', 'dex', 'trading'],
    estimatedTime: '16 dakika',
    completionRate: 0
  },
  
  // INTERMEDIATE QUESTS (250-350 CQT)
  {
    id: 'defi-decentralized-finance',
    nameKey: 'quests.defi_decentralized_finance.title',
    descriptionKey: 'quests.defi_decentralized_finance.description',
    category: 'defi',
    difficulty: 'intermediate',
    rewardAmount: 300,
    timeEstimate: 35,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmDeFiDecentralizedCert',
    lessons: [
      {
        id: 'defi-df-1',
        questionKey: 'quests.defi_decentralized_finance.q1.question',
        choices: [
          'quests.defi_decentralized_finance.q1.option1',
          'quests.defi_decentralized_finance.q1.option2',
          'quests.defi_decentralized_finance.q1.option3',
          'quests.defi_decentralized_finance.q1.option4'
        ],
        correctAnswerKey: 'quests.defi_decentralized_finance.q1.option2',
        explanationKey: 'quests.defi_decentralized_finance.q1.explanation'
      },
      {
        id: 'defi-df-2',
        questionKey: 'quests.defi_decentralized_finance.q2.question',
        choices: [
          'quests.defi_decentralized_finance.q2.option1',
          'quests.defi_decentralized_finance.q2.option2',
          'quests.defi_decentralized_finance.q2.option3',
          'quests.defi_decentralized_finance.q2.option4'
        ],
        correctAnswerKey: 'quests.defi_decentralized_finance.q2.option3',
        explanationKey: 'quests.defi_decentralized_finance.q2.explanation'
      },
      {
        id: 'defi-df-3',
        questionKey: 'quests.defi_decentralized_finance.q3.question',
        choices: [
          'quests.defi_decentralized_finance.q3.option1',
          'quests.defi_decentralized_finance.q3.option2',
          'quests.defi_decentralized_finance.q3.option3',
          'quests.defi_decentralized_finance.q3.option4'
        ],
        correctAnswerKey: 'quests.defi_decentralized_finance.q3.option1',
        explanationKey: 'quests.defi_decentralized_finance.q3.explanation'
      },
      {
        id: 'defi-df-4',
        questionKey: 'quests.defi_decentralized_finance.q4.question',
        choices: [
          'quests.defi_decentralized_finance.q4.option1',
          'quests.defi_decentralized_finance.q4.option2',
          'quests.defi_decentralized_finance.q4.option3',
          'quests.defi_decentralized_finance.q4.option4'
        ],
        correctAnswerKey: 'quests.defi_decentralized_finance.q4.option4',
        explanationKey: 'quests.defi_decentralized_finance.q4.explanation'
      },
      {
        id: 'defi-df-5',
        questionKey: 'quests.defi_decentralized_finance.q5.question',
        choices: [
          'quests.defi_decentralized_finance.q5.option1',
          'quests.defi_decentralized_finance.q5.option2',
          'quests.defi_decentralized_finance.q5.option3',
          'quests.defi_decentralized_finance.q5.option4'
        ],
        correctAnswerKey: 'quests.defi_decentralized_finance.q5.option2',
        explanationKey: 'quests.defi_decentralized_finance.q5.explanation'
      }
    ],
    prerequisites: [],
    tags: ['defi', 'lending', 'borrowing', 'yield-farming'],
    estimatedTime: '35 dakika',
    completionRate: 0
  },
  {
    id: 'nft-standards',
    nameKey: 'quests.nft_standards.title',
    descriptionKey: 'quests.nft_standards.description',
    category: 'nft',
    difficulty: 'intermediate',
    rewardAmount: 280,
    timeEstimate: 30,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmNFTStandardsCert',
    lessons: [
      {
        id: 'nft-std-1',
        questionKey: 'quests.nft_standards.q1.question',
        choices: [
          'quests.nft_standards.q1.option1',
          'quests.nft_standards.q1.option2',
          'quests.nft_standards.q1.option3',
          'quests.nft_standards.q1.option4'
        ],
        correctAnswerKey: 'quests.nft_standards.q1.option1',
        explanationKey: 'quests.nft_standards.q1.explanation'
      },
      {
        id: 'nft-std-2',
        questionKey: 'quests.nft_standards.q2.question',
        choices: [
          'quests.nft_standards.q2.option1',
          'quests.nft_standards.q2.option2',
          'quests.nft_standards.q2.option3',
          'quests.nft_standards.q2.option4'
        ],
        correctAnswerKey: 'quests.nft_standards.q2.option3',
        explanationKey: 'quests.nft_standards.q2.explanation'
      },
      {
        id: 'nft-std-3',
        questionKey: 'quests.nft_standards.q3.question',
        choices: [
          'quests.nft_standards.q3.option1',
          'quests.nft_standards.q3.option2',
          'quests.nft_standards.q3.option3',
          'quests.nft_standards.q3.option4'
        ],
        correctAnswerKey: 'quests.nft_standards.q3.option2',
        explanationKey: 'quests.nft_standards.q3.explanation'
      },
      {
        id: 'nft-std-4',
        questionKey: 'quests.nft_standards.q4.question',
        choices: [
          'quests.nft_standards.q4.option1',
          'quests.nft_standards.q4.option2',
          'quests.nft_standards.q4.option3',
          'quests.nft_standards.q4.option4'
        ],
        correctAnswerKey: 'quests.nft_standards.q4.option4',
        explanationKey: 'quests.nft_standards.q4.explanation'
      }
    ],
    prerequisites: [],
    tags: ['nft', 'erc721', 'erc1155', 'standards'],
    estimatedTime: '30 dakika',
    completionRate: 0
  },
  {
    id: 'dao-governance',
    nameKey: 'quests.dao_governance.title',
    descriptionKey: 'quests.dao_governance.description',
    category: 'blockchain',
    difficulty: 'intermediate',
    rewardAmount: 320,
    timeEstimate: 40,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmDAOCert',
    lessons: [
      {
        id: 'dao-1',
        questionKey: 'quests.dao_governance.q1.question',
        choices: [
          'quests.dao_governance.q1.option1',
          'quests.dao_governance.q1.option2',
          'quests.dao_governance.q1.option3',
          'quests.dao_governance.q1.option4'
        ],
        correctAnswerKey: 'quests.dao_governance.q1.option2',
        explanationKey: 'quests.dao_governance.q1.explanation'
      },
      {
        id: 'dao-2',
        questionKey: 'quests.dao_governance.q2.question',
        choices: [
          'quests.dao_governance.q2.option1',
          'quests.dao_governance.q2.option2',
          'quests.dao_governance.q2.option3',
          'quests.dao_governance.q2.option4'
        ],
        correctAnswerKey: 'quests.dao_governance.q2.option3',
        explanationKey: 'quests.dao_governance.q2.explanation'
      },
      {
        id: 'dao-3',
        questionKey: 'quests.dao_governance.q3.question',
        choices: [
          'quests.dao_governance.q3.option1',
          'quests.dao_governance.q3.option2',
          'quests.dao_governance.q3.option3',
          'quests.dao_governance.q3.option4'
        ],
        correctAnswerKey: 'quests.dao_governance.q3.option1',
        explanationKey: 'quests.dao_governance.q3.explanation'
      },
      {
        id: 'dao-4',
        questionKey: 'quests.dao_governance.q4.question',
        choices: [
          'quests.dao_governance.q4.option1',
          'quests.dao_governance.q4.option2',
          'quests.dao_governance.q4.option3',
          'quests.dao_governance.q4.option4'
        ],
        correctAnswerKey: 'quests.dao_governance.q4.option4',
        explanationKey: 'quests.dao_governance.q4.explanation'
      },
      {
        id: 'dao-5',
        questionKey: 'quests.dao_governance.q5.question',
        choices: [
          'quests.dao_governance.q5.option1',
          'quests.dao_governance.q5.option2',
          'quests.dao_governance.q5.option3',
          'quests.dao_governance.q5.option4'
        ],
        correctAnswerKey: 'quests.dao_governance.q5.option2',
        explanationKey: 'quests.dao_governance.q5.explanation'
      }
    ],
    prerequisites: [],
    tags: ['dao', 'governance', 'decentralized', 'voting'],
    estimatedTime: '40 dakika',
    completionRate: 0
  },
  {
    id: 'layer2-solutions',
    nameKey: 'quests.layer2_solutions.title',
    descriptionKey: 'quests.layer2_solutions.description',
    category: 'blockchain',
    difficulty: 'intermediate',
    rewardAmount: 310,
    timeEstimate: 35,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmLayer2SolutionsCert',
    lessons: [
      {
        id: 'l2s-1',
        questionKey: 'quests.layer2_solutions.q1.question',
        choices: [
          'quests.layer2_solutions.q1.option1',
          'quests.layer2_solutions.q1.option2',
          'quests.layer2_solutions.q1.option3',
          'quests.layer2_solutions.q1.option4'
        ],
        correctAnswerKey: 'quests.layer2_solutions.q1.option2',
        explanationKey: 'quests.layer2_solutions.q1.explanation'
      },
      {
        id: 'l2s-2',
        questionKey: 'quests.layer2_solutions.q2.question',
        choices: [
          'quests.layer2_solutions.q2.option1',
          'quests.layer2_solutions.q2.option2',
          'quests.layer2_solutions.q2.option3',
          'quests.layer2_solutions.q2.option4'
        ],
        correctAnswerKey: 'quests.layer2_solutions.q2.option3',
        explanationKey: 'quests.layer2_solutions.q2.explanation'
      },
      {
        id: 'l2s-3',
        questionKey: 'quests.layer2_solutions.q3.question',
        choices: [
          'quests.layer2_solutions.q3.option1',
          'quests.layer2_solutions.q3.option2',
          'quests.layer2_solutions.q3.option3',
          'quests.layer2_solutions.q3.option4'
        ],
        correctAnswerKey: 'quests.layer2_solutions.q3.option1',
        explanationKey: 'quests.layer2_solutions.q3.explanation'
      },
      {
        id: 'l2s-4',
        questionKey: 'quests.layer2_solutions.q4.question',
        choices: [
          'quests.layer2_solutions.q4.option1',
          'quests.layer2_solutions.q4.option2',
          'quests.layer2_solutions.q4.option3',
          'quests.layer2_solutions.q4.option4'
        ],
        correctAnswerKey: 'quests.layer2_solutions.q4.option4',
        explanationKey: 'quests.layer2_solutions.q4.explanation'
      }
    ],
    prerequisites: [],
    tags: ['layer2', 'optimism', 'arbitrum', 'zk-rollup', 'scaling'],
    estimatedTime: '35 dakika',
    completionRate: 0
  },
  {
    id: 'cross-chain-bridges',
    nameKey: 'quests.cross_chain_bridges.title',
    descriptionKey: 'quests.cross_chain_bridges.description',
    category: 'blockchain',
    difficulty: 'intermediate',
    rewardAmount: 290,
    timeEstimate: 32,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmCrossChainBridgesCert',
    lessons: [
      {
        id: 'bridge-1',
        questionKey: 'quests.cross_chain_bridges.q1.question',
        choices: [
          'quests.cross_chain_bridges.q1.option1',
          'quests.cross_chain_bridges.q1.option2',
          'quests.cross_chain_bridges.q1.option3',
          'quests.cross_chain_bridges.q1.option4'
        ],
        correctAnswerKey: 'quests.cross_chain_bridges.q1.option2',
        explanationKey: 'quests.cross_chain_bridges.q1.explanation'
      },
      {
        id: 'bridge-2',
        questionKey: 'quests.cross_chain_bridges.q2.question',
        choices: [
          'quests.cross_chain_bridges.q2.option1',
          'quests.cross_chain_bridges.q2.option2',
          'quests.cross_chain_bridges.q2.option3',
          'quests.cross_chain_bridges.q2.option4'
        ],
        correctAnswerKey: 'quests.cross_chain_bridges.q2.option3',
        explanationKey: 'quests.cross_chain_bridges.q2.explanation'
      },
      {
        id: 'bridge-3',
        questionKey: 'quests.cross_chain_bridges.q3.question',
        choices: [
          'quests.cross_chain_bridges.q3.option1',
          'quests.cross_chain_bridges.q3.option2',
          'quests.cross_chain_bridges.q3.option3',
          'quests.cross_chain_bridges.q3.option4'
        ],
        correctAnswerKey: 'quests.cross_chain_bridges.q3.option1',
        explanationKey: 'quests.cross_chain_bridges.q3.explanation'
      },
      {
        id: 'bridge-4',
        questionKey: 'quests.cross_chain_bridges.q4.question',
        choices: [
          'quests.cross_chain_bridges.q4.option1',
          'quests.cross_chain_bridges.q4.option2',
          'quests.cross_chain_bridges.q4.option3',
          'quests.cross_chain_bridges.q4.option4'
        ],
        correctAnswerKey: 'quests.cross_chain_bridges.q4.option4',
        explanationKey: 'quests.cross_chain_bridges.q4.explanation'
      }
    ],
    prerequisites: [],
    tags: ['bridge', 'cross-chain', 'interoperability'],
    estimatedTime: '32 dakika',
    completionRate: 0
  },
  {
    id: 'stellar-anchors',
    nameKey: 'quests.stellar_anchors.title',
    descriptionKey: 'quests.stellar_anchors.description',
    category: 'blockchain',
    difficulty: 'intermediate',
    rewardAmount: 270,
    timeEstimate: 28,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmStellarAnchorsCert',
    lessons: [
      {
        id: 'anchor-1',
        questionKey: 'quests.stellar_anchors.q1.question',
        choices: [
          'quests.stellar_anchors.q1.option1',
          'quests.stellar_anchors.q1.option2',
          'quests.stellar_anchors.q1.option3',
          'quests.stellar_anchors.q1.option4'
        ],
        correctAnswerKey: 'quests.stellar_anchors.q1.option2',
        explanationKey: 'quests.stellar_anchors.q1.explanation'
      },
      {
        id: 'anchor-2',
        questionKey: 'quests.stellar_anchors.q2.question',
        choices: [
          'quests.stellar_anchors.q2.option1',
          'quests.stellar_anchors.q2.option2',
          'quests.stellar_anchors.q2.option3',
          'quests.stellar_anchors.q2.option4'
        ],
        correctAnswerKey: 'quests.stellar_anchors.q2.option3',
        explanationKey: 'quests.stellar_anchors.q2.explanation'
      },
      {
        id: 'anchor-3',
        questionKey: 'quests.stellar_anchors.q3.question',
        choices: [
          'quests.stellar_anchors.q3.option1',
          'quests.stellar_anchors.q3.option2',
          'quests.stellar_anchors.q3.option3',
          'quests.stellar_anchors.q3.option4'
        ],
        correctAnswerKey: 'quests.stellar_anchors.q3.option1',
        explanationKey: 'quests.stellar_anchors.q3.explanation'
      },
      {
        id: 'anchor-4',
        questionKey: 'quests.stellar_anchors.q4.question',
        choices: [
          'quests.stellar_anchors.q4.option1',
          'quests.stellar_anchors.q4.option2',
          'quests.stellar_anchors.q4.option3',
          'quests.stellar_anchors.q4.option4'
        ],
        correctAnswerKey: 'quests.stellar_anchors.q4.option4',
        explanationKey: 'quests.stellar_anchors.q4.explanation'
      }
    ],
    prerequisites: [],
    tags: ['stellar', 'anchors', 'assets', 'fiat'],
    estimatedTime: '28 dakika',
    completionRate: 0
  },
  {
    id: 'smart-contract-security',
    nameKey: 'quests.smart_contract_security.title',
    descriptionKey: 'quests.smart_contract_security.description',
    category: 'smart-contracts',
    difficulty: 'intermediate',
    rewardAmount: 340,
    timeEstimate: 38,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmSmartContractSecurityCert',
    lessons: [
      {
        id: 'security-sc-1',
        questionKey: 'quests.smart_contract_security.q1.question',
        choices: [
          'quests.smart_contract_security.q1.option1',
          'quests.smart_contract_security.q1.option2',
          'quests.smart_contract_security.q1.option3',
          'quests.smart_contract_security.q1.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_security.q1.option2',
        explanationKey: 'quests.smart_contract_security.q1.explanation'
      },
      {
        id: 'security-sc-2',
        questionKey: 'quests.smart_contract_security.q2.question',
        choices: [
          'quests.smart_contract_security.q2.option1',
          'quests.smart_contract_security.q2.option2',
          'quests.smart_contract_security.q2.option3',
          'quests.smart_contract_security.q2.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_security.q2.option3',
        explanationKey: 'quests.smart_contract_security.q2.explanation'
      },
      {
        id: 'security-sc-3',
        questionKey: 'quests.smart_contract_security.q3.question',
        choices: [
          'quests.smart_contract_security.q3.option1',
          'quests.smart_contract_security.q3.option2',
          'quests.smart_contract_security.q3.option3',
          'quests.smart_contract_security.q3.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_security.q3.option1',
        explanationKey: 'quests.smart_contract_security.q3.explanation'
      },
      {
        id: 'security-sc-4',
        questionKey: 'quests.smart_contract_security.q4.question',
        choices: [
          'quests.smart_contract_security.q4.option1',
          'quests.smart_contract_security.q4.option2',
          'quests.smart_contract_security.q4.option3',
          'quests.smart_contract_security.q4.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_security.q4.option4',
        explanationKey: 'quests.smart_contract_security.q4.explanation'
      },
      {
        id: 'security-sc-5',
        questionKey: 'quests.smart_contract_security.q5.question',
        choices: [
          'quests.smart_contract_security.q5.option1',
          'quests.smart_contract_security.q5.option2',
          'quests.smart_contract_security.q5.option3',
          'quests.smart_contract_security.q5.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_security.q5.option2',
        explanationKey: 'quests.smart_contract_security.q5.explanation'
      }
    ],
    prerequisites: [],
    tags: ['security', 'smart-contracts', 'vulnerabilities', 'auditing'],
    estimatedTime: '38 dakika',
    completionRate: 0
  },
  
  // ADVANCED QUESTS (400-500 CQT)
  {
    id: 'zero-knowledge-proofs',
    nameKey: 'quests.zero_knowledge_proofs.title',
    descriptionKey: 'quests.zero_knowledge_proofs.description',
    category: 'blockchain',
    difficulty: 'advanced',
    rewardAmount: 450,
    timeEstimate: 50,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmZKProofsCert',
    lessons: [
      {
        id: 'zk-1',
        questionKey: 'quests.zero_knowledge_proofs.q1.question',
        choices: [
          'quests.zero_knowledge_proofs.q1.option1',
          'quests.zero_knowledge_proofs.q1.option2',
          'quests.zero_knowledge_proofs.q1.option3',
          'quests.zero_knowledge_proofs.q1.option4'
        ],
        correctAnswerKey: 'quests.zero_knowledge_proofs.q1.option2',
        explanationKey: 'quests.zero_knowledge_proofs.q1.explanation'
      },
      {
        id: 'zk-2',
        questionKey: 'quests.zero_knowledge_proofs.q2.question',
        choices: [
          'quests.zero_knowledge_proofs.q2.option1',
          'quests.zero_knowledge_proofs.q2.option2',
          'quests.zero_knowledge_proofs.q2.option3',
          'quests.zero_knowledge_proofs.q2.option4'
        ],
        correctAnswerKey: 'quests.zero_knowledge_proofs.q2.option3',
        explanationKey: 'quests.zero_knowledge_proofs.q2.explanation'
      },
      {
        id: 'zk-3',
        questionKey: 'quests.zero_knowledge_proofs.q3.question',
        choices: [
          'quests.zero_knowledge_proofs.q3.option1',
          'quests.zero_knowledge_proofs.q3.option2',
          'quests.zero_knowledge_proofs.q3.option3',
          'quests.zero_knowledge_proofs.q3.option4'
        ],
        correctAnswerKey: 'quests.zero_knowledge_proofs.q3.option1',
        explanationKey: 'quests.zero_knowledge_proofs.q3.explanation'
      },
      {
        id: 'zk-4',
        questionKey: 'quests.zero_knowledge_proofs.q4.question',
        choices: [
          'quests.zero_knowledge_proofs.q4.option1',
          'quests.zero_knowledge_proofs.q4.option2',
          'quests.zero_knowledge_proofs.q4.option3',
          'quests.zero_knowledge_proofs.q4.option4'
        ],
        correctAnswerKey: 'quests.zero_knowledge_proofs.q4.option4',
        explanationKey: 'quests.zero_knowledge_proofs.q4.explanation'
      },
      {
        id: 'zk-5',
        questionKey: 'quests.zero_knowledge_proofs.q5.question',
        choices: [
          'quests.zero_knowledge_proofs.q5.option1',
          'quests.zero_knowledge_proofs.q5.option2',
          'quests.zero_knowledge_proofs.q5.option3',
          'quests.zero_knowledge_proofs.q5.option4'
        ],
        correctAnswerKey: 'quests.zero_knowledge_proofs.q5.option2',
        explanationKey: 'quests.zero_knowledge_proofs.q5.explanation'
      }
    ],
    prerequisites: [],
    tags: ['zk', 'privacy', 'scalability', 'cryptography'],
    estimatedTime: '50 dakika',
    completionRate: 0
  },
  {
    id: 'flash-loans',
    nameKey: 'quests.flash_loans.title',
    descriptionKey: 'quests.flash_loans.description',
    category: 'defi',
    difficulty: 'advanced',
    rewardAmount: 480,
    timeEstimate: 45,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmFlashLoansCert',
    lessons: [
      {
        id: 'flash-1',
        questionKey: 'quests.flash_loans.q1.question',
        choices: [
          'quests.flash_loans.q1.option1',
          'quests.flash_loans.q1.option2',
          'quests.flash_loans.q1.option3',
          'quests.flash_loans.q1.option4'
        ],
        correctAnswerKey: 'quests.flash_loans.q1.option2',
        explanationKey: 'quests.flash_loans.q1.explanation'
      },
      {
        id: 'flash-2',
        questionKey: 'quests.flash_loans.q2.question',
        choices: [
          'quests.flash_loans.q2.option1',
          'quests.flash_loans.q2.option2',
          'quests.flash_loans.q2.option3',
          'quests.flash_loans.q2.option4'
        ],
        correctAnswerKey: 'quests.flash_loans.q2.option3',
        explanationKey: 'quests.flash_loans.q2.explanation'
      },
      {
        id: 'flash-3',
        questionKey: 'quests.flash_loans.q3.question',
        choices: [
          'quests.flash_loans.q3.option1',
          'quests.flash_loans.q3.option2',
          'quests.flash_loans.q3.option3',
          'quests.flash_loans.q3.option4'
        ],
        correctAnswerKey: 'quests.flash_loans.q3.option1',
        explanationKey: 'quests.flash_loans.q3.explanation'
      },
      {
        id: 'flash-4',
        questionKey: 'quests.flash_loans.q4.question',
        choices: [
          'quests.flash_loans.q4.option1',
          'quests.flash_loans.q4.option2',
          'quests.flash_loans.q4.option3',
          'quests.flash_loans.q4.option4'
        ],
        correctAnswerKey: 'quests.flash_loans.q4.option4',
        explanationKey: 'quests.flash_loans.q4.explanation'
      }
    ],
    prerequisites: [],
    tags: ['flash-loans', 'defi', 'arbitrage', 'lending'],
    estimatedTime: '45 dakika',
    completionRate: 0
  },
  {
    id: 'stellar-soroban-advanced',
    nameKey: 'quests.stellar_soroban_advanced.title',
    descriptionKey: 'quests.stellar_soroban_advanced.description',
    category: 'smart-contracts',
    difficulty: 'advanced',
    rewardAmount: 500,
    timeEstimate: 55,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmStellarSorobanAdvancedCert',
    lessons: [
      {
        id: 'soroban-adv-1',
        questionKey: 'quests.stellar_soroban_advanced.q1.question',
        choices: [
          'quests.stellar_soroban_advanced.q1.option1',
          'quests.stellar_soroban_advanced.q1.option2',
          'quests.stellar_soroban_advanced.q1.option3',
          'quests.stellar_soroban_advanced.q1.option4'
        ],
        correctAnswerKey: 'quests.stellar_soroban_advanced.q1.option2',
        explanationKey: 'quests.stellar_soroban_advanced.q1.explanation'
      },
      {
        id: 'soroban-adv-2',
        questionKey: 'quests.stellar_soroban_advanced.q2.question',
        choices: [
          'quests.stellar_soroban_advanced.q2.option1',
          'quests.stellar_soroban_advanced.q2.option2',
          'quests.stellar_soroban_advanced.q2.option3',
          'quests.stellar_soroban_advanced.q2.option4'
        ],
        correctAnswerKey: 'quests.stellar_soroban_advanced.q2.option3',
        explanationKey: 'quests.stellar_soroban_advanced.q2.explanation'
      },
      {
        id: 'soroban-adv-3',
        questionKey: 'quests.stellar_soroban_advanced.q3.question',
        choices: [
          'quests.stellar_soroban_advanced.q3.option1',
          'quests.stellar_soroban_advanced.q3.option2',
          'quests.stellar_soroban_advanced.q3.option3',
          'quests.stellar_soroban_advanced.q3.option4'
        ],
        correctAnswerKey: 'quests.stellar_soroban_advanced.q3.option1',
        explanationKey: 'quests.stellar_soroban_advanced.q3.explanation'
      },
      {
        id: 'soroban-adv-4',
        questionKey: 'quests.stellar_soroban_advanced.q4.question',
        choices: [
          'quests.stellar_soroban_advanced.q4.option1',
          'quests.stellar_soroban_advanced.q4.option2',
          'quests.stellar_soroban_advanced.q4.option3',
          'quests.stellar_soroban_advanced.q4.option4'
        ],
        correctAnswerKey: 'quests.stellar_soroban_advanced.q4.option4',
        explanationKey: 'quests.stellar_soroban_advanced.q4.explanation'
      },
      {
        id: 'soroban-adv-5',
        questionKey: 'quests.stellar_soroban_advanced.q5.question',
        choices: [
          'quests.stellar_soroban_advanced.q5.option1',
          'quests.stellar_soroban_advanced.q5.option2',
          'quests.stellar_soroban_advanced.q5.option3',
          'quests.stellar_soroban_advanced.q5.option4'
        ],
        correctAnswerKey: 'quests.stellar_soroban_advanced.q5.option2',
        explanationKey: 'quests.stellar_soroban_advanced.q5.explanation'
      }
    ],
    prerequisites: ['soroban-smart-contracts'],
    tags: ['soroban', 'rust', 'stellar', 'advanced', 'smart-contracts'],
    estimatedTime: '55 dakika',
    completionRate: 0
  },
  {
    id: 'ipfs-filecoin',
    nameKey: 'quests.ipfs_filecoin.title',
    descriptionKey: 'quests.ipfs_filecoin.description',
    category: 'blockchain',
    difficulty: 'advanced',
    rewardAmount: 420,
    timeEstimate: 48,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmIPFSFilecoinCert',
    lessons: [
      {
        id: 'ipfs-1',
        questionKey: 'quests.ipfs_filecoin.q1.question',
        choices: [
          'quests.ipfs_filecoin.q1.option1',
          'quests.ipfs_filecoin.q1.option2',
          'quests.ipfs_filecoin.q1.option3',
          'quests.ipfs_filecoin.q1.option4'
        ],
        correctAnswerKey: 'quests.ipfs_filecoin.q1.option2',
        explanationKey: 'quests.ipfs_filecoin.q1.explanation'
      },
      {
        id: 'ipfs-2',
        questionKey: 'quests.ipfs_filecoin.q2.question',
        choices: [
          'quests.ipfs_filecoin.q2.option1',
          'quests.ipfs_filecoin.q2.option2',
          'quests.ipfs_filecoin.q2.option3',
          'quests.ipfs_filecoin.q2.option4'
        ],
        correctAnswerKey: 'quests.ipfs_filecoin.q2.option3',
        explanationKey: 'quests.ipfs_filecoin.q2.explanation'
      },
      {
        id: 'ipfs-3',
        questionKey: 'quests.ipfs_filecoin.q3.question',
        choices: [
          'quests.ipfs_filecoin.q3.option1',
          'quests.ipfs_filecoin.q3.option2',
          'quests.ipfs_filecoin.q3.option3',
          'quests.ipfs_filecoin.q3.option4'
        ],
        correctAnswerKey: 'quests.ipfs_filecoin.q3.option1',
        explanationKey: 'quests.ipfs_filecoin.q3.explanation'
      },
      {
        id: 'ipfs-4',
        questionKey: 'quests.ipfs_filecoin.q4.question',
        choices: [
          'quests.ipfs_filecoin.q4.option1',
          'quests.ipfs_filecoin.q4.option2',
          'quests.ipfs_filecoin.q4.option3',
          'quests.ipfs_filecoin.q4.option4'
        ],
        correctAnswerKey: 'quests.ipfs_filecoin.q4.option4',
        explanationKey: 'quests.ipfs_filecoin.q4.explanation'
      }
    ],
    prerequisites: [],
    tags: ['ipfs', 'filecoin', 'storage', 'decentralized'],
    estimatedTime: '48 dakika',
    completionRate: 0
  },
  {
    id: 'tokenomics',
    nameKey: 'quests.tokenomics.title',
    descriptionKey: 'quests.tokenomics.description',
    category: 'blockchain',
    difficulty: 'advanced',
    rewardAmount: 460,
    timeEstimate: 50,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmTokenomicsCert',
    lessons: [
      {
        id: 'tokenomics-1',
        questionKey: 'quests.tokenomics.q1.question',
        choices: [
          'quests.tokenomics.q1.option1',
          'quests.tokenomics.q1.option2',
          'quests.tokenomics.q1.option3',
          'quests.tokenomics.q1.option4'
        ],
        correctAnswerKey: 'quests.tokenomics.q1.option2',
        explanationKey: 'quests.tokenomics.q1.explanation'
      },
      {
        id: 'tokenomics-2',
        questionKey: 'quests.tokenomics.q2.question',
        choices: [
          'quests.tokenomics.q2.option1',
          'quests.tokenomics.q2.option2',
          'quests.tokenomics.q2.option3',
          'quests.tokenomics.q2.option4'
        ],
        correctAnswerKey: 'quests.tokenomics.q2.option3',
        explanationKey: 'quests.tokenomics.q2.explanation'
      },
      {
        id: 'tokenomics-3',
        questionKey: 'quests.tokenomics.q3.question',
        choices: [
          'quests.tokenomics.q3.option1',
          'quests.tokenomics.q3.option2',
          'quests.tokenomics.q3.option3',
          'quests.tokenomics.q3.option4'
        ],
        correctAnswerKey: 'quests.tokenomics.q3.option1',
        explanationKey: 'quests.tokenomics.q3.explanation'
      },
      {
        id: 'tokenomics-4',
        questionKey: 'quests.tokenomics.q4.question',
        choices: [
          'quests.tokenomics.q4.option1',
          'quests.tokenomics.q4.option2',
          'quests.tokenomics.q4.option3',
          'quests.tokenomics.q4.option4'
        ],
        correctAnswerKey: 'quests.tokenomics.q4.option4',
        explanationKey: 'quests.tokenomics.q4.explanation'
      },
      {
        id: 'tokenomics-5',
        questionKey: 'quests.tokenomics.q5.question',
        choices: [
          'quests.tokenomics.q5.option1',
          'quests.tokenomics.q5.option2',
          'quests.tokenomics.q5.option3',
          'quests.tokenomics.q5.option4'
        ],
        correctAnswerKey: 'quests.tokenomics.q5.option2',
        explanationKey: 'quests.tokenomics.q5.explanation'
      }
    ],
    prerequisites: [],
    tags: ['tokenomics', 'supply', 'demand', 'burn', 'economics'],
    estimatedTime: '50 dakika',
    completionRate: 0
  },
  {
    id: 'byzantine-fault-tolerance',
    nameKey: 'quests.byzantine_fault_tolerance.title',
    descriptionKey: 'quests.byzantine_fault_tolerance.description',
    category: 'blockchain',
    difficulty: 'advanced',
    rewardAmount: 440,
    timeEstimate: 52,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmBFTCert',
    lessons: [
      {
        id: 'bft-1',
        questionKey: 'quests.byzantine_fault_tolerance.q1.question',
        choices: [
          'quests.byzantine_fault_tolerance.q1.option1',
          'quests.byzantine_fault_tolerance.q1.option2',
          'quests.byzantine_fault_tolerance.q1.option3',
          'quests.byzantine_fault_tolerance.q1.option4'
        ],
        correctAnswerKey: 'quests.byzantine_fault_tolerance.q1.option2',
        explanationKey: 'quests.byzantine_fault_tolerance.q1.explanation'
      },
      {
        id: 'bft-2',
        questionKey: 'quests.byzantine_fault_tolerance.q2.question',
        choices: [
          'quests.byzantine_fault_tolerance.q2.option1',
          'quests.byzantine_fault_tolerance.q2.option2',
          'quests.byzantine_fault_tolerance.q2.option3',
          'quests.byzantine_fault_tolerance.q2.option4'
        ],
        correctAnswerKey: 'quests.byzantine_fault_tolerance.q2.option3',
        explanationKey: 'quests.byzantine_fault_tolerance.q2.explanation'
      },
      {
        id: 'bft-3',
        questionKey: 'quests.byzantine_fault_tolerance.q3.question',
        choices: [
          'quests.byzantine_fault_tolerance.q3.option1',
          'quests.byzantine_fault_tolerance.q3.option2',
          'quests.byzantine_fault_tolerance.q3.option3',
          'quests.byzantine_fault_tolerance.q3.option4'
        ],
        correctAnswerKey: 'quests.byzantine_fault_tolerance.q3.option1',
        explanationKey: 'quests.byzantine_fault_tolerance.q3.explanation'
      },
      {
        id: 'bft-4',
        questionKey: 'quests.byzantine_fault_tolerance.q4.question',
        choices: [
          'quests.byzantine_fault_tolerance.q4.option1',
          'quests.byzantine_fault_tolerance.q4.option2',
          'quests.byzantine_fault_tolerance.q4.option3',
          'quests.byzantine_fault_tolerance.q4.option4'
        ],
        correctAnswerKey: 'quests.byzantine_fault_tolerance.q4.option4',
        explanationKey: 'quests.byzantine_fault_tolerance.q4.explanation'
      },
      {
        id: 'bft-5',
        questionKey: 'quests.byzantine_fault_tolerance.q5.question',
        choices: [
          'quests.byzantine_fault_tolerance.q5.option1',
          'quests.byzantine_fault_tolerance.q5.option2',
          'quests.byzantine_fault_tolerance.q5.option3',
          'quests.byzantine_fault_tolerance.q5.option4'
        ],
        correctAnswerKey: 'quests.byzantine_fault_tolerance.q5.option2',
        explanationKey: 'quests.byzantine_fault_tolerance.q5.explanation'
      }
    ],
    prerequisites: [],
    tags: ['bft', 'consensus', 'theory', 'blockchain'],
    estimatedTime: '52 dakika',
    completionRate: 0
  },
  {
    id: 'cross-chain-messaging',
    nameKey: 'quests.cross_chain_messaging.title',
    descriptionKey: 'quests.cross_chain_messaging.description',
    category: 'blockchain',
    difficulty: 'advanced',
    rewardAmount: 490,
    timeEstimate: 55,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmCrossChainMessagingCert',
    lessons: [
      {
        id: 'ccm-1',
        questionKey: 'quests.cross_chain_messaging.q1.question',
        choices: [
          'quests.cross_chain_messaging.q1.option1',
          'quests.cross_chain_messaging.q1.option2',
          'quests.cross_chain_messaging.q1.option3',
          'quests.cross_chain_messaging.q1.option4'
        ],
        correctAnswerKey: 'quests.cross_chain_messaging.q1.option2',
        explanationKey: 'quests.cross_chain_messaging.q1.explanation'
      },
      {
        id: 'ccm-2',
        questionKey: 'quests.cross_chain_messaging.q2.question',
        choices: [
          'quests.cross_chain_messaging.q2.option1',
          'quests.cross_chain_messaging.q2.option2',
          'quests.cross_chain_messaging.q2.option3',
          'quests.cross_chain_messaging.q2.option4'
        ],
        correctAnswerKey: 'quests.cross_chain_messaging.q2.option3',
        explanationKey: 'quests.cross_chain_messaging.q2.explanation'
      },
      {
        id: 'ccm-3',
        questionKey: 'quests.cross_chain_messaging.q3.question',
        choices: [
          'quests.cross_chain_messaging.q3.option1',
          'quests.cross_chain_messaging.q3.option2',
          'quests.cross_chain_messaging.q3.option3',
          'quests.cross_chain_messaging.q3.option4'
        ],
        correctAnswerKey: 'quests.cross_chain_messaging.q3.option1',
        explanationKey: 'quests.cross_chain_messaging.q3.explanation'
      },
      {
        id: 'ccm-4',
        questionKey: 'quests.cross_chain_messaging.q4.question',
        choices: [
          'quests.cross_chain_messaging.q4.option1',
          'quests.cross_chain_messaging.q4.option2',
          'quests.cross_chain_messaging.q4.option3',
          'quests.cross_chain_messaging.q4.option4'
        ],
        correctAnswerKey: 'quests.cross_chain_messaging.q4.option4',
        explanationKey: 'quests.cross_chain_messaging.q4.explanation'
      },
      {
        id: 'ccm-5',
        questionKey: 'quests.cross_chain_messaging.q5.question',
        choices: [
          'quests.cross_chain_messaging.q5.option1',
          'quests.cross_chain_messaging.q5.option2',
          'quests.cross_chain_messaging.q5.option3',
          'quests.cross_chain_messaging.q5.option4'
        ],
        correctAnswerKey: 'quests.cross_chain_messaging.q5.option2',
        explanationKey: 'quests.cross_chain_messaging.q5.explanation'
      }
    ],
    prerequisites: [],
    tags: ['cross-chain', 'messaging', 'interoperability', 'communication'],
    estimatedTime: '55 dakika',
    completionRate: 0
  }
];

export const questCategories = [
  { id: 'all', nameKey: 'category.all', icon: '📚', color: 'slate' },
  { id: 'blockchain', nameKey: 'category.blockchain', icon: '⛓️', color: 'blue' },
  { id: 'smart-contracts', nameKey: 'category.smartContracts', icon: '🤖', color: 'purple' },
  { id: 'defi', nameKey: 'category.defi', icon: '💰', color: 'green' },
  { id: 'nft', nameKey: 'category.nft', icon: '🎨', color: 'pink' }
];

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
