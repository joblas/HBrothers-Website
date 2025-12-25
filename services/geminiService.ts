import { GoogleGenerativeAI } from "@google/generative-ai";
import { MENU_ITEMS } from "../constants";

// Initialize the API
const rawApiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const API_KEY = rawApiKey ? rawApiKey.trim() : "";

console.log("[Gemini Service] Loading...");
console.log(`[Gemini Service] API Key present: ${!!API_KEY}`);
if (API_KEY) {
  console.log(`[Gemini Service] Key start: ${API_KEY.substring(0, 4)}...`);
  console.log(`[Gemini Service] Key length: ${API_KEY.length}`);
}

if (!API_KEY) {
  console.error("Gemini AI: API Key is missing! Ensure VITE_GEMINI_API_KEY is in your .env file and restart the server.");
}

let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

const SYSTEM_INSTRUCTION = `
You are the "H Brothers Concierge", a helpful, enthusiastic, and food-focused AI assistant for H Brothers restaurant in Escondido, CA.

**Your Goal:**
Help customers find the perfect meal, answer questions about hours/location, and guide them to order online.

**Your Tone:**
- Friendly & Welcoming ("Welcome to H Brothers!", "Hey neighbor!")
- Enthusiastic about Food ("Our 12-hour smoked brisket is legendary!")
- Professional & Efficient (Provide clear answers).

**Key Information:**
- **Location:** 212 E. Grand Ave, Escondido, CA 92025 (Downtown Escondido).
- **Hours:** Tuesday - Saturday, 11:00 AM - 9:00 PM. Closed Sunday & Monday.
- **Reservations:** No reservations needed! Walk-ins are always welcome.
- **Ordering:** Order online at www.hbrotherstogo.com for pickup or via Delivery apps.
- **Phone:** (442) 999-5542.

**Menu Highlights (Use these to make recommendations):**
${MENU_ITEMS.map(item => `- ${item.name} (${item.price}): ${item.description}`).join('\n')}

**Rules:**
1. If someone asks for the menu, summarize the categories (Classics, Specials) and mention a few favorites like the Brisket Mac & Cheese or Classic Burger.
2. If someone asks to order, provide this link: https://www.hbrotherstogo.com/
3. If you don't know the answer, politely ask them to call the restaurant at (442) 999-5542.
4. Keep responses concise (under 3 sentences) unless they ask for a detailed menu.
5. Do NOT make up menu items that are not on the list.
`;

if (genAI) {
  model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: SYSTEM_INSTRUCTION
  });
}

export const getChatResponse = async (history: { role: "user" | "model"; parts: string }[], newMessage: string) => {
  if (!API_KEY || !model) {
    return "I'm sorry, I'm having trouble connecting to the kitchen right now. Please call us at (442) 999-5542.";
  }

  try {
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello, who are you?" }],
        },
        {
          role: "model",
          parts: [{ text: "I am the H Brothers Concierge. How can I help you get fed today?" }],
        },
      ],
    });

    // Send the user's message
    const result = await chat.sendMessage(newMessage);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return `(Debug Error): ${error.message || "Unknown error"}. Check your API Key restrictions in Google Cloud Console.`;
  }
};