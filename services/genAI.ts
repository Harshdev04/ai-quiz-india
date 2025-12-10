import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuizQuestions = async (
  topic: string,
  difficulty: string,
  count: number = 5
): Promise<QuizQuestion[]> => {
  try {
    const model = "gemini-2.5-flash";
    
    // Explicitly enforce India context in the prompt
    const prompt = `Generate ${count} multiple-choice quiz questions specifically related to India and Indian contexts about the topic "${topic}" at a "${difficulty}" difficulty level.
    
    CRITICAL INSTRUCTIONS:
    1. Every single question MUST be about India (Indian History, Indian Movies/Bollywood, Indian Science/ISRO, Indian Music, Indian Geography, etc.).
    2. Ensure the questions are engaging, accurate, and diverse.
    3. Provide 4 options for each question.
    4. Provide a brief explanation for why the correct answer is right.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: "You are a professional quiz master AI specialized in India. Your goal is to generate high-quality, educational, and fun quiz questions about India formatted strictly as JSON. Do not generate questions about other countries unless they directly relate to India.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: {
                type: Type.STRING,
                description: "The text of the question"
              },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "An array of 4 possible answers"
              },
              correctAnswer: {
                type: Type.STRING,
                description: "The correct answer string, must be one of the options"
              },
              explanation: {
                type: Type.STRING,
                description: "A short explanation of the correct answer"
              }
            },
            required: ["question", "options", "correctAnswer", "explanation"]
          }
        },
        temperature: 0.8,
      }
    });

    if (!response.text) {
      throw new Error("No response text received from Gemini");
    }

    const data = JSON.parse(response.text);
    return data as QuizQuestion[];

  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
};