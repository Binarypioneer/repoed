"use client";

import React, { useState } from "react";
import ListingCard from "../listings/ListingCard";

type Listing = {
  id: string;
  brand: string;
  title: string;
  price: number;
  size: string;
  imageUrl: string;
};

export default function FeedClient({ following, recommended }: { following: Listing[]; recommended: Listing[] }) {
  const [tab, setTab] = useState<"following" | "recommended">("following");
  const listings = tab === "following" ? following : recommended;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">My Feed</h1>
          <p className="text-sm text-gray-500 mt-2">Listings from sellers you follow and curated recommendations.</p>
        </div>

        <div className="flex items-center gap-3 bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setTab("following")}
            aria-pressed={tab === "following"}
            className={`px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors rounded-full ${tab === "following" ? "bg-black text-white" : "text-gray-600 hover:bg-white"}`}
          >
            Following
          </button>

          <button
            onClick={() => setTab("recommended")}
            aria-pressed={tab === "recommended"}
            className={`px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors rounded-full ${tab === "recommended" ? "bg-black text-white" : "text-gray-600 hover:bg-white"}`}
          >
            Recommended
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {listings.map((l) => (
          <ListingCard key={l.id} id={l.id} brand={l.brand} title={l.title} price={l.price} size={l.size} imageUrl={l.imageUrl} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a href="/shop" className="text-xs font-black uppercase tracking-[0.2em] px-6 py-3 border border-gray-200 hover:bg-gray-50">Explore more</a>
      </div>
    </div>
  );
}
