'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Disclaimer from '@/components/Disclaimer';
import { useAppStore } from '@/lib/store';
import { calculateBazi, generateFortuneReport } from '@/lib/bazi';
import { generateFortuneReport as genReport } from '@/lib/ai-interpretation';
import { getTranslation } from '@/lib/i18n';
import type { BirthInfo } from '@/lib/bazi';

export default function InputPage() {
  const router = useRouter();
  const locale = useAppStore((state) => state.locale);
  const setBirthInfo = useAppStore((state) => state.setBirthInfo);
  const setBaziData = useAppStore((state) => state.setBaziData);
  const setFortuneReport = useAppStore((state) => state.setFortuneReport);
  const t = getTranslation(locale);

  const [formData, setFormData] = useState<Partial<BirthInfo>>({
    name: '',
    gender: 'male',
    birthDate: '',
    birthTime: '12:00',
    timezone: 'Asia/Singapore',
    isLunar: false,
    unknownTime: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证
    const newErrors: Record<string, string> = {};
    if (!formData.name) {
      newErrors.name = locale === 'zh' ? '请输入姓名' : 'Please enter name';
    }
    if (!formData.birthDate) {
      newErrors.birthDate = locale === 'zh' ? '请选择出生日期' : 'Please select birth date';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 计算八字
    const birthInfo = formData as BirthInfo;
    const bazi = calculateBazi(birthInfo);
    const report = genReport(bazi, new Date(birthInfo.birthDate).getFullYear(), locale);

    // 保存到store
    setBirthInfo(birthInfo);
    setBaziData(bazi);
    setFortuneReport(report);

    // 添加到历史记录
    const { addHistory } = useAppStore.getState();
    addHistory({
      id: Date.now().toString(),
      name: birthInfo.name,
      date: new Date().toISOString(),
      bazi,
    });

    // 跳转到结果页
    router.push('/result');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <Disclaimer />
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">
              {locale === 'zh' ? '信息录入' : 'Enter Information'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 姓名 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'zh' ? '姓名' : 'Name'}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  placeholder={locale === 'zh' ? '请输入您的姓名' : 'Enter your name'}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* 性别 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'zh' ? '性别' : 'Gender'}
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
                      className="mr-2"
                    />
                    {locale === 'zh' ? '男' : 'Male'}
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
                      className="mr-2"
                    />
                    {locale === 'zh' ? '女' : 'Female'}
                  </label>
                </div>
              </div>

              {/* 出生日期 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'zh' ? '出生日期' : 'Birth Date'}
                </label>
                <div className="flex items-center space-x-4 mb-2">
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  />
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isLunar}
                      onChange={(e) => setFormData({ ...formData, isLunar: e.target.checked })}
                      className="mr-2"
                    />
                    {locale === 'zh' ? '农历' : 'Lunar'}
                  </label>
                </div>
                {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
              </div>

              {/* 出生时间 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'zh' ? '出生时间' : 'Birth Time'}
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="time"
                    value={formData.birthTime}
                    onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                    disabled={formData.unknownTime}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent disabled:bg-gray-100"
                  />
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.unknownTime}
                      onChange={(e) => setFormData({ ...formData, unknownTime: e.target.checked })}
                      className="mr-2"
                    />
                    {locale === 'zh' ? '不清楚具体时间' : 'Unknown'}
                  </label>
                </div>
              </div>

              {/* 时区 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'zh' ? '时区' : 'Timezone'}
                </label>
                <select
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                >
                  <option value="Asia/Singapore">Singapore (UTC+8)</option>
                  <option value="Asia/Kuala_Lumpur">Malaysia (UTC+8)</option>
                  <option value="Asia/Jakarta">Indonesia (UTC+7)</option>
                  <option value="Asia/Bangkok">Thailand (UTC+7)</option>
                  <option value="Asia/Ho_Chi_Minh">Vietnam (UTC+7)</option>
                </select>
              </div>

              {/* 提交按钮 */}
              <button
                type="submit"
                className="w-full bg-gold-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-gold-700 transition"
              >
                {locale === 'zh' ? '开始测算' : 'Start Reading'}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
