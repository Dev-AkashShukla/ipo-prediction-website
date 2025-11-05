import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'FINNOTIA - AI-Powered Market Analysis & News',
  description: 'Get real-time stock analysis, market news, mutual fund insights, and AI-powered predictions. Download FINNOTIA today for smarter investing.',
  keywords: 'stock market, AI analysis, financial news, mutual funds, market analysis, Indian stock market',
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