'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import type { BirthInfo } from '@/lib/bazi';

export default function MatchPage() {
  const router = useRouter();
  const locale = useAppStore((state) => state.locale);
  const t = getTranslation(locale);

  const [person1, setPerson1] = useState<Partial<BirthInfo>>({
    name: '',
    gender: 'male',
    birthDate: '',
    birthTime: '12:00',
  });

  const [person2, setPerson2] = useState<Partial<BirthInfo>>({
    name: '',
    gender: 'female',
    birthDate: '',
    birthTime: '12:00',
  });

  const [matchResult, setMatchResult] = useState<{
    score: number;
    summary: string;
    points: string[];
  } | null>(null);

  const handleMatch = () => {
    // 简化的匹配计算
    const score = 75 + Math.floor(Math.random() * 20);
    const summary = locale === 'zh'
      ? '两人八字相合，关系较为和谐，但需要注意沟通方式。'
      : 'The two Bazi charts are compatible, relationship is relatively harmonious, but pay attention to communication.';
    
    const points = locale === 'zh'
      ? [
          '性格互补，能够相互理解',
          '价值观相近，容易达成共识',
          '需要注意在重要决策时的沟通',
          '建议定期进行深度交流',
        ]
      : [
          'Complementary personalities, can understand each other',
          'Similar values, easy to reach consensus',
          'Need to pay attention to communication in important decisions',
          'Regular deep communication recommended',
        ];

    setMatchResult({ score, summary, points });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-12">
            {locale === 'zh' ? '关系合盘' : 'Compatibility Match'}
          </h1>

          {!matchResult ? (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 第一人 */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    {locale === 'zh' ? '第一人信息' : 'Person 1'}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {locale === 'zh' ? '姓名' : 'Name'}
                      </label>
                      <input
                        type="text"
                        value={person1.name}
                        onChange={(e) => setPerson1({ ...person1, name: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {locale === 'zh' ? '出生日期' : 'Birth Date'}
                      </label>
                      <input
                        type="date"
                        value={person1.birthDate}
                        onChange={(e) => setPerson1({ ...person1, birthDate: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {locale === 'zh' ? '出生时间' : 'Birth Time'}
                      </label>
                      <input
                        type="time"
                        value={person1.birthTime}
                        onChange={(e) => setPerson1({ ...person1, birthTime: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* 第二人 */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">
                    {locale === 'zh' ? '第二人信息' : 'Person 2'}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {locale === 'zh' ? '姓名' : 'Name'}
                      </label>
                      <input
                        type="text"
                        value={person2.name}
                        onChange={(e) => setPerson2({ ...person2, name: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {locale === 'zh' ? '出生日期' : 'Birth Date'}
                      </label>
                      <input
                        type="date"
                        value={person2.birthDate}
                        onChange={(e) => setPerson2({ ...person2, birthDate: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {locale === 'zh' ? '出生时间' : 'Birth Time'}
                      </label>
                      <input
                        type="time"
                        value={person2.birthTime}
                        onChange={(e) => setPerson2({ ...person2, birthTime: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleMatch}
                className="w-full mt-8 bg-gold-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-gold-700 transition"
              >
                {locale === 'zh' ? '开始匹配' : 'Start Matching'}
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-gold-600 mb-4">
                  {matchResult.score}
                </div>
                <p className="text-xl text-gray-700">{matchResult.summary}</p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  {locale === 'zh' ? '匹配分析' : 'Match Analysis'}
                </h3>
                <ul className="space-y-3">
                  {matchResult.points.map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-gold-600 mr-3">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setMatchResult(null)}
                className="w-full mt-8 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
              >
                {locale === 'zh' ? '重新匹配' : 'Match Again'}
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
