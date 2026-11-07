import type { ContentBlock } from '@/lib/types';

export default function ContentBlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="space-y-12 my-12">
      {blocks.map((b) => (
        <div key={b.id} className="space-y-4">
          {b.titre && (
            <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] tracking-tight">
              {b.titre}
            </h3>
          )}

          {b.imageUrl && (
            <div className="rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-2)]">
              <img
                src={b.imageUrl}
                alt={b.titre || 'Illustration'}
                className="w-full h-auto max-h-[550px] object-cover"
                loading="lazy"
              />
            </div>
          )}

          {b.texte && (
            <div className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed whitespace-pre-line font-normal">
              {b.texte}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
