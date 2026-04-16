import React from 'react';
import type { CoverConfig, TextLayerConfig } from '@/store/coverStore';

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

  // 文字自动换行：使用 keep-all 尽量不在汉字中间断开
  style.wordBreak = 'keep-all';
  style.overflowWrap = 'break-word';

  if (layer.maxWidth < 100) {
    style.maxWidth = `${layer.maxWidth}%`;
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
 * 用于主标题和副标题的文本容器
 */
export function getMultilineTextStyle(): React.CSSProperties {
  return {
    display: 'block',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word',
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
 * 用于 tag、subtitle 等不受宽度控制的元素
 */
export function getTextLayoutStyle(config: CoverConfig): React.CSSProperties {
  const { textBlock } = config;
  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  switch (textBlock.hAlign) {
    case 'left':
      style.alignItems = 'flex-start';
      style.textAlign = 'left';
      style.marginRight = 'auto';
      break;
    case 'center':
      style.alignItems = 'center';
      style.textAlign = 'center';
      break;
    case 'right':
      style.alignItems = 'flex-end';
      style.textAlign = 'right';
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

/**
 * 生成主标题容器 style（带宽度控制）
 * 只用于主标题，控制其最大宽度以实现自动换行
 */
export function getMainTitleContainerStyle(config: CoverConfig): React.CSSProperties {
  const { textBlock } = config;
  const style: React.CSSProperties = {
    width: `${textBlock.widthPercent}%`,
  };

  // 根据水平对齐方式设置 margin
  switch (textBlock.hAlign) {
    case 'left':
      style.marginRight = 'auto';
      break;
    case 'center':
      style.marginLeft = 'auto';
      style.marginRight = 'auto';
      break;
    case 'right':
      style.marginLeft = 'auto';
      break;
  }

  return style;
}
