// app/providers/[slug]/page.tsx
import { cosmic } from '@/lib/cosmic'
import { Provider, AiModel } from '@/types'
import ProviderDetail from '@/components/ProviderDetail'
import { notFound } from 'next/navigation'

// Utility function to check if error has status
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProviderPage({ params }: PageProps) {
  const { slug } = await params

  try {
    // First, get the provider
    const providerResponse = await cosmic.objects.findOne({
      type: 'providers',
      slug
    }).depth(1)

    if (!providerResponse.object) {
      notFound()
    }

    const provider = providerResponse.object as Provider

    // Then get models by provider ID (not slug)
    const modelsResponse = await cosmic.objects.find({
      type: 'ai-models',
      'metadata.provider': provider.id
    }).depth(1)

    const models = (modelsResponse.objects || []) as AiModel[]

    return (
      <div className="container mx-auto px-4 py-8">
        <ProviderDetail provider={provider} models={models} />
      </div>
    )
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      notFound()
    }
    throw error
  }
}