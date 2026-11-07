import Link from 'next/link';
import { MessageCircle, Phone, ArrowUpRight } from 'lucide-react';
import type { StoreSettings } from '@/lib/types';

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function Footer({ settings }: { settings: StoreSettings }) {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface-1)] py-14 px-4 mt-24 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        {/* IDENTITÉ */}
        <div className="space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-black text-xl text-[var(--color-text)] tracking-tight">
              {settings.STORE_NAME}
            </span>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] max-w-sm leading-relaxed">
            {settings.STORE_BANNER_SUBTITLE || 'Votre boutique de référence en ligne taillée pour l\'Afrique.'}
          </p>
        </div>

        {/* LIENS SOCIAUX ET MESSAGERIE */}
        <div className="flex items-center gap-3">
          {settings.WHATSAPP_NUMBER && (
            <a
              href={`https://wa.me/${settings.WHATSAPP_NUMBER.replace(/\D/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 font-bold text-xs flex items-center gap-2 hover:bg-emerald-500/20 transition-all shadow-xs"
              title="Discuter sur WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          )}
          {settings.STORE_PHONE && (
            <a
              href={`tel:${settings.STORE_PHONE}`}
              className="w-10 h-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)] transition-all shadow-xs"
              title="Téléphone"
            >
              <Phone className="w-4 h-4" />
            </a>
          )}
          {settings.STORE_INSTAGRAM && (
            <a
              href={settings.STORE_INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)] transition-all shadow-xs"
              title="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          )}
          {settings.STORE_FACEBOOK && (
            <a
              href={settings.STORE_FACEBOOK}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)] transition-all shadow-xs"
              title="Facebook"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-[var(--color-border)]/60 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--color-text-muted)] gap-4">
        <p>{settings.FOOTER_TEXT || `© ${new Date().getFullYear()} ${settings.STORE_NAME}. Tous droits réservés.`}</p>
        <div className="flex items-center gap-6 font-semibold">
          <Link href="/#produits" className="hover:text-[var(--color-text)] transition-colors">
            Catalogue
          </Link>
          <Link href="/contact" className="hover:text-[var(--color-text)] transition-colors">
            Support & Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
