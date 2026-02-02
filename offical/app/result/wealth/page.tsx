'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

export default function WealthPage() {
  const locale = useAppStore((state) => state.locale);
  const fortuneReport = useAppStore((state) => state.fortuneReport);

  if (!fortuneReport) {
    return null;
  }

  const { wealth } = fortuneReport;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">
                {locale === 'zh' ? '财运分析详解' : 'Wealth Fortune Details'}
              </h1>
              <Link href="/result" className="text-gold-600 hover:underline">
                {locale === 'zh' ? '← 返回' : '← Back'}
              </Link>
            </div>

            {/* 评分 */}
            <div className="bg-gradient-to-r from-green-100 to-green-50 p-6 rounded-lg mb-6">
              <div className="text-5xl font-bold text-green-600 mb-2">{wealth.score}</div>
              <p className="text-gray-700 text-lg">{wealth.summary}</p>
            </div>

            {/* 正财偏财 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">
                  {locale === 'zh' ? '正财' : 'Regular Income'}
                </h3>
                <p className="text-gray-700">{wealth.zhengcai}</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">
                  {locale === 'zh' ? '偏财' : 'Speculative Income'}
                </h3>
                <p className="text-gray-700">{wealth.piancai}</p>
              </div>
            </div>

            {/* 理财建议 */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                {locale === 'zh' ? '理财建议' : 'Financial Advice'}
              </h2>
              <div className="bg-gold-50 p-6 rounded-lg">
                <p className="text-gray-700 text-lg">{wealth.advice}</p>
              </div>
            </div>

            {/* 幸运数字 */}
            <div>
              <h3 className="text-xl font-semibold mb-3">
                {locale === 'zh' ? '幸运数字' : 'Lucky Numbers'}
              </h3>
              <div className="flex gap-3">
                {wealth.luckyNumbers.map((num, idx) => (
                  <div
                    key={idx}
                    className="w-16 h-16 rounded-full bg-gold-200 flex items-center justify-center text-2xl font-bold text-gold-800"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
