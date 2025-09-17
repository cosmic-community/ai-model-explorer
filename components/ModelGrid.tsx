import { AiModel } from '@/types'
import ModelCard from '@/components/ModelCard'

interface ModelGridProps {
  models: AiModel[]
}

export default function ModelGrid({ models }: ModelGridProps) {
  if (!models || models.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🤖</div>
        <h3 className="text-xl font-semibold mb-2">No models found</h3>
        <p className="text-muted-foreground">Check back soon for new AI models!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {models.map((model) => (
        <ModelCard key={model.id} model={model} />
      ))}
    </div>
  )
}