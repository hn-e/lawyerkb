"use client";

import { type DraftingTemplate } from "@/lib/drafting-templates";
import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

interface DraftingFormProps {
  template: DraftingTemplate;
  onSubmit: (facts: string) => void;
  isLoading: boolean;
}

export function DraftingForm({ template, onSubmit, isLoading }: DraftingFormProps) {
  const [facts, setFacts] = useState("");
  const Icon = template.icon;

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-12">
      <div className="w-full max-w-xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Draft {template.label}</h2>
            <p className="text-sm text-muted-foreground">
              Describe your case details below
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (facts.trim()) onSubmit(facts.trim());
          }}
        >
          <textarea
            value={facts}
            onChange={(e) => setFacts(e.target.value)}
            placeholder={`Describe the parties, facts, relief sought, and any relevant details for the ${template.label.toLowerCase()}...`}
            className="w-full min-h-[200px] rounded-xl border border-border/60 bg-card p-4 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground/50"
          />
          <button
            type="submit"
            disabled={!facts.trim() || isLoading}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Generate {template.label}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
