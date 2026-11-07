import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(prix: number, currency: string = 'GNF'): string {
  const formatted = Math.round(prix || 0).toLocaleString('fr-FR');
  return `${formatted} ${currency}`;
}

export function generateSlug(nom: string): string {
  return (nom || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

export function buildWhatsAppLink(phone: string, message: string): string {
  const cleanPhone = (phone || '').replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message || '')}`;
}

export function buildOrderMessage(
  template: string,
  vars: {
    produit: string;
    quantite: number | string;
    montant: number | string;
    devise: string;
    champs: Record<string, string>;
  }
): string {
  let fieldsFormatted = '';
  if (vars.champs && typeof vars.champs === 'object') {
    for (const [key, val] of Object.entries(vars.champs)) {
      fieldsFormatted += `• ${key} : ${val}\n`;
    }
  }

  const tmpl = template || '🛍️ *Nouvelle commande Menma Store*\n\nProduit : {produit}\nQuantité : {quantite}\nTotal : {montant} {devise}\n\nCoordonnées :\n{champs}';

  return tmpl
    .replace(/{produit}/g, String(vars.produit || ''))
    .replace(/{quantite}/g, String(vars.quantite || 1))
    .replace(/{montant}/g, String(vars.montant || 0))
    .replace(/{devise}/g, vars.devise || '')
    .replace(/{champs}/g, fieldsFormatted.trim());
}
