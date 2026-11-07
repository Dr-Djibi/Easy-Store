import Link from 'next/link';
import { MessageCircle, Phone, Instagram, Facebook } from 'lucide-react';
import type { StoreSettings } from '@/lib/types';

export default function Footer({ settings }: { settings: StoreSettings }) {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface-1)] py-12 px-4 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h3 className="font-bold text-lg text-[var(--color-text)]">{settings.STORE_NAME}</h3>
          <p className="text-sm text-[var(--color-text-muted)] mt-1 max-w-sm">
            {settings.STORE_BANNER_SUBTITLE || 'Votre boutique de référence en ligne.'}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {settings.WHATSAPP_NUMBER && (
            <a
              href={`https://wa.me/${settings.WHATSAPP_NUMBER.replace(/\D/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
              title="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          )}
          {settings.STORE_PHONE && (
            <a
              href={`tel:${settings.STORE_PHONE}`}
              className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              title="Téléphone"
            >
              <Phone className="w-5 h-5" />
            </a>
          )}
          {settings.STORE_INSTAGRAM && (
            <a
              href={settings.STORE_INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          )}
          {settings.STORE_FACEBOOK && (
            <a
              href={settings.STORE_FACEBOOK}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              title="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-[var(--color-border)]/50 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--color-text-muted)] gap-3">
        <p>{settings.FOOTER_TEXT || `© ${new Date().getFullYear()} ${settings.STORE_NAME}. Tous droits réservés.`}</p>
        <div className="flex gap-4">
          <Link href="/contact" className="hover:underline">Contactez-nous</Link>
          <span>•</span>
          <Link href="/#produits" className="hover:underline">Tous les produits</Link>
        </div>
      </div>
    </footer>
  );
}
