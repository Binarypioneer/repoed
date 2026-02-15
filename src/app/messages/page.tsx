"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function MessagesPage() {
  const [tab, setTab] = useState<"buy" | "sell">("buy");

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="flex gap-10">
        {/* LEFT: Sidebar */}
        <aside className="hidden md:block w-72 shrink-0">
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest">Messages</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="#" className="text-sm font-black uppercase tracking-wider text-black border-b border-transparent pb-2">Buy Messages</Link>
                </li>
                <li>
                  <Link href="#" className="text-sm font-bold uppercase tracking-wider text-gray-300">Orders</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase text-gray-500 tracking-widest">My account</h4>
              <ul className="mt-4 space-y-3">
                <li><Link href="#" className="text-sm font-bold uppercase text-gray-300">Profile settings</Link></li>
                <li><Link href="#" className="text-sm font-bold uppercase text-gray-300">Addresses</Link></li>
                <li><Link href="#" className="text-sm font-bold uppercase text-gray-300">My sizes</Link></li>
                <li><Link href="#" className="text-sm font-bold uppercase text-gray-300">Payments</Link></li>
                <li><Link href="#" className="text-sm font-bold uppercase text-gray-300">Notifications</Link></li>
                <li><Link href="#" className="text-sm font-bold uppercase text-gray-300">Devices</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase text-gray-500 tracking-widest">Help</h4>
            </div>
          </div>
        </aside>

        {/* RIGHT: Content */}
        <main className="flex-1">
          {/* Tabs */}
          <div className="border border-gray-100">
            <div className="flex w-full">
              <button
                onClick={() => setTab("buy")}
                className={`w-1/2 py-6 text-center font-black uppercase tracking-widest ${tab === "buy" ? "border-b-4 border-black bg-white" : "bg-gray-50 text-gray-400"}`}
              >
                Buy Messages
              </button>

              <button
                onClick={() => setTab("sell")}
                className={`w-1/2 py-6 text-center font-black uppercase tracking-widest ${tab === "sell" ? "border-b-4 border-black bg-white" : "bg-gray-50 text-gray-400"}`}
              >
                Sell Messages
              </button>
            </div>
          </div>

          {/* Empty state / message list */}
          <div className="min-h-90 flex flex-col items-center justify-center text-center py-20">
            <p className="max-w-xl text-gray-600 leading-relaxed">
              Your conversations will appear here when you make an offer, ask a question, or purchase an item.
            </p>

            <Link href="#" className="mt-8 text-sm font-black uppercase underline tracking-wider">
              Click Here to View Archived Messages
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
