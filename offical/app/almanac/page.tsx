'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import dayjs from 'dayjs';

export default function AlmanacPage() {
  const locale = useAppStore((state) => state.locale);

  // 生成当月日历
  const today = dayjs();
  const firstDay = today.startOf('month');
  const daysInMonth = today.daysInMonth();
  const startDay = firstDay.day();

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // 简化的吉凶判断
  const getDayFortune = (day: number) => {
    if (day % 3 === 0) return { type: 'good', label: locale === 'zh' ? '吉' : 'Good' };
    if (day % 3 === 1) return { type: 'normal', label: locale === 'zh' ? '平' : 'Normal' };
    return { type: 'bad', label: locale === 'zh' ? '忌' : 'Avoid' };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-12">
            {locale === 'zh' ? '择日广场' : 'Almanac'}
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">
                {today.format(locale === 'zh' ? 'YYYY年MM月' : 'MMMM YYYY')}
              </h2>
              <p className="text-gray-600">
                {locale === 'zh' ? '选择吉日良辰' : 'Choose auspicious dates'}
              </p>
            </div>

            {/* 日历网格 */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['日', '一', '二', '三', '四', '五', '六'].map((day, idx) => (
                <div key={idx} className="text-center font-semibold text-gray-600 py-2">
                  {locale === 'en' ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][idx] : day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {days.map((day, idx) => {
                if (day === null) {
                  return <div key={idx} className="aspect-square" />;
                }
                const fortune = getDayFortune(day);
                const isToday = day === today.date();
                return (
                  <div
                    key={idx}
                    className={`aspect-square border rounded-lg flex flex-col items-center justify-center ${
                      fortune.type === 'good'
                        ? 'bg-green-50 border-green-300'
                        : fortune.type === 'bad'
                        ? 'bg-red-50 border-red-300'
                        : 'bg-gray-50 border-gray-300'
                    } ${isToday ? 'ring-2 ring-gold-500' : ''}`}
                  >
                    <div className="font-semibold">{day}</div>
                    <div className="text-xs">{fortune.label}</div>
                  </div>
                );
              })}
            </div>

            {/* 图例 */}
            <div className="flex justify-center gap-6 mt-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-50 border border-green-300 rounded" />
                <span>{locale === 'zh' ? '吉日' : 'Good Day'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-50 border border-gray-300 rounded" />
                <span>{locale === 'zh' ? '平日' : 'Normal Day'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-50 border border-red-300 rounded" />
                <span>{locale === 'zh' ? '忌日' : 'Avoid Day'}</span>
              </div>
            </div>
          </div>

          {/* 本地节庆标注 */}
          <div className="bg-white rounded-lg shadow-lg p-8 mt-6">
            <h3 className="text-2xl font-semibold mb-4">
              {locale === 'zh' ? '本地节庆' : 'Local Festivals'}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-gold-600 mr-3">🎉</span>
                <span>{locale === 'zh' ? '开斋节后择日' : 'Post-Hari Raya Date Selection'}</span>
              </li>
              <li className="flex items-center">
                <span className="text-gold-600 mr-3">🎉</span>
                <span>{locale === 'zh' ? '卫塞节' : 'Vesak Day'}</span>
              </li>
              <li className="flex items-center">
                <span className="text-gold-600 mr-3">🎉</span>
                <span>{locale === 'zh' ? '农历新年' : 'Chinese New Year'}</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
