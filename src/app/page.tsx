import Link from "next/link";

// Mock data for initial design
const MOCK_LISTINGS = [
  { id: "1", title: "Archive Cargo Pants", brand: "Rick Owens", price: 450, size: "32", image: "https://via.placeholder.com/400x500" },
  { id: "2", title: "Boxy Graphic Tee", brand: "Balenciaga", price: 280, size: "L", image: "https://via.placeholder.com/400x500" },
  { id: "3", title: "Vintage Leather Jacket", brand: "Saint Laurent", price: 1200, size: "M", image: "https://via.placeholder.com/400x500" },
  { id: "4", title: "Split Toe Boots", brand: "Maison Margiela", price: 600, size: "43", image: "https://via.placeholder.com/400x500" },
];

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Hero Section / Banner */}
      <section className="mb-12 bg-black text-white p-12 rounded-sm flex flex-col items-center text-center">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">
          The Future of Resale
        </h1>
        <p className="text-gray-400 mb-6 max-w-md">
          Buy and sell the most coveted designers from the world's best closets.
        </p>
        <Link href="/shop" className="bg-white text-black px-8 py-3 font-bold uppercase text-sm hover:bg-gray-200 transition-colors">
          Shop All
        </Link>
      </section>

      {/* Product Feed Header */}
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-xl font-black uppercase tracking-tight">New Arrivals</h2>
        <Link href="/shop" className="text-sm font-bold underline underline-offset-4">View All</Link>
      </div>

      {/* Responsive Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {MOCK_LISTINGS.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            {/* Image Container */}
            <div className="relative aspect-3/4 overflow-hidden bg-gray-100 mb-3">
              <img 
                src={item.image} 
                alt={item.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Metadata */}
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase text-gray-500">{item.brand}</p>
              <h3 className="text-sm font-medium truncate">{item.title}</h3>
              <div className="flex justify-between items-baseline pt-1">
                <p className="text-sm font-bold">${item.price}</p>
                <p className="text-xs text-gray-400">Size {item.size}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}