'use client';

import { useRef } from 'react';
import html2canvas from 'html2canvas';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAppStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

export default function SharePage() {
  const locale = useAppStore((state) => state.locale);
  const baziData = useAppStore((state) => state.baziData);
  const fortuneReport = useAppStore((state) => state.fortuneReport);
  const posterRef = useRef<HTMLDivElement>(null);
  const t = getTranslation(locale);

  const handleDownload = async () => {
    if (!posterRef.current) return;

    try {
      const canvas = await html2canvas(posterRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
      });
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'destiny-poster.png';
      link.href = url;
      link.click();
    } catch (error) {
      console.error('Failed to generate poster:', error);
    }
  };

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    
    if (navigator.share) {
      navigator.share({
        title: locale === 'zh' ? '我的运势报告' : 'My Fortune Report',
        text: locale === 'zh' ? '查看我的运势分析' : 'Check out my fortune analysis',
        url: window.location.href,
      });
    } else if (navigator.clipboard) {
      // 复制链接
      navigator.clipboard.writeText(window.location.href);
      alert(locale === 'zh' ? '链接已复制' : 'Link copied');
    }
  };

  if (!baziData || !fortuneReport) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold text-center mb-8">
            {locale === 'zh' ? '分享海报' : 'Share Poster'}
          </h1>

          {/* 海报预览 */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <div
              ref={posterRef}
              className="bg-gradient-to-br from-gold-400 to-gold-600 text-white p-8 rounded-lg"
              style={{ aspectRatio: '9/16', maxWidth: '400px', margin: '0 auto' }}
            >
              <div className="text-center h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-4">
                    {locale === 'zh' ? '我的运势报告' : 'My Fortune Report'}
                  </h2>
                  <div className="text-2xl mb-4">
                    {baziData.year} {baziData.month} {baziData.day} {baziData.hour}
                  </div>
                </div>
                
                <div className="bg-white/20 rounded-lg p-4 mb-4">
                  <div className="text-4xl font-bold mb-2">
                    {fortuneReport.overall.score}
                  </div>
                  <p className="text-sm">{fortuneReport.overall.summary}</p>
                </div>

                <div className="text-sm opacity-90">
                  <p>{t.siteName}</p>
                  <p>{t.tagline}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={handleDownload}
                className="flex-1 bg-gold-600 text-white py-3 rounded-lg font-semibold hover:bg-gold-700 transition"
              >
                {locale === 'zh' ? '下载图片' : 'Download Image'}
              </button>
              <button
                onClick={handleShare}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                {locale === 'zh' ? '分享' : 'Share'}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
