"use client";

import { useEffect, useState } from "react";

type NewsArticle = {
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
};

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    async function loadNews() {
        try {
          const res = await fetch("/api/news");
          const data = await res.json();
          setArticles(data.articles || []);
        } catch (err) {
          console.error("Failed to fetch news:", err);
        }          
    }
    loadNews();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-8 text-purple-300">Football News</h1>

      {articles.length === 0 && (
        <p className="text-gray-400">Loading news...</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {articles.map((article, i) => (
          <a
            key={i}
            href={article.url}
            target="_blank"
            className="bg-[#2d0f47] rounded-lg shadow-lg border border-purple-900/40 hover:bg-[#3e1a61] transition overflow-hidden flex flex-col"
          >
            {/* Image Preview */}
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt="News"
                className="w-full h-60 object-cover"
              />
            )}

            {/* Text Content */}
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold mb-2 leading-tight">
                {article.title}
              </h2>

              <p className="text-gray-300 text-sm mb-4 flex-grow">
                {article.description?.slice(0, 140) || "No description available."}
              </p>

              <span className="text-purple-300 text-sm mt-auto">
                Read more →
              </span>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
