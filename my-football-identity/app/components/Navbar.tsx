"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#241038] shadow-lg border-b border-white-900/40">
      <div className="w-full h-16 px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white tracking-wide">
          <span>My Football Identity</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex h-full text-md font-bold">
          <NavLink href="/create" label="Create Profile" />
          <NavLink href="/dashboard" label="Dashboard" />
          <NavLink href="/explore" label="Explore" />
          <NavLink href="/news" label="News" />
        </div>

      </div>
    </nav>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
    return (
      <Link
        href={href}
        className="
          h-full 
          flex 
          items-center 
          px-5 
          text-gray-200 
          hover:text-white 
          transition 
          bg-transparent 
          hover:bg-black/70
        "
      >
        {label}
      </Link>
    );
  }
  