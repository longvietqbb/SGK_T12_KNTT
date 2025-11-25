import React, { useState, useRef, useEffect } from 'react';
import { ChatSession } from "@google/genai";
import { createChatSession, sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init', role: 'model', text: 'Xin chào! Mình là trợ lý AI Toán 12. Bạn cần giúp đỡ về phần nào trong sách Kết nối tri thức?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat session on mount
  useEffect(() => {
    const initChat = async () => {
      try {
        const session = await createChatSession();
        setChatSession(session);
      } catch (error) {
        console.error("Failed to initialize chat:", error);
      }
    };
    initChat();
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Trigger MathJax typesetting whenever messages change or chat opens
  useEffect(() => {
    if ((window as any).MathJax && isOpen) {
      // Use setTimeout to ensure DOM is fully updated with new text before MathJax processes it
      setTimeout(() => {
        (window as any).MathJax.typesetPromise && (window as any).MathJax.typesetPromise();
      }, 100);
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || !chatSession) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(chatSession, userMsg.text);
      const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: 'Có lỗi xảy ra khi kết nối với AI. Vui lòng thử lại.', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div 
        className={`bg-white w-full sm:w-[400px] h-[500px] rounded-2xl shadow-2xl border border-slate-200 flex flex-col transition-all duration-300 transform origin-bottom-right pointer-events-auto ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none hidden'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-4 rounded-t-2xl flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-1.5 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-sm">Trợ lý học tập</h3>
              <p className="text-teal-100 text-xs">Powered by Gemini</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm shadow-sm whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-teal-600 text-white rounded-br-none' 
                    : msg.isError 
                      ? 'bg-red-100 text-red-700 rounded-bl-none border border-red-200'
                      : 'bg-white text-slate-700 rounded-bl-none border border-slate-100 leading-relaxed'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm border border-slate-100">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-slate-100 rounded-b-2xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Hỏi bài tập, ví dụ $x^2 + 1 = 0$..."
              disabled={isLoading}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white rounded-xl p-2 transition-colors flex-shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`mt-4 pointer-events-auto bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${isOpen ? 'rotate-90 opacity-0 h-0 w-0 p-0 overflow-hidden' : 'opacity-100 h-14 w-14'}`}
      >
        <span className="text-2xl">✨</span>
      </button>
    </div>
  );
};

export default ChatBot;