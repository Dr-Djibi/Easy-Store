import { Truck, ShieldCheck, Headphones } from 'lucide-react';

export default function ReassuranceBar() {
  const items = [
    {
      icon: Truck,
      title: 'Livraison Rapide',
      desc: 'Expédition soignée directement à votre adresse',
    },
    {
      icon: ShieldCheck,
      title: 'Paiement à la livraison',
      desc: 'Réglez en toute sécurité dès réception',
    },
    {
      icon: Headphones,
      title: 'Support WhatsApp 7j/7',
      desc: 'Une équipe réactive à votre écoute',
    },
  ];

  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-surface-1)] py-10 px-4 my-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((it, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] shrink-0">
              <it.icon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[var(--color-text)]">{it.title}</h4>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{it.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
