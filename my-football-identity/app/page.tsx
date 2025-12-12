export default function LandingPage() {
  return (
    <main className="relative h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">

      {/* Animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <img
            key={i}
            src="/football.png"
            className={`absolute animate-float opacity-[0.15] w-10 h-10
              ${i % 2 === 0 ? "animate-duration-10" : "animate-duration-14"}
            `}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Desc */}
      <h1 className="text-5xl font-extrabold mb-4 animate-fadeInDrop">
        My Football Identity
      </h1>

      <p className="text-lg text-gray-300 max-w-xl mb-10 animate-fadeInSlow">
        Build your own football profile, compare yourself to real players,
        explore teams and stats, and stay updated with global football news.
      </p>

      <a
        href="/create"
        className="bg-[#2c1345] hover:bg-[#241038] text-white px-8 py-3 rounded-lg text-lg"
      >
        Get Started
      </a>
    </main>
  );
}
