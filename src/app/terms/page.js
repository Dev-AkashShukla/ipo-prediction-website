// src/app/terms/page.js
import LegalPage from '../../components/ui/LegalPage';
import { legalContent } from '../../lib/legalContent';

export const metadata = {
  title: 'Terms & Conditions | FINNOTIA',
  description: 'Terms and conditions for using FINNOTIA — the AI-powered IPO tracking and market data platform.',
  alternates: { canonical: 'https://finnotia.com/terms' },
};

export default function TermsPage() {
  return <LegalPage data={legalContent.terms} />;
}