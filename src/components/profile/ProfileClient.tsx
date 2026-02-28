"use client";

import React, { useState } from "react";
import ListingCard from "../listings/ListingCard";

export default function ProfileClient({ user, counts, listings }: any) {
  const [section, setSection] = useState<string>("overview");

  return (
    <div className="flex gap-10">
      <aside className="hidden md:block w-72 shrink-0">
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest">Account</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <button onClick={() => setSection('overview')} className={`text-sm font-black uppercase tracking-wider text-black ${section === 'overview' ? 'underline' : ''}`}>
                  {user.username ?? user.name ?? 'Account'}
                </button>
              </li>
              <li>
                <button onClick={() => setSection('favorites')} className={`text-sm font-bold uppercase tracking-wider ${section === 'favorites' ? 'text-black' : 'text-gray-400'}`}>
                  Favorites
                </button>
              </li>
              <li>
                <button onClick={() => setSection('saved')} className={`text-sm font-bold uppercase tracking-wider ${section === 'saved' ? 'text-black' : 'text-gray-400'}`}>
                  Saved
                </button>
              </li>
              <li>
                <button onClick={() => setSection('closet')} className={`text-sm font-bold uppercase tracking-wider ${section === 'closet' ? 'text-black' : 'text-gray-400'}`}>
                  Closet
                </button>
              </li>
              <li>
                <button onClick={() => setSection('orders')} className={`text-sm font-bold uppercase tracking-wider ${section === 'orders' ? 'text-black' : 'text-gray-400'}`}>
                  Orders
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase text-gray-500 tracking-widest">Selling</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <button onClick={() => setSection('for-sale')} className={`text-sm font-bold uppercase ${section === 'for-sale' ? 'text-black' : 'text-gray-400'}`}>
                  For sale
                </button>
              </li>
              <li>
                <button onClick={() => setSection('sold')} className={`text-sm font-bold uppercase ${section === 'sold' ? 'text-black' : 'text-gray-400'}`}>
                  Sold
                </button>
              </li>
              <li>
                <button onClick={() => setSection('drafts')} className={`text-sm font-bold uppercase ${section === 'drafts' ? 'text-black' : 'text-gray-400'}`}>
                  Drafts
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase text-gray-500 tracking-widest">Settings</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <button onClick={() => setSection('settings')} className={`text-sm font-bold uppercase ${section === 'settings' ? 'text-black' : 'text-gray-400'}`}>
                  Profile settings
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <main className="flex-1">
        {section === 'overview' && (
          <div>
            <div className="flex items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="text-3xl font-black uppercase tracking-tighter">Welcome back</h1>
                <p className="text-sm text-gray-500 mt-2">Here’s a quick summary of your account.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="p-6 border border-gray-100">
                <p className="text-xs font-black uppercase text-gray-400">Favorites</p>
                <p className="mt-3 text-2xl font-black">{counts.favorites}</p>
              </div>
              <div className="p-6 border border-gray-100">
                <p className="text-xs font-black uppercase text-gray-400">For sale</p>
                <p className="mt-3 text-2xl font-black">{counts.forSale}</p>
              </div>
              <div className="p-6 border border-gray-100">
                <p className="text-xs font-black uppercase text-gray-400">Sold</p>
                <p className="mt-3 text-2xl font-black">{counts.sold}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-widest mb-4">Your active listings</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {listings.map((l: any) => (
                  <ListingCard key={l.id} id={l.id} brand={l.brand} title={l.title} price={l.price} size={'-'} imageUrl={l.imageUrl} />
                ))}
              </div>
            </div>
          </div>
        )}

        {section === 'favorites' && (
          <div className="mb-6">
            <h2 className="text-2xl font-black uppercase">Favorites</h2>
            <p className="text-sm text-gray-500 mt-2">Listings you’ve saved.</p>

            <div className="min-h-40 flex items-center justify-center text-center py-12 text-gray-500">
              <p>View your full favorites list <a href="/favorites" className="underline font-black">here</a>.</p>
            </div>
          </div>
        )}

        {section === 'for-sale' && (
          <div>
            <h2 className="text-2xl font-black uppercase mb-4">For sale</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {listings.map((l: any) => (
                <ListingCard key={l.id} id={l.id} brand={l.brand} title={l.title} price={l.price} size={'-'} imageUrl={l.imageUrl} />
              ))}
            </div>
          </div>
        )}

        {section === 'sold' && (
          <div className="min-h-40 flex items-center justify-center text-center py-12 text-gray-500">No sold items yet.</div>
        )}

        {section === 'drafts' && (
          <div className="min-h-40 flex items-center justify-center text-center py-12 text-gray-500">You have no drafts.</div>
        )}

        {section === 'orders' && (
          <div className="min-h-40 flex items-center justify-center text-center py-12 text-gray-500">You have no orders yet.</div>
        )}

        {section === 'settings' && (
          <div>
            <h2 className="text-2xl font-black uppercase mb-4">Profile settings</h2>
            <div className="p-6 border border-gray-100 text-sm text-gray-600">Profile settings UI goes here.</div>
          </div>
        )}

        {section === 'saved' && (
          <div className="min-h-40 flex items-center justify-center text-center py-12 text-gray-500">Saved searches and alerts will appear here.</div>
        )}

        {section === 'closet' && (
          <div className="min-h-40 flex items-center justify-center text-center py-12 text-gray-500">Your closet (wardrobe) is empty.</div>
        )}
      </main>
    </div>
  );
}