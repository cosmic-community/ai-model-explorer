import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <span className="text-xl font-bold gradient-text">Model Explorer</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/models" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Models
            </Link>
            <Link 
              href="/providers" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Providers
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Explore Models
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}