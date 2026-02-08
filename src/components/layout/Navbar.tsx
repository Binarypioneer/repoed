"use client";

import Link from "next/link";
import { Search, MessageSquare, Heart, User } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="sticky top-0 z-50 w-full border-b-2 border-black bg-white px-4 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        
        {/* Animated Logo */}
        <Link href="/" className="animate-repoed">
          <span className="text-2xl font-black tracking-tighter text-black uppercase hover:animate-repoed">
            REPOED
          </span>
        </Link>

        {/* Custom Search Bar Section */}
        <div className="flex flex-1 items-center max-w-md">
          <div className="relative flex w-full border-1 border-black">
            {/* The Internal "SEARCH" box */}
            <div className="flex items-center bg-white px-3 border-r-1 border-black">
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
            
            <button className="bg-white px-3 hover:bg-gray-100 transition-colors border-l-1 border-black">
              <Search className="h-4 w-4 text-black stroke-[3px]" />
            </button>
          </div>
        </div>

        {/* Actions - Matching your image exactly */}
        <div className="flex items-center gap-8">
          {/* SELL Button - Boxed style */}
          <Link 
            href="/sell" 
            className="border-1 border-black px-8 py-2 text-xs font-black uppercase tracking-tighter hover:bg-black hover:text-white transition-all"
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
            {/* Round User Placeholder */}
            <Link href="/profile" className="h-8 w-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
              <User className="h-6 w-6 text-gray-400 mt-1" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}