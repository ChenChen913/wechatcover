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
import { TEMPLATE_TEXT_SETTINGS, DEFAULT_MAX_CHARS_PER_LINE } from '@/data/templateSettings';

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
  { value: 'var(--font-inter)', label: 'Inter (无衬线)' },
  { value: 'var(--font-space-grotesk)', label: 'Space Grotesk (几何)' },
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

  // 获取当前模板的覆盖配置
  const currentTemplateOverrides = useCoverStore((state) => state.templateOverrides[config.templateId]);
  const resetCurrentTemplateOverrides = useCoverStore((state) => state.resetCurrentTemplateOverrides);

  // 模板名称查找表
  const templateNameMap: Record<string, { name: string; desc: string }> = {
    t01: { name: '极简留白', desc: '杂志排版 · 高级灰' }, t02: { name: '深空星云', desc: '弥散光晕 · 科技感' },
    t03: { name: '橙色热浪', desc: '亮色冲击 · 潮流' }, t04: { name: '孟菲斯波普', desc: '几何拼接 · 趣味' },
    t05: { name: '苹果玻璃态', desc: '毛玻璃卡片 · 质感' }, t06: { name: '水墨流韵', desc: '现代水墨 · 意境' },
    t07: { name: '赛博霓虹', desc: '故障发光 · 未来' }, t08: { name: '马卡龙粉彩', desc: '柔和弥散 · 温馨' },
    t09: { name: '矩阵终端', desc: '黑客代码 · 极简' }, t10: { name: '朱砂国潮', desc: '宫廷红金 · 大气' },
    t11: { name: '午夜奢华', desc: '纯黑打光 · 高端' }, t12: { name: '银河梦境', desc: '深邃光晕 · 梦幻' },
    t13: { name: '包豪斯几何', desc: '基础图形 · 经典' }, t14: { name: '复古旅行', desc: '牛皮纸感 · 邮戳' },
    t15: { name: '日出东方', desc: '日系红日 · 极简' }, t16: { name: '电影序章', desc: '宽银幕打光 · 沉浸' },
    t17: { name: '糖果泡泡', desc: '3D球体 · 活泼' }, t18: { name: '工程蓝图', desc: '网格十字标 · 严谨' },
    t19: { name: '极光极地', desc: '柔和极光 · 广阔' }, t20: { name: '热血燃战', desc: '斜切色块 · 力量' },
    t21: { name: '磨砂光环', desc: 'Frosted Aura · 磨砂玻璃' }, t22: { name: '现代宋体', desc: 'Modern Serif · 优雅' },
    t23: { name: '便当布局', desc: 'Bento Pro · 卡片布局' }, t24: { name: '终端科技', desc: 'Terminal Tech · 终端' },
    t25: { name: '流体波纹', desc: 'Liquid Flow · 流体' }, t26: { name: '极简禅意', desc: 'Minimal Zen · 禅意' },
    t27: { name: '玻璃层叠', desc: 'Glass Layers · 叠层' }, t28: { name: '复古赛博', desc: 'Retro Cyber · 赛博' },
    t29: { name: '粗体排版', desc: 'Bold Editorial · 排版' }, t30: { name: '包豪斯艺术', desc: 'Bauhaus Art · 几何' },
    t31: { name: '全息镭射', desc: 'Hologram · 镭射' }, t32: { name: '暗点网格', desc: 'Dark Grid · 点阵' },
    t33: { name: '颗粒黑白', desc: 'Grainy Noir · 黑白' }, t34: { name: '粗野主义', desc: 'Brutalist · 粗犷' },
    t35: { name: '深邃流体', desc: 'Organic Deep · 流体' }, t36: { name: '深蓝极光', desc: 'Deep Aurora · 极光' },
    t37: { name: '商务蓝调', desc: '专业沉稳 · 蓝调' }, t38: { name: '晨雾光影', desc: '人文关怀 · 暖色' },
    t39: { name: '柔雾悬浮', desc: '现代磨砂 · 悬浮' }, t40: { name: '科技矩阵', desc: '数据前沿 · 矩阵' },
    t41: { name: '法式线框', desc: '高级质感 · 金线' }, t42: { name: '数据折线', desc: '极简灰白 · 折线' },
    t43: { name: '知识圆环', desc: '专注深度 · 圆环' }, t44: { name: '排版快讯', desc: '报纸区块 · 快讯' },
    t45: { name: '圆融交叠', desc: '莫兰迪色 · 交叠' }, t46: { name: '对角切割', desc: '活力控制 · 对角' },
    t47: { name: '黑金质感', desc: '经典奢华 · 黑金' }, t48: { name: '极简焦点', desc: '大量留白 · 焦点' },
    t49: { name: '温润大地', desc: '木质暖调 · 大地' }, t50: { name: '暗夜微光', desc: '深邃呼吸 · 微光' },
    t51: { name: '雅致水墨', desc: '淡雅灰度 · 水墨' }, t52: { name: '灵动渐变', desc: '百搭通用 · 渐变' },
  };

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
            className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 outline-none focus:border-[#7c6df0] resize-none placeholder:text-gray-400"
            placeholder="请输入主标题"
          />
          <div className="text-xs text-muted-foreground text-right">
            {mainTitle.content.length} / 24
          </div>

          {/* 每行最大字数 */}
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="flex items-center justify-between">
              <label className="text-xs text-muted-foreground">每行最大字数</label>
              <span className="text-xs text-muted-foreground">{mainTitle.maxCharsPerLine} 字</span>
            </div>
            <Slider
              value={[mainTitle.maxCharsPerLine]}
              onValueChange={(v) => setMainTitle({ maxCharsPerLine: Array.isArray(v) ? v[0] : v })}
              min={4}
              max={16}
              step={1}
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>紧凑（多行）</span>
              <span>宽松（少行）</span>
            </div>
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

          {/* 每行最大字数 */}
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="flex items-center justify-between">
              <label className="text-xs text-muted-foreground">每行最大字数</label>
              <span className="text-xs text-muted-foreground">{subtitle.maxCharsPerLine} 字</span>
            </div>
            <Slider
              value={[subtitle.maxCharsPerLine]}
              onValueChange={(v) => setSubtitle({ maxCharsPerLine: Array.isArray(v) ? v[0] : v })}
              min={6}
              max={24}
              step={1}
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>紧凑（多行）</span>
              <span>宽松（少行）</span>
            </div>
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
                <label className="text-xs text-muted-foreground">水平内边距</label>
                <span className="text-xs text-muted-foreground">{tag.paddingX}px</span>
              </div>
              <Slider
                value={[tag.paddingX]}
                onValueChange={(v) => setTag({ paddingX: Array.isArray(v) ? v[0] : v })}
                min={0}
                max={16}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground">垂直内边距</label>
                <span className="text-xs text-muted-foreground">{tag.paddingY}px</span>
              </div>
              <Slider
                value={[tag.paddingY]}
                onValueChange={(v) => setTag({ paddingY: Array.isArray(v) ? v[0] : v })}
                min={0}
                max={12}
                step={1}
              />
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

          {/* 行宽控制 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs text-muted-foreground">行宽</label>
              <span className="text-xs text-muted-foreground">{mainTitle.maxWidth}%</span>
            </div>
            <Slider
              value={[mainTitle.maxWidth]}
              onValueChange={(v) => setMainTitle({ maxWidth: Array.isArray(v) ? v[0] : v })}
              min={30}
              max={100}
              step={1}
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>窄（自动换行）</span>
              <span>宽（单行显示）</span>
            </div>
          </div>

          {/* 颜色 */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">颜色</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={mainTitle.color || '#ffffff'}
                onChange={(e) => setMainTitle({ color: e.target.value })}
                className="w-10 h-10 rounded border cursor-pointer"
              />
              <Input
                value={mainTitle.color || ''}
                placeholder="跟随模板"
                onChange={(e) => setMainTitle({ color: e.target.value || undefined })}
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
            {/* 渐变色 */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2">
                <Switch
                  checked={mainTitle.useGradient}
                  onCheckedChange={(checked) => {
                    setMainTitle({ useGradient: checked });
                  }}
                />
                <span className="text-xs text-muted-foreground">使用渐变色</span>
              </div>
              {mainTitle.useGradient && (
                <div className="space-y-2 pl-2 border-l-2 border-primary/20">
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-muted-foreground w-12">起始色</label>
                    <input
                      type="color"
                      value={mainTitle.gradientFrom}
                      onChange={(e) => setMainTitle({ gradientFrom: e.target.value })}
                      className="w-8 h-8 rounded border cursor-pointer"
                    />
                    <Input
                      value={mainTitle.gradientFrom}
                      onChange={(e) => setMainTitle({ gradientFrom: e.target.value })}
                      className="flex-1 font-mono text-xs h-8"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-muted-foreground w-12">结束色</label>
                    <input
                      type="color"
                      value={mainTitle.gradientTo}
                      onChange={(e) => setMainTitle({ gradientTo: e.target.value })}
                      className="w-8 h-8 rounded border cursor-pointer"
                    />
                    <Input
                      value={mainTitle.gradientTo}
                      onChange={(e) => setMainTitle({ gradientTo: e.target.value })}
                      className="flex-1 font-mono text-xs h-8"
                    />
                  </div>
                  {/* 渐变预览条 */}
                  <div
                    className="h-4 rounded-full"
                    style={{ background: `linear-gradient(135deg, ${mainTitle.gradientFrom}, ${mainTitle.gradientTo})` }}
                  />
                  {/* 渐变预设 */}
                  <div className="grid grid-cols-5 gap-1.5">
                    {[
                      { from: '#7c6df0', to: '#ec4899' },
                      { from: '#3b82f6', to: '#06b6d4' },
                      { from: '#f59e0b', to: '#ef4444' },
                      { from: '#22c55e', to: '#06b6d4' },
                      { from: '#a855f7', to: '#3b82f6' },
                    ].map((preset, i) => (
                      <button
                        key={i}
                        onClick={() => setMainTitle({ gradientFrom: preset.from, gradientTo: preset.to })}
                        className="h-5 rounded-full border hover:scale-105 transition-transform"
                        style={{ background: `linear-gradient(135deg, ${preset.from}, ${preset.to})` }}
                      />
                    ))}
                  </div>
                </div>
              )}
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
                    checked={!!mainTitle.textShadow}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setMainTitle({ textShadow: '0 2px 4px rgba(0,0,0,0.5)' });
                      } else {
                        setMainTitle({ textShadow: null });
                      }
                    }}
                    disabled={mainTitle.useGradient}
                  />
                </div>
                {mainTitle.textShadow && !mainTitle.useGradient && (
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
                {mainTitle.useGradient && (
                  <p className="text-[10px] text-muted-foreground">渐变模式下阴影不可用</p>
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
                value={subtitle.color || '#ffffff'}
                onChange={(e) => setSubtitle({ color: e.target.value })}
                className="w-10 h-10 rounded border cursor-pointer"
              />
              <Input
                value={subtitle.color || ''}
                placeholder="跟随模板"
                onChange={(e) => setSubtitle({ color: e.target.value || undefined })}
                className="flex-1 font-mono text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Tab 3: 布局排版
  const LayoutTab = () => {
    // 检查当前模板是否有覆盖配置
    const hasTextBlockOverrides = currentTemplateOverrides?.textBlock !== undefined;
    const hasPrimaryColorOverride = currentTemplateOverrides?.primaryColor !== undefined;

    return (
    <div className="space-y-6">
      {/* 水平位置 */}
      <Card>
        <CardContent className="pt-4 space-y-4">
          <h4 className="text-sm font-medium">水平位置</h4>
          
          {/* 对齐方式（同时控制容器位置和文字对齐） */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground">文字对齐</label>
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
            <p className="text-[10px] text-muted-foreground">同时控制文字块位置和文字行内对齐</p>
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
            <p className="text-[10px] text-muted-foreground">宽度越小，左右留白越多</p>
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
            <div className="flex items-center justify-between">
              <label className="text-xs text-muted-foreground">上边距</label>
              <span className="text-xs text-muted-foreground">{textBlock.paddingTop}%</span>
            </div>
            <Slider
              value={[textBlock.paddingTop]}
              onValueChange={(v) => setTextBlock({ paddingTop: Array.isArray(v) ? v[0] : v })}
              min={0}
              max={20}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs text-muted-foreground">下边距</label>
              <span className="text-xs text-muted-foreground">{textBlock.paddingBottom}%</span>
            </div>
            <Slider
              value={[textBlock.paddingBottom]}
              onValueChange={(v) => setTextBlock({ paddingBottom: Array.isArray(v) ? v[0] : v })}
              min={0}
              max={20}
              step={1}
            />
          </div>
        </CardContent>
      </Card>

      {/* 重置按钮 */}
      <Button
        variant="outline"
        size="sm"
        onClick={resetCurrentTemplateOverrides}
        disabled={!hasTextBlockOverrides && !hasPrimaryColorOverride}
        className="w-full"
      >
        {(hasTextBlockOverrides || hasPrimaryColorOverride)
          ? '重置当前模板布局'
          : '当前模板已使用默认布局'}
      </Button>
    </div>
    );
  };

  // Tab 4: 模板主题（色调修改）
  const TemplateTab = () => {
    const colorPresets = [
      '#7c6df0', '#3b82f6', '#22c55e', '#eab308',
      '#ef4444', '#ec4899', '#06b6d4', '#1a1a1a',
    ];

    const templateId = config.templateId;
    const templateSetting = TEMPLATE_TEXT_SETTINGS[templateId];

    // 从 templateOverrides 读取当前模板的用户设置
    const overrides = currentTemplateOverrides;
    const userMaxCharsMain = overrides?.mainTitle?.maxCharsPerLine;
    const userMaxCharsSub = overrides?.subtitle?.maxCharsPerLine;
    const hasUserMaxCharsMain = userMaxCharsMain !== undefined;
    const hasUserMaxCharsSub = userMaxCharsSub !== undefined;

    // 当前有效值：用户值 > 默认值
    const currentMaxCharsMain = userMaxCharsMain ?? templateSetting?.defaultMaxCharsPerLine ?? DEFAULT_MAX_CHARS_PER_LINE;
    const currentMaxCharsSub = userMaxCharsSub ?? 14;  // 副标题默认值

    return (
      <div className="space-y-6">
        {/* 当前模板信息 */}
        <Card>
          <CardContent className="pt-4 space-y-3">
            <h4 className="text-sm font-medium">当前模板</h4>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#7c6df0]/10 flex items-center justify-center text-[#7c6df0] font-bold text-sm">
                {templateId?.toUpperCase().replace('T', '') || '01'}
              </div>
              <div>
                <div className="text-sm font-medium">{templateNameMap[templateId || '']?.name || '未选择'}</div>
                <div className="text-xs text-muted-foreground">{templateNameMap[templateId || '']?.desc || '请在右侧点击"选择"按钮'}</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">如需切换模板，请在右侧封面卡片上点击"选择"按钮</p>
          </CardContent>
        </Card>

        {/* 每行最大字数 */}
        <Card>
          <CardContent className="pt-4 space-y-4">
            <h4 className="text-sm font-medium">文字排版</h4>

            {/* 主标题每行最大字数 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground">主标题每行最大字数</label>
                <span className="text-xs font-medium">{currentMaxCharsMain} 字</span>
              </div>
              <Slider
                value={[currentMaxCharsMain]}
                onValueChange={(v) => setMainTitle({ maxCharsPerLine: Array.isArray(v) ? v[0] : v })}
                min={templateSetting?.minMaxCharsPerLine || 4}
                max={templateSetting?.maxMaxCharsPerLine || 20}
                step={1}
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>紧凑（多行）</span>
                <span>宽松（少行）</span>
              </div>
              <p className="text-[10px] text-muted-foreground">
                当前模板默认值：{templateSetting?.defaultMaxCharsPerLine || DEFAULT_MAX_CHARS_PER_LINE} 字
              </p>
            </div>

            {/* 副标题每行最大字数 */}
            <div className="space-y-2 pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground">副标题每行最大字数</label>
                <span className="text-xs font-medium">{currentMaxCharsSub} 字</span>
              </div>
              <Slider
                value={[currentMaxCharsSub]}
                onValueChange={(v) => setSubtitle({ maxCharsPerLine: Array.isArray(v) ? v[0] : v })}
                min={6}
                max={24}
                step={1}
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>紧凑（多行）</span>
                <span>宽松（少行）</span>
              </div>
            </div>

            {/* 重置按钮 */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setMainTitle({ maxCharsPerLine: templateSetting?.defaultMaxCharsPerLine ?? DEFAULT_MAX_CHARS_PER_LINE });
                }}
                disabled={!hasUserMaxCharsMain}
                className="flex-1"
              >
                {hasUserMaxCharsMain ? '重置主标题' : '主标题已默认'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSubtitle({ maxCharsPerLine: 14 });
                }}
                disabled={!hasUserMaxCharsSub}
                className="flex-1"
              >
                {hasUserMaxCharsSub ? '重置副标题' : '副标题已默认'}
              </Button>
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
    <div
      className="w-full lg:w-[320px] h-full overflow-y-auto overflow-x-hidden border-r border-gray-200 bg-[#fafafa]"
      style={{
        // 强制浅色主题 CSS 变量，覆盖全局暗色
        colorScheme: 'light',
        ['--background' as string]: '#ffffff',
        ['--foreground' as string]: '#1a1a1a',
        ['--card' as string]: '#ffffff',
        ['--card-foreground' as string]: '#1a1a1a',
        ['--popover' as string]: '#ffffff',
        ['--popover-foreground' as string]: '#1a1a1a',
        ['--primary' as string]: '#7c6df0',
        ['--primary-foreground' as string]: '#ffffff',
        ['--secondary' as string]: '#f3f0ff',
        ['--secondary-foreground' as string]: '#1a1a1a',
        ['--muted' as string]: '#f5f5f5',
        ['--muted-foreground' as string]: '#737373',
        ['--accent' as string]: '#f3f0ff',
        ['--accent-foreground' as string]: '#1a1a1a',
        ['--input' as string]: '#e5e5e5',
        ['--border' as string]: '#e5e5e5',
        ['--ring' as string]: '#7c6df0',
      }}
    >
      <Tabs
        value={activeControlTab}
        onValueChange={(v) => setActiveControlTab(v as any)}
        className="w-full"
      >
        <TabsList className="w-full justify-start rounded-none border-b border-gray-200 bg-white h-auto p-0">
          <TabsTrigger
            value="text"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7c6df0] data-[state=active]:bg-white data-[state=active]:text-[#7c6df0] text-[#555] hover:text-[#7c6df0] hover:bg-gray-50 px-4 py-3 text-xs transition-all"
          >
            文字内容
          </TabsTrigger>
          <TabsTrigger
            value="font"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7c6df0] data-[state=active]:bg-white data-[state=active]:text-[#7c6df0] text-[#555] hover:text-[#7c6df0] hover:bg-gray-50 px-4 py-3 text-xs transition-all"
          >
            字体样式
          </TabsTrigger>
          <TabsTrigger
            value="layout"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7c6df0] data-[state=active]:bg-white data-[state=active]:text-[#7c6df0] text-[#555] hover:text-[#7c6df0] hover:bg-gray-50 px-4 py-3 text-xs transition-all"
          >
            布局排版
          </TabsTrigger>
          <TabsTrigger
            value="template"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7c6df0] data-[state=active]:bg-white data-[state=active]:text-[#7c6df0] text-[#555] hover:text-[#7c6df0] hover:bg-gray-50 px-4 py-3 text-xs transition-all"
          >
            模板主题
          </TabsTrigger>
        </TabsList>

        <div className="p-4">
          <TabsContent value="text" className="mt-0">
            {TextContentTab()}
          </TabsContent>
          <TabsContent value="font" className="mt-0">
            {FontStylesTab()}
          </TabsContent>
          <TabsContent value="layout" className="mt-0">
            {LayoutTab()}
          </TabsContent>
          <TabsContent value="template" className="mt-0">
            {TemplateTab()}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
