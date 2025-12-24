
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || "";

const SYSTEM_INSTRUCTION = `
You are the AI Concierge for "H-Brothers" in Escondido. 
Goal: Provide extremely fast, concise, and helpful answers.

Tone: Friendly, local, and brief. 

Knowledge:
- Signature: Brisket Mac & Cheese ($16.95).
- Menu: Classic Burger ($14.95), Poutine ($11.50), Brisket Sandwich ($15.95), Shrimp Po-Boy ($15.25).
- Hours: Tue-Sat, 11am-9pm. Closed Sun/Mon.
- Location: 212 E. Grand Ave, Downtown Escondido.
- Order: hbrotherstogo.com (Pickup).

Instructions:
1. KEEP RESPONSES TO 1-2 SHORT SENTENCES MAX. Speed is priority.
2. If using Google Search for specials or events, always provide the answer instantly.
3. Always suggest the Brisket Mac for first-timers.
`;

export interface BaristaResponse {
  text: string;
  sources?: { title: string; uri: string }[];
}

export const getBaristaResponse = async (userMessage: string): Promise<BaristaResponse> => {
  if (!apiKey) return { text: "Our kitchen is prepping! Please call (442) 999-5542." };

  // Re-init for latest key access
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', // Faster Flash model
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.6,
        thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for max speed
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "I'm here to help!";
    
    // Extract grounding chunks for compliance if search was used
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.filter(chunk => chunk.web)
      .map(chunk => ({
        title: chunk.web?.title || "Source",
        uri: chunk.web?.uri || ""
      }));

    return { text, sources };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { text: "The stove is hot! Try again in a second." };
  }
};
