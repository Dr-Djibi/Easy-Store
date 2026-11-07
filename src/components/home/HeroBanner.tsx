import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, Sparkles } from 'lucide-react';
import type { StoreSettings } from '@/lib/types';

export default function HeroBanner({ settings }: { settings: StoreSettings }) {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden px-4 py-16">
      {settings.STORE_BANNER_URL ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={settings.STORE_BANNER_URL}
            alt="Bannière"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/80 to-[var(--color-bg)]/40" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--color-surface-2),_transparent_70%)]" />
      )}

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-1)]/80 backdrop-blur-md text-xs font-semibold text-[var(--color-accent)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Nouvelle Collection Disponible</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[var(--color-text)] leading-tight">
          {settings.STORE_BANNER_TITLE}
        </h1>

        <p className="text-base sm:text-xl text-[var(--color-text-muted)] max-w-xl mx-auto font-normal">
          {settings.STORE_BANNER_SUBTITLE}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#produits"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg)] font-bold text-sm tracking-wide shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Découvrir nos articles</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto px-6 py-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] text-[var(--color-text)] font-semibold text-sm hover:border-[var(--color-accent)] transition-all"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  );
}
