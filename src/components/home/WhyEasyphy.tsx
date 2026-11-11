import { ShieldCheck, MessageCircle, Zap, Sparkles } from 'lucide-react';

export default function WhyEasyphy() {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      badge: "Indépendance Totale",
      title: "Vos Données, Zéro Commission",
      desc: "Contrairement à Shopify ou YouCan, vous ne payez ni abonnement forcé ni pourcentage sur vos ventes. Vos produits et vos clients vous appartiennent à 100% via votre propre base de données.",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-emerald-500" />,
      badge: "WhatsApp-Native",
      title: "Tunnel de Commande 1-Clic",
      desc: "En Afrique, le commerce se passe sur WhatsApp. Recevez les commandes pré-formatées directement sur votre numéro sans forcer vos clients à passer par un panier complexe avec carte bancaire.",
    },
    {
      icon: <Zap className="w-6 h-6 text-[var(--color-accent)]" />,
      badge: "Ultra-Rapide 3G/4G",
      title: "Optimisé Mobiles & Réseaux Lents",
      desc: "Site ultra-léger et application Android compilée avec le moteur Hermes. Vos pages se chargent en un clin d'œil, même avec une connexion instable et sous le soleil.",
    },
  ];

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto border-t border-[var(--color-border)]/50">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-accent)] uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          L'E-Commerce Taillé pour l'Afrique
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-text)] tracking-tight">
          Pourquoi Choisir Easyphy ?
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] mt-2">
          La solution conçue pour les réalités du marché africain francophone, sans compromis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-1)] hover:border-[var(--color-accent)]/50 transition-all duration-300 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-surface-2)] flex items-center justify-center border border-[var(--color-border)]">
                  {item.icon}
                </div>
                <span className="text-[10px] font-extrabold text-[var(--color-accent)] bg-[var(--color-accent-glow)] px-3 py-1 rounded-full border border-[var(--color-accent)]/20">
                  {item.badge}
                </span>
              </div>
              <h3 className="text-lg font-black text-[var(--color-text)] mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
