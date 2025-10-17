import { SystemPrompt } from '@/types'

interface PromptLibraryProps {
  prompts: SystemPrompt[]
}

export default function PromptLibrary({ prompts }: PromptLibraryProps) {
  if (!prompts || prompts.length === 0) {
    return null
  }
  
  const categoryColors: Record<string, string> = {
    education: 'bg-blue-500/10 text-blue-500',
    creative: 'bg-purple-500/10 text-purple-500',
    professional: 'bg-green-500/10 text-green-500',
    technical: 'bg-orange-500/10 text-orange-500',
    general: 'bg-gray-500/10 text-gray-500'
  }
  
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">System Prompts</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pre-configured conversation templates optimized for different use cases
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {prompts.map((prompt) => (
            <div 
              key={prompt.id}
              className="glassmorphism rounded-2xl p-8 hover:scale-102 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{prompt.metadata.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[prompt.metadata.category.key] || categoryColors.general}`}>
                    {prompt.metadata.category.value}
                  </span>
                </div>
                {prompt.metadata.is_default && (
                  <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full">
                    Default
                  </span>
                )}
              </div>
              
              <div 
                className="text-sm text-muted-foreground prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: prompt.metadata.prompt_text }}
              />
              
              <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                {prompt.metadata.temperature !== undefined && (
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>Temp: {prompt.metadata.temperature}</span>
                  </div>
                )}
                {prompt.metadata.max_tokens && (
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                    <span>Max: {prompt.metadata.max_tokens} tokens</span>
                  </div>
                )}
                {prompt.metadata.tone && (
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    <span>{prompt.metadata.tone.value}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}