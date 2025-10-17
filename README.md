# AI Pro Assistant Platform

![App Preview](https://imgix.cosmicjs.com/0bdada50-ab79-11f0-936e-dbe343b25d95-photo-1633356122544-f134324a6cee-1760719681336.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A powerful conversational AI platform with integrated 4K image generation capabilities. Features advanced chat functionality, customizable system prompts, conversation management, and professional image creation tools.

## ✨ Features

- **Advanced AI Chat Interface** - Seamless conversations with GPT-4 Advanced and context retention
- **4K Image Generation** - Create professional-quality images with multiple resolution and style options
- **System Prompt Library** - Pre-configured prompts for education, creative, professional, and technical use cases
- **Conversation Management** - Save, archive, and resume conversations with full message history
- **Multi-Model Support** - Switch between different AI models based on task requirements
- **Token Usage Tracking** - Real-time monitoring of API usage with subscription tier management
- **User Preferences** - Customizable themes, tones, and default settings
- **Image Edit History** - Track and revert image modifications with full parameter logging
- **Subscription Tiers** - Free, Pro, and Enterprise plans with different limits and capabilities

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68f2724ee853a8bd6fe5c95c&clone_repository=68f27487d9ace178f8c06b7c)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create an advanced conversational AI assistant similar to ChatGPT Pro — intelligent, creative, and context-aware. It should understand complex instructions, generate detailed and accurate responses, maintain natural dialogue flow, and adapt its tone for education, productivity, and creative tasks. Output should be precise, human-like, and professional. And also can image generate like chatgpt in 4k resolution with editable option"

### Code Generation Prompt

> Based on the content model I created for ""Create an advanced conversational AI assistant similar to ChatGPT Pro — intelligent, creative, and context-aware. It should understand complex instructions, generate detailed and accurate responses, maintain natural dialogue flow, and adapt its tone for education, productivity, and creative tasks. Output should be precise, human-like, and professional. And also can image generate like chatgpt in 4k resolution with editable option"", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **Framer Motion** - Smooth animations and transitions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Conversations

```typescript
import { cosmic } from '@/lib/cosmic'

async function getConversations(userId: string) {
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
    if (error.status === 404) {
      return []
    }
    throw error
  }
}
```

### Creating a New Conversation

```typescript
async function createConversation(data: {
  userId: string
  modelId: string
  title: string
  message: string
}) {
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
}
```

### Generating Images

```typescript
async function createImageGeneration(data: {
  userId: string
  prompt: string
  imageUrl: string
  resolution: string
  stylePreset: string
}) {
  const response = await cosmic.objects.insertOne({
    type: 'image-generations',
    title: data.prompt.substring(0, 50),
    metadata: {
      user: data.userId,
      prompt: data.prompt,
      generated_image: imageUrl, // Media name from bucket
      resolution: data.resolution,
      style_preset: data.stylePreset,
      generation_params: {
        model: 'dall-e-3',
        quality: 'hd'
      },
      is_public: false
    }
  })
  
  return response.object
}
```

## 🔗 Cosmic CMS Integration

This application uses Cosmic CMS to manage all content with five interconnected object types:

### Object Types

1. **Users** - User profiles with subscription tiers and usage limits
2. **Conversations** - Chat history with messages and model tracking
3. **AI Models** - Available AI models with capabilities and pricing
4. **System Prompts** - Pre-configured conversation templates
5. **Image Generations** - Generated images with edit history

All content is fetched dynamically from your Cosmic bucket and displayed in real-time. The application uses depth parameter to include related objects (users, models) in conversation queries.

## 🌐 Deployment Options

### Deploy to Vercel

The easiest way to deploy this Next.js application:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the deploy button above
2. Connect your GitHub repository
3. Add your environment variables (COSMIC_BUCKET_SLUG, COSMIC_READ_KEY, COSMIC_WRITE_KEY)
4. Deploy!

### Deploy to Netlify

Alternatively, deploy to Netlify:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Click the deploy button
2. Connect your repository
3. Add environment variables in Netlify dashboard
4. Deploy!

### Environment Variables Setup

For production deployment, ensure you set these environment variables in your hosting platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key
- `COSMIC_WRITE_KEY` - Your Cosmic write key

Remember to never commit `.env` files to version control!

<!-- README_END -->