'use client';

import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import Link from 'next/link';

export default function CountrySEOPage() {
  const params = useParams();
  const country = params.country as string;
  const locale = useAppStore((state) => state.locale);

  const countryNames: Record<string, { zh: string; en: string }> = {
    sg: { zh: '新加坡', en: 'Singapore' },
    my: { zh: '马来西亚', en: 'Malaysia' },
    id: { zh: '印尼', en: 'Indonesia' },
    th: { zh: '泰国', en: 'Thailand' },
    vn: { zh: '越南', en: 'Vietnam' },
  };

  const countryName = countryNames[country]?.[locale] || country;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold mb-6">
              {locale === 'zh' 
                ? `${countryName}2026年运势`
                : `2026 Fortune in ${countryName}`}
            </h1>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                {locale === 'zh'
                  ? `根据传统命理学和${countryName}本地文化，为您解读2026年的整体运势趋势。`
                  : `Based on traditional fortune-telling and local culture of ${countryName}, we interpret the overall fortune trends for 2026.`}
              </p>

              <h2 className="text-2xl font-semibold mb-4">
                {locale === 'zh' ? '整体运势' : 'Overall Fortune'}
              </h2>
              <p className="text-gray-700 mb-6">
                {locale === 'zh'
                  ? '2026年对于在东南亚地区的华人来说，整体运势呈现上升趋势。建议把握关键节点，注意跨文化沟通。'
                  : 'For Chinese in Southeast Asia, 2026 shows an upward trend in overall fortune. Seize key moments and pay attention to cross-cultural communication.'}
              </p>

              <h2 className="text-2xl font-semibold mb-4">
                {locale === 'zh' ? '本地特色' : 'Local Features'}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>
                  {locale === 'zh'
                    ? '结合本地节庆（如开斋节、卫塞节）的择日建议'
                    : 'Date selection advice combined with local festivals (e.g., Hari Raya, Vesak Day)'}
                </li>
                <li>
                  {locale === 'zh'
                    ? '考虑东南亚职场文化的运势解读'
                    : 'Fortune interpretation considering Southeast Asian workplace culture'}
                </li>
                <li>
                  {locale === 'zh'
                    ? '适合本地生活的趋吉避凶建议'
                    : 'Advice for auspicious timing suitable for local life'}
                </li>
              </ul>

              <div className="mt-8">
                <Link
                  href="/input"
                  className="inline-block bg-gold-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gold-700 transition"
                >
                  {locale === 'zh' ? '开始测算' : 'Start Reading'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
