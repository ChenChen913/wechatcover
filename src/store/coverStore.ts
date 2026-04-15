import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// 文字图层配置
export interface TextLayerConfig {
  content: string;
  visible: boolean;
  fontFamily: string | undefined;
  fontSize: number;
  fontWeight: 300 | 400 | 500 | 700 | 900;
  fontStyle: 'normal' | 'italic';
  letterSpacing: number;
  lineHeight: number;
  color: string;
  textAlign: 'left' | 'center' | 'right';
  textShadow: string | null;
}

// 标签配置
export interface TagConfig {
  visible: boolean;
  label: string;
  text: string;
  separator: string | undefined;
  background: string | null;
  borderRadius: number;
  padding: string;
}

// 文字区域布局配置
export interface TextBlockConfig {
  hAlign: 'left' | 'center' | 'right';
  widthPercent: number;
  paddingLeft: number;
  paddingRight: number;
  vAlign: 'top' | 'middle' | 'bottom';
  paddingTop: number;
  paddingBottom: number;
}

// 封面完整配置
export interface CoverConfig {
  mainTitle: TextLayerConfig;
  subtitle: TextLayerConfig;
  tag: TagConfig;
  textBlock: TextBlockConfig;
  templateId: string;
  primaryColor: string;
  showSafeZone: boolean;
}

// 默认配置
export function defaultCoverConfig(): CoverConfig {
  return {
    mainTitle: {
      content: '请输入文章标题',
      visible: true,
      fontFamily: 'var(--font-noto-serif)',
      fontSize: 48,
      fontWeight: 700,
      fontStyle: 'normal',
      letterSpacing: 0.04,
      lineHeight: 1.25,
      color: '#ffffff',
      textAlign: 'left',
      textShadow: null,
    },
    subtitle: {
      content: '深度解析 · 独家视角',
      visible: true,
      fontFamily: 'var(--font-noto-sans)',
      fontSize: 18,
      fontWeight: 300,
      fontStyle: 'normal',
      letterSpacing: 0.06,
      lineHeight: 1.5,
      color: 'rgba(255,255,255,0.7)',
      textAlign: 'left',
      textShadow: null,
    },
    tag: {
      visible: true,
      label: '专栏',
      text: '2025 · 深度报道',
      separator: ' | ',
      background: null,
      borderRadius: 0,
      padding: '0px',
    },
    textBlock: {
      hAlign: 'left',
      widthPercent: 55,
      paddingLeft: 7,
      paddingRight: 5,
      vAlign: 'middle',
      paddingTop: 10,
      paddingBottom: 10,
    },
    templateId: 't01',
    primaryColor: '#7c6df0',
    showSafeZone: false,
  };
}

// Store 接口
interface CoverStore {
  // 模式
  activeMode: 'web' | 'prompt';
  
  // 封面配置
  config: CoverConfig;
  
  // 快捷访问（直接存储，不用 getter）
  title: string;
  subtitle: string;
  showSafeZone: boolean;
  
  // UI 状态
  activeControlTab: 'text' | 'font' | 'layout' | 'template';
  isExporting: boolean;
  
  // Actions
  setMode: (mode: 'web' | 'prompt') => void;
  setConfig: (patch: Partial<CoverConfig>) => void;
  setMainTitle: (patch: Partial<TextLayerConfig>) => void;
  setSubtitle: (patch: Partial<TextLayerConfig>) => void;
  setTag: (patch: Partial<TagConfig>) => void;
  setTextBlock: (patch: Partial<TextBlockConfig>) => void;
  setTemplate: (id: string) => void;
  setPrimaryColor: (color: string) => void;
  toggleSafeZone: () => void;
  setActiveControlTab: (tab: 'text' | 'font' | 'layout' | 'template') => void;
  setExporting: (v: boolean) => void;
  setTitle: (title: string) => void;
  
  // 重置
  resetToDefault: () => void;
}

export const useCoverStore = create<CoverStore>()(
  immer((set, get) => ({
    activeMode: 'web',
    config: defaultCoverConfig(),
    activeControlTab: 'text',
    isExporting: false,
    
    // 快捷访问（初始化）
    title: defaultCoverConfig().mainTitle.content,
    subtitle: defaultCoverConfig().subtitle.content,
    showSafeZone: false,
    
    setMode: (mode) => set((state) => {
      state.activeMode = mode;
    }),
    
    setConfig: (patch) => set((state) => {
      Object.assign(state.config, patch);
    }),
    
    setMainTitle: (patch) => set((state) => {
      Object.assign(state.config.mainTitle, patch);
      // 同步更新 title
      if (patch.content !== undefined) {
        state.title = patch.content;
      }
    }),
    
    setSubtitle: (patch) => set((state) => {
      Object.assign(state.config.subtitle, patch);
      // 同步更新 subtitle
      if (patch.content !== undefined) {
        state.subtitle = patch.content;
      }
    }),
    
    setTag: (patch) => set((state) => {
      Object.assign(state.config.tag, patch);
    }),
    
    setTextBlock: (patch) => set((state) => {
      Object.assign(state.config.textBlock, patch);
    }),
    
    setTemplate: (id) => set((state) => {
      state.config.templateId = id;
    }),
    
    setPrimaryColor: (color) => set((state) => {
      state.config.primaryColor = color;
    }),
    
    toggleSafeZone: () => set((state) => {
      state.config.showSafeZone = !state.config.showSafeZone;
      state.showSafeZone = !state.showSafeZone;
    }),
    
    setActiveControlTab: (tab) => set((state) => {
      state.activeControlTab = tab;
    }),
    
    setExporting: (v) => set((state) => {
      state.isExporting = v;
    }),
    
    setTitle: (title) => set((state) => {
      state.config.mainTitle.content = title;
      state.title = title;
    }),
    
    resetToDefault: () => set((state) => {
      state.config = defaultCoverConfig();
      state.title = defaultCoverConfig().mainTitle.content;
      state.subtitle = defaultCoverConfig().subtitle.content;
      state.showSafeZone = false;
    }),
  }))
);
