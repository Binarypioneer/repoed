import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "./prisma";
import { verifyEmailCode, verifyPhoneCode} from "./verification";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as any),
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    
    // Credentials Provider for Email with verification code
    CredentialsProvider({
      id: "email-code",
      name: "Email Code",
      credentials: {
        email: { label: "Email", type: "text" },
        code: { label: "Verification Code", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.code) return null;

        // Verify the code
        const isValid = await verifyEmailCode(credentials.email, credentials.code);
        if (!isValid) return null;

        // Find or create user
        let user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: credentials.email,
              name: credentials.email.split("@")[0],
              emailVerified: new Date(),
            },
          });
        } else {
          // Mark email as verified
          await prisma.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() },
          });
        }

        return user as any;
      },
    }),

    // Credentials Provider for Phone with verification code
    CredentialsProvider({
      id: "phone-code",
      name: "Phone Code",
      credentials: {
        phone: { label: "Phone Number", type: "text" },
        code: { label: "Verification Code", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.code) return null;

        // Verify the code
        const isValid = await verifyPhoneCode(credentials.phone, credentials.code);
        if (!isValid) return null;

        // Find or create user by phone
        let user = await prisma.user.findUnique({
          where: { phone: credentials.phone },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              phone: credentials.phone,
              name: `User ${credentials.phone.slice(-4)}`,
              phoneVerified: new Date(),
            },
          });
        } else {
          // Mark phone as verified
          await prisma.user.update({
            where: { id: user.id },
            data: { phoneVerified: new Date() },
          });
        }

        return user as any;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/signin" },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.phone = (user as any).phone;
      }
      if (account?.provider === "google") {
        token.googleId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).phone = token.phone;
      }
      return session;
    },
  },
};
