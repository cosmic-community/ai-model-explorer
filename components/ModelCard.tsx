import Link from 'next/link'
import { AiModel } from '@/types'
import { getProviderIconUrl } from '@/lib/cosmic'

interface ModelCardProps {
  model: AiModel
}

export default function ModelCard({ model }: ModelCardProps) {
  const provider = model.metadata?.provider
  const iconUrl = getProviderIconUrl(provider?.metadata?.icon_slug)
  const contextLength = model.metadata?.context_length
  const pricing = model.metadata?.pricing
  const status = model.metadata?.model_status

  return (
    <Link href={`/models/${model.slug}`}>
      <div className="glass-effect rounded-lg p-6 hover-card h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {provider && (
              <img 
                src={iconUrl}
                alt={`${provider.metadata?.name} logo`}
                className="w-8 h-8"
                onError={(e) => {
                  e.currentTarget.src = 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/default.svg'
                }}
              />
            )}
            <div>
              <h3 className="font-semibold text-lg">{model.title}</h3>
              {provider && (
                <p className="text-sm text-muted-foreground">{provider.metadata?.name}</p>
              )}
            </div>
          </div>
          
          {status && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              status.key === 'active' ? 'bg-green-500/20 text-green-400' :
              status.key === 'beta' ? 'bg-blue-500/20 text-blue-400' :
              'bg-orange-500/20 text-orange-400'
            }`}>
              {status.value}
            </span>
          )}
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {model.metadata?.description || 'No description available'}
        </p>

        <div className="space-y-2 mb-4">
          {contextLength && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Context Length:</span>
              <span>{contextLength.toLocaleString()} tokens</span>
            </div>
          )}
          
          {pricing?.prompt && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Input Cost:</span>
              <span>${pricing.prompt}/1K tokens</span>
            </div>
          )}
          
          {pricing?.completion && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Output Cost:</span>
              <span>${pricing.completion}/1K tokens</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <span className="text-sm text-primary font-medium">View Details →</span>
          {model.metadata?.architecture?.input_modalities && (
            <div className="flex space-x-1">
              {model.metadata.architecture.input_modalities.slice(0, 3).map((modality, index) => (
                <span key={index} className="px-2 py-1 bg-secondary/50 text-xs rounded">
                  {modality}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}