'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

export default function NamePage() {
  const locale = useAppStore((state) => state.locale);
  const baziData = useAppStore((state) => state.baziData);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const generateNameSuggestions = () => {
    if (!baziData) {
      alert(locale === 'zh' ? '请先进行八字排盘' : 'Please do Bazi reading first');
      return;
    }

    // 简化的取名建议（基于五行缺损）
    const xiyong = baziData.xiyong;
    const nameChars: Record<string, string[]> = {
      '木': ['林', '森', '树', '植', '柏'],
      '火': ['炎', '煜', '灿', '明', '亮'],
      '土': ['坤', '培', '城', '坚', '基'],
      '金': ['金', '银', '钢', '锋', '锐'],
      '水': ['海', '江', '河', '波', '涛'],
    };

    const suggestions: string[] = [];
    xiyong.forEach((element) => {
      const chars = nameChars[element] || [];
      chars.forEach((char) => {
        suggestions.push(char + '华', char + '文', char + '明');
      });
    });

    setSuggestions(suggestions.slice(0, 12));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">
              {locale === 'zh' ? '取名建议' : 'Name Suggestions'}
            </h1>

            {!baziData ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-6">
                  {locale === 'zh' 
                    ? '请先进行八字排盘，以便根据五行缺损推荐合适的字符'
                    : 'Please do Bazi reading first to get name suggestions based on five elements'}
                </p>
                <a
                  href="/input"
                  className="inline-block bg-gold-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gold-700 transition"
                >
                  {locale === 'zh' ? '开始排盘' : 'Start Reading'}
                </a>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-gray-700 mb-4">
                    {locale === 'zh'
                      ? `根据您的八字分析，喜用神为：${baziData.xiyong.join('、')}。以下是为您推荐的字符：`
                      : `Based on your Bazi analysis, favorable elements are: ${baziData.xiyong.join(', ')}. Here are recommended characters:`}
                  </p>
                  <button
                    onClick={generateNameSuggestions}
                    className="bg-gold-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gold-700 transition"
                  >
                    {locale === 'zh' ? '生成建议' : 'Generate Suggestions'}
                  </button>
                </div>

                {suggestions.length > 0 && (
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                    {suggestions.map((name, idx) => (
                      <div
                        key={idx}
                        className="bg-gold-50 p-4 rounded-lg text-center font-semibold text-lg"
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
