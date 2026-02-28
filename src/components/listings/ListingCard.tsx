"use client";

import Link from "next/link";
import { Heart as HeartIcon } from "lucide-react";
import { useState } from "react";

interface ListingCardProps {
  id: string;
  brand: string;
  title: string;
  price: number;
  size: string;
  imageUrl: string;
  isFavorited?: boolean;
}

export default function ListingCard({
  id,
  brand,
  title,
  price,
  size,
  imageUrl,
  isFavorited = false,
}: ListingCardProps) {
  const [fav, setFav] = useState(isFavorited);
  const [loading, setLoading] = useState(false);

  async function toggleFav(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    try {
      const res = await fetch('/api/favorites', { method: 'POST', body: JSON.stringify({ listingId: id }) });
      if (res.ok) setFav((s) => !s);
    } catch (err) {
      // ignore - user will sign in if unauthenticated
    } finally {
      setLoading(false);
    }
  }

  return (
    <Link href={`/listings/${id}`} className="group block relative">
      {/* Favorite button */}
      <button onClick={toggleFav} aria-label="toggle favorite" className={`absolute z-20 right-2 top-2 p-2 rounded-full bg-white/90 border ${fav ? 'border-black' : 'border-gray-200'} hover:scale-105 transition-transform`}>
        <HeartIcon className={`h-4 w-4 ${fav ? 'text-red-500' : 'text-gray-400'}`} />
      </button>

      {/* Image Container with Thick Border on Hover */}
      <div className="relative aspect-3/4 overflow-hidden bg-gray-100 border border-transparent group-hover:border-black transition-all duration-300">
        <img
          src={imageUrl}
          alt={`${brand} ${title}`}
          className="h-full w-full object-cover grayscale-20% group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
        />
        
        {/* Price Tag Overlay - Brutalist Style */}
        <div className="absolute bottom-0 left-0 bg-black px-3 py-1.5">
          <span className="text-xs font-black text-white tracking-tighter">
            ${price}
          </span>
        </div>
      </div>

      {/* Metadata Section */}
      <div className="mt-3 space-y-0.5 px-1">
        <div className="flex justify-between items-start">
          <p className="text-[10px] font-black uppercase tracking-widest text-black">
            {brand}
          </p>
          <p className="text-[10px] font-bold text-gray-400 uppercase">
            {size}
          </p>
        </div>
        
        <h3 className="truncate text-sm font-medium text-gray-800 group-hover:text-black transition-colors">
          {title}
        </h3>
        
        {/* Interaction hint visible only on hover */}
        <p className="text-[9px] font-black uppercase tracking-tighter text-black opacity-0 group-hover:opacity-100 transition-opacity pt-1">
          View Listing →
        </p>
      </div>
    </Link>
  );
}