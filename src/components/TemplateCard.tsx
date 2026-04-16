'use client';

import React, { useRef } from 'react';
import { useCoverStore } from '@/store/coverStore';
import type { CoverConfig } from '@/store/coverStore';

interface TemplatePreviewProps {
  id: string;
  name: string;
  desc: string;
  render: (config: CoverConfig) => React.ReactNode;
  onExport: (id: string, quality: 'hd' | 'uhd') => void;
  onSelect?: (id: string) => void;
  isSelected?: boolean;
}

export const TemplateCard: React.FC<TemplatePreviewProps> = ({
  id,
  name,
  desc,
  render,
  onExport,
  onSelect,
  isSelected = false,
}) => {
  const config = useCoverStore((state) => state.config);

  return (
    <div className="flex flex-col gap-0">
      {/* 卡片头部 */}
      <div className="flex items-center justify-between px-0.5 pb-2">
        <div>
          <span className="text-[11px] text-[#7070a0] tracking-[.06em]">{name}</span>
          <span className="text-[10px] text-white/25 ml-2">{desc}</span>
        </div>
        <div className="flex gap-1.5">
          {!isSelected && onSelect && (
            <button
              onClick={() => onSelect(id)}
              className="text-[11px] px-2.5 py-1 bg-[#7c6df0] border border-[#7c6df0] rounded-md text-white cursor-pointer hover:bg-[#6b5ce0] transition-all"
            >
              选择
            </button>
          )}
          {isSelected && (
            <span className="text-[11px] px-2.5 py-1 bg-[#7c6df0]/15 border border-[#7c6df0]/30 rounded-md text-[#7c6df0]">
              当前
            </span>
          )}
          <button
            onClick={() => onExport(id, 'hd')}
            className="text-[11px] px-2.5 py-1 bg-transparent border border-white/13 rounded-md text-[#7070a0] cursor-pointer hover:border-[#7c6df0] hover:text-[#c084fc] transition-all"
          >
            ↓ 高清
          </button>
          <button
            onClick={() => onExport(id, 'uhd')}
            className="text-[11px] px-2.5 py-1 bg-transparent border border-white/13 rounded-md text-[#7070a0] cursor-pointer hover:border-[#7c6df0] hover:text-[#c084fc] transition-all"
          >
            ↓ 超清
          </button>
        </div>
      </div>

      {/* 双预览布局 */}
      <div className="space-y-3">
        {/* 上方大图预览 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#7070a0]">订阅号列表 / 推荐页</span>
              <span className="text-[11px] font-bold text-[#7c6df0] bg-[#7c6df0]/10 px-2 py-0.5 rounded">
                {id.toUpperCase()}
              </span>
            </div>
            <span className="text-[9px] text-[#7070a0] opacity-70">2.35:1 · 900×383px</span>
          </div>
          <div
            id={id}
            className="relative w-full aspect-[900/383] rounded-[14px] overflow-hidden cursor-pointer transition-transform duration-350 ease-[cubic-bezier(.23,1,.32,1)] hover:-translate-y-1.25 hover:scale-[1.005] hover:shadow-[0_24px_64px_rgba(0,0,0,.7)] container"
            style={{ containerType: 'inline-size' }}
          >
            {render(config)}
          </div>
        </div>
      </div>
    </div>
  );
};
