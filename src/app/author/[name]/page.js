// src/app/author/[name]/page.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BlogClient from '../../blog/BlogClient';
import { Youtube, Linkedin, Globe, Award, BarChart2 } from 'lucide-react';
import PageHero from '../../../components/shared/PageHero';

const AUTHORS = {
  'akash-shukla': {
    name: 'Akash Shukla',
    title: 'Founder & Lead Analyst, Finnotia',
    bio: `Akash Shukla is the founder of Finnotia and a full-stack developer with a deep interest in 
    financial markets, macroeconomics, and fintech. He built Finnotia from the ground up to make 
    AI-curated financial data accessible to retail investors across India. With hands-on experience 
    in building market data pipelines and financial analysis tools, Akash brings a technical and 
    analytical perspective to every piece of research published on this platform.`,
    expertise: ['IPO Analysis', 'Stock Markets', 'Mutual Funds', 'Macroeconomics', 'Fintech', 'Market Data'],
    credentials: [
      'Founder, Finnotia — financial research platform',
      'Full-stack developer (Next.js, Python FastAPI, Azure)',
      'YouTube creator with 1M+ subscribers covering finance & tech',
      'Built NSE/BSE data pipelines and market intelligence tools',
    ],
    social: {
      youtube: 'https://youtube.com',
      linkedin: 'https://linkedin.com',
      website: 'https://www.finnotia.com/founder',
    },
  },
};

function getArticlesByAuthor() {
  const dir = path.join(process.cwd(), 'content', 'articles');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f !== '.gitkeep')
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf8');
      const { data } = matter(raw);
      return {
        slug:      data.slug      || filename.replace(/\.md$/, ''),
        title:     data.title     || 'Untitled',
        excerpt:   data.excerpt   || '',
        category:  data.category  || 'markets',
        readTime:  parseInt(data.readTime) || 5,
        date:      data.date      || '',
        image_url: data.image_url || '',
        tags:      data.tags      || [],
        sentiment: data.sentiment || '',
        region:    data.region    || '',
        style:     data.style     || '',
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function generateStaticParams() {
  return Object.keys(AUTHORS).map((name) => ({ name }));
}

export async function generateMetadata({ params }) {
  const author = AUTHORS[params.name];
  if (!author) return { title: 'Author Not Found' };
  return {
    title: `${author.name} — ${author.title} | FINNOTIA`,
    description: `Research and analysis by ${author.name}, ${author.title}. ${author.bio.slice(0, 120)}...`,
    alternates: { canonical: `https://www.finnotia.com/author/${params.name}` },
    openGraph: {
      title: `${author.name} | FINNOTIA Research`,
      description: author.bio.slice(0, 150),
      url: `https://www.finnotia.com/author/${params.name}`,
      siteName: 'FINNOTIA',
      type: 'profile',
    },
    robots: { index: true, follow: true },
  };
}

export const revalidate = 60;

export default function AuthorPage({ params }) {
  const author = AUTHORS[params.name];
  if (!author) notFound();

  const articles = getArticlesByAuthor();

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    jobTitle: author.title,
    url: `https://www.finnotia.com/author/${params.name}`,
    worksFor: { '@type': 'Organization', name: 'FINNOTIA', url: 'https://www.finnotia.com' },
    sameAs: Object.values(author.social).filter(Boolean),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      <div className="min-h-screen bg-[#f8f7f4]" style={{ fontFamily: 'system-ui, sans-serif' }}>

        {/* ── Hero — reusable component ── */}
        <PageHero
          badge="Author"
          title={author.name}
          subtitle={author.title}
          accentColor="#c8421e"
        />

        {/* Social links row — below hero */}
        <div className="max-w-5xl mx-auto px-5 pt-5 flex items-center gap-4">
          {author.social.youtube && (
            <a href={author.social.youtube} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 transition-colors text-xs">
              <Youtube className="w-3.5 h-3.5" strokeWidth={2} /> YouTube
            </a>
          )}
          {author.social.linkedin && (
            <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 transition-colors text-xs">
              <Linkedin className="w-3.5 h-3.5" strokeWidth={2} /> LinkedIn
            </a>
          )}
          {author.social.website && (
            <Link href={author.social.website}
              className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 transition-colors text-xs">
              <Globe className="w-3.5 h-3.5" strokeWidth={2} /> Website
            </Link>
          )}
        </div>

        {/* ── Bio + Credentials ── */}
        <div className="max-w-5xl mx-auto px-5 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

            <div className="sm:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-[14px] font-bold text-gray-900 mb-3">About</h2>
              <p className="text-[13px] text-gray-600 leading-relaxed whitespace-pre-line">{author.bio}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {author.expertise.map((tag) => (
                  <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full border border-gray-200 text-gray-500 bg-gray-50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-4 h-4 text-[#c8421e]" strokeWidth={2} />
                <h2 className="text-[14px] font-bold text-gray-900">Credentials</h2>
              </div>
              <ul className="space-y-3">
                {author.credentials.map((cred) => (
                  <li key={cred} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c8421e] mt-1.5 flex-shrink-0" />
                    <span className="text-[12px] text-gray-600 leading-snug">{cred}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2 text-gray-400 text-[12px]">
                <BarChart2 className="w-3.5 h-3.5" strokeWidth={2} />
                {articles.length} article{articles.length !== 1 ? 's' : ''} published
              </div>
            </div>
          </div>

          <h2 className="text-xl font-serif font-bold text-gray-900 mb-1">Articles by {author.name}</h2>
          <p className="text-sm text-gray-500 mb-4">All research and analysis published on Finnotia.</p>
        </div>

        {articles.length > 0 ? (
          <BlogClient articles={articles} />
        ) : (
          <div className="text-center py-16 text-gray-400 text-sm px-5">
            No articles published yet. Check back soon.
          </div>
        )}
      </div>
    </>
  );
}