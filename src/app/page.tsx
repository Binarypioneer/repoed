import Hero from "../components/home/Hero";
import Collections from "../components/home/Collections";
import EditorialRow from "../components/home/EditorialRow";
import ShopByCategory from "../components/home/ShopByCategory";



export default function HomePage() {
  return (
    <div className="pb-20">
      {/* 1. Full-Width Hero (Outside the container) */}
      <Hero />

      {/* 2. Constrained Main Content Container */}
      <div className="max-w-1440px mx-auto px-4 md:px-8">
        
        {/* Layer 2: Main Collections (Elevated Optics, etc.) */}
        <div className="mt-8">
           <Collections />
        </div>

        {/* Layer 3: Editorial Grid (Statement Luxury, etc.) */}
        <EditorialRow />

        {/* Layer 4: Browse Categories */}
        <ShopByCategory />

      
      </div>
    </div>
  );
}