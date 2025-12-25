export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'starters' | 'entrees' | 'sandwiches' | 'sides' | 'specials' | 'drinks';
  imageUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp?: Date;
  menuItems?: MenuItem[];
  suggestedReplies?: string[];
  isPromotion?: boolean;
}

export interface ConversationContext {
  mentionedItems: string[];
  preferences: string[];
  askedAboutHours: boolean;
  askedAboutLocation: boolean;
  messageCount: number;
  sessionStart: Date;
}

export interface ChatAnalytics {
  sessionId: string;
  startTime: Date;
  endTime?: Date;
  messageCount: number;
  questionsAsked: string[];
  menuItemsViewed: string[];
  feedbackRating?: number;
  feedbackComment?: string;
  quickActionsUsed: string[];
  orderLinkClicked: boolean;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  message: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  validUntil?: Date;
  menuItemId?: string;
  isActive: boolean;
}

export enum Category {
  Starters = 'starters',
  Entrees = 'entrees',
  Sandwiches = 'sandwiches',
  Sides = 'sides',
  Specials = 'specials',
  Drinks = 'drinks'
}
