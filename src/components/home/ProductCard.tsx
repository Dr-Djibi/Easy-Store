import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/lib/types';

export default function ProductCard({
  product,
  currency,
}: {
  product: Product;
  currency: string;
}) {
  const mainImage = product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80';
  const isOutOfStock = product.stock <= 0;

  return (
    <Link
      href={`/produit/${product.slug}`}
      className="group flex flex-col rounded-3xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-1)] card-elevation-hover shadow-xs relative"
    >
      {/* CADRE IMAGE PRINCIPALE */}
      <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-surface-2)]">
        <Image
          src={mainImage}
          alt={product.nom}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
        />

        {/* BADGES D'ÉTAT */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {isOutOfStock ? (
            <span className="px-3 py-1 rounded-full bg-red-600/90 text-white text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md shadow-sm">
              Épuisé
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full bg-emerald-600/90 text-white text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md shadow-sm">
              En Stock
            </span>
          )}

          {product.images && product.images.length > 1 && (
            <span className="px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold backdrop-blur-md">
              {product.images.length} photos
            </span>
          )}
        </div>
      </div>

      {/* INFORMATIONS ARTICLE */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3 className="font-bold text-base sm:text-lg text-[var(--color-text)] line-clamp-2 leading-snug group-hover:text-[var(--color-accent)] transition-colors">
            {product.nom}
          </h3>
          {product.description && (
            <p className="text-xs sm:text-sm text-[var(--color-text-muted)] line-clamp-2 mt-1.5 leading-relaxed">
              {product.description.replace(/[#*`_!\[\]()|]/g, '')}
            </p>
          )}
        </div>

        {/* PRIX ET ACTION RAPIDE */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)]/60">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-[var(--color-text-muted)] tracking-wider">Prix</span>
            <span className="font-black text-lg sm:text-xl text-[var(--color-accent)] leading-tight">
              {formatPrice(product.prix, currency)}
            </span>
          </div>

          <span className="w-9 h-9 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] flex items-center justify-center text-[var(--color-text-muted)] group-hover:bg-[var(--color-accent)] group-hover:text-white group-hover:border-transparent transition-all duration-200 shadow-xs">
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
