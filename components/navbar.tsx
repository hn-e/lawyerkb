export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between bg-white px-8 py-4">
        <div className="font-[family-name:var(--font-playfair)] text-2xl font-bold tracking-tight">KhushAI</div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Legal Consultancy
          </a>
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Judiciary Preparation
          </a>
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Legal Drafting
          </a>
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            AI Legal Tools
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-md px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors">
            Login
          </button>
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            Sign Up
          </button>
        </div>
      </div>
      <div className="h-32 bg-gradient-to-b from-white via-white/60 to-transparent" />
    </nav>
  );
}