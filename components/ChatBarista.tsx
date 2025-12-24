
import React, { useState, useRef, useEffect } from 'react';
import { getBaristaResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

interface ExtendedChatMessage extends ChatMessage {
  sources?: { title: string; uri: string }[];
}

const SUGGESTIONS = [
  "What's in the Brisket Mac?",
  "Tell me about Poutine",
  "Holiday hours?"
];

const ChatBarista: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ExtendedChatMessage[]>([
    { role: 'model', text: "Hey! Ready for some comfort food? Ask me about our 12-hour brisket!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input.trim();
    if (!textToSend || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setIsLoading(true);

    const response = await getBaristaResponse(textToSend);
    setMessages(prev => [...prev, { 
      role: 'model', 
      text: response.text,
      sources: response.sources
    }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60]">
      {/* Trigger Button - Scaled for Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 md:w-16 md:h-16 bg-karak-accent text-white rounded-full shadow-[0_10px_40px_-10px_rgba(192,64,0,0.5)] flex items-center justify-center hover:scale-105 transition-all active:scale-95 border-2 border-white"
      >
        {isOpen ? (
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-white border-2 border-karak-accent rounded-full animate-pulse"></span>
          </div>
        )}
      </button>

      {/* Chat Window - Responsive Width and Height */}
      {isOpen && (
        <div className="absolute bottom-16 md:bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-[380px] h-[500px] md:h-[550px] max-h-[70vh] md:max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-5 duration-300">
          {/* Header - Optimized Padding */}
          <div className="bg-karak-primary p-4 md:p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-karak-accent flex items-center justify-center text-white font-black shadow-inner text-xs md:text-sm">
                HB
              </div>
              <div>
                <h4 className="text-white font-bold text-xs md:text-sm tracking-wide leading-none">Concierge</h4>
                <span className="text-karak-secondary text-[7px] md:text-[8px] uppercase tracking-[0.2em] flex items-center gap-1 font-bold">
                  Flash Engine Active
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Messages - Responsive Spacing */}
          <div className="flex-grow overflow-y-auto p-4 md:p-5 space-y-3 md:space-y-4 bg-[#FDF8F3]/30">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-1 duration-200`}>
                <div className={`max-w-[90%] md:max-w-[85%] p-3 md:p-4 rounded-2xl text-xs md:text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-karak-primary text-white font-medium rounded-tr-none' 
                    : 'bg-white text-karak-text border border-gray-100 rounded-tl-none'
                }`}>
                  {msg.text}
                  
                  {/* Web Sources */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-100 space-y-1">
                      <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-gray-400 font-bold">Sources:</p>
                      {msg.sources.map((source, sIdx) => (
                        <a 
                          key={sIdx} 
                          href={source.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block text-[9px] md:text-[10px] text-karak-accent hover:underline truncate"
                        >
                          {source.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-3 py-2 md:px-4 md:py-3 rounded-2xl text-gray-400 text-[10px] md:text-xs italic shadow-sm flex items-center gap-2 border border-gray-100 rounded-tl-none">
                  <span className="flex gap-1">
                    <span className="w-1 h-1 bg-karak-accent/40 rounded-full animate-bounce"></span>
                    <span className="w-1 h-1 bg-karak-accent/40 rounded-full animate-bounce [animation-delay:0.1s]"></span>
                    <span className="w-1 h-1 bg-karak-accent/40 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  </span>
                  Prepping...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Chips - Scaled for Mobile */}
          <div className="px-4 md:px-5 pb-3 md:pb-4 bg-[#FDF8F3]/30 flex flex-wrap gap-1.5 md:gap-2">
            {messages.length === 1 && SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest bg-white border border-gray-200 px-2.5 py-1.5 md:px-3 md:py-2 rounded-full hover:border-karak-accent hover:text-karak-accent transition-all active:scale-95 shadow-xs whitespace-nowrap"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input Area - Optimized for Touch */}
          <div className="p-4 md:p-5 border-t border-gray-100 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-grow border-none bg-gray-50 rounded-xl px-4 py-2.5 md:py-3 text-xs md:text-sm focus:ring-1 focus:ring-karak-accent transition-all outline-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading}
                className="bg-karak-primary text-white p-2.5 md:p-3 rounded-xl hover:bg-karak-accent transition-all active:scale-90 shadow-md disabled:opacity-50"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBarista;
