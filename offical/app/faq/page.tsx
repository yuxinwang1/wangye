'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

export default function FAQPage() {
  const locale = useAppStore((state) => state.locale);
  const t = getTranslation(locale);

  const faqs = locale === 'zh' 
    ? [
        {
          q: '什么是八字？',
          a: '八字是根据出生年月日时推算出的命理信息，包括年柱、月柱、日柱、时柱四个部分。',
        },
        {
          q: '结果准确吗？',
          a: '本站内容基于民俗文化大数据分析，结果仅供娱乐参考，不构成任何医疗、投资或专业决策建议。',
        },
        {
          q: '我的数据会被保存吗？',
          a: '我们默认不强制注册，生辰数据存储在浏览器本地。后端接口不存储姓名，仅存储加密后的特征码用于生成报告。',
        },
        {
          q: '如何分享我的运势报告？',
          a: '在结果页面点击"生成分享海报"，可以下载精美图片或复制链接分享给好友。',
        },
        {
          q: '支持哪些国家？',
          a: '我们支持新加坡、马来西亚、印尼、泰国、越南等东南亚国家的时区和本地节庆。',
        },
      ]
    : [
        {
          q: 'What is Bazi?',
          a: 'Bazi is a fortune-telling method based on birth date and time, including year, month, day, and hour pillars.',
        },
        {
          q: 'Are the results accurate?',
          a: 'This site is based on cultural big data analysis. Results are for entertainment purposes only and do not constitute medical, investment, or professional advice.',
        },
        {
          q: 'Will my data be saved?',
          a: 'We do not require registration by default. Birth data is stored locally in your browser. Backend does not store names, only encrypted feature codes for report generation.',
        },
        {
          q: 'How to share my fortune report?',
          a: 'Click "Generate Share Poster" on the result page to download a beautiful image or copy a link to share with friends.',
        },
        {
          q: 'Which countries are supported?',
          a: 'We support timezones and local festivals for Singapore, Malaysia, Indonesia, Thailand, Vietnam and other Southeast Asian countries.',
        },
      ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-12">
            {locale === 'zh' ? '常见问题' : 'FAQ'}
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="text-xl font-semibold mb-3 text-gold-600">
                    {faq.q}
                  </h3>
                  <p className="text-gray-700">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 合规声明 */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4 text-red-800">
              {locale === 'zh' ? '重要声明' : 'Important Disclaimer'}
            </h2>
            <p className="text-red-700">{t.disclaimer}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
