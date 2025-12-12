"use client";

import { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [similarPlayers, setSimilarPlayers] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load the profile ONCE
  useEffect(() => {
    const saved = localStorage.getItem("userStats");
    if (saved) setStats(JSON.parse(saved));
    setLoaded(true);
  }, []);

  // Load EAFC dataset & find similar players
  useEffect(() => {
    if (!stats) return;

    async function loadPlayers() {
      const res = await fetch("/data/eafc_players.json");
      const players = await res.json();

      // Remove goalkeepers (Option A)
      const outfield = players.filter((p: any) => p.position !== "GK");

      // Compute similarity
      const sorted = outfield
        .map((p: any) => {
          const distance =
            Math.pow(p.pace - stats.pace, 2) +
            Math.pow(p.shooting - stats.shooting, 2) +
            Math.pow(p.passing - stats.passing, 2) +
            Math.pow(p.dribbling - stats.dribbling, 2) +
            Math.pow(p.defending - stats.defending, 2) +
            Math.pow(p.physical - stats.physical, 2);

          return { ...p, distance };
        })
        .sort((a: any, b: any) => a.distance - b.distance);

      setSimilarPlayers(sorted.slice(0, 4));
    }

    loadPlayers();
  }, [stats]);

  // Load News
  useEffect(() => {
    async function loadNews() {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        setNews(data.articles || []);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      }
    }
    loadNews();
  }, []);

  // Loading or Missing Profile
  if (!loaded) return <main className="text-white p-6">Loading...</main>;

  if (!stats) {
    return (
      <main className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">No Player Profile Found</h1>
        <p className="text-gray-300 mb-6 text-center max-w-md">
          You haven't created a football profile yet. Create your player identity now!
        </p>

        <a
          href="/create"
          className="bg-[#3e1a61] hover:bg-[#2d0f47] px-6 py-3 rounded-lg text-lg transition"
        >
          Create Player Profile →
        </a>
      </main>
    );
  }

  // Radar chart data
  const chartData = {
    labels: ["Pace", "Shooting", "Passing", "Dribbling", "Defending", "Physical"],
    datasets: [
      {
        data: [
          stats.pace,
          stats.shooting,
          stats.passing,
          stats.dribbling,
          stats.defending,
          stats.physical,
        ],
        backgroundColor: "rgba(0, 255, 200, 0.3)",
        borderColor: "#00ffc8",
        pointBackgroundColor: "#00ffc8",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions: any = {
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: { display: false },
        grid: { color: "rgba(255,255,255,0.15)" },
        angleLines: { color: "rgba(255,255,255,0.15)" },
        pointLabels: {
          color: "white",
          font: {
            size: 18, // this is not working ffs
            weight: "bold",
          },
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };  

  return (
    <main className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-purple-300">
        Dashboard
      </h1>

      {/* Profile & Radar */}
      <div className="flex flex-col lg:flex-row gap-6 mb-10">
        {/* Profile Card */}
        <div className="bg-[#2d0f47] p-6 rounded-lg shadow flex-1">
          <h2 className="text-3xl font-bold mb-4 underline">Your Player Profile</h2>

          <p><strong>Position:</strong> {stats.position}</p>
          <p><strong>Height:</strong> {stats.height} cm</p>
          <p><strong>Weight:</strong> {stats.weight} kg</p>

          <h3 className="text-2xl mt-4 mb-2"><strong>Stats</strong></h3>
          <p>Pace: {stats.pace}</p>
          <p>Shooting: {stats.shooting}</p>
          <p>Passing: {stats.passing}</p>
          <p>Dribbling: {stats.dribbling}</p>
          <p>Defending: {stats.defending}</p>
          <p>Physical: {stats.physical}</p>

          <a
            href="/create"
            className="inline-block mt-4 bg-black px-4 py-3 rounded-lg hover:bg-[#191a1c] transition"
          >
            Update Profile
          </a>
        </div>

        {/* Radar */}
        <div className="bg-[#2d0f47] p-6 rounded-lg shadow flex-1 flex items-center justify-center">
          <div className="w-80 h-80 lg:w-96 lg:h-96">
            <Radar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Similar Players */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-purple-300">Similar Players</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {similarPlayers.map((p, i) => (
            <div key={i} className="bg-[#3e1a61] p-4 rounded-lg shadow">

              <h3 className="text-xl font-bold">{p.name}</h3>
              <p>{p.team}</p>
              <p className="text-purple-200"><strong>OVR:</strong> {p.ovr}</p>
              <p><strong>Position:</strong> {p.position}</p>

              <div className="grid grid-cols-3 gap-2 text-sm mt-3 text-gray-200">
                <p><strong>PAC:</strong> {p.pace}</p>
                <p><strong>SHO:</strong> {p.shooting}</p>
                <p><strong>PAS:</strong> {p.passing}</p>
                <p><strong>DRI:</strong> {p.dribbling}</p>
                <p><strong>DEF:</strong> {p.defending}</p>
                <p><strong>PHY:</strong> {p.physical}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* News Preview */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-3 text-purple-300">Football Headlines</h2>

        <div className="flex flex-col gap-3">
          {news.slice(0, 3).map((article, i) => (
            <a
              key={i}
              href={article.url}
              target="_blank"
              className="bg-[#2d0f47] p-3 rounded-lg border border-purple-900/40 hover:bg-[#3e1a61] transition"
            >
              <p className="font-medium">• {article.title}</p>
            </a>
          ))}
        </div>

        <a
          href="/news"
          className="inline-block mt-4 text-purple-300 hover:text-purple-100 transition"
        >
          View all news →
        </a>
      </div>
    </main>
  );
}
