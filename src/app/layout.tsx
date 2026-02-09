import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import CategoryBar from "../components/layout/CategoryBar";
import Footer from "../components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "REPOED | The Community Marketplace",
  description: "Buy, sell, and discover curated high-end fashion.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-white text-black selection:bg-black selection:text-white`}>
        {/* Fixed Header Container */}
        <header className="fixed top-0 z-50 w-full bg-white border-b border-gray-100">
          <Navbar />
          <CategoryBar />
        </header>
        
        {/* pt-[124px] is the exact height of the combined headers. 
            This prevents the Hero from being cut off. */}
        <main className="min-h-screen pt-[124px]">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}