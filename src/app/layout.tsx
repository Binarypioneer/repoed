import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "REPOED | The Community Marketplace",
  description: "Buy, sell, and discover curated high-end fashion.",
};

// Defining the props interface explicitly fixes the "Cannot find name LayoutProps" error
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-white text-black`}>
        {/* The Navbar stays at the top of every page */}
        <Navbar />
        
        <main className="min-h-screen">
          {children}
        </main>

        <footer className="border-t-2 border-black py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 text-center text-xs font-black uppercase tracking-widest text-black">
            © 2026 REPOED. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}