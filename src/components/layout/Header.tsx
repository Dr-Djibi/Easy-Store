import Link from 'next/link';
import { ShoppingBag, PhoneCall } from 'lucide-react';
import type { StoreSettings } from '@/lib/types';

export default function Header({ settings }: { settings: StoreSettings }) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b border-[var(--color-border)] bg-[var(--color-bg)]/80">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          {settings.STORE_LOGO_URL ? (
            <img
              src={settings.STORE_LOGO_URL}
              alt={settings.STORE_NAME}
              className="h-10 w-auto rounded-lg object-contain"
            />
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg)] flex items-center justify-center font-black text-lg">
                M
              </div>
              <span className="font-bold text-lg tracking-tight text-[var(--color-text)]">
                {settings.STORE_NAME}
              </span>
            </div>
          )}
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/#produits"
            className="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors flex items-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4 text-[var(--color-accent)]" />
            <span className="hidden sm:inline">Boutique</span>
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors flex items-center gap-1.5"
          >
            <PhoneCall className="w-4 h-4 text-[var(--color-accent)]" />
            <span>Contact</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
