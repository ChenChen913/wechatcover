'use client';

import React, { useState, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { PromptModeView } from '@/components/PromptModeView';
import { ControlPanel } from '@/components/ControlPanel';
import { TemplateCard } from '@/components/TemplateCard';
import { useCoverStore } from '@/store/coverStore';
import { TEMPLATES, CATEGORIES } from '@/data/templates';

type ActiveMode = 'web' | 'prompt';

export default function Home() {
  const activeMode = useCoverStore((state) => state.activeMode);
  const setMode = useCoverStore((state) => state.setMode);
  const title = useCoverStore((state) => state.config.mainTitle.content);
  const subtitle = useCoverStore((state) => state.config.subtitle.content);
  const setMainTitle = useCoverStore((state) => state.setMainTitle);
  const setSubtitle = useCoverStore((state) => state.setSubtitle);
  const setTemplate = useCoverStore((state) => state.setTemplate);
  const config = useCoverStore((state) => state.config);

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
    <div className="h-screen flex flex-col bg-[#08080f] text-[#e4e4f0] font-sans relative overflow-hidden">
      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.03'/%3E%3C/svg%3E")` }} />

      {/* 顶部导航栏 */}
      <nav className="sticky top-0 z-50 bg-[#08080f]/88 backdrop-blur-2xl border-b border-white/7 flex-shrink-0">
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
                onChange={(e) => setMainTitle({ content: e.target.value })}
                className="w-full bg-[#1e1e2a] border border-white/13 rounded-md px-3.5 py-2 text-sm outline-none focus:border-[#7c6df0] transition-colors placeholder:text-[#7070a0]"
              />
            </div>
            <div className="max-w-[220px] flex-1">
              <input
                type="text"
                placeholder="副标题（可选）"
                maxLength={28}
                value={subtitle}
                onChange={(e) => setSubtitle({ content: e.target.value })}
                className="w-full bg-[#1e1e2a] border border-white/13 rounded-md px-3.5 py-2 text-sm outline-none focus:border-[#7c6df0] transition-colors placeholder:text-[#7070a0]"
              />
            </div>
            <div className="text-[11px] px-3 py-1 bg-[#7c6df024] border border-[#7c6df047] rounded-full text-[#c084fc] whitespace-nowrap">
              52 种精品模板
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
                onChange={(e) => setMainTitle({ content: e.target.value })}
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
        <div className="flex flex-col lg:flex-row flex-1 min-h-0">
          {/* 左侧控制面板 */}
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

            {/* 模板网格 */}
            <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(520px,1fr))] gap-6 lg:gap-8">
              {filteredTemplates.map((tpl) => (
                <TemplateCard
                  key={tpl.id}
                  id={tpl.id}
                  name={tpl.name}
                  desc={tpl.desc}
                  render={tpl.render}
                  onExport={handleExport}
                  onSelect={(id) => setTemplate(id)}
                  isSelected={config.templateId === tpl.id}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 提示词模式 */}
      {activeMode === 'prompt' && (
        <div className="flex-1 min-h-0 overflow-y-auto">
          <PromptModeView title={title} subtitle={subtitle} />
        </div>
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
