'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import ContentBlockRenderer from '@/components/product/ContentBlockRenderer';
import RichDescriptionRenderer from '@/components/product/RichDescriptionRenderer';
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
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* BOUTON RETOUR AVEC FIL D'ARIANE */}
      <Link
        href="/#produits"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)] transition-all mb-8 shadow-xs"
      >
        <ChevronLeft className="w-4 h-4 text-[var(--color-accent)]" />
        <span>Retour à la boutique</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* GALERIE D'IMAGES DU PRODUIT */}
        <div className="space-y-4 lg:sticky lg:top-24">
          <div className="aspect-square w-full rounded-3xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-1)] relative shadow-md">
            <Image
              src={images[activeImage]}
              alt={product.nom}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-all duration-300"
              priority
            />

            {/* Badge état stock */}
            <div className="absolute top-4 left-4">
              {product.stock > 0 ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-bold shadow-md backdrop-blur-md">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  En Stock ({product.stock} dispo)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-bold shadow-md backdrop-blur-md">
                  Rupture Temporaire
                </span>
              )}
            </div>
          </div>

          {/* MINIATURES CARROUSEL */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 pt-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition-all relative ${
                    activeImage === idx
                      ? 'border-[var(--color-accent)] ring-4 ring-[var(--color-accent)]/20 scale-102'
                      : 'border-[var(--color-border)] opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DÉTAILS DU PRODUIT, TUNNEL WHATSAPP & DESCRIPTION */}
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-accent)] uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3" />
              Article Certifié Conforme
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--color-text)] tracking-tight leading-tight">
              {product.nom}
            </h1>
          </div>

          {/* TUNNEL DE COMMANDE CONVERSATIONNEL WHATSAPP */}
          <OrderTunnel product={product} settings={settings} />

          {/* FICHE DESCRIPTIVE WYSIWYG */}
          {product.description && (
            <div className="pt-6 border-t border-[var(--color-border)]">
              <h3 className="text-xl font-extrabold text-[var(--color-text)] tracking-tight mb-2">
                Détails & Spécifications
              </h3>
              <RichDescriptionRenderer description={product.description} />
            </div>
          )}

          {/* BLOCS DE PERSUASION (MAESTRO) */}
          <ContentBlockRenderer blocks={product.content_blocks} />
        </div>
      </div>
    </div>
  );
}
