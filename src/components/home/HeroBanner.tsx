import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, Sparkles, ShieldCheck, Zap, MessageCircle } from 'lucide-react';
import type { StoreSettings } from '@/lib/types';

export default function HeroBanner({ settings }: { settings: StoreSettings }) {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[82vh] flex items-center justify-center overflow-hidden px-4 py-20">
      {settings.STORE_BANNER_URL ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={settings.STORE_BANNER_URL}
            alt="Bannière Boutique"
            fill
            sizes="100vw"
            className="object-cover scale-102 transition-transform duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/85 to-[var(--color-bg)]/40" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--color-surface-2),_var(--color-bg)_70%)]" />
      )}

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-7">
        {/* BADGE D'ACCUEIL */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-1)]/90 backdrop-blur-xl text-xs font-bold text-[var(--color-accent)] shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Nouvelle Collection 2026 • Commandes Ouvertes</span>
        </div>

        {/* TITRE PRINCIPAL HAUT CONTRASTE */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[var(--color-text)] leading-[1.08]">
          {settings.STORE_BANNER_TITLE}
        </h1>

        {/* SOUS-TITRE LISIBLE */}
        <p className="text-base sm:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto font-normal leading-relaxed">
          {settings.STORE_BANNER_SUBTITLE}
        </p>

        {/* BOUTONS D'ACTION */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="#produits"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] text-white font-extrabold text-sm sm:text-base tracking-wide shadow-lg shadow-[var(--color-accent)]/20 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2.5"
          >
            <span>Explorer le Catalogue</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-1)]/90 text-[var(--color-text)] font-bold text-sm sm:text-base hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-2)] transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <MessageCircle className="w-4 h-4 text-[var(--color-accent)]" />
            <span>Nous Contacter</span>
          </Link>
        </div>

        {/* MICRO-RÉASSURANCES */}
        <div className="pt-6 border-t border-[var(--color-border)]/50 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-[var(--color-text-muted)]">
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[var(--color-accent)]" />
            <span>Livraison Express 24h</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Paiement à la Livraison</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4 text-emerald-500" />
            <span>Validation WhatsApp</span>
          </div>
        </div>
      </div>
    </section>
  );
}
