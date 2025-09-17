import { cosmic } from '@/lib/cosmic'
import { Provider, AiModel } from '@/types'
import ProviderDetail from '@/components/ProviderDetail'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProviderPage({ params }: PageProps) {
  const { slug } = await params

  try {
    const [providerResponse, modelsResponse] = await Promise.all([
      cosmic.objects.findOne({
        type: 'providers',
        slug
      }).depth(1),
      cosmic.objects.find({
        type: 'ai-models',
        'metadata.provider': slug
      }).depth(1)
    ])

    if (!providerResponse.object) {
      notFound()
    }

    const provider = providerResponse.object as Provider
    const models = (modelsResponse.objects || []) as AiModel[]

    return (
      <div className="container mx-auto px-4 py-8">
        <ProviderDetail provider={provider} models={models} />
      </div>
    )
  } catch (error) {
    if (error.status === 404) {
      notFound()
    }
    throw error
  }
}