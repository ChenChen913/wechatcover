import React from 'react';
import type { CoverConfig, TextLayerConfig } from '@/store/coverStore';

/**
 * 按固定字数切分文本为多行
 */
export function splitTextByChars(text: string, maxChars: number): string[] {
  if (!text || maxChars <= 0) return [];
  const lines: string[] = [];
  for (let i = 0; i < text.length; i += maxChars) {
    lines.push(text.slice(i, i + maxChars));
  }
  return lines;
}

/**
 * 生成文字图层 inline style（主标题/副标题通用）
 */
function getTextLayerStyle(
  layer: TextLayerConfig,
  hAlign: CoverConfig['textBlock']['hAlign']
): React.CSSProperties {
  const style: React.CSSProperties = {};

  if (layer.fontFamily) style.fontFamily = layer.fontFamily;
  style.fontSize = `${layer.fontSize}px`;
  style.fontWeight = layer.fontWeight;
  style.fontStyle = layer.fontStyle;
  style.letterSpacing = `${layer.letterSpacing}em`;
  style.lineHeight = layer.lineHeight;
  if (layer.color) style.color = layer.color;

  if (layer.maxWidth < 100) {
    style.maxWidth = `${layer.maxWidth}%`;
    style.wordBreak = 'break-word';
  }

  style.textAlign = hAlign;

  if (layer.useGradient) {
    style.background = `linear-gradient(135deg, ${layer.gradientFrom}, ${layer.gradientTo})`;
    style.WebkitBackgroundClip = 'text';
    style.WebkitTextFillColor = 'transparent';
    style.backgroundClip = 'text';
  }

  if (!layer.useGradient && layer.textShadow && layer.textShadow !== 'gradient') {
    style.textShadow = layer.textShadow;
  }

  return style;
}

/**
 * 生成主标题 inline style
 */
export function getTitleStyle(config: CoverConfig): React.CSSProperties {
  return getTextLayerStyle(config.mainTitle, config.textBlock.hAlign);
}

/**
 * 生成副标题 inline style
 */
export function getSubtitleStyle(config: CoverConfig): React.CSSProperties {
  return getTextLayerStyle(config.subtitle, config.textBlock.hAlign);
}

/**
 * 生成多行文本容器的 inline style
 */
export function getMultilineTextStyle(): React.CSSProperties {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.15em',
  };
}

/**
 * 生成标签 inline style
 */
export function getTagStyle(config: CoverConfig): React.CSSProperties {
  const { tag } = config;
  const style: React.CSSProperties = {};
  if (tag.background) style.background = tag.background;
  if (tag.borderRadius > 0) style.borderRadius = `${tag.borderRadius}px`;
  if (tag.paddingX > 0 || tag.paddingY > 0) {
    style.padding = `${tag.paddingY}px ${tag.paddingX}px`;
  }
  return style;
}

/**
 * 获取标签文本
 */
export function getTagText(config: CoverConfig): string {
  const { tag } = config;
  if (!tag.visible) return '';
  const parts: string[] = [];
  if (tag.label) parts.push(tag.label);
  if (tag.separator && tag.text) parts.push(tag.text);
  else if (tag.text) parts.push(tag.text);
  return parts.join(tag.separator || '');
}

/**
 * 生成文字区域容器 style（布局用）
 */
export function getTextLayoutStyle(config: CoverConfig): React.CSSProperties {
  const { textBlock } = config;
  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  style.width = `${textBlock.widthPercent}%`;

  switch (textBlock.hAlign) {
    case 'left':
      style.alignItems = 'flex-start';
      style.textAlign = 'left';
      style.paddingLeft = `${textBlock.paddingLeft}%`;
      style.marginRight = 'auto';
      break;
    case 'center':
      style.alignItems = 'center';
      style.textAlign = 'center';
      style.paddingLeft = `${textBlock.paddingLeft}%`;
      style.paddingRight = `${textBlock.paddingRight}%`;
      break;
    case 'right':
      style.alignItems = 'flex-end';
      style.textAlign = 'right';
      style.paddingRight = `${textBlock.paddingRight}%`;
      style.marginLeft = 'auto';
      break;
  }

  switch (textBlock.vAlign) {
    case 'top':
      style.justifyContent = 'flex-start';
      style.paddingTop = `${textBlock.paddingTop}%`;
      break;
    case 'middle':
      style.justifyContent = 'center';
      break;
    case 'bottom':
      style.justifyContent = 'flex-end';
      style.paddingBottom = `${textBlock.paddingBottom}%`;
      break;
  }

  return style;
}
