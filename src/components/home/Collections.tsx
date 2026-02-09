"use client";

import Image from "next/image";
import Link from "next/link";

const COLLECTIONS = [
  {
    title: "Elevated Optics",
    subtitle: "JACQUES MARIE MAGE, CHROME HEARTS, ENFANTS RICHES DEPRIM...",
    link: "/collections/optics",
    images: [
      "https://images.unsplash.com/photo-1511499767390-a73359586174?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508243529287-e21914733111?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=500&auto=format&fit=crop",
    ],
  },
  {
    title: "The Denim Edit",
    subtitle: "FROM GRAILED",
    link: "/collections/denim",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604176354204-926873ff3da9?q=80&w=500&auto=format&fit=crop",
    ],
  },
  {
    title: "Gothic Universe",
    subtitle: "CHROME HEARTS, UGG, MAISON MARGIELA + MORE",
    link: "/collections/gothic",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539106602058-2aaec5979536?q=80&w=500&auto=format&fit=crop",
    ],
  },
];

export default function Collections() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {COLLECTIONS.map((col) => (
          <Link key={col.title} href={col.link} className="group cursor-pointer">
            {/* Header Text */}
            <div className="mb-4">
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-tighter truncate">
                {col.subtitle}
              </p>
              <h2 className="text-lg font-black uppercase tracking-tight group-hover:underline underline-offset-4 decoration-2">
                {col.title}
              </h2>
            </div>

            {/* Image Collage Grid */}
            <div className="grid grid-cols-2 gap-1 overflow-hidden border border-transparent group-hover:border-black transition-colors">
              {col.images.map((img, idx) => (
                <div key={idx} className="relative aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={img}
                    alt={`${col.title} item ${idx + 1}`}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* "+ VIEW MORE" Overlay on the last image */}
                  {idx === 3 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">
                        + VIEW MORE
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}