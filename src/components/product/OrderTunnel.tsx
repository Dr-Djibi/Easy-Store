'use client';

import { useState } from 'react';
import { MessageCircle, CheckCircle2, Loader2, ArrowRight, AlertCircle, ShieldCheck, Zap } from 'lucide-react';
import { formatPrice, buildWhatsAppLink, buildOrderMessage } from '@/lib/utils';
import type { Product, StoreSettings } from '@/lib/types';

export default function OrderTunnel({
  product,
  settings,
}: {
  product: Product;
  settings: StoreSettings;
}) {
  const [quantite, setQuantite] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const isOutOfStock = product.stock !== undefined && product.stock !== null && product.stock <= 0;
  const total = product.prix * quantite;
  const isDirect = settings.ORDER_MODE === 'whatsapp_direct';

  const handleDirectWhatsApp = () => {
    const msg = buildOrderMessage(settings.ORDER_WHATSAPP_MSG, {
      produit: product.nom,
      quantite,
      montant: Math.round(total).toLocaleString('fr-FR'),
      devise: settings.CURRENCY,
      champs: { 'Mode de commande': 'Direct WhatsApp' },
    });
    window.open(buildWhatsAppLink(settings.WHATSAPP_NUMBER, msg), '_blank');
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: product.id,
          product_nom: product.nom,
          product_prix: product.prix,
          quantite,
          montant: total,
          fields_data: formData,
        }),
      });

      if (!res.ok) {
        throw new Error('Erreur lors de l\'enregistrement de la commande');
      }

      setSuccess(true);

      const msg = buildOrderMessage(settings.ORDER_WHATSAPP_MSG, {
        produit: product.nom,
        quantite,
        montant: Math.round(total).toLocaleString('fr-FR'),
        devise: settings.CURRENCY,
        champs: formData,
      });

      setTimeout(() => {
        window.open(buildWhatsAppLink(settings.WHATSAPP_NUMBER, msg), '_blank');
      }, 1000);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-8 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 text-center space-y-4 shadow-sm animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h4 className="text-2xl font-black text-[var(--color-text)] tracking-tight">Commande Enregistrée !</h4>
        <p className="text-sm text-[var(--color-text-muted)] max-w-md mx-auto leading-relaxed">
          {settings.ORDER_SUCCESS_MSG}
        </p>
        <div className="pt-2">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-500/20 px-3.5 py-1.5 rounded-full">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            Ouverture automatique de WhatsApp...
          </span>
        </div>
      </div>
    );
  }

  if (isOutOfStock) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-3 text-red-500">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <div>
            <h4 className="font-bold text-base text-[var(--color-text)]">Article en Rupture Temporaire</h4>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
              Cet article a été victime de son succès. Le réassort est en cours.
            </p>
          </div>
        </div>

        {settings.WHATSAPP_NUMBER && (
          <a
            href={buildWhatsAppLink(
              settings.WHATSAPP_NUMBER,
              `Bonjour, je souhaite être averti dès que l'article "${product.nom}" est de nouveau disponible.`
            )}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-1)] text-[var(--color-text)] font-bold text-sm flex items-center justify-center gap-2 hover:border-[var(--color-accent)] transition-all shadow-xs"
          >
            <MessageCircle className="w-4 h-4 text-[var(--color-accent)]" />
            <span>Être alerté du réassort sur WhatsApp</span>
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-6 sm:p-7 space-y-6 shadow-sm">
      {/* SÉLECTEUR DE QUANTITÉ & PRIX TOTAL */}
      <div className="flex items-center justify-between pb-5 border-b border-[var(--color-border)] gap-4">
        <div>
          <span className="text-[11px] text-[var(--color-text-muted)] uppercase tracking-wider font-extrabold">
            Total à régler
          </span>
          <div className="text-2xl sm:text-3xl font-black text-[var(--color-accent)] tracking-tight">
            {formatPrice(total, settings.CURRENCY)}
          </div>
        </div>

        {/* STEPPER DE QUANTITÉ */}
        <div className="flex items-center gap-2 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl p-1.5 shadow-xs">
          <button
            type="button"
            onClick={() => setQuantite((q) => Math.max(1, q - 1))}
            className="w-9 h-9 rounded-xl bg-[var(--color-surface-1)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] hover:border-[var(--color-accent)] font-black text-lg transition-colors active:scale-95"
            aria-label="Diminuer la quantité"
          >
            -
          </button>
          <span className="font-extrabold text-sm px-3 text-[var(--color-text)] min-w-[28px] text-center">
            {quantite}
          </span>
          <button
            type="button"
            onClick={() => setQuantite((q) => q + 1)}
            className="w-9 h-9 rounded-xl bg-[var(--color-surface-1)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text)] hover:border-[var(--color-accent)] font-black text-lg transition-colors active:scale-95"
            aria-label="Augmenter la quantité"
          >
            +
          </button>
        </div>
      </div>

      {isDirect ? (
        <button
          type="button"
          onClick={handleDirectWhatsApp}
          className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base flex items-center justify-center gap-3 transition-all duration-200 shadow-lg shadow-emerald-600/20 active:scale-98"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Commander directement sur WhatsApp</span>
        </button>
      ) : (
        <form onSubmit={handleSubmitForm} className="space-y-4">
          <div className="space-y-3.5">
            {settings.ORDER_FIELDS?.map((field) => (
              <div key={field.id} className="space-y-1.5">
                <label className="text-xs font-bold text-[var(--color-text)] flex items-center justify-between">
                  <span>{field.label}</span>
                  {field.required && <span className="text-[var(--color-accent)]">*</span>}
                </label>

                {field.type === 'select' ? (
                  <select
                    required={field.required}
                    value={formData[field.label] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                    className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl px-4 py-3 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all font-medium"
                  >
                    <option value="">Sélectionnez une option</option>
                    {field.options?.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type === 'tel' ? 'tel' : field.type === 'number' ? 'number' : 'text'}
                    required={field.required}
                    value={formData[field.label] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                    placeholder={`Ex : ${field.label.toLowerCase()}...`}
                    className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/60 focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all font-medium"
                  />
                )}
              </div>
            ))}
          </div>

          {errorMsg && (
            <p className="text-xs text-red-500 bg-red-500/10 p-3 rounded-xl border border-red-500/20 font-medium">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/25 transition-all duration-200 active:scale-98 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <MessageCircle className="w-5 h-5" />
                <span>Valider ma Commande sur WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}

      {/* RÉASSURANCE SOUS LE BOUTON */}
      <div className="pt-2 flex items-center justify-center gap-5 text-[11px] font-bold text-[var(--color-text-muted)]">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Paiement à la livraison</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-[var(--color-accent)]" />
          <span>Réponse sous 15 min</span>
        </div>
      </div>
    </div>
  );
}
