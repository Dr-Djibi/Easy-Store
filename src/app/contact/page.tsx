import { getAllSettings } from '@/lib/settings';
import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contactez-nous',
  description: 'Prenez contact avec notre équipe directement par WhatsApp ou par téléphone.',
};

export default async function ContactPage() {
  const settings = await getAllSettings();
  return <ContactClient settings={settings} />;
}
