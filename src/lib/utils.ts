import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(prix: number, currency: string = 'GNF'): string {
  const formatted = Math.round(prix).toLocaleString('fr-FR');
  return `${formatted} ${currency}`;
}

export function generateSlug(nom: string): string {
  return nom
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

export function buildWhatsAppLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
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
  for (const [key, val] of Object.entries(vars.champs)) {
    fieldsFormatted += `• ${key} : ${val}\n`;
  }

  return template
    .replace(/{produit}/g, String(vars.produit))
    .replace(/{quantite}/g, String(vars.quantite))
    .replace(/{montant}/g, String(vars.montant))
    .replace(/{devise}/g, vars.devise)
    .replace(/{champs}/g, fieldsFormatted.trim());
}
