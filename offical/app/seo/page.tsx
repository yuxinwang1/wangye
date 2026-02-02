'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

export default function SEOListPage() {
  const locale = useAppStore((state) => state.locale);

  const countries = [
    { name: locale === 'zh' ? '新加坡' : 'Singapore', code: 'sg' },
    { name: locale === 'zh' ? '马来西亚' : 'Malaysia', code: 'my' },
    { name: locale === 'zh' ? '印尼' : 'Indonesia', code: 'id' },
    { name: locale === 'zh' ? '泰国' : 'Thailand', code: 'th' },
    { name: locale === 'zh' ? '越南' : 'Vietnam', code: 'vn' },
  ];

  const zodiacs = [
    '鼠', '牛', '虎', '兔', '龙', '蛇',
    '马', '羊', '猴', '鸡', '狗', '猪',
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl font-bold text-center mb-12">
            {locale === 'zh' ? '2026年运势查询' : '2026 Fortune Search'}
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">
              {locale === 'zh' ? '按国家查询' : 'Search by Country'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
              {countries.map((country) => (
                <Link
                  key={country.code}
                  href={`/seo/${country.code}`}
                  className="bg-gold-50 hover:bg-gold-100 p-4 rounded-lg text-center transition"
                >
                  {country.name}
                </Link>
              ))}
            </div>

            <h2 className="text-2xl font-semibold mb-6">
              {locale === 'zh' ? '按生肖查询' : 'Search by Zodiac'}
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {zodiacs.map((zodiac) => (
                <Link
                  key={zodiac}
                  href={`/seo/zodiac/${zodiac}`}
                  className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg text-center transition"
                >
                  {zodiac}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
