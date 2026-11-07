'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('user_web_theme');
    if (saved === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else if (saved === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      // Priorité 1 : Thème clair par défaut (sauf si dark mode système explicite)
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        setIsDark(true);
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('user_web_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('user_web_theme', 'light');
    }
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] opacity-50" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="w-9 h-9 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] hover:border-[var(--color-accent)]/60 text-[var(--color-text)] flex items-center justify-center transition-all duration-200 active:scale-95"
      title={isDark ? 'Passer en thème clair ☀️' : 'Passer en thème sombre 🌙'}
      aria-label="Basculer le thème"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[var(--color-accent)] animate-in spin-in-180 duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-[var(--color-text-muted)] animate-in spin-in-180 duration-300" />
      )}
    </button>
  );
}
