"use client";

import { useEffect, useState } from "react";

type Player = {
  player: {
    id: number;
    name: string;
    photo: string;
    age: number;
    nationality: string;
    height: string;
    weight: string;
  };
  statistics: {
    team: { name: string; logo: string };
    games: {
      position: string;
      rating: string;
      appearences: number;
      minutes: number;
    };
    goals: { total: number; assists: number; saves: number };
    shots: { total: number };
    passes: { total: number };
    tackles: { total: number };
    dribbles: { success: number };
  }[];
};

export default function ExplorePlayers() {
  const [query, setQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");
  const [leagueFilter, setLeagueFilter] = useState("all");
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query.trim()) searchPlayers();
  }, [leagueFilter]);

  async function searchPlayers() {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setPlayers([]);

    try {
      const res = await fetch(`/api/explore?q=${query}&league=${leagueFilter}`);
      const data = await res.json();

      if (!data.response || data.response.length === 0) {
        setError("No players found.");
      } else {
        setPlayers(data.response);
      }
    } catch (err) {
      setError("Error fetching players.");
      console.error(err);
    }

    setLoading(false);
  }

  const filteredPlayers = players.filter((p) => {
    if (positionFilter === "all") return true;
    const pos = p.statistics[0]?.games?.position || "";
    return pos.toLowerCase().includes(positionFilter.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-purple-300 mb-8">Explore Players</h1>

      {/* Search */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchPlayers();
        }}
        className="flex flex-col sm:flex-row gap-4 mb-8"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search player name..."
          className="w-full p-3 rounded bg-[#2d0f47] border border-purple-900/40 focus:outline-none"
        />

        <button
          type="submit"
          className="bg-[#3e1a61] px-6 py-2 rounded hover:bg-[#2d0f47] transition"
        >
          Search
        </button>
      </form>

      {/* Position Filter */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {["all", "Goalkeeper", "Defender", "Midfielder", "Attacker"].map((pos) => (
          <button
            key={pos}
            onClick={() => setPositionFilter(pos)}
            className={`px-4 py-2 rounded transition ${
              positionFilter === pos
                ? "bg-[#3e1a61]"
                : "bg-transparent border border-purple-900/40 hover:bg-[#3e1a61]/30"
            }`}
          >
            {pos === "all" ? "All" : pos}
          </button>
        ))}
      </div>

      {/* League Filter */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {[
          { name: "All Leagues", id: "all" },
          { name: "Premier League", id: "39" },
          { name: "LaLiga", id: "140" },
          { name: "Bundesliga", id: "78" },
          { name: "Serie A", id: "135" },
          { name: "Ligue 1", id: "61" },
        ].map((lg) => (
          <button
            key={lg.id}
            onClick={() => setLeagueFilter(lg.id)}
            className={`px-4 py-2 rounded transition ${
              leagueFilter === lg.id
                ? "bg-[#3e1a61]"
                : "bg-transparent border border-purple-900/40 hover:bg-[#3e1a61]/30"
            }`}
          >
            {lg.name}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && <p className="text-gray-300">Searching players...</p>}

      {/* Error */}
      {error && <p className="text-red-400">{error}</p>}

      {/* Player Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredPlayers.map((item) => {
          const player = item.player;
          const stats = item.statistics[0];
          const position = stats?.games?.position || "N/A";

          return (
            <div
              key={player.id}
              className="relative group bg-[#2d0f47] p-4 rounded-lg shadow 
                       hover:bg-[#3e1a61] transition border border-purple-900/40"
            >
              {/* Player Photo */}
              <img
                src={player.photo}
                alt={player.name}
                className="w-20 h-20 object-cover rounded-full mx-auto mb-3"
              />

              <h2 className="text-xl font-bold text-center">{player.name}</h2>
              <p className="text-center text-gray-300">{player.nationality}</p>

              {/* Team */}
              {stats && (
                <div className="flex items-center justify-center gap-2 my-3">
                  <img
                    src={stats.team.logo}
                    alt="team"
                    className="w-6 h-6 rounded"
                  />
                  <span>{stats.team.name}</span>
                </div>
              )}

              <p className="text-center text-purple-200 mb-2">
                Position: {position}
              </p>

              {/* Basic info */}
              <p className="text-sm text-center text-gray-300 mb-1">
                Height: {player.height}cm
              </p>
              <p className="text-sm text-center text-gray-300 mb-4">
                Weight: {player.weight}kg
              </p>
              
              {stats && (
                <div
                  className="absolute left-0 top-full mt-2 w-full bg-[#1b0f2d] p-4 rounded-lg 
                             border border-purple-900/40 opacity-0 group-hover:opacity-100 
                             transition-opacity duration-300 pointer-events-none z-20"
                >
                  <h3 className="font-semibold text-purple-200 text-center mb-2">
                    2023 Season Stats
                  </h3>

                  <div className="grid grid-cols-2 gap-2 text-gray-200 text-sm">
                    <p><strong>Apps:</strong> {stats.games.appearences ?? "—"}</p>
                    <p><strong>Minutes:</strong> {stats.games.minutes ?? "—"}</p>

                    <p><strong>Goals:</strong> {stats.goals.total ?? 0}</p>
                    <p><strong>Assists:</strong> {stats.goals.assists ?? 0}</p>

                    {position === "Goalkeeper" && (
                      <p><strong>Saves:</strong> {stats.goals.saves ?? 0}</p>
                    )}

                    <p><strong>Shots:</strong> {stats.shots?.total ?? 0}</p>
                    <p><strong>Passes:</strong> {stats.passes?.total ?? 0}</p>
                    <p><strong>Tackles:</strong> {stats.tackles?.total ?? 0}</p>
                    <p><strong>Dribbles:</strong> {stats.dribbles?.success ?? 0}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!loading && !error && filteredPlayers.length === 0 && players.length > 0 && (
        <p className="text-gray-400 mt-6">No players match this position filter.</p>
      )}
    </main>
  );
}
