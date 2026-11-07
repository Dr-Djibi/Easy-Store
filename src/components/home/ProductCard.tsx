import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
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

  return (
    <Link
      href={`/produit/${product.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-1)] hover:border-[var(--color-accent)]/50 transition-all duration-300"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-surface-2)]">
        <img
          src={mainImage}
          alt={product.nom}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.stock <= 0 && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-red-600/90 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            Épuisé
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3 className="font-semibold text-base sm:text-lg text-[var(--color-text)] line-clamp-2 leading-snug group-hover:text-[var(--color-accent)] transition-colors">
            {product.nom}
          </h3>
          {product.description && (
            <p className="text-xs sm:text-sm text-[var(--color-text-muted)] line-clamp-2 mt-1">
              {product.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]/50">
          <span className="font-black text-base sm:text-xl text-[var(--color-accent)]">
            {formatPrice(product.prix, currency)}
          </span>

          <span className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-bg)] group-hover:border-transparent transition-all">
            <ShoppingBag className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
