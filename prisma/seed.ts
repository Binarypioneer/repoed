import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('Seeding demo data...');

  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@repoed.test' },
    update: {},
    create: { email: 'demo@repoed.test', username: 'shreyasingh14018869', name: 'Shreya Singh', image: '' },
  });

  const brands = ['Rick Owens', 'Balenciaga', 'Maison Margiela', 'Celine'];
  const brandRecords = [] as any[];
  for (const name of brands) {
    const b = await prisma.brand.upsert({ where: { name }, update: {}, create: { name } });
    brandRecords.push(b);
  }

  const categories = ['Outerwear', 'Footwear', 'Tops'];
  const categoryRecords = [] as any[];
  for (const name of categories) {
    const c = await prisma.category.upsert({ where: { name }, update: {}, create: { name } });
    categoryRecords.push(c);
  }

  const listings = [
    { title: 'Archive Cargo Pants', price: 450, brand: brandRecords[0], category: categoryRecords[0], images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=900&auto=format&fit=crop'] },
    { title: 'Boxy Graphic Tee', price: 280, brand: brandRecords[1], category: categoryRecords[2], images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=900&auto=format&fit=crop'] },
    { title: 'Split Toe Boots', price: 600, brand: brandRecords[2], category: categoryRecords[1], images: ['https://images.unsplash.com/photo-1638247025967-b4e38f687b76?q=80&w=900&auto=format&fit=crop'] },
    { title: 'Mini Shoulder Bag', price: 980, brand: brandRecords[3], category: categoryRecords[2], images: ['https://images.unsplash.com/photo-1526178618496-6b39e3e184b6?q=80&w=900&auto=format&fit=crop'] },
  ];

  for (const l of listings) {
    // title is not unique in the schema, use findFirst + create to be idempotent
    const existing = await prisma.listing.findFirst({ where: { title: l.title } });
    if (!existing) {
      await prisma.listing.create({
        data: {
          title: l.title,
          description: `${l.title} — demo listing`,
          price: l.price,
          condition: 'Like New',
          images: l.images,
          brandId: l.brand.id,
          categoryId: l.category.id,
          sellerId: demoUser.id,
        },
      });
    }
  }

  const someListing = await prisma.listing.findFirst();
  if (someListing) {
    await prisma.favorite.upsert({ where: { userId_listingId: { userId: demoUser.id, listingId: someListing.id } as any }, update: {}, create: { userId: demoUser.id, listingId: someListing.id } as any });
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
