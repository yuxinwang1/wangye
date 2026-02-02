// 全局状态管理
import { create } from 'zustand';
import { BirthInfo } from './bazi';
import { BaziData } from './bazi';
import { FortuneReport } from './ai-interpretation';
import { Locale } from './i18n';

interface AppState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  
  birthInfo: BirthInfo | null;
  setBirthInfo: (info: BirthInfo) => void;
  
  baziData: BaziData | null;
  setBaziData: (data: BaziData) => void;
  
  fortuneReport: FortuneReport | null;
  setFortuneReport: (report: FortuneReport) => void;
  
  history: Array<{
    id: string;
    name: string;
    date: string;
    bazi: BaziData;
  }>;
  addHistory: (item: AppState['history'][0]) => void;
  clearHistory: () => void;
}

// 简单的localStorage持久化
const loadFromStorage = (): Partial<AppState> => {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem('destinyhub-storage');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load from storage', e);
  }
  return {};
};

const saveToStorage = (state: Partial<AppState>) => {
  if (typeof window === 'undefined') return;
  try {
    const toSave = {
      locale: state.locale,
      history: state.history,
    };
    localStorage.setItem('destinyhub-storage', JSON.stringify(toSave));
  } catch (e) {
    console.error('Failed to save to storage', e);
  }
};

const initialState = loadFromStorage();

export const useAppStore = create<AppState>((set) => ({
  locale: (initialState.locale as Locale) || 'zh',
  setLocale: (locale) => {
    set({ locale });
    saveToStorage({ locale });
  },
  
  birthInfo: null,
  setBirthInfo: (info) => set({ birthInfo: info }),
  
  baziData: null,
  setBaziData: (data) => set({ baziData: data }),
  
  fortuneReport: null,
  setFortuneReport: (report) => set({ fortuneReport: report }),
  
  history: initialState.history || [],
  addHistory: (item) => {
    set((state) => {
      const newHistory = [...state.history, item];
      saveToStorage({ history: newHistory });
      return { history: newHistory };
    });
  },
  clearHistory: () => {
    set({ history: [] });
    saveToStorage({ history: [] });
  },
}));
