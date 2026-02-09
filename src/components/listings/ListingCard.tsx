import Link from "next/link";

interface ListingCardProps {
  id: string;
  brand: string;
  title: string;
  price: number;
  size: string;
  imageUrl: string;
}

export default function ListingCard({
  id,
  brand,
  title,
  price,
  size,
  imageUrl,
}: ListingCardProps) {
  return (
    <Link href={`/listings/${id}`} className="group block">
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