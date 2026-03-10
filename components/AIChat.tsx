'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIChat() {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI pharmacist assistant. How can I help you today? You can ask me about medications, dosages, side effects, or any pharmacy-related questions.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I understand your question. Based on my knowledge, I can help you with that. Please note that this is AI-generated advice and you should always consult with a licensed healthcare professional for medical decisions.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={`rounded-xl transition-theme flex flex-col h-[600px] ${
        theme === 'dark'
          ? 'bg-card-dark card-glow-dark border border-gray-700'
          : 'bg-white shadow-card-light'
      }`}
    >
      {/* Header */}
      <div
        className={`px-6 py-4 border-b ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary-green flex items-center justify-center">
            <Bot className="text-white" size={24} />
          </div>
          <div>
            <h3
              className={`font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-text-dark'
              }`}
            >
              AI Pharmacist
            </h3>
            <p
              className={`text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Online • Ready to help
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user'
                  ? 'bg-primary-green'
                  : theme === 'dark'
                  ? 'bg-gray-700'
                  : 'bg-gray-200'
              }`}
            >
              {message.role === 'user' ? (
                <User className="text-white" size={18} />
              ) : (
                <Bot
                  className={theme === 'dark' ? 'text-white' : 'text-gray-600'}
                  size={18}
                />
              )}
            </div>
            <div
              className={`flex-1 max-w-[80%] ${
                message.role === 'user' ? 'items-end' : ''
              }`}
            >
              <div
                className={`rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-primary-green text-white'
                    : theme === 'dark'
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-text-dark'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              <p
                className={`text-xs mt-1 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                } ${message.role === 'user' ? 'text-right' : ''}`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-start space-x-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
              }`}
            >
              <Bot
                className={theme === 'dark' ? 'text-white' : 'text-gray-600'}
                size={18}
              />
            </div>
            <div
              className={`rounded-lg p-4 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
              }`}
            >
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: '0.4s' }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        className={`px-6 py-4 border-t ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}
      >
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className={`flex-1 px-4 py-2 rounded-lg border transition-theme ${
              theme === 'dark'
                ? 'bg-background-dark border-gray-700 text-white placeholder-gray-500'
                : 'bg-gray-50 border-gray-300 text-text-dark placeholder-gray-400'
            } focus:outline-none focus:ring-2 focus:ring-primary-green`}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2 bg-primary-green text-white rounded-lg hover:bg-accent-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
