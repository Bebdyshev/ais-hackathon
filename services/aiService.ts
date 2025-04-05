
import { AIResponse, RoadmapStep, Language } from "@/types/assistant";

const API_KEY = "691e957b3d2bb6c598bfc505021c78b62e12006287e20d7684301bf61b44a61f";
const API_URL = "https://api.together.xyz/v1/completions";

export async function getAIResponse(prompt: string, language: Language = 'english'): Promise<AIResponse> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        prompt: createPrompt(prompt, language),
        max_tokens: 800,
        temperature: 0.7,
        top_p: 0.9,
        stop: ["</response>"]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return parseAIResponse(data.choices[0].text);
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return {
      text: getErrorMessageInLanguage(language)
    };
  }
}

function createPrompt(userQuery: string, language: Language): string {
  const languageInstructions = getLanguageInstructions(language);
  
  return `<system>
You are a helpful AI assistant specialized in helping students avoid being late to school.
When answering questions, provide your response in the form of a clear visual roadmap with numbered steps.

${languageInstructions}
Each roadmap step MUST have a clear title and a detailed explanation.
Format your response like this:
1. [Step Title]
   [Detailed explanation for this step]
2. [Step Title]
   [Detailed explanation for this step]

Focus on practical, actionable advice that students can implement.
Be encouraging and positive.
</system>

<human>
${userQuery}
</human>

<response>`;
}

function getLanguageInstructions(language: Language): string {
  switch (language) {
    case 'russian':
      return 'Respond in Russian. Write all text in Russian.';
    case 'kazakh':
      return 'Respond in Kazakh. Write all text in Kazakh.';
    case 'english':
    default:
      return 'Respond in English. Write all text in English.';
  }
}

function getErrorMessageInLanguage(language: Language): string {
  switch (language) {
    case 'russian':
      return "Извините, я не смог обработать ваш запрос. Пожалуйста, повторите попытку позже.";
    case 'kazakh':
      return "Кешіріңіз, мен сіздің сұрауыңызды өңдей алмадым. Кейінірек қайталап көріңіз.";
    case 'english':
    default:
      return "I'm sorry, I couldn't process your request. Please try again later.";
  }
}

function parseAIResponse(text: string): AIResponse {
  // Basic parsing logic
  const cleanedText = text.trim();
  
  // Try to extract steps from the response
  const stepRegex = /(\d+)[.:)]?\s+([^\n]+)(?:\n|$)((?:.+?\n)*)/g;
  const roadmap: RoadmapStep[] = [];
  
  let match;
  while ((match = stepRegex.exec(cleanedText)) !== null) {
    const title = match[2].trim();
    const content = match[3] ? match[3].trim() : "";
    roadmap.push({ title, content });
  }
  
  return {
    text: cleanedText,
    roadmap: roadmap.length > 0 ? roadmap : undefined
  };
}
