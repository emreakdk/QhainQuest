/**
 * AI Assistant API Endpoint
 * 
 * Production-ready AI assistant endpoint for ChainQuest learning platform.
 * Integrates with Huawei Cloud LLM with graceful fallback to demo mode message.
 * 
 * Features:
 * - Huawei Cloud LLM integration (when configured)
 * - English/Turkish language support
 * - Graceful error handling
 * - Demo mode message when credentials are missing
 * 
 * Environment Variables:
 * - HUAWEI_LLM_ENDPOINT: Huawei Cloud LLM API endpoint (required, e.g., https://api-ap-southeast-1.modelarts-maas.com/v1/chat/completions)
 * - HUAWEI_LLM_TOKEN: Authentication token (required)
 * - HUAWEI_LLM_MODEL: Model name (default: deepseek-v3.1)
 * 
 * Note: The API automatically uses Huawei Cloud LLM when both HUAWEI_LLM_ENDPOINT and HUAWEI_LLM_TOKEN are present.
 * If credentials are missing, it returns a demo mode message.
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

    // Get AI response
    const aiResponse = await getAIResponse(type, prompt, context, questId, userAddress, normalizedLanguage);

    const duration = Date.now() - startTime;
    console.log(`[${requestId}] AI response generated in ${duration}ms (type: ${type}, language: ${normalizedLanguage})`);

    return res.status(200).json({
      success: true,
      answer: aiResponse,
      data: {
        type,
        response: aiResponse,
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
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

/**
 * Get AI response with Huawei LLM integration or demo mode message
 * 
 * When HUAWEI_LLM_ENDPOINT or HUAWEI_LLM_TOKEN is missing, returns a localized
 * demo mode message instead of fake answers. When all three env vars are present
 * and ENABLE_HUAWEI_LLM is 'true', calls the real Huawei Cloud LLM API.
 * 
 * @param {string} type - Request type: 'explain', 'recommend', 'help', 'analyze'
 * @param {string} prompt - User's question or prompt
 * @param {object} context - Additional context
 * @param {string} questId - Optional quest ID
 * @param {string} userAddress - Optional user address
 * @param {string} language - Language code ('en' or 'tr')
 * @returns {Promise<string>} AI-generated response or demo mode message
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
      console.log('[AI Assistant] Calling Huawei Cloud LLM API');
      return await callHuaweiLLM(type, prompt, context, questId, userAddress, language);
    } catch (error) {
      console.error('[AI Assistant] Huawei LLM call failed, falling back to demo mode:', error.message);
      // Fall through to demo mode message
    }
  } else {
    // Log why we're using demo mode
    const missing = [];
    if (!HUAWEI_LLM_ENDPOINT) missing.push('HUAWEI_LLM_ENDPOINT');
    if (!HUAWEI_LLM_TOKEN) missing.push('HUAWEI_LLM_TOKEN');
    console.log(`[AI Assistant] Missing required credentials: ${missing.join(', ')}, returning demo mode message`);
  }

  // Return demo mode message when credentials are missing
  return getMockAIResponse(type, prompt, context, questId, language);
}

/**
 * Call Huawei Cloud LLM API
 * 
 * @param {string} type - Request type
 * @param {string} prompt - User prompt
 * @param {object} context - Additional context
 * @param {string} questId - Quest ID
 * @param {string} userAddress - User address
 * @param {string} language - Language code ('en' or 'tr')
 * @returns {Promise<string>} AI response
 */
async function callHuaweiLLM(type, prompt, context, questId, userAddress, language = 'en') {
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
 * Detect language override from user prompt
 * Detects phrases like "türkçe konuş", "speak turkish", etc.
 * 
 * @param {string} prompt - User prompt
 * @param {string} currentLanguage - Current language setting
 * @returns {string|null} Override language ('tr' or 'en') or null if no override
 */
function detectLanguageFromPrompt(prompt, currentLanguage) {
  if (!prompt || typeof prompt !== 'string') {
    return null;
  }

  const lowerPrompt = prompt.toLowerCase().trim();

  // Turkish language request patterns
  const turkishPatterns = [
    'türkçe konuş',
    'turkce konus',
    'türkçe cevap',
    'turkce cevap',
    'türkçe yanıt',
    'turkce yanit',
    'türkçe olarak',
    'turkce olarak',
    'speak turkish',
    'answer in turkish',
    'respond in turkish',
    'türkçe',
    'turkish'
  ];

  // English language request patterns
  const englishPatterns = [
    'english konuş',
    'english cevap',
    'speak english',
    'answer in english',
    'respond in english',
    'english olarak'
  ];

  // Check for Turkish request
  for (const pattern of turkishPatterns) {
    if (lowerPrompt.includes(pattern)) {
      return 'tr';
    }
  }

  // Check for English request
  for (const pattern of englishPatterns) {
    if (lowerPrompt.includes(pattern)) {
      return 'en';
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

  const basePrompt = isTurkish
    ? 'Sen ChainQuest adlı bir blockchain öğrenme platformu için bir AI asistanısın. Kullanıcı Türkçe veya İngilizce yazsa bile, TÜM cevaplarını TÜRKÇE olarak ver. Açık, anlaşılır ve Web3 öğrenenler için uygun bir Türkçe kullan. '
    : 'You are an AI assistant for ChainQuest, a blockchain learning platform. Always respond in English, even if the user writes in Turkish or another language. ';

  switch (type) {
    case 'explain':
      return isTurkish
        ? `${basePrompt}Blockchain kavramlarını açık ve özlü bir şekilde açıkla. Örnekler kullan.`
        : `${basePrompt}Explain blockchain concepts clearly and concisely. Use examples when helpful.`;

    case 'recommend':
      return isTurkish
        ? `${basePrompt}Kullanıcının ilerlemesine ve ilgi alanlarına göre öğrenme yolları ve görevler öner.`
        : `${basePrompt}Recommend learning paths and quests based on user progress and interests.`;

    case 'help':
      return isTurkish
        ? `${basePrompt}Kullanıcıların quiz sorularını anlamalarına yardımcı ol ve ipuçları ver, ancak cevapları verme.`
        : `${basePrompt}Help users understand quiz questions and provide hints without giving away answers.`;

    case 'analyze':
      return isTurkish
        ? `${basePrompt}Kullanıcı ilerlemesini analiz et ve kişiselleştirilmiş öğrenme içgörüleri sağla.`
        : `${basePrompt}Analyze user progress and provide personalized learning insights.`;

    default:
      return basePrompt;
  }
}

/**
 * Get demo mode message when Huawei LLM credentials are missing
 * Returns a clear, honest message indicating the AI is in demo mode
 * 
 * @param {string} type - Request type (unused, kept for API compatibility)
 * @param {string} prompt - User prompt (unused, kept for API compatibility)
 * @param {object} context - Context data (unused, kept for API compatibility)
 * @param {string} questId - Quest ID (unused, kept for API compatibility)
 * @param {string} language - Language code ('en' or 'tr')
 * @returns {string} Demo mode message
 */
function getMockAIResponse(type, prompt, context, questId, language = 'en') {
  const isTurkish = language === 'tr';
  
  return isTurkish
    ? 'AI asistan şu anda demo modunda. Huawei Cloud LLM anahtarı bağlandığında, blockchain, Stellar ve görevleriniz hakkında gerçek ve kişiselleştirilmiş yanıtlar vereceğim.'
    : 'The AI assistant is currently in demo mode. Once the Huawei Cloud LLM key is configured, this assistant will provide real, personalized answers about blockchain, Stellar, and your quests.';
}
