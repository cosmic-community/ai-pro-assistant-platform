import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Fetch all users
export async function getUsers() {
  try {
    const response = await cosmic.objects
      .find({ type: 'users' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch users')
  }
}

// Fetch single user
export async function getUser(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'users', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch user')
  }
}

// Fetch conversations for a user
export async function getUserConversations(userId: string) {
  try {
    const response = await cosmic.objects
      .find({
        type: 'conversations',
        'metadata.user': userId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch conversations')
  }
}

// Fetch single conversation
export async function getConversation(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'conversations', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch conversation')
  }
}

// Fetch all AI models
export async function getAIModels() {
  try {
    const response = await cosmic.objects
      .find({ type: 'ai-models' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch AI models')
  }
}

// Fetch active AI models
export async function getActiveAIModels() {
  try {
    const response = await cosmic.objects
      .find({
        type: 'ai-models',
        'metadata.is_active': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch active AI models')
  }
}

// Fetch all system prompts
export async function getSystemPrompts() {
  try {
    const response = await cosmic.objects
      .find({ type: 'system-prompts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch system prompts')
  }
}

// Fetch system prompts by category
export async function getSystemPromptsByCategory(category: string) {
  try {
    const response = await cosmic.objects
      .find({
        type: 'system-prompts',
        'metadata.category.key': category
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch system prompts by category')
  }
}

// Fetch user's image generations
export async function getUserImageGenerations(userId: string) {
  try {
    const response = await cosmic.objects
      .find({
        type: 'image-generations',
        'metadata.user': userId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch image generations')
  }
}

// Create new conversation
export async function createConversation(data: {
  userId: string
  modelId: string
  title: string
  message: string
}) {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'conversations',
      title: data.title,
      metadata: {
        user: data.userId,
        title: data.title,
        messages: [
          {
            role: 'user',
            content: data.message,
            timestamp: new Date().toISOString()
          }
        ],
        model_used: data.modelId,
        total_tokens: 0,
        status: 'active',
        last_activity: new Date().toISOString()
      }
    })
    
    return response.object
  } catch (error) {
    throw new Error('Failed to create conversation')
  }
}

// Update conversation with new message
export async function updateConversation(
  conversationId: string,
  newMessage: { role: 'user' | 'assistant'; content: string }
) {
  try {
    const conversation = await cosmic.objects
      .findOne({ type: 'conversations', id: conversationId })
      .depth(1)
    
    const currentMessages = conversation.object.metadata.messages || []
    
    const response = await cosmic.objects.updateOne(conversationId, {
      metadata: {
        messages: [
          ...currentMessages,
          {
            ...newMessage,
            timestamp: new Date().toISOString()
          }
        ],
        last_activity: new Date().toISOString()
      }
    })
    
    return response.object
  } catch (error) {
    throw new Error('Failed to update conversation')
  }
}