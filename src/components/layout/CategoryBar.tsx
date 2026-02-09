"use client";

import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const CATEGORIES_MENU = {
  
  MENSWEAR: {
    Tops: ["Long Sleeve T-Shirts", "Polos", "Shirts (Button Ups)", "Short Sleeve T-Shirts", "Sweaters & Knitwear", "Sweatshirts & Hoodies", "Tank Tops & Sleeveless", "Jerseys"],
    Bottoms: ["Casual Pants", "Cropped Pants", "Denim", "Leggings", "Overalls & Jumpsuits", "Shorts", "Sweatpants & Joggers", "Swimwear"],
    Outerwear: ["Bombers", "Cloaks & Capes", "Denim Jackets", "Heavy Coats", "Leather Jackets", "Light Jackets", "Parkas", "Raincoats", "Vests"],
    Footwear: ["Boots", "Casual Leather Shoes", "Formal Shoes", "Hi-Top Sneakers", "Low-Top Sneakers", "Sandals", "Slip Ons"],
    Accessories: ["Bags & Luggage", "Belts", "Glasses", "Gloves & Scarves", "Hats", "Jewelry & Watches", "Wallets", "Miscellaneous", "Socks & Underwear"],
    Tailoring: ["Blazers", "Formal Shirting", "Formal Trousers", "Suits", "Tuxedos", "Vests"],
  },
  WOMENSWEAR: {
    Tops: ["Blouses", "Bodysuits", "Button Ups", "Crop Tops", "Hoodies", "Long Sleeve T-Shirts", "Polos", "Short Sleeve T-Shirts", "Sweaters", "Sweatshirts"],
    Bottoms: ["Jeans", "Jumpsuits", "Leggings", "Maxi Skirts", "Midi Skirts", "Mini Skirts", "Pants", "Shorts", "Dresses", "Mini Dresses"],
    Outerwear: ["Blazers", "Bombers", "Coats", "Denim Jackets", "Down Jackets", "Fur & Faux Fur", "Jackets", "Leather Jackets", "Rain Jackets", "Vests"],
    Footwear: ["Boots", "Heels", "Platforms", "Mules", "Flats", "Hi-Top Sneakers", "Low-Top Sneakers", "Sandals", "Slip Ons"],
    Accessories: ["Belts", "Glasses", "Gloves", "Hair Accessories", "Hats", "Miscellaneous", "Scarves", "Socks & Intimates", "Sunglasses", "Wallets"],
    "Bags & Luggage": ["Backpacks", "Belt Bags", "Bucket Bags", "Clutches", "Crossbody Bags", "Handle Bags", "Hobo Bags", "Luggage & Travel", "Messengers & Satchels", "Mini Bags"],
  },
};

export default function CategoryBar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const categories = [ "MENSWEAR", "WOMENSWEAR", "SHOES", "COLLECTIONS", "EDITORIAL"];
  const categoriesWithMenu = ["MENSWEAR", "WOMENSWEAR"];

  return (
    <div 
      className="relative w-full border-b border-gray-200 bg-white z-40"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        {categories.map((cat) => (
          <div
            key={cat}
            onMouseEnter={() => categoriesWithMenu.includes(cat) && setActiveMenu(cat)}
            className="relative py-3 cursor-pointer group"
          >
            <div className="flex items-center gap-1">
              <span className={`text-[11px] font-bold uppercase tracking-tight transition-colors ${activeMenu === cat ? 'text-blue-600' : 'text-black'}`}>
                {cat}
              </span>
              {categoriesWithMenu.includes(cat) && (
                activeMenu === cat ? 
                <ChevronUp className="h-3 w-3 stroke-[3px] text-blue-600" /> : 
                <ChevronDown className="h-3 w-3 stroke-[3px]" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mega Menu Dropdown */}
      {activeMenu && categoriesWithMenu.includes(activeMenu) && CATEGORIES_MENU[activeMenu as keyof typeof CATEGORIES_MENU] && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-600 shadow-xl p-8 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-sm font-black uppercase mb-8">Shop By Category</h2>
            <div className="grid grid-cols-3 gap-8 lg:grid-cols-4 xl:grid-cols-5">
              {Object.entries(CATEGORIES_MENU[activeMenu as keyof typeof CATEGORIES_MENU]).map(([group, items]) => (
                <div key={group}>
                  <h3 className="text-xs font-bold uppercase mb-4">{group}</h3>
                  <ul className="space-y-3">
                    {items.map((item) => (
                      <li key={item}>
                        <Link href="#" className="text-xs font-medium text-gray-600 hover:text-black hover:underline underline-offset-4">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}