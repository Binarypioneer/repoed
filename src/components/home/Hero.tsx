"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=2070",
      brands: "DIOR, SAINT LAURENT + MORE",
      title: "Best of Hedi Slimane",
      buttonText: "SHOP NOW",
    },
    {
      image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=2070",
      brands: "BALENCIAGA, DR. MARTENS + MORE",
      title: "Boot Camp",
      buttonText: "SHOP NOW",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="group hero-viewport bg-black">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      {/* Content - Absolute center */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
        <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-4 drop-shadow-md">
          {slides[currentSlide].brands}
        </p>
        <h1 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter uppercase leading-none drop-shadow-xl">
          {slides[currentSlide].title}
        </h1>
        <button className="border-2 border-white bg-transparent px-12 py-3 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
          {slides[currentSlide].buttonText}
        </button>
      </div>
      
      {/* Arrows */}
      <div className="absolute inset-x-4 md:inset-x-8 top-1/2 -translate-y-1/2 z-30 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <button onClick={() => setCurrentSlide((s) => (s - 1 + slides.length) % slides.length)} className="pointer-events-auto">
          <ChevronLeft className="w-10 h-10 md:w-16 md:h-16 text-white" />
        </button>
        <button onClick={() => setCurrentSlide((s) => (s + 1) % slides.length)} className="pointer-events-auto">
          <ChevronRight className="w-10 h-10 md:w-16 md:h-16 text-white" />
        </button>
      </div>
    </section>
  );
}