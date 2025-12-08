
let QUEST_DATA = null;

const completedQuests = new Set();

/**
 * Quest Completion API Endpoint
 * 
 * Handles quest completion validation and reward calculation.
 * Cloud-function-friendly: Stateless handler suitable for serverless deployment.
 * 
 * TODO: For Huawei FunctionGraph deployment:
 * - Ensure environment variables are set in FunctionGraph configuration
 * - Configure API Gateway to route /api/complete-quest to this function
 * - Set appropriate timeout (30s recommended)
 */
export default async function handler(req, res) {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const startTime = Date.now();

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end(); // 204 No Content for preflight
  }

  console.log(`[${requestId}] Quest completion request received`);

  if (!QUEST_DATA) {
    try {
      console.log('Loading quest data dynamically...');
      const questDataModule = await import('../frontend/src/data/questData.js');
      const questDatabase = questDataModule.questDatabase;
      
      QUEST_DATA = {};
      questDatabase.forEach(quest => {
        QUEST_DATA[quest.id] = {
          id: quest.id,
          name: quest.nameKey,
          rewardAmount: quest.rewardAmount,
          lessons: quest.lessons.map(lesson => ({
            id: lesson.id,
            correctAnswerKey: lesson.correctAnswerKey,
            questionKey: lesson.questionKey
          }))
        };
      });
      
      console.log('Loaded quest data:', Object.keys(QUEST_DATA));
    } catch (error) {
      console.error('Error loading quest data:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to load quest data.',
        details: error.message
      });
    }
  }

  console.log('--- INCOMING REQUEST DIAGNOSTIC ---');
  console.log('Method:', req.method);
  console.log('Headers:', req.headers);
  console.log('Received Body:', req.body);
  console.log('Body Type:', typeof req.body);
  console.log('--- END DIAGNOSTIC ---');

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed. Use POST.' 
    });
  }

  try {
    const { userAddress, questId, answers, isDemoMode, mistakeCount } = req.body;

    console.log('--- VALIDATION DIAGNOSTIC ---');
    console.log('userAddress:', userAddress, 'Type:', typeof userAddress);
    console.log('questId:', questId, 'Type:', typeof questId);
    console.log('answers:', answers, 'Type:', typeof answers);
    console.log('isDemoMode:', isDemoMode, 'Type:', typeof isDemoMode);
    console.log('mistakeCount:', mistakeCount, 'Type:', typeof mistakeCount);
    console.log('answers is Array:', Array.isArray(answers));
    
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

    if (!Array.isArray(answers)) {
      console.log('Validation failed: answers is not an array');
      return res.status(400).json({
        success: false,
        error: 'Invalid answers: answers must be an array.'
      });
    }

    if (!isDemoMode && userAddress && !userAddress.match(/^G[A-Z2-7]{55}$/)) {
      console.log('Stellar address validation failed for:', userAddress);
      return res.status(400).json({
        success: false,
        error: 'Invalid Stellar address format. Must start with G and be 56 characters long.'
      });
    }

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
    console.log('Quest lessons:', quest.lessons.map(l => ({ id: l.id, correctAnswerKey: l.correctAnswerKey })));
    console.log('User answers:', answers);

    if (!isDemoMode && userAddress) {
      const completionKey = `${userAddress}-${questId}`;
      if (completedQuests.has(completionKey)) {
        return res.status(409).json({
          success: false,
          error: 'Quest already completed by this user.'
        });
      }
    }

    const validationResult = validateAnswers(quest, answers);
    if (!validationResult.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid answers provided.',
        details: validationResult.errors
      });
    }

    if (!isDemoMode && userAddress) {
      const completionKey = `${userAddress}-${questId}`;
      completedQuests.add(completionKey);
    }

    // Log mistakeCount for security audit
    console.log(`[${requestId}] Quest completed - mistakeCount: ${mistakeCount || 0}, userAddress: ${userAddress || 'demo'}, questId: ${questId}`);
    
    return res.status(200).json({
      success: true,
      message: 'Quest completed successfully!',
      data: {
        questId,
        rewardAmount: quest.rewardAmount,
        mistakeCount: mistakeCount || 0,
        completedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[${requestId}] Quest completion error after ${duration}ms:`, error);
    console.error(`[${requestId}] Error stack:`, error.stack);
    
    return res.status(500).json({
      success: false,
      error: 'Internal server error.',
      details: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred. Please try again later.',
      requestId
    });
  }
}

function validateAnswers(quest, userAnswers) {
  const errors = [];
  
  console.log('--- ANSWER VALIDATION DIAGNOSTIC ---');
  console.log('Quest ID:', quest.id || 'unknown');
  console.log('Expected answers count:', quest.lessons.length);
  console.log('Received answers count:', userAnswers.length);
  console.log('Quest lessons:', quest.lessons.map(l => ({ id: l.id, correctAnswerKey: l.correctAnswerKey })));
  console.log('User answers:', userAnswers);
  
  if (userAnswers.length !== quest.lessons.length) {
    const errorMsg = `Expected ${quest.lessons.length} answers, got ${userAnswers.length}. Quest requires ${quest.lessons.length} lessons to be completed.`;
    console.log('Validation failed:', errorMsg);
    errors.push(errorMsg);
    return { isValid: false, errors };
  }

  for (let i = 0; i < quest.lessons.length; i++) {
    const lesson = quest.lessons[i];
    const userAnswer = userAnswers[i];
    
    console.log(`--- VALIDATING LESSON ${i + 1}/${quest.lessons.length} ---`);
    console.log('Lesson ID:', lesson.id);
    console.log('Expected answer key:', lesson.correctAnswerKey);
    console.log('Received answer key:', userAnswer);
    console.log('Answer match:', userAnswer === lesson.correctAnswerKey);
    
    if (!userAnswer || typeof userAnswer !== 'string') {
      const errorMsg = `Invalid answer format for lesson ${lesson.id}: expected string, got ${typeof userAnswer}`;
      console.log('Validation failed:', errorMsg);
      errors.push(errorMsg);
      continue;
    }

    if (userAnswer.trim() !== lesson.correctAnswerKey.trim()) {
      const errorMsg = `Incorrect answer for lesson ${lesson.id}: expected "${lesson.correctAnswerKey}", got "${userAnswer}"`;
      console.log('Validation failed:', errorMsg);
      errors.push(errorMsg);
    } else {
      console.log('✅ Lesson', lesson.id, 'answer is correct');
    }
  }

  const isValid = errors.length === 0;
  console.log('--- VALIDATION RESULT ---');
  console.log('Is valid:', isValid);
  console.log('Errors:', errors);

  return {
    isValid,
    errors
  };
}

