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
  const { slug } = await params;
  const supabase = createPublicServerClient();
  const { data: product } = await supabase
    .from('products')
    .select('nom, description, images')
    .eq('slug', slug)
    .single();

  if (!product) return { title: 'Produit introuvable' };

  return {
    title: product.nom,
    description: product.description || `Découvrez ${product.nom} sur Menma Store.`,
    openGraph: {
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProduitPage({ params }: Props) {
  const { slug } = await params;
  const settings = await getAllSettings();
  const supabase = createPublicServerClient();

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!product || !product.actif) {
    notFound();
  }

  return <ProductPageClient product={product as Product} settings={settings} />;
}
