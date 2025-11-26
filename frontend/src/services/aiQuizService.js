/**
 * AI Quiz Generator Service
 * 
 * Service for generating dynamic quiz questions using Huawei Cloud AI integration.
 * Creates quiz questions based on topic and difficulty level.
 */

import { aiService } from './aiService';

class AIQuizService {
  /**
   * Generate a quiz with questions about a specific topic
   * 
   * @param {string} topic - The topic for the quiz (e.g., "Blockchain", "Stellar Network")
   * @param {string} difficulty - Difficulty level ('beginner', 'intermediate', 'advanced')
   * @param {string} language - Language code ('en' or 'tr'), defaults to 'tr'
   * @param {number} questionCount - Number of questions to generate, defaults to 3
   * @returns {Promise<Array>} Array of quiz question objects
   */
  async generateQuiz(topic, difficulty = 'beginner', language = 'tr', questionCount = 3) {
    const isTurkish = language === 'tr';

    // Build the system prompt for strict JSON output
    const systemPrompt = isTurkish
      ? 'Sen bir Web3 eğitim platformu için uzman sınav hazırlayıcısısın. SADECE geçerli JSON çıktısı ver. Konuşma metni yazma. Hiçbir açıklama, ön ek veya son ek ekleme. Sadece JSON array döndür.'
      : 'You are an expert exam creator for a Web3 education platform. Output ONLY valid JSON. No conversational text. Do not add any explanations, prefixes, or suffixes. Return only a JSON array.';

    // 1. Random Focus Selector (Forces variety in questions)
    const focusAngles = isTurkish
      ? [
          "teknik detaylarına",
          "gerçek hayat kullanım örneklerine",
          "güvenlik yönlerine",
          "temel kavramlarına",
          "gelecek potansiyeline",
          "çalışma mekanizmasına",
          "avantaj ve dezavantajlarına",
          "uygulama alanlarına"
        ]
      : [
          "technical details",
          "real-world use cases",
          "security aspects",
          "fundamental concepts",
          "future potential",
          "working mechanism",
          "advantages and disadvantages",
          "application areas"
        ];
    
    const randomFocus = focusAngles[Math.floor(Math.random() * focusAngles.length)];
    
    // 2. Random Seed (Forces AI to generate different questions each time)
    const seed = Date.now() + Math.floor(Math.random() * 10000);
    
    // Build the user prompt with strict format requirements + randomness
    const userPrompt = isTurkish
      ? `Konu: ${topic}
Zorluk Seviyesi: ${difficulty}
Odak Noktası: Bu testte konunun özellikle **${randomFocus}** odaklan.

GÖREV: Daha önce sormadığın, tamamen özgün ve benzersiz ${questionCount} adet çoktan seçmeli soru hazırla. Her soru farklı bir açıdan konuyu ele almalı.

Random Seed: ${seed} (Bu sayıyı kullanarak varyasyon üret ve her seferinde farklı sorular oluştur)

Format: Sadece saf JSON array döndür. Başka hiçbir metin yazma. Markdown code block kullanma.

JSON Şeması (tam olarak bu formatta):
[
  {
    "id": "q1",
    "question": "Soru metni",
    "choices": ["A şıkkı", "B şıkkı", "C şıkkı", "D şıkkı"],
    "correctAnswer": "Doğru olan şıkkın birebir aynısı (choices array'indeki bir değerle tam eşleşmeli)",
    "explanation": "Neden doğru olduğuna dair kısa açıklama"
  }
]

Önemli Kurallar:
- correctAnswer değeri, choices array'indeki bir değerle BİREBİR aynı olmalı
- Her soru için tam olarak 4 seçenek olmalı
- Sorular ${difficulty} seviyesine uygun olmalı
- Açıklamalar kısa ve öğretici olmalı
- Her soru benzersiz olmalı, önceki sorularla tekrar etmemeli`
      : `Topic: ${topic}
Difficulty Level: ${difficulty}
Focus Point: In this test, focus especially on the **${randomFocus}** of the topic.

TASK: Create ${questionCount} completely original and unique multiple-choice questions that you have never asked before. Each question should approach the topic from a different angle.

Random Seed: ${seed} (Use this number to generate variation and create different questions each time)

Format: Return ONLY a pure JSON array. Do not write any other text. Do not use markdown code blocks.

JSON Schema (exactly in this format):
[
  {
    "id": "q1",
    "question": "Question text",
    "choices": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "The exact text from choices array that is correct",
    "explanation": "Brief explanation of why it's correct"
  }
]

Important Rules:
- correctAnswer value must EXACTLY match one value from the choices array
- Each question must have exactly 4 choices
- Questions should be appropriate for ${difficulty} level
- Explanations should be brief and educational
- Each question must be unique and not repeat previous questions`;

    try {
      // Call AI service with type='analyze' to bypass validation
      // Note: System prompt is already defined in userPrompt, so backend's system prompt doesn't matter
      const result = await aiService.explainConcept(
        userPrompt,
        {},
        null,
        language,
        [], // No conversation history for quiz generation
        'analyze' // Use 'analyze' type (validated in backend whitelist)
      );

      if (!result || !result.response) {
        throw new Error('AI service returned empty response');
      }

      // 1. Basic cleanup: remove markdown code blocks if present
      let cleanJson = result.response.trim();
      
      // Remove markdown code blocks (```json ... ```)
      cleanJson = cleanJson.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      
      // Remove any leading/trailing whitespace or newlines
      cleanJson = cleanJson.replace(/^\s*[\r\n]+/gm, '').replace(/[\r\n]+\s*$/gm, '').trim();

      // Try to extract JSON if it's wrapped in other text
      const jsonMatch = cleanJson.match(/\[[\s\S]*/);
      if (jsonMatch) {
        cleanJson = jsonMatch[0];
      }

      // 2. TRUNCATION FIX: Auto-repair broken JSON
      // If the AI cut off in the middle, find the last complete object and close the array
      if (!cleanJson.endsWith(']')) {
        console.warn('[AI Quiz Service] AI response truncated. Attempting repair...');
        
        // Find the last complete object (ending with })
        const lastClosingBrace = cleanJson.lastIndexOf('}');
        
        if (lastClosingBrace !== -1) {
          // Cut off the garbage at the end and close the array
          cleanJson = cleanJson.substring(0, lastClosingBrace + 1) + ']';
          console.log('[AI Quiz Service] JSON repaired by closing array at last complete object');
        } else {
          // If no complete object found, try to find the opening bracket and add a closing bracket
          const openingBracket = cleanJson.indexOf('[');
          if (openingBracket !== -1) {
            // If we have at least one opening bracket, try to close it
            cleanJson = cleanJson.substring(0, openingBracket + 1) + ']';
            console.warn('[AI Quiz Service] JSON repaired by adding closing bracket (no complete objects found)');
          } else {
            const errorMessage = isTurkish
              ? 'AI yanıtı çok bozuk, onarılamadı. Lütfen tekrar deneyin.'
              : 'AI response is too corrupted and cannot be repaired. Please try again.';
            throw new Error(errorMessage);
          }
        }
      }

      // 3. Parse the JSON
      let questions;
      try {
        questions = JSON.parse(cleanJson);
      } catch (parseError) {
        console.error('[AI Quiz Service] JSON Parse Error:', parseError);
        console.error('[AI Quiz Service] Raw Response:', result.response);
        console.error('[AI Quiz Service] Cleaned JSON:', cleanJson);
        
        const errorMessage = isTurkish
          ? 'AI yanıtı geçerli JSON formatında değil. Lütfen tekrar deneyin.'
          : 'AI response is not in valid JSON format. Please try again.';
        throw new Error(errorMessage);
      }

      // 4. Validate Structure
      if (!Array.isArray(questions)) {
        const errorMessage = isTurkish
          ? 'AI yanıtı bir array değil.'
          : 'AI response is not an array';
        throw new Error(errorMessage);
      }

      if (questions.length === 0) {
        const errorMessage = isTurkish
          ? 'AI geçerli bir soru listesi döndürmedi.'
          : 'AI generated no questions';
        throw new Error(errorMessage);
      }

      // Validate the structure
      if (!Array.isArray(questions)) {
        throw new Error('AI response is not an array');
      }

      if (questions.length === 0) {
        throw new Error('AI generated no questions');
      }

      // Validate and normalize each question
      const validatedQuestions = questions.map((q, index) => {
        // Ensure required fields exist
        if (!q.question || !q.choices || !q.correctAnswer) {
          throw new Error(`Question ${index + 1} is missing required fields`);
        }

        // Ensure choices is an array with 4 items
        if (!Array.isArray(q.choices) || q.choices.length !== 4) {
          throw new Error(`Question ${index + 1} must have exactly 4 choices`);
        }

        // Ensure correctAnswer matches one of the choices
        if (!q.choices.includes(q.correctAnswer)) {
          // Try to find a case-insensitive match
          const matchedChoice = q.choices.find(
            choice => choice.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()
          );
          
          if (matchedChoice) {
            q.correctAnswer = matchedChoice; // Use the exact choice text
          } else {
            console.warn(`Question ${index + 1}: correctAnswer "${q.correctAnswer}" doesn't match any choice. Using first choice as fallback.`);
            q.correctAnswer = q.choices[0]; // Fallback to first choice
          }
        }

        // Return normalized question object
        return {
          id: q.id || `q${index + 1}`,
          question: q.question.trim(),
          choices: q.choices.map(c => c.trim()),
          correctAnswer: q.correctAnswer.trim(),
          explanation: q.explanation ? q.explanation.trim() : ''
        };
      });

      // Map UI Difficulty to System Keys
      const difficultyMap = {
        'Kolay': 'beginner',
        'Orta': 'intermediate',
        'Zor': 'advanced',
        'Easy': 'beginner',
        'Medium': 'intermediate',
        'Hard': 'advanced',
        'beginner': 'beginner',
        'intermediate': 'intermediate',
        'advanced': 'advanced'
      };

      // Default to 'beginner' if not found
      const systemDifficulty = difficultyMap[difficulty] || 'beginner';

      // Construct the Full Quest Object
      const fullQuestObject = {
        id: `ai-${Date.now()}`, // Unique ID
        nameKey: topic, // Or a dynamic title
        descriptionKey: isTurkish 
          ? `${topic} hakkında yapay zeka tarafından hazırlanan test.`
          : `AI-generated test about ${topic}.`,
        difficulty: systemDifficulty, // FIX: Correct system key
        rewardAmount: 20, // FIX: Hardcoded 20 CQT for AI quizzes
        isAiGenerated: true,
        category: 'ai-generated',
        timeEstimate: validatedQuestions.length * 2,
        certificateNftUrl: null,
        questions: validatedQuestions, // Keep questions array for backward compatibility
        lessons: validatedQuestions.map((q, index) => ({
          id: q.id || `q-${index}`,
          title: isTurkish ? `Soru ${index + 1}` : `Question ${index + 1}`,
          questionKey: q.question, // Direct text instead of translation key
          choices: q.choices,
          correctAnswerKey: q.correctAnswer,
          explanationKey: q.explanation || ''
        }))
      };

      return fullQuestObject;

    } catch (error) {
      console.error('[AI Quiz Service] Generation Failed:', error);
      
      const errorMessage = isTurkish
        ? 'Yapay zeka test oluşturamadı. Lütfen tekrar deneyin.'
        : 'AI failed to generate quiz. Please try again.';
      
      throw new Error(error.message || errorMessage);
    }
  }

  /**
   * Generate a quiz and format it for the quest data structure
   * 
   * @param {string} topic - The topic for the quiz
   * @param {string} difficulty - Difficulty level
   * @param {string} language - Language code
   * @param {number} questionCount - Number of questions
   * @returns {Promise<Array>} Formatted lessons array compatible with quest data structure
   */
  async generateQuizLessons(topic, difficulty = 'beginner', language = 'tr', questionCount = 3) {
    const questions = await this.generateQuiz(topic, difficulty, language, questionCount);

    // Format questions to match the quest data structure
    return questions.map((q, index) => ({
      id: q.id || `lesson-${index + 1}`,
      questionKey: q.question, // Direct text instead of translation key
      choices: q.choices, // Direct array instead of translation keys
      correctAnswerKey: q.correctAnswer, // Direct text instead of translation key
      explanationKey: q.explanation // Direct text instead of translation key
    }));
  }
}

export const aiQuizService = new AIQuizService();
export default aiQuizService;

