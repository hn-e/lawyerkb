import { NextRequest, NextResponse } from "next/server";
import actsList from "@/data/acts-list.json";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("q")?.toLowerCase() || "";

  let filtered = actsList as {
    id: string;
    title: string;
    shortName: string | null;
    status: string;
    year: number | null;
    issuedDate: string | null;
    provisionCount: number;
  }[];

  if (search) {
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(search) ||
        (a.shortName && a.shortName.toLowerCase().includes(search))
    );
  }

  return NextResponse.json({
    total: filtered.length,
    acts: filtered,
  });
}