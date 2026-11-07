import Link from 'next/link';
import { ShoppingBag, PhoneCall, Sparkles } from 'lucide-react';
import type { StoreSettings } from '@/lib/types';
import ThemeToggle from './ThemeToggle';

export default function Header({ settings }: { settings: StoreSettings }) {
  const storeInitial = (settings.STORE_NAME || 'Z')[0].toUpperCase();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b border-[var(--color-border)] bg-[var(--color-bg)]/85 transition-colors">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* LOGO & NOM DE LA BOUTIQUE */}
        <Link href="/" className="flex items-center gap-2.5 group">
          {settings.STORE_LOGO_URL ? (
            <img
              src={settings.STORE_LOGO_URL}
              alt={settings.STORE_NAME}
              className="h-10 w-auto rounded-xl object-contain border border-[var(--color-border)]"
            />
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] text-white font-black text-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                {storeInitial}
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors leading-tight">
                  {settings.STORE_NAME}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-accent)] flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  Boutique Officielle
                </span>
              </div>
            </div>
          )}
        </Link>

        {/* NAVIGATION & ACTIONS RAPIDES */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/#produits"
            className="px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-all flex items-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4 text-[var(--color-accent)]" />
            <span className="hidden sm:inline">Catalogue</span>
          </Link>

          <Link
            href="/contact"
            className="px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-all flex items-center gap-1.5"
          >
            <PhoneCall className="w-4 h-4 text-[var(--color-accent)]" />
            <span>Contact</span>
          </Link>

          {/* SÉLECTEUR DE THÈME CLAIR / SOMBRE */}
          <div className="pl-1 border-l border-[var(--color-border)]">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
