import { ChatAnalytics } from '../types';

declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'js' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

const STORAGE_KEY = 'hbrothers_chat_analytics';
const SESSIONS_KEY = 'hbrothers_chat_sessions';

// Helper to send events to GA4 if available
const sendGAEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

// Generate a unique session ID
const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Current session analytics
let currentSession: ChatAnalytics | null = null;

export const startSession = (): ChatAnalytics => {
  currentSession = {
    sessionId: generateSessionId(),
    startTime: new Date(),
    messageCount: 0,
    questionsAsked: [],
    menuItemsViewed: [],
    quickActionsUsed: [],
    orderLinkClicked: false
  };
  
  // Track session start
  sendGAEvent('chat_session_start');
  
  return currentSession;
};

export const getSession = (): ChatAnalytics | null => currentSession;

export const trackMessage = (message: string, isUser: boolean) => {
  if (!currentSession) startSession();
  if (currentSession && isUser) {
    currentSession.messageCount++;
    currentSession.questionsAsked.push(message);
    
    // Send to GA4
    sendGAEvent('chat_interaction', {
      event_category: 'Chat',
      event_label: 'User Question',
      message_length: message.length
    });
  }
};

export const trackMenuItemView = (itemId: string) => {
  if (!currentSession) startSession();
  if (currentSession && !currentSession.menuItemsViewed.includes(itemId)) {
    currentSession.menuItemsViewed.push(itemId);
    
    // Send standard e-commerce event
    sendGAEvent('view_item', {
      currency: 'USD',
      items: [{ item_name: itemId }]
    });
  }
};

export const trackQuickAction = (actionId: string) => {
  if (!currentSession) startSession();
  if (currentSession) {
    currentSession.quickActionsUsed.push(actionId);
    
    sendGAEvent('select_content', {
      content_type: 'quick_action',
      item_id: actionId
    });
  }
};

export const trackOrderClick = () => {
  if (!currentSession) startSession();
  if (currentSession) {
    currentSession.orderLinkClicked = true;
    
    // High value event
    sendGAEvent('begin_checkout', {
      method: 'external_link'
    });
  }
};

export const trackFeedback = (rating: number, comment?: string) => {
  if (!currentSession) return;
  currentSession.feedbackRating = rating;
  currentSession.feedbackComment = comment;
  
  sendGAEvent('post_score', {
    score: rating,
    level: 1 // Using 'level' as a proxy for session depth or similar if needed
  });
};

export const endSession = () => {
  if (!currentSession) return;

  currentSession.endTime = new Date();

  // Save to localStorage
  const savedSessions = getSavedSessions();
  savedSessions.push(currentSession);

  // Keep only last 100 sessions
  if (savedSessions.length > 100) {
    savedSessions.shift();
  }

  localStorage.setItem(SESSIONS_KEY, JSON.stringify(savedSessions));
  currentSession = null;
};

export const getSavedSessions = (): ChatAnalytics[] => {
  try {
    const saved = localStorage.getItem(SESSIONS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Analytics summary for owners
export const getAnalyticsSummary = () => {
  const sessions = getSavedSessions();

  if (sessions.length === 0) {
    return {
      totalSessions: 0,
      avgMessagesPerSession: 0,
      topQuestions: [],
      popularMenuItems: [],
      avgRating: 0,
      orderClickRate: 0
    };
  }

  const totalMessages = sessions.reduce((sum, s) => sum + s.messageCount, 0);
  const ratings = sessions.filter(s => s.feedbackRating).map(s => s.feedbackRating!);
  const orderClicks = sessions.filter(s => s.orderLinkClicked).length;

  // Count question frequencies
  const questionCounts: Record<string, number> = {};
  sessions.forEach(s => {
    s.questionsAsked.forEach(q => {
      const normalized = q.toLowerCase().trim();
      questionCounts[normalized] = (questionCounts[normalized] || 0) + 1;
    });
  });

  // Count menu item views
  const itemCounts: Record<string, number> = {};
  sessions.forEach(s => {
    s.menuItemsViewed.forEach(item => {
      itemCounts[item] = (itemCounts[item] || 0) + 1;
    });
  });

  return {
    totalSessions: sessions.length,
    avgMessagesPerSession: Math.round(totalMessages / sessions.length * 10) / 10,
    topQuestions: Object.entries(questionCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([q, count]) => ({ question: q, count })),
    popularMenuItems: Object.entries(itemCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([item, count]) => ({ item, count })),
    avgRating: ratings.length > 0
      ? Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length * 10) / 10
      : 0,
    orderClickRate: Math.round(orderClicks / sessions.length * 100)
  };
};

// Export session data as CSV for owners
export const exportSessionsCSV = (): string => {
  const sessions = getSavedSessions();
  const headers = ['Session ID', 'Start Time', 'End Time', 'Messages', 'Rating', 'Order Clicked', 'Questions Asked'];

  const rows = sessions.map(s => [
    s.sessionId,
    new Date(s.startTime).toISOString(),
    s.endTime ? new Date(s.endTime).toISOString() : '',
    s.messageCount.toString(),
    s.feedbackRating?.toString() || '',
    s.orderLinkClicked ? 'Yes' : 'No',
    `"${s.questionsAsked.join('; ')}"`
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
};
