import { createBucketClient } from '@cosmicjs/sdk'
import { AiModel, Provider } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Utility function to check if error has status
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all AI models
export async function getAiModels(): Promise<AiModel[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'ai-models' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as AiModel[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch AI models')
  }
}

// Get all providers
export async function getProviders(): Promise<Provider[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'providers' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Provider[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch providers')
  }
}

// Get single AI model by slug
export async function getAiModel(slug: string): Promise<AiModel | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'ai-models',
        slug
      })
      .depth(1)
    
    return response.object as AiModel
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error(`Failed to fetch AI model: ${slug}`)
  }
}

// Get single provider by slug
export async function getProvider(slug: string): Promise<Provider | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'providers',
        slug
      })
      .depth(1)
    
    return response.object as Provider
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error(`Failed to fetch provider: ${slug}`)
  }
}

// Get models by provider
export async function getModelsByProvider(providerSlug: string): Promise<AiModel[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'ai-models',
        'metadata.provider.slug': providerSlug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as AiModel[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error(`Failed to fetch models for provider: ${providerSlug}`)
  }
}

// Helper function to get provider icon URL
export function getProviderIconUrl(iconSlug?: string): string {
  if (!iconSlug) {
    return 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/default.svg'
  }
  return `https://unpkg.com/@lobehub/icons-static-svg@latest/icons/${iconSlug}.svg`
}