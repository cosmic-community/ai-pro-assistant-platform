'use client'

import { useState } from 'react'
import { Conversation, AIModel, User } from '@/types'
import Link from 'next/link'

interface ChatInterfaceProps {
  conversation: Conversation
  models: AIModel[]
  user: User | null
}

export default function ChatInterface({ conversation, models, user }: ChatInterfaceProps) {
  const [messages, setMessages] = useState(conversation.metadata.messages || [])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return
    
    setIsLoading(true)
    
    // Add user message to local state
    const userMessage = {
      role: 'user' as const,
      content: inputValue,
      timestamp: new Date().toISOString()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    
    // Simulate AI response (in production, this would call your AI API)
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant' as const,
        content: 'This is a demo response. In production, this would connect to your AI service API to generate intelligent responses based on the selected model and system prompt.',
        timestamp: new Date().toISOString()
      }
      
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }
  
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="glassmorphism border-b border-border/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-bold gradient-text">
              AI Pro
            </Link>
            <div className="hidden md:block">
              <h1 className="text-lg font-semibold">{conversation.title}</h1>
              <p className="text-sm text-muted-foreground">
                {conversation.metadata.model_used.metadata.model_name}
              </p>
            </div>
          </div>
          
          {user && (
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium">{user.metadata.full_name}</p>
                <p className="text-xs text-muted-foreground">
                  {user.metadata.tokens_used?.toLocaleString() || 0} / {user.metadata.monthly_token_limit?.toLocaleString() || 0} tokens
                </p>
              </div>
              {user.metadata.avatar && (
                <img 
                  src={`${user.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={user.metadata.full_name}
                  className="w-10 h-10 rounded-full"
                  width={40}
                  height={40}
                />
              )}
            </div>
          )}
        </div>
      </header>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`glassmorphism rounded-2xl p-6 ${
                  message.role === 'user' 
                    ? 'bg-primary/10 border-primary/20' 
                    : 'bg-secondary/50'
                }`}>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-foreground whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              
              <div className={`${message.role === 'user' ? 'order-1' : 'order-2'}`}>
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  {message.role === 'user' ? (
                    user?.metadata.avatar ? (
                      <img 
                        src={`${user.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                        alt="User"
                        className="w-10 h-10 rounded-full"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )
                  ) : (
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="order-1">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <div className="glassmorphism rounded-2xl p-6 bg-secondary/50 order-2">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Input */}
      <div className="glassmorphism border-t border-border/50 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 bg-secondary/50 border border-border/50 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="px-8 py-4 bg-primary hover:bg-primary/90 disabled:bg-secondary disabled:text-muted-foreground text-primary-foreground rounded-xl font-semibold transition-all duration-200 hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}