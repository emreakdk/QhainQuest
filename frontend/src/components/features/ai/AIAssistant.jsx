import { useState, useRef, useEffect } from 'react';
import { aiService } from '../../../services/aiService';
import { useLanguage } from '../../../context/LanguageContext';
import Button from '../../ui/Button';

/**
 * AI Assistant Component
 * 
 * Provides AI-powered help and explanations for users.
 * Integrates with Huawei Cloud LLM via backend API.
 */
const AIAssistant = ({ questId = null, context = {} }) => {
  const { t } = useLanguage();
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const textareaRef = useRef(null);
  const responseRef = useRef(null);

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
      const result = await aiService.explainConcept(userPrompt, context, questId);
      
      if (!result || !result.response) {
        throw new Error('Received empty response from AI service.');
      }
      
      const newEntry = {
        prompt: userPrompt,
        response: result.response,
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
      const result = await aiService.explainConcept(quickPrompt, context, questId);
      
      if (!result || !result.response) {
        throw new Error('Received empty response from AI service.');
      }
      
      const newEntry = {
        prompt: quickPrompt,
        response: result.response,
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
    { text: 'What is blockchain?', icon: '🔗' },
    { text: 'Explain Stellar network', icon: '⭐' },
    { text: 'What are smart contracts?', icon: '📜' },
    { text: 'How do tokens work?', icon: '🪙' }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-2xl">
              🤖
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                AI Learning Assistant
              </h3>
              <p className="text-sm text-indigo-100">
                Powered by Huawei Cloud AI
              </p>
            </div>
          </div>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-white/80 hover:text-white text-sm px-3 py-1 rounded-lg hover:bg-white/10 transition-colors"
            >
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
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickQuestion(q.text)}
                disabled={loading}
                className="flex items-center space-x-2 px-3 py-2 text-left text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{q.icon}</span>
                <span className="text-slate-700 dark:text-slate-300">{q.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Response Area */}
      <div className="p-4 sm:p-6 max-h-[400px] overflow-y-auto" ref={responseRef}>
        {history.length === 0 && !loading && !error && (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <div className="text-4xl mb-3">💡</div>
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
                <span className="text-sm">👤</span>
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
                <span className="text-sm">🤖</span>
              </div>
              <div className="flex-1 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-3 border border-indigo-200 dark:border-indigo-700">
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
              <span className="text-sm">🤖</span>
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
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Ask'
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

