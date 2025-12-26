import { GoogleGenerativeAI } from "@google/generative-ai";
import { MENU_ITEMS } from "../constants";
import { MenuItem, ConversationContext } from "../types";
import siteContent from '../content.json';

// Initialize the API
const API_KEY = (import.meta.env.VITE_GEMINI_API_KEY || "").trim();

console.log("[Gemini] API Key present:", !!API_KEY);
console.log("[Gemini] API Key prefix:", API_KEY ? API_KEY.substring(0, 8) + "..." : "none");

// Restaurant information
export const RESTAURANT_INFO = siteContent.restaurant;

// System prompt with comprehensive restaurant knowledge
const SYSTEM_PROMPT = `You are the H Brothers Concierge, a warm and knowledgeable AI assistant for H Brothers restaurant in Escondido, CA.

## THE OWNERS & STORY
H Brothers is owned by brothers **Nick and Justin Hedayati**. The "H" stands for Hedayati - they chose "H Brothers" because their last name can be hard to remember!

The Hedayati brothers come from a restaurant family legacy. Their father owns Chicken Plus on Escondido Boulevard, a beloved local spot for Mediterranean cuisine where you can see chickens roasting on open flames from the street. Nick started helping at age 6, buttering pans, and both brothers worked there through their teens.

They opened H Brothers to bring something new to Grand Avenue - North American comfort food made from scratch. They spent two years renovating a former sushi restaurant and navigating city regulations before opening. As Nick says, "We wanted to do things that they weren't already doing on Grand Avenue."

## HERITAGE & CUISINE
The brothers blend their unique heritage into the menu:
- Their father is from Cyprus (Mediterranean influence - like the Tzatziki chicken wrap)
- Their mother is from Boston (New England influence - like clam chowder)
- French-Canadian heritage (explains the authentic poutine!)

Nick describes their food as "comfort food you didn't know you wanted." Their philosophy: "We're trying to give you your money's worth" with fair pricing, generous portions, and everything made fresh.

## CUSTOMER FAVORITES & SIGNATURES
- **Brisket** - Smoked 6-12 hours, "to die for" per reviews. Often sells out!
- **Poutine** - Authentic French-Canadian: double-fried fries, beef gravy, cheese curds
- **Monte Cristo** - Ham & swiss in pancake batter, deep fried, served with syrup & house-made raspberry sauce
- **Brisket Mac & Cheese** - Signature dish combining their famous brisket with triple-cream mac
- **Beignets** - With amazing raspberry sauce and powdered sugar
- **House-made Chocolate Cake** - A special treat
- **Seafood Melt** - Seared shrimp and scallops on sourdough with remoulade

## LOCATION & HOURS
Address: 212 E. Grand Ave, Escondido, CA 92025 (Historic Downtown Grand Avenue)
Hours: Tuesday-Saturday 11AM-9PM | Closed Sunday & Monday
Phone: (442) 999-5542
Order online: https://www.hbrotherstogo.com/
Instagram: @hbrothers_esco

## RATINGS & RECOGNITION
- 4.8 stars on Yelp with 500+ reviews
- 4.7 stars on Google
- 764+ photos on Yelp - people love photographing the food!
- Known for: generous portions, friendly service, cozy atmosphere, local craft beers on tap

## MENU
${MENU_ITEMS.map(item => `- ${item.name} (${item.price}): ${item.description}`).join('\n')}

## RESPONSE GUIDELINES
- Be warm, friendly, and conversational - like you're part of the H Brothers family
- Keep responses concise (2-4 sentences) unless more detail is needed
- Show pride in the restaurant's family story and quality
- When asked about owners: Nick and Justin Hedayati, the "H Brothers"
- When asked "what's popular": mention the brisket, poutine, and Monte Cristo
- For menu links: "Check out our full menu at https://www.hbrotherstogo.com/"
- Never make up information - if unsure, suggest calling (442) 999-5542`;

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

  if (lower.includes('nick') || lower.includes('justin') || lower.includes('hedayati') || lower.includes('owner')) {
    return ["What's your story?", "What's most popular?", "Show me the menu"];
  }
  if (lower.includes('brisket')) {
    return ["What else is popular?", "Tell me about the poutine", "Can I order online?"];
  }
  if (lower.includes('poutine') || lower.includes('french-canadian')) {
    return ["Try the Monte Cristo!", "What's the brisket like?", "Show me the menu"];
  }
  if (lower.includes('menu') || lower.includes('recommend')) {
    return ["What's most popular?", "Tell me about the brisket", "Who owns this place?"];
  }
  if (lower.includes('hour') || lower.includes('open')) {
    return ["Where are you located?", "Can I order online?", "What's popular?"];
  }
  if (lower.includes('escondido') || lower.includes('grand ave')) {
    return ["What are your hours?", "Show me the menu", "Tell me your story"];
  }

  return ["What's most popular?", "Who owns H Brothers?", "Show me the menu"];
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
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    const fullPrompt = `${SYSTEM_PROMPT}\n\nCustomer says: "${userMessage}"\n\nRespond as the H Brothers Concierge:`;

    console.log("[Gemini] Sending request...");
    const result = await model.generateContent(fullPrompt);
    const responseText = result.response.text();
    console.log("[Gemini] Got response");

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
