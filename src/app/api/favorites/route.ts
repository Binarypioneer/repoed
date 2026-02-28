import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Using @ alias for cleaner imports
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ 
    where: { email: session.user.email } 
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const favs = await prisma.favorite.findMany({
    where: { userId: user.id },
    include: {
      listing: {
        include: {
          brand: true,
        },
      },
    },
  });

  // Explicitly typing the map function to fix the "implicit any" error
  const response = favs.map((f: typeof favs[number]) => ({
    id: f.id,
    createdAt: f.createdAt,
    listing: {
      ...f.listing,
      // Safely access brand name through the relation
      brand: f.listing.brand?.name ?? null,
    },
  }));

  return NextResponse.json(response);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  const { listingId } = await req.json();

  if (!listingId) {
    return NextResponse.json({ error: "listingId required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ 
    where: { email: session.user.email } 
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Check if it already exists to toggle favorite (Like/Unlike logic)
  const existing = await prisma.favorite.findUnique({
    where: {
      userId_listingId: {
        userId: user.id,
        listingId: listingId,
      },
    },
  });

  if (existing) {
    await prisma.favorite.delete({
      where: { id: existing.id },
    });
    return NextResponse.json({ status: "removed" });
  }

  const created = await prisma.favorite.create({
    data: {
      userId: user.id,
      listingId: listingId,
    },
  });

  return NextResponse.json(created);
}