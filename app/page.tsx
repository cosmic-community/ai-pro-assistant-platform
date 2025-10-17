import { getUsers, getActiveAIModels, getSystemPrompts } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import ModelShowcase from '@/components/ModelShowcase'
import PromptLibrary from '@/components/PromptLibrary'
import Features from '@/components/Features'

export const revalidate = 60

export default async function HomePage() {
  const [users, models, prompts] = await Promise.all([
    getUsers(),
    getActiveAIModels(),
    getSystemPrompts()
  ])
  
  const currentUser = users[0] || null
  
  return (
    <main className="min-h-screen">
      <Hero user={currentUser} />
      <Features />
      <ModelShowcase models={models} />
      <PromptLibrary prompts={prompts} />
    </main>
  )
}