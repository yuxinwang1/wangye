'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import dayjs from 'dayjs';

export default function DailyPage() {
  const locale = useAppStore((state) => state.locale);
  const today = dayjs();

  // 简化的每日宜忌
  const yiji = {
    yi: locale === 'zh' 
      ? ['出行', '签约', '开业', '搬家', '结婚']
      : ['Travel', 'Sign Contract', 'Open Business', 'Move', 'Marry'],
    ji: locale === 'zh'
      ? ['投资', '手术', '争吵', '借贷']
      : ['Invest', 'Surgery', 'Argue', 'Borrow'],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">
                {locale === 'zh' ? '每日宜忌' : 'Daily Guide'}
              </h1>
              <Link href="/destiny" className="text-gold-600 hover:underline">
                {locale === 'zh' ? '← 返回' : '← Back'}
              </Link>
            </div>

            <div className="text-center mb-8">
              <div className="text-4xl font-bold text-gold-600 mb-2">
                {today.format(locale === 'zh' ? 'YYYY年MM月DD日' : 'MMMM DD, YYYY')}
              </div>
              <div className="text-xl text-gray-600">
                {today.format('dddd')}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 宜 */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-green-800 mb-4">
                  {locale === 'zh' ? '今日宜' : 'Auspicious'}
                </h2>
                <ul className="space-y-2">
                  {yiji.yi.map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-green-600 mr-3">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 忌 */}
              <div className="bg-red-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-red-800 mb-4">
                  {locale === 'zh' ? '今日忌' : 'Avoid'}
                </h2>
                <ul className="space-y-2">
                  {yiji.ji.map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-red-600 mr-3">✗</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">
                {locale === 'zh' ? '今日运势提示' : 'Today\'s Fortune Tip'}
              </h3>
              <p className="text-gray-700">
                {locale === 'zh'
                  ? '今日整体运势平稳，适合处理日常事务。注意保持良好心态，避免冲动决策。'
                  : 'Today\'s overall fortune is stable, suitable for handling daily affairs. Maintain a good mindset and avoid impulsive decisions.'}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
