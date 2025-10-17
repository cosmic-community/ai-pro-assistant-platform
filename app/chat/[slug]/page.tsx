// app/chat/[slug]/page.tsx
import { getConversation, getActiveAIModels, getUsers } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import ChatInterface from '@/components/ChatInterface'

export const revalidate = 0

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ChatPage({ params }: PageProps) {
  const { slug } = await params
  
  const [conversation, models, users] = await Promise.all([
    getConversation(slug),
    getActiveAIModels(),
    getUsers()
  ])
  
  if (!conversation) {
    notFound()
  }
  
  const currentUser = users[0] || null
  
  return (
    <main className="min-h-screen bg-background">
      <ChatInterface 
        conversation={conversation} 
        models={models}
        user={currentUser}
      />
    </main>
  )
}