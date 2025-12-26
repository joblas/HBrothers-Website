import React, { useState, useRef, useEffect } from 'react';
import {
  getChatResponse,
  updateContext,
  RESTAURANT_INFO
} from '../services/geminiService';
import {
  startSession,
  trackMessage,
  trackMenuItemView,
  trackOrderClick,
  endSession
} from '../services/analyticsService';
import { ChatMessage, ConversationContext, MenuItem } from '../types';

// --- Components ---

// Simplified Menu Item Card
const MenuItemCard: React.FC<{
  item: MenuItem;
  onOrder: () => void;
}> = ({ item, onOrder }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-w-[200px] w-[200px] flex-shrink-0 overflow-hidden hover:shadow-md transition-all duration-300 group">
    <div className="h-20 bg-gradient-to-br from-karak-primary/5 to-karak-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
      <span className="text-3xl filter drop-shadow-sm">
        {item.category === 'specials' ? '⭐' :
          item.category === 'sandwiches' ? '🥪' :
            item.category === 'sides' ? '🍟' :
              item.category === 'starters' ? '🥗' : '🍔'}
      </span>
    </div>
    <div className="p-3">
      <div className="flex justify-between items-start mb-1">
        <h4 className="font-bold text-xs text-gray-800 leading-tight">{item.name}</h4>
        <span className="text-karak-primary font-bold text-xs whitespace-nowrap ml-2">{item.price}</span>
      </div>
      <p className="text-[10px] text-gray-500 line-clamp-2 mb-2 leading-relaxed">{item.description}</p>
      <button
        onClick={onOrder}
        className="w-full bg-white text-karak-primary border border-karak-primary text-[10px] font-bold py-1.5 rounded-lg hover:bg-karak-primary hover:text-white transition-all uppercase tracking-wide"
      >
        Order Now
      </button>
    </div>
  </div>
);

// Message Bubble
const MessageBubble: React.FC<{
  message: ChatMessage;
  isLast: boolean;
}> = ({ message, isLast }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div
        className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed shadow-sm relative group
          ${isUser
            ? 'bg-karak-primary text-white rounded-2xl rounded-tr-sm'
            : 'bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-tl-sm'
          }`}
      >
        {message.text}
      </div>

      {/* Timestamp */}
      {message.timestamp && isLast && (
        <span className="text-[10px] text-gray-400 mt-1 px-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      )}
    </div>
  );
};

// --- Main Component ---

const HBrothersConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Hi! 👋 Welcome to H Brothers. How can I help you today?",
      timestamp: new Date(),
      suggestedReplies: ["See the menu", "Check hours", "Order food"]
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
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  // Start analytics session when chat opens
  useEffect(() => {
    if (isOpen && !hasInteracted) {
      startSession();
    }
  }, [isOpen, hasInteracted]);

  const handleClose = () => {
    if (hasInteracted) endSession();
    setIsOpen(false);
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

    trackMessage(userMessage, true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: m.text
      }));

      const response = await getChatResponse(history, userMessage, context);

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
        text: "I'm having a bit of trouble connecting. You can always call us directly!",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    handleSendMessage(input);
  };

  const handleOrderClick = () => {
    trackOrderClick();
    window.open(RESTAURANT_INFO.orderUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-40px)] sm:w-[380px] h-[600px] max-h-[80vh] bg-[#f9fafb] rounded-[24px] shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 origin-bottom-right">

          {/* Header */}
          <div className="bg-karak-primary px-6 py-4 flex justify-between items-center shrink-0 shadow-sm relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

            <div className="flex items-center gap-3 relative z-10">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <span className="text-xl">🤖</span>
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-karak-primary rounded-full"></div>
              </div>
              <div className="flex flex-col">
                <h3 className="text-white font-bold text-base tracking-wide">Concierge</h3>
                <span className="text-karak-accent text-[10px] font-medium uppercase tracking-wider">H Brothers</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all relative z-10"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-2 scroll-smooth">
            {messages.map((msg, idx) => (
              <div key={idx}>
                <MessageBubble message={msg} isLast={idx === messages.length - 1} />

                {/* Menu Items Carousel */}
                {msg.menuItems && msg.menuItems.length > 0 && (
                  <div className="flex gap-3 overflow-x-auto pb-4 pt-1 px-1 -mx-1 mb-2 scrollbar-hide">
                    {msg.menuItems.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        onOrder={handleOrderClick}
                      />
                    ))}
                  </div>
                )}

                {/* Suggested Replies (only for last message) */}
                {!isLoading && msg.role === 'model' && idx === messages.length - 1 && msg.suggestedReplies && (
                  <div className="flex flex-wrap gap-2 mt-1 mb-2">
                    {msg.suggestedReplies.map((reply, rIdx) => (
                      <button
                        key={rIdx}
                        onClick={() => handleSendMessage(reply)}
                        className="text-xs bg-white text-karak-primary border border-karak-primary/20 hover:border-karak-primary hover:bg-karak-primary/5 px-4 py-2 rounded-full transition-all duration-200 font-medium shadow-sm"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-karak-primary/60 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-karak-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1.5 h-1.5 bg-karak-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100 shrink-0">
            <form onSubmit={handleSubmit} className="flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-gray-50 text-gray-800 placeholder-gray-400 border-0 rounded-full px-5 py-3 text-sm focus:ring-2 focus:ring-karak-primary/20 focus:bg-white transition-all outline-none"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-11 h-11 rounded-full bg-karak-primary text-white flex items-center justify-center hover:bg-karak-primary/90 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 shadow-md"
              >
                <svg className="w-5 h-5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
            <div className="text-center mt-2 hidden sm:block">
              <span className="text-[9px] text-gray-300 font-medium tracking-wide">POWERED BY GEMINI</span>
            </div>
          </div>
        </div>
      )}

      {/* Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none z-50
          ${isOpen ? 'bg-white text-gray-800 rotate-90' : 'bg-karak-primary text-white hover:scale-110'}`}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <div className="relative">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </button>
    </div>
  );
};

export default HBrothersConcierge;
