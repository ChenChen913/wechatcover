import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { TEMPLATE_TEXT_SETTINGS, DEFAULT_MAX_CHARS_PER_LINE } from '@/data/templateSettings';

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
      maxCharsPerLine: 10,
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
  userTemplateSettings: Record<string, number>;

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
  setUserTemplateSetting: (templateId: string, maxCharsPerLine: number) => void;
  resetUserTemplateSetting: (templateId: string) => void;
  getUserTemplateSetting: (templateId: string) => number | undefined;
}

export const useCoverStore = create<CoverStore>()(
  immer((set, get) => ({
    activeMode: 'web',
    config: defaultCoverConfig(),
    activeControlTab: 'text',
    isExporting: false,
    userTemplateSettings: {},

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
      // 切换模板时，自动加载该模板的配置（用户值 > 默认值）
      const userValue = state.userTemplateSettings[id];
      const setting = TEMPLATE_TEXT_SETTINGS[id];
      const newValue = userValue ?? setting?.defaultMaxCharsPerLine ?? DEFAULT_MAX_CHARS_PER_LINE;
      state.config.mainTitle.maxCharsPerLine = newValue;
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

    setUserTemplateSetting: (templateId, maxCharsPerLine) => set((state) => {
      state.userTemplateSettings[templateId] = maxCharsPerLine;
      // 如果当前正在编辑这个模板，同步更新配置
      if (state.config.templateId === templateId) {
        state.config.mainTitle.maxCharsPerLine = maxCharsPerLine;
      }
    }),

    resetUserTemplateSetting: (templateId) => set((state) => {
      delete state.userTemplateSettings[templateId];
    }),

    getUserTemplateSetting: (templateId) => {
      return get().userTemplateSettings[templateId];
    },
  }))
);
