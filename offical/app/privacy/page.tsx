'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

export default function PrivacyPage() {
  const locale = useAppStore((state) => state.locale);
  const t = getTranslation(locale);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-12">
            {locale === 'zh' ? '隐私保护' : 'Privacy Policy'}
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {locale === 'zh' ? '数据收集' : 'Data Collection'}
              </h2>
              <p className="text-gray-700 mb-4">
                {locale === 'zh'
                  ? '我们收集您主动输入的信息，包括姓名、出生日期和时间。这些信息用于生成您的运势报告。'
                  : 'We collect information you actively provide, including name, birth date and time. This information is used to generate your fortune report.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {locale === 'zh' ? '数据存储' : 'Data Storage'}
              </h2>
              <p className="text-gray-700 mb-4">
                {locale === 'zh'
                  ? '默认情况下，您的数据存储在浏览器本地（IndexedDB）。我们不会在服务器上存储您的姓名等个人信息。后端接口仅存储加密后的特征码用于生成报告。'
                  : 'By default, your data is stored locally in your browser (IndexedDB). We do not store personal information like your name on our servers. Backend only stores encrypted feature codes for report generation.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {locale === 'zh' ? '数据使用' : 'Data Usage'}
              </h2>
              <p className="text-gray-700 mb-4">
                {locale === 'zh'
                  ? '您的数据仅用于生成运势报告，不会用于其他目的。我们不会将您的数据出售或分享给第三方。'
                  : 'Your data is only used to generate fortune reports and will not be used for other purposes. We do not sell or share your data with third parties.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {locale === 'zh' ? '数据删除' : 'Data Deletion'}
              </h2>
              <p className="text-gray-700 mb-4">
                {locale === 'zh'
                  ? '您可以随时在个人中心清除所有本地存储的数据。清除后，所有历史记录将被永久删除。'
                  : 'You can clear all locally stored data at any time in the settings page. After clearing, all history will be permanently deleted.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                {locale === 'zh' ? '联系我们' : 'Contact Us'}
              </h2>
              <p className="text-gray-700">
                {locale === 'zh'
                  ? '如有任何隐私相关问题，请通过网站联系我们。'
                  : 'If you have any privacy-related questions, please contact us through the website.'}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
