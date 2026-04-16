import React from 'react';

/**
 * 简单的 markdown 渲染器
 * 支持：加粗（**text**）、列表（- item）、标题（### text）
 */
export function renderSimpleMarkdown(markdown: string): React.ReactNode[] {
  if (!markdown) return [];

  const lines = markdown.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let keyIndex = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${keyIndex++}`} className="list-disc list-inside space-y-1 my-2 text-[#d4d4e8]">
          {currentList.map((item, i) => (
            <li key={i}>{renderInlineMarkdown(item)}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const renderInlineMarkdown = (text: string): React.ReactNode => {
    // 处理加粗文本 **text**
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-[#e4e4f0]">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine === '') {
      flushList();
      continue;
    }

    // 处理标题 ###
    if (trimmedLine.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={`h3-${keyIndex++}`} className="text-base font-bold text-[#e4e4f0] mt-4 mb-2">
          {trimmedLine.slice(4)}
        </h3>
      );
      continue;
    }

    // 处理二级标题 ##
    if (trimmedLine.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={`h2-${keyIndex++}`} className="text-lg font-bold text-[#e4e4f0] mt-4 mb-2">
          {trimmedLine.slice(3)}
        </h2>
      );
      continue;
    }

    // 处理列表项 -
    if (trimmedLine.startsWith('- ')) {
      currentList.push(trimmedLine.slice(2));
      continue;
    }

    // 处理段落
    flushList();
    elements.push(
      <p key={`p-${keyIndex++}`} className="my-2 text-[#d4d4e8]">
        {renderInlineMarkdown(trimmedLine)}
      </p>
    );
  }

  flushList();
  return elements;
}
