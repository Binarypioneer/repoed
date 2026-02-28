import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { authOptions } from "../../../lib/auth";

export async function GET() {
  const session = (await getServerSession(authOptions as any)) as Session | null;
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  const favs = await prisma.favorite.findMany({ where: { userId: user.id }, include: { listing: { include: { brand: true } } } });
  return NextResponse.json(favs.map(f => ({ id: f.id, createdAt: f.createdAt, listing: { ...f.listing, brand: (f.listing as any).brand?.name ?? null } })));
}

export async function POST(req: Request) {
  const session = (await getServerSession(authOptions as any)) as Session | null;
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  const body = await req.json();
  const listingId = body.listingId as string | undefined;
  if (!listingId) return NextResponse.json({ error: "listingId required" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const existing = await prisma.favorite.findUnique({ where: { userId_listingId: { userId: user.id, listingId } } as any });
  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
    return NextResponse.json({ removed: true });
  }

  const created = await prisma.favorite.create({ data: { userId: user.id, listingId } });
  return NextResponse.json(created);
}
