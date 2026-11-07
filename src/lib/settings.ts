import { createPublicServerClient } from './supabase/server';
import type { StoreSettings } from './types';

export async function getAllSettings(): Promise<StoreSettings> {
  const defaultSettings: StoreSettings = {
    STORE_NAME: 'Easy Store',
    STORE_LOGO_URL: '',
    STORE_BANNER_URL: '',
    STORE_BANNER_TITLE: 'L\'Excellence & Le Style',
    STORE_BANNER_SUBTITLE: 'Commandez facilement et recevez vos produits rapidement.',
    WHATSAPP_NUMBER: '224600000000',
    STORE_PHONE: '+224 600 00 00 00',
    STORE_INSTAGRAM: '',
    STORE_FACEBOOK: '',
    STORE_TIKTOK: '',
    CURRENCY: 'GNF',
    ORDER_MODE: 'whatsapp_form',
    ORDER_FIELDS: [
      { id: 'nom', label: 'Votre nom complet', type: 'text', required: true },
      { id: 'telephone', label: 'Numéro de téléphone', type: 'tel', required: true },
      { id: 'ville', label: 'Ville ou quartier', type: 'text', required: true }
    ],
    ORDER_WHATSAPP_MSG: '🛍️ *Nouvelle commande Easy Store*\n\nProduit : {produit}\nQuantité : {quantite}\nTotal : {montant} {devise}\n\nCoordonnées :\n{champs}',
    ORDER_SUCCESS_MSG: 'Votre commande a été transmise avec succès ! Nous vous redirigeons vers WhatsApp.',
    FOOTER_TEXT: '© Easy Store. Tous droits réservés.',
    THEME: 'dark-gold',
    STORE_COLOR: '#facc15'
  };

  try {
    const supabase = createPublicServerClient();
    const { data, error } = await supabase.from('settings').select('key, value');

    if (error || !data) {
      return defaultSettings;
    }

    const map: Record<string, string> = {};
    for (const item of data) {
      map[item.key] = item.value;
    }

    return {
      STORE_NAME: map.STORE_NAME || defaultSettings.STORE_NAME,
      STORE_LOGO_URL: map.STORE_LOGO_URL || defaultSettings.STORE_LOGO_URL,
      STORE_BANNER_URL: map.STORE_BANNER_URL || defaultSettings.STORE_BANNER_URL,
      STORE_BANNER_TITLE: map.STORE_BANNER_TITLE || defaultSettings.STORE_BANNER_TITLE,
      STORE_BANNER_SUBTITLE: map.STORE_BANNER_SUBTITLE || defaultSettings.STORE_BANNER_SUBTITLE,
      WHATSAPP_NUMBER: map.WHATSAPP_NUMBER || defaultSettings.WHATSAPP_NUMBER,
      STORE_PHONE: map.STORE_PHONE || defaultSettings.STORE_PHONE,
      STORE_INSTAGRAM: map.STORE_INSTAGRAM || defaultSettings.STORE_INSTAGRAM,
      STORE_FACEBOOK: map.STORE_FACEBOOK || defaultSettings.STORE_FACEBOOK,
      STORE_TIKTOK: map.STORE_TIKTOK || defaultSettings.STORE_TIKTOK,
      CURRENCY: map.CURRENCY || defaultSettings.CURRENCY,
      ORDER_MODE: (map.ORDER_MODE as 'whatsapp_form' | 'whatsapp_direct') || defaultSettings.ORDER_MODE,
      ORDER_FIELDS: (() => {
        if (!map.ORDER_FIELDS) return defaultSettings.ORDER_FIELDS;
        try { return JSON.parse(map.ORDER_FIELDS); } catch { return defaultSettings.ORDER_FIELDS; }
      })(),
      ORDER_WHATSAPP_MSG: map.ORDER_WHATSAPP_MSG || defaultSettings.ORDER_WHATSAPP_MSG,
      ORDER_SUCCESS_MSG: map.ORDER_SUCCESS_MSG || defaultSettings.ORDER_SUCCESS_MSG,
      FOOTER_TEXT: map.FOOTER_TEXT || defaultSettings.FOOTER_TEXT,
      THEME: map.THEME || defaultSettings.THEME,
      STORE_COLOR: map.STORE_COLOR || defaultSettings.STORE_COLOR,
    };
  } catch (e) {
    console.error('Erreur chargement settings:', e);
    return defaultSettings;
  }
}
