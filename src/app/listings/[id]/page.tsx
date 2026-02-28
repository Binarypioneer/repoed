import { prisma } from "../../../lib/prisma";
import ListingCard from "../../../components/listings/ListingCard";

export default async function ListingPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const db = prisma as any;
  const listing = await db.listing.findUnique({ where: { id }, include: { brand: true, seller: true } });
  if (!listing) return <div className="max-w-7xl mx-auto px-4 py-20">Listing not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="aspect-3/4 bg-gray-100 overflow-hidden">
            <img src={listing.images?.[0] ?? ''} alt={listing.title} className="w-full h-full object-cover" />
          </div>
        </div>

        <aside className="md:col-span-1">
          <h1 className="text-2xl font-black uppercase">{listing.title}</h1>
          <p className="text-sm text-gray-500 mt-2">{listing.brand?.name}</p>

          <div className="mt-6 text-3xl font-black">₹{listing.price}</div>

          <div className="mt-6">
            <h4 className="text-xs font-black uppercase text-gray-400">Seller</h4>
            <p className="mt-2">{listing.seller?.username ?? listing.seller?.name ?? 'Seller'}</p>
          </div>

          <div className="mt-6">
            <h4 className="text-xs font-black uppercase text-gray-400">Condition</h4>
            <p className="mt-2">{listing.condition}</p>
          </div>

          <div className="mt-8">
            <button className="w-full border border-black py-3 font-black uppercase">Make an offer</button>
          </div>
        </aside>
      </div>

      <div className="mt-10">
        <h3 className="text-sm font-black uppercase tracking-widest mb-4">Description</h3>
        <div className="prose max-w-none text-sm text-gray-700">{listing.description}</div>
      </div>
    </div>
  );
}
