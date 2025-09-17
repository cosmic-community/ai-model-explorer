import { cosmic } from '@/lib/cosmic'
import { AiModel } from '@/types'
import ModelDetail from '@/components/ModelDetail'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ModelPage({ params }: PageProps) {
  const { slug } = await params

  try {
    const response = await cosmic.objects
      .findOne({
        type: 'ai-models',
        slug
      })
      .depth(1)

    if (!response.object) {
      notFound()
    }

    const model = response.object as AiModel

    return (
      <div className="container mx-auto px-4 py-8">
        <ModelDetail model={model} />
      </div>
    )
  } catch (error) {
    if (error.status === 404) {
      notFound()
    }
    throw error
  }
}