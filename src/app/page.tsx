import { createPublicServerClient } from '@/lib/supabase/server';
import { getAllSettings } from '@/lib/settings';
import HeroBanner from '@/components/home/HeroBanner';
import ProductGrid from '@/components/home/ProductGrid';
import ReassuranceBar from '@/components/home/ReassuranceBar';
import WhyEasyphy from '@/components/home/WhyEasyphy';
import { Sparkles } from 'lucide-react';
import type { Product } from '@/lib/types';

export const revalidate = 60;

export default async function HomePage() {
  const settings = await getAllSettings();
  let products: Product[] = [];

  try {
    const supabase = createPublicServerClient();
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('actif', true)
      .order('created_at', { ascending: false })
      .limit(32);

    if (data) {
      products = data as Product[];
    }
  } catch (e) {
    console.error('Erreur chargement produits:', e);
  }

  return (
    <main className="min-h-screen">
      <HeroBanner settings={settings} />

      <WhyEasyphy />

      <section id="produits" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[var(--color-border)]/60">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-accent)] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Catalogue Easyphy
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[var(--color-text)] tracking-tight">
              Nos Articles en Rayon
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mt-1.5 max-w-lg leading-relaxed">
              Sélection exclusive d'articles authentiques, prêts pour livraison immédiate à domicile.
            </p>
          </div>

          <div className="text-xs font-extrabold text-[var(--color-accent)] bg-[var(--color-accent-glow)] border border-[var(--color-accent)]/20 px-3.5 py-1.5 rounded-full self-start sm:self-auto">
            {products.length} article(s) disponible(s)
          </div>
        </div>

        <ProductGrid products={products} currency={settings.CURRENCY} />
      </section>

      <ReassuranceBar />
    </main>
  );
}
