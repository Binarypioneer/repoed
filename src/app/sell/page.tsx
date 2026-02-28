"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Camera, Loader } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SellPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [size, setSize] = useState('');
  const [condition, setCondition] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/sell');
    }
  }, [status, router]);

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    const urls = Array.from(files).slice(0, 6).map((f) => URL.createObjectURL(f));
    setImages((s) => [...s, ...urls].slice(0, 6));
    // reset input so same file can be re-selected
    if (fileRef.current) fileRef.current.value = '';
  }

  function removeImage(idx: number) {
    setImages((prev) => {
      const next = [...prev];
      try { URL.revokeObjectURL(next[idx]); } catch (e) {}
      next.splice(idx, 1);
      return next;
    });
  }

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }
    if (!price.trim()) {
      alert('Please enter a price');
      return;
    }

    setIsSubmitting(true);
    try {
      const body = { title, description, price, brandName: brand || 'Unknown', categoryName: 'Uncategorized', images, condition };
      const res = await fetch('/api/listings', { method: 'POST', body: JSON.stringify(body) });
      
      if (res.status === 401) {
        router.push('/auth/signin?callbackUrl=/sell');
        return;
      }
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create listing');
      }
      
      const json = await res.json();
      // navigate to new listing
      window.location.href = `/listings/${json.id}`;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to publish listing';
      alert(message);
      setIsSubmitting(false);
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null; // Redirecting in useEffect
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <main className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row gap-12">
          {/* LEFT: FORM */}
          <div className="w-full md:w-2/3">
            <div className="mb-8 border-b pb-6">
              <h1 className="text-4xl font-black uppercase tracking-tighter">Sell   an   item</h1>
              <p className="text-sm text-gray-500 mt-3">List your item quickly — clear photos, accurate condition, and a fair price.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Photos */}
              <section>
                <h2 className="text-sm font-black uppercase tracking-widest mb-4">Photos</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <label className="aspect-square border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-black transition-colors bg-gray-50">
                    <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
                    <Camera size={28} className="text-gray-400 mb-2" />
                    <span className="text-[11px] font-black uppercase text-gray-600">Add photos</span>
                    <span className="text-[10px] text-gray-400 mt-2">up to 6</span>
                  </label>

                  {Array.from({ length: 5 }).map((_, i) => {
                    const src = images[i];
                    return src ? (
                      <div key={i} className="relative aspect-square bg-gray-100 overflow-hidden rounded">
                        <img src={src} alt={`preview-${i}`} className="object-cover w-full h-full" />
                        <button type="button" onClick={() => removeImage(i)} disabled={isSubmitting} className="absolute top-2 right-2 bg-white/90 p-1 rounded-full text-xs">✕</button>
                      </div>
                    ) : (
                      <div key={i} className="aspect-square bg-gray-100 border border-gray-200 rounded" />
                    );
                  })}
                </div>
              </section>

              {/* Details */}
              <section>
                <h2 className="text-sm font-black uppercase tracking-widest mb-4">Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest mb-2">Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="e.g. Vintage Celine Handbag" disabled={isSubmitting} className="w-full border border-gray-200 px-4 py-3 outline-none focus:border-black disabled:bg-gray-100" />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest mb-2">Brand</label>
                    <input value={brand} onChange={(e) => setBrand(e.target.value)} type="text" placeholder="e.g. Celine" disabled={isSubmitting} className="w-full border border-gray-200 px-4 py-3 outline-none focus:border-black disabled:bg-gray-100" />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest mb-2">Size</label>
                    <input value={size} onChange={(e) => setSize(e.target.value)} type="text" placeholder="e.g. M / 32" disabled={isSubmitting} className="w-full border border-gray-200 px-4 py-3 outline-none focus:border-black disabled:bg-gray-100" />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest mb-2">Condition</label>
                    <select value={condition} onChange={(e) => setCondition(e.target.value)} disabled={isSubmitting} className="w-full border border-gray-200 px-4 py-3 outline-none focus:border-black bg-white disabled:bg-gray-100">
                      <option value="">Select condition</option>
                      <option>Deadstock</option>
                      <option>Like New</option>
                      <option>Excellent</option>
                      <option>Good</option>
                      <option>Fair</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Description */}
              <section>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6} disabled={isSubmitting} placeholder="Add measurements, flaws, and any important details." className="w-full border border-gray-200 p-4 outline-none focus:border-black disabled:bg-gray-100" />
              </section>

              {/* Price */}
              <section>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2">Price (INR)</label>
                <div className="flex items-center gap-4 max-w-md">
                  <span className="text-2xl font-black">₹</span>
                  <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="0" disabled={isSubmitting} className="w-full border border-gray-200 px-4 py-3 text-2xl font-black outline-none focus:border-black disabled:bg-gray-100" />
                </div>
              </section>

              <div className="h-24 md:hidden" />
            </form>
          </div>

          {/* RIGHT: PREVIEW + ACTIONS */}
          <aside className="w-full md:w-1/3">
            <div className="sticky top-24 space-y-6">
              <div className="border p-6 rounded-lg shadow-sm bg-white">
                <div className="grid grid-cols-2 gap-1 rounded overflow-hidden h-44 bg-gray-50">
                  {images.length === 0
                    ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="bg-gray-100" />)
                    : images.slice(0, 4).map((src, idx) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={idx} src={src} alt={`thumb-${idx}`} className="object-cover w-full h-full" />
                      ))}
                </div>

                <h3 className="mt-4 font-black text-lg truncate">{title || 'Preview title'}</h3>
                <p className="text-sm text-gray-500">{brand || 'Brand'} — {size || 'Size'}</p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-2xl font-black">{price ? `₹${price}` : '₹Price'}</div>
                  <div className="text-xs uppercase text-gray-400">Shipping calculated at checkout</div>
                </div>
              </div>

              <div className="border p-4 rounded-lg">
                <button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-black text-white py-3 font-black uppercase disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Publishing...' : 'Publish'}
                </button>
                <button type="button" disabled={isSubmitting} className="w-full mt-3 text-xs font-black uppercase border border-gray-200 py-3 disabled:opacity-50 disabled:cursor-not-allowed">Save draft</button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function SelectionField({ label, placeholder, disabled = false }: { label?: string; placeholder: string; disabled?: boolean }) {
  return (
    <div className={`space-y-3 ${disabled ? 'opacity-40' : ''}`}>
      {label && <p className="text-[10px] font-black uppercase tracking-widest">{label}</p>}
      <div className="relative group">
        <div className={`flex items-center justify-between border border-gray-200 bg-gray-50 px-5 py-4 transition-all ${!disabled && 'hover:border-black cursor-pointer'}`}>
          <span className="text-sm font-bold uppercase tracking-tight text-gray-400">{placeholder}</span>
          <ChevronDown size={20} className="text-black" />
        </div>
      </div>
    </div>
  );
}