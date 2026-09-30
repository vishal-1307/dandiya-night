'use client';
import { useState } from 'react';
import { EVENT_CONFIG } from '@/lib/config';

export default function GallerySection() {
  const { gallery } = EVENT_CONFIG;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  if (!gallery.enabled) {
    return null;
  }

  const categories = ['All', ...Array.from(new Set(gallery.images.map((img) => img.category).filter(Boolean)))];
  const filteredImages = activeCategory === 'All'
    ? gallery.images
    : gallery.images.filter((img) => img.category === activeCategory);

  return (
    <section id="gallery" className="py-20 md:py-24 bg-[#0F0A1A] text-amber-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4a017] font-semibold">Festive Highlights</span>
          <h2 className="text-4xl md:text-5xl font-serif text-amber-400 mt-2 mb-6 tracking-wide">
            Moments & Memories
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"></div>
          
          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-[#d4a017] text-[#0F0A1A] shadow-md font-semibold'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-amber-200 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredImages.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((img, index) => (
              <div 
                key={index} 
                className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer bg-zinc-800"
                onClick={() => setSelectedImage(img.src)}
              >
                <div className="aspect-w-4 aspect-h-3 md:aspect-none relative">
                  {/* Using standard img for masonry aspect ratio support */}
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-950/50 rounded-3xl border border-zinc-800 border-dashed">
            <svg className="w-16 h-16 text-zinc-700 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-2xl font-serif text-amber-100 mb-3">Gallery Coming Soon</h3>
            <p className="text-zinc-500">Photos and videos will be updated here post-event.</p>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-amber-400 transition-colors z-50"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full h-full max-w-6xl max-h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <img 
                src={selectedImage} 
                alt="Enlarged view" 
                className="max-w-full max-h-[90vh] object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
