import { useState, useRef, useEffect } from 'react';
import { aiService } from '../../../services/aiService';
import { useLanguage } from '../../../context/LanguageContext';
import Button from '../../ui/Button';
import { 
  TbRobot, 
  TbUser, 
  TbTrash, 
  TbLink, 
  TbStar, 
  TbFileText, 
  TbCoins,
  TbBulb,
  TbSend
} from 'react-icons/tb';

/**
 * AI Assistant Component
 * 
 * Provides AI-powered help and explanations for users.
 * Integrates with Huawei Cloud LLM via backend API.
 */
const AIAssistant = ({ questId = null, context = {} }) => {
  const { t, language, setLanguage } = useLanguage();
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const textareaRef = useRef(null);
  const responseRef = useRef(null);

  /**
   * Helper function to detect language from user prompt
   * Normalizes prompt to lowercase, strips accents, and checks for language switch patterns
   * @param {string} prompt - User's prompt text
   * @param {string} currentLanguage - Current UI language ('tr' or 'en')
   * @returns {string} Detected language ('en', 'tr') or currentLanguage if no pattern matches
   */
  const detectLanguageFromPrompt = (prompt, currentLanguage) => {
    if (!prompt || typeof prompt !== 'string') {
      return currentLanguage;
    }

    // Normalize prompt: remove accents and convert to lowercase for accent-insensitive matching
    const normalizedPrompt = prompt
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .trim();

    // English language request patterns
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

    // Turkish language request patterns
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

    // No pattern matched, return current language
    return currentLanguage;
  };

  // Auto-scroll to bottom when response updates
  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [response, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      return;
    }

    setLoading(true);
    setError(null);
    const userPrompt = prompt.trim();
    setPrompt('');

    try {
      // Detect effective language from prompt and current UI language
      const effectiveLanguage = detectLanguageFromPrompt(userPrompt, language || 'en');
      
      // If effective language differs from current language, update the global UI language
      if (effectiveLanguage !== language && setLanguage) {
        setLanguage(effectiveLanguage);
        if (import.meta.env.DEV) {
          console.log('[AI Assistant] Language switched:', { from: language, to: effectiveLanguage, prompt: userPrompt });
        }
      }
      
      if (import.meta.env.DEV) {
        console.log('[AI Assistant] Submitting request:', { language, effectiveLanguage, prompt: userPrompt });
      }
      
      // Call AI service with effective language
      const result = await aiService.explainConcept(userPrompt, context, questId, effectiveLanguage);
      
      if (!result || !result.response) {
        throw new Error('Received empty response from AI service.');
      }
      
      const newEntry = {
        prompt: userPrompt,
        response: result.response,
        mode: result.mode || 'cloud-fallback', // Store mode for UI display
        timestamp: new Date().toISOString()
      };

      setHistory(prev => [...prev, newEntry]);
      setResponse(result.response);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('[AI Assistant] Error:', err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage || 'Failed to get AI response. Please try again.');
      setResponse(''); // Clear response on error
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = async (quickPrompt) => {
    setPrompt(quickPrompt);
    setLoading(true);
    setError(null);

    try {
      // Detect effective language from prompt and current UI language
      const effectiveLanguage = detectLanguageFromPrompt(quickPrompt, language || 'en');
      
      // If effective language differs from current language, update the global UI language
      if (effectiveLanguage !== language && setLanguage) {
        setLanguage(effectiveLanguage);
        if (import.meta.env.DEV) {
          console.log('[AI Assistant] Language switched:', { from: language, to: effectiveLanguage, prompt: quickPrompt });
        }
      }
      
      if (import.meta.env.DEV) {
        console.log('[AI Assistant] Quick question:', { language, effectiveLanguage, prompt: quickPrompt });
      }
      
      // Call AI service with effective language
      const result = await aiService.explainConcept(quickPrompt, context, questId, effectiveLanguage);
      
      if (!result || !result.response) {
        throw new Error('Received empty response from AI service.');
      }
      
      const newEntry = {
        prompt: quickPrompt,
        response: result.response,
        mode: result.mode || 'cloud-fallback', // Store mode for UI display
        timestamp: new Date().toISOString()
      };

      setHistory(prev => [...prev, newEntry]);
      setResponse(result.response);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('[AI Assistant] Error:', err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage || 'Failed to get AI response. Please try again.');
      setResponse(''); // Clear response on error
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    setResponse('');
    setError(null);
  };

  const quickQuestions = [
    { text: 'What is blockchain?', icon: TbLink },
    { text: 'Explain Stellar network', icon: TbStar },
    { text: 'What are smart contracts?', icon: TbFileText },
    { text: 'How do tokens work?', icon: TbCoins }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <TbRobot size={22} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                AI Learning Assistant
              </h3>
              <p className="text-sm text-indigo-100">
                {history.length > 0 && history[history.length - 1]?.mode === 'huawei'
                  ? 'Powered by Huawei Cloud AI'
                  : 'AI Learning Assistant'}
              </p>
            </div>
          </div>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center gap-2 text-white/80 hover:text-white text-sm px-3 py-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <TbTrash size={18} />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Quick Questions */}
      {history.length === 0 && (
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            Try asking:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {quickQuestions.map((q, idx) => {
              const IconComponent = q.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(q.text)}
                  disabled={loading}
                  className="group flex items-center gap-2 px-3 py-2 text-left text-sm bg-slate-100 dark:bg-slate-700 rounded-lg transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-200 dark:hover:border-purple-700 border border-transparent hover:shadow-sm"
                >
                  <IconComponent size={18} className="text-[#8b5cf6] dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200" />
                  <span className="text-slate-700 dark:text-slate-300 group-hover:text-purple-900 dark:group-hover:text-purple-200 transition-colors duration-200">{q.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Response Area */}
      <div className="p-4 sm:p-6 max-h-[400px] overflow-y-auto" ref={responseRef}>
        {history.length === 0 && !loading && !error && (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <TbBulb size={48} className="mx-auto mb-3 text-[#facc15] dark:text-gray-300 opacity-80" />
            <p className="text-sm">
              Ask me anything about blockchain, Stellar, or your quests!
            </p>
          </div>
        )}

        {history.map((entry, idx) => (
          <div key={idx} className="mb-6 space-y-3">
            {/* User Question */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center flex-shrink-0">
                <TbUser size={18} className="text-indigo-600 dark:text-indigo-300" />
              </div>
              <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-lg p-3">
                <p className="text-sm text-slate-800 dark:text-slate-200">
                  {entry.prompt}
                </p>
              </div>
            </div>

            {/* AI Response */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                <TbRobot size={18} className="text-purple-600 dark:text-purple-300" />
              </div>
              <div className="flex-1 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-3 border border-indigo-200 dark:border-indigo-700">
                <div className="flex items-center justify-between gap-2 mb-2">
                  {entry.mode === 'huawei' && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                      Huawei Cloud AI
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                  {entry.response}
                </p>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
              <TbRobot size={18} className="text-purple-600 dark:text-purple-300" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                <span className="text-sm text-slate-600 dark:text-slate-400 ml-2">
                  AI is thinking...
                </span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
            <p className="text-sm text-red-800 dark:text-red-200">
              {error}
            </p>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
        <div className="flex space-x-3">
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Ask me anything about blockchain, Stellar, or your quests..."
            rows="2"
            className="flex-1 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-slate-900 dark:text-white placeholder-slate-400"
            disabled={loading}
          />
          <Button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <TbSend size={18} />
                Ask
              </>
            )}
          </Button>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </form>
    </div>
  );
};

export default AIAssistant;

