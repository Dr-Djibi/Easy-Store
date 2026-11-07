import ProductCard from './ProductCard';
import type { Product } from '@/lib/types';
import { PackageX } from 'lucide-react';

export default function ProductGrid({
  products,
  currency,
}: {
  products: Product[];
  currency: string;
}) {
  if (!products || products.length === 0) {
    return (
      <div className="py-20 text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center mx-auto mb-4 text-[var(--color-text-muted)]">
          <PackageX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-[var(--color-text)]">Aucun article pour le moment</h3>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">Revenez très bientôt pour découvrir nos nouveautés.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} currency={currency} />
      ))}
    </div>
  );
}
