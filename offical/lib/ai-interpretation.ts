// AI运势解读
import { BaziData } from './bazi';
import { getShengxiao } from './bazi';

export interface FortuneReport {
  career: CareerFortune;
  wealth: WealthFortune;
  love: LoveFortune;
  overall: OverallFortune;
}

export interface CareerFortune {
  score: number; // 0-100
  summary: string;
  opportunities: string[];
  warnings: string[];
  luckyColors: string[];
  luckyDirections: string[];
  favorableIndustries: string[];
  avoidMonths: number[];
}

export interface WealthFortune {
  score: number;
  summary: string;
  zhengcai: string; // 正财
  piancai: string; // 偏财
  advice: string;
  luckyNumbers: number[];
}

export interface LoveFortune {
  score: number;
  summary: string;
  singleIndex: number; // 脱单指数
  advice: string;
  bestMatches: string[]; // 最佳匹配生肖
  avoidPoints: string[];
}

export interface OverallFortune {
  score: number;
  summary: string;
  personality: string[];
  yearTrend: string;
}

// 生成运势报告
export function generateFortuneReport(
  bazi: BaziData,
  birthYear: number,
  locale: 'zh' | 'en' = 'zh'
): FortuneReport {
  const shengxiao = getShengxiao(birthYear);
  
  // 事业运势
  const career = generateCareerFortune(bazi, shengxiao, locale);
  
  // 财运
  const wealth = generateWealthFortune(bazi, shengxiao, locale);
  
  // 感情运势
  const love = generateLoveFortune(bazi, shengxiao, locale);
  
  // 总体运势
  const overall = generateOverallFortune(bazi, shengxiao, locale);
  
  return {
    career,
    wealth,
    love,
    overall,
  };
}

function generateCareerFortune(
  bazi: BaziData,
  shengxiao: string,
  locale: 'zh' | 'en'
): CareerFortune {
  const hasZhengGuan = bazi.shishen.includes('正官');
  const score = hasZhengGuan ? 75 + Math.floor(Math.random() * 20) : 50 + Math.floor(Math.random() * 30);
  
  const industries = locale === 'zh' 
    ? ['金融', '科技', '教育', '医疗', '贸易', '房地产']
    : ['Finance', 'Tech', 'Education', 'Healthcare', 'Trade', 'Real Estate'];
  
  const summary = locale === 'zh'
    ? `从您的八字来看，${hasZhengGuan ? '正官透出，事业运势较为稳定' : '需要更多努力来提升事业运势'}。结合东南亚职场环境，建议在跨文化沟通方面多加注意。`
    : `Based on your Bazi, ${hasZhengGuan ? 'career fortune is relatively stable' : 'more effort is needed to improve career fortune'}. Given the Southeast Asian workplace environment, pay attention to cross-cultural communication.`;
  
  return {
    score,
    summary,
    opportunities: locale === 'zh' 
      ? ['3-5月有贵人相助', '下半年有升职机会', '适合拓展海外业务']
      : ['Support from benefactors in Mar-May', 'Promotion opportunities in H2', 'Suitable for overseas expansion'],
    warnings: locale === 'zh'
      ? ['避免在7-8月做重大决策', '注意与不同文化背景同事的沟通']
      : ['Avoid major decisions in Jul-Aug', 'Pay attention to cross-cultural communication'],
    luckyColors: ['金色', '蓝色'],
    luckyDirections: ['东方', '东南'],
    favorableIndustries: industries.slice(0, 3),
    avoidMonths: [7, 8],
  };
}

function generateWealthFortune(
  bazi: BaziData,
  shengxiao: string,
  locale: 'zh' | 'en'
): WealthFortune {
  const score = 60 + Math.floor(Math.random() * 30);
  
  return {
    score,
    summary: locale === 'zh'
      ? `财运方面，${bazi.wuxing.jin > 20 ? '金旺财旺，正财稳定' : '需要稳健理财，避免盲目投资'}。建议采用保守的理财策略。`
      : `In terms of wealth, ${bazi.wuxing.jin > 20 ? 'strong metal element indicates stable income' : 'conservative financial management is advised'}.`,
    zhengcai: locale === 'zh' ? '正财收入稳定，适合通过工作获得收入' : 'Stable income from work',
    piancai: locale === 'zh' ? '偏财机会较少，不建议高风险投资' : 'Limited speculative opportunities',
    advice: locale === 'zh' ? '近期财务宜保守管理，避免大额盲目支出' : 'Conservative financial management recommended',
    luckyNumbers: [3, 7, 9],
  };
}

function generateLoveFortune(
  bazi: BaziData,
  shengxiao: string,
  locale: 'zh' | 'en'
): LoveFortune {
  const score = 65 + Math.floor(Math.random() * 25);
  const singleIndex = 70 + Math.floor(Math.random() * 20);
  
  const matches = ['兔', '羊', '狗'];
  
  return {
    score,
    summary: locale === 'zh'
      ? `感情运势${score > 75 ? '较为顺利' : '需要主动出击'}，${singleIndex > 80 ? '脱单指数较高' : '需要更多耐心'}。`
      : `Love fortune is ${score > 75 ? 'relatively smooth' : 'requires initiative'}, ${singleIndex > 80 ? 'high single index' : 'needs patience'}.`,
    singleIndex,
    advice: locale === 'zh' ? '在感情中保持真诚，避免过度敏感' : 'Stay sincere in relationships, avoid being overly sensitive',
    bestMatches: matches,
    avoidPoints: locale === 'zh' ? ['避免在争吵时翻旧账', '注意沟通方式'] : ['Avoid bringing up past issues', 'Pay attention to communication'],
  };
}

function generateOverallFortune(
  bazi: BaziData,
  shengxiao: string,
  locale: 'zh' | 'en'
): OverallFortune {
  const avgScore = Math.floor(
    (bazi.wuxing.jin + bazi.wuxing.mu + bazi.wuxing.shui + bazi.wuxing.huo + bazi.wuxing.tu) / 5
  );
  const score = 60 + Math.floor(Math.random() * 30);
  
  return {
    score,
    summary: locale === 'zh'
      ? `整体运势${score > 75 ? '较为平稳' : '有起伏'}，建议把握机会，趋吉避凶。`
      : `Overall fortune is ${score > 75 ? 'relatively stable' : 'fluctuating'}, seize opportunities and avoid risks.`,
    personality: locale === 'zh' 
      ? ['稳重', '有责任心', '善于思考']
      : ['Stable', 'Responsible', 'Thoughtful'],
    yearTrend: locale === 'zh' ? '2026年整体趋势向上，需要把握关键节点' : '2026 trend is upward, seize key moments',
  };
}
