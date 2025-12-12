import { NextResponse } from "next/server";

// Top 5 leagues
const DEFAULT_LEAGUES = [39, 140, 78, 135, 61];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  const league = searchParams.get("league");

  if (!query) {
    return NextResponse.json({ error: "Missing player query" }, { status: 400 });
  }

  const apiKey = process.env.FOOTBALL_API_KEY;

  // Search specific league
  if (league && league !== "all") {
    const url = `https://v3.football.api-sports.io/players?search=${query}&league=${league}&season=2023`;
    const res = await fetch(url, {
      headers: { "x-apisports-key": apiKey ?? "" },
    });
    const data = await res.json();
    return NextResponse.json(data);
  }

  // Search main leagues
  for (const lg of DEFAULT_LEAGUES) {
    const url = `https://v3.football.api-sports.io/players?search=${query}&league=${lg}&season=2023`;
    const res = await fetch(url, {
      headers: { "x-apisports-key": apiKey ?? "" },
    });
    const data = await res.json();

    if (data.response?.length > 0) {
      return NextResponse.json(data);
    }
  }

  return NextResponse.json({ response: [] });
}
