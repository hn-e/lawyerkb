import LadyModel from "@/components/lady-model";

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <LadyModel />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <a
          href="/"
          className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-xs hover:bg-primary/90"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}