import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { authOptions } from "../../../lib/auth";

export async function POST(req: Request) {
  const session = (await getServerSession(authOptions as any)) as Session | null;
  if (!session?.user) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  const body = await req.json();

  // Find user by email or phone
  let user = null;
  if (session.user.email) {
    user = await prisma.user.findUnique({ where: { email: session.user.email } });
  } else {
    const userPhone = (session.user as any).phone;
    if (userPhone) {
      user = await prisma.user.findUnique({ where: { phone: userPhone } });
    }
  }
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { title, description, price, brandName, categoryName, images = [], condition = "Good" } = body;
  if (!title || !price || !brandName || !categoryName) return NextResponse.json({ error: "missing fields" }, { status: 400 });

  // find-or-create brand and category
  const brand = await prisma.brand.upsert({ where: { name: brandName }, update: {}, create: { name: brandName } });
  const category = await prisma.category.upsert({ where: { name: categoryName }, update: {}, create: { name: categoryName } });

  const listing = await prisma.listing.create({
    data: {
      title,
      description: description ?? "",
      price: Number(price),
      condition,
      images,
      brandId: brand.id,
      categoryId: category.id,
      sellerId: user.id,
    },
  });

  return NextResponse.json(listing);
}
