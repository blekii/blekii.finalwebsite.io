import { NextResponse } from "next/server";

export async function GET() {
  const url = `https://newsapi.org/v2/everything?q=(soccer OR "premier league" OR laliga OR bundesliga OR "serie a" OR "ligue 1" OR "champions league") -NFL -"american football" -"college football"&language=en&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(data);
}
