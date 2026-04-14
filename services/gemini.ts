
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { UserProfile, Recipe, Ingredient } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMealPlanSuggestions = async (
  profile: UserProfile, 
  availableIngredients: Ingredient[]
): Promise<Recipe[]> => {
  const criticalIngredients = [...availableIngredients]
    .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime())
    .slice(0, 5)
    .map(i => i.name)
    .join(', ');

  const familyContext = profile.familyMembers.length > 0 
    ? `Household members: ${profile.familyMembers.map(m => `${m.name} (${m.dietaryPreference})`).join(', ')}.` 
    : '';

  const prompt = `
    Suggest 3 healthy recipes. Use universal English only. No slang.
    - User: ${profile.name}, Age: ${profile.age}, Preference: ${profile.dietaryPreference}
    - Critical ingredients to use: ${criticalIngredients}
    - ${familyContext}

    STRICT RULES:
    1. Only suggest recipes certified by standard safety partners.
    2. Focus on high nutrition and seasonal freshness.
    3. Output must be valid JSON.
    4. Set "isCertified" to true only if the ingredients meet health-approved standards.

    Return JSON:
    - title, description, calories (number), time (minutes), difficulty, ingredients (list), steps (list), whySuggested, contextInfo, healthWarnings (list), isCertified (boolean).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              calories: { type: Type.NUMBER },
              time: { type: Type.NUMBER },
              difficulty: { type: Type.STRING },
              ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
              steps: { type: Type.ARRAY, items: { type: Type.STRING } },
              whySuggested: { type: Type.STRING },
              contextInfo: { type: Type.STRING },
              healthWarnings: { type: Type.ARRAY, items: { type: Type.STRING } },
              isCertified: { type: Type.BOOLEAN }
            },
            required: ["title", "description", "calories", "time", "difficulty", "ingredients", "steps", "whySuggested", "isCertified"]
          }
        }
      }
    });

    const results = JSON.parse(response.text || '[]');
    return results.filter((r: Recipe) => r.isCertified === true);
  } catch (e) {
    return [];
  }
};

export const getMotivationalMessage = async (history: {role: string, text: string}[]) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.text }] })),
    config: {
      systemInstruction: "You are NexoChef Assistant. Use only universal English. No Hindi or region-specific slang. Be a professional health and culinary guide. Provide humor and motivation to keep the user on their wellness schedule. Format your responses using clear Markdown with headings, bullet points, and bold text for readability."
    }
  });
  return response.text;
};

export const generateSpeech = async (text: string): Promise<string | undefined> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (e) {
    return undefined;
  }
};
