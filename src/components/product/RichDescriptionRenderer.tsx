import React from 'react';

export default function RichDescriptionRenderer({
  description,
}: {
  description: string | null;
}) {
  if (!description || !description.trim()) return null;

  const lines = description.split('\n');

  // Rendu intelligent de chaque ligne avec support WYSIWYG
  return (
    <div className="space-y-4 my-6 text-[var(--color-text)] font-normal text-base leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        // Ligne vide
        if (!trimmed) {
          return <div key={idx} className="h-2" />;
        }

        // Titre 1 (# ...)
        if (trimmed.startsWith('# ')) {
          return (
            <h2
              key={idx}
              className="text-2xl sm:text-3xl font-black text-[var(--color-text)] tracking-tight pt-4 pb-1 border-b border-[var(--color-border)]/60"
            >
              {trimmed.replace('# ', '')}
            </h2>
          );
        }

        // Titre 2 (## ...)
        if (trimmed.startsWith('## ')) {
          return (
            <h3
              key={idx}
              className="text-xl sm:text-2xl font-extrabold text-[var(--color-text)] tracking-tight pt-3 pb-1"
            >
              {trimmed.replace('## ', '')}
            </h3>
          );
        }

        // Image inline (![alt](url))
        const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (imgMatch) {
          const [, alt, url] = imgMatch;
          return (
            <div
              key={idx}
              className="my-5 rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-2)] shadow-sm"
            >
              <img
                src={url}
                alt={alt || 'Illustration'}
                className="w-full h-auto max-h-[500px] object-cover"
                loading="lazy"
              />
              {alt ? (
                <div className="p-2.5 bg-[var(--color-surface-1)] border-t border-[var(--color-border)]/60 text-xs italic text-[var(--color-text-muted)] text-center">
                  {alt}
                </div>
              ) : null}
            </div>
          );
        }

        // Vidéo inline ([▶️ Title](url))
        const videoMatch = trimmed.match(/^\[▶️\s*(.*?)\]\((.*?)\)$/);
        if (videoMatch) {
          const [, title, url] = videoMatch;
          return (
            <div
              key={idx}
              className="my-5 p-4 rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--color-accent-glow)] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎬</span>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-[var(--color-text)]">{title}</h4>
                  <p className="text-xs text-[var(--color-text-muted)] truncate max-w-xs sm:max-w-md">{url}</p>
                </div>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="self-start sm:self-auto px-4 py-2 rounded-xl bg-[var(--color-accent)] text-white text-xs font-bold hover:opacity-90 transition-opacity shadow-sm"
              >
                Visionner la Démo ↗
              </a>
            </div>
          );
        }

        // Liste à puces (• ou -)
        if (trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
          const content = trimmed.replace(/^[•-]\s*/, '');
          return (
            <div key={idx} className="flex items-start gap-3 pl-2 py-0.5">
              <span className="text-[var(--color-accent)] font-black text-xl leading-5">•</span>
              <span className="text-base text-[var(--color-text)] leading-relaxed">{content}</span>
            </div>
          );
        }

        // Liste numérotée (1. ...)
        const numMatch = trimmed.match(/^(\d+)\.\s*(.*)$/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-3 pl-2 py-0.5">
              <span className="w-6 h-6 rounded-full bg-[var(--color-surface-2)] border border-[var(--color-border)] text-xs font-bold text-[var(--color-accent)] flex items-center justify-center shrink-0 mt-0.5">
                {numMatch[1]}
              </span>
              <span className="text-base text-[var(--color-text)] leading-relaxed">{numMatch[2]}</span>
            </div>
          );
        }

        // Ligne de tableau (| col | col |)
        if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
          if (trimmed.includes('---')) return null; // Séparateur d'en-tête
          const cells = trimmed.split('|').filter(Boolean).map((c) => c.trim());
          return (
            <div
              key={idx}
              className="grid grid-cols-2 gap-2 my-1 p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] text-sm"
            >
              <div className="font-bold text-[var(--color-text)]">{cells[0] || ''}</div>
              <div className="text-[var(--color-text-muted)] text-right">{cells[1] || ''}</div>
            </div>
          );
        }

        // Formatage de span de couleur ou HTML inline simple
        if (trimmed.includes('<span style="color:') || trimmed.includes('<u>') || trimmed.includes('<b>')) {
          return (
            <p
              key={idx}
              className="text-base text-[var(--color-text-muted)] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: trimmed }}
            />
          );
        }

        // Paragraphe standard
        return (
          <p key={idx} className="text-base text-[var(--color-text-muted)] leading-relaxed">
            {line}
          </p>
        );
      })}
    </div>
  );
}
