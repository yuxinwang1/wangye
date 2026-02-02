'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

export default function ResultPage() {
  const router = useRouter();
  const locale = useAppStore((state) => state.locale);
  const baziData = useAppStore((state) => state.baziData);
  const fortuneReport = useAppStore((state) => state.fortuneReport);
  const t = getTranslation(locale);

  if (!baziData || !fortuneReport) {
    router.push('/input');
    return null;
  }

  const { overall, career, wealth, love } = fortuneReport;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* 八字总览 */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h1 className="text-3xl font-bold mb-6 text-center">
              {locale === 'zh' ? '您的八字命盘' : 'Your Bazi Chart'}
            </h1>
            
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 bg-gold-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">{locale === 'zh' ? '年柱' : 'Year'}</div>
                <div className="text-2xl font-bold">{baziData.year}</div>
              </div>
              <div className="text-center p-4 bg-gold-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">{locale === 'zh' ? '月柱' : 'Month'}</div>
                <div className="text-2xl font-bold">{baziData.month}</div>
              </div>
              <div className="text-center p-4 bg-gold-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">{locale === 'zh' ? '日柱' : 'Day'}</div>
                <div className="text-2xl font-bold">{baziData.day}</div>
              </div>
              <div className="text-center p-4 bg-gold-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">{locale === 'zh' ? '时柱' : 'Hour'}</div>
                <div className="text-2xl font-bold">{baziData.hour}</div>
              </div>
            </div>

            {/* 五行能量 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">
                {locale === 'zh' ? '五行能量' : 'Five Elements Energy'}
              </h3>
              <div className="space-y-3">
                {[
                  { key: 'mu', label: locale === 'zh' ? '木' : 'Wood', color: 'bg-green-500' },
                  { key: 'huo', label: locale === 'zh' ? '火' : 'Fire', color: 'bg-red-500' },
                  { key: 'tu', label: locale === 'zh' ? '土' : 'Earth', color: 'bg-yellow-500' },
                  { key: 'jin', label: locale === 'zh' ? '金' : 'Metal', color: 'bg-gray-500' },
                  { key: 'shui', label: locale === 'zh' ? '水' : 'Water', color: 'bg-blue-500' },
                ].map((item) => {
                  const value = baziData.wuxing[item.key as keyof typeof baziData.wuxing];
                  return (
                    <div key={item.key}>
                      <div className="flex justify-between mb-1">
                        <span>{item.label}</span>
                        <span>{value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${item.color} h-2 rounded-full transition-all`}
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 总体运势 */}
            <div className="bg-gradient-to-r from-gold-100 to-gold-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                {locale === 'zh' ? '总体运势评分' : 'Overall Fortune Score'}
              </h3>
              <div className="text-4xl font-bold text-gold-600 mb-2">{overall.score}</div>
              <p className="text-gray-700">{overall.summary}</p>
            </div>
          </div>

          {/* 详细分析入口 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Link
              href="/result/career"
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition text-center"
            >
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-semibold mb-2">
                {locale === 'zh' ? '事业运势' : 'Career'}
              </h3>
              <div className="text-3xl font-bold text-gold-600 mb-2">{career.score}</div>
              <p className="text-gray-600 text-sm">{career.summary.substring(0, 50)}...</p>
            </Link>

            <Link
              href="/result/wealth"
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition text-center"
            >
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">
                {locale === 'zh' ? '财运分析' : 'Wealth'}
              </h3>
              <div className="text-3xl font-bold text-gold-600 mb-2">{wealth.score}</div>
              <p className="text-gray-600 text-sm">{wealth.summary.substring(0, 50)}...</p>
            </Link>

            <Link
              href="/result/love"
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition text-center"
            >
              <div className="text-4xl mb-4">💕</div>
              <h3 className="text-xl font-semibold mb-2">
                {locale === 'zh' ? '感情运势' : 'Love'}
              </h3>
              <div className="text-3xl font-bold text-gold-600 mb-2">{love.score}</div>
              <p className="text-gray-600 text-sm">{love.summary.substring(0, 50)}...</p>
            </Link>
          </div>

          {/* 操作按钮 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Link
                href="/result/share"
                className="flex-1 bg-gold-600 text-white py-3 rounded-lg font-semibold text-center hover:bg-gold-700 transition"
              >
                {locale === 'zh' ? '生成分享海报' : 'Generate Share Poster'}
              </Link>
              <Link
                href="/result/save"
                className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold text-center hover:bg-gray-700 transition"
              >
                {locale === 'zh' ? '保存报告' : 'Save Report'}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
