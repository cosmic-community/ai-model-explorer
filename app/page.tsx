import { getAiModels, getProviders } from '@/lib/cosmic'
import ModelGrid from '@/components/ModelGrid'
import ProviderShowcase from '@/components/ProviderShowcase'
import Hero from '@/components/Hero'

export default async function HomePage() {
  const [models, providers] = await Promise.all([
    getAiModels(),
    getProviders()
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <Hero />
      
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 gradient-text text-center">
          Featured Providers
        </h2>
        <ProviderShowcase providers={providers} />
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8 gradient-text text-center">
          AI Models
        </h2>
        <ModelGrid models={models} />
      </section>
    </div>
  )
}