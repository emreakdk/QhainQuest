// Vercel Serverless Function for Secure Quest Completion
// This function handles the secure token distribution logic

// Import stellar-sdk for CommonJS environment
// Using StellarSdk.default.Server to correctly access the class from the ESM module in a CommonJS environment
const StellarSdk = require('stellar-sdk');

// Initialize Stellar server for testnet
// Using Horizon instead of Server (Stellar SDK v11+ change)
const server = new StellarSdk.default.Horizon.Server('https://horizon-testnet.stellar.org');

// Quest validation data - imported from frontend questData.js
// This ensures backend and frontend use the same quest definitions
const QUEST_DATA = {
  'stellar-fundamentals': {
    id: 'stellar-fundamentals',
    name: 'Stellar Temelleri',
    rewardAmount: 100,
    lessons: [
      { 
        id: 'stellar-1', 
        correctAnswer: 'Stellar Consensus Protocol (SCP)',
        question: 'Stellar ağında işlemler hangi konsensüs algoritması ile doğrulanır?'
      },
      { 
        id: 'stellar-2', 
        correctAnswer: 'XLM (Stellar Lumens)',
        question: 'Stellar ağının yerel tokenı nedir?'
      },
      { 
        id: 'stellar-3', 
        correctAnswer: 'Geleneksel finansal sistem ile köprü kuran kuruluşlar',
        question: 'Stellar\'da "Anchors" nedir?'
      },
      { 
        id: 'stellar-4', 
        correctAnswer: '2 XLM',
        question: 'Stellar\'da minimum hesap bakiyesi nedir?'
      },
      { 
        id: 'stellar-5', 
        correctAnswer: 'Python, JavaScript, Go, Java, C++',
        question: 'Stellar geliştiricileri için ana SDK hangi dillerde mevcuttur?'
      }
    ]
  },
  'soroban-smart-contracts': {
    id: 'soroban-smart-contracts',
    name: 'Soroban Smart Contracts',
    rewardAmount: 250,
    lessons: [
      { 
        id: 'soroban-1', 
        correctAnswer: 'Stellar üzerinde bir akıllı kontrat platformu',
        question: 'Soroban nedir?'
      },
      { 
        id: 'soroban-2', 
        correctAnswer: 'Rust',
        question: 'Soroban akıllı kontratları hangi dilde yazılır?'
      },
      { 
        id: 'soroban-3', 
        correctAnswer: 'Smart contract\'ların Stellar ağı ile etkileşim kurmasını sağlayan fonksiyonlar',
        question: 'Soroban\'da "host functions" nedir?'
      },
      { 
        id: 'soroban-4', 
        correctAnswer: 'Contract bazlı izole storage',
        question: 'Soroban\'da "storage" nasıl çalışır?'
      },
      { 
        id: 'soroban-5', 
        correctAnswer: 'Gas fee olarak XLM kullanılır',
        question: 'Soroban\'da transaction fee olarak ne kullanılır?'
      }
    ]
  },
  'defi-protocols': {
    id: 'defi-protocols',
    name: 'DeFi Protokolleri',
    rewardAmount: 300,
    lessons: [
      { 
        id: 'defi-1', 
        correctAnswer: 'Blockchain tabanlı finansal hizmetler',
        question: 'Merkeziyetsiz finans (DeFi) ne anlama gelir?'
      },
      { 
        id: 'defi-2', 
        correctAnswer: 'StellarSwap',
        question: 'Stellar\'da en popüler AMM protokolü nedir?'
      },
      { 
        id: 'defi-3', 
        correctAnswer: 'Likidite sağlayarak token ödülleri kazanma',
        question: 'DeFi\'de "yield farming" nedir?'
      },
      { 
        id: 'defi-4', 
        correctAnswer: 'Likidite sağlarken token fiyat değişimlerinden kaynaklanan kayıp',
        question: 'DeFi\'de "impermanent loss" nedir?'
      },
      { 
        id: 'defi-5', 
        correctAnswer: 'AMM (Automated Market Maker) protokolü',
        question: 'AMM protokolü ne anlama gelir?'
      }
    ]
  },
  'nft-ecosystem': {
    id: 'nft-ecosystem',
    name: 'NFT Ekosistemi',
    rewardAmount: 200,
    lessons: [
      { 
        id: 'nft-1', 
        correctAnswer: 'Non-Fungible Token',
        question: 'NFT\'nin açılımı nedir?'
      },
      { 
        id: 'nft-2', 
        correctAnswer: 'SEP-005',
        question: 'Stellar\'da NFT\'ler hangi standarda göre oluşturulur?'
      },
      { 
        id: 'nft-3', 
        correctAnswer: 'IPFS\'de',
        question: 'NFT\'lerin "metadata"\'sı nerede saklanır?'
      },
      { 
        id: 'nft-4', 
        correctAnswer: 'Metadata hash ile',
        question: 'NFT\'lerin benzersizliği nasıl sağlanır?'
      },
      { 
        id: 'nft-5', 
        correctAnswer: 'Stellar\'ın yerel NFT standardı',
        question: 'SEP-005 nedir?'
      }
    ]
  },
  'advanced-stellar': {
    id: 'advanced-stellar',
    name: 'İleri Seviye Stellar',
    rewardAmount: 500,
    lessons: [
      { 
        id: 'advanced-1', 
        correctAnswer: 'Çoklu imza gerektiren işlemler',
        question: 'Stellar\'da "multi-signature" nedir?'
      },
      { 
        id: 'advanced-2', 
        correctAnswer: 'Farklı asset\'ler arasında otomatik dönüşüm yapan ödeme',
        question: 'Stellar\'da "path payment" nedir?'
      },
      { 
        id: 'advanced-3', 
        correctAnswer: 'Transaction birden fazla operation içerebilir',
        question: 'Stellar\'da "operation" ve "transaction" arasındaki fark nedir?'
      },
      { 
        id: 'advanced-4', 
        correctAnswer: 'Path payment ile otomatik dönüşüm',
        question: 'Path payment\'in avantajı nedir?'
      },
      { 
        id: 'advanced-5', 
        correctAnswer: 'Multi-signature hesap güvenliği',
        question: 'Multi-signature hesabın güvenlik avantajı nedir?'
      }
    ]
  }
};

// Simple in-memory database for quest completion tracking
// In production, use a proper database like Vercel KV, Supabase, or Firebase
const completedQuests = new Set();

export default async function handler(req, res) {
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(204).end(); // 204 No Content for preflight
  }

  // --- INCOMING REQUEST DIAGNOSTIC ---
  console.log('--- INCOMING REQUEST DIAGNOSTIC ---');
  console.log('Method:', req.method);
  console.log('Headers:', req.headers);
  console.log('Received Body:', req.body);
  console.log('Body Type:', typeof req.body);
  console.log('--- END DIAGNOSTIC ---');

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed. Use POST.' 
    });
  }

  try {
    const { userAddress, questId, answers } = req.body;

    // Enhanced validation with detailed logging
    console.log('--- VALIDATION DIAGNOSTIC ---');
    console.log('userAddress:', userAddress, 'Type:', typeof userAddress);
    console.log('questId:', questId, 'Type:', typeof questId);
    console.log('answers:', answers, 'Type:', typeof answers);
    console.log('answers is Array:', Array.isArray(answers));
    
    // Validate required fields
    if (!userAddress || !questId || !answers) {
      console.log('Validation failed: Missing required fields');
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: userAddress, questId, and answers are required.',
        details: {
          userAddress: userAddress || 'MISSING',
          questId: questId || 'MISSING', 
          answers: answers || 'MISSING'
        }
      });
    }

    // Validate answers is an array
    if (!Array.isArray(answers)) {
      console.log('Validation failed: answers is not an array');
      return res.status(400).json({
        success: false,
        error: 'Invalid answers: answers must be an array.'
      });
    }

    // Validate Stellar address format (Stellar public keys start with 'G' and are 56 chars)
    if (!userAddress.match(/^G[A-Z2-7]{55}$/)) {
      console.log('Stellar address validation failed for:', userAddress);
      return res.status(400).json({
        success: false,
        error: 'Invalid Stellar address format. Must start with G and be 56 characters long.'
      });
    }

    // Find the quest in our data - this is the key fix!
    const quest = QUEST_DATA[questId];
    if (!quest) {
      console.log('Quest not found in QUEST_DATA:', questId);
      console.log('Available quests:', Object.keys(QUEST_DATA));
      return res.status(404).json({
        success: false,
        error: `Quest with ID '${questId}' does not exist.`
      });
    }

    console.log('--- QUEST FOUND ---');
    console.log('Quest ID:', quest.id);
    console.log('Quest Name:', quest.name);
    console.log('Expected answers count:', quest.lessons.length);
    console.log('Received answers count:', answers.length);

    // Check if user has already completed this quest
    const completionKey = `${userAddress}-${questId}`;
    if (completedQuests.has(completionKey)) {
      return res.status(409).json({
        success: false,
        error: 'Quest already completed by this user.'
      });
    }

    // Validate answers
    const validationResult = validateAnswers(quest, answers);
    if (!validationResult.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid answers provided.',
        details: validationResult.errors
      });
    }

    // Perform Stellar token payment
    const paymentResult = await performTokenPayment(userAddress, quest.rewardAmount, req);

    if (!paymentResult.success) {
      return res.status(500).json({
        success: false,
        error: 'Token payment failed.',
        details: paymentResult.error
      });
    }

    // Record quest completion
    completedQuests.add(completionKey);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Quest completed successfully!',
      data: {
        questId,
        rewardAmount: quest.rewardAmount,
        transactionHash: paymentResult.transactionHash,
        completedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Quest completion error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error.',
      details: error.message
    });
  }
}

// Validate user answers against correct answers
function validateAnswers(quest, userAnswers) {
  const errors = [];
  
  // Enhanced validation logging
  console.log('--- ANSWER VALIDATION DIAGNOSTIC ---');
  console.log('Quest ID:', quest.id || 'unknown');
  console.log('Expected answers count:', quest.lessons.length);
  console.log('Received answers count:', userAnswers.length);
  console.log('Quest lessons:', quest.lessons.map(l => l.id || 'no-id'));
  console.log('User answers:', userAnswers);
  
  // Check if all required lessons are answered
  if (userAnswers.length !== quest.lessons.length) {
    const errorMsg = `Expected ${quest.lessons.length} answers, got ${userAnswers.length}. Quest requires ${quest.lessons.length} lessons to be completed.`;
    console.log('Validation failed:', errorMsg);
    errors.push(errorMsg);
    return { isValid: false, errors };
  }

  // Validate each answer
  for (let i = 0; i < quest.lessons.length; i++) {
    const lesson = quest.lessons[i];
    const userAnswer = userAnswers[i];
    
    if (!userAnswer || typeof userAnswer !== 'string') {
      errors.push(`Invalid answer format for lesson ${lesson.id}`);
      continue;
    }

    if (userAnswer.trim() !== lesson.correctAnswer.trim()) {
      errors.push(`Incorrect answer for lesson ${lesson.id}: expected "${lesson.correctAnswer}", got "${userAnswer}"`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Perform the actual Stellar token payment
async function performTokenPayment(userAddress, amount, req) {
  try {
    // TODO: Replace with actual token configuration
    const TOKEN_CODE = process.env.TOKEN_CODE || 'CQT'; // Will be provided by user
    const TOKEN_ISSUER = process.env.TOKEN_ISSUER_PUBLIC_KEY; // Will be provided by user
    const DISTRIBUTOR_SECRET_KEY = process.env.DISTRIBUTOR_SECRET_KEY;

    if (!TOKEN_ISSUER || !DISTRIBUTOR_SECRET_KEY) {
      throw new Error('Token configuration missing. Please set TOKEN_ISSUER_PUBLIC_KEY and DISTRIBUTOR_SECRET_KEY environment variables.');
    }

    // --- START CRITICAL DIAGNOSTIC LOGS ---
    console.log('--- RUNTIME KEY DIAGNOSTICS ---');

    // 1. Log the Issuer Public Key from environment variables
    const issuerPublicKey = process.env.TOKEN_ISSUER_PUBLIC_KEY;
    console.log(`[DIAGNOSTIC] Issuer Public Key from env: ${issuerPublicKey}`);

    // 2. Derive and log the Distributor Public Key from the secret key
    const distributorSecretKey = process.env.DISTRIBUTOR_SECRET_KEY;
    const distributorKeypair = StellarSdk.default.Keypair.fromSecret(distributorSecretKey);
    const distributorPublicKey = distributorKeypair.publicKey();
    console.log(`[DIAGNOSTIC] Distributor Public Key derived from secret: ${distributorPublicKey}`);

    // 3. Log the User Public Key from the request body
    const userPublicKey = req.body.userAddress;
    console.log(`[DIAGNOSTIC] User Public Key from request: ${userPublicKey}`);

    // 4. Log Token Code
    console.log(`[DIAGNOSTIC] Token Code: ${TOKEN_CODE}`);
    
    console.log('--- END DIAGNOSTIC LOGS ---');
    // --- DIAGNOSTIC CODE ENDS HERE ---

    // Create the custom asset
    const customAsset = new StellarSdk.default.Asset(TOKEN_CODE, TOKEN_ISSUER);

    // Load the distributor account
    const distributorAccount = await server.loadAccount(distributorPublicKey);

    // --- FINAL PRE-FLIGHT DIAGNOSTICS ---
    console.log('--- FINAL TRANSACTION PARAMETERS ---');
    
    const finalDistributorPublicKey = distributorKeypair.publicKey();
    const finalUserPublicKey = req.body.userAddress;
    const finalIssuerPublicKey = process.env.TOKEN_ISSUER_PUBLIC_KEY;
    const finalTokenCode = process.env.TOKEN_CODE;
    const finalTokenAmount = amount.toString();

    console.log(`[FINAL CHECK] Distributor Account: ${finalDistributorPublicKey}`);
    console.log(`[FINAL CHECK] User Destination Account: ${finalUserPublicKey}`);
    console.log(`[FINAL CHECK] Token Issuer Account: ${finalIssuerPublicKey}`);
    console.log(`[FINAL CHECK] Token Code: ${finalTokenCode}`);
    console.log(`[FINAL CHECK] Token Amount: ${finalTokenAmount}`);

    const asset = new StellarSdk.default.Asset(finalTokenCode, finalIssuerPublicKey);

    console.log('[FINAL CHECK] Asset Object Created:', asset);
    console.log('--- END OF FINAL DIAGNOSTICS ---');

    // Create the payment operation
    const paymentOperation = StellarSdk.default.Operation.payment({
      destination: finalUserPublicKey,
      asset: asset,
      amount: finalTokenAmount
    });

    // Build the transaction
    const transaction = new StellarSdk.default.TransactionBuilder(distributorAccount, {
      fee: '100', // Base fee
      networkPassphrase: StellarSdk.default.Networks.TESTNET
    })
      .addOperation(paymentOperation)
      .setTimeout(30) // 30 seconds timeout
      .build();

    // Sign the transaction
    transaction.sign(distributorKeypair);

    // Submit the transaction
    const result = await server.submitTransaction(transaction);

    return {
      success: true,
      transactionHash: result.hash
    };

  } catch (error) {
    console.error('Token payment error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
