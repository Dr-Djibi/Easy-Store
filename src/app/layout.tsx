import type { Metadata } from 'next';
import './globals.css';
import { getAllSettings } from '@/lib/settings';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getAllSettings();
  return {
    title: {
      default: settings.STORE_NAME,
      template: `%s | ${settings.STORE_NAME}`,
    },
    description: settings.STORE_BANNER_SUBTITLE || `Boutique en ligne ${settings.STORE_NAME}.`,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getAllSettings();
  const themeClass = settings.THEME ? `theme-${settings.THEME}` : 'theme-light-minimal';

  return (
    <html lang="fr" className={themeClass} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased bg-[var(--color-bg)] text-[var(--color-text)] transition-colors selection:bg-[var(--color-accent)] selection:text-white">
        <Header settings={settings} />
        <div className="flex-1">
          {children}
        </div>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
