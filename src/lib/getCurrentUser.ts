import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { authOptions } from "./auth";
import { prisma } from "./prisma";

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions as any)) as Session | null;
  if (!session?.user?.email) return null;
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  return user;
}
