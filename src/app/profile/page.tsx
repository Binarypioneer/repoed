import { prisma } from "../../lib/prisma";
import { getCurrentUser } from "../../lib/getCurrentUser";
import ProfileClient from "../../components/profile/ProfileClient";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 text-center">
      <h1 className="text-3xl font-black uppercase">Profile</h1>
      <p className="mt-6 text-gray-500">Sign in to view your dashboard.</p>
      <a href="/" className="mt-6 inline-block border border-black px-6 py-3 font-black uppercase">Sign in</a>
    </div>
  );

  const db = prisma as any;
  const [favoritesCount, forSaleCount, soldCount] = await Promise.all([
    db.favorite.count({ where: { userId: user.id } }),
    db.listing.count({ where: { sellerId: user.id, isSold: false } }),
    db.listing.count({ where: { sellerId: user.id, isSold: true } }),
  ]);

  const listings = await db.listing.findMany({ where: { sellerId: user.id }, include: { brand: true }, take: 9, orderBy: { createdAt: 'desc' } });

  const mapped = listings.map((l: any) => ({ id: l.id, brand: l.brand?.name ?? '', title: l.title, price: l.price, imageUrl: l.images?.[0] ?? '' }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <ProfileClient user={user} counts={{ favorites: favoritesCount, forSale: forSaleCount, sold: soldCount }} listings={mapped} />
    </div>
  );
}
