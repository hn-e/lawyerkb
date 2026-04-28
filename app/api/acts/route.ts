import { NextRequest, NextResponse } from "next/server";
import { getActs } from "@/lib/db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("q") || undefined;

  const acts = getActs(search);

  return NextResponse.json({
    total: acts.length,
    acts: acts.map((a) => ({
      id: a.id,
      title: a.title,
      shortName: a.short_name,
      status: a.status,
      year: a.issued_date ? parseInt(a.issued_date.substring(0, 4)) : null,
      issuedDate: a.issued_date,
      provisionCount: a.provision_count,
    })),
  });
}