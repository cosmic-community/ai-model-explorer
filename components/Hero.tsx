export default function Hero() {
  return (
    <section className="text-center py-16 mb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="gradient-text">Explore AI Models</span>
          <br />
          <span className="text-foreground">From Leading Providers</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover, compare, and choose the perfect AI model for your project. 
          Get detailed specifications, pricing information, and technical details.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-105">
            Browse Models
          </button>
          <button className="px-8 py-3 border border-border hover:bg-card transition-all hover:scale-105 rounded-lg">
            Compare Features
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">50+</div>
            <div className="text-muted-foreground">AI Models</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">10+</div>
            <div className="text-muted-foreground">Providers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
            <div className="text-muted-foreground">Updated</div>
          </div>
        </div>
      </div>
    </section>
  )
}