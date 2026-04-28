"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

interface Act {
  id: string;
  title: string;
  shortName: string | null;
  status: string;
  year: number | null;
  issuedDate: string | null;
  provisionCount: number;
}

export default function ActsPage() {
  const [acts, setActs] = useState<Act[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [decadeFilter, setDecadeFilter] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    fetch(`/api/acts?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setActs(data.acts);
        setLoading(false);
      });
  }, [search]);

  const decades = useMemo(() => {
    const map = new Map<string, number>();
    acts.forEach((a) => {
      if (!a.year) return;
      const decade = `${Math.floor(a.year / 10) * 10}s`;
      map.set(decade, (map.get(decade) || 0) + 1);
    });
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([decade, count]) => ({ decade, count }));
  }, [acts]);

  const filtered = useMemo(() => {
    if (!decadeFilter) return acts;
    const d = parseInt(decadeFilter);
    return acts.filter((a) => a.year && a.year >= d && a.year < d + 10);
  }, [acts, decadeFilter]);

  const onSearch = useCallback(
    (value: string) => {
      setSearch(value);
      setDecadeFilter(null);
    },
    []
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <header className="mb-16">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
            Legal Library
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Bare Acts of India
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Browse {acts.length} Central Acts from the official India Code
            repository — searchable, structured, and free.
          </p>
        </header>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search acts by name or abbreviation..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-foreground/20 transition-all text-sm"
          />
        </div>

        {/* Decade pills */}
        {decades.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setDecadeFilter(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                !decadeFilter
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            {decades.map(({ decade, count }) => (
              <button
                key={decade}
                onClick={() => setDecadeFilter(decade)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  decadeFilter === decade
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {decade}
                <span className="ml-1 opacity-50">{count}</span>
              </button>
            ))}
          </div>
        )}

        {/* List */}
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-muted/40 rounded-xl" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No acts found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((act) => (
              <Link
                key={act.id}
                href={`/acts/${act.id}`}
                className="group block px-5 py-4 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-medium text-foreground group-hover:text-foreground/80 transition-colors leading-snug">
                      {act.title}
                    </h2>
                    {act.shortName && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {act.shortName}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {act.provisionCount} sections
                    </span>
                    {act.year && (
                      <span className="text-xs font-medium tabular-nums text-foreground/40">
                        {act.year}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}