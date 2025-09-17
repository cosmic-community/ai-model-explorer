# AI Model Explorer

![App Preview](https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=300&fit=crop&auto=format)

A comprehensive web platform for exploring and comparing AI models from various providers. Built with Next.js 15, TypeScript, and Cosmic CMS integration.

## ✨ Features

- **Model Discovery**: Browse and search through AI models with advanced filtering
- **Detailed Specifications**: View comprehensive model information including architecture, pricing, and parameters
- **Provider Profiles**: Explore AI companies and their model offerings  
- **Responsive Design**: Optimized for all devices with modern UI components
- **Performance Optimized**: Fast loading with Next.js 15 and server-side rendering
- **Type-Safe**: Full TypeScript implementation with strict type checking

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68cb1e25fe0840663f64ff6a&clone_repository=68cb2b25fe0840663f64ffb7)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Ti mostro tutte le proprietà dei modelli OpenRouter in formato JSON. Basandomi sul codice esistente, ecco la struttura completa di un modello:


{
  "id": "openai/gpt-4",
  "canonical_slug": "openai--gpt-4",
  "hugging_face_id": "openai/gpt-4",
  "name": "GPT-4",
  "created": 1678886400,
  "description": "GPT-4 is a large multimodal model that can solve difficult problems with greater accuracy than previous models.",
  "context_length": 8192,
  "architecture": {
    "modality": "text->text",
    "input_modalities": ["text", "image"],
    "output_modalities": ["text"],
    "tokenizer": "cl100k_base",
    "instruct_type": "chat"
  },
  "pricing": {
    "prompt": "0.00003",
    "completion": "0.00006",
    "request": "0",
    "image": "0.00765",
    "web_search": "0.001",
    "internal_reasoning": "0.00012",
    "input_cache_read": "0.000015",
    "input_cache_write": "0.0000375"
  },
  "top_provider": {
    "context_length": 8192,
    "max_completion_tokens": 4096,
    "is_moderated": true
  },
  "per_request_limits": {
    "prompt_tokens": 8192,
    "completion_tokens": 4096
  },
  "supported_parameters": [
    "temperature",
    "top_p",
    "top_k",
    "frequency_penalty",
    "presence_penalty",
    "repetition_penalty",
    "min_p",
    "top_a",
    "seed",
    "max_tokens",
    "logit_bias",
    "logprobs",
    "top_logprobs",
    "response_format",
    "tools",
    "tool_choice",
    "stop"
  ]
}
Spiegazione delle proprietà principali:

id: Identificatore unico del modello (formato: provider/nome-modello)
name: Nome leggibile del modello
description: Descrizione delle capacità del modello
context_length: Lunghezza massima del contesto in token
architecture: Informazioni sull'architettura
input_modalities: Tipi di input supportati (text, image, file, etc.)
output_modalities: Tipi di output supportati
modality: Formato generale (es. "text->text", "text+image->text")
pricing: Costi per diversi tipi di utilizzo
prompt: Costo per token di input
completion: Costo per token di output
image: Costo per elaborazione immagini
supported_parameters: Parametri API supportati (temperature, tools, etc.)
created: Timestamp di creazione del modello
hugging_face_id: ID su Hugging Face (se disponibile)
Per ottenere l'icona del provider, l'applicazione usa la funzione getProviderIconUrl() che genera URL come:
https://unpkg.com/@lobehub/icons-static-svg@latest/icons/openai.svg

Tutti questi dati vengono recuperati dall'API di OpenRouter all'endpoint: https://openrouter.ai/api/v1/models"

### Code Generation Prompt

> Based on the content model I created for "Ti mostro tutte le proprietà dei modelli OpenRouter in formato JSON. Basandomi sul codice esistente, ecco la struttura completa di un modello:" now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🚀 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling framework
- **Cosmic CMS** - Headless content management
- **Bun** - Fast package manager and runtime

## 🏁 Getting Started

### Prerequisites

- Bun installed on your system
- A Cosmic CMS account and bucket

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun run dev
   ```

## 📡 Cosmic SDK Examples

### Fetching AI Models

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all AI models with provider information
export async function getAiModels(): Promise<AiModel[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'ai-models' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as AiModel[]
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}
```

### Fetching Providers

```typescript
// Get all AI providers
export async function getProviders(): Promise<Provider[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'providers' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Provider[]
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}
```

## 🎯 Cosmic CMS Integration

This application integrates with your Cosmic CMS bucket and uses the following content types:

- **AI Models**: Detailed model information including specifications, pricing, and architecture
- **Providers**: AI company information with branding and descriptions

The app leverages Cosmic's object relationships to connect models with their providers, and uses depth queries to fetch related data efficiently.

## 🚀 Deployment Options

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

### Netlify

1. Connect repository to Netlify
2. Configure environment variables
3. Set build command: `bun run build`
4. Set publish directory: `.next`

### Self-hosting

1. Build the application: `bun run build`
2. Start production server: `bun run start`

Remember to set your environment variables in your hosting platform's dashboard.

<!-- README_END -->