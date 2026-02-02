'use client';

import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

export default function Footer() {
  const locale = useAppStore((state) => state.locale);
  const t = getTranslation(locale);

  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{t.siteName}</h3>
            <p className="text-gray-400 text-sm">{t.tagline}</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white">首页</Link></li>
              <li><Link href="/destiny" className="hover:text-white">运势中心</Link></li>
              <li><Link href="/match" className="hover:text-white">关系合盘</Link></li>
              <li><Link href="/almanac" className="hover:text-white">择日广场</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">帮助</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/faq" className="hover:text-white">{t.faq}</Link></li>
              <li><Link href="/privacy" className="hover:text-white">{t.privacy}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">合规声明</h4>
            <p className="text-xs text-gray-400">{t.disclaimer}</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 {t.siteName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
