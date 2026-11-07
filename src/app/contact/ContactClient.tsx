'use client';

import { useState } from 'react';
import { MessageCircle, Phone, Send, CheckCircle2, Sparkles, Clock, ShieldCheck } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
      <div className="text-center space-y-4 mb-14">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-1)] text-xs font-bold text-[var(--color-accent)] shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Service Client Dédié</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--color-text)] tracking-tight">
          Contactez notre Équipe
        </h1>
        <p className="text-base sm:text-lg text-[var(--color-text-muted)] max-w-xl mx-auto leading-relaxed">
          Une question sur un article, une taille ou le suivi de votre colis ? Nous vous répondons directement sur WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* COORDONNÉES ET CANAUX DIRECTS */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-6 sm:p-7 space-y-6 shadow-sm">
            <h3 className="font-extrabold text-lg text-[var(--color-text)] tracking-tight">
              Canaux d'Échange Rapide
            </h3>

            {settings.WHATSAPP_NUMBER && (
              <a
                href={`https://wa.me/${settings.WHATSAPP_NUMBER.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-600/10 border border-emerald-500/25 text-emerald-600 hover:bg-emerald-600/20 transition-all shadow-xs group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-extrabold text-sm sm:text-base text-[var(--color-text)]">
                    WhatsApp Officiel
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)] mt-0.5">
                    Réponse ultra-rapide en continu
                  </div>
                </div>
              </a>
            )}

            {settings.STORE_PHONE && (
              <a
                href={`tel:${settings.STORE_PHONE}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)] transition-all shadow-xs group"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--color-surface-1)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-sm sm:text-base text-[var(--color-text)]">
                    Ligne Téléphonique
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)] mt-0.5 font-medium">
                    {settings.STORE_PHONE}
                  </div>
                </div>
              </a>
            )}

            {/* HORAIRES & ENGAGEMENT */}
            <div className="pt-4 border-t border-[var(--color-border)]/60 space-y-3 text-xs font-medium text-[var(--color-text-muted)]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[var(--color-accent)]" />
                <span>Disponible du Lundi au Dimanche (8h - 22h)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Conseils personnalisés avant commande</span>
              </div>
            </div>
          </div>
        </div>

        {/* FORMULAIRE DIRECT VERS WHATSAPP */}
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-6 sm:p-8 shadow-sm">
          <h3 className="font-extrabold text-lg text-[var(--color-text)] tracking-tight mb-2">
            Rédiger un Message Instantané
          </h3>
          <p className="text-xs text-[var(--color-text-muted)] mb-6">
            Remplissez ce formulaire court pour démarrer la conversation avec notre conseiller commercial.
          </p>

          {sent ? (
            <div className="text-center py-10 space-y-4 animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-extrabold text-lg text-[var(--color-text)]">Message Préparé !</h4>
              <p className="text-xs text-[var(--color-text-muted)] max-w-xs mx-auto leading-relaxed">
                WhatsApp a été lancé avec votre demande. Si l'application ne s'ouvre pas automatiquement, cliquez sur le bouton WhatsApp ci-contre.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="text-xs font-bold text-[var(--color-accent)] hover:underline pt-2"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[var(--color-text)]">Votre Prénom ou Nom *</label>
                <input
                  type="text"
                  required
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Ex : Mariama Diallo"
                  className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[var(--color-text)]">Votre Demande / Question *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ex : Bonjour, avez-vous la taille 42 pour le modèle marron ?..."
                  className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl p-4 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all font-medium resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-accent)]/20 hover:opacity-95 active:scale-98 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Ouvrir sur WhatsApp</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
