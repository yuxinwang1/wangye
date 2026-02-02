'use client';

import { useAppStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

export default function Disclaimer() {
  const locale = useAppStore((state) => state.locale);
  const t = getTranslation(locale);

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <span className="text-yellow-400 text-xl">⚠️</span>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            {t.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
