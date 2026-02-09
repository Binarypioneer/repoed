import Link from "next/link";

const EDITS = [
  {
    category: "CHANEL, CHROME HEARTS, CARTIER +MORE",
    title: "Statement Luxury",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
    ],
  },
  {
    category: "SEIKO, OMEGA, CHROME HEARTS +MORE",
    title: "Luxury Attachments",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500",
      "https://images.unsplash.com/photo-1522312346375-d1ad0554243d?w=500",
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=500",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500",
    ],
  },
  {
    category: "CHROME HEARTS, BALENCIAGA +MORE",
    title: "Chromed Out",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500",
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=500",
    ],
  },
];

export default function EditorialRow() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {EDITS.map((edit) => (
          <Link key={edit.title} href="#" className="group">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-tight">
              {edit.category}
            </p>
            <h3 className="text-xl font-black uppercase mb-4 tracking-tighter">
              {edit.title}
            </h3>
            <div className="grid grid-cols-2 gap-1 overflow-hidden border border-transparent group-hover:border-black transition-all">
              {edit.images.map((img, i) => (
                <div key={i} className="relative aspect-square bg-gray-100 overflow-hidden">
                  <img 
                    src={img} 
                    alt="" 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                  />
                  {i === 3 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">+ VIEW MORE</span>
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