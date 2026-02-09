import Hero from "../components/home/Hero";
import Collections from "../components/home/Collections";
import EditorialRow from "../components/home/EditorialRow";
import ShopByCategory from "../components/home/ShopByCategory";
import ListingCard from "../components/listings/ListingCard";

const MOCK_LISTINGS = [
  { id: "1", title: "Archive Cargo Pants", brand: "Rick Owens", price: 450, size: "32", imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1" },
  { id: "2", title: "Boxy Graphic Tee", brand: "Balenciaga", price: 280, size: "L", imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27" },
  { id: "3", title: "Vintage Leather Jacket", brand: "Saint Laurent", price: 1200, size: "M", imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5" },
  { id: "4", title: "Split Toe Boots", brand: "Maison Margiela", price: 600, size: "43", imageUrl: "https://images.unsplash.com/photo-1638247025967-b4e38f687b76" },
];

export default function HomePage() {
  return (
    <div className="pb-20">
      {/* 1. Full-Width Hero (Outside the container) */}
      <Hero />

      {/* 2. Constrained Main Content Container */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Layer 2: Main Collections (Elevated Optics, etc.) */}
        <div className="mt-8">
           <Collections />
        </div>

        {/* Layer 3: Editorial Grid (Statement Luxury, etc.) */}
        <EditorialRow />

        {/* Layer 4: Browse Categories */}
        <ShopByCategory />

        {/* Layer 5: The Product Feed */}
        <div className="mt-24">
          <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-4">
            <h2 className="text-sm font-black uppercase tracking-widest text-black">
              Staff Picks
            </h2>
            <button className="text-[10px] font-black uppercase underline underline-offset-4 hover:text-gray-500 transition-colors">
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {MOCK_LISTINGS.map((item) => (
              <ListingCard key={item.id} {...item} />
            ))}
          </div>
        </div>

      
      </div>
    </div>
  );
}