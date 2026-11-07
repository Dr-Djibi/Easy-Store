import { Truck, ShieldCheck, Headphones, RefreshCw } from 'lucide-react';

export default function ReassuranceBar() {
  const items = [
    {
      icon: Truck,
      title: 'Livraison Rapide à Domicile',
      desc: 'Expédition soignée directement à votre adresse ou en point relais',
    },
    {
      icon: ShieldCheck,
      title: 'Paiement à la Livraison',
      desc: 'Inspectez et réglez votre commande en toute confiance à l\'arrivée',
    },
    {
      icon: Headphones,
      title: 'Service Client WhatsApp 7j/7',
      desc: 'Assistance personnalisée et réactive avant et après votre achat',
    },
    {
      icon: RefreshCw,
      title: 'Garantie Conformité & Échange',
      desc: 'Remplacement immédiat si l\'article ne correspond pas à vos attentes',
    },
  ];

  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-surface-1)] py-12 px-4 my-16 shadow-xs">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 p-4 rounded-2xl border border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-surface-2)]/50 transition-all duration-200"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-surface-2)] to-[var(--color-surface-3)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] shrink-0 shadow-xs">
              <it.icon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-[var(--color-text)] leading-snug">{it.title}</h4>
              <p className="text-xs text-[var(--color-text-muted)] mt-1 leading-relaxed">{it.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
