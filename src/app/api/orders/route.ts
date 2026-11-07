import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { product_id, product_nom, product_prix, quantite, montant, fields_data } = body;

    if (!product_nom || !montant) {
      return NextResponse.json({ error: 'Champs obligatoires manquants.' }, { status: 400 });
    }

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('orders')
      .insert({
        product_id: product_id || null,
        product_nom,
        product_prix: Number(product_prix) || 0,
        quantite: Number(quantite) || 1,
        montant: Number(montant) || 0,
        fields_data: fields_data || {},
        statut: 'nouveau',
      })
      .select()
      .single();

    if (error) {
      console.error('Erreur Supabase order:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, order: data }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
