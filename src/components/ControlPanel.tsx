'use client';

import React from 'react';
import { useCoverStore } from '@/store/coverStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

const fontOptions = [
  { value: 'var(--font-noto-sans)', label: 'Noto Sans SC (思源黑体)' },
  { value: 'var(--font-noto-serif)', label: 'Noto Serif SC (思源宋体)' },
  { value: 'var(--font-brush)', label: 'Ma Shan Zheng (马善政毛笔)' },
  { value: 'var(--font-orbitron)', label: 'Orbitron (科幻)' },
  { value: 'var(--font-playfair)', label: 'Playfair Display (优雅)' },
  { value: 'var(--font-cinzel)', label: 'Cinzel (古典)' },
  { value: 'var(--font-bebas)', label: 'Bebas Neue (粗体)' },
  { value: 'var(--font-zcool-qingke)', label: 'ZCOOL QingKe (站酷庆科)' },
  { value: 'var(--font-zcool-kuaile)', label: 'ZCOOL KuaiLe (站酷快乐)' },
  { value: 'var(--font-source-code)', label: 'Source Code Pro (等宽)' },
];

const fontWeightOptions = [
  { value: 300, label: '细' },
  { value: 400, label: '常规' },
  { value: 500, label: '中' },
  { value: 700, label: '粗' },
  { value: 900, label: '超粗' },
];

export const ControlPanel: React.FC = () => {
  const config = useCoverStore((state) => state.config);
  const activeControlTab = useCoverStore((state) => state.activeControlTab);
  const setMainTitle = useCoverStore((state) => state.setMainTitle);
  const setSubtitle = useCoverStore((state) => state.setSubtitle);
  const setTag = useCoverStore((state) => state.setTag);
  const setTextBlock = useCoverStore((state) => state.setTextBlock);
  const setPrimaryColor = useCoverStore((state) => state.setPrimaryColor);
  const setTemplate = useCoverStore((state) => state.setTemplate);
  const setActiveControlTab = useCoverStore((state) => state.setActiveControlTab);
  
  const { mainTitle, subtitle, tag, textBlock, primaryColor } = config;

  // Tab 1: 文字内容
  const TextContentTab = () => (
    <div className="space-y-4">
      {/* 主标题 */}
      <Card>
        <CardContent className="pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">主标题</label>
            <div className="flex items-center gap-2">
              <Switch
                checked={mainTitle.visible}
                onCheckedChange={(checked) => setMainTitle({ visible: checked })}
              />
              <span className="text-xs text-muted-foreground">显示</span>
            </div>
          </div>
          <textarea
            value={mainTitle.content}
            onChange={(e) => setMainTitle({ content: e.target.value.slice(0, 24) })}
            maxLength={24}
            rows={2}
            className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm outline-none focus:border-ring resize-none"
            placeholder="请输入主标题"
          />
          <div className="text-xs text-muted-foreground text-right">
            {mainTitle.content.length} / 24
          </div>
        </CardContent>
      </Card>

      {/* 副标题 */}
      <Card>
        <CardContent className="pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">副标题</label>
            <div className="flex items-center gap-2">
              <Switch
                checked={subtitle.visible}
                onCheckedChange={(checked) => setSubtitle({ visible: checked })}
              />
              <span className="text-xs text-muted-foreground">显示</span>
            </div>
          </div>
          <Input
            value={subtitle.content}
            onChange={(e) => setSubtitle({ content: e.target.value.slice(0, 36) })}
            maxLength={36}
            placeholder="请输入副标题"
          />
          <div className="text-xs text-muted-foreground text-right">
            {subtitle.content.length} / 36
          </div>
        </CardContent>
      </Card>

      {/* 小标签 */}
      <Card>
        <CardContent className="pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">小标签</label>
            <div className="flex items-center gap-2">
              <Switch
                checked={tag.visible}
                onCheckedChange={(checked) => setTag({ visible: checked })}
              />
              <span className="text-xs text-muted-foreground">显示</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Input
                value={tag.label}
                onChange={(e) => setTag({ label: e.target.value.slice(0, 8) })}
                maxLength={8}
                placeholder="标签前缀"
                className="flex-1"
              />
              <Select
                value={tag.separator || ''}
                onValueChange={(value) => setTag({ separator: value || undefined })}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="分隔符" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">无</SelectItem>
                  <SelectItem value=" | "> | </SelectItem>
                  <SelectItem value=" · "> · </SelectItem>
                  <SelectItem value=" — "> — </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input
              value={tag.text}
              onChange={(e) => setTag({ text: e.target.value.slice(0, 20) })}
              maxLength={20}
              placeholder="标签内容"
            />
          </div>
          
          {/* 标签样式 */}
          <div className="pt-3 border-t border-border space-y-3">
            <div className="flex items-center gap-3">
              <label className="text-xs text-muted-foreground">背景色</label>
              <input
                type="color"
                value={tag.background || '#000000'}
                onChange={(e) => setTag({ background: e.target.value })}
                className="w-8 h-8 rounded border cursor-pointer"
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setTag({ background: null })}
                className="h-6 text-xs"
              >
                透明
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground">圆角</label>
                <span className="text-xs text-muted-foreground">{tag.borderRadius}px</span>
              </div>
              <Slider
                value={[tag.borderRadius]}
                onValueChange={(v) => setTag({ borderRadius: Array.isArray(v) ? v[0] : v })}
                min={0}
                max={20}
                step={1}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground">内边距</label>
                <span className="text-xs text-muted-foreground">{tag.padding}</span>
              </div>
              <Select
                value={tag.padding || ''}
                onValueChange={(value) => setTag({ padding: value || '0px' })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择内边距" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0px">无 (0px)</SelectItem>
                  <SelectItem value="2px 6px">小 (2px 6px)</SelectItem>
                  <SelectItem value="4px 8px">中 (4px 8px)</SelectItem>
                  <SelectItem value="6px 12px">大 (6px 12px)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Tab 2: 字体样式
  const FontStylesTab = () => (
    <div className="space-y-6">
      {/* 主标题字体 */}
      <Card>
        <CardContent className="pt-4 space-y-4">
          <h4 className="text-sm font-medium">主标题字体</h4>
          
          {/* 字体选择 */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">字体</label>
            <Select
              value={mainTitle.fontFamily || ''}
              onValueChange={(value) => setMainTitle({ fontFamily: value || undefined })}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择字体" />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 字重选择 */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">字重</label>
            <div className="flex gap-1.5">
              {fontWeightOptions.map((weight) => (
                <button
                  key={weight.value}
                  onClick={() => setMainTitle({ fontWeight: weight.value as any })}
                  className={`
                    flex-1 py-1.5 text-xs rounded-md border transition-all
                    ${mainTitle.fontWeight === weight.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-muted-foreground/50'
                    }
                  `}
                >
                  {weight.label}
                </button>
              ))}
            </div>
          </div>

          {/* 字号 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs text-muted-foreground">字号</label>
              <span className="text-xs text-muted-foreground">{mainTitle.fontSize}px</span>
            </div>
            <Slider
              value={[mainTitle.fontSize]}
              onValueChange={(v) => setMainTitle({ fontSize: Array.isArray(v) ? v[0] : v })}
              min={20}
              max={80}
              step={2}
            />
          </div>

          {/* 字间距 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs text-muted-foreground">字间距</label>
              <span className="text-xs text-muted-foreground">{mainTitle.letterSpacing}em</span>
            </div>
            <Slider
              value={[mainTitle.letterSpacing * 100]}
              onValueChange={(v) => setMainTitle({ letterSpacing: (Array.isArray(v) ? v[0] : v) / 100 })}
              min={-5}
              max={50}
              step={1}
            />
          </div>

          {/* 行高 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs text-muted-foreground">行高</label>
              <span className="text-xs text-muted-foreground">{mainTitle.lineHeight}</span>
            </div>
            <Slider
              value={[mainTitle.lineHeight * 100]}
              onValueChange={(v) => setMainTitle({ lineHeight: (Array.isArray(v) ? v[0] : v) / 100 })}
              min={100}
              max={200}
              step={5}
            />
          </div>

          {/* 颜色 */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">颜色</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={mainTitle.color}
                onChange={(e) => setMainTitle({ color: e.target.value })}
                className="w-10 h-10 rounded border cursor-pointer"
              />
              <Input
                value={mainTitle.color}
                onChange={(e) => setMainTitle({ color: e.target.value })}
                className="flex-1 font-mono text-sm"
              />
            </div>
            {/* 预设颜色 */}
            <div className="grid grid-cols-8 gap-1.5 mt-2">
              {['#ffffff', '#000000', '#7c6df0', '#fbbf24', '#ef4444', '#22c55e', '#3b82f6', '#06b6d4'].map((color) => (
                <button
                  key={color}
                  onClick={() => setMainTitle({ color })}
                  className="aspect-square rounded border-2 hover:scale-110 transition-transform"
                  style={{
                    backgroundColor: color,
                    borderColor: mainTitle.color === color ? '#7c6df0' : 'transparent',
                  }}
                />
              ))}
            </div>
            {/* 渐变色开关 */}
            <div className="flex items-center gap-2 pt-2">
              <Switch
                checked={!!mainTitle.textShadow && mainTitle.textShadow.includes('gradient')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setMainTitle({ textShadow: 'gradient' });
                  } else {
                    setMainTitle({ textShadow: null });
                  }
                }}
              />
              <span className="text-xs text-muted-foreground">使用渐变色</span>
            </div>
          </div>

          {/* 文字效果（折叠面板） */}
          <details className="group pt-2 border-t border-border">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="text-sm font-medium">文字效果</span>
              <span className="text-xs text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="pt-3 space-y-4">
              {/* 阴影 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-muted-foreground">文字阴影</label>
                  <Switch
                    checked={!!mainTitle.textShadow && mainTitle.textShadow !== 'gradient'}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setMainTitle({ textShadow: '0 2px 4px rgba(0,0,0,0.5)' });
                      } else {
                        setMainTitle({ textShadow: null });
                      }
                    }}
                  />
                </div>
                {mainTitle.textShadow && mainTitle.textShadow !== 'gradient' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">模糊半径</span>
                      <span className="text-xs text-muted-foreground">
                        {mainTitle.textShadow.split(' ')[2]?.replace('px', '') || 4}px
                      </span>
                    </div>
                    <Slider
                      value={[parseInt(mainTitle.textShadow.split(' ')[2]) || 4]}
                      onValueChange={(v) => {
                        const value = Array.isArray(v) ? v[0] : v;
                        const parts = (mainTitle.textShadow || '').split(' ');
                        setMainTitle({ textShadow: `${parts[0]} ${parts[1]} ${value}px ${parts[3] || 'rgba(0,0,0,0.5)'}` });
                      }}
                      min={0}
                      max={20}
                      step={1}
                    />
                  </div>
                )}
              </div>

              {/* 描边 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-muted-foreground">文字描边</label>
                  <Switch
                    checked={false}
                    onCheckedChange={() => {}}
                    disabled
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">描边功能需要模板支持</p>
              </div>

              {/* 斜体 */}
              <div className="flex items-center justify-between pt-2">
                <label className="text-xs text-muted-foreground">斜体</label>
                <Switch
                  checked={mainTitle.fontStyle === 'italic'}
                  onCheckedChange={(checked) => setMainTitle({ fontStyle: checked ? 'italic' : 'normal' })}
                />
              </div>
            </div>
          </details>
        </CardContent>
      </Card>

      {/* 副标题字体 */}
      <Card>
        <CardContent className="pt-4 space-y-4">
          <h4 className="text-sm font-medium">副标题字体</h4>
          
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">字体</label>
            <Select
              value={subtitle.fontFamily || ''}
              onValueChange={(value) => setSubtitle({ fontFamily: value || undefined })}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择字体" />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs text-muted-foreground">字号</label>
              <span className="text-xs text-muted-foreground">{subtitle.fontSize}px</span>
            </div>
            <Slider
              value={[subtitle.fontSize]}
              onValueChange={(v) => setSubtitle({ fontSize: Array.isArray(v) ? v[0] : v })}
              min={10}
              max={30}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">颜色</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={subtitle.color}
                onChange={(e) => setSubtitle({ color: e.target.value })}
                className="w-10 h-10 rounded border cursor-pointer"
              />
              <Input
                value={subtitle.color}
                onChange={(e) => setSubtitle({ color: e.target.value })}
                className="flex-1 font-mono text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Tab 3: 布局排版
  const LayoutTab = () => (
    <div className="space-y-6">
      {/* 水平位置 */}
      <Card>
        <CardContent className="pt-4 space-y-4">
          <h4 className="text-sm font-medium">水平位置</h4>
          
          {/* 对齐方式 */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">整体对齐</label>
            <div className="flex gap-2">
              {(['left', 'center', 'right'] as const).map((align) => (
                <button
                  key={align}
                  onClick={() => setTextBlock({ hAlign: align })}
                  className={`
                    flex-1 py-2 text-sm rounded-md border transition-all
                    ${textBlock.hAlign === align
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-muted-foreground/50'
                    }
                  `}
                >
                  {align === 'left' ? '左对齐' : align === 'center' ? '居中' : '右对齐'}
                </button>
              ))}
            </div>
          </div>

          {/* 宽度 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs text-muted-foreground">文字区域宽度</label>
              <span className="text-xs text-muted-foreground">{textBlock.widthPercent}%</span>
            </div>
            <Slider
              value={[textBlock.widthPercent]}
              onValueChange={(v) => setTextBlock({ widthPercent: Array.isArray(v) ? v[0] : v })}
              min={25}
              max={90}
              step={1}
            />
            {textBlock.widthPercent > 80 && (
              <div className="text-xs text-orange-500">
                ⚠️ 超过 80% 时文字可能超出方图安全区
              </div>
            )}
          </div>

          {/* 左右边距 */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">左边距</label>
            <Slider
              value={[textBlock.paddingLeft]}
              onValueChange={(v) => setTextBlock({ paddingLeft: Array.isArray(v) ? v[0] : v })}
              min={0}
              max={15}
              step={1}
              disabled={textBlock.hAlign === 'center'}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">右边距</label>
            <Slider
              value={[textBlock.paddingRight]}
              onValueChange={(v) => setTextBlock({ paddingRight: Array.isArray(v) ? v[0] : v })}
              min={0}
              max={15}
              step={1}
              disabled={textBlock.hAlign === 'center'}
            />
          </div>
        </CardContent>
      </Card>

      {/* 垂直位置 */}
      <Card>
        <CardContent className="pt-4 space-y-4">
          <h4 className="text-sm font-medium">垂直位置</h4>
          
          <div className="flex gap-2">
            {(['top', 'middle', 'bottom'] as const).map((align) => (
              <button
                key={align}
                onClick={() => setTextBlock({ vAlign: align })}
                className={`
                  flex-1 py-2 text-sm rounded-md border transition-all
                  ${textBlock.vAlign === align
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-muted-foreground/50'
                  }
                `}
              >
                {align === 'top' ? '顶部' : align === 'middle' ? '居中' : '底部'}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">上边距</label>
            <Slider
              value={[textBlock.paddingTop]}
              onValueChange={(v) => setTextBlock({ paddingTop: Array.isArray(v) ? v[0] : v })}
              min={0}
              max={20}
              step={1}
              disabled={textBlock.vAlign === 'middle'}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">下边距</label>
            <Slider
              value={[textBlock.paddingBottom]}
              onValueChange={(v) => setTextBlock({ paddingBottom: Array.isArray(v) ? v[0] : v })}
              min={0}
              max={20}
              step={1}
              disabled={textBlock.vAlign === 'middle'}
            />
          </div>
        </CardContent>
      </Card>

      {/* 文字对齐 */}
      <Card>
        <CardContent className="pt-4 space-y-4">
          <h4 className="text-sm font-medium">文字对齐</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">主标题</span>
              <div className="flex gap-1.5">
                {(['left', 'center', 'right'] as const).map((align) => (
                  <button
                    key={align}
                    onClick={() => setMainTitle({ textAlign: align })}
                    className={`
                      px-3 py-1 text-xs rounded-md border transition-all
                      ${mainTitle.textAlign === align
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-muted-foreground/50'
                      }
                    `}
                  >
                    {align === 'left' ? '左' : align === 'center' ? '中' : '右'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">副标题</span>
              <div className="flex gap-1.5">
                {(['left', 'center', 'right'] as const).map((align) => (
                  <button
                    key={align}
                    onClick={() => setSubtitle({ textAlign: align })}
                    className={`
                      px-3 py-1 text-xs rounded-md border transition-all
                      ${subtitle.textAlign === align
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-muted-foreground/50'
                      }
                    `}
                  >
                    {align === 'left' ? '左' : align === 'center' ? '中' : '右'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Tab 4: 模板主题
  const TemplateTab = () => {
    const templates = [
      { id: 't01', name: '极简留白' },
      { id: 't02', name: '深空星云' },
      { id: 't03', name: '橙色热浪' },
      { id: 't04', name: '孟菲斯波普' },
      { id: 't05', name: '苹果玻璃态' },
      { id: 't06', name: '水墨流韵' },
      { id: 't07', name: '赛博霓虹' },
      { id: 't08', name: '马卡龙粉彩' },
      { id: 't09', name: '矩阵终端' },
      { id: 't10', name: '朱砂国潮' },
      { id: 't11', name: '午夜奢华' },
      { id: 't12', name: '银河梦境' },
      { id: 't13', name: '包豪斯几何' },
      { id: 't14', name: '复古旅行' },
      { id: 't15', name: '日出东方' },
      { id: 't16', name: '电影序章' },
      { id: 't17', name: '糖果泡泡' },
      { id: 't18', name: '工程蓝图' },
      { id: 't19', name: '极光极地' },
      { id: 't20', name: '热血燃战' },
    ];

    const colorPresets = [
      '#7c6df0', '#3b82f6', '#22c55e', '#eab308',
      '#ef4444', '#ec4899', '#06b6d4', '#1a1a1a',
    ];

    return (
      <div className="space-y-6">
        {/* 模板画廊 */}
        <Card>
          <CardContent className="pt-4">
            <h4 className="text-sm font-medium mb-3">选择模板</h4>
            <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto pr-2">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => setTemplate(tpl.id)}
                  className={`
                    relative aspect-[2.35/1] rounded-md border-2 transition-all
                    flex items-center justify-center text-xs
                    ${config.templateId === tpl.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-muted-foreground/50'
                    }
                  `}
                >
                  <div className="text-center">
                    <div className="font-bold">{tpl.id.toUpperCase()}</div>
                    <div className="text-[10px] text-muted-foreground truncate">
                      {tpl.name}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 主色调 */}
        <Card>
          <CardContent className="pt-4 space-y-3">
            <h4 className="text-sm font-medium">主色调</h4>
            
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-10 h-10 rounded border cursor-pointer"
              />
              <Input
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="flex-1 font-mono text-sm"
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {colorPresets.map((color) => (
                <button
                  key={color}
                  onClick={() => setPrimaryColor(color)}
                  className="aspect-square rounded-md border-2 transition-all hover:scale-105"
                  style={{
                    backgroundColor: color,
                    borderColor: primaryColor === color ? '#7c6df0' : 'transparent',
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="w-[320px] h-full overflow-y-auto border-r border-white/7 bg-[#0f0f1a]">
      <Tabs
        value={activeControlTab}
        onValueChange={(v) => setActiveControlTab(v as any)}
        className="w-full"
      >
        <TabsList className="w-full justify-start rounded-none border-b border-white/7 bg-[#1a1a2e] h-auto p-0">
          <TabsTrigger
            value="text"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7c6df0] data-[state=active]:bg-[#1a1a2e] data-[state=active]:text-[#c084fc] text-[#e4e4f0] hover:text-[#c084fc] hover:bg-[#1a1a2e]/50 px-4 py-3 text-xs transition-all"
          >
            文字内容
          </TabsTrigger>
          <TabsTrigger
            value="font"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7c6df0] data-[state=active]:bg-[#1a1a2e] data-[state=active]:text-[#c084fc] text-[#e4e4f0] hover:text-[#c084fc] hover:bg-[#1a1a2e]/50 px-4 py-3 text-xs transition-all"
          >
            字体样式
          </TabsTrigger>
          <TabsTrigger
            value="layout"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7c6df0] data-[state=active]:bg-[#1a1a2e] data-[state=active]:text-[#c084fc] text-[#e4e4f0] hover:text-[#c084fc] hover:bg-[#1a1a2e]/50 px-4 py-3 text-xs transition-all"
          >
            布局排版
          </TabsTrigger>
          <TabsTrigger
            value="template"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7c6df0] data-[state=active]:bg-[#1a1a2e] data-[state=active]:text-[#c084fc] text-[#e4e4f0] hover:text-[#c084fc] hover:bg-[#1a1a2e]/50 px-4 py-3 text-xs transition-all"
          >
            模板主题
          </TabsTrigger>
        </TabsList>

        <div className="p-4">
          <TabsContent value="text" className="mt-0">
            <TextContentTab />
          </TabsContent>
          <TabsContent value="font" className="mt-0">
            <FontStylesTab />
          </TabsContent>
          <TabsContent value="layout" className="mt-0">
            <LayoutTab />
          </TabsContent>
          <TabsContent value="template" className="mt-0">
            <TemplateTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
