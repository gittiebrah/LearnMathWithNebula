
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getGameInsight = async (gameTitle: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are the Nebula AI, an advanced computer core for a gaming arcade in the year 2350. 
      Briefly provide a futuristic "Lore Bit" for a game titled "${gameTitle}" in 2 short sentences. 
      Use sci-fi terminology and make it sound mysterious.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to Nebula Core. Sector data unavailable.";
  }
};

export const getAIRecommendation = async (mood: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `The user's current mood or preference is "${mood}". Recommend a style of game (e.g., high-speed action, deep strategy, calm puzzle) and give it a futuristic name. Format: "Recommendation: [Name] - [Reason]"`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The Archive Core is recalibrating. Try again later.";
  }
};
