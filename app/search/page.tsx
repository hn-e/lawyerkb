"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, ArrowRight, BookOpen } from "lucide-react";

interface SearchResult {
  id: number;
  actId: string;
  actTitle: string;
  actShortName: string | null;
  actYear: number | null;
  section: string;
  title: string | null;
  chapter: string | null;
  provisionRef: string;
  contentPreview: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const doSearch = useCallback((q: string) => {
    if (q.trim().length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    fetch(`/api/search?q=${encodeURIComponent(q)}`)
      .then((r) => r.json())
      .then((data) => {
        setResults(data.results);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 300);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  const exampleQueries = [
    "data protection consent",
    "cheque bounce penalty",
    "cybercrime punishment",
    "domestic violence",
    "consumer rights",
    "bail procedure",
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <header className="mb-12">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
            Legal Search
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Search Indian Law
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Search across 31,198 provisions from 846 Central Acts.
          </p>
        </header>

        {/* Search input */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search sections, acts, or legal topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full pl-13 pr-4 py-4 bg-muted/50 border border-border rounded-2xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-foreground/20 transition-all text-base"
          />
        </div>

        {/* Example queries — show when no search yet */}
        {!searched && (
          <div className="flex flex-wrap gap-2 mb-12">
            {exampleQueries.map((q) => (
              <button
                key={q}
                onClick={() => setQuery(q)}
                className="px-3 py-1.5 rounded-lg bg-muted/50 border border-border text-xs text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-24 bg-muted/30 rounded-xl" />
              </div>
            ))}
          </div>
        ) : searched && results.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              No provisions found matching &ldquo;{query}&rdquo;
            </p>
            <p className="text-sm text-muted-foreground/60 mt-2">
              Try different keywords or browse all{" "}
              <Link href="/acts" className="underline hover:text-foreground transition-colors">
                Bare Acts
              </Link>
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {results.map((result) => (
              <Link
                key={result.id}
                href={`/acts/${result.actId}#section-${result.provisionRef}`}
                className="group block px-5 py-4 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground/70 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs font-medium text-muted-foreground tabular-nums">
                        {result.actShortName || result.actTitle}
                      </span>
                      {result.actYear && (
                        <span className="text-xs text-muted-foreground/40 tabular-nums">
                          {result.actYear}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-medium text-foreground group-hover:text-foreground/80 transition-colors">
                      <span className="tabular-nums text-muted-foreground mr-1.5">
                        §{result.section}
                      </span>
                      {result.title || "Untitled"}
                    </h3>
                    <p className="mt-1.5 text-xs text-muted-foreground/70 leading-relaxed line-clamp-2">
                      {result.contentPreview}
                    </p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/0 group-hover:text-muted-foreground/60 transition-colors shrink-0 mt-3" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Results count */}
        {searched && results.length > 0 && (
          <p className="mt-6 text-center text-xs text-muted-foreground/50">
            {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}