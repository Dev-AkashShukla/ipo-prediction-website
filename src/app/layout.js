import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'IPO Tracker - AI-Powered Stock Market Analysis',
  description: 'Get AI-powered predictions, real-time IPO data, stock analysis, and market news. Make smarter investment decisions with our intelligent platform.',
  keywords: 'IPO, stock market, AI analysis, predictions, mutual funds, Indian stock market',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
