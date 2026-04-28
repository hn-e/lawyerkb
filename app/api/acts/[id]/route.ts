import { NextRequest, NextResponse } from "next/server";
import { getAct, getProvisions } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const act = getAct(id);

  if (!act) {
    return NextResponse.json({ error: "Act not found" }, { status: 404 });
  }

  const provisions = getProvisions(id);

  const chapters = provisions.reduce(
    (acc, p) => {
      const ch = p.chapter || "Unchaptered";
      if (!acc[ch]) acc[ch] = [];
      acc[ch].push({
        section: p.section,
        title: p.title,
        provisionRef: p.provision_ref,
      });
      return acc;
    },
    {} as Record<string, { section: string; title: string | null; provisionRef: string }[]>
  );

  return NextResponse.json({
    id: act.id,
    title: act.title,
    shortName: act.short_name,
    status: act.status,
    issuedDate: act.issued_date,
    inForceDate: act.in_force_date,
    url: act.url,
    description: act.description,
    totalProvisions: provisions.length,
    chapters,
    provisions: provisions.map((p) => ({
      id: p.id,
      section: p.section,
      title: p.title,
      chapter: p.chapter,
      content: p.content,
    })),
  });
}