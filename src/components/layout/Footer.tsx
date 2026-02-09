import Link from "next/link";
import { Instagram, Facebook, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  const links = [
    { name: "ABOUT", href: "/about" },
    { name: "YOUR PRIVACY CHOICES", href: "/privacy-choices" },
    { name: "HELP & FAQ", href: "/faq" },
    { name: "TERMS", href: "/terms" },
    { name: "PRIVACY", href: "/privacy" },
    { name: "TRUST", href: "/trust" },
    { name: "ACCESSIBILITY", href: "/accessibility" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <footer className="w-full bg-white border border-gray-200 py-10 px-4 mt-20">
      <div className="max-w-1400px mx-auto flex flex-wrap items-center justify-between gap-y-6">
        
        {/* Main Navigation Links */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[12px] font-bold uppercase tracking-tight hover:text-gray-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side: Socials & Copyright */}
        <div className="flex items-center gap-x-6">
          <div className="flex items-center gap-x-4">
           
            <Instagram className="w-5 h-5 cursor-pointer stroke-[1.5px]" />
            <Facebook className="w-5 h-5 cursor-pointer stroke-[1.5px]" />
            <Youtube className="w-5 h-5 cursor-pointer stroke-[1.5px]" />
            <Linkedin className="w-5 h-5 cursor-pointer stroke-[1.5px]" />
          </div>
          
          <div className="text-right ml-4">
            <p className="text-[11px] font-bold leading-tight uppercase">
              REPOED ©<br />2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}