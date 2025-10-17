// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

// User interface with proper metadata typing
export interface User extends CosmicObject {
  type: 'users'
  metadata: {
    full_name: string
    email: string
    avatar?: {
      url: string
      imgix_url: string
    }
    subscription_tier: {
      key: 'free' | 'pro' | 'enterprise'
      value: string
    }
    monthly_token_limit?: number
    tokens_used?: number
    image_limit?: number
    images_generated?: number
    preferences?: {
      default_model?: string
      theme?: string
      language?: string
      default_tone?: string
      enable_web_search?: boolean
      enable_code_execution?: boolean
    }
  }
}

// AI Model interface
export interface AIModel extends CosmicObject {
  type: 'ai-models'
  metadata: {
    model_name: string
    version: string
    capabilities: string[]
    context_window: number
    max_output_tokens: number
    cost_per_1k?: number
    is_active: boolean
    description?: string
  }
}

// System Prompt interface
export interface SystemPrompt extends CosmicObject {
  type: 'system-prompts'
  metadata: {
    name: string
    category: {
      key: 'education' | 'creative' | 'professional' | 'technical' | 'general'
      value: string
    }
    prompt_text: string
    temperature?: number
    max_tokens?: number
    tone?: {
      key: 'professional' | 'casual' | 'academic' | 'creative' | 'technical'
      value: string
    }
    is_default?: boolean
  }
}

// Conversation message interface
export interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

// Conversation interface
export interface Conversation extends CosmicObject {
  type: 'conversations'
  metadata: {
    user: User
    title: string
    messages: ConversationMessage[]
    model_used: AIModel
    context_window?: {
      total_messages: number
      context_tokens: number
      max_context: number
    }
    total_tokens?: number
    status: {
      key: 'active' | 'archived' | 'deleted'
      value: string
    }
    last_activity?: string
  }
}

// Image Generation interface
export interface ImageGeneration extends CosmicObject {
  type: 'image-generations'
  metadata: {
    user: User
    prompt: string
    generated_image: {
      url: string
      imgix_url: string
    }
    resolution: {
      key: '1024' | '2048' | '4096'
      value: string
    }
    style_preset?: {
      key: 'natural' | 'vivid' | 'artistic' | 'photorealistic'
      value: string
    }
    edit_history?: Array<{
      edit_type: string
      parameters?: Record<string, any>
      timestamp: string
    }>
    generation_params?: {
      model?: string
      quality?: string
      steps?: number
      guidance_scale?: number
      seed?: number
    }
    is_public?: boolean
  }
}

// API Response types
export interface CosmicResponse<T> {
  objects: T[]
  total: number
}

// Type guards
export function isUser(obj: CosmicObject): obj is User {
  return obj.type === 'users'
}

export function isConversation(obj: CosmicObject): obj is Conversation {
  return obj.type === 'conversations'
}

export function isAIModel(obj: CosmicObject): obj is AIModel {
  return obj.type === 'ai-models'
}

export function isSystemPrompt(obj: CosmicObject): obj is SystemPrompt {
  return obj.type === 'system-prompts'
}

export function isImageGeneration(obj: CosmicObject): obj is ImageGeneration {
  return obj.type === 'image-generations'
}