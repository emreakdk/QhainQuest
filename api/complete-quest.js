// Vercel Serverless Function for Secure Quest Completion
// This function handles the secure token distribution logic

const { Server, Keypair, Asset, Operation, TransactionBuilder, Networks } = require('stellar-sdk');

// Initialize Stellar server for testnet
const server = new Server('https://horizon-testnet.stellar.org');

// Quest validation data (should match frontend questData.js)
const QUEST_DATA = {
  'stellar-fundamentals': {
    rewardAmount: 100,
    lessons: [
      { id: 'stellar-1', correctAnswer: 'Stellar Consensus Protocol (SCP)' },
      { id: 'stellar-2', correctAnswer: 'XLM (Stellar Lumens)' },
      { id: 'stellar-3', correctAnswer: 'Geleneksel finansal sistem ile köprü kuran kuruluşlar' },
      { id: 'stellar-4', correctAnswer: '2 XLM' },
      { id: 'stellar-5', correctAnswer: 'Python, JavaScript, Go, Java, C++' }
    ]
  },
  'soroban-smart-contracts': {
    rewardAmount: 250,
    lessons: [
      { id: 'soroban-1', correctAnswer: 'Stellar üzerinde bir akıllı kontrat platformu' },
      { id: 'soroban-2', correctAnswer: 'Rust' },
      { id: 'soroban-3', correctAnswer: 'Smart contract\'ların Stellar ağı ile etkileşim kurmasını sağlayan fonksiyonlar' },
      { id: 'soroban-4', correctAnswer: 'Contract bazlı izole storage' }
    ]
  },
  'defi-protocols': {
    rewardAmount: 300,
    lessons: [
      { id: 'defi-1', correctAnswer: 'Blockchain tabanlı finansal hizmetler' },
      { id: 'defi-2', correctAnswer: 'StellarSwap' },
      { id: 'defi-3', correctAnswer: 'Likidite sağlayarak token ödülleri kazanma' },
      { id: 'defi-4', correctAnswer: 'Likidite sağlarken token fiyat değişimlerinden kaynaklanan kayıp' }
    ]
  },
  'nft-ecosystem': {
    rewardAmount: 200,
    lessons: [
      { id: 'nft-1', correctAnswer: 'Non-Fungible Token' },
      { id: 'nft-2', correctAnswer: 'SEP-005' },
      { id: 'nft-3', correctAnswer: 'IPFS\'de' }
    ]
  },
  'advanced-stellar': {
    rewardAmount: 500,
    lessons: [
      { id: 'advanced-1', correctAnswer: 'Çoklu imza gerektiren işlemler' },
      { id: 'advanced-2', correctAnswer: 'Farklı asset\'ler arasında otomatik dönüşüm yapan ödeme' },
      { id: 'advanced-3', correctAnswer: 'Transaction birden fazla operation içerebilir' }
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

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed. Use POST.' 
    });
  }

  try {
    const { userAddress, questId, answers } = req.body;

    // Validate required fields
    if (!userAddress || !questId || !answers) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: userAddress, questId, and answers are required.'
      });
    }

    // Validate Stellar address format
    if (!userAddress.match(/^[G-Z]{56}$/)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Stellar address format.'
      });
    }

    // Check if quest exists
    const quest = QUEST_DATA[questId];
    if (!quest) {
      return res.status(404).json({
        success: false,
        error: 'Quest not found.'
      });
    }

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
    const paymentResult = await performTokenPayment(userAddress, quest.rewardAmount);

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
  
  // Check if all required lessons are answered
  if (userAnswers.length !== quest.lessons.length) {
    errors.push(`Expected ${quest.lessons.length} answers, got ${userAnswers.length}`);
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
async function performTokenPayment(userAddress, amount) {
  try {
    // TODO: Replace with actual token configuration
    const TOKEN_CODE = process.env.TOKEN_CODE || 'CQT'; // Will be provided by user
    const TOKEN_ISSUER = process.env.TOKEN_ISSUER_PUBLIC_KEY; // Will be provided by user
    const DISTRIBUTOR_SECRET_KEY = process.env.DISTRIBUTOR_SECRET_KEY;

    if (!TOKEN_ISSUER || !DISTRIBUTOR_SECRET_KEY) {
      throw new Error('Token configuration missing. Please set TOKEN_ISSUER_PUBLIC_KEY and DISTRIBUTOR_SECRET_KEY environment variables.');
    }

    // Create the custom asset
    const customAsset = new Asset(TOKEN_CODE, TOKEN_ISSUER);

    // Load the distributor account
    const distributorKeypair = Keypair.fromSecret(DISTRIBUTOR_SECRET_KEY);
    const distributorAccount = await server.loadAccount(distributorKeypair.publicKey());

    // Create the payment operation
    const paymentOperation = Operation.payment({
      destination: userAddress,
      asset: customAsset,
      amount: amount.toString()
    });

    // Build the transaction
    const transaction = new TransactionBuilder(distributorAccount, {
      fee: '100', // Base fee
      networkPassphrase: Networks.TESTNET
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
