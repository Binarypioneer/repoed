"use client";

import React, { useState } from "react";
import ListingCard from "../../components/listings/ListingCard";
import Link from "next/link";

type Listing = {
  id: string;
  brand: string;
  title: string;
  price: number;
  size: string;
  imageUrl: string;
};

const FOLLOWING: Listing[] = [
  { id: "1", brand: "Rick Owens", title: "Archive Cargo Pants", price: 450, size: "32", imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=900&auto=format&fit=crop" },
  { id: "2", brand: "Balenciaga", title: "Boxy Graphic Tee", price: 280, size: "L", imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=900&auto=format&fit=crop" },
  { id: "3", brand: "Saint Laurent", title: "Vintage Leather Jacket", price: 1200, size: "M", imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=900&auto=format&fit=crop" },
  { id: "4", brand: "Maison Margiela", title: "Split Toe Boots", price: 600, size: "43", imageUrl: "https://images.unsplash.com/photo-1638247025967-b4e38f687b76?q=80&w=900&auto=format&fit=crop" },
];

const RECOMMENDED: Listing[] = [
  { id: "5", brand: "Jil Sander", title: "Minimal Trench Coat", price: 520, size: "M", imageUrl: "https://images.unsplash.com/photo-1520975913510-c7b3f3f7f2b8?q=80&w=900&auto=format&fit=crop" },
  { id: "6", brand: "Dries Van Noten", title: "Patterned Shirt", price: 210, size: "L", imageUrl: "https://images.unsplash.com/photo-1520975659145-1b1b6a3b7e2e?q=80&w=900&auto=format&fit=crop" },
  { id: "7", brand: "Gucci", title: "Vintage Trainer", price: 320, size: "42", imageUrl: "https://images.unsplash.com/photo-1519741491667-7f3f82d0e6d5?q=80&w=900&auto=format&fit=crop" },
  { id: "8", brand: "Celine", title: "Mini Shoulder Bag", price: 980, size: "One Size", imageUrl: "https://images.unsplash.com/photo-1526178618496-6b39e3e184b6?q=80&w=900&auto=format&fit=crop" },
];

export default function MyFeedPage() {
  const [tab, setTab] = useState<"following" | "recommended">("following");

  const listings = tab === "following" ? FOLLOWING : RECOMMENDED;

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
          <ListingCard key={l.id} {...l} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/shop" className="text-xs font-black uppercase tracking-[0.2em] px-6 py-3 border border-gray-200 hover:bg-gray-50">Explore more</Link>
      </div>
    </div>
  );
}
