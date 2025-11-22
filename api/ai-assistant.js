/**
 * AI Assistant API Endpoint
 * 
 * Production-ready AI assistant endpoint for ChainQuest learning platform.
 * Integrates with Huawei Cloud LLM with graceful fallback to local fallback engine.
 * 
 * Features:
 * - Huawei Cloud LLM integration (when configured)
 * - English/Turkish language support
 * - Graceful error handling
 * - Cloud fallback mode when Huawei Cloud is unavailable
 * 
 * Environment Variables:
 * - HUAWEI_LLM_ENDPOINT: Huawei Cloud LLM API endpoint (required, e.g., https://api-ap-southeast-1.modelarts-maas.com/v1/chat/completions)
 * - HUAWEI_LLM_TOKEN: Authentication token (required)
 * - HUAWEI_LLM_MODEL: Model name (default: deepseek-v3.1)
 * 
 * Note: The API automatically uses Huawei Cloud LLM when both HUAWEI_LLM_ENDPOINT and HUAWEI_LLM_TOKEN are present.
 * If Huawei Cloud is unavailable, it falls back to the local fallback engine.
 */

export default async function handler(req, res) {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const startTime = Date.now();

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    // Default to English for method errors (no body parsed yet)
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.',
      answer: null
    });
  }

  try {
    const { type, prompt, context = {}, questId, userAddress, language = 'en' } = req.body;

    // Normalize language early for error messages
    const requestLanguage = (language === 'tr' || language === 'turkish') ? 'tr' : 'en';

    // Validate request
    if (!type || !prompt) {
      const errorMessage = requestLanguage === 'tr'
        ? 'Eksik alanlar: type ve prompt gereklidir.'
        : 'Missing required fields: type and prompt are required.';
      return res.status(400).json({
        success: false,
        error: errorMessage,
        answer: null
      });
    }

    // Validate type
    const validTypes = ['explain', 'recommend', 'help', 'analyze'];
    if (!validTypes.includes(type)) {
      const errorMessage = requestLanguage === 'tr'
        ? `Geçersiz tip. Şunlardan biri olmalıdır: ${validTypes.join(', ')}`
        : `Invalid type. Must be one of: ${validTypes.join(', ')}`;
      return res.status(400).json({
        success: false,
        error: errorMessage,
        answer: null
      });
    }

    // Normalize language (en or tr)
    let normalizedLanguage = (language === 'tr' || language === 'turkish') ? 'tr' : 'en';

    // Detect language override from user prompt (e.g., "türkçe konuş", "speak turkish", etc.)
    const detectedLanguage = detectLanguageFromPrompt(prompt, normalizedLanguage);
    if (detectedLanguage) {
      normalizedLanguage = detectedLanguage;
      console.log(`[${requestId}] Language overridden to ${normalizedLanguage} based on user prompt`);
    }

    // Get AI response with mode indicator
    const aiResponseResult = await getAIResponse(type, prompt, context, questId, userAddress, normalizedLanguage);

    const duration = Date.now() - startTime;
    console.log(`[${requestId}] AI response generated in ${duration}ms (type: ${type}, language: ${normalizedLanguage}, mode: ${aiResponseResult.mode})`);

    return res.status(200).json({
      success: true,
      answer: aiResponseResult.response,
      mode: aiResponseResult.mode, // 'huawei' or 'cloud-fallback'
      data: {
        type,
        response: aiResponseResult.response,
        mode: aiResponseResult.mode,
        timestamp: new Date().toISOString()
      },
      error: null
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[${requestId}] Error after ${duration}ms:`, error);
    console.error(`[${requestId}] Error stack:`, error.stack);

    // Never crash - always return a valid JSON response
    // Try to detect language from request body for error message
    const errorLanguage = (req.body?.language === 'tr' || req.body?.language === 'turkish') ? 'tr' : 'en';
    const errorMessage = errorLanguage === 'tr'
      ? 'AI hizmeti geçici olarak kullanılamıyor. Lütfen daha sonra tekrar deneyin.'
      : 'AI service temporarily unavailable. Please try again later.';

    return res.status(200).json({
      success: false,
      error: errorMessage,
      answer: null,
      mode: 'cloud-fallback', // Always include mode field, even on errors
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

/**
 * Get AI response with Huawei LLM integration or fallback engine
 * 
 * When HUAWEI_LLM_ENDPOINT and HUAWEI_LLM_TOKEN are present, calls the real Huawei Cloud LLM API.
 * When Huawei Cloud is unavailable, returns a localized fallback message.
 * 
 * @param {string} type - Request type: 'explain', 'recommend', 'help', 'analyze'
 * @param {string} prompt - User's question or prompt
 * @param {object} context - Additional context
 * @param {string} questId - Optional quest ID
 * @param {string} userAddress - Optional user address
 * @param {string} language - Language code ('en' or 'tr')
 * @returns {Promise<{response: string, mode: 'huawei'|'cloud-fallback'}>} AI response with mode indicator
 */
async function getAIResponse(type, prompt, context = {}, questId = null, userAddress = null, language = 'en') {
  // Huawei Cloud LLM Configuration
  const HUAWEI_LLM_ENDPOINT = process.env.HUAWEI_LLM_ENDPOINT;
  const HUAWEI_LLM_TOKEN = process.env.HUAWEI_LLM_TOKEN;
  const HUAWEI_LLM_MODEL = process.env.HUAWEI_LLM_MODEL || 'deepseek-v3.1';

  // Check if required credentials are present (ENDPOINT and TOKEN are required, MODEL has default)
  const hasRequiredCredentials = HUAWEI_LLM_ENDPOINT && HUAWEI_LLM_TOKEN;

  // Automatically use Huawei LLM when credentials are present (no feature flag needed)
  if (hasRequiredCredentials) {
    try {
      console.log('[AI Assistant] Calling Huawei Cloud LLM API with retry');
      const response = await callHuaweiLLMWithRetry(type, prompt, context, questId, userAddress, language);
      return {
        response: response,
        mode: 'huawei'
      };
    } catch (error) {
      console.error('[AI Assistant] Huawei LLM call failed after retries, using fallback:', error.message);
      // Fall through to fallback message (silently, no user indication)
    }
  } else {
    // Log why we're using fallback mode (credentials missing)
    const missing = [];
    if (!HUAWEI_LLM_ENDPOINT) missing.push('HUAWEI_LLM_ENDPOINT');
    if (!HUAWEI_LLM_TOKEN) missing.push('HUAWEI_LLM_TOKEN');
    console.log(`[AI Assistant] Huawei Cloud unavailable (missing: ${missing.join(', ')}), using fallback`);
  }

  // Return fallback response when Huawei Cloud is unavailable (no indication to user)
  const fallbackResponse = getMockAIResponse(type, prompt, context, questId, language);
  return {
    response: fallbackResponse,
    mode: 'cloud-fallback' // Internal mode, not shown to user
  };
}

/**
 * Call Huawei Cloud LLM API (single attempt)
 * 
 * @param {string} type - Request type
 * @param {string} prompt - User prompt
 * @param {object} context - Additional context
 * @param {string} questId - Quest ID
 * @param {string} userAddress - User address
 * @param {string} language - Language code ('en' or 'tr')
 * @returns {Promise<string>} AI response
 */
async function callHuaweiLLMOnce(type, prompt, context, questId, userAddress, language = 'en') {
  const HUAWEI_LLM_ENDPOINT = process.env.HUAWEI_LLM_ENDPOINT;
  const HUAWEI_LLM_TOKEN = process.env.HUAWEI_LLM_TOKEN;
  const HUAWEI_LLM_MODEL = process.env.HUAWEI_LLM_MODEL || 'deepseek-v3.1';

  if (!HUAWEI_LLM_ENDPOINT || !HUAWEI_LLM_TOKEN) {
    throw new Error('Huawei LLM endpoint and token are required');
  }

  // Build system prompt based on type and language
  const systemPrompt = buildSystemPrompt(type, context, questId, language);

  // Prepare messages array
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: prompt }
  ];

  // Use the exact endpoint provided (should already include /v1/chat/completions)
  // If it doesn't, append it
  let apiUrl = HUAWEI_LLM_ENDPOINT.trim();
  if (!apiUrl.endsWith('/v1/chat/completions') && !apiUrl.endsWith('/chat/completions')) {
    apiUrl = `${apiUrl.replace(/\/$/, '')}/v1/chat/completions`;
  }

  console.log(`[AI Assistant] Calling Huawei LLM: ${apiUrl} (model: ${HUAWEI_LLM_MODEL})`);

  // Request body exactly as per Huawei Cloud API documentation
  const requestBody = {
    model: HUAWEI_LLM_MODEL,
    messages: messages,
    stream: false, // Explicitly set to false as per requirements
    temperature: 0.7,
    max_tokens: 1000
  };

  // Headers exactly as per Huawei Cloud API documentation
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${HUAWEI_LLM_TOKEN}` // Always use Bearer format
  };

  // Create AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

  try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });

      clearTimeout(timeoutId); // Clear timeout on successful response

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        console.error(`[AI Assistant] Huawei LLM API error ${response.status}:`, errorText);
        throw new Error(`Huawei LLM API error: ${response.status} - ${errorText.substring(0, 200)}`);
      }

      const data = await response.json().catch(async (parseError) => {
        const text = await response.text();
        console.error('[AI Assistant] Failed to parse Huawei LLM response:', parseError);
        console.error('[AI Assistant] Response text:', text.substring(0, 500));
        throw new Error('Invalid JSON response from Huawei LLM API');
      });

      // Extract response based on common API response formats
      let aiResponse = null;

      // Format 1: OpenAI-style (choices[0].message.content)
      if (data.choices && Array.isArray(data.choices) && data.choices[0]) {
        if (data.choices[0].message && data.choices[0].message.content) {
          aiResponse = data.choices[0].message.content;
        } else if (data.choices[0].content) {
          aiResponse = data.choices[0].content;
        }
      }
      // Format 2: Direct content field
      else if (data.content) {
        aiResponse = data.content;
      }
      // Format 3: Huawei-specific format
      else if (data.result && data.result.output) {
        aiResponse = data.result.output.text || data.result.output;
      }
      // Format 4: Nested response
      else if (data.response && data.response.text) {
        aiResponse = data.response.text;
      }
      // Format 5: Array response
      else if (Array.isArray(data) && data[0] && data[0].content) {
        aiResponse = data[0].content;
      }

      if (!aiResponse || typeof aiResponse !== 'string') {
        console.error('[AI Assistant] Unexpected response format:', JSON.stringify(data).substring(0, 500));
        throw new Error('Unexpected response format from Huawei LLM API');
      }

      console.log(`[AI Assistant] Successfully received response from Huawei LLM (length: ${aiResponse.length})`);
      return aiResponse.trim();

    } catch (error) {
      clearTimeout(timeoutId); // Clear timeout on error
      
      // Handle timeout
      if (error.name === 'AbortError') {
        throw new Error('Request timeout: Huawei LLM API did not respond within 30 seconds');
      }
      
      // Re-throw network/API errors so they can be caught and handled gracefully
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error: Could not reach Huawei LLM API');
      }
      throw error;
    }
}

/**
 * Call Huawei Cloud LLM API with retry mechanism
 * Attempts up to 2 times total (1 retry) before throwing an error
 * 
 * @param {string} type - Request type
 * @param {string} prompt - User prompt
 * @param {object} context - Additional context
 * @param {string} questId - Quest ID
 * @param {string} userAddress - User address
 * @param {string} language - Language code ('en' or 'tr')
 * @returns {Promise<string>} AI response
 * @throws {Error} If all attempts fail
 */
async function callHuaweiLLMWithRetry(type, prompt, context, questId, userAddress, language = 'en') {
  const maxAttempts = 2;
  let lastError = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      if (attempt > 1) {
        console.log(`[AI Assistant] Retrying Huawei LLM call (attempt ${attempt}/${maxAttempts})`);
        // Small delay before retry (exponential backoff: 500ms, 1000ms)
        await new Promise(resolve => setTimeout(resolve, 500 * attempt));
      }
      
      return await callHuaweiLLMOnce(type, prompt, context, questId, userAddress, language);
    } catch (error) {
      lastError = error;
      console.error(`[AI Assistant] Huawei LLM call attempt ${attempt}/${maxAttempts} failed:`, error.message);
      
      // If this was the last attempt, throw the error
      if (attempt === maxAttempts) {
        throw new Error(`Huawei LLM call failed after ${maxAttempts} attempts: ${error.message}`);
      }
    }
  }

  // This should never be reached, but TypeScript/ESLint might complain
  throw lastError || new Error('Huawei LLM call failed');
}

/**
 * Detect language override from user prompt
 * Detects phrases like "türkçe konuş", "speak turkish", "ingilizce konuş", "speak english", etc.
 * Supports accent-insensitive matching for Turkish patterns.
 * 
 * @param {string} prompt - User prompt
 * @param {string} currentLanguage - Current language setting
 * @returns {string|null} Override language ('tr' or 'en') or null if no override
 */
function detectLanguageFromPrompt(prompt, currentLanguage) {
  if (!prompt || typeof prompt !== 'string') {
    return null;
  }

  // Normalize prompt: remove accents and convert to lowercase for accent-insensitive matching
  const normalizedPrompt = prompt
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .trim();

  // Turkish language request patterns (accent-insensitive)
  // Match both "türkçe" and "turkce", "konuş" and "konus", etc.
  const turkishPatterns = [
    'turkce konus',
    'turkce konus bi',
    'turkce cevap',
    'turkce cevap ver',
    'turkce yanit',
    'turkce yanit ver',
    'turkce olarak',
    'turkce yaz',
    'turkce acikla',
    'speak turkish',
    'answer in turkish',
    'respond in turkish',
    'reply in turkish',
    'turkish please',
    'pls speak turkish',
    'please turkish',
    'turkce', // Standalone word
    'turkish' // Standalone word
  ];

  // English language request patterns
  // Includes Turkish phrases like "ingilizce konuş", "ingilizce yaz", etc.
  const englishPatterns = [
    'ingilizce konus',
    'ingilizce konus bi',
    'ingilizce cevap',
    'ingilizce cevap ver',
    'ingilizce yanit',
    'ingilizce yanit ver',
    'ingilizce yaz',
    'ingilizce acikla',
    'ingilizce anlat',
    'ingilizce lutfen',
    'ingilizce olarak',
    'speak english',
    'answer in english',
    'respond in english',
    'reply in english',
    'english please',
    'pls speak english',
    'please speak english',
    'please english',
    'english olarak',
    'english konus',
    'english cevap',
    'english yaz',
    'english acikla',
    'ingilizce' // Standalone word
  ];

  // Check for English request first (higher priority for explicit requests)
  for (const pattern of englishPatterns) {
    if (normalizedPrompt.includes(pattern)) {
      return 'en';
    }
  }

  // Check for Turkish request
  for (const pattern of turkishPatterns) {
    if (normalizedPrompt.includes(pattern)) {
      return 'tr';
    }
  }

  return null;
}

/**
 * Build system prompt based on request type and language
 * 
 * @param {string} type - Request type
 * @param {object} context - Context data
 * @param {string} questId - Quest ID
 * @param {string} language - Language code ('en' or 'tr')
 * @returns {string} System prompt
 */
function buildSystemPrompt(type, context, questId, language = 'en') {
  const isTurkish = language === 'tr';

  // Enhanced system prompt with ChainQuest Expert persona
  // This gives the AI a clear personality and role as a mentor
  const basePrompt = isTurkish
    ? 'Sen "ChainQuest" adlı bir Web3 eğitim platformu için resmi AI Öğrenme Asistanısın. Amacın kullanıcılara Blockchain, Stellar ve Akıllı Kontratlar hakkında öğrenmelerinde yardımcı olmaktır. Yardımsever, cesaret verici ve özlü bir mentorsun. Teknik kod hakkında sorulduğunda, açık örnekler ver. Asla finansal tavsiye verme. Her zaman kullanıcının konuştuğu dilde (Türkçe veya İngilizce) yanıt ver.'
    : 'You are the official AI Learning Assistant for "ChainQuest", a Web3 education platform. Your goal is to help users learn about Blockchain, Stellar, and Smart Contracts. You are helpful, encouraging, and concise. You act as a mentor. If asked about technical code, provide clear examples. Never give financial advice. Always answer in the language the user is speaking (Turkish or English).';

  switch (type) {
    case 'explain':
      return isTurkish
        ? `${basePrompt} Blockchain kavramlarını açık ve özlü bir şekilde açıkla. Örnekler kullan.`
        : `${basePrompt} Explain blockchain concepts clearly and concisely. Use examples when helpful.`;

    case 'recommend':
      return isTurkish
        ? `${basePrompt} Kullanıcının ilerlemesine ve ilgi alanlarına göre öğrenme yolları ve görevler öner.`
        : `${basePrompt} Recommend learning paths and quests based on user progress and interests.`;

    case 'help':
      return isTurkish
        ? `${basePrompt} Kullanıcıların quiz sorularını anlamalarına yardımcı ol ve ipuçları ver, ancak cevapları verme.`
        : `${basePrompt} Help users understand quiz questions and provide hints without giving away answers.`;

    case 'analyze':
      return isTurkish
        ? `${basePrompt} Kullanıcı ilerlemesini analiz et ve kişiselleştirilmiş öğrenme içgörüleri sağla.`
        : `${basePrompt} Analyze user progress and provide personalized learning insights.`;

    default:
      return basePrompt;
  }
}

/**
 * Get fallback response when Huawei Cloud LLM is unavailable
 * Returns a generic response without revealing fallback mode to the user
 * 
 * @param {string} type - Request type (unused, kept for API compatibility)
 * @param {string} prompt - User prompt (unused, kept for API compatibility)
 * @param {object} context - Context data (unused, kept for API compatibility)
 * @param {string} questId - Quest ID (unused, kept for API compatibility)
 * @param {string} language - Language code ('en' or 'tr')
 * @returns {string} Generic fallback response
 */
function getMockAIResponse(type, prompt, context, questId, language = 'en') {
  const isTurkish = language === 'tr';
  
  // Return generic responses without revealing fallback mode
  switch (type) {
    case 'explain':
      return isTurkish
        ? 'Blockchain, dağıtılmış bir defter teknolojisidir. İşlemler bloklar halinde kaydedilir ve ağdaki tüm düğümler tarafından doğrulanır. Bu sayede merkezi bir otoriteye ihtiyaç duymadan güvenli ve şeffaf işlemler yapılabilir.'
        : 'Blockchain is a distributed ledger technology. Transactions are recorded in blocks and verified by all nodes in the network. This enables secure and transparent transactions without the need for a central authority.';
    
    case 'recommend':
      return isTurkish
        ? 'Öğrenme yolunuzu ilerletmek için temel blockchain kavramlarını gözden geçirmenizi ve ardından akıllı sözleşmeler ve DeFi konularına geçmenizi öneririm.'
        : 'To advance your learning path, I recommend reviewing basic blockchain concepts and then moving on to smart contracts and DeFi topics.';
    
    case 'help':
      return isTurkish
        ? 'Quiz sorularını daha iyi anlamak için ilgili kavramları gözden geçirmenizi öneririm. Sorular genellikle temel blockchain ve Stellar ağı prensiplerine odaklanır.'
        : 'To better understand the quiz questions, I recommend reviewing the related concepts. Questions typically focus on basic blockchain and Stellar network principles.';
    
    case 'analyze':
      return isTurkish
        ? 'İlerlemenizi analiz ediyorum. Tamamladığınız görevler ve performansınıza göre, blockchain temelleri ve Stellar ağı konularında iyi bir ilerleme kaydediyorsunuz.'
        : 'I am analyzing your progress. Based on your completed quests and performance, you are making good progress in blockchain fundamentals and Stellar network topics.';
    
    default:
      return isTurkish
        ? 'Blockchain ve Web3 teknolojileri hakkında daha fazla bilgi edinmek için görevleri tamamlamaya devam edin.'
        : 'Continue completing quests to learn more about blockchain and Web3 technologies.';
  }
}
