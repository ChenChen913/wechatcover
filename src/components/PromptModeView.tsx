'use client';

import React, { useState, useCallback } from 'react';
import { promptTemplates, promptCategories } from '@/data/prompts';
import { renderSimpleMarkdown } from '@/utils/markdownRenderer';

interface PromptModeProps {
  title: string;
  subtitle: string;
}

export const PromptModeView: React.FC<PromptModeProps> = ({ title, subtitle }) => {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const handleCopy = useCallback(async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const toggleExpand = useCallback((id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const filteredPrompts = selectedCategory === '全部'
    ? promptTemplates
    : promptTemplates.filter(p => p.category === selectedCategory);

  return (
    <div className="px-7 pb-7">
      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {promptCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`
              px-4 py-2 rounded-full text-sm transition-all
              ${selectedCategory === cat
                ? 'bg-[#7c6df0] text-white'
                : 'bg-[#1e1e2a] text-[#7070a0] hover:border-[#7c6df0] hover:text-[#c084fc] border border-white/7'
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 提示词卡片网格 */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-5">
        {filteredPrompts.map((prompt) => {
          const isExpanded = expandedIds.has(prompt.id);
          const fullPrompt = `${prompt.prompt}\n\n内容：${title || '[在此填写你的文章标题]'}`;

          return (
            <div
              key={prompt.id}
              className="bg-[#1e1e2a]/50 border border-white/7 rounded-[14px] p-5 flex flex-col gap-4"
            >
              {/* 卡片头部 */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold text-[#c084fc] tracking-wider">{prompt.id}</span>
                    <span className="text-sm font-medium text-[#e4e4f0]">{prompt.name}</span>
                  </div>
                  <div className="text-[11px] text-[#7070a0]">
                    推荐：{prompt.platform}
                  </div>
                </div>
                {prompt.relatedTemplate && (
                  <span className="text-[10px] bg-[#7c6df024] text-[#c084fc] px-2 py-1 rounded">
                    对应模板 {prompt.relatedTemplate}
                  </span>
                )}
              </div>

              {/* 提示词内容 - 渲染 markdown 格式 */}
              <div className="flex-1">
                <div className={`text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-4'}`}>
                  <div className="text-[#d4d4e8]">
                    {renderSimpleMarkdown(prompt.prompt)}
                  </div>
                </div>
                {isExpanded && (
                  <>
                    <div className="mt-3 pt-3 border-t border-white/7">
                      <div className="text-[11px] text-[#7070a0] mb-1">负向提示词：</div>
                      <div className="text-sm text-[#a0a0c0]">{prompt.negativePrompt}</div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/7">
                      <div className="text-[11px] text-[#7070a0] mb-1">完整提示词（已填充标题）：</div>
                      <div className="text-sm text-[#d4d4e8] bg-black/20 p-3 rounded-lg break-all whitespace-pre-wrap font-mono">
                        {fullPrompt}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* 操作按钮 */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/7">
                <button
                  onClick={() => toggleExpand(prompt.id)}
                  className="text-[11px] px-3 py-1.5 bg-transparent border border-white/13 rounded-md text-[#7070a0] hover:border-[#7c6df0] hover:text-[#c084fc] transition-all"
                >
                  {isExpanded ? '收起' : '展开'}
                </button>
                <button
                  onClick={() => handleCopy(fullPrompt, prompt.id)}
                  className={`
                    text-[11px] px-3 py-1.5 rounded-md transition-all
                    ${copiedId === prompt.id
                      ? 'bg-[#22c55e] text-white'
                      : 'bg-transparent border border-white/13 text-[#7070a0] hover:border-[#7c6df0] hover:text-[#c084fc]'
                    }
                  `}
                >
                  {copiedId === prompt.id ? '✓ 已复制' : '复制提示词'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 空状态 */}
      {filteredPrompts.length === 0 && (
        <div className="text-center py-20">
          <div className="text-[#7070a0] text-sm">暂无提示词</div>
        </div>
      )}
    </div>
  );
};
