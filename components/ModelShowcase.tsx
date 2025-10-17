import { AIModel } from '@/types'

interface ModelShowcaseProps {
  models: AIModel[]
}

export default function ModelShowcase({ models }: ModelShowcaseProps) {
  if (!models || models.length === 0) {
    return null
  }
  
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">AI Models</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powered by cutting-edge language models with advanced capabilities
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((model) => (
            <div 
              key={model.id}
              className="glassmorphism rounded-2xl p-8"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{model.metadata.model_name}</h3>
                  <p className="text-sm text-muted-foreground">{model.metadata.version}</p>
                </div>
                {model.metadata.is_active && (
                  <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full">
                    Active
                  </span>
                )}
              </div>
              
              <p className="text-muted-foreground mb-6 text-sm">
                {model.metadata.description}
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Context Window</span>
                  <span className="font-semibold">{model.metadata.context_window.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Max Output</span>
                  <span className="font-semibold">{model.metadata.max_output_tokens.toLocaleString()} tokens</span>
                </div>
                {model.metadata.cost_per_1k && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cost per 1K</span>
                    <span className="font-semibold">${model.metadata.cost_per_1k}</span>
                  </div>
                )}
              </div>
              
              {model.metadata.capabilities && model.metadata.capabilities.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Capabilities:</p>
                  <div className="flex flex-wrap gap-2">
                    {model.metadata.capabilities.map((capability, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 bg-accent/10 text-accent text-xs rounded"
                      >
                        {capability}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}