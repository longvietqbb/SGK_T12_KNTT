import { GoogleGenAI, ChatSession } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../data";

// Initialize the API client
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API_KEY is not set via process.env.API_KEY");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-to-prevent-crash' });

// Create a persistent chat session variable to maintain context outside the component lifecycle if needed,
// but for this React app, we will manage the session within the hook/component.
// However, the helper functions below facilitate the interaction.

export const createChatSession = async (): Promise<ChatSession> => {
    // Model configuration
    const modelId = "gemini-2.5-flash";
    
    const chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Balance between creativity and precision for math explanation
        maxOutputTokens: 2000, 
      },
    });

    return chat;
};

export const sendMessageToGemini = async (chatSession: ChatSession, message: string): Promise<string> => {
  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "Xin lỗi, tôi không thể tạo câu trả lời lúc này.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
