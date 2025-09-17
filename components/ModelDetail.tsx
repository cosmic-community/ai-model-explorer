import Link from 'next/link'
import { AiModel } from '@/types'
import { getProviderIconUrl } from '@/lib/cosmic'

interface ModelDetailProps {
  model: AiModel
}

export default function ModelDetail({ model }: ModelDetailProps) {
  const provider = model.metadata?.provider
  const iconUrl = getProviderIconUrl(provider?.metadata?.icon_slug)
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-start space-x-4 mb-8">
        {provider && (
          <img 
            src={iconUrl}
            alt={`${provider.metadata?.name} logo`}
            className="w-16 h-16"
            onError={(e) => {
              e.currentTarget.src = 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/default.svg'
            }}
          />
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{model.title}</h1>
          <p className="text-xl text-muted-foreground mb-4">
            {model.metadata?.description}
          </p>
          {provider && (
            <Link 
              href={`/providers/${provider.slug}`}
              className="text-primary hover:underline"
            >
              By {provider.metadata?.name} →
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Information */}
        <div className="glass-effect rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Model ID:</span>
              <span className="font-mono text-sm">{model.metadata?.model_id}</span>
            </div>
            
            {model.metadata?.context_length && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Context Length:</span>
                <span>{model.metadata.context_length.toLocaleString()} tokens</span>
              </div>
            )}
            
            {model.metadata?.created_date && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Released:</span>
                <span>{new Date(model.metadata.created_date).toLocaleDateString()}</span>
              </div>
            )}
            
            {model.metadata?.model_status && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  model.metadata.model_status.key === 'active' ? 'bg-green-500/20 text-green-400' :
                  model.metadata.model_status.key === 'beta' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-orange-500/20 text-orange-400'
                }`}>
                  {model.metadata.model_status.value}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Pricing */}
        {model.metadata?.pricing && (
          <div className="glass-effect rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Pricing</h2>
            <div className="space-y-3">
              {model.metadata.pricing.prompt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Input Tokens:</span>
                  <span>${model.metadata.pricing.prompt}/1K</span>
                </div>
              )}
              
              {model.metadata.pricing.completion && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Output Tokens:</span>
                  <span>${model.metadata.pricing.completion}/1K</span>
                </div>
              )}
              
              {model.metadata.pricing.image && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Images:</span>
                  <span>${model.metadata.pricing.image}/image</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Architecture */}
        {model.metadata?.architecture && (
          <div className="glass-effect rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Architecture</h2>
            <div className="space-y-3">
              {model.metadata.architecture.modality && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Modality:</span>
                  <span className="font-mono text-sm">{model.metadata.architecture.modality}</span>
                </div>
              )}
              
              {model.metadata.architecture.input_modalities && (
                <div>
                  <span className="text-muted-foreground block mb-2">Input Types:</span>
                  <div className="flex flex-wrap gap-2">
                    {model.metadata.architecture.input_modalities.map((modality, index) => (
                      <span key={index} className="px-2 py-1 bg-secondary/50 text-xs rounded">
                        {modality}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {model.metadata.architecture.instruct_type && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Instruction Type:</span>
                  <span>{model.metadata.architecture.instruct_type}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Supported Parameters */}
        {model.metadata?.supported_parameters && (
          <div className="glass-effect rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Supported Parameters</h2>
            <div className="grid grid-cols-2 gap-2">
              {model.metadata.supported_parameters.map((param, index) => (
                <span key={index} className="px-2 py-1 bg-secondary/30 text-sm rounded text-center">
                  {param}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Back Button */}
      <div className="mt-8">
        <Link 
          href="/"
          className="inline-flex items-center text-primary hover:underline"
        >
          ← Back to Models
        </Link>
      </div>
    </div>
  )
}