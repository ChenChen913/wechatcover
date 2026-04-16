export interface TemplateTextSetting {
  defaultMaxCharsPerLine: number;
  minMaxCharsPerLine: number;
  maxMaxCharsPerLine: number;
}

export const TEMPLATE_TEXT_SETTINGS: Record<string, TemplateTextSetting> = {
  // 第一组：t01-t20
  t01: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t02: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t03: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t04: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t05: { defaultMaxCharsPerLine: 9, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t06: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t07: { defaultMaxCharsPerLine: 9, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t08: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t09: { defaultMaxCharsPerLine: 8, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t10: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t11: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t12: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t13: { defaultMaxCharsPerLine: 11, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t14: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t15: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t16: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t17: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t18: { defaultMaxCharsPerLine: 9, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t19: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t20: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },

  // 第二组：t21-t36
  t21: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t22: { defaultMaxCharsPerLine: 11, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t23: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t24: { defaultMaxCharsPerLine: 9, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t25: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t26: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t27: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t28: { defaultMaxCharsPerLine: 9, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t29: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t30: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t31: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t32: { defaultMaxCharsPerLine: 9, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t33: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t34: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t35: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t36: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },

  // 第三组：t37-t52
  t37: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t38: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t39: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t40: { defaultMaxCharsPerLine: 9, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t41: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t42: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t43: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t44: { defaultMaxCharsPerLine: 9, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t45: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t46: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t47: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t48: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t49: { defaultMaxCharsPerLine: 9, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t50: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t51: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
  t52: { defaultMaxCharsPerLine: 10, minMaxCharsPerLine: 4, maxMaxCharsPerLine: 20 },
};

export const DEFAULT_MAX_CHARS_PER_LINE = 10;
