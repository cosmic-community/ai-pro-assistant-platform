import { getUserImageGenerations, getUsers } from '@/lib/cosmic'
import Link from 'next/link'

export const revalidate = 60

export default async function GalleryPage() {
  const users = await getUsers()
  const currentUser = users[0] || null
  
  let images = []
  if (currentUser) {
    images = await getUserImageGenerations(currentUser.id)
  }
  
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
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
            <span className="gradient-text">Image Gallery</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Your AI-generated 4K images with editing capabilities
          </p>
        </div>
        
        {images.length === 0 ? (
          <div className="glassmorphism rounded-2xl p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">No Images Yet</h2>
            <p className="text-muted-foreground mb-6">
              Start creating stunning 4K images with AI
            </p>
            <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all duration-200">
              Generate Image
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div key={image.id} className="glassmorphism rounded-2xl overflow-hidden group hover:scale-105 transition-transform duration-200">
                <div className="relative aspect-square">
                  <img 
                    src={`${image.metadata.generated_image.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                    alt={image.title}
                    className="w-full h-full object-cover"
                    width={400}
                    height={400}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-6">
                    <div className="w-full">
                      <p className="text-sm text-muted-foreground mb-2">
                        {image.metadata.resolution.value}
                      </p>
                      <p className="text-sm line-clamp-2">{image.metadata.prompt}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-1">{image.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {image.metadata.style_preset && (
                      <span className="px-2 py-1 bg-accent/10 text-accent rounded">
                        {image.metadata.style_preset.value}
                      </span>
                    )}
                    <span>{new Date(image.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}