import { getActiveAIModels, getSystemPrompts, getUsers } from '@/lib/cosmic'
import Link from 'next/link'

export const revalidate = 60

export default async function NewChatPage() {
  const [models, prompts, users] = await Promise.all([
    getActiveAIModels(),
    getSystemPrompts(),
    getUsers()
  ])
  
  const currentUser = users[0] || null
  
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Start New Conversation</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose a system prompt and begin your AI-powered conversation
          </p>
        </div>
        
        <div className="space-y-8">
          {/* Model Selection */}
          <div className="glassmorphism rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Select AI Model</h2>
            <div className="grid gap-4">
              {models.map((model) => (
                <label 
                  key={model.id}
                  className="flex items-start gap-4 p-4 rounded-xl border-2 border-border/50 hover:border-primary/50 cursor-pointer transition-colors"
                >
                  <input 
                    type="radio" 
                    name="model" 
                    value={model.id}
                    className="mt-1"
                    defaultChecked={model.id === models[0]?.id}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{model.metadata.model_name}</h3>
                      <span className="text-xs text-muted-foreground">{model.metadata.version}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {model.metadata.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {model.metadata.capabilities.slice(0, 3).map((cap, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-accent/10 text-accent text-xs rounded"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          {/* System Prompt Selection */}
          <div className="glassmorphism rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Choose System Prompt</h2>
            <div className="grid gap-4">
              {prompts.map((prompt) => (
                <label 
                  key={prompt.id}
                  className="flex items-start gap-4 p-4 rounded-xl border-2 border-border/50 hover:border-primary/50 cursor-pointer transition-colors"
                >
                  <input 
                    type="radio" 
                    name="prompt" 
                    value={prompt.id}
                    className="mt-1"
                    defaultChecked={prompt.metadata.is_default}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{prompt.metadata.name}</h3>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                        {prompt.metadata.category.value}
                      </span>
                    </div>
                    <div 
                      className="text-sm text-muted-foreground prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: prompt.metadata.prompt_text }}
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          {/* Start Button */}
          <button className="w-full px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold transition-all duration-200 hover:scale-105">
            Start Conversation
          </button>
        </div>
      </div>
    </main>
  )
}