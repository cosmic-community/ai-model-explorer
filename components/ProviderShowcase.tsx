'use client'

import Link from 'next/link'
import { Provider } from '@/types'
import { getProviderIconUrl } from '@/lib/cosmic'

interface ProviderShowcaseProps {
  providers: Provider[]
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
      {providers.map((provider) => {
        const iconUrl = getProviderIconUrl(provider.metadata?.icon_slug)
        
        return (
          <Link key={provider.id} href={`/providers/${provider.slug}`}>
            <div className="glass-effect rounded-lg p-6 hover-card text-center">
              <img 
                src={iconUrl}
                alt={`${provider.metadata?.name} logo`}
                className="w-16 h-16 mx-auto mb-4"
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
      })}
    </div>
  )
}