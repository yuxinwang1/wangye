'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import Link from 'next/link';

export default function SettingsPage() {
  const locale = useAppStore((state) => state.locale);
  const history = useAppStore((state) => state.history);
  const clearHistory = useAppStore((state) => state.clearHistory);
  const t = getTranslation(locale);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-12">
            {locale === 'zh' ? '个人中心' : 'Settings'}
          </h1>

          <div className="space-y-6">
            {/* 历史记录 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">
                  {locale === 'zh' ? '测算历史' : 'Reading History'}
                </h2>
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-red-500 hover:underline text-sm"
                  >
                    {locale === 'zh' ? '清除全部' : 'Clear All'}
                  </button>
                )}
              </div>

              {history.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  {locale === 'zh' ? '暂无历史记录' : 'No history yet'}
                </p>
              ) : (
                <div className="space-y-4">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-500">
                            {item.bazi.year} {item.bazi.month} {item.bazi.day} {item.bazi.hour}
                          </p>
                        </div>
                        <Link
                          href="/result"
                          className="text-gold-600 hover:underline"
                        >
                          {locale === 'zh' ? '查看' : 'View'}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 隐私设置 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">
                {locale === 'zh' ? '隐私设置' : 'Privacy Settings'}
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">
                      {locale === 'zh' ? '数据存储' : 'Data Storage'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {locale === 'zh' 
                        ? '数据存储在本地浏览器中'
                        : 'Data stored in local browser'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (confirm(locale === 'zh' ? '确定要清除所有数据吗？' : 'Clear all data?')) {
                      clearHistory();
                      localStorage.clear();
                      alert(locale === 'zh' ? '数据已清除' : 'Data cleared');
                    }
                  }}
                  className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
                >
                  {locale === 'zh' ? '一键清除数据' : 'Clear All Data'}
                </button>
              </div>
            </div>

            {/* 语言设置 */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">
                {locale === 'zh' ? '语言设置' : 'Language Settings'}
              </h2>
              <div className="flex gap-4">
                <button
                  onClick={() => useAppStore.getState().setLocale('zh')}
                  className={`px-6 py-3 rounded-lg font-semibold ${
                    locale === 'zh'
                      ? 'bg-gold-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  中文
                </button>
                <button
                  onClick={() => useAppStore.getState().setLocale('en')}
                  className={`px-6 py-3 rounded-lg font-semibold ${
                    locale === 'en'
                      ? 'bg-gold-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
