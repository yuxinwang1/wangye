'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

export default function CareerPage() {
  const locale = useAppStore((state) => state.locale);
  const fortuneReport = useAppStore((state) => state.fortuneReport);

  if (!fortuneReport) {
    return null;
  }

  const { career } = fortuneReport;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">
                {locale === 'zh' ? '事业运势详解' : 'Career Fortune Details'}
              </h1>
              <Link href="/result" className="text-gold-600 hover:underline">
                {locale === 'zh' ? '← 返回' : '← Back'}
              </Link>
            </div>

            {/* 评分 */}
            <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-lg mb-6">
              <div className="text-5xl font-bold text-blue-600 mb-2">{career.score}</div>
              <p className="text-gray-700 text-lg">{career.summary}</p>
            </div>

            {/* 机会点 */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                {locale === 'zh' ? '近期机会点' : 'Recent Opportunities'}
              </h2>
              <ul className="space-y-3">
                {career.opportunities.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-gold-600 mr-3">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 注意事项 */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                {locale === 'zh' ? '注意事项' : 'Warnings'}
              </h2>
              <ul className="space-y-3">
                {career.warnings.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-red-500 mr-3">⚠</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 利好行业 */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                {locale === 'zh' ? '利好行业' : 'Favorable Industries'}
              </h2>
              <div className="flex flex-wrap gap-3">
                {career.favorableIndustries.map((industry, idx) => (
                  <span
                    key={idx}
                    className="bg-gold-100 text-gold-800 px-4 py-2 rounded-full"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>

            {/* 幸运元素 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  {locale === 'zh' ? '幸运颜色' : 'Lucky Colors'}
                </h3>
                <div className="flex gap-3">
                  {career.luckyColors.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-16 h-16 rounded-lg bg-gold-200 flex items-center justify-center text-sm"
                    >
                      {color}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  {locale === 'zh' ? '幸运方位' : 'Lucky Directions'}
                </h3>
                <div className="space-y-2">
                  {career.luckyDirections.map((dir, idx) => (
                    <div key={idx} className="text-gray-700">{dir}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
