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

/**
 * 每个模板的用户自定义覆盖配置
 * 存储用户对该模板的所有调节值
 */
export interface TemplateOverrides {
  textBlock?: Partial<TextBlockConfig>;
  mainTitle?: {
    maxCharsPerLine?: number;
  };
  subtitle?: {
    maxCharsPerLine?: number;
  };
  primaryColor?: string;
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
  config: CoverConfig;  // 当前显示的封面配置（始终与当前模板一致）
  activeControlTab: 'text' | 'font' | 'layout' | 'template';
  isExporting: boolean;
  templateOverrides: Record<string, TemplateOverrides>;  // 每个模板的用户自定义配置

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
  resetCurrentTemplateOverrides: () => void;  // 重置当前模板的所有覆盖配置
}

/**
 * 获取模板的默认配置（从 TEMPLATE_TEXT_SETTINGS）
 */
function getTemplateDefaultOverrides(templateId: string): TemplateOverrides {
  const setting = TEMPLATE_TEXT_SETTINGS[templateId];
  return {
    mainTitle: {
      maxCharsPerLine: setting?.defaultMaxCharsPerLine ?? DEFAULT_MAX_CHARS_PER_LINE,
    },
    subtitle: {
      maxCharsPerLine: 12,  // 副标题默认值
    },
  };
}

/**
 * 应用模板覆盖配置到 config
 */
function applyOverrides(state: { config: CoverConfig; templateOverrides: Record<string, TemplateOverrides> }, templateId: string) {
  const overrides = state.templateOverrides[templateId];

  if (overrides?.textBlock) {
    Object.assign(state.config.textBlock, overrides.textBlock);
  }

  if (overrides?.mainTitle?.maxCharsPerLine !== undefined) {
    state.config.mainTitle.maxCharsPerLine = overrides.mainTitle.maxCharsPerLine;
  }

  if (overrides?.subtitle?.maxCharsPerLine !== undefined) {
    state.config.subtitle.maxCharsPerLine = overrides.subtitle.maxCharsPerLine;
  }

  if (overrides?.primaryColor !== undefined) {
    state.config.primaryColor = overrides.primaryColor;
  }
}

export const useCoverStore = create<CoverStore>()(
  immer((set, get) => ({
    activeMode: 'web',
    config: defaultCoverConfig(),
    activeControlTab: 'text',
    isExporting: false,
    templateOverrides: {},

    setMode: (mode) => set((state) => {
      state.activeMode = mode;
    }),

    setConfig: (patch) => set((state) => {
      Object.assign(state.config, patch);
    }),

    setMainTitle: (patch) => set((state) => {
      // 更新当前 config
      Object.assign(state.config.mainTitle, patch);

      // 如果修改了 maxCharsPerLine，同步到当前模板的 overrides
      if (patch.maxCharsPerLine !== undefined) {
        const templateId = state.config.templateId;
        if (!state.templateOverrides[templateId]) {
          state.templateOverrides[templateId] = {};
        }
        if (!state.templateOverrides[templateId].mainTitle) {
          state.templateOverrides[templateId].mainTitle = {};
        }
        state.templateOverrides[templateId].mainTitle.maxCharsPerLine = patch.maxCharsPerLine;
      }
    }),

    setSubtitle: (patch) => set((state) => {
      // 更新当前 config
      Object.assign(state.config.subtitle, patch);

      // 如果修改了 maxCharsPerLine，同步到当前模板的 overrides
      if (patch.maxCharsPerLine !== undefined) {
        const templateId = state.config.templateId;
        if (!state.templateOverrides[templateId]) {
          state.templateOverrides[templateId] = {};
        }
        if (!state.templateOverrides[templateId].subtitle) {
          state.templateOverrides[templateId].subtitle = {};
        }
        state.templateOverrides[templateId].subtitle.maxCharsPerLine = patch.maxCharsPerLine;
      }
    }),

    setTag: (patch) => set((state) => {
      Object.assign(state.config.tag, patch);
    }),

    /**
     * 修改文字块配置时，同步保存到当前模板的 overrides
     */
    setTextBlock: (patch) => set((state) => {
      // 更新当前 config
      Object.assign(state.config.textBlock, patch);

      // 同步到当前模板的 overrides
      const templateId = state.config.templateId;
      if (!state.templateOverrides[templateId]) {
        state.templateOverrides[templateId] = {};
      }
      state.templateOverrides[templateId].textBlock = {
        ...state.templateOverrides[templateId].textBlock,
        ...patch,
      };
    }),

    /**
     * 切换模板时：
     * 1. 保存当前 config 的状态（隐式，因为已经保存到 overrides）
     * 2. 加载目标模板的配置
     */
    setTemplate: (id) => set((state) => {
      state.config.templateId = id;

      // 重置为默认配置
      const defaultConfig = defaultCoverConfig();
      state.config.textBlock = { ...defaultConfig.textBlock };
      state.config.mainTitle = { ...defaultConfig.mainTitle };
      state.config.subtitle = { ...defaultConfig.subtitle };
      state.config.primaryColor = defaultConfig.primaryColor;

      // 应用该模板的覆盖配置（如果有）
      applyOverrides(state, id);
    }),

    setPrimaryColor: (color) => set((state) => {
      state.config.primaryColor = color;
      // 同步到当前模板的 overrides
      const templateId = state.config.templateId;
      if (!state.templateOverrides[templateId]) {
        state.templateOverrides[templateId] = {};
      }
      state.templateOverrides[templateId].primaryColor = color;
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

    /**
     * 重置当前模板的所有覆盖配置
     */
    resetCurrentTemplateOverrides: () => set((state) => {
      const templateId = state.config.templateId;
      delete state.templateOverrides[templateId];

      // 重新应用默认配置
      const defaultConfig = defaultCoverConfig();
      state.config.textBlock = { ...defaultConfig.textBlock };
      state.config.mainTitle = { ...defaultConfig.mainTitle };
      state.config.subtitle = { ...defaultConfig.subtitle };
      state.config.primaryColor = defaultConfig.primaryColor;

      // 应用模板默认覆盖值
      const defaultOverrides = getTemplateDefaultOverrides(templateId);
      state.templateOverrides[templateId] = defaultOverrides;
      applyOverrides(state, templateId);
    }),
  }))
);
