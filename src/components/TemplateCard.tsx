'use client';

import React, { useRef } from 'react';
import { useCoverStore } from '@/store/coverStore';

interface TemplatePreviewProps {
  id: string;
  name: string;
  desc: string;
  render: (title: string, subtitle: string) => React.ReactNode;
  onExport: (id: string, quality: 'hd' | 'uhd') => void;
}

export const TemplateCard: React.FC<TemplatePreviewProps> = ({
  id,
  name,
  desc,
  render,
  onExport,
}) => {
  const { title, subtitle, showSafeZone } = useCoverStore();

  return (
    <div className="flex flex-col gap-0">
      {/* 卡片头部 */}
      <div className="flex items-center justify-between px-0.5 pb-2">
        <div>
          <span className="text-[11px] text-[#7070a0] tracking-[.06em]">{name}</span>
          <span className="text-[10px] text-white/25 ml-2">{desc}</span>
        </div>
        <div className="flex gap-1.5">
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
            <span className="text-[10px] text-[#7070a0]">订阅号列表 / 推荐页</span>
            <span className="text-[9px] text-[#7070a0] opacity-70">2.35:1 · 900×383px</span>
          </div>
          <div
            id={id}
            className="relative w-full aspect-[900/383] rounded-[14px] overflow-hidden cursor-pointer transition-transform duration-350 ease-[cubic-bezier(.23,1,.32,1)] hover:-translate-y-1.25 hover:scale-[1.005] hover:shadow-[0_24px_64px_rgba(0,0,0,.7)] container"
            style={{ containerType: 'inline-size' }}
          >
            {render(title, subtitle)}
            {showSafeZone && (
              <div
                className="absolute top-0 bottom-0 border-2 border-dashed border-[rgba(255,60,60,.7)] z-50 pointer-events-none"
                style={{ left: 'calc(259/900*100%)', width: 'calc(383/900*100%)' }}
              >
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 text-[9px] text-[rgba(255,60,60,.8)] bg-[rgba(0,0,0,.55)] px-2 py-0.5 rounded-[3px] whitespace-nowrap font-sans">
                  方图安全区
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 下方方图预览 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-[#7070a0]">朋友圈 / 聊天转发</span>
            <span className="text-[9px] text-[#7070a0] opacity-70">1:1 · 383×383px（中心裁剪）</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-[80px] h-[80px] rounded-lg overflow-hidden border border-white/7 relative flex-shrink-0">
              {/* 方图是从大图水平中心截取 */}
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="absolute inset-0 origin-center"
                  style={{
                    width: '235%',
                    height: '235%',
                    left: '-67.5%',
                  }}
                >
                  {render(title, subtitle)}
                </div>
              </div>
            </div>
            <div className="text-[9px] text-[#7070a0] leading-relaxed">
              <div>微信会自动截取</div>
              <div>水平中心的正方形区域</div>
              <div className="text-[#c084fc] mt-1">
                ⚠️ 确保标题在安全区内
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
