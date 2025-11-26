import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { aiService } from '../../../services/aiService';
import { useLanguage } from '../../../context/LanguageContext';
import { useTheme } from '../../../context/ThemeContext';
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
  TbSend,
  TbX,
  TbSparkles
} from 'react-icons/tb';

/**
 * AI Assistant Widget Component
 * 
 * Global Floating Action Button (FAB) widget that provides AI-powered help.
 * Appears on all pages at the bottom-right corner.
 * Integrates with Huawei Cloud LLM via backend API.
 */
const AIAssistantWidget = () => {
  const { t, language, setLanguage } = useLanguage();
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const textareaRef = useRef(null);
  const responseRef = useRef(null);
  const widgetRef = useRef(null);

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

    // Optimistic UI: Add user message immediately
    const userMessageEntry = {
      prompt: userPrompt,
      response: null, // Will be updated when AI responds
      mode: null,
      timestamp: new Date().toISOString(),
      isPending: true // Flag to indicate this is a pending message
    };

    setHistory(prev => [...prev, userMessageEntry]);

    try {
      // Detect effective language from prompt and current UI language
      const effectiveLanguage = detectLanguageFromPrompt(userPrompt, language || 'en');
      
      // If effective language differs from current language, update the global UI language
      if (effectiveLanguage !== language && setLanguage) {
        setLanguage(effectiveLanguage);
        if (import.meta.env.DEV) {
          console.log('[AI Assistant Widget] Language switched:', { from: language, to: effectiveLanguage, prompt: userPrompt });
        }
      }
      
      if (import.meta.env.DEV) {
        console.log('[AI Assistant Widget] Submitting request:', { language, effectiveLanguage, prompt: userPrompt });
      }
      
      // Prepare conversation history (excluding the current pending message)
      const historyForAPI = history
        .filter(entry => !entry.isPending && entry.response)
        .map(entry => ({
          prompt: entry.prompt,
          response: entry.response
        }));

      // Call AI service with effective language and conversation history
      const result = await aiService.explainConcept(userPrompt, {}, null, effectiveLanguage, historyForAPI);
      
      if (!result || !result.response) {
        throw new Error('Received empty response from AI service.');
      }
      
      // Update the pending message with AI response
      setHistory(prev => prev.map((entry, idx) => 
        idx === prev.length - 1 && entry.isPending
          ? {
              ...entry,
              response: result.response,
              mode: result.mode || 'cloud-fallback',
              isPending: false
            }
          : entry
      ));
      
      setResponse(result.response);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('[AI Assistant Widget] Error:', err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      
      // Remove the pending message on error
      setHistory(prev => prev.filter(entry => !entry.isPending));
      
      setError(errorMessage || 'Failed to get AI response. Please try again.');
      setResponse(''); // Clear response on error
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = async (quickPrompt) => {
    setLoading(true);
    setError(null);

    // Optimistic UI: Add user message immediately
    const userMessageEntry = {
      prompt: quickPrompt,
      response: null, // Will be updated when AI responds
      mode: null,
      timestamp: new Date().toISOString(),
      isPending: true // Flag to indicate this is a pending message
    };

    setHistory(prev => [...prev, userMessageEntry]);

    try {
      // Detect effective language from prompt and current UI language
      const effectiveLanguage = detectLanguageFromPrompt(quickPrompt, language || 'en');
      
      // If effective language differs from current language, update the global UI language
      if (effectiveLanguage !== language && setLanguage) {
        setLanguage(effectiveLanguage);
        if (import.meta.env.DEV) {
          console.log('[AI Assistant Widget] Language switched:', { from: language, to: effectiveLanguage, prompt: quickPrompt });
        }
      }
      
      if (import.meta.env.DEV) {
        console.log('[AI Assistant Widget] Quick question:', { language, effectiveLanguage, prompt: quickPrompt });
      }
      
      // Prepare conversation history (excluding the current pending message)
      const historyForAPI = history
        .filter(entry => !entry.isPending && entry.response)
        .map(entry => ({
          prompt: entry.prompt,
          response: entry.response
        }));

      // Call AI service with effective language and conversation history
      const result = await aiService.explainConcept(quickPrompt, {}, null, effectiveLanguage, historyForAPI);
      
      if (!result || !result.response) {
        throw new Error('Received empty response from AI service.');
      }
      
      // Update the pending message with AI response
      setHistory(prev => prev.map((entry, idx) => 
        idx === prev.length - 1 && entry.isPending
          ? {
              ...entry,
              response: result.response,
              mode: result.mode || 'cloud-fallback',
              isPending: false
            }
          : entry
      ));
      
      setResponse(result.response);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('[AI Assistant Widget] Error:', err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      
      // Remove the pending message on error
      setHistory(prev => prev.filter(entry => !entry.isPending));
      
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

  // Translation object for UI labels
  const translations = {
    en: {
      title: 'AI Assistant',
      subtitle: 'AI Learning Assistant',
      subtitleHuawei: 'Powered By Huawei.',
      tryAsking: 'Try asking:',
      placeholder: 'Ask me anything...',
      emptyState: 'Ask me anything about blockchain, Stellar, or your quests!',
      thinking: 'AI is thinking...',
      askButton: 'Ask',
      enterHint: 'Press Enter to send, Shift+Enter for new line',
      quickQuestions: [
        { text: 'What is blockchain?', icon: TbLink },
        { text: 'Explain Stellar network', icon: TbStar },
        { text: 'What are smart contracts?', icon: TbFileText },
        { text: 'How do tokens work?', icon: TbCoins }
      ]
    },
    tr: {
      title: 'AI Asistan',
      subtitle: 'AI Öğrenme Asistanı',
      subtitleHuawei: 'Huawei Tarafından Desteklenmektedir.',
      tryAsking: 'Şunu sormayı dene:',
      placeholder: 'Bana herhangi bir şey sor...',
      emptyState: 'Blockchain, Stellar veya görevlerin hakkında bana herhangi bir şey sor!',
      thinking: 'AI düşünüyor...',
      askButton: 'Sor',
      enterHint: 'Göndermek için Enter, yeni satır için Shift+Enter',
      quickQuestions: [
        { text: 'Blockchain nedir?', icon: TbLink },
        { text: 'Stellar ağını açıkla', icon: TbStar },
        { text: 'Akıllı kontratlar nelerdir?', icon: TbFileText },
        { text: 'Tokenlar nasıl çalışır?', icon: TbCoins }
      ]
    }
  };

  const currentLang = language || 'en';
  const tWidget = translations[currentLang] || translations.en;

  return (
    <>
      {/* Chat Window - Appears above the button when open */}
      {isOpen && (
        <div className={`fixed z-50 bg-white dark:bg-slate-900 shadow-2xl flex flex-col transition-all duration-300
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
          /* Mobile Styles */
          w-[95vw] h-[70vh] bottom-20 left-1/2 -translate-x-1/2 rounded-2xl border border-slate-200 dark:border-slate-700
          /* Desktop Styles (Override Mobile) */
          sm:w-[450px] sm:h-[600px] sm:bottom-24 sm:right-6 sm:left-auto sm:translate-x-0
        `}>
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <TbRobot size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {tWidget.title}
                  </h3>
                  <p className="text-xs text-indigo-100">
                    {history.length > 0 && history[history.length - 1]?.mode === 'huawei'
                      ? tWidget.subtitleHuawei
                      : tWidget.subtitle}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="flex items-center gap-1 text-white/80 hover:text-white text-xs px-2 py-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    title="Clear history"
                  >
                    <TbTrash size={16} />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 cursor-pointer"
                  title="Close"
                >
                  <TbX size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Questions */}
          {history.length === 0 && (
            <div className={`p-4 border-b ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
              <p className={`text-xs mb-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {tWidget.tryAsking}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 overflow-x-hidden">
                {tWidget.quickQuestions.map((q, idx) => {
                  const IconComponent = q.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuickQuestion(q.text)}
                      disabled={loading}
                      className={`group flex items-center gap-2 px-3 py-2 text-left text-xs rounded-lg transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                        isDarkMode
                          ? 'bg-slate-700 hover:bg-purple-900/20 border border-transparent hover:border-purple-700'
                          : 'bg-slate-100 hover:bg-purple-50 border border-transparent hover:border-purple-200'
                      }`}
                    >
                      <IconComponent size={16} className={`${isDarkMode ? 'text-gray-300 group-hover:text-purple-400' : 'text-[#8b5cf6] group-hover:text-purple-600'} transition-colors duration-200`} />
                      <span className={`${isDarkMode ? 'text-slate-300 group-hover:text-purple-200' : 'text-slate-700 group-hover:text-purple-900'} transition-colors duration-200`}>{q.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Response Area */}
          <div 
            ref={responseRef}
            className={`flex-1 p-4 overflow-y-auto ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}
          >
            {history.length === 0 && !loading && !error && (
              <div className={`text-center py-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                <TbBulb size={36} className={`mx-auto mb-2 ${isDarkMode ? 'text-gray-300' : 'text-[#facc15]'} opacity-80`} />
                <p className="text-xs">
                  {tWidget.emptyState}
                </p>
              </div>
            )}

            {history.map((entry, idx) => (
              <div key={idx} className="mb-4 space-y-2">
                {/* User Question */}
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <TbUser size={14} className="text-indigo-600 dark:text-indigo-300" />
                  </div>
                  <div className={`flex-1 rounded-lg p-2 text-xs ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <p className={isDarkMode ? 'text-slate-200' : 'text-slate-800'}>
                      {entry.prompt}
                    </p>
                  </div>
                </div>

                {/* AI Response - Only show if response exists (not pending) */}
                {entry.response && (
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <TbRobot size={14} className="text-purple-600 dark:text-purple-300" />
                    </div>
                    <div className={`flex-1 rounded-lg p-3 border ${isDarkMode ? 'bg-indigo-900/20 border-indigo-700' : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200'}`}>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        {entry.mode === 'huawei' && (
                          <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${
                            isDarkMode 
                              ? 'bg-green-900/30 text-green-300' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            Huawei Cloud AI
                          </span>
                        )}
                      </div>
                      {/* Markdown rendering for AI responses */}
                      <div className={`prose prose-sm max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
                        <ReactMarkdown
                          components={{
                            // Code blocks with dark background
                            code: ({ node, inline, className, children, ...props }) => {
                              if (inline) {
                                return (
                                  <code
                                    className={`px-1.5 py-0.5 rounded text-xs font-mono ${
                                      isDarkMode
                                        ? 'bg-slate-700 text-purple-300'
                                        : 'bg-slate-200 text-purple-700'
                                    }`}
                                    {...props}
                                  >
                                    {children}
                                  </code>
                                );
                              }
                              return (
                                <code
                                  className={`block p-3 rounded-lg text-xs font-mono overflow-x-auto ${
                                    isDarkMode
                                      ? 'bg-slate-900 text-slate-100 border border-slate-700'
                                      : 'bg-slate-900 text-slate-100 border border-slate-800'
                                  }`}
                                  {...props}
                                >
                                  {children}
                                </code>
                              );
                            },
                            // Paragraphs
                            p: ({ children }) => (
                              <p className={`text-xs mb-2 last:mb-0 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                                {children}
                              </p>
                            ),
                            // Lists
                            ul: ({ children }) => (
                              <ul className={`list-disc list-inside mb-2 space-y-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                                {children}
                              </ul>
                            ),
                            ol: ({ children }) => (
                              <ol className={`list-decimal list-inside mb-2 space-y-1 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                                {children}
                              </ol>
                            ),
                            li: ({ children }) => (
                              <li className={`text-xs ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                                {children}
                              </li>
                            ),
                            // Headings
                            h1: ({ children }) => (
                              <h1 className={`text-base font-bold mb-2 mt-2 first:mt-0 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                                {children}
                              </h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className={`text-sm font-bold mb-2 mt-2 first:mt-0 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                                {children}
                              </h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className={`text-xs font-semibold mb-1 mt-1 first:mt-0 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                                {children}
                              </h3>
                            ),
                            // Bold text
                            strong: ({ children }) => (
                              <strong className={`font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                                {children}
                              </strong>
                            ),
                            // Links
                            a: ({ href, children }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-xs underline ${isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'}`}
                              >
                                {children}
                              </a>
                            ),
                            // Blockquotes
                            blockquote: ({ children }) => (
                              <blockquote className={`border-l-4 pl-3 my-2 ${isDarkMode ? 'border-slate-600 text-slate-300' : 'border-slate-300 text-slate-700'}`}>
                                {children}
                              </blockquote>
                            ),
                          }}
                        >
                          {entry.response}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <TbRobot size={14} className="text-purple-600 dark:text-purple-300" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    <span className={`text-xs ml-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {tWidget.thinking}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className={`rounded-lg p-3 border ${
                isDarkMode 
                  ? 'bg-red-900/20 border-red-700' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <p className={`text-xs ${isDarkMode ? 'text-red-200' : 'text-red-800'}`}>
                  {error}
                </p>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form 
            onSubmit={handleSubmit} 
            className={`p-4 border-t ${isDarkMode ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-slate-50'}`}
          >
            <div className="flex space-x-2">
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
                placeholder={tWidget.placeholder}
                rows="2"
                className={`flex-1 px-3 py-2 text-xs rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                    : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
                disabled={loading}
              />
              <Button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <TbSend size={14} />
                    <span className="hidden sm:inline">{tWidget.askButton}</span>
                  </>
                )}
              </Button>
            </div>
            <p className={`text-[10px] mt-1.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {tWidget.enterHint}
            </p>
          </form>
        </div>
      )}

      {/* FAB Button - Launcher */}
      <div ref={widgetRef} className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer ${
            isOpen ? 'rotate-45' : 'hover:scale-110 hover:animate-pulse'
          }`}
          aria-label="Open AI Assistant"
        >
          {isOpen ? (
            <TbX size={24} />
          ) : (
            <TbSparkles size={24} />
          )}
        </button>
      </div>
    </>
  );
};

export default AIAssistantWidget;

