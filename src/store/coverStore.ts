import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface TextLayerConfig {
  content: string;
  visible: boolean;
  fontFamily: string | undefined;
  fontSize: number;
  fontWeight: 300 | 400 | 500 | 700 | 900;
  fontStyle: 'normal' | 'italic';
  letterSpacing: number;
  lineHeight: number;
  color: string | undefined;
  textShadow: string | null;
  maxWidth: number;
  useGradient: boolean;
  gradientFrom: string;
  gradientTo: string;
  maxCharsPerLine: number;
}

export interface TagConfig {
  visible: boolean;
  label: string;
  text: string;
  separator: string | undefined;
  background: string | null;
  borderRadius: number;
  paddingX: number;
  paddingY: number;
}

export interface TextBlockConfig {
  hAlign: 'left' | 'center' | 'right';
  widthPercent: number;
  vAlign: 'top' | 'middle' | 'bottom';
  paddingTop: number;
  paddingBottom: number;
}

export interface CoverConfig {
  mainTitle: TextLayerConfig;
  subtitle: TextLayerConfig;
  tag: TagConfig;
  textBlock: TextBlockConfig;
  templateId: string;
  primaryColor: string;
}

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
      color: undefined,
      textShadow: null,
      maxWidth: 100,
      useGradient: false,
      gradientFrom: '#7c6df0',
      gradientTo: '#ec4899',
      maxCharsPerLine: 8,
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
      color: undefined,
      textShadow: null,
      maxWidth: 100,
      useGradient: false,
      gradientFrom: '#7c6df0',
      gradientTo: '#ec4899',
      maxCharsPerLine: 12,
    },
    tag: {
      visible: true,
      label: '专栏',
      text: '2025 · 深度报道',
      separator: ' | ',
      background: null,
      borderRadius: 0,
      paddingX: 6,
      paddingY: 2,
    },
    textBlock: {
      hAlign: 'left',
      widthPercent: 55,
      vAlign: 'middle',
      paddingTop: 10,
      paddingBottom: 10,
    },
    templateId: 't01',
    primaryColor: '#7c6df0',
  };
}

interface CoverStore {
  activeMode: 'web' | 'prompt';
  config: CoverConfig;
  activeControlTab: 'text' | 'font' | 'layout' | 'template';
  isExporting: boolean;

  setMode: (mode: 'web' | 'prompt') => void;
  setConfig: (patch: Partial<CoverConfig>) => void;
  setMainTitle: (patch: Partial<TextLayerConfig>) => void;
  setSubtitle: (patch: Partial<TextLayerConfig>) => void;
  setTag: (patch: Partial<TagConfig>) => void;
  setTextBlock: (patch: Partial<TextBlockConfig>) => void;
  setTemplate: (id: string) => void;
  setPrimaryColor: (color: string) => void;
  setActiveControlTab: (tab: 'text' | 'font' | 'layout' | 'template') => void;
  setExporting: (v: boolean) => void;
  resetToDefault: () => void;
}

export const useCoverStore = create<CoverStore>()(
  immer((set) => ({
    activeMode: 'web',
    config: defaultCoverConfig(),
    activeControlTab: 'text',
    isExporting: false,

    setMode: (mode) => set((state) => {
      state.activeMode = mode;
    }),

    setConfig: (patch) => set((state) => {
      Object.assign(state.config, patch);
    }),

    setMainTitle: (patch) => set((state) => {
      Object.assign(state.config.mainTitle, patch);
    }),

    setSubtitle: (patch) => set((state) => {
      Object.assign(state.config.subtitle, patch);
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

    setActiveControlTab: (tab) => set((state) => {
      state.activeControlTab = tab;
    }),

    setExporting: (v) => set((state) => {
      state.isExporting = v;
    }),

    resetToDefault: () => set((state) => {
      state.config = defaultCoverConfig();
    }),
  }))
);
