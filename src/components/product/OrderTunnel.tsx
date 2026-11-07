'use client';

import { useState } from 'react';
import { MessageCircle, CheckCircle2, Loader2, ArrowRight, AlertCircle } from 'lucide-react';
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
      <div className="p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-1)] text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h4 className="text-xl font-bold text-[var(--color-text)]">Commande Confirmée !</h4>
        <p className="text-sm text-[var(--color-text-muted)] max-w-md mx-auto">
          {settings.ORDER_SUCCESS_MSG}
        </p>
      </div>
    );
  }

  if (isOutOfStock) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 space-y-4">
        <div className="flex items-center gap-3 text-red-400">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <div>
            <h4 className="font-bold text-base text-[var(--color-text)]">Produit Épuisé</h4>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
              Cet article est actuellement en rupture de stock.
            </p>
          </div>
        </div>

        {settings.WHATSAPP_NUMBER && (
          <a
            href={buildWhatsAppLink(
              settings.WHATSAPP_NUMBER,
              `Bonjour, je souhaite être informé du réapprovisionnement pour : ${product.nom}`
            )}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text)] font-semibold text-sm flex items-center justify-center gap-2 hover:border-[var(--color-accent)] transition-all"
          >
            <MessageCircle className="w-4 h-4 text-[var(--color-accent)]" />
            <span>M'alerter lors du réassort via WhatsApp</span>
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]">
        <div>
          <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">Prix Total</span>
          <div className="text-2xl font-black text-[var(--color-accent)]">
            {formatPrice(total, settings.CURRENCY)}
          </div>
        </div>

        <div className="flex items-center gap-3 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl p-1.5">
          <button
            type="button"
            onClick={() => setQuantite((q) => Math.max(1, q - 1))}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-text)] hover:bg-[var(--color-surface-3)] font-bold text-lg"
          >
            -
          </button>
          <span className="font-bold text-sm px-2 text-[var(--color-text)]">{quantite}</span>
          <button
            type="button"
            onClick={() => setQuantite((q) => q + 1)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-text)] hover:bg-[var(--color-surface-3)] font-bold text-lg"
          >
            +
          </button>
        </div>
      </div>

      {isDirect ? (
        <button
          type="button"
          onClick={handleDirectWhatsApp}
          className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base flex items-center justify-center gap-3 transition-colors shadow-lg"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Commander directement sur WhatsApp</span>
        </button>
      ) : (
        <form onSubmit={handleSubmitForm} className="space-y-4">
          {settings.ORDER_FIELDS?.map((field) => (
            <div key={field.id} className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--color-text-muted)] flex items-center justify-between">
                <span>{field.label}</span>
                {field.required && <span className="text-red-400">*</span>}
              </label>

              {field.type === 'select' ? (
                <select
                  required={field.required}
                  value={formData[field.label] || ''}
                  onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                  className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
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
                  placeholder={`Entrez votre ${field.label.toLowerCase()}`}
                  className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
                />
              )}
            </div>
          ))}

          {errorMsg && (
            <p className="text-xs text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg)] font-bold text-base flex items-center justify-center gap-2 hover:opacity-95 transition-opacity disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Confirmer et Ouvrir WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
