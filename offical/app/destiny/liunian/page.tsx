'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

export default function LiunianPage() {
  const locale = useAppStore((state) => state.locale);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">
                {locale === 'zh' ? '2026流年运势' : '2026 Annual Fortune'}
              </h1>
              <Link href="/destiny" className="text-gold-600 hover:underline">
                {locale === 'zh' ? '← 返回' : '← Back'}
              </Link>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">
                {locale === 'zh' ? '整体趋势' : 'Overall Trend'}
              </h2>
              <p className="text-gray-700 mb-6">
                {locale === 'zh'
                  ? '2026年对于东南亚华人来说，整体运势呈现上升趋势。在事业、财运和感情方面都有不错的发展机会。'
                  : 'For Southeast Asian Chinese, 2026 shows an upward trend in overall fortune. Good development opportunities in career, wealth, and love.'}
              </p>

              <h2 className="text-2xl font-semibold mb-4">
                {locale === 'zh' ? '关键节点' : 'Key Moments'}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li>{locale === 'zh' ? '3-5月：事业贵人相助，适合拓展业务' : 'Mar-May: Career support, suitable for business expansion'}</li>
                <li>{locale === 'zh' ? '7-8月：注意财务规划，避免大额支出' : 'Jul-Aug: Pay attention to financial planning, avoid large expenses'}</li>
                <li>{locale === 'zh' ? '10-12月：感情运势上升，适合深度交流' : 'Oct-Dec: Love fortune rises, suitable for deep communication'}</li>
              </ul>

              <div className="mt-8">
                <Link
                  href="/input"
                  className="inline-block bg-gold-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gold-700 transition"
                >
                  {locale === 'zh' ? '查看个人详细运势' : 'View Personal Detailed Fortune'}
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
