// src/app/disclaimer/page.js
import LegalPage from '../../components/ui/LegalPage';
import { legalContent } from '../../lib/legalContent';

export const metadata = {
  title: 'Disclaimer & Risk | FINNOTIA',
  description: 'FINNOTIA disclaimer: not SEBI registered, not financial advice. For educational purposes only.',
  alternates: { canonical: 'https://finnotia.com/disclaimer' },
};

export default function DisclaimerPage() {
  return <LegalPage data={legalContent.disclaimer} />;
}