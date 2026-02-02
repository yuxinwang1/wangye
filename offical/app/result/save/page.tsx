'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

export default function SavePage() {
  const locale = useAppStore((state) => state.locale);
  const baziData = useAppStore((state) => state.baziData);
  const fortuneReport = useAppStore((state) => state.fortuneReport);
  const t = getTranslation(locale);

  if (!baziData || !fortuneReport) {
    return null;
  }

  // 生成短链（实际应用中应该调用后端API）
  const shortUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/share/${Date.now()}`
    : '';

  const handleCopyLink = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shortUrl);
      alert(locale === 'zh' ? '链接已复制' : 'Link copied');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">
              {locale === 'zh' ? '保存报告' : 'Save Report'}
            </h1>

            <div className="space-y-6">
              {/* 报告摘要 */}
              <div className="bg-gold-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">
                  {locale === 'zh' ? '报告摘要' : 'Report Summary'}
                </h2>
                <p className="text-gray-700 mb-2">
                  <strong>{locale === 'zh' ? '八字：' : 'Bazi: '}</strong>
                  {baziData.year} {baziData.month} {baziData.day} {baziData.hour}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>{locale === 'zh' ? '总体评分：' : 'Overall Score: '}</strong>
                  {fortuneReport.overall.score}
                </p>
                <p className="text-gray-700">{fortuneReport.overall.summary}</p>
              </div>

              {/* 分享链接 */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  {locale === 'zh' ? '分享链接' : 'Share Link'}
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shortUrl}
                    readOnly
                    className="flex-1 px-4 py-2 border rounded-lg bg-gray-50"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="bg-gold-600 text-white px-6 py-2 rounded-lg hover:bg-gold-700 transition"
                  >
                    {locale === 'zh' ? '复制' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-4">
                <Link
                  href="/result/share"
                  className="flex-1 bg-gold-600 text-white py-3 rounded-lg font-semibold text-center hover:bg-gold-700 transition"
                >
                  {locale === 'zh' ? '生成海报' : 'Generate Poster'}
                </Link>
                <Link
                  href="/result"
                  className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold text-center hover:bg-gray-700 transition"
                >
                  {locale === 'zh' ? '返回' : 'Back'}
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
