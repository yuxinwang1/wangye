'use client';

import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import Link from 'next/link';

export default function ZodiacSEOPage() {
  const params = useParams();
  const zodiac = params.zodiac as string;
  const locale = useAppStore((state) => state.locale);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold mb-6">
              {locale === 'zh' 
                ? `属${zodiac}2026年运势`
                : `${zodiac} 2026 Fortune`}
            </h1>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                {locale === 'zh'
                  ? `根据传统命理学，为您解读属${zodiac}的朋友在2026年的整体运势趋势。`
                  : `Based on traditional fortune-telling, we interpret the overall fortune trends for ${zodiac} in 2026.`}
              </p>

              <h2 className="text-2xl font-semibold mb-4">
                {locale === 'zh' ? '整体运势' : 'Overall Fortune'}
              </h2>
              <p className="text-gray-700 mb-6">
                {locale === 'zh'
                  ? `属${zodiac}的朋友在2026年整体运势较为平稳，建议把握关键机会，注意人际关系维护。`
                  : `For ${zodiac}, 2026 shows relatively stable overall fortune. Seize key opportunities and pay attention to relationship maintenance.`}
              </p>

              <h2 className="text-2xl font-semibold mb-4">
                {locale === 'zh' ? '各维度运势' : 'Fortune by Dimension'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">
                    {locale === 'zh' ? '事业' : 'Career'}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {locale === 'zh' ? '稳步发展，有贵人相助' : 'Steady development with support'}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">
                    {locale === 'zh' ? '财运' : 'Wealth'}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {locale === 'zh' ? '正财稳定，偏财谨慎' : 'Stable income, cautious speculation'}
                  </p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">
                    {locale === 'zh' ? '感情' : 'Love'}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {locale === 'zh' ? '感情和谐，注意沟通' : 'Harmonious, pay attention to communication'}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/input"
                  className="inline-block bg-gold-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gold-700 transition"
                >
                  {locale === 'zh' ? '查看个人详细运势' : 'View Personal Detailed Fortune'}
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
