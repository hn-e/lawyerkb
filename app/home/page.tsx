import Link from "next/link";
import LadyModel from "@/components/lady-model";

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <LadyModel />
      <div className="absolute inset-0 flex items-center z-10 pointer-events-none">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="max-w-xl">
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-foreground">
              Simplifying law,
              <br />
              making it practical
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground">
              Legal guidance, judiciary preparation, and smart tools — all in one
              place.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 pointer-events-auto">
              <Link
                href="/"
                className="rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
              >
                Book Consultation
              </Link>
              <Link
                href="/"
                className="rounded-lg border border-foreground/20 px-7 py-3.5 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
              >
                Explore Notes
              </Link>
              <Link
                href="/"
                className="rounded-lg border border-foreground/20 px-7 py-3.5 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
              >
                Try AI Assistant
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}