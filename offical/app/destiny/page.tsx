'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

export default function DestinyPage() {
  const locale = useAppStore((state) => state.locale);
  const t = getTranslation(locale);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl font-bold text-center mb-12">
            {locale === 'zh' ? '运势中心' : 'Destiny Center'}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/input"
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition text-center"
            >
              <div className="text-5xl mb-4">🔮</div>
              <h3 className="text-xl font-semibold mb-2">
                {locale === 'zh' ? '八字排盘' : 'Bazi Reading'}
              </h3>
              <p className="text-gray-600">
                {locale === 'zh' ? '查看您的八字命盘' : 'View your Bazi chart'}
              </p>
            </Link>

            <Link
              href="/destiny/dayun"
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition text-center"
            >
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">
                {locale === 'zh' ? '流年大运' : 'Yearly Fortune'}
              </h3>
              <p className="text-gray-600">
                {locale === 'zh' ? '查看未来5年运势' : 'View 5-year fortune'}
              </p>
            </Link>

            <Link
              href="/destiny/daily"
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition text-center"
            >
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-2">
                {locale === 'zh' ? '每日宜忌' : 'Daily Guide'}
              </h3>
              <p className="text-gray-600">
                {locale === 'zh' ? '查看今日运势' : 'View today\'s fortune'}
              </p>
            </Link>

            <Link
              href="/destiny/liunian"
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition text-center"
            >
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-2">
                {locale === 'zh' ? '流年运势' : 'Annual Fortune'}
              </h3>
              <p className="text-gray-600">
                {locale === 'zh' ? '查看2026年运势' : 'View 2026 fortune'}
              </p>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
