import Hero from "../components/home/Hero";
import Collections from "../components/home/Collections";
import EditorialRow from "../components/home/EditorialRow";
import ShopByCategory from "../components/home/ShopByCategory";
import ListingCard from "../components/listings/ListingCard";
import { prisma } from "../lib/prisma";

export default async function HomePage() {
  // during build, Vercel may not yet have the env var; avoid crashing
  if (!process.env.DATABASE_URL) {
    return (
      <div className="pb-20">
        <Hero />
      </div>
    );
  }

  const db = prisma as any;
  const recent = await db.listing.findMany({ include: { brand: true }, take: 4, orderBy: { createdAt: 'desc' } });

  return (
    <div className="pb-20">
      {/* 1. Full-Width Hero (Outside the container) */}
      <Hero />

      {/* 2. Constrained Main Content Container */}
      <div className="max-w-1440px mx-auto px-4 md:px-8">
        
        {/* Layer 2: Main Collections (Elevated Optics, etc.) */}
        <div className="mt-8">
           <Collections />
        </div>

        {/* Layer 3: Editorial Grid (Statement Luxury, etc.) */}
        <EditorialRow />

        {/* Layer 4: Browse Categories */}
        <ShopByCategory />

        {/* Latest listings (wired to backend) */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black uppercase">Latest listings</h2>
            <a href="/shop" className="text-xs font-black uppercase tracking-wider">See all</a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recent.map((r: any) => (
              <ListingCard key={r.id} id={r.id} brand={r.brand?.name ?? ''} title={r.title} price={r.price} size={'-'} imageUrl={r.images?.[0] ?? ''} />
            ))}
          </div>
        </section>
      
      </div>
    </div>
  );
}