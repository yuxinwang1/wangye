'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

export default function Home() {
  const locale = useAppStore((state) => state.locale);
  const t = getTranslation(locale);

  const features = [
    {
      title: locale === 'zh' ? '八字排盘' : 'Bazi Reading',
      desc: locale === 'zh' ? '一键生成专业八字命盘' : 'Generate professional Bazi chart',
      link: '/input',
      icon: '🔮',
    },
    {
      title: locale === 'zh' ? '关系合盘' : 'Compatibility',
      desc: locale === 'zh' ? '测试两人关系匹配度' : 'Test relationship compatibility',
      link: '/match',
      icon: '💕',
    },
    {
      title: locale === 'zh' ? '择日广场' : 'Almanac',
      desc: locale === 'zh' ? '选择吉日良辰' : 'Choose auspicious dates',
      link: '/almanac',
      icon: '📅',
    },
  ];

  const testimonials = [
    {
      name: '张先生',
      location: '新加坡',
      text: locale === 'zh' ? '非常准确，帮我避开了很多坑！' : 'Very accurate, helped me avoid many pitfalls!',
    },
    {
      name: 'Ms. Lee',
      location: '马来西亚',
      text: locale === 'zh' ? 'AI解读很专业，建议也很实用。' : 'AI interpretation is professional, advice is practical.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="gradient-gold text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t.tagline}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {locale === 'zh' 
                ? '一键洞察你的流年吉凶'
                : 'One-click insight into your fortune'}
            </p>
            <Link
              href="/input"
              className="inline-block bg-white text-gold-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
            >
              {t.startReading}
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              {locale === 'zh' ? '核心功能' : 'Core Features'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <Link
                  key={idx}
                  href={feature.link}
                  className="bg-white p-6 rounded-lg card-shadow hover:shadow-lg transition text-center"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              {locale === 'zh' ? '用户评价' : 'User Reviews'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg card-shadow">
                  <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-gold-600 font-bold">
                        {testimonial.name[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-gold-400 to-gold-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {locale === 'zh' ? '已有10万+用户验证' : '100,000+ Users Verified'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {locale === 'zh' 
                ? '立即开始您的运势之旅'
                : 'Start your fortune journey now'}
            </p>
            <Link
              href="/input"
              className="inline-block bg-white text-gold-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
            >
              {t.startReading}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
