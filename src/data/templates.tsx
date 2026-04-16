import type { CoverConfig } from '@/store/coverStore';
import { getTitleStyle, getSubtitleStyle, getTagText, getTagStyle, getTextLayoutStyle, getMainTitleContainerStyle, getMultilineTextStyle } from '@/components/coverStyleUtils';

export interface TemplateData {
  id: string;
  name: string;
  cat: string;
  desc: string;
  render: (cfg: CoverConfig) => React.ReactNode;
}

export const TEMPLATES: TemplateData[] = [
  // ═══════════ 第一组：极简/深色/活力/艺术/传统 (t01-t20) ═══════════
  { id: 't01', name: '极简留白', cat: 'minimal light', desc: '杂志排版 · 高级灰', render: (cfg: CoverConfig) => (
    <div className="c c01"><div className="c01-bg" /><div className="c01-line" /><div className="c01-num">01</div><div style={getTextLayoutStyle(cfg)}>{cfg.tag.visible && <div className="c01-tag" style={getTagStyle(cfg)}>{getTagText(cfg)}</div>}{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c01-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c01-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div><div className="c01-decor"><span /></div></div>
  )},
  { id: 't02', name: '深空星云', cat: 'dark tech', desc: '弥散光晕 · 科技感', render: (cfg: CoverConfig) => (
    <div className="c c02"><div className="c02-nebula1" /><div className="c02-nebula2" /><div className="c02-stars" /><div className="c02-inner" style={getTextLayoutStyle(cfg)}>{cfg.tag.visible && <div className="c02-tag" style={getTagStyle(cfg)}>{getTagText(cfg)}</div>}{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c02-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c02-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't03', name: '橙色热浪', cat: 'energy dark', desc: '亮色冲击 · 潮流', render: (cfg: CoverConfig) => (
    <div className="c c03"><div className="c03-mesh" /><div className="c03-grid" /><div className="c03-inner" style={getTextLayoutStyle(cfg)}>{cfg.tag.visible && <div className="c03-badge" style={getTagStyle(cfg)}>{getTagText(cfg)}</div>}{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c03-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c03-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't04', name: '孟菲斯波普', cat: 'art energy light', desc: '几何拼接 · 趣味', render: (cfg: CoverConfig) => (
    <div className="c c04"><div className="c04-dots" /><div className="c04-shape1" /><div className="c04-shape2" /><div className="c04-shape3" /><div className="c04-shape4" /><div className="c04-inner" style={getTextLayoutStyle(cfg)}>{cfg.tag.visible && <div className="c04-tag" style={getTagStyle(cfg)}>{getTagText(cfg)}</div>}{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c04-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c04-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't05', name: '苹果玻璃态', cat: 'art light', desc: '毛玻璃卡片 · 质感', render: (cfg: CoverConfig) => (
    <div className="c c05"><div className="c05-mesh1" /><div className="c05-mesh2" /><div className="c05-card" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c05-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c05-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't06', name: '水墨流韵', cat: 'art tradition light', desc: '现代水墨 · 意境', render: (cfg: CoverConfig) => (
    <div className="c c06"><div className="c06-texture" /><div className="c06-ink1" /><div className="c06-ink2" /><div className="c06-inner" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c06-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c06-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div><div className="c06-seal">印</div></div>
  )},
  { id: 't07', name: '赛博霓虹', cat: 'dark tech energy', desc: '故障发光 · 未来', render: (cfg: CoverConfig) => (
    <div className="c c07"><div className="c07-grid" /><div className="c07-glow1" /><div className="c07-glow2" /><div className="c07-inner" style={getTextLayoutStyle(cfg)}>{cfg.tag.visible && <div className="c07-tag" style={getTagStyle(cfg)}>{getTagText(cfg)}</div>}{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c07-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c07-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't08', name: '马卡龙粉彩', cat: 'art light energy', desc: '柔和弥散 · 温馨', render: (cfg: CoverConfig) => (
    <div className="c c08"><div className="c08-mesh1" /><div className="c08-mesh2" /><div className="c08-mesh3" /><div className="c08-inner" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c08-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c08-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't09', name: '矩阵终端', cat: 'dark tech minimal', desc: '黑客代码 · 极简', render: (cfg: CoverConfig) => (
    <div className="c c09"><div className="c09-ui"><div className="c09-header"><div className="c09-dot" /><div className="c09-dot" /><div className="c09-dot" /></div><div className="c09-content" style={getTextLayoutStyle(cfg)}><div className="c09-cursor">~ / user / local / bin &gt; _</div>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c09-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c09-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div></div>
  )},
  { id: 't10', name: '朱砂国潮', cat: 'tradition dark', desc: '宫廷红金 · 大气', render: (cfg: CoverConfig) => (
    <div className="c c10"><div className="c10-border" /><div className="c10-border-inner" /><div className="c10-corner c10-tl" /><div className="c10-corner c10-tr" /><div className="c10-corner c10-bl" /><div className="c10-corner c10-br" /><div className="c10-content" style={getTextLayoutStyle(cfg)}>{cfg.tag.visible && <div className="c10-tag" style={getTagStyle(cfg)}>{getTagText(cfg)}</div>}{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c10-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}<div className="c10-line" />{cfg.subtitle.visible && <div className="c10-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't11', name: '午夜奢华', cat: 'minimal dark', desc: '纯黑打光 · 高端', render: (cfg: CoverConfig) => (
    <div className="c c11"><div className="c11-light" /><div className="c11-line" /><div className="c11-box" style={getTextLayoutStyle(cfg)}>{cfg.tag.visible && <div className="c11-tag" style={getTagStyle(cfg)}>{getTagText(cfg)}</div>}{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c11-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c11-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't12', name: '银河梦境', cat: 'dark art', desc: '深邃光晕 · 梦幻', render: (cfg: CoverConfig) => (
    <div className="c c12"><div className="c12-glow" /><div className="c12-halo" /><div className="c12-inner" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c12-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c12-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't13', name: '包豪斯几何', cat: 'minimal art light', desc: '基础图形 · 经典', render: (cfg: CoverConfig) => (
    <div className="c c13"><div className="c13-grid" /><div className="c13-red" /><div className="c13-blue" /><div className="c13-yellow" /><div className="c13-inner" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c13-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c13-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't14', name: '复古旅行', cat: 'art light', desc: '牛皮纸感 · 邮戳', render: (cfg: CoverConfig) => (
    <div className="c c14"><div className="c14-noise" /><div className="c14-frame" /><div className="c14-stamp">1984</div><div className="c14-inner" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c14-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}<div className="c14-star">★</div>{cfg.subtitle.visible && <div className="c14-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't15', name: '日出东方', cat: 'minimal light art', desc: '日系红日 · 极简', render: (cfg: CoverConfig) => (
    <div className="c c15"><div className="c15-sun" /><div className="c15-inner" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c15-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c15-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't16', name: '电影序章', cat: 'dark art minimal', desc: '宽银幕打光 · 沉浸', render: (cfg: CoverConfig) => (
    <div className="c c16"><div className="c16-bars" /><div className="c16-bars-b" /><div className="c16-noise" /><div className="c16-spotlight" /><div className="c16-inner" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c16-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c16-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't17', name: '糖果泡泡', cat: 'energy art light', desc: '3D 球体 · 活泼', render: (cfg: CoverConfig) => (
    <div className="c c17"><div className="c17-s1" /><div className="c17-s2" /><div className="c17-s3" /><div className="c17-inner" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c17-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c17-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't18', name: '工程蓝图', cat: 'tech dark minimal', desc: '网格十字标 · 严谨', render: (cfg: CoverConfig) => (
    <div className="c c18"><div className="c18-grid" /><div className="c18-cross" /><div className="c18-circle" /><div className="c18-inner" style={getTextLayoutStyle(cfg)}>{cfg.tag.visible && <div className="c18-tag" style={getTagStyle(cfg)}>{getTagText(cfg)}</div>}{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c18-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c18-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't19', name: '极光极地', cat: 'dark art', desc: '柔和极光 · 广阔', render: (cfg: CoverConfig) => (
    <div className="c c19"><div className="c19-aurora1" /><div className="c19-aurora2" /><div className="c19-stars" /><div className="c19-mtn" /><div className="c19-inner" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c19-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c19-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't20', name: '热血燃战', cat: 'energy dark', desc: '斜切色块 · 力量', render: (cfg: CoverConfig) => (
    <div className="c c20"><div className="c20-bg" /><div className="c20-red" /><div className="c20-inner" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c20-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c20-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},

  // ═══════════ 第二组：现代/科技/艺术 (t21-t36) ═══════════
  { id: 't21', name: '磨砂光环', cat: 'dark art', desc: 'Frosted Aura · 磨砂玻璃', render: (cfg: CoverConfig) => (
    <div className="c c21"><div className="c21-blur" /><div className="c21-glass" /><div className="c21-inner" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c21-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c21-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't22', name: '现代宋体', cat: 'minimal light', desc: 'Modern Serif · 优雅', render: (cfg: CoverConfig) => (
    <div className="c c22"><div className="c22-inner" style={getTextLayoutStyle(cfg)}>{cfg.subtitle.visible && <div className="c22-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c22-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}</div></div>
  )},
  { id: 't23', name: '便当布局', cat: 'modern light', desc: 'Bento Pro · 卡片布局', render: (cfg: CoverConfig) => (
    <div className="c c23"><div className="c23-main" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c23-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c23-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div><div className="c23-sub-box">DESIGNED BY AI</div><div className="c23-acc">✦</div></div>
  )},
  { id: 't24', name: '终端科技', cat: 'tech dark', desc: 'Terminal Tech · 终端', render: (cfg: CoverConfig) => (
    <div className="c c24"><div className="c24-lines" /><div className="c24-inner" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c24-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c24-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't25', name: '流体波纹', cat: 'dark art', desc: 'Liquid Flow · 流体', render: (cfg: CoverConfig) => (
    <div className="c c25"><div className="c25-bg" /><div className="c25-inner" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c25-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c25-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't26', name: '极简禅意', cat: 'minimal light', desc: 'Minimal Zen · 禅意', render: (cfg: CoverConfig) => (
    <div className="c c26"><div className="c26-inner" style={getTextLayoutStyle(cfg)}><div className="c26-bar" />{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c26-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c26-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't27', name: '玻璃层叠', cat: 'dark modern', desc: 'Glass Layers · 叠层', render: (cfg: CoverConfig) => (
    <div className="c c27"><div className="c27-inner"><div className="c27-glass" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c27-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c27-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div></div>
  )},
  { id: 't28', name: '复古赛博', cat: 'tech dark', desc: 'Retro Cyber · 赛博', render: (cfg: CoverConfig) => (
    <div className="c c28"><div className="c28-grid" /><div className="c28-inner" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c28-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c28-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't29', name: '粗体排版', cat: 'modern light', desc: 'Bold Editorial · 排版', render: (cfg: CoverConfig) => (
    <div className="c c29"><div className="c29-inner" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c29-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c29-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't30', name: '包豪斯艺术', cat: 'art light', desc: 'Bauhaus Art · 几何', render: (cfg: CoverConfig) => (
    <div className="c c30" style={getTextLayoutStyle(cfg)}><div className="c30-shapes"><div className="c30-sq" /><div className="c30-ci" /><div className="c30-tr" /></div>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c30-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c30-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div>
  )},
  { id: 't31', name: '全息镭射', cat: 'art energy', desc: 'Hologram · 镭射', render: (cfg: CoverConfig) => (
    <div className="c c31"><div className="c31-sheen" /><div className="c31-inner" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c31-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c31-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't32', name: '暗点网格', cat: 'dark tech', desc: 'Dark Grid · 点阵', render: (cfg: CoverConfig) => (
    <div className="c c32"><div className="c32-dots" /><div className="c32-inner" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c32-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c32-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't33', name: '颗粒黑白', cat: 'dark minimal', desc: 'Grainy Noir · 黑白', render: (cfg: CoverConfig) => (
    <div className="c c33"><div className="c33-vignette" /><div className="c33-inner" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c33-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c33-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't34', name: '粗野主义', cat: 'energy modern', desc: 'Brutalist · 粗犷', render: (cfg: CoverConfig) => (
    <div className="c c34"><div className="c34-inner" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c34-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c34-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't35', name: '深邃流体', cat: 'dark art', desc: 'Organic Deep · 流体', render: (cfg: CoverConfig) => (
    <div className="c c35"><div className="c35-blob" /><div className="c35-inner" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c35-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c35-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't36', name: '深蓝极光', cat: 'dark tech', desc: 'Deep Aurora · 极光', render: (cfg: CoverConfig) => (
    <div className="c c36"><div className="c36-glow" /><div className="c36-inner" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c36-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c36-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},

  // ═══════════ 第三组：商务/现代/艺术 (t37-t52) ═══════════
  { id: 't37', name: '商务蓝调', cat: 'corporate tech', desc: '专业沉稳 · 蓝调', render: (cfg: CoverConfig) => {
    const isRightAlign = cfg.textBlock.hAlign === 'right';
    return (
      <div className={`c c37${isRightAlign ? ' c37-flip' : ''}`}>
        <div className="c37-bg" />
        <div className="c37-line" />
        <div className="c37-wrap" style={getTextLayoutStyle(cfg)}>
          {cfg.tag.visible && <div className="c37-tag" style={getTagStyle(cfg)}>{getTagText(cfg)}</div>}
          {cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c37-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}
          {cfg.subtitle.visible && <div className="c37-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}
        </div>
      </div>
    );
  }},
  { id: 't38', name: '晨雾光影', cat: 'art light', desc: '人文关怀 · 暖色', render: (cfg: CoverConfig) => (
    <div className="c c38"><div className="c38-light" /><div className="c38-wrap" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c38-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c38-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't39', name: '柔雾悬浮', cat: 'modern light', desc: '现代磨砂 · 悬浮', render: (cfg: CoverConfig) => (
    <div className="c c39"><div className="c39-card" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c39-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c39-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't40', name: '科技矩阵', cat: 'corporate tech', desc: '数据前沿 · 矩阵', render: (cfg: CoverConfig) => (
    <div className="c c40"><div className="c40-grid" /><div className="c40-accent" /><div className="c40-wrap" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c40-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c40-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't41', name: '法式线框', cat: 'art dark', desc: '高级质感 · 金线', render: (cfg: CoverConfig) => (
    <div className="c c41"><div className="c41-border" /><div className="c41-border-inner" /><div className="c41-wrap" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c41-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c41-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't42', name: '数据折线', cat: 'corporate light', desc: '极简灰白 · 折线', render: (cfg: CoverConfig) => (
    <div className="c c42"><div className="c42-chart" /><div className="c42-wrap" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c42-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c42-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't43', name: '知识圆环', cat: 'corporate dark', desc: '专注深度 · 圆环', render: (cfg: CoverConfig) => (
    <div className="c c43"><div className="c43-ring1" /><div className="c43-ring2" /><div className="c43-wrap" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c43-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c43-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't44', name: '排版快讯', cat: 'modern light', desc: '报纸区块 · 快讯', render: (cfg: CoverConfig) => (
    <div className="c c44"><div className="c44-top"><span>UPDATE</span><span>VOL.2025</span></div><div className="c44-wrap" style={getTextLayoutStyle(cfg)}>{cfg.tag.visible && <div className="c44-tag" style={getTagStyle(cfg)}>{getTagText(cfg)}</div>}{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c44-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c44-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't45', name: '圆融交叠', cat: 'art light', desc: '莫兰迪色 · 交叠', render: (cfg: CoverConfig) => (
    <div className="c c45"><div className="c45-c1" /><div className="c45-c2" /><div className="c45-wrap" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c45-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c45-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't46', name: '对角切割', cat: 'modern light', desc: '活力控制 · 对角', render: (cfg: CoverConfig) => (
    <div className="c c46"><div className="c46-bg" /><div className="c46-line" /><div className="c46-wrap" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c46-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c46-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't47', name: '黑金质感', cat: 'art dark', desc: '经典奢华 · 黑金', render: (cfg: CoverConfig) => (
    <div className="c c47"><div className="c47-line" /><div className="c47-wrap" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c47-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c47-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't48', name: '极简焦点', cat: 'minimal light', desc: '大量留白 · 焦点', render: (cfg: CoverConfig) => (
    <div className="c c48"><div className="c48-accent" /><div className="c48-wrap" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c48-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c48-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't49', name: '温润大地', cat: 'art light', desc: '木质暖调 · 大地', render: (cfg: CoverConfig) => (
    <div className="c c49"><div className="c49-left"><span>READING</span></div><div className="c49-right" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c49-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c49-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't50', name: '暗夜微光', cat: 'corporate dark', desc: '深邃呼吸 · 微光', render: (cfg: CoverConfig) => (
    <div className="c c50"><div className="c50-glow" /><div className="c50-wrap" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c50-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c50-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't51', name: '雅致水墨', cat: 'art light', desc: '淡雅灰度 · 水墨', render: (cfg: CoverConfig) => (
    <div className="c c51"><div className="c51-ink" /><div className="c51-wrap" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c51-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c51-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
  { id: 't52', name: '灵动渐变', cat: 'modern light corporate', desc: '百搭通用 · 渐变', render: (cfg: CoverConfig) => (
    <div className="c c52"><div className="c52-wrap" style={getTextLayoutStyle(cfg)}>{cfg.mainTitle.visible && <div style={getMainTitleContainerStyle(cfg)}><div className="c52-title" style={{...getTitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.mainTitle.content || '请输入文章标题'}</div></div>}{cfg.subtitle.visible && <div className="c52-sub" style={{...getSubtitleStyle(cfg), ...getMultilineTextStyle()}}>{cfg.subtitle.content || '副标题文字'}</div>}</div></div>
  )},
];

export const CATEGORIES = [
  { id: 'all', name: '全部' },
  { id: 'minimal', name: '极简' },
  { id: 'dark', name: '深色系' },
  { id: 'light', name: '浅色系' },
  { id: 'art', name: '艺术文艺' },
  { id: 'tech', name: '科技未来' },
  { id: 'tradition', name: '国风传统' },
  { id: 'energy', name: '活力动感' },
  { id: 'corporate', name: '商务职场' },
  { id: 'modern', name: '现代排版' },
];
