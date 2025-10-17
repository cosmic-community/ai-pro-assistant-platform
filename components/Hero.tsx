import Link from 'next/link'
import { User } from '@/types'

interface HeroProps {
  user: User | null
}

export default function Hero({ user }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphism mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm text-muted-foreground">Powered by GPT-4 Advanced</span>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="gradient-text">AI Pro Assistant</span>
          <br />
          <span className="text-foreground">Platform</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Advanced conversational AI with intelligent responses, context awareness, 
          and professional 4K image generation capabilities
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/chat/new"
            className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all duration-200 hover:scale-105 inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Start Conversation
          </Link>
          
          <Link
            href="/gallery"
            className="px-8 py-4 glassmorphism hover:bg-secondary text-foreground rounded-lg font-semibold transition-all duration-200 hover:scale-105 inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Generate Images
          </Link>
        </div>
        
        {user && (
          <div className="mt-12 glassmorphism rounded-2xl p-6 max-w-md mx-auto">
            <div className="flex items-center gap-4">
              {user.metadata.avatar && (
                <img 
                  src={`${user.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={user.metadata.full_name}
                  className="w-12 h-12 rounded-full"
                  width={48}
                  height={48}
                />
              )}
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Welcome back,</p>
                <p className="font-semibold">{user.metadata.full_name}</p>
                <p className="text-xs text-primary">{user.metadata.subscription_tier.value} Plan</p>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Tokens Used</p>
                <p className="font-semibold">
                  {user.metadata.tokens_used?.toLocaleString() || 0} / {user.metadata.monthly_token_limit?.toLocaleString() || 0}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Images Generated</p>
                <p className="font-semibold">
                  {user.metadata.images_generated || 0} / {user.metadata.image_limit || 0}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}