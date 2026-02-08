import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "REPOED | The Community Marketplace",
  description: "Buy, sell, and discover curated high-end fashion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-white text-black`}>
        {/* The Navbar stays at the top of every page */}
        <Navbar />
        
        <main className="min-h-screen">
          {children}
        </main>

        {/* You can add a Footer component here later */}
        <footer className="border-t border-gray-200 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
            © 2026 REPOED. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}