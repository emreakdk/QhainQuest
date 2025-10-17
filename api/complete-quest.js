// Vercel Serverless Function for Quest Completion Validation
// This function ONLY validates quest answers - NO token distribution
// Token distribution is now handled by /api/claim-tokens endpoint

// Quest validation data - updated to use i18n keys for validation
// This ensures backend and frontend use the same quest definitions
const QUEST_DATA = {
  'stellar-fundamentals': {
    id: 'stellar-fundamentals',
    name: 'Stellar Temelleri',
    rewardAmount: 100,
    lessons: [
      { 
        id: 'stellar-1', 
        correctAnswerKey: 'quests.stellar_fundamentals.q1.option2',
        questionKey: 'quests.stellar_fundamentals.q1.question'
      },
      { 
        id: 'stellar-2', 
        correctAnswerKey: 'quests.stellar_fundamentals.q2.option3',
        questionKey: 'quests.stellar_fundamentals.q2.question'
      },
      { 
        id: 'stellar-3', 
        correctAnswerKey: 'quests.stellar_fundamentals.q3.option2',
        questionKey: 'quests.stellar_fundamentals.q3.question'
      },
      { 
        id: 'stellar-4', 
        correctAnswerKey: 'quests.stellar_fundamentals.q4.option3',
        questionKey: 'quests.stellar_fundamentals.q4.question'
      },
      { 
        id: 'stellar-5', 
        correctAnswerKey: 'quests.stellar_fundamentals.q5.option4',
        questionKey: 'quests.stellar_fundamentals.q5.question'
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
        correctAnswerKey: 'quests.soroban_smart_contracts.q1.option2',
        questionKey: 'quests.soroban_smart_contracts.q1.question'
      },
      { 
        id: 'soroban-2', 
        correctAnswerKey: 'quests.soroban_smart_contracts.q2.option1',
        questionKey: 'quests.soroban_smart_contracts.q2.question'
      },
      { 
        id: 'soroban-3', 
        correctAnswerKey: 'quests.soroban_smart_contracts.q3.option2',
        questionKey: 'quests.soroban_smart_contracts.q3.question'
      },
      { 
        id: 'soroban-4', 
        correctAnswerKey: 'quests.soroban_smart_contracts.q4.option1',
        questionKey: 'quests.soroban_smart_contracts.q4.question'
      },
      { 
        id: 'soroban-5', 
        correctAnswerKey: 'quests.soroban_smart_contracts.q5.option3',
        questionKey: 'quests.soroban_smart_contracts.q5.question'
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
        correctAnswerKey: 'quests.defi_protocols.q1.option2',
        questionKey: 'quests.defi_protocols.q1.question'
      },
      { 
        id: 'defi-2', 
        correctAnswerKey: 'quests.defi_protocols.q2.option1',
        questionKey: 'quests.defi_protocols.q2.question'
      },
      { 
        id: 'defi-3', 
        correctAnswerKey: 'quests.defi_protocols.q3.option2',
        questionKey: 'quests.defi_protocols.q3.question'
      },
      { 
        id: 'defi-4', 
        correctAnswerKey: 'quests.defi_protocols.q4.option3',
        questionKey: 'quests.defi_protocols.q4.question'
      },
      { 
        id: 'defi-5', 
        correctAnswerKey: 'quests.defi_protocols.q5.option1',
        questionKey: 'quests.defi_protocols.q5.question'
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
        correctAnswerKey: 'quests.nft_ecosystem.q1.option1',
        questionKey: 'quests.nft_ecosystem.q1.question'
      },
      { 
        id: 'nft-2', 
        correctAnswerKey: 'quests.nft_ecosystem.q2.option2',
        questionKey: 'quests.nft_ecosystem.q2.question'
      },
      { 
        id: 'nft-3', 
        correctAnswerKey: 'quests.nft_ecosystem.q3.option3',
        questionKey: 'quests.nft_ecosystem.q3.question'
      },
      { 
        id: 'nft-4', 
        correctAnswerKey: 'quests.nft_ecosystem.q4.option2',
        questionKey: 'quests.nft_ecosystem.q4.question'
      },
      { 
        id: 'nft-5', 
        correctAnswerKey: 'quests.nft_ecosystem.q5.option1',
        questionKey: 'quests.nft_ecosystem.q5.question'
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
        correctAnswerKey: 'quests.advanced_stellar.q1.option2',
        questionKey: 'quests.advanced_stellar.q1.question'
      },
      { 
        id: 'advanced-2', 
        correctAnswerKey: 'quests.advanced_stellar.q2.option1',
        questionKey: 'quests.advanced_stellar.q2.question'
      },
      { 
        id: 'advanced-3', 
        correctAnswerKey: 'quests.advanced_stellar.q3.option3',
        questionKey: 'quests.advanced_stellar.q3.question'
      },
      { 
        id: 'advanced-4', 
        correctAnswerKey: 'quests.advanced_stellar.q4.option2',
        questionKey: 'quests.advanced_stellar.q4.question'
      },
      { 
        id: 'advanced-5', 
        correctAnswerKey: 'quests.advanced_stellar.q5.option1',
        questionKey: 'quests.advanced_stellar.q5.question'
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
    const { userAddress, questId, answers, isDemoMode } = req.body;

    // Enhanced validation with detailed logging
    console.log('--- VALIDATION DIAGNOSTIC ---');
    console.log('userAddress:', userAddress, 'Type:', typeof userAddress);
    console.log('questId:', questId, 'Type:', typeof questId);
    console.log('answers:', answers, 'Type:', typeof answers);
    console.log('isDemoMode:', isDemoMode, 'Type:', typeof isDemoMode);
    console.log('answers is Array:', Array.isArray(answers));
    
    // Validate required fields (userAddress is optional for demo mode)
    if (!questId || !answers) {
      console.log('Validation failed: Missing required fields');
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: questId and answers are required.',
        details: {
          userAddress: userAddress || 'MISSING',
          questId: questId || 'MISSING', 
          answers: answers || 'MISSING',
          isDemoMode: isDemoMode || false
        }
      });
    }

    // For non-demo mode, userAddress is required
    if (!isDemoMode && !userAddress) {
      console.log('Validation failed: userAddress required for non-demo mode');
      return res.status(400).json({
        success: false,
        error: 'userAddress is required for non-demo mode.',
        details: {
          userAddress: userAddress || 'MISSING',
          isDemoMode: isDemoMode || false
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

    // Validate Stellar address format (only for non-demo mode)
    if (!isDemoMode && userAddress && !userAddress.match(/^G[A-Z2-7]{55}$/)) {
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

    // Check if user has already completed this quest (skip for demo mode)
    if (!isDemoMode && userAddress) {
      const completionKey = `${userAddress}-${questId}`;
      if (completedQuests.has(completionKey)) {
        return res.status(409).json({
          success: false,
          error: 'Quest already completed by this user.'
        });
      }
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

    // Record quest completion (only for non-demo mode)
    if (!isDemoMode && userAddress) {
      const completionKey = `${userAddress}-${questId}`;
      completedQuests.add(completionKey);
    }

    // Return success response with reward amount for frontend to add to claimable balance
    return res.status(200).json({
      success: true,
      message: 'Quest completed successfully!',
      data: {
        questId,
        rewardAmount: quest.rewardAmount,
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

    if (userAnswer.trim() !== lesson.correctAnswerKey.trim()) {
      errors.push(`Incorrect answer for lesson ${lesson.id}: expected "${lesson.correctAnswerKey}", got "${userAnswer}"`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Token payment logic moved to /api/claim-tokens.js endpoint
