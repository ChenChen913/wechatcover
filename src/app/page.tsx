'use client';

import React, { useState, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { PromptModeView } from '@/components/PromptModeView';
import { ControlPanel } from '@/components/ControlPanel';
import { TemplateCard } from '@/components/TemplateCard';
import { useCoverStore } from '@/store/coverStore';

type ActiveMode = 'web' | 'prompt';

// 模板数据
const TEMPLATES = [
  { id: 't01', name: '极简留白', cat: 'minimal light', desc: 'Playfair Display · 白底极简', render: (t: string, s: string) => (
    <div className="c c01"><div className="c01-bar" /><div className="c01-num">01</div><div className="c01-tag">FEATURE · ESSAY</div><div className="c01-title">{t || '请输入文章标题'}</div><div className="c01-sub">{s || '洞见 · 深度 · 价值'}</div><div className="c01-dot" /><div className="c01-line" /></div>
  )},
  { id: 't02', name: '深空星云', cat: 'dark tech', desc: 'Noto Serif SC · 星云渐变', render: (t: string, s: string) => (
    <div className="c c02"><div className="c02-nebula" /><div className="c02-stars" /><div className="c02-glow" /><div className="c02-ring" /><div className="c02-inner"><div className="c02-tag">DEEP SPACE · EXPLORE</div><div className="c02-title">{t || '请输入文章标题'}</div><div className="c02-sub">{s || '探索 · 思考 · 未知'}</div></div></div>
  )},
  { id: 't03', name: '橙色热浪', cat: 'energy dark', desc: 'Bebas Neue · 对角渐变', render: (t: string, s: string) => (
    <div className="c c03"><div className="c03-split" /><div className="c03-lines" /><div className="c03-inner"><div style={{ display: 'flex', flexDirection: 'column' }}><div className="c03-title">{t || '请输入文章标题'}</div><div className="c03-sub">{s || 'TRENDING NOW'}</div></div></div><div className="c03-badge">2025</div><div className="c03-arrow">→</div></div>
  )},
  { id: 't04', name: '孟菲斯波普', cat: 'art energy light', desc: 'Bebas Neue · 几何波普', render: (t: string, s: string) => (
    <div className="c c04"><div className="c04-shape1" /><div className="c04-shape2" /><div className="c04-shape3" /><div className="c04-shape4" /><div className="c04-dots" /><div className="c04-inner"><div className="c04-tag">MEMPHIS · DESIGN</div><div className="c04-title">{t || '请输入文章标题'}</div><div className="c04-sub">{s || '创意无界 · 设计未来'}</div></div></div>
  )},
  { id: 't05', name: '苹果玻璃态', cat: 'art light', desc: 'Noto Sans SC · 毛玻璃卡片', render: (t: string, s: string) => (
    <div className="c c05"><div className="c05-b1" /><div className="c05-b2" /><div className="c05-b3" /><div className="c05-card"><div className="c05-icon">✦</div><div className="c05-title">{t || '请输入文章标题'}</div><div className="c05-sub">{s || '精选内容 · 深度解析'}</div></div><div className="c05-dots"><span /><span /><span /></div></div>
  )},
  { id: 't06', name: '水墨流韵', cat: 'art tradition light', desc: '马善政毛笔楷书 · 水墨质感', render: (t: string, s: string) => (
    <div className="c c06"><div className="c06-paper" /><div className="c06-ink1" /><div className="c06-ink2" /><div className="c06-inner"><div className="c06-title">{t || '请输入文章标题'}</div><div className="c06-line" /><div className="c06-sub">{s || '丹青妙笔 · 文以载道'}</div></div><div className="c06-seal">印</div></div>
  )},
  { id: 't07', name: '赛博霓虹', cat: 'dark tech', desc: 'Orbitron · 霓虹故障美学', render: (t: string, s: string) => (
    <div className="c c07"><div className="c07-scan" /><div className="c07-grid" /><div className="c07-glow-l" /><div className="c07-glow-t" /><div className="c07-slash" /><div className="c07-tag">CYBER.2025_NEURAL</div><div className="c07-title">{t || '请输入文章标题'}</div><div className="c07-sub">{s || 'SYSTEM ONLINE'}</div><div className="c07-bars"><div className="c07-bar" style={{ width: '100%' }} /><div className="c07-bar" style={{ width: '70%' }} /><div className="c07-bar" style={{ width: '88%' }} /><div className="c07-bar" style={{ width: '45%' }} /><div className="c07-bar" style={{ width: '95%' }} /></div></div>
  )},
  { id: 't08', name: '马卡龙粉彩', cat: 'art light energy', desc: 'ZCOOL 快乐体 · 粉彩渐变', render: (t: string, s: string) => (
    <div className="c c08"><div className="c08-b1" /><div className="c08-b2" /><div className="c08-circle1" /><div className="c08-circle2" /><div className="c08-star" style={{ top: '15%', right: '20%', transform: 'rotate(20deg)' }}>✦</div><div className="c08-star" style={{ bottom: '20%', left: '40%', transform: 'rotate(-15deg)' }}>✧</div><div className="c08-inner"><div className="c08-tag">SWEET · LIFE</div><div className="c08-title">{t || '请输入文章标题'}</div><div className="c08-sub">{s || '甜蜜生活 · 温柔记录'}</div></div></div>
  )},
  { id: 't09', name: '矩阵终端', cat: 'dark tech', desc: 'Source Code Pro · 黑客美学', render: (t: string, s: string) => (
    <div className="c c09"><div className="c09-matrix">010110010101110010101001010110101010011010101001010101001101010101010011010110101001010110010101110010101001010110101010011010101001010101001101010101010011010110101001010110010101110010101001010110101010011010101001010101001101010101010011</div><div className="c09-glow" /><div className="c09-frame" /><div className="c09-inner"><div className="c09-cursor">&gt; LOADING_ARTICLE.EXE</div><div className="c09-title">{t || '请输入文章标题'}</div><div className="c09-sub">{s || '// DECRYPTING DATA...'}</div></div><div className="c09-progress" /></div>
  )},
  { id: 't10', name: '朱砂国潮', cat: 'tradition dark', desc: 'Noto Serif SC · 朱砂金纹', render: (t: string, s: string) => (
    <div className="c c10"><div className="c10-bg" /><div className="c10-pattern" /><div className="c10-outer" /><div className="c10-inner-border" /><div className="c10-cloud" /><div className="c10-c c10-tl" /><div className="c10-c c10-tr" /><div className="c10-c c10-bl" /><div className="c10-c c10-br" /><div className="c10-title-wrap"><div className="c10-title">{t || '请输入文章标题'}</div><div className="c10-divider" /><div className="c10-sub">{s || '传承经典 · 融贯中西'}</div></div></div>
  )},
  { id: 't11', name: '午夜奢华', cat: 'minimal dark', desc: 'Cinzel · 金属渐变字', render: (t: string, s: string) => (
    <div className="c c11"><div className="c11-frame" /><div className="c11-top-line" /><div className="c11-bot-line" /><div className="c11-diamond" /><div className="c11-tag">PREMIUM · EXCLUSIVE</div><div className="c11-title">{t || '请输入文章标题'}</div><div className="c11-sub">{s || '精品内容 · 独家呈现'}</div><div className="c11-ornament"><div className="c11-ornament-line" /><div className="c11-ornament-dot" /><div className="c11-ornament-dot" /><div className="c11-ornament-dot" /><div className="c11-ornament-line" /></div></div>
  )},
  { id: 't12', name: '银河梦境', cat: 'dark art', desc: 'Noto Sans SC Light · 梦幻宇宙', render: (t: string, s: string) => (
    <div className="c c12"><div className="c12-galaxy" /><div className="c12-stars" /><div className="c12-orb" /><div className="c12-inner"><div className="c12-tag">GALAXY · DREAM</div><div className="c12-title">{t || '请输入文章标题'}</div><div className="c12-sub">{s || '超越边界 · 探寻未知'}</div></div></div>
  )},
  { id: 't13', name: '包豪斯几何', cat: 'minimal art light', desc: 'Bebas Neue · 构成主义', render: (t: string, s: string) => (
    <div className="c c13"><div className="c13-circ" /><div className="c13-rect" /><div className="c13-tri" /><div className="c13-hline" /><div className="c13-inner"><div className="c13-label">BAUHAUS · DESIGN</div><div className="c13-title">{t || '请输入文章标题'}</div><div className="c13-sub">{s || '结构 · 功能 · 美学'}</div></div></div>
  )},
  { id: 't14', name: '复古旅行', cat: 'art light', desc: '清客黄油体 · 旧海报质感', render: (t: string, s: string) => (
    <div className="c c14"><div className="c14-bg" /><div className="c14-noise" /><div className="c14-outer" /><div className="c14-inner-b" /><div className="c14-stamp">SINCE<br />1924</div><div className="c14-banner"><div className="c14-line-top" /><div className="c14-title">{t || '请输入文章标题'}</div><div className="c14-divider-row"><div className="c14-div-line" /><div className="c14-div-dot" /><div className="c14-div-dot" /><div className="c14-div-dot" /><div className="c14-div-line" /></div><div className="c14-sub">{s || '经典重现 · 温故知新'}</div><div className="c14-line-bot" /></div><div className="c14-year">EST. MMXXV</div></div>
  )},
  { id: 't15', name: '日出东方', cat: 'minimal light', desc: 'Noto Sans SC Black · 日系极简', render: (t: string, s: string) => (
    <div className="c c15"><div className="c15-lines" /><div className="c15-sun" /><div className="c15-title-wrap"><div className="c15-tag">FEATURE · INSIGHT</div><div className="c15-title">{t || '请输入文章标题'}</div><div className="c15-sub">{s || '洞察时代 · 记录当下'}</div></div></div>
  )},
  { id: 't16', name: '电影序章', cat: 'dark art', desc: 'Playfair Display · 电影感', render: (t: string, s: string) => (
    <div className="c c16"><div className="c16-bars" /><div className="c16-bars-b" /><div className="c16-light" /><div className="c16-vignette" /><div className="c16-grain" /><div className="c16-label">CHAPTER ONE</div><div className="c16-title">{t || '请输入文章标题'}</div><div className="c16-sub">{s || 'A STORY BEGINS'}</div></div>
  )},
  { id: 't17', name: '糖果泡泡', cat: 'energy art light', desc: 'ZCOOL 快乐体 · 彩色圆球', render: (t: string, s: string) => (
    <div className="c c17"><div className="c17-b1" /><div className="c17-b2" /><div className="c17-b3" /><div className="c17-b4" /><div className="c17-b5" /><div className="c17-inner"><div className="c17-title">{t || '请输入文章标题'}</div><div className="c17-sub">{s || '🎉 精彩内容 · 快来看看'}</div></div></div>
  )},
  { id: 't18', name: '工程蓝图', cat: 'tech dark minimal', desc: 'Orbitron · 技术制图风', render: (t: string, s: string) => (
    <div className="c c18"><div className="c18-grid" /><div className="c18-inner"><div className="c18-title-box"><div className="c18-label">BLUEPRINT · v2025.04</div><div className="c18-title">{t || '请输入文章标题'}</div></div><div className="c18-sub">{s || '// ANALYSIS COMPLETE'}</div></div><div className="c18-crosshair" /><div className="c18-dims">900×383px · 2.35:1</div></div>
  )},
  { id: 't19', name: '极光极地', cat: 'dark art', desc: 'Noto Sans SC Light · 极光梦境', render: (t: string, s: string) => (
    <div className="c c19"><div className="c19-aurora1" /><div className="c19-aurora2" /><div className="c19-aurora3" /><div className="c19-mtn" /><div className="c19-stars2" /><div className="c19-inner"><div className="c19-title">{t || '请输入文章标题'}</div><div className="c19-sub">{s || '极地 · 梦境 · 探索'}</div></div></div>
  )},
  { id: 't20', name: '热血燃战', cat: 'energy dark', desc: 'Bebas Neue · 红黑对角', render: (t: string, s: string) => (
    <div className="c c20"><div className="c20-slash1" /><div className="c20-slash2" /><div className="c20-slash3" /><div className="c20-lines" /><div className="c20-badge">20<br />25</div><div className="c20-tag">BREAKING · NOW</div><div className="c20-title">{t || '请输入文章标题'}</div><div className="c20-sub">{s || '热血沸腾 · 燃烧激情'}</div></div>
  )},
];

const CATEGORIES = [
  { id: 'all', name: '全部' },
  { id: 'minimal', name: '极简' },
  { id: 'dark', name: '深色系' },
  { id: 'light', name: '浅色系' },
  { id: 'art', name: '艺术文艺' },
  { id: 'tech', name: '科技未来' },
  { id: 'tradition', name: '国风传统' },
  { id: 'energy', name: '活力动感' },
];

export default function Home() {
  const activeMode = useCoverStore((state) => state.activeMode);
  const setMode = useCoverStore((state) => state.setMode);
  const title = useCoverStore((state) => state.title);
  const subtitle = useCoverStore((state) => state.subtitle);
  const setTitle = useCoverStore((state) => state.setTitle);
  const showSafeZone = useCoverStore((state) => state.showSafeZone);
  const toggleSafeZone = useCoverStore((state) => state.toggleSafeZone);
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  }, []);

  const handleExport = useCallback(async (id: string, quality: 'hd' | 'uhd') => {
    const el = document.getElementById(id);
    if (!el) return;
    const pixelRatio = quality === 'uhd' ? 3 : 2;
    try {
      const url = await toPng(el, { pixelRatio, cacheBust: true, skipFonts: false });
      const a = document.createElement('a');
      a.href = url;
      a.download = `cover-${id}-${quality}.png`;
      a.click();
      toast(`已导出 ${quality === 'uhd' ? '超清' : '高清'} PNG`);
    } catch (e) {
      toast('导出失败，请重试');
    }
  }, [toast]);

  const filteredTemplates = selectedCategory === 'all'
    ? TEMPLATES
    : TEMPLATES.filter(tpl => tpl.cat.includes(selectedCategory));

  return (
    <div className="min-h-screen bg-[#08080f] text-[#e4e4f0] font-sans relative">
      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.03'/%3E%3C/svg%3E")` }} />
      
      {/* 顶部导航栏 */}
      <nav className="sticky top-0 z-50 bg-[#08080f]/88 backdrop-blur-2xl border-b border-white/7">
        <div className="px-7 py-3 flex items-center justify-between">
          {/* 左侧 Logo + 模式切换 */}
          <div className="flex items-center gap-4">
            <div className="font-['Cinzel',serif] text-[14px] font-bold tracking-[.1em] bg-gradient-to-r from-[#a78bfa] via-[#f472b6] to-[#fb923c] bg-clip-text text-transparent whitespace-nowrap">
              COVER STUDIO
            </div>
            <div className="w-px h-5 bg-white/13" />
            <div className="flex items-center gap-2 bg-[#1e1e2a] rounded-full p-1">
              <button
                onClick={() => setMode('web')}
                className={`
                  px-4 py-1.5 rounded-full text-sm transition-all flex items-center gap-1.5
                  ${activeMode === 'web'
                    ? 'bg-[#7c6df0] text-white shadow-lg shadow-[#7c6df0]/30'
                    : 'text-[#7070a0] hover:text-[#c084fc]'
                  }
                `}
              >
                🖼 网页模式
              </button>
              <button
                onClick={() => setMode('prompt')}
                className={`
                  px-4 py-1.5 rounded-full text-sm transition-all flex items-center gap-1.5
                  ${activeMode === 'prompt'
                    ? 'bg-[#7c6df0] text-white shadow-lg shadow-[#7c6df0]/30'
                    : 'text-[#7070a0] hover:text-[#c084fc]'
                  }
                `}
              >
                ✦ 提示词模式
              </button>
            </div>
          </div>

          {/* 右侧工具 */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 text-xs text-[#7070a0] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showSafeZone}
                onChange={(e) => toggleSafeZone()}
                className="accent-[#7c6df0]"
              />
              方图安全区
            </label>
          </div>
        </div>

        {/* 网页模式的标题输入栏 */}
        {activeMode === 'web' && (
          <div className="px-7 py-3 border-t border-white/7 flex items-center gap-4 flex-wrap">
            <div className="flex-1 max-w-[420px]">
              <input
                type="text"
                placeholder="输入文章标题，所有封面实时更新..."
                maxLength={24}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#1e1e2a] border border-white/13 rounded-md px-3.5 py-2 text-sm outline-none focus:border-[#7c6df0] transition-colors placeholder:text-[#7070a0]"
              />
            </div>
            <div className="max-w-[220px] flex-1">
              <input
                type="text"
                placeholder="副标题（可选）"
                maxLength={28}
                value={subtitle}
                onChange={(e) => useCoverStore.getState().setSubtitle({ content: e.target.value })}
                className="w-full bg-[#1e1e2a] border border-white/13 rounded-md px-3.5 py-2 text-sm outline-none focus:border-[#7c6df0] transition-colors placeholder:text-[#7070a0]"
              />
            </div>
            <div className="text-[11px] px-3 py-1 bg-[#7c6df024] border border-[#7c6df047] rounded-full text-[#c084fc] whitespace-nowrap">
              20 种精品模板
            </div>
          </div>
        )}

        {/* 提示词模式的标题输入条 */}
        {activeMode === 'prompt' && (
          <div className="px-7 py-3 border-t border-white/7 flex items-center gap-4">
            <div className="flex-1 max-w-[420px]">
              <input
                type="text"
                placeholder="输入文章标题，自动填充到所有提示词..."
                maxLength={24}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#1e1e2a] border border-white/13 rounded-md px-3.5 py-2 text-sm outline-none focus:border-[#7c6df0] transition-colors placeholder:text-[#7070a0]"
              />
            </div>
            <div className="text-[11px] px-3 py-1 bg-[#22c55e24] border border-[#22c55e47] rounded-full text-[#22c55e] whitespace-nowrap">
              30 种 AI 提示词
            </div>
          </div>
        )}
      </nav>

      {/* 网页模式：左侧控制面板 + 右侧预览区 */}
      {activeMode === 'web' && (
        <div className="flex flex-col lg:flex-row">
          {/* 左侧控制面板 - 桌面端固定，移动端可折叠 */}
          <div className="lg:w-[320px] lg:flex-shrink-0">
            <ControlPanel />
          </div>
          
          {/* 右侧预览区 */}
          <div className="flex-1 p-4 lg:p-7 overflow-y-auto">
            {/* 分类筛选 */}
            <div className="flex gap-2 flex-wrap mb-6">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`
                    px-3.5 py-1.5 rounded-full border border-white/7 bg-transparent text-xs cursor-pointer transition-all
                    ${selectedCategory === cat.id
                      ? 'bg-[#7c6df0] border-[#7c6df0] text-white'
                      : 'text-[#7070a0] hover:border-[#7c6df0] hover:text-[#c084fc]'
                    }
                  `}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* 模板网格（带双预览） */}
            <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(520px,1fr))] gap-6 lg:gap-8">
              {filteredTemplates.map((tpl) => (
                <TemplateCard
                  key={tpl.id}
                  id={tpl.id}
                  name={tpl.name}
                  desc={tpl.desc}
                  render={tpl.render}
                  onExport={handleExport}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 提示词模式：提示词卡片瀑布流 */}
      {activeMode === 'prompt' && (
        <PromptModeView title={title} subtitle={subtitle} />
      )}

      {/* Toast */}
      <div
        className={`
          fixed bottom-7 left-1/2 -translate-x-1/2 bg-[#7c6df0]/90 text-white px-5.5 py-2.5 rounded-[22px] text-xs
          transition-all duration-300 pointer-events-none z-[999] whitespace-nowrap
          ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        {toastMsg}
      </div>
    </div>
  );
}
