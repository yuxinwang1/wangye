'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

export default function DayunPage() {
  const locale = useAppStore((state) => state.locale);

  // 模拟未来5年数据
  const years = [2024, 2025, 2026, 2027, 2028];
  const scores = [75, 82, 88, 85, 90];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">
                {locale === 'zh' ? '流年大运' : 'Yearly Fortune Trend'}
              </h1>
              <Link href="/destiny" className="text-gold-600 hover:underline">
                {locale === 'zh' ? '← 返回' : '← Back'}
              </Link>
            </div>

            {/* 折线图区域 */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {locale === 'zh' ? '未来5年运势趋势' : '5-Year Fortune Trend'}
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="relative h-64">
                  {/* 简化的折线图 */}
                  <svg className="w-full h-full" viewBox="0 0 500 200">
                    <polyline
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3"
                      points={years.map((year, idx) => {
                        const x = (idx / (years.length - 1)) * 450 + 25;
                        const y = 180 - (scores[idx] / 100) * 150;
                        return `${x},${y}`;
                      }).join(' ')}
                    />
                    {years.map((year, idx) => {
                      const x = (idx / (years.length - 1)) * 450 + 25;
                      const y = 180 - (scores[idx] / 100) * 150;
                      return (
                        <g key={year}>
                          <circle cx={x} cy={y} r="5" fill="#f59e0b" />
                          <text x={x} y={195} textAnchor="middle" className="text-xs">
                            {year}
                          </text>
                          <text x={x} y={y - 10} textAnchor="middle" className="text-xs font-bold">
                            {scores[idx]}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
            </div>

            {/* 年度详情 */}
            <div className="space-y-4">
              {years.map((year, idx) => (
                <div key={year} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{year}</h3>
                    <div className="text-2xl font-bold text-gold-600">{scores[idx]}</div>
                  </div>
                  <p className="text-gray-600">
                    {locale === 'zh' 
                      ? `整体运势${scores[idx] > 80 ? '较为顺利' : '平稳发展'}，建议把握关键节点，趋吉避凶。`
                      : `Overall fortune is ${scores[idx] > 80 ? 'relatively smooth' : 'stable'}, seize key moments.`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
