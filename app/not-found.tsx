import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-6">
        <p className="text-7xl font-[family-name:var(--font-playfair)] font-bold text-foreground/10">
          404
        </p>
        <h1 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/acts"
            className="rounded-lg border border-foreground/20 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            Browse Acts
          </Link>
          <Link
            href="/chat"
            className="rounded-lg border border-foreground/20 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            AI Assistant
          </Link>
        </div>
      </div>
    </div>
  );
}