'use client'

import Link from 'next/link'
import { Provider } from '@/types'
import { getProviderIconUrl } from '@/lib/cosmic'
import { useState } from 'react'

interface ProviderShowcaseProps {
  providers: Provider[]
}

interface ProviderCardProps {
  provider: Provider
}

function ProviderCard({ provider }: ProviderCardProps) {
  const [iconError, setIconError] = useState(false)
  const iconUrl = getProviderIconUrl(provider.metadata?.icon_slug)
  const fallbackUrl = 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/default.svg'

  return (
    <Link key={provider.id} href={`/providers/${provider.slug}`}>
      <div className="glass-effect rounded-lg p-6 hover-card text-center">
        <img 
          src={iconError ? fallbackUrl : iconUrl}
          alt={`${provider.metadata?.name} logo`}
          className="w-16 h-16 mx-auto mb-4"
          onError={() => setIconError(true)}
        />
        
        <h3 className="text-xl font-semibold mb-2">
          {provider.metadata?.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4">
          {provider.metadata?.description}
        </p>
        
        <span className="text-primary text-sm font-medium">
          View Models →
        </span>
      </div>
    </Link>
  )
}

export default function ProviderShowcase({ providers }: ProviderShowcaseProps) {
  if (!providers || providers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No providers found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {providers.map((provider) => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}
    </div>
  )
}