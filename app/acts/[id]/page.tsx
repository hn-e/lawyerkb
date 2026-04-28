"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ChevronDown, ChevronRight, ExternalLink, Copy, Check } from "lucide-react";

interface ActDetail {
  id: string;
  title: string;
  shortName: string | null;
  status: string;
  issuedDate: string | null;
  inForceDate: string | null;
  url: string | null;
  description: string | null;
  totalProvisions: number;
  chapters: Record<string, { section: string; title: string | null; provisionRef: string }[]>;
  provisions: { id: number; section: string; title: string | null; chapter: string | null; content: string; provisionRef: string }[];
}

export default function ActDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [act, setAct] = useState<ActDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/acts/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setAct(data);
        // Auto-expand first chapter
        const chapters = Object.keys(data.chapters || {});
        if (chapters.length > 0) setExpandedChapters(new Set([chapters[0]]));
      })
      .finally(() => setLoading(false));
  }, [id]);

  const toggleSection = (ref: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(ref)) next.delete(ref);
      else next.add(ref);
      return next;
    });
  };

  const toggleChapter = (ch: string) => {
    setExpandedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(ch)) next.delete(ch);
      else next.add(ch);
      return next;
    });
  };

  const copyCitation = (section: string) => {
    if (!act) return;
    const cite = `${act.title}, s ${section}`;
    navigator.clipboard.writeText(cite);
    setCopiedRef(section);
    setTimeout(() => setCopiedRef(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
          <div className="animate-pulse space-y-6">
            <div className="h-4 w-24 bg-muted/40 rounded" />
            <div className="h-10 w-3/4 bg-muted/40 rounded" />
            <div className="h-4 w-1/2 bg-muted/40 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!act) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
          <p className="text-muted-foreground">Act not found.</p>
        </div>
      </div>
    );
  }

  const chapterEntries = Object.entries(act.chapters);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        {/* Back link */}
        <Link
          href="/acts"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          All Acts
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
                {act.shortName || act.status}
              </p>
              <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                {act.title}
              </h1>
            </div>
            {act.url && (
              <a
                href={act.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mt-2"
              >
                India Code
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {act.issuedDate && (
              <span>
                Enacted <span className="text-foreground font-medium">{new Date(act.issuedDate).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</span>
              </span>
            )}
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span>{act.totalProvisions} sections</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              In Force
            </span>
          </div>

          {act.description && (
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-2xl">
              {act.description}
            </p>
          )}
        </header>

        {/* Table of Contents */}
        {chapterEntries.length > 0 && (
          <nav className="mb-12 p-6 rounded-2xl bg-muted/30 border border-border">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">
              Contents
            </h2>
            <div className="space-y-0.5">
              {chapterEntries.map(([chapter, sections]) => (
                <div key={chapter}>
                  <button
                    onClick={() => toggleChapter(chapter)}
                    className="w-full flex items-center gap-2 py-2 text-left text-sm text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {expandedChapters.has(chapter) ? (
                      <ChevronDown className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                    )}
                    <span className="font-medium">{chapter}</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {sections.length}
                    </span>
                  </button>
                  {expandedChapters.has(chapter) && (
                    <div className="ml-5.5 space-y-0">
                      {sections.map((s) => (
                        <button
                          key={s.provisionRef}
                          onClick={() => {
                            toggleSection(s.provisionRef);
                            const el = document.getElementById(`section-${s.provisionRef}`);
                            el?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                          className="w-full flex items-center gap-2 py-1.5 text-left text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <span className="tabular-nums w-8 shrink-0 text-right font-medium">
                            {s.section}
                          </span>
                          <span className="truncate">{s.title || "—"}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        )}

        {/* Sections */}
        <div className="space-y-1">
          {act.provisions.map((prov) => (
            <div
              key={prov.id}
              id={`section-${prov.provisionRef || prov.section}`}
              className="scroll-mt-24"
            >
              <button
                onClick={() => toggleSection(prov.provisionRef || prov.section)}
                className="w-full text-left group px-5 py-4 rounded-xl hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="text-sm tabular-nums text-muted-foreground font-medium mt-0.5 shrink-0 w-10 text-right">
                    {prov.section}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-foreground group-hover:text-foreground/80 transition-colors">
                        {prov.title || "Untitled"}
                      </h3>
                      {expandedSections.has(prov.provisionRef || prov.section) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyCitation(prov.section);
                          }}
                          className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Copy citation"
                        >
                          {copiedRef === prov.section ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                          )}
                        </button>
                      )}
                    </div>
                    {expandedSections.has(prov.provisionRef || prov.section) && (
                      <div className="mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap font-[family-name:var(--font-geist-mono)] text-xs">
                        {prov.content}
                      </div>
                    )}
                  </div>
                  <ChevronRight
                    className={`w-3.5 h-3.5 text-muted-foreground/40 shrink-0 mt-1 transition-transform ${
                      expandedSections.has(prov.provisionRef || prov.section) ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}