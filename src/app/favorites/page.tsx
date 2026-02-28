import { prisma } from "../../lib/prisma";
import { getCurrentUser } from "../../lib/getCurrentUser";
import ListingCard from "../../components/listings/ListingCard";
import { Heart } from "lucide-react";

export default async function FavoritesPage() {
  const user = await getCurrentUser();

  // if not signed in, render empty state prompting sign-in
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 text-center">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Favorites</h1>
        <p className="text-sm text-gray-500 mt-2">You will be notified when your favorite listings drop in price or are relisted.</p>

        <div className="min-h-80 flex flex-col items-center justify-center text-center py-20">
          <Heart className="h-36 w-36 text-gray-200 stroke-[2px]" />
          <p className="mt-8 text-gray-500">You haven't favorited any items yet!</p>
          <p className="mt-2 text-gray-500">Sign in to save listings and get price-drop alerts.</p>
          <a href="/" className="mt-8 inline-block border border-black px-6 py-3 text-xs font-black uppercase tracking-[0.2em]">Sign in</a>
        </div>
      </div>
    );
  }

  const db = prisma as any;
  const favs = await db.favorite.findMany({ where: { userId: user.id }, include: { listing: { include: { brand: true } } } });

  if (favs.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 text-center">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Favorites</h1>
        <p className="text-sm text-gray-500 mt-2">You will be notified when your favorite listings drop in price or are relisted.</p>

        <div className="min-h-80 flex flex-col items-center justify-center text-center py-20">
          <Heart className="h-36 w-36 text-gray-200 stroke-[2px]" />
          <p className="mt-8 text-gray-500">You haven't favorited any items yet!</p>
          <p className="mt-2 text-gray-500">Explore the feed and favorite items to get notified if they drop in price.</p>
          <a href="/feed" className="mt-8 inline-block border border-black px-6 py-3 text-xs font-black uppercase tracking-[0.2em]">Browse the feed</a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Favorites</h1>
        <p className="text-sm text-gray-500 mt-2">You will be notified when your favorite listings drop in price or are relisted.</p>
      </div>

      <div className="border-t border-b border-gray-100">
        <div className="flex items-center justify-between gap-8 px-2 md:px-0 max-w-6xl mx-auto py-6">
          <div className="text-sm font-black uppercase tracking-wider border-b-4 border-black pb-4">Listings</div>
          <div className="text-sm font-black uppercase tracking-wider text-gray-600">Searches</div>
          <div className="text-sm font-black uppercase tracking-wider text-gray-600">Designers</div>
          <div className="text-sm font-black uppercase tracking-wider text-gray-600">Sellers</div>
          <div className="text-sm font-black uppercase tracking-wider text-gray-600">Collections</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {favs.map((f: any) => (
          <ListingCard key={f.id} id={f.listing.id} brand={(f.listing as any).brand?.name ?? ''} title={f.listing.title} price={f.listing.price} size={"-"} imageUrl={f.listing.images?.[0] ?? ''} isFavorited={true} />
        ))}
      </div>
    </div>
  );
}
