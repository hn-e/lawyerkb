import Link from "next/link";
import { draftingTemplates } from "@/lib/drafting-templates";
import { ArrowRight } from "lucide-react";

export default function DraftingPage() {
  return (
    <main className="min-h-screen pt-28 pb-20 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Legal Drafting Assistant
          </h1>
          <p className="text-muted-foreground text-base">
            Choose a document type. Provide the facts. KhushAI will draft it for you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {draftingTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <Link
                key={template.id}
                href={`/chat?template=${template.id}`}
                className="group flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-5 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">
                    {template.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {template.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm text-primary font-medium mt-auto pt-2">
                  Draft now <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
