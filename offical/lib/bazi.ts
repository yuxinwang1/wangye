// 八字排盘核心逻辑
import dayjs from 'dayjs';

export interface BaziData {
  year: string;      // 年柱
  month: string;     // 月柱
  day: string;       // 日柱
  hour: string;      // 时柱
  wuxing: {          // 五行能量
    jin: number;     // 金
    mu: number;      // 木
    shui: number;    // 水
    huo: number;     // 火
    tu: number;      // 土
  };
  shishen: string[]; // 十神
  xiyong: string[];  // 喜用神
}

export interface BirthInfo {
  name: string;
  gender: 'male' | 'female';
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:mm
  timezone: string;
  isLunar: boolean;
  unknownTime?: boolean;
}

// 天干
const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
// 地支
const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
// 五行
const WU_XING = ['木', '火', '土', '金', '水'];

// 计算八字
export function calculateBazi(info: BirthInfo): BaziData {
  let date = dayjs(info.birthDate);
  
  // 如果是农历，转换为阳历
  // 注意：这里使用简化处理，实际生产环境需要专业的农历转换库
  // 农历转阳历的精确计算比较复杂，这里暂时提示用户使用阳历
  if (info.isLunar) {
    // TODO: 集成专业的农历转换库（如lunisolar、chinese-lunar等）
    // 目前暂时使用原日期，建议用户直接输入阳历日期
    console.warn('Lunar to solar conversion not implemented yet. Please use solar calendar date.');
  }

  const year = date.year();
  const month = date.month() + 1;
  const day = date.date();
  const hour = parseInt(info.birthTime.split(':')[0]) || 12;

  // 计算年柱
  const yearGan = (year - 4) % 10;
  const yearZhi = (year - 4) % 12;
  const yearZhu = `${TIAN_GAN[yearGan]}${DI_ZHI[yearZhi]}`;

  // 计算月柱
  const monthGan = ((year % 5 === 0 ? 2 : year % 5) * 2 + month) % 10;
  const monthZhi = (month + 1) % 12;
  const monthZhu = `${TIAN_GAN[monthGan]}${DI_ZHI[monthZhi]}`;

  // 计算日柱（简化算法）
  const baseDate = dayjs('1900-01-01');
  const daysDiff = date.diff(baseDate, 'day');
  const dayGan = (daysDiff + 9) % 10;
  const dayZhi = (daysDiff + 9) % 12;
  const dayZhu = `${TIAN_GAN[dayGan]}${DI_ZHI[dayZhi]}`;

  // 计算时柱
  const hourZhiIndex = Math.floor((hour + 1) / 2) % 12;
  const dayGanIndex = dayGan;
  const hourGanIndex = ((dayGanIndex % 5) * 2 + hourZhiIndex) % 10;
  const hourZhu = `${TIAN_GAN[hourGanIndex]}${DI_ZHI[hourZhiIndex]}`;

  // 计算五行能量（简化）
  const wuxing = calculateWuxing(yearZhu, monthZhu, dayZhu, hourZhu);

  // 计算十神和喜用神（简化）
  const shishen = calculateShishen(dayZhu);
  const xiyong = calculateXiyong(wuxing);

  return {
    year: yearZhu,
    month: monthZhu,
    day: dayZhu,
    hour: hourZhu,
    wuxing,
    shishen,
    xiyong,
  };
}

function calculateWuxing(year: string, month: string, day: string, hour: string): BaziData['wuxing'] {
  // 简化版五行计算
  const ganZhiToWuxing: Record<string, number[]> = {
    '甲': [1, 0, 0, 0, 0], '乙': [1, 0, 0, 0, 0],
    '丙': [0, 1, 0, 0, 0], '丁': [0, 1, 0, 0, 0],
    '戊': [0, 0, 1, 0, 0], '己': [0, 0, 1, 0, 0],
    '庚': [0, 0, 0, 1, 0], '辛': [0, 0, 0, 1, 0],
    '壬': [0, 0, 0, 0, 1], '癸': [0, 0, 0, 0, 1],
  };

  let wuxing = { jin: 0, mu: 0, shui: 0, huo: 0, tu: 0 };
  
  [year, month, day, hour].forEach(zhu => {
    const gan = zhu[0];
    const zhi = zhu[1];
    const ganWx = ganZhiToWuxing[gan] || [0, 0, 0, 0, 0];
    wuxing.mu += ganWx[0];
    wuxing.huo += ganWx[1];
    wuxing.tu += ganWx[2];
    wuxing.jin += ganWx[3];
    wuxing.shui += ganWx[4];
  });

  // 归一化到0-100
  const total = wuxing.mu + wuxing.huo + wuxing.tu + wuxing.jin + wuxing.shui;
  if (total > 0) {
    Object.keys(wuxing).forEach(key => {
      wuxing[key as keyof typeof wuxing] = Math.round((wuxing[key as keyof typeof wuxing] / total) * 100);
    });
  }

  return wuxing;
}

function calculateShishen(dayZhu: string): string[] {
  // 简化版十神计算
  return ['正官', '偏财', '食神'];
}

function calculateXiyong(wuxing: BaziData['wuxing']): string[] {
  // 找出最弱和最強的五行
  const values = Object.values(wuxing);
  const min = Math.min(...values);
  const max = Math.max(...values);
  
  const xiyong: string[] = [];
  if (wuxing.mu === min) xiyong.push('木');
  if (wuxing.huo === min) xiyong.push('火');
  if (wuxing.tu === min) xiyong.push('土');
  if (wuxing.jin === min) xiyong.push('金');
  if (wuxing.shui === min) xiyong.push('水');
  
  return xiyong;
}

// 获取生肖
export function getShengxiao(year: number): string {
  const shengxiao = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
  return shengxiao[(year - 4) % 12];
}
