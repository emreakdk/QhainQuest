/**
 * Article Summarize API Endpoint
 * 
 * Summarizes Web3 articles using Huawei Cloud LLM with graceful fallback.
 * Uses the same AI infrastructure as the AI Assistant.
 * 
 * Environment Variables:
 * - HUAWEI_LLM_ENDPOINT: Huawei Cloud LLM API endpoint
 * - HUAWEI_LLM_TOKEN: Authentication token
 * - HUAWEI_LLM_MODEL: Model name (default: deepseek-v3.1)
 */

export default async function handler(req, res) {
  const requestId = `summarize_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
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
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.',
      summary: null
    });
  }

  try {
    const { title, summary, tags, language = 'tr' } = req.body;

    // Validate required fields
    if (!title || !summary) {
      return res.status(400).json({
        success: false,
        error: 'Title and summary are required.',
        summary: null
      });
    }

    const requestLanguage = (language === 'tr' || language === 'turkish') ? 'tr' : 'en';

    // Get AI summary
    const aiResult = await getAISummary(title, summary, tags, requestLanguage);

    const duration = Date.now() - startTime;
    console.log(`[Summarize API] Request ${requestId} completed in ${duration}ms (mode: ${aiResult.mode})`);

    return res.status(200).json({
      success: true,
      summary: aiResult.response,
      mode: aiResult.mode,
      requestId: requestId
    });

  } catch (error) {
    console.error(`[Summarize API] Error in request ${requestId}:`, error);
    const duration = Date.now() - startTime;

    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
      summary: null,
      requestId: requestId
    });
  }
}

/**
 * Get AI summary using Huawei LLM or fallback
 * 
 * @param {string} title - Article title
 * @param {string} summary - Article summary/description
 * @param {array} tags - Article tags
 * @param {string} language - Language code ('en' or 'tr')
 * @returns {Promise<{response: string, mode: 'huawei'|'fallback'}>} AI summary with mode indicator
 */
async function getAISummary(title, summary, tags = [], language = 'tr') {
  const HUAWEI_LLM_ENDPOINT = process.env.HUAWEI_LLM_ENDPOINT;
  const HUAWEI_LLM_TOKEN = process.env.HUAWEI_LLM_TOKEN;
  const HUAWEI_LLM_MODEL = process.env.HUAWEI_LLM_MODEL || 'deepseek-v3.1';

  const hasRequiredCredentials = HUAWEI_LLM_ENDPOINT && HUAWEI_LLM_TOKEN;

  if (hasRequiredCredentials) {
    try {
      console.log('[Summarize API] Calling Huawei Cloud LLM API');
      const response = await callHuaweiLLMForSummary(title, summary, tags, language);
      return {
        response: response,
        mode: 'huawei'
      };
    } catch (error) {
      console.error('[Summarize API] Huawei LLM call failed, using fallback:', error.message);
      // Fall through to fallback
    }
  } else {
    const missing = [];
    if (!HUAWEI_LLM_ENDPOINT) missing.push('HUAWEI_LLM_ENDPOINT');
    if (!HUAWEI_LLM_TOKEN) missing.push('HUAWEI_LLM_TOKEN');
    console.log(`[Summarize API] Huawei Cloud unavailable (missing: ${missing.join(', ')}), using fallback`);
  }

  // Return fallback response
  const fallbackResponse = getFallbackSummary(title, summary, tags, language);
  return {
    response: fallbackResponse,
    mode: 'fallback'
  };
}

/**
 * Call Huawei Cloud LLM API for article summarization
 * 
 * @param {string} title - Article title
 * @param {string} summary - Article summary
 * @param {array} tags - Article tags
 * @param {string} language - Language code ('en' or 'tr')
 * @returns {Promise<string>} AI-generated summary
 */
async function callHuaweiLLMForSummary(title, summary, tags = [], language = 'tr') {
  const HUAWEI_LLM_ENDPOINT = process.env.HUAWEI_LLM_ENDPOINT;
  const HUAWEI_LLM_TOKEN = process.env.HUAWEI_LLM_TOKEN;
  const HUAWEI_LLM_MODEL = process.env.HUAWEI_LLM_MODEL || 'deepseek-v3.1';

  if (!HUAWEI_LLM_ENDPOINT || !HUAWEI_LLM_TOKEN) {
    throw new Error('Huawei LLM endpoint and token are required');
  }

  // Build system prompt for article summarization
  const systemPrompt = language === 'tr'
    ? 'Sen "ChainQuest" adlı bir Web3 eğitim platformu için uzman bir eğitim asistanısın. Görevin, verilen makale detaylarını analiz edip kullanıcıların bu makaleden ne öğreneceğini açıklayan kısa ama bilgilendirici bir özet (3-4 cümle) oluşturmaktır. Sadece "bu makale X hakkındadır" demek yerine, kullanıcının öğreneceği temel kavramları ve bilgileri açık bir şekilde açıkla. Özeti Türkçe olarak yaz.'
    : 'You are an expert educational assistant for "ChainQuest", a Web3 education platform. Your task is to analyze the provided article details and generate a concise but informative summary (3-4 sentences) that explains exactly what users will learn from this article. Do not just say "it is about X", explain the key concepts and knowledge users will gain. Write the summary in English.';

  // Build user prompt with article details
  const tagsText = tags && tags.length > 0 ? `\nEtiketler: ${tags.join(', ')}` : '';
  const userPrompt = language === 'tr'
    ? `Aşağıdaki makale hakkında bir özet oluştur:\n\nBaşlık: ${title}\n\nÖzet: ${summary}${tagsText}\n\nBu makaleden kullanıcılar ne öğrenecek? Temel kavramları ve bilgileri açıkla.`
    : `Create a summary for the following article:\n\nTitle: ${title}\n\nSummary: ${summary}${tagsText}\n\nWhat will users learn from this article? Explain the key concepts and knowledge.`;

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ];

  // Prepare API URL
  let apiUrl = HUAWEI_LLM_ENDPOINT.trim();
  if (!apiUrl.endsWith('/v1/chat/completions') && !apiUrl.endsWith('/chat/completions')) {
    apiUrl = `${apiUrl.replace(/\/$/, '')}/v1/chat/completions`;
  }

  console.log(`[Summarize API] Calling Huawei LLM: ${apiUrl} (model: ${HUAWEI_LLM_MODEL})`);

  const requestBody = {
    model: HUAWEI_LLM_MODEL,
    messages: messages,
    stream: false,
    temperature: 0.7,
    max_tokens: 200 // Shorter for summaries
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${HUAWEI_LLM_TOKEN}`
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error(`[Summarize API] Huawei LLM API error ${response.status}:`, errorText);
      throw new Error(`Huawei LLM API error: ${response.status} - ${errorText.substring(0, 200)}`);
    }

    const data = await response.json().catch(async (parseError) => {
      const text = await response.text();
      console.error('[Summarize API] Failed to parse Huawei LLM response:', parseError);
      console.error('[Summarize API] Response text:', text.substring(0, 500));
      throw new Error('Invalid JSON response from Huawei LLM API');
    });

    // Extract response
    let aiResponse = null;

    if (data.choices && Array.isArray(data.choices) && data.choices[0]) {
      if (data.choices[0].message && data.choices[0].message.content) {
        aiResponse = data.choices[0].message.content;
      } else if (data.choices[0].content) {
        aiResponse = data.choices[0].content;
      }
    } else if (data.content) {
      aiResponse = data.content;
    } else if (data.result && data.result.output) {
      aiResponse = data.result.output.text || data.result.output;
    } else if (data.response && data.response.text) {
      aiResponse = data.response.text;
    } else if (Array.isArray(data) && data[0] && data[0].content) {
      aiResponse = data[0].content;
    }

    if (!aiResponse || typeof aiResponse !== 'string') {
      console.error('[Summarize API] Unexpected response format:', JSON.stringify(data).substring(0, 500));
      throw new Error('Unexpected response format from Huawei LLM API');
    }

    console.log(`[Summarize API] Successfully received response from Huawei LLM (length: ${aiResponse.length})`);
    return aiResponse.trim();

  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timeout: Huawei LLM API did not respond within 30 seconds');
    }
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error: Could not reach Huawei LLM API');
    }
    
    throw error;
  }
}

/**
 * Get fallback summary when Huawei Cloud is unavailable
 * 
 * @param {string} title - Article title
 * @param {string} summary - Article summary
 * @param {array} tags - Article tags
 * @param {string} language - Language code ('en' or 'tr')
 * @returns {string} Fallback summary
 */
function getFallbackSummary(title, summary, tags = [], language = 'tr') {
  if (language === 'tr') {
    return `Bu makale, ${title} konusunu ele almaktadır. ${summary} Makale, Web3 teknolojileri hakkında temel kavramları ve pratik uygulamaları açıklayarak kullanıcıların bu alandaki bilgilerini geliştirmelerine yardımcı olur.`;
  } else {
    return `This article explores ${title}. ${summary} The article helps users enhance their knowledge in this field by explaining fundamental concepts and practical applications of Web3 technologies.`;
  }
}

