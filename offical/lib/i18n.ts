// 多语言支持
export type Locale = 'zh' | 'en';

export const translations = {
  zh: {
    siteName: '聚运阁',
    tagline: '最懂东南亚华人的AI命理管家',
    home: '首页',
    destiny: '运势中心',
    match: '关系合盘',
    almanac: '民俗择日',
    settings: '个人中心',
    startReading: '开始测算',
    disclaimer: '本站内容基于民俗文化大数据，结果仅供娱乐参考。不构成任何医疗、投资或专业决策建议。',
    privacy: '隐私保护',
    faq: '常见问题',
    // ... 更多翻译
  },
  en: {
    siteName: 'DestinyHub SEA',
    tagline: 'Your AI Destiny Guide for Southeast Asian Chinese',
    home: 'Home',
    destiny: 'Destiny',
    match: 'Match',
    almanac: 'Almanac',
    settings: 'Settings',
    startReading: 'Start Reading',
    disclaimer: 'This site is based on cultural big data analysis. Results are for entertainment purposes only and do not constitute medical, investment, or professional advice.',
    privacy: 'Privacy',
    faq: 'FAQ',
    // ... 更多翻译
  },
};

export function getTranslation(locale: Locale) {
  return translations[locale];
}
