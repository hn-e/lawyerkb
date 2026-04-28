import { NextRequest, NextResponse } from "next/server";
import searchData from "@/data/search-index.json";

interface SearchItem {
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

const data = searchData as SearchItem[];

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.toLowerCase().trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ total: 0, results: [] });
  }

  const terms = query.split(/\s+/).filter(Boolean);

  const results = data
    .map((item) => {
      let score = 0;
      const titleLower = (item.title || "").toLowerCase();
      const contentLower = item.contentPreview.toLowerCase();
      const actTitleLower = item.actTitle.toLowerCase();
      const shortNameLower = (item.actShortName || "").toLowerCase();
      const sectionLower = item.section.toLowerCase();

      for (const term of terms) {
        // Title match — highest weight
        if (titleLower.includes(term)) score += 10;
        // Section number match
        if (sectionLower === term) score += 8;
        // Short name match
        if (shortNameLower.includes(term)) score += 6;
        // Act title match
        if (actTitleLower.includes(term)) score += 4;
        // Content match
        const contentIdx = contentLower.indexOf(term);
        if (contentIdx !== -1) {
          score += 2;
          // Bonus for early occurrence
          if (contentIdx < 100) score += 1;
        }
      }

      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 50)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ score, ...item }) => item);

  return NextResponse.json({
    total: results.length,
    results,
  });
}