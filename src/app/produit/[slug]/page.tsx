import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { createPublicServerClient } from '@/lib/supabase/server';
import { getAllSettings } from '@/lib/settings';
import ProductPageClient from './ProductPageClient';
import type { Product } from '@/lib/types';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const supabase = createPublicServerClient();
    const { data: product } = await supabase
      .from('products')
      .select('nom, description, images')
      .eq('slug', slug)
      .maybeSingle();

    if (!product) return { title: 'Produit introuvable' };

    return {
      title: product.nom,
      description: product.description || `Découvrez ${product.nom} sur Easy Store.`,
      openGraph: {
        images: product.images?.[0] ? [product.images[0]] : [],
      },
    };
  } catch {
    return { title: 'Produit introuvable' };
  }
}

export default async function ProduitPage({ params }: Props) {
  const { slug } = await params;
  const settings = await getAllSettings();

  try {
    const supabase = createPublicServerClient();
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error || !product || !product.actif) {
      notFound();
    }

    return <ProductPageClient product={product as Product} settings={settings} />;
  } catch {
    notFound();
  }
}
