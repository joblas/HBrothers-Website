import { GoogleGenerativeAI } from "@google/generative-ai";
import { MENU_ITEMS } from "../constants";
import { MenuItem, ConversationContext } from "../types";

// Initialize the API
const API_KEY = (import.meta.env.VITE_GEMINI_API_KEY || "").trim();

console.log("[Gemini] API Key present:", !!API_KEY);
console.log("[Gemini] API Key prefix:", API_KEY ? API_KEY.substring(0, 8) + "..." : "none");

// Restaurant information
export const RESTAURANT_INFO = {
  name: "H Brothers",
  address: "212 E. Grand Ave, Escondido, CA 92025",
  phone: "(442) 999-5542",
  orderUrl: "https://www.hbrotherstogo.com/"
};

// Quick actions for the chat
export const QUICK_ACTIONS = [
  { id: 'menu', label: 'See Menu', icon: '🍔', message: 'Show me the menu' },
  { id: 'hours', label: 'Hours', icon: '🕐', message: 'What are your hours?' },
  { id: 'location', label: 'Location', icon: '📍', message: 'Where are you located?' },
  { id: 'order', label: 'Order Now', icon: '🛒', message: 'I want to order food' },
  { id: 'specials', label: 'Specials', icon: '⭐', message: "What are today's specials?" }
];

// Current promotion
export const CURRENT_PROMOTION = {
  id: 'promo-1',
  title: 'Try Our Famous Brisket!',
  description: '12-hour smoked brisket, limited daily availability. Get it before it sells out!',
  menuItemId: 'special-1',
  isActive: true
};

// System prompt
const SYSTEM_PROMPT = `You are the H Brothers Concierge, a friendly AI assistant for H Brothers restaurant in Escondido, CA.

Location: 212 E. Grand Ave, Escondido, CA 92025
Hours: Tuesday-Saturday 11AM-9PM, Closed Sunday & Monday
Phone: (442) 999-5542
Order online: https://www.hbrotherstogo.com/

Menu items:
${MENU_ITEMS.map(item => `- ${item.name} (${item.price}): ${item.description}`).join('\n')}

Keep responses short (1-3 sentences). Be friendly and helpful. Never make up menu items.`;

// Detect menu items in text
export const detectMenuItems = (text: string): MenuItem[] => {
  const lowerText = text.toLowerCase();
  return MENU_ITEMS.filter(item => lowerText.includes(item.name.toLowerCase()));
};

// Generate suggested replies
export const generateSuggestedReplies = (
  lastBotMessage: string,
  context: ConversationContext
): string[] => {
  const lower = lastBotMessage.toLowerCase();

  if (lower.includes('menu') || lower.includes('recommend')) {
    return ["What's most popular?", "Tell me about the brisket"];
  }
  if (lower.includes('hour') || lower.includes('open')) {
    return ["Where are you located?", "Can I order online?"];
  }
  if (lower.includes('escondido') || lower.includes('grand ave')) {
    return ["What are your hours?", "Show me the menu"];
  }

  return ["Show me the menu", "What are your hours?", "Where are you located?"];
};

// Update context
export const updateContext = (
  context: ConversationContext,
  userMessage: string,
  botResponse: string
): ConversationContext => {
  const newContext = { ...context };
  const lower = userMessage.toLowerCase();

  newContext.messageCount++;
  if (lower.includes('hour')) newContext.askedAboutHours = true;
  if (lower.includes('where') || lower.includes('location')) newContext.askedAboutLocation = true;

  detectMenuItems(botResponse).forEach(item => {
    if (!newContext.mentionedItems.includes(item.name)) {
      newContext.mentionedItems.push(item.name);
    }
  });

  return newContext;
};

// Main chat function
export const getChatResponse = async (
  _history: { role: "user" | "model"; parts: string }[],
  userMessage: string,
  context?: ConversationContext
): Promise<{ text: string; menuItems: MenuItem[]; suggestedReplies: string[] }> => {

  const defaultContext: ConversationContext = {
    mentionedItems: [],
    preferences: [],
    askedAboutHours: false,
    askedAboutLocation: false,
    messageCount: 0,
    sessionStart: new Date()
  };

  const ctx = context || defaultContext;

  if (!API_KEY) {
    console.error("[Gemini] No API key!");
    return {
      text: "I'm having trouble connecting. Please call us at (442) 999-5542!",
      menuItems: [],
      suggestedReplies: ["Call restaurant"]
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);

    // Try different model names (gemini-2.5-flash is currently available)
    const modelNames = [
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-1.5-flash"
    ];

    let responseText = "";
    let lastError = null;

    for (const modelName of modelNames) {
      try {
        console.log(`[Gemini] Trying model: ${modelName}`);

        const model = genAI.getGenerativeModel({ model: modelName });

        // Combine system prompt with user message
        const fullPrompt = `${SYSTEM_PROMPT}\n\nCustomer says: "${userMessage}"\n\nRespond as the H Brothers Concierge:`;

        const result = await model.generateContent(fullPrompt);
        responseText = result.response.text();

        console.log(`[Gemini] Success with model: ${modelName}`);
        break;

      } catch (err: any) {
        console.warn(`[Gemini] Model ${modelName} failed:`, err.message);
        lastError = err;
      }
    }

    if (!responseText) {
      throw lastError || new Error("All models failed");
    }

    const menuItems = detectMenuItems(responseText);
    const suggestedReplies = generateSuggestedReplies(responseText, ctx);

    return { text: responseText, menuItems, suggestedReplies };

  } catch (error: any) {
    console.error("[Gemini] All attempts failed:", error);
    return {
      text: `Sorry, I'm having trouble right now. Please call us at (442) 999-5542!`,
      menuItems: [],
      suggestedReplies: ["Try again", "Show me the menu"]
    };
  }
};
