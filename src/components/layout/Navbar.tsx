"use client";

import Link from "next/link";
import { Search, MessageSquare, Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    const q = searchQuery.trim();
    if (!q) {
      router.push("/shop");
      return;
    }
    router.push(`/shop?query=${encodeURIComponent(q)}`);
  };

  return (
    <>
    <nav className="sticky top-0 z-50 w-full border-b border-black bg-white px-4 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        
        {/* Animated Logo */}
        <Link href="/" className="animate-repoed">
          <span className="text-2xl font-black tracking-tighter text-black uppercase hover:animate-repoed">
            REPOED
          </span>
        </Link>

        {/* Mobile toggle visible on small screens */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Custom Search Bar Section (hidden on xs) */}
        <div className="hidden md:flex flex-1 items-center max-w-md">
          <div className="relative flex w-full border border-black">
            {/* The Internal "SEARCH" box */}
            <div className="flex items-center bg-white px-3 border-r border-black">
              <span className="text-[10px] font-black uppercase tracking-widest text-black">
                SEARCH
              </span>
            </div>
            
            <input
              type="text"
              placeholder="Search for anything."
              className="w-full bg-white py-1.5 px-3 text-xs outline-none placeholder:text-gray-400 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <button className="bg-white px-3 hover:bg-gray-100 transition-colors border-l border-black">
              <Search className="h-4 w-4 text-black stroke-[3px]" />
            </button>
          </div>
        </div>

        {/* Actions - Matching your image exactly (hidden on xs) */}
        <div className="hidden md:flex items-center gap-8">
          {/* SELL Button - Boxed style */}
          <Link 
            href="/sell" 
            className="border border-black px-8 py-2 text-xs font-black uppercase tracking-tighter hover:bg-black hover:text-white transition-all"
          >
            SELL
          </Link>

          {/* MY FEED Link */}
          <Link 
            href="/feed" 
            className="text-xs font-black uppercase tracking-tighter hover:text-gray-600 transition-colors"
          >
            MY FEED
          </Link>

          {/* Icons: Messages, Likes, Profile */}
          <div className="flex items-center gap-6">
            <Link href="/messages" className="hover:scale-110 transition-transform">
              <MessageSquare className="h-6 w-6 text-black stroke-[2px]" />
            </Link>
            <Link href="/favorites" className="hover:scale-110 transition-transform">
              <Heart className="h-6 w-6 text-black stroke-[2px]" />
            </Link>
            {/* User menu dropdown (desktop) */}
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>

    {/* Mobile overlay menu */}
    {mobileMenuOpen && (
      <div className="fixed inset-0 bg-white z-40 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="animate-repoed">
            <span className="text-2xl font-black uppercase">REPOED</span>
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
          className="relative flex w-full border border-black mb-6"
        >
          <div className="flex items-center bg-white px-3 border-r border-black">
            <span className="text-[10px] font-black uppercase tracking-widest text-black">
              SEARCH
            </span>
          </div>
          <input
            type="text"
            name="q"
            placeholder="Search for anything."
            className="w-full bg-white py-1.5 px-3 text-xs outline-none placeholder:text-gray-400 font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSearch(); } }}
          />
          <button
            type="button"
            onClick={handleSearch}
            className="bg-white px-3 hover:bg-gray-100 transition-colors border-l border-black"
            aria-label="Search"
          >
            <Search className="h-4 w-4 text-black stroke-[3px]" />
          </button>
        </form>

        <div className="space-y-4">
          <Link href="/sell" className="block border border-black px-8 py-2 text-xs font-black uppercase tracking-tighter text-center">
            SELL
          </Link>
          <Link href="/feed" className="block text-xs font-black uppercase tracking-tighter text-center">
            MY FEED
          </Link>
          <Link href="/messages" className="block text-xs font-black uppercase tracking-tighter text-center">
            MESSAGES
          </Link>
          <Link href="/favorites" className="block text-xs font-black uppercase tracking-tighter text-center">
            FAVORITES
          </Link>
        </div>
      </div>
    )}
    </>
  );
}