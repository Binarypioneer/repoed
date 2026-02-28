import ListingCard from "../../components/listings/ListingCard";
import { prisma } from "../../lib/prisma";

export default async function ShopPage({ searchParams }: { searchParams?: Promise<{ query?: string }> }) {
  if (!process.env.DATABASE_URL) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <p className="text-center text-gray-500">Loading shop…</p>
      </div>
    );
  }

  const params = await searchParams;
  const q = (params?.query ?? "").trim();

  const where = q ? { OR: [ { title: { contains: q, mode: 'insensitive' } }, { brand: { name: { contains: q, mode: 'insensitive' } } } ] } : {};
  const db = prisma as any;
  const listings = await db.listing.findMany({ where, include: { brand: true }, take: 48 });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">{q ? `Search results` : `Shop`}</h1>
          {q ? (
            <p className="text-sm text-gray-500 mt-2">Showing results for <span className="font-black">{params?.query}</span></p>
          ) : (
            <p className="text-sm text-gray-500 mt-2">Browse curated listings.</p>
          )}
        </div>
      </div>

      {listings.length === 0 ? (
        <div className="min-h-60 flex flex-col items-center justify-center text-center py-20">
          <p className="max-w-xl text-gray-600 leading-relaxed">No results found for <span className="font-black">{params?.query}</span>.</p>
          <a href="/feed" className="mt-8 text-sm font-black uppercase underline tracking-wider">Browse the feed</a>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {listings.map((l: any) => (
              <ListingCard key={l.id} id={l.id} brand={l.brand?.name ?? ''} title={l.title} price={l.price} size={'-'} imageUrl={l.images?.[0] ?? ''} />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <a href="/shop" className="text-xs font-black uppercase tracking-[0.2em] px-6 py-3 border border-gray-200 hover:bg-gray-50">See more</a>
          </div>
        </>
      )}
    </div>
  );
}
