import React, { useState, useRef, useEffect } from 'react';
import {
  getChatResponse,
  updateContext,
  QUICK_ACTIONS,
  RESTAURANT_INFO,
  CURRENT_PROMOTION
} from '../services/geminiService';
import {
  startSession,
  trackMessage,
  trackMenuItemView,
  trackQuickAction,
  trackOrderClick,
  trackFeedback,
  endSession
} from '../services/analyticsService';
import { ChatMessage, ConversationContext, MenuItem } from '../types';

// Menu Item Card Component
const MenuItemCard: React.FC<{
  item: MenuItem;
  onOrder: () => void;
}> = ({ item, onOrder }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 w-[200px] flex-shrink-0 hover:shadow-lg transition-shadow">
    <div className="h-24 bg-gradient-to-br from-karak-primary/10 to-karak-accent/20 flex items-center justify-center">
      <span className="text-4xl">
        {item.category === 'specials' ? '⭐' :
          item.category === 'sandwiches' ? '🥪' :
            item.category === 'sides' ? '🍟' :
              item.category === 'starters' ? '🥗' : '🍔'}
      </span>
    </div>
    <div className="p-3">
      <div className="flex justify-between items-start mb-1">
        <h4 className="font-bold text-xs text-gray-800 leading-tight">{item.name}</h4>
        <span className="text-karak-accent font-bold text-xs whitespace-nowrap ml-2">{item.price}</span>
      </div>
      <p className="text-[10px] text-gray-500 line-clamp-2 mb-2">{item.description}</p>
      <button
        onClick={onOrder}
        className="w-full bg-karak-primary text-white text-[10px] font-medium py-1.5 rounded-lg hover:bg-karak-accent hover:text-karak-primary transition-all"
      >
        Order Now
      </button>
    </div>
  </div>
);

// Feedback Widget Component
const FeedbackWidget: React.FC<{
  onSubmit: (rating: number, comment?: string) => void;
  onClose: () => void;
}> = ({ onSubmit, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, comment || undefined);
      setSubmitted(true);
      setTimeout(onClose, 1500);
    }
  };

  if (submitted) {
    return (
      <div className="p-4 bg-green-50 border-t border-green-100 text-center">
        <span className="text-green-600 font-medium text-sm">Thanks for your feedback! 🙏</span>
      </div>
    );
  }

  return (
    <div className="p-3 bg-gray-50 border-t border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-gray-600">How was your experience?</span>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className="flex gap-1 mb-2 justify-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`text-2xl transition-transform hover:scale-125 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Any comments? (optional)"
          className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-karak-accent bg-white"
        />
        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          className="px-4 py-2 bg-karak-primary text-white text-xs rounded-lg hover:bg-karak-accent hover:text-karak-primary transition-all disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

// Promotion Banner Component
const PromotionBanner: React.FC<{
  onDismiss: () => void;
  onLearnMore: () => void;
}> = ({ onDismiss, onLearnMore }) => (
  <div className="mx-3 mt-3 p-3 bg-gradient-to-r from-karak-accent/20 to-karak-accent/10 rounded-xl border border-karak-accent/30 relative">
    <button
      onClick={onDismiss}
      className="absolute top-2 right-2 text-karak-primary/40 hover:text-karak-primary"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
    <div className="flex items-start gap-2">
      <span className="text-xl">⭐</span>
      <div className="flex-1 pr-4">
        <h4 className="font-bold text-sm text-karak-primary">{CURRENT_PROMOTION.title}</h4>
        <p className="text-xs text-gray-600 mt-0.5">{CURRENT_PROMOTION.description}</p>
        <button
          onClick={onLearnMore}
          className="mt-2 text-xs font-semibold text-karak-primary hover:text-karak-accent transition-colors"
        >
          Tell me more →
        </button>
      </div>
    </div>
  </div>
);

// Main Component
const HBrothersConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Hey there! 👋 I'm the H Brothers Concierge. Craving a burger or need directions? I'm here to help!",
      timestamp: new Date(),
      suggestedReplies: ["What's on the menu?", "What are your hours?", "Where are you located?"]
    }
  ]);
  const [context, setContext] = useState<ConversationContext>({
    mentionedItems: [],
    preferences: [],
    askedAboutHours: false,
    askedAboutLocation: false,
    messageCount: 0,
    sessionStart: new Date()
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showPromotion, setShowPromotion] = useState(CURRENT_PROMOTION.isActive);
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Start analytics session when chat opens
  useEffect(() => {
    if (isOpen && !hasInteracted) {
      startSession();
    }
  }, [isOpen, hasInteracted]);

  // Handle close with optional feedback
  const handleClose = () => {
    if (hasInteracted && messages.length > 2 && !showFeedback) {
      setShowFeedback(true);
    } else {
      if (hasInteracted) {
        endSession();
      }
      setIsOpen(false);
      setShowFeedback(false);
    }
  };

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    setHasInteracted(true);
    const userMessage = messageText.trim();
    setInput('');

    const newUserMessage: ChatMessage = {
      role: 'user',
      text: userMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    // Track analytics
    trackMessage(userMessage, true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: m.text
      }));

      const response = await getChatResponse(history, userMessage, context);

      // Track menu item views
      response.menuItems.forEach(item => trackMenuItemView(item.id));

      const newModelMessage: ChatMessage = {
        role: 'model',
        text: response.text,
        menuItems: response.menuItems,
        suggestedReplies: response.suggestedReplies,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newModelMessage]);
      setContext(prev => updateContext(prev, userMessage, response.text));
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'model',
        text: "I'm having a bit of trouble right now. Please try again!",
        timestamp: new Date(),
        suggestedReplies: ["Try again", "Call restaurant"]
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    handleSendMessage(input);
  };

  const handleQuickAction = (action: typeof QUICK_ACTIONS[0]) => {
    trackQuickAction(action.id);
    if (action.id === 'order') {
      trackOrderClick();
      window.open(RESTAURANT_INFO.orderUrl, '_blank');
    } else {
      handleSendMessage(action.message);
    }
  };

  const handleOrderClick = () => {
    trackOrderClick();
    window.open(RESTAURANT_INFO.orderUrl, '_blank');
  };

  const handleFeedback = (rating: number, comment?: string) => {
    trackFeedback(rating, comment);
  };

  const handlePromotionLearnMore = () => {
    setShowPromotion(false);
    handleSendMessage("Tell me about the brisket special");
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-32px)] sm:w-[360px] h-[60vh] sm:h-[550px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 origin-bottom-right">
          {/* Header */}
          <div className="bg-karak-primary p-4 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">H Brothers Concierge</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-karak-accent text-[10px] uppercase tracking-wider">Online • Gemini Powered</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white/60 hover:text-white transition-colors p-1"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Promotion Banner */}
          {showPromotion && (
            <PromotionBanner
              onDismiss={() => setShowPromotion(false)}
              onLearnMore={handlePromotionLearnMore}
            />
          )}

          {/* Quick Actions Bar */}
          <div className="px-3 py-2 bg-white border-b border-gray-100 overflow-x-auto shrink-0">
            <div className="flex gap-2">
              {QUICK_ACTIONS.map(action => (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action)}
                  disabled={isLoading}
                  className="flex-none flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-karak-accent/10 hover:border-karak-accent rounded-full border border-gray-200 transition-all text-[11px] font-medium text-gray-600 disabled:opacity-50"
                >
                  <span>{action.icon}</span>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className="space-y-2">
                {/* Message Bubble */}
                <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                      ? 'bg-karak-primary text-white rounded-br-none shadow-md'
                      : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-bl-none'
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>

                {/* Menu Item Cards */}
                {msg.menuItems && msg.menuItems.length > 0 && (
                  <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                    {msg.menuItems.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        onOrder={handleOrderClick}
                      />
                    ))}
                  </div>
                )}

                {/* Suggested Replies (only for the last bot message) */}
                {!isLoading && msg.role === 'model' && idx === messages.length - 1 && msg.suggestedReplies && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {msg.suggestedReplies.map((reply, rIdx) => (
                      <button
                        key={rIdx}
                        onClick={() => handleSendMessage(reply)}
                        className="text-[11px] bg-white border border-karak-accent/30 text-karak-primary px-3 py-1.5 rounded-full hover:bg-karak-accent/10 hover:border-karak-accent transition-all duration-200"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}

                {/* Timestamp */}
                {msg.timestamp && (
                  <div className={`text-[9px] text-gray-400 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 flex gap-1.5">
                  <div className="w-2 h-2 bg-karak-accent rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-karak-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-karak-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Feedback Widget */}
          {showFeedback && (
            <FeedbackWidget
              onSubmit={handleFeedback}
              onClose={() => {
                setShowFeedback(false);
                endSession();
                setIsOpen(false);
              }}
            />
          )}

          {/* Input Area */}
          {!showFeedback && (
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100 shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our food, hours, or specials..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-karak-accent focus:border-transparent focus:bg-white transition-all"
                  aria-label="Message input"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="w-10 h-10 rounded-full bg-karak-accent text-karak-primary flex items-center justify-center hover:bg-karak-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                  aria-label="Send message"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-16 h-16 bg-karak-primary text-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:scale-110 hover:bg-karak-accent hover:text-karak-primary transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-karak-accent/30"
        aria-label={isOpen ? "Close concierge chat" : "Open concierge chat"}
      >
        {/* Notification Badge */}
        {!isOpen && CURRENT_PROMOTION.isActive && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center animate-pulse">
            <span className="text-[10px] text-white font-bold">1</span>
          </div>
        )}

        {/* Pulse Animation when closed */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-karak-accent/40 animate-ping"></div>
        )}

        {isOpen ? (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <span className="text-3xl relative z-10">💬</span>
        )}
      </button>
    </div>
  );
};

export default HBrothersConcierge;
