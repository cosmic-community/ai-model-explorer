'use client'

import Link from 'next/link'
import { Provider, AiModel } from '@/types'
import { getProviderIconUrl } from '@/lib/cosmic'
import ModelGrid from '@/components/ModelGrid'
import { useState } from 'react'

interface ProviderDetailProps {
  provider: Provider
  models: AiModel[]
}

export default function ProviderDetail({ provider, models }: ProviderDetailProps) {
  const [iconError, setIconError] = useState(false)
  const iconUrl = getProviderIconUrl(provider.metadata?.icon_slug)
  const fallbackUrl = 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/default.svg'
  
  return (
    <div className="max-w-6xl mx-auto">
      {/* Provider Header */}
      <div className="glass-effect rounded-lg p-8 mb-8">
        <div className="flex items-center space-x-6 mb-6">
          <img 
            src={iconError ? fallbackUrl : iconUrl}
            alt={`${provider.metadata?.name} logo`}
            className="w-20 h-20"
            onError={() => setIconError(true)}
          />
          <div>
            <h1 className="text-4xl font-bold mb-2">{provider.metadata?.name}</h1>
            <p className="text-xl text-muted-foreground">
              {provider.metadata?.description}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          {provider.metadata?.website && (
            <a 
              href={provider.metadata.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Visit Website →
            </a>
          )}
          
          <div className="text-muted-foreground">
            {models.length} model{models.length !== 1 ? 's' : ''} available
          </div>
        </div>
      </div>

      {/* Models Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8">
          Models by {provider.metadata?.name}
        </h2>
        <ModelGrid models={models} />
      </section>

      {/* Back Button */}
      <div className="mt-8">
        <Link 
          href="/"
          className="inline-flex items-center text-primary hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}