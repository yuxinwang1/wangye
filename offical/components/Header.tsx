'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const locale = useAppStore((state) => state.locale);
  const setLocale = useAppStore((state) => state.setLocale);
  const t = getTranslation(locale);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gold-600">
            {t.siteName}
          </Link>
          
          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-gold-600">
              {t.home}
            </Link>
            <Link href="/destiny" className="text-gray-700 hover:text-gold-600">
              {t.destiny}
            </Link>
            <Link href="/match" className="text-gray-700 hover:text-gold-600">
              {t.match}
            </Link>
            <Link href="/almanac" className="text-gray-700 hover:text-gold-600">
              {t.almanac}
            </Link>
            <Link href="/settings" className="text-gray-700 hover:text-gold-600">
              {t.settings}
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            {/* 语言切换 */}
            <div className="hidden md:flex space-x-2">
              <button
                onClick={() => setLocale('zh')}
                className={`px-3 py-1 rounded ${locale === 'zh' ? 'bg-gold-600 text-white' : 'text-gray-600'}`}
              >
                中
              </button>
              <button
                onClick={() => setLocale('en')}
                className={`px-3 py-1 rounded ${locale === 'en' ? 'bg-gold-600 text-white' : 'text-gray-600'}`}
              >
                EN
              </button>
            </div>

            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3 pt-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-gold-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.home}
              </Link>
              <Link 
                href="/destiny" 
                className="text-gray-700 hover:text-gold-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.destiny}
              </Link>
              <Link 
                href="/match" 
                className="text-gray-700 hover:text-gold-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.match}
              </Link>
              <Link 
                href="/almanac" 
                className="text-gray-700 hover:text-gold-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.almanac}
              </Link>
              <Link 
                href="/settings" 
                className="text-gray-700 hover:text-gold-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.settings}
              </Link>
              <div className="flex space-x-2 pt-2 border-t border-gray-200">
                <button
                  onClick={() => setLocale('zh')}
                  className={`flex-1 px-3 py-2 rounded ${locale === 'zh' ? 'bg-gold-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  中文
                </button>
                <button
                  onClick={() => setLocale('en')}
                  className={`flex-1 px-3 py-2 rounded ${locale === 'en' ? 'bg-gold-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  English
                </button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
