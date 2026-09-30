'use client';

import { useState } from 'react';
import { EVENT_CONFIG } from '@/lib/config';
import { ZoomIn, X, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function GallerySection() {
  const { gallery } = EVENT_CONFIG;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  if (!gallery.enabled) {
    return null;
  }

  // Display initial 6 images, or all if showAll is true
  const displayedImages = showAll ? gallery.images : gallery.images.slice(0, 6);

  return (
    <section id="gallery" className="py-14 sm:py-20 bg-[#140514] text-[#FFF8F0] border-b border-zinc-800/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#f5bd4e] font-bold block mb-2">
            ✦ Visual Highlights ✦
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#fcf4e5] mb-3">
            Moments &amp; Memories
          </h2>
          <p className="text-zinc-300 text-xs sm:text-sm">
            Glimpses from past celebrations, traditional Jhijhiya performances, and festive Garba circles.
          </p>
        </div>

        {gallery.images.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
              {displayedImages.map((img, index) => (
                <div
                  key={index}
                  className="group relative rounded-lg overflow-hidden cursor-pointer bg-zinc-900 border border-zinc-800 aspect-[4/3]"
                  onClick={() => setSelectedImage(img.src)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                  {img.category && (
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] font-mono text-zinc-300 border border-white/10">
                      {img.category}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {gallery.images.length > 6 && (
              <div className="mt-8 text-center">
                <Button
                  onClick={() => setShowAll(!showAll)}
                  variant="secondary"
                  size="md"
                >
                  <span>{showAll ? 'Show Fewer Moments' : `View All Moments (${gallery.images.length})`}</span>
                  {showAll ? <ChevronUp className="w-4 h-4 ml-1.5" /> : <ChevronDown className="w-4 h-4 ml-1.5" />}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 rounded-lg border border-dashed border-zinc-800 bg-zinc-950/40">
            <ImageIcon className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-lg font-serif text-zinc-300 mb-1">Gallery Moments Coming Soon</h3>
            <p className="text-xs text-zinc-500">Photographs and videos will be updated post-rehearsal.</p>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 text-white flex items-center justify-center hover:bg-zinc-800 transition-colors z-50"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative max-w-4xl max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedImage}
                alt="Enlarged festival memory"
                className="max-w-full max-h-[85vh] rounded-lg object-contain shadow-2xl border border-zinc-800"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

