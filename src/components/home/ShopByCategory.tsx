export default function ShopByCategory() {
  const MENS_ITEMS = [
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1591047134402-3939f3b7fc42?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1539106602058-2aaec5979536?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop",
  ];

  const WOMEN_ITEMS = [
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1604432123257-803a6f7ffb5c?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1483389127117-b6a2102724ae?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1638247025967-b4e38f687b76?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1511499767390-a73359586174?w=300&h=300&fit=crop",
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* Menswear Section */}
      <div>
        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter">Shop Menswear</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {MENS_ITEMS.map((img, i) => (
            <div key={i} className="aspect-square bg-[#F3F3F3] flex items-center justify-center p-4 group cursor-pointer">
              <img src={img} className="max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300" alt="item" />
            </div>
          ))}
        </div>
      </div>

      {/* Womenswear Section */}
      <div>
        <h2 className="text-2xl font-black uppercase mb-8 tracking-tighter">Shop Womenswear</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {WOMEN_ITEMS.map((img, i) => (
            <div key={i} className="aspect-square bg-[#F3F3F3] flex items-center justify-center p-4 group cursor-pointer">
              <img src={img} className="max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300" alt="item" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}