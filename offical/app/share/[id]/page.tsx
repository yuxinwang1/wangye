'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

export default function ShareLandingPage() {
  const locale = useAppStore((state) => state.locale);
  const t = getTranslation(locale);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-6">🎁</div>
            <h1 className="text-3xl font-bold mb-4">
              {locale === 'zh' 
                ? '你的好友送你一张2026护身符'
                : 'Your friend sent you a 2026 talisman'}
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              {locale === 'zh'
                ? '立即查看你的运势，把握2026年的每一个机会！'
                : 'Check your fortune now and seize every opportunity in 2026!'}
            </p>

            <Link
              href="/input"
              className="inline-block bg-gold-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gold-700 transition"
            >
              {locale === 'zh' ? '快速测算' : 'Quick Reading'}
            </Link>

            <div className="mt-12 bg-gold-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                {locale === 'zh' ? '为什么选择聚运阁？' : 'Why Choose DestinyHub?'}
              </h2>
              <ul className="text-left space-y-2 text-gray-700 max-w-md mx-auto">
                <li>✓ {locale === 'zh' ? '最懂东南亚华人的AI命理管家' : 'AI fortune guide for Southeast Asian Chinese'}</li>
                <li>✓ {locale === 'zh' ? '结合本地文化的专业解读' : 'Professional interpretation with local culture'}</li>
                <li>✓ {locale === 'zh' ? '一键生成精美分享海报' : 'One-click beautiful share poster'}</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
