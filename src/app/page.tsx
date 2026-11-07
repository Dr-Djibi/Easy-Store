import { createPublicServerClient } from '@/lib/supabase/server';
import { getAllSettings } from '@/lib/settings';
import HeroBanner from '@/components/home/HeroBanner';
import ProductGrid from '@/components/home/ProductGrid';
import ReassuranceBar from '@/components/home/ReassuranceBar';
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
      .limit(24);

    if (data) {
      products = data as Product[];
    }
  } catch (e) {
    console.error('Erreur chargement produits:', e);
  }

  return (
    <main className="min-h-screen">
      <HeroBanner settings={settings} />

      <section id="produits" className="max-w-6xl mx-auto px-4 py-12 scroll-mt-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-text)] tracking-tight">
              Nos Articles
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              Sélection exclusive d'articles disponibles à la commande.
            </p>
          </div>
        </div>

        <ProductGrid products={products} currency={settings.CURRENCY} />
      </section>

      <ReassuranceBar />
    </main>
  );
}
