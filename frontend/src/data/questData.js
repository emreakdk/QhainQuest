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
    id: 'smart-contract-gas-optimization',
    nameKey: 'quests.smart_contract_gas_optimization.title',
    descriptionKey: 'quests.smart_contract_gas_optimization.description',
    category: 'smart-contracts',
    difficulty: 'intermediate',
    rewardAmount: 350,
    timeEstimate: 40,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmSmartContractGasOptimizationCert',
    lessons: [
      {
        id: 'sc-gas-1',
        questionKey: 'quests.smart_contract_gas_optimization.q1.question',
        choices: [
          'quests.smart_contract_gas_optimization.q1.option1',
          'quests.smart_contract_gas_optimization.q1.option2',
          'quests.smart_contract_gas_optimization.q1.option3',
          'quests.smart_contract_gas_optimization.q1.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_gas_optimization.q1.option2',
        explanationKey: 'quests.smart_contract_gas_optimization.q1.explanation'
      },
      {
        id: 'sc-gas-2',
        questionKey: 'quests.smart_contract_gas_optimization.q2.question',
        choices: [
          'quests.smart_contract_gas_optimization.q2.option1',
          'quests.smart_contract_gas_optimization.q2.option2',
          'quests.smart_contract_gas_optimization.q2.option3',
          'quests.smart_contract_gas_optimization.q2.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_gas_optimization.q2.option3',
        explanationKey: 'quests.smart_contract_gas_optimization.q2.explanation'
      },
      {
        id: 'sc-gas-3',
        questionKey: 'quests.smart_contract_gas_optimization.q3.question',
        choices: [
          'quests.smart_contract_gas_optimization.q3.option1',
          'quests.smart_contract_gas_optimization.q3.option2',
          'quests.smart_contract_gas_optimization.q3.option3',
          'quests.smart_contract_gas_optimization.q3.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_gas_optimization.q3.option1',
        explanationKey: 'quests.smart_contract_gas_optimization.q3.explanation'
      },
      {
        id: 'sc-gas-4',
        questionKey: 'quests.smart_contract_gas_optimization.q4.question',
        choices: [
          'quests.smart_contract_gas_optimization.q4.option1',
          'quests.smart_contract_gas_optimization.q4.option2',
          'quests.smart_contract_gas_optimization.q4.option3',
          'quests.smart_contract_gas_optimization.q4.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_gas_optimization.q4.option4',
        explanationKey: 'quests.smart_contract_gas_optimization.q4.explanation'
      },
      {
        id: 'sc-gas-5',
        questionKey: 'quests.smart_contract_gas_optimization.q5.question',
        choices: [
          'quests.smart_contract_gas_optimization.q5.option1',
          'quests.smart_contract_gas_optimization.q5.option2',
          'quests.smart_contract_gas_optimization.q5.option3',
          'quests.smart_contract_gas_optimization.q5.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_gas_optimization.q5.option2',
        explanationKey: 'quests.smart_contract_gas_optimization.q5.explanation'
      }
    ],
    prerequisites: [],
    tags: ['smart-contracts', 'gas', 'optimization', 'efficiency'],
    estimatedTime: '40 dakika',
    completionRate: 0
  },

  {
    id: 'smart-contract-reentrancy',
    nameKey: 'quests.smart_contract_reentrancy.title',
    descriptionKey: 'quests.smart_contract_reentrancy.description',
    category: 'smart-contracts',
    difficulty: 'advanced',
    rewardAmount: 450,
    timeEstimate: 45,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmSmartContractReentrancyCert',
    lessons: [
      {
        id: 'sc-reentrancy-1',
        questionKey: 'quests.smart_contract_reentrancy.q1.question',
        choices: [
          'quests.smart_contract_reentrancy.q1.option1',
          'quests.smart_contract_reentrancy.q1.option2',
          'quests.smart_contract_reentrancy.q1.option3',
          'quests.smart_contract_reentrancy.q1.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_reentrancy.q1.option2',
        explanationKey: 'quests.smart_contract_reentrancy.q1.explanation'
      },
      {
        id: 'sc-reentrancy-2',
        questionKey: 'quests.smart_contract_reentrancy.q2.question',
        choices: [
          'quests.smart_contract_reentrancy.q2.option1',
          'quests.smart_contract_reentrancy.q2.option2',
          'quests.smart_contract_reentrancy.q2.option3',
          'quests.smart_contract_reentrancy.q2.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_reentrancy.q2.option3',
        explanationKey: 'quests.smart_contract_reentrancy.q2.explanation'
      },
      {
        id: 'sc-reentrancy-3',
        questionKey: 'quests.smart_contract_reentrancy.q3.question',
        choices: [
          'quests.smart_contract_reentrancy.q3.option1',
          'quests.smart_contract_reentrancy.q3.option2',
          'quests.smart_contract_reentrancy.q3.option3',
          'quests.smart_contract_reentrancy.q3.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_reentrancy.q3.option1',
        explanationKey: 'quests.smart_contract_reentrancy.q3.explanation'
      },
      {
        id: 'sc-reentrancy-4',
        questionKey: 'quests.smart_contract_reentrancy.q4.question',
        choices: [
          'quests.smart_contract_reentrancy.q4.option1',
          'quests.smart_contract_reentrancy.q4.option2',
          'quests.smart_contract_reentrancy.q4.option3',
          'quests.smart_contract_reentrancy.q4.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_reentrancy.q4.option4',
        explanationKey: 'quests.smart_contract_reentrancy.q4.explanation'
      },
      {
        id: 'sc-reentrancy-5',
        questionKey: 'quests.smart_contract_reentrancy.q5.question',
        choices: [
          'quests.smart_contract_reentrancy.q5.option1',
          'quests.smart_contract_reentrancy.q5.option2',
          'quests.smart_contract_reentrancy.q5.option3',
          'quests.smart_contract_reentrancy.q5.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_reentrancy.q5.option2',
        explanationKey: 'quests.smart_contract_reentrancy.q5.explanation'
      }
    ],
    prerequisites: [],
    tags: ['smart-contracts', 'reentrancy', 'security', 'vulnerabilities'],
    estimatedTime: '45 dakika',
    completionRate: 0
  },

  {
    id: 'smart-contract-oracle',
    nameKey: 'quests.smart_contract_oracle.title',
    descriptionKey: 'quests.smart_contract_oracle.description',
    category: 'smart-contracts',
    difficulty: 'advanced',
    rewardAmount: 420,
    timeEstimate: 42,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmSmartContractOracleCert',
    lessons: [
      {
        id: 'sc-oracle-1',
        questionKey: 'quests.smart_contract_oracle.q1.question',
        choices: [
          'quests.smart_contract_oracle.q1.option1',
          'quests.smart_contract_oracle.q1.option2',
          'quests.smart_contract_oracle.q1.option3',
          'quests.smart_contract_oracle.q1.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_oracle.q1.option2',
        explanationKey: 'quests.smart_contract_oracle.q1.explanation'
      },
      {
        id: 'sc-oracle-2',
        questionKey: 'quests.smart_contract_oracle.q2.question',
        choices: [
          'quests.smart_contract_oracle.q2.option1',
          'quests.smart_contract_oracle.q2.option2',
          'quests.smart_contract_oracle.q2.option3',
          'quests.smart_contract_oracle.q2.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_oracle.q2.option3',
        explanationKey: 'quests.smart_contract_oracle.q2.explanation'
      },
      {
        id: 'sc-oracle-3',
        questionKey: 'quests.smart_contract_oracle.q3.question',
        choices: [
          'quests.smart_contract_oracle.q3.option1',
          'quests.smart_contract_oracle.q3.option2',
          'quests.smart_contract_oracle.q3.option3',
          'quests.smart_contract_oracle.q3.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_oracle.q3.option1',
        explanationKey: 'quests.smart_contract_oracle.q3.explanation'
      },
      {
        id: 'sc-oracle-4',
        questionKey: 'quests.smart_contract_oracle.q4.question',
        choices: [
          'quests.smart_contract_oracle.q4.option1',
          'quests.smart_contract_oracle.q4.option2',
          'quests.smart_contract_oracle.q4.option3',
          'quests.smart_contract_oracle.q4.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_oracle.q4.option4',
        explanationKey: 'quests.smart_contract_oracle.q4.explanation'
      },
      {
        id: 'sc-oracle-5',
        questionKey: 'quests.smart_contract_oracle.q5.question',
        choices: [
          'quests.smart_contract_oracle.q5.option1',
          'quests.smart_contract_oracle.q5.option2',
          'quests.smart_contract_oracle.q5.option3',
          'quests.smart_contract_oracle.q5.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_oracle.q5.option2',
        explanationKey: 'quests.smart_contract_oracle.q5.explanation'
      }
    ],
    prerequisites: [],
    tags: ['smart-contracts', 'oracle', 'chainlink', 'price-feeds'],
    estimatedTime: '42 dakika',
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
    id: 'defi-yield-farming',
    nameKey: 'quests.defi_yield_farming.title',
    descriptionKey: 'quests.defi_yield_farming.description',
    category: 'defi',
    difficulty: 'intermediate',
    rewardAmount: 310,
    timeEstimate: 38,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmDeFiYieldFarmingCert',
    lessons: [
      {
        id: 'defi-yf-1',
        questionKey: 'quests.defi_yield_farming.q1.question',
        choices: [
          'quests.defi_yield_farming.q1.option1',
          'quests.defi_yield_farming.q1.option2',
          'quests.defi_yield_farming.q1.option3',
          'quests.defi_yield_farming.q1.option4'
        ],
        correctAnswerKey: 'quests.defi_yield_farming.q1.option2',
        explanationKey: 'quests.defi_yield_farming.q1.explanation'
      },
      {
        id: 'defi-yf-2',
        questionKey: 'quests.defi_yield_farming.q2.question',
        choices: [
          'quests.defi_yield_farming.q2.option1',
          'quests.defi_yield_farming.q2.option2',
          'quests.defi_yield_farming.q2.option3',
          'quests.defi_yield_farming.q2.option4'
        ],
        correctAnswerKey: 'quests.defi_yield_farming.q2.option3',
        explanationKey: 'quests.defi_yield_farming.q2.explanation'
      },
      {
        id: 'defi-yf-3',
        questionKey: 'quests.defi_yield_farming.q3.question',
        choices: [
          'quests.defi_yield_farming.q3.option1',
          'quests.defi_yield_farming.q3.option2',
          'quests.defi_yield_farming.q3.option3',
          'quests.defi_yield_farming.q3.option4'
        ],
        correctAnswerKey: 'quests.defi_yield_farming.q3.option1',
        explanationKey: 'quests.defi_yield_farming.q3.explanation'
      },
      {
        id: 'defi-yf-4',
        questionKey: 'quests.defi_yield_farming.q4.question',
        choices: [
          'quests.defi_yield_farming.q4.option1',
          'quests.defi_yield_farming.q4.option2',
          'quests.defi_yield_farming.q4.option3',
          'quests.defi_yield_farming.q4.option4'
        ],
        correctAnswerKey: 'quests.defi_yield_farming.q4.option2',
        explanationKey: 'quests.defi_yield_farming.q4.explanation'
      }
    ],
    prerequisites: [],
    tags: ['defi', 'yield-farming', 'staking', 'rewards'],
    estimatedTime: '38 dakika',
    completionRate: 0
  },
  {
    id: 'defi-impermanent-loss',
    nameKey: 'quests.defi_impermanent_loss.title',
    descriptionKey: 'quests.defi_impermanent_loss.description',
    category: 'defi',
    difficulty: 'intermediate',
    rewardAmount: 320,
    timeEstimate: 35,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmDeFiImpermanentLossCert',
    lessons: [
      {
        id: 'defi-il-1',
        questionKey: 'quests.defi_impermanent_loss.q1.question',
        choices: [
          'quests.defi_impermanent_loss.q1.option1',
          'quests.defi_impermanent_loss.q1.option2',
          'quests.defi_impermanent_loss.q1.option3',
          'quests.defi_impermanent_loss.q1.option4'
        ],
        correctAnswerKey: 'quests.defi_impermanent_loss.q1.option2',
        explanationKey: 'quests.defi_impermanent_loss.q1.explanation'
      },
      {
        id: 'defi-il-2',
        questionKey: 'quests.defi_impermanent_loss.q2.question',
        choices: [
          'quests.defi_impermanent_loss.q2.option1',
          'quests.defi_impermanent_loss.q2.option2',
          'quests.defi_impermanent_loss.q2.option3',
          'quests.defi_impermanent_loss.q2.option4'
        ],
        correctAnswerKey: 'quests.defi_impermanent_loss.q2.option3',
        explanationKey: 'quests.defi_impermanent_loss.q2.explanation'
      },
      {
        id: 'defi-il-3',
        questionKey: 'quests.defi_impermanent_loss.q3.question',
        choices: [
          'quests.defi_impermanent_loss.q3.option1',
          'quests.defi_impermanent_loss.q3.option2',
          'quests.defi_impermanent_loss.q3.option3',
          'quests.defi_impermanent_loss.q3.option4'
        ],
        correctAnswerKey: 'quests.defi_impermanent_loss.q3.option1',
        explanationKey: 'quests.defi_impermanent_loss.q3.explanation'
      },
      {
        id: 'defi-il-4',
        questionKey: 'quests.defi_impermanent_loss.q4.question',
        choices: [
          'quests.defi_impermanent_loss.q4.option1',
          'quests.defi_impermanent_loss.q4.option2',
          'quests.defi_impermanent_loss.q4.option3',
          'quests.defi_impermanent_loss.q4.option4'
        ],
        correctAnswerKey: 'quests.defi_impermanent_loss.q4.option4',
        explanationKey: 'quests.defi_impermanent_loss.q4.explanation'
      }
    ],
    prerequisites: [],
    tags: ['defi', 'impermanent-loss', 'liquidity', 'risk'],
    estimatedTime: '35 dakika',
    completionRate: 0
  },
  {
    id: 'defi-amm',
    nameKey: 'quests.defi_amm.title',
    descriptionKey: 'quests.defi_amm.description',
    category: 'defi',
    difficulty: 'intermediate',
    rewardAmount: 300,
    timeEstimate: 32,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmDeFiAMMCert',
    lessons: [
      {
        id: 'defi-amm-1',
        questionKey: 'quests.defi_amm.q1.question',
        choices: [
          'quests.defi_amm.q1.option1',
          'quests.defi_amm.q1.option2',
          'quests.defi_amm.q1.option3',
          'quests.defi_amm.q1.option4'
        ],
        correctAnswerKey: 'quests.defi_amm.q1.option2',
        explanationKey: 'quests.defi_amm.q1.explanation'
      },
      {
        id: 'defi-amm-2',
        questionKey: 'quests.defi_amm.q2.question',
        choices: [
          'quests.defi_amm.q2.option1',
          'quests.defi_amm.q2.option2',
          'quests.defi_amm.q2.option3',
          'quests.defi_amm.q2.option4'
        ],
        correctAnswerKey: 'quests.defi_amm.q2.option3',
        explanationKey: 'quests.defi_amm.q2.explanation'
      },
      {
        id: 'defi-amm-3',
        questionKey: 'quests.defi_amm.q3.question',
        choices: [
          'quests.defi_amm.q3.option1',
          'quests.defi_amm.q3.option2',
          'quests.defi_amm.q3.option3',
          'quests.defi_amm.q3.option4'
        ],
        correctAnswerKey: 'quests.defi_amm.q3.option1',
        explanationKey: 'quests.defi_amm.q3.explanation'
      },
      {
        id: 'defi-amm-4',
        questionKey: 'quests.defi_amm.q4.question',
        choices: [
          'quests.defi_amm.q4.option1',
          'quests.defi_amm.q4.option2',
          'quests.defi_amm.q4.option3',
          'quests.defi_amm.q4.option4'
        ],
        correctAnswerKey: 'quests.defi_amm.q4.option4',
        explanationKey: 'quests.defi_amm.q4.explanation'
      }
    ],
    prerequisites: [],
    tags: ['defi', 'amm', 'uniswap', 'curve', 'balancer'],
    estimatedTime: '32 dakika',
    completionRate: 0
  },
  {
    id: 'defi-liquidity-pools',
    nameKey: 'quests.defi_liquidity_pools.title',
    descriptionKey: 'quests.defi_liquidity_pools.description',
    category: 'defi',
    difficulty: 'intermediate',
    rewardAmount: 280,
    timeEstimate: 30,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmDeFiLiquidityPoolsCert',
    lessons: [
      {
        id: 'defi-lp-1',
        questionKey: 'quests.defi_liquidity_pools.q1.question',
        choices: [
          'quests.defi_liquidity_pools.q1.option1',
          'quests.defi_liquidity_pools.q1.option2',
          'quests.defi_liquidity_pools.q1.option3',
          'quests.defi_liquidity_pools.q1.option4'
        ],
        correctAnswerKey: 'quests.defi_liquidity_pools.q1.option2',
        explanationKey: 'quests.defi_liquidity_pools.q1.explanation'
      },
      {
        id: 'defi-lp-2',
        questionKey: 'quests.defi_liquidity_pools.q2.question',
        choices: [
          'quests.defi_liquidity_pools.q2.option1',
          'quests.defi_liquidity_pools.q2.option2',
          'quests.defi_liquidity_pools.q2.option3',
          'quests.defi_liquidity_pools.q2.option4'
        ],
        correctAnswerKey: 'quests.defi_liquidity_pools.q2.option3',
        explanationKey: 'quests.defi_liquidity_pools.q2.explanation'
      },
      {
        id: 'defi-lp-3',
        questionKey: 'quests.defi_liquidity_pools.q3.question',
        choices: [
          'quests.defi_liquidity_pools.q3.option1',
          'quests.defi_liquidity_pools.q3.option2',
          'quests.defi_liquidity_pools.q3.option3',
          'quests.defi_liquidity_pools.q3.option4'
        ],
        correctAnswerKey: 'quests.defi_liquidity_pools.q3.option1',
        explanationKey: 'quests.defi_liquidity_pools.q3.explanation'
      },
      {
        id: 'defi-lp-4',
        questionKey: 'quests.defi_liquidity_pools.q4.question',
        choices: [
          'quests.defi_liquidity_pools.q4.option1',
          'quests.defi_liquidity_pools.q4.option2',
          'quests.defi_liquidity_pools.q4.option3',
          'quests.defi_liquidity_pools.q4.option4'
        ],
        correctAnswerKey: 'quests.defi_liquidity_pools.q4.option4',
        explanationKey: 'quests.defi_liquidity_pools.q4.explanation'
      }
    ],
    prerequisites: [],
    tags: ['defi', 'liquidity', 'pools', 'uniswap', 'amm'],
    estimatedTime: '30 dakika',
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
    id: 'nft-metadata',
    nameKey: 'quests.nft_metadata.title',
    descriptionKey: 'quests.nft_metadata.description',
    category: 'nft',
    difficulty: 'beginner',
    rewardAmount: 150,
    timeEstimate: 20,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmNFTMetadataCert',
    lessons: [
      {
        id: 'nft-metadata-1',
        questionKey: 'quests.nft_metadata.q1.question',
        choices: [
          'quests.nft_metadata.q1.option1',
          'quests.nft_metadata.q1.option2',
          'quests.nft_metadata.q1.option3',
          'quests.nft_metadata.q1.option4'
        ],
        correctAnswerKey: 'quests.nft_metadata.q1.option2',
        explanationKey: 'quests.nft_metadata.q1.explanation'
      },
      {
        id: 'nft-metadata-2',
        questionKey: 'quests.nft_metadata.q2.question',
        choices: [
          'quests.nft_metadata.q2.option1',
          'quests.nft_metadata.q2.option2',
          'quests.nft_metadata.q2.option3',
          'quests.nft_metadata.q2.option4'
        ],
        correctAnswerKey: 'quests.nft_metadata.q2.option3',
        explanationKey: 'quests.nft_metadata.q2.explanation'
      },
      {
        id: 'nft-metadata-3',
        questionKey: 'quests.nft_metadata.q3.question',
        choices: [
          'quests.nft_metadata.q3.option1',
          'quests.nft_metadata.q3.option2',
          'quests.nft_metadata.q3.option3',
          'quests.nft_metadata.q3.option4'
        ],
        correctAnswerKey: 'quests.nft_metadata.q3.option1',
        explanationKey: 'quests.nft_metadata.q3.explanation'
      },
      {
        id: 'nft-metadata-4',
        questionKey: 'quests.nft_metadata.q4.question',
        choices: [
          'quests.nft_metadata.q4.option1',
          'quests.nft_metadata.q4.option2',
          'quests.nft_metadata.q4.option3',
          'quests.nft_metadata.q4.option4'
        ],
        correctAnswerKey: 'quests.nft_metadata.q4.option4',
        explanationKey: 'quests.nft_metadata.q4.explanation'
      }
    ],
    prerequisites: [],
    tags: ['nft', 'metadata', 'json', 'attributes'],
    estimatedTime: '20 dakika',
    completionRate: 0
  },
  {
    id: 'nft-minting',
    nameKey: 'quests.nft_minting.title',
    descriptionKey: 'quests.nft_minting.description',
    category: 'nft',
    difficulty: 'beginner',
    rewardAmount: 160,
    timeEstimate: 18,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmNFTMintingCert',
    lessons: [
      {
        id: 'nft-minting-1',
        questionKey: 'quests.nft_minting.q1.question',
        choices: [
          'quests.nft_minting.q1.option1',
          'quests.nft_minting.q1.option2',
          'quests.nft_minting.q1.option3',
          'quests.nft_minting.q1.option4'
        ],
        correctAnswerKey: 'quests.nft_minting.q1.option2',
        explanationKey: 'quests.nft_minting.q1.explanation'
      },
      {
        id: 'nft-minting-2',
        questionKey: 'quests.nft_minting.q2.question',
        choices: [
          'quests.nft_minting.q2.option1',
          'quests.nft_minting.q2.option2',
          'quests.nft_minting.q2.option3',
          'quests.nft_minting.q2.option4'
        ],
        correctAnswerKey: 'quests.nft_minting.q2.option3',
        explanationKey: 'quests.nft_minting.q2.explanation'
      },
      {
        id: 'nft-minting-3',
        questionKey: 'quests.nft_minting.q3.question',
        choices: [
          'quests.nft_minting.q3.option1',
          'quests.nft_minting.q3.option2',
          'quests.nft_minting.q3.option3',
          'quests.nft_minting.q3.option4'
        ],
        correctAnswerKey: 'quests.nft_minting.q3.option1',
        explanationKey: 'quests.nft_minting.q3.explanation'
      },
      {
        id: 'nft-minting-4',
        questionKey: 'quests.nft_minting.q4.question',
        choices: [
          'quests.nft_minting.q4.option1',
          'quests.nft_minting.q4.option2',
          'quests.nft_minting.q4.option3',
          'quests.nft_minting.q4.option4'
        ],
        correctAnswerKey: 'quests.nft_minting.q4.option4',
        explanationKey: 'quests.nft_minting.q4.explanation'
      }
    ],
    prerequisites: [],
    tags: ['nft', 'minting', 'creation', 'blockchain'],
    estimatedTime: '18 dakika',
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
    id: 'nft-erc721-vs-erc1155',
    nameKey: 'quests.nft_erc721_vs_erc1155.title',
    descriptionKey: 'quests.nft_erc721_vs_erc1155.description',
    category: 'nft',
    difficulty: 'intermediate',
    rewardAmount: 300,
    timeEstimate: 35,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmNFTStandardsCert',
    lessons: [
      {
        id: 'nft-standards-1',
        questionKey: 'quests.nft_erc721_vs_erc1155.q1.question',
        choices: [
          'quests.nft_erc721_vs_erc1155.q1.option1',
          'quests.nft_erc721_vs_erc1155.q1.option2',
          'quests.nft_erc721_vs_erc1155.q1.option3',
          'quests.nft_erc721_vs_erc1155.q1.option4'
        ],
        correctAnswerKey: 'quests.nft_erc721_vs_erc1155.q1.option2',
        explanationKey: 'quests.nft_erc721_vs_erc1155.q1.explanation'
      },
      {
        id: 'nft-standards-2',
        questionKey: 'quests.nft_erc721_vs_erc1155.q2.question',
        choices: [
          'quests.nft_erc721_vs_erc1155.q2.option1',
          'quests.nft_erc721_vs_erc1155.q2.option2',
          'quests.nft_erc721_vs_erc1155.q2.option3',
          'quests.nft_erc721_vs_erc1155.q2.option4'
        ],
        correctAnswerKey: 'quests.nft_erc721_vs_erc1155.q2.option3',
        explanationKey: 'quests.nft_erc721_vs_erc1155.q2.explanation'
      },
      {
        id: 'nft-standards-3',
        questionKey: 'quests.nft_erc721_vs_erc1155.q3.question',
        choices: [
          'quests.nft_erc721_vs_erc1155.q3.option1',
          'quests.nft_erc721_vs_erc1155.q3.option2',
          'quests.nft_erc721_vs_erc1155.q3.option3',
          'quests.nft_erc721_vs_erc1155.q3.option4'
        ],
        correctAnswerKey: 'quests.nft_erc721_vs_erc1155.q3.option1',
        explanationKey: 'quests.nft_erc721_vs_erc1155.q3.explanation'
      },
      {
        id: 'nft-standards-4',
        questionKey: 'quests.nft_erc721_vs_erc1155.q4.question',
        choices: [
          'quests.nft_erc721_vs_erc1155.q4.option1',
          'quests.nft_erc721_vs_erc1155.q4.option2',
          'quests.nft_erc721_vs_erc1155.q4.option3',
          'quests.nft_erc721_vs_erc1155.q4.option4'
        ],
        correctAnswerKey: 'quests.nft_erc721_vs_erc1155.q4.option4',
        explanationKey: 'quests.nft_erc721_vs_erc1155.q4.explanation'
      },
      {
        id: 'nft-standards-5',
        questionKey: 'quests.nft_erc721_vs_erc1155.q5.question',
        choices: [
          'quests.nft_erc721_vs_erc1155.q5.option1',
          'quests.nft_erc721_vs_erc1155.q5.option2',
          'quests.nft_erc721_vs_erc1155.q5.option3',
          'quests.nft_erc721_vs_erc1155.q5.option4'
        ],
        correctAnswerKey: 'quests.nft_erc721_vs_erc1155.q5.option2',
        explanationKey: 'quests.nft_erc721_vs_erc1155.q5.explanation'
      }
    ],
    prerequisites: [],
    tags: ['nft', 'erc721', 'erc1155', 'standards', 'ethereum'],
    estimatedTime: '35 dakika',
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
    id: 'nft-royalty-fees',
    nameKey: 'quests.nft_royalty_fees.title',
    descriptionKey: 'quests.nft_royalty_fees.description',
    category: 'nft',
    difficulty: 'intermediate',
    rewardAmount: 280,
    timeEstimate: 28,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmNFTRoyaltyCert',
    lessons: [
      {
        id: 'nft-royalty-1',
        questionKey: 'quests.nft_royalty_fees.q1.question',
        choices: [
          'quests.nft_royalty_fees.q1.option1',
          'quests.nft_royalty_fees.q1.option2',
          'quests.nft_royalty_fees.q1.option3',
          'quests.nft_royalty_fees.q1.option4'
        ],
        correctAnswerKey: 'quests.nft_royalty_fees.q1.option2',
        explanationKey: 'quests.nft_royalty_fees.q1.explanation'
      },
      {
        id: 'nft-royalty-2',
        questionKey: 'quests.nft_royalty_fees.q2.question',
        choices: [
          'quests.nft_royalty_fees.q2.option1',
          'quests.nft_royalty_fees.q2.option2',
          'quests.nft_royalty_fees.q2.option3',
          'quests.nft_royalty_fees.q2.option4'
        ],
        correctAnswerKey: 'quests.nft_royalty_fees.q2.option3',
        explanationKey: 'quests.nft_royalty_fees.q2.explanation'
      },
      {
        id: 'nft-royalty-3',
        questionKey: 'quests.nft_royalty_fees.q3.question',
        choices: [
          'quests.nft_royalty_fees.q3.option1',
          'quests.nft_royalty_fees.q3.option2',
          'quests.nft_royalty_fees.q3.option3',
          'quests.nft_royalty_fees.q3.option4'
        ],
        correctAnswerKey: 'quests.nft_royalty_fees.q3.option1',
        explanationKey: 'quests.nft_royalty_fees.q3.explanation'
      },
      {
        id: 'nft-royalty-4',
        questionKey: 'quests.nft_royalty_fees.q4.question',
        choices: [
          'quests.nft_royalty_fees.q4.option1',
          'quests.nft_royalty_fees.q4.option2',
          'quests.nft_royalty_fees.q4.option3',
          'quests.nft_royalty_fees.q4.option4'
        ],
        correctAnswerKey: 'quests.nft_royalty_fees.q4.option4',
        explanationKey: 'quests.nft_royalty_fees.q4.explanation'
      }
    ],
    prerequisites: [],
    tags: ['nft', 'royalty', 'fees', 'erc2981', 'marketplace'],
    estimatedTime: '28 dakika',
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
    id: 'smart-contract-solidity-basics',
    nameKey: 'quests.smart_contract_solidity_basics.title',
    descriptionKey: 'quests.smart_contract_solidity_basics.description',
    category: 'smart-contracts',
    difficulty: 'beginner',
    rewardAmount: 200,
    timeEstimate: 30,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmSmartContractSolidityBasicsCert',
    lessons: [
      {
        id: 'sc-solidity-1',
        questionKey: 'quests.smart_contract_solidity_basics.q1.question',
        choices: [
          'quests.smart_contract_solidity_basics.q1.option1',
          'quests.smart_contract_solidity_basics.q1.option2',
          'quests.smart_contract_solidity_basics.q1.option3',
          'quests.smart_contract_solidity_basics.q1.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_solidity_basics.q1.option2',
        explanationKey: 'quests.smart_contract_solidity_basics.q1.explanation'
      },
      {
        id: 'sc-solidity-2',
        questionKey: 'quests.smart_contract_solidity_basics.q2.question',
        choices: [
          'quests.smart_contract_solidity_basics.q2.option1',
          'quests.smart_contract_solidity_basics.q2.option2',
          'quests.smart_contract_solidity_basics.q2.option3',
          'quests.smart_contract_solidity_basics.q2.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_solidity_basics.q2.option3',
        explanationKey: 'quests.smart_contract_solidity_basics.q2.explanation'
      },
      {
        id: 'sc-solidity-3',
        questionKey: 'quests.smart_contract_solidity_basics.q3.question',
        choices: [
          'quests.smart_contract_solidity_basics.q3.option1',
          'quests.smart_contract_solidity_basics.q3.option2',
          'quests.smart_contract_solidity_basics.q3.option3',
          'quests.smart_contract_solidity_basics.q3.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_solidity_basics.q3.option1',
        explanationKey: 'quests.smart_contract_solidity_basics.q3.explanation'
      },
      {
        id: 'sc-solidity-4',
        questionKey: 'quests.smart_contract_solidity_basics.q4.question',
        choices: [
          'quests.smart_contract_solidity_basics.q4.option1',
          'quests.smart_contract_solidity_basics.q4.option2',
          'quests.smart_contract_solidity_basics.q4.option3',
          'quests.smart_contract_solidity_basics.q4.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_solidity_basics.q4.option4',
        explanationKey: 'quests.smart_contract_solidity_basics.q4.explanation'
      },
      {
        id: 'sc-solidity-5',
        questionKey: 'quests.smart_contract_solidity_basics.q5.question',
        choices: [
          'quests.smart_contract_solidity_basics.q5.option1',
          'quests.smart_contract_solidity_basics.q5.option2',
          'quests.smart_contract_solidity_basics.q5.option3',
          'quests.smart_contract_solidity_basics.q5.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_solidity_basics.q5.option2',
        explanationKey: 'quests.smart_contract_solidity_basics.q5.explanation'
      }
    ],
    prerequisites: [],
    tags: ['smart-contracts', 'solidity', 'ethereum', 'programming'],
    estimatedTime: '30 dakika',
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
    id: 'defi-stablecoins-algorithmic',
    nameKey: 'quests.defi_stablecoins_algorithmic.title',
    descriptionKey: 'quests.defi_stablecoins_algorithmic.description',
    category: 'defi',
    difficulty: 'advanced',
    rewardAmount: 400,
    timeEstimate: 45,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmDeFiStablecoinsAlgorithmicCert',
    lessons: [
      {
        id: 'defi-stable-algo-1',
        questionKey: 'quests.defi_stablecoins_algorithmic.q1.question',
        choices: [
          'quests.defi_stablecoins_algorithmic.q1.option1',
          'quests.defi_stablecoins_algorithmic.q1.option2',
          'quests.defi_stablecoins_algorithmic.q1.option3',
          'quests.defi_stablecoins_algorithmic.q1.option4'
        ],
        correctAnswerKey: 'quests.defi_stablecoins_algorithmic.q1.option2',
        explanationKey: 'quests.defi_stablecoins_algorithmic.q1.explanation'
      },
      {
        id: 'defi-stable-algo-2',
        questionKey: 'quests.defi_stablecoins_algorithmic.q2.question',
        choices: [
          'quests.defi_stablecoins_algorithmic.q2.option1',
          'quests.defi_stablecoins_algorithmic.q2.option2',
          'quests.defi_stablecoins_algorithmic.q2.option3',
          'quests.defi_stablecoins_algorithmic.q2.option4'
        ],
        correctAnswerKey: 'quests.defi_stablecoins_algorithmic.q2.option3',
        explanationKey: 'quests.defi_stablecoins_algorithmic.q2.explanation'
      },
      {
        id: 'defi-stable-algo-3',
        questionKey: 'quests.defi_stablecoins_algorithmic.q3.question',
        choices: [
          'quests.defi_stablecoins_algorithmic.q3.option1',
          'quests.defi_stablecoins_algorithmic.q3.option2',
          'quests.defi_stablecoins_algorithmic.q3.option3',
          'quests.defi_stablecoins_algorithmic.q3.option4'
        ],
        correctAnswerKey: 'quests.defi_stablecoins_algorithmic.q3.option1',
        explanationKey: 'quests.defi_stablecoins_algorithmic.q3.explanation'
      },
      {
        id: 'defi-stable-algo-4',
        questionKey: 'quests.defi_stablecoins_algorithmic.q4.question',
        choices: [
          'quests.defi_stablecoins_algorithmic.q4.option1',
          'quests.defi_stablecoins_algorithmic.q4.option2',
          'quests.defi_stablecoins_algorithmic.q4.option3',
          'quests.defi_stablecoins_algorithmic.q4.option4'
        ],
        correctAnswerKey: 'quests.defi_stablecoins_algorithmic.q4.option4',
        explanationKey: 'quests.defi_stablecoins_algorithmic.q4.explanation'
      }
    ],
    prerequisites: [],
    tags: ['defi', 'stablecoin', 'algorithmic', 'dai', 'frax'],
    estimatedTime: '45 dakika',
    completionRate: 0
  },
  {
    id: 'smart-contract-soroban-structure',
    nameKey: 'quests.smart_contract_soroban_structure.title',
    descriptionKey: 'quests.smart_contract_soroban_structure.description',
    category: 'smart-contracts',
    difficulty: 'intermediate',
    rewardAmount: 330,
    timeEstimate: 40,
    certificateNftUrl: 'https://ipfs.io/ipfs/QmSmartContractSorobanStructureCert',
    lessons: [
      {
        id: 'sc-soroban-1',
        questionKey: 'quests.smart_contract_soroban_structure.q1.question',
        choices: [
          'quests.smart_contract_soroban_structure.q1.option1',
          'quests.smart_contract_soroban_structure.q1.option2',
          'quests.smart_contract_soroban_structure.q1.option3',
          'quests.smart_contract_soroban_structure.q1.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_soroban_structure.q1.option2',
        explanationKey: 'quests.smart_contract_soroban_structure.q1.explanation'
      },
      {
        id: 'sc-soroban-2',
        questionKey: 'quests.smart_contract_soroban_structure.q2.question',
        choices: [
          'quests.smart_contract_soroban_structure.q2.option1',
          'quests.smart_contract_soroban_structure.q2.option2',
          'quests.smart_contract_soroban_structure.q2.option3',
          'quests.smart_contract_soroban_structure.q2.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_soroban_structure.q2.option3',
        explanationKey: 'quests.smart_contract_soroban_structure.q2.explanation'
      },
      {
        id: 'sc-soroban-3',
        questionKey: 'quests.smart_contract_soroban_structure.q3.question',
        choices: [
          'quests.smart_contract_soroban_structure.q3.option1',
          'quests.smart_contract_soroban_structure.q3.option2',
          'quests.smart_contract_soroban_structure.q3.option3',
          'quests.smart_contract_soroban_structure.q3.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_soroban_structure.q3.option1',
        explanationKey: 'quests.smart_contract_soroban_structure.q3.explanation'
      },
      {
        id: 'sc-soroban-4',
        questionKey: 'quests.smart_contract_soroban_structure.q4.question',
        choices: [
          'quests.smart_contract_soroban_structure.q4.option1',
          'quests.smart_contract_soroban_structure.q4.option2',
          'quests.smart_contract_soroban_structure.q4.option3',
          'quests.smart_contract_soroban_structure.q4.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_soroban_structure.q4.option4',
        explanationKey: 'quests.smart_contract_soroban_structure.q4.explanation'
      },
      {
        id: 'sc-soroban-5',
        questionKey: 'quests.smart_contract_soroban_structure.q5.question',
        choices: [
          'quests.smart_contract_soroban_structure.q5.option1',
          'quests.smart_contract_soroban_structure.q5.option2',
          'quests.smart_contract_soroban_structure.q5.option3',
          'quests.smart_contract_soroban_structure.q5.option4'
        ],
        correctAnswerKey: 'quests.smart_contract_soroban_structure.q5.option2',
        explanationKey: 'quests.smart_contract_soroban_structure.q5.explanation'
      }
    ],
    prerequisites: ['soroban-smart-contracts'],
    tags: ['smart-contracts', 'soroban', 'stellar', 'rust', 'structure'],
    estimatedTime: '40 dakika',
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
