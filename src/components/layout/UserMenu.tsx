"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { useState } from "react";

export default function UserMenu() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (!session) {
    return (
      <Link
        href="/auth/signin"
        className="text-xs font-black uppercase tracking-tighter hover:text-gray-600 transition-colors"
      >
        SIGN IN
      </Link>
    );
  }

  return (
    <div className="relative group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center overflow-hidden hover:bg-gray-200 transition-colors"
        title={session.user?.email || "User"}
      >
        <User className="h-5 w-5 text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg z-50 py-2">
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-xs font-black uppercase text-black truncate">
              {session.user?.name || session.user?.email}
            </p>
            <p className="text-[10px] text-gray-600 truncate mt-1">
              {session.user?.email}
            </p>
          </div>
          
          <Link
            href="/profile"
            className="block px-4 py-2 text-xs font-bold uppercase hover:bg-gray-100 transition-colors text-gray-800"
            onClick={() => setIsOpen(false)}
          >
            My Profile
          </Link>
          
          <Link
            href="/favorites"
            className="block px-4 py-2 text-xs font-bold uppercase hover:bg-gray-100 transition-colors text-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Favorites
          </Link>

          <div className="border-t border-gray-200 mt-2 pt-2">
            <button
              onClick={() => {
                setIsOpen(false);
                signOut({ redirect: true, callbackUrl: "/" });
              }}
              className="w-full text-left px-4 py-2 text-xs font-bold uppercase hover:bg-red-50 transition-colors text-red-600 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
