'use client';

import { useState } from 'react';
import { MessageCircle, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/utils';
import type { StoreSettings } from '@/lib/types';

export default function ContactClient({ settings }: { settings: StoreSettings }) {
  const [nom, setNom] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const fullMsg = `Bonjour,\nJe suis ${nom}.\n\nMessage :\n${message}`;
    window.open(buildWhatsAppLink(settings.WHATSAPP_NUMBER, fullMsg), '_blank');
    setSent(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-3xl sm:text-5xl font-black text-[var(--color-text)] tracking-tight">
          Contactez-nous
        </h1>
        <p className="text-base text-[var(--color-text-muted)] max-w-lg mx-auto">
          Une question sur un produit ou sur votre livraison ? Notre équipe est à votre écoute.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Coordonnées */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-6 space-y-6">
            <h3 className="font-bold text-lg text-[var(--color-text)]">Canaux Directs</h3>

            {settings.WHATSAPP_NUMBER && (
              <a
                href={`https://wa.me/${settings.WHATSAPP_NUMBER.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-600/20 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-[var(--color-text)]">WhatsApp Officiel</div>
                  <div className="text-xs text-[var(--color-text-muted)]">Discuter directement</div>
                </div>
              </a>
            )}

            {settings.STORE_PHONE && (
              <a
                href={`tel:${settings.STORE_PHONE}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)] transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-3)] flex items-center justify-center text-[var(--color-accent)] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm">Appel Téléphonique</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{settings.STORE_PHONE}</div>
                </div>
              </a>
            )}
          </div>
        </div>

        {/* Formulaire direct vers WhatsApp */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-6 sm:p-8">
          <h3 className="font-bold text-lg text-[var(--color-text)] mb-6">Envoyez-nous un message</h3>

          {sent ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-base text-[var(--color-text)]">Message prêt !</h4>
              <p className="text-xs text-[var(--color-text-muted)]">WhatsApp a été ouvert avec votre texte.</p>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--color-text-muted)]">Votre nom</label>
                <input
                  type="text"
                  required
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Ex: Ibrahima Diallo"
                  className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--color-text-muted)]">Votre question / message</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Comment pouvons-nous vous aider ?"
                  className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg)] font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
              >
                <Send className="w-4 h-4" />
                <span>Transmettre sur WhatsApp</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
