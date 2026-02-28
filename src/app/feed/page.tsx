import { prisma } from "../../lib/prisma";
import FeedClient from "../../components/feed/FeedClient";

export default async function MyFeedPage() {
  // guard against missing DATABASE_URL during build (e.g. Vercel env not set yet)
  if (!process.env.DATABASE_URL) {
    // render an empty feed so build succeeds; real data will load at runtime
    return <FeedClient following={[]} recommended={[]} />;
  }

  const db = prisma as any;
  const recent = await db.listing.findMany({ include: { brand: true }, take: 8, orderBy: { createdAt: 'desc' } });
  const recommended = await db.listing.findMany({ include: { brand: true }, take: 8, where: { price: { lte: 600 } }, orderBy: { createdAt: 'desc' } });

  const map = (l: any) => ({ id: l.id, brand: l.brand?.name ?? '', title: l.title, price: l.price, size: '-', imageUrl: l.images?.[0] ?? '' });

  return <FeedClient following={recent.map(map)} recommended={recommended.map(map)} />;
}
