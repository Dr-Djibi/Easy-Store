'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import ContentBlockRenderer from '@/components/product/ContentBlockRenderer';
import OrderTunnel from '@/components/product/OrderTunnel';
import type { Product, StoreSettings } from '@/lib/types';

export default function ProductPageClient({
  product,
  settings,
}: {
  product: Product;
  settings: StoreSettings;
}) {
  const images = product.images?.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'];

  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link
        href="/#produits"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Retour à la boutique</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* Galerie */}
        <div className="space-y-4 sticky top-24">
          <div className="aspect-square w-full rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-1)] relative">
            <Image
              src={images[activeImage]}
              alt={product.nom}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-all duration-300"
              priority
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border shrink-0 transition-all relative ${
                    activeImage === idx
                      ? 'border-[var(--color-accent)] ring-2 ring-[var(--color-accent)]/30'
                      : 'border-[var(--color-border)] opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Détails & Commande */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-[var(--color-text)] tracking-tight">
              {product.nom}
            </h1>
            {product.description && (
              <p className="text-base text-[var(--color-text-muted)] mt-3 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          <OrderTunnel product={product} settings={settings} />

          {/* Rendu des blocs de persuasion (style Maestro / Landing) */}
          <ContentBlockRenderer blocks={product.content_blocks} />
        </div>
      </div>
    </div>
  );
}
