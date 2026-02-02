'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

export default function LovePage() {
  const locale = useAppStore((state) => state.locale);
  const fortuneReport = useAppStore((state) => state.fortuneReport);

  if (!fortuneReport) {
    return null;
  }

  const { love } = fortuneReport;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">
                {locale === 'zh' ? '感情运势详解' : 'Love Fortune Details'}
              </h1>
              <Link href="/result" className="text-gold-600 hover:underline">
                {locale === 'zh' ? '← 返回' : '← Back'}
              </Link>
            </div>

            {/* 评分 */}
            <div className="bg-gradient-to-r from-pink-100 to-pink-50 p-6 rounded-lg mb-6">
              <div className="text-5xl font-bold text-pink-600 mb-2">{love.score}</div>
              <p className="text-gray-700 text-lg">{love.summary}</p>
            </div>

            {/* 脱单指数 */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                {locale === 'zh' ? '脱单指数' : 'Single Index'}
              </h2>
              <div className="bg-pink-50 p-6 rounded-lg">
                <div className="text-4xl font-bold text-pink-600 mb-2">{love.singleIndex}</div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-pink-500 h-4 rounded-full transition-all"
                    style={{ width: `${love.singleIndex}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 相处建议 */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                {locale === 'zh' ? '相处建议' : 'Relationship Advice'}
              </h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-700 text-lg">{love.advice}</p>
              </div>
            </div>

            {/* 最佳匹配 */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                {locale === 'zh' ? '最佳匹配生肖' : 'Best Match Zodiac'}
              </h2>
              <div className="flex flex-wrap gap-3">
                {love.bestMatches.map((match, idx) => (
                  <span
                    key={idx}
                    className="bg-gold-100 text-gold-800 px-6 py-3 rounded-full text-lg font-semibold"
                  >
                    {match}
                  </span>
                ))}
              </div>
            </div>

            {/* 避雷点 */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                {locale === 'zh' ? '相处避雷点' : 'Points to Avoid'}
              </h2>
              <ul className="space-y-3">
                {love.avoidPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-red-500 mr-3">⚠</span>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
