// src/app/privacy/page.js
import LegalPage from '../../components/ui/LegalPage';
import { legalContent } from '../../lib/legalContent';

export const metadata = {
  title: 'Privacy Policy | FINNOTIA',
  description: 'Learn how FINNOTIA collects, uses, and protects your data including Google AdSense and AdMob advertising.',
  alternates: { canonical: 'https://www.finnotia.com/privacy' },
};

export default function PrivacyPage() {
  return <LegalPage data={legalContent.privacy} />;
}