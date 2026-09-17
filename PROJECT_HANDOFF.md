# 张瑞个人作品集｜AI 开发交接文档

> 分类最新调整：项目现场现为 5 类，覆盖下文旧的 10 类描述。AI 课程设计含原小红书运营 1–4，共 36 张图；腾讯云架构师技术同盟/腾讯云TVP运营含原峰会沙龙 2 张图及短片剪辑 4 段视频；校园实验室建设 5 张图；腾讯龙虾区域增长专项目 11 张图；对外分享（原讲师分享）8 张图。`src/gallery.js` 使用 sources 归并原目录，itemsFor 生成混合媒体列表；所有 66 件素材路径保留不变。

> 最新补充：项目现场 `FieldGallery` 已改为 MagicBento 照片墙，覆盖旧轮播描述。保留 `src/gallery.js` 的 10 个分类和所有素材；CSS columns 桌面三列、中屏两列、手机一列，图片以原始比例完整显示。点击打开原生 dialog 图片/视频预览，Escape 关闭并恢复焦点。官方 JS-CSS 源码通过 shadcn 安装，`MagicBento` 扩展 `items` 与 `renderCard`；紫色聚光、边框、12 粒子、倾斜、磁吸、点击效果按用户配置开启，移动/粗指针/reduced-motion 禁用动效。默认六卡演示布局已在 FieldGallery.css 中覆盖，官方 CSS 根变量限定在 bento-section。构建通过，分类切换、图片放大、视频控件、390px 无溢出已验证。

> 更新时间：2026-09-14  
> 当前阶段：本地可运行的第三版视觉方案已完成，等待用户继续提出视觉、文案和项目素材调整。  
> 本地预览：http://localhost:5173/

## 1. 项目目标

这是张瑞的中文个人作品集网站，目标身份是：

- AI 产品技术运营
- 客户经理（有技术背景）

网站用于 PC 端求职展示，同时保证移动端可正常浏览。整体视觉方向已经由用户从三套方案中选定为“第三个”：电影感、克制、高级、暗色科技氛围，以暖白、信号红和深蓝为主要色彩。

本项目不是通用模板站。继续开发时应优先保持人物定位、真实项目内容和现有视觉语言的一致性，不要把页面改回常见的渐变卡片式 SaaS 模板。

## 2. 当前实现结论

当前页面已包含：

1. 全屏 Hero：品牌导航、姓名、身份、简介、业务证明数据、合作范围和电影感地平线视觉。
2. 精选项目：三个真实项目，以大图和文字交错呈现。
3. 关于我：个人定位、简介、联系方式和四项量化数据。
4. 个人能力：技术产品化、增长运营、客户洞察、复杂项目推进。
5. 联系方式：整屏浅色收尾页。

用户明确要求移除证件照，当前页面没有人物照片。不要未经用户要求重新加入头像或证件照。

## 3. 技术栈与运行方式

- React 19
- Vite
- JavaScript + 普通 CSS
- GSAP
- OGL（LightRays WebGL 效果）
- Motion
- Phosphor Icons
- React Bits 组件源码本地化集成

项目目录：

```text
/Users/raelzhang/Documents/Codex/2026-09-07/6-codex-skill-codex-workflow-github/outputs/zhangrui-portfolio
```

运行命令：

```bash
npm install
npm run dev
```

默认开发地址：

```text
http://localhost:5173/
```

生产构建与本地预览：

```bash
npm run build
npm run preview
```

最近一次 `npm run build` 已通过，Vite 共转换 5039 个模块。交付前必须重新执行构建，并检查浏览器控制台。

## 4. 核心文件

```text
src/main.jsx                         页面结构、项目数据、能力数据及全部可见文案
src/styles.css                       全局设计系统、页面布局、响应式和动效样式
src/components/TargetCursor.jsx      React Bits 目标光标
src/components/TargetCursor.css      目标光标样式
src/components/LightRays.jsx         Hero WebGL 光束
src/components/LightRays.css         光束容器样式
src/components/ScrollFloat.jsx       滚动字符标题
src/components/ScrollFloat.css       滚动字符标题样式
src/components/FadeContent.jsx       内容进入视口时的淡入与模糊过渡
src/components/GlareHover.jsx        项目图片悬停扫光
src/components/GlareHover.css        项目图片扫光样式
src/components/CountUp.jsx           数字增长动画
public/hero-horizon.webp             Hero 地平线主视觉（WebP 优化版）
public/project-summit.webp           粤港澳大湾区架构师峰会项目图
public/project-opc.webp              腾讯 OPC 项目图
public/project-ai.webp               AI 战略指标管理系统项目图
design-qa.md                         当前第三版的设计验收记录
```

以下组件属于前几轮设计遗留，当前 `src/main.jsx` 没有使用：

```text
BlurText.jsx
EyeFollow.jsx
HeroMotion.jsx
Magnet.jsx
Reveal.jsx
ScrollProgress.jsx
SplashCursor.jsx
SpotlightCard.jsx
```

不要因为文件存在就把它们全部重新挂回页面。尤其不要同时启用 `SplashCursor` 和 `TargetCursor`：用户已明确反馈双重鼠标动效太重，当前方案有意只保留 `TargetCursor`。

## 5. 当前页面结构

`src/main.jsx` 中的渲染顺序为：

```text
App
├── TargetCursor
├── Hero
│   ├── LightRays
│   ├── Header
│   ├── FadeContent
│   └── CountUp
├── Work
│   ├── ScrollFloat
│   ├── FadeContent
│   └── GlareHover
├── Profile
│   ├── ScrollFloat
│   ├── FadeContent
│   └── CountUp
├── Strengths
│   ├── ScrollFloat
│   └── FadeContent
└── Contact
    └── FadeContent
```

导航锚点：

- `#home`：首页
- `#work`：精选项目
- `#profile`：关于我
- `#strengths`：个人能力
- `#contact`：联系方式

## 6. 设计规范与不可丢失的决策

### 6.1 视觉基调

- 页面最大版心约 1700 px，由 `--shell` 控制。
- 主背景接近纯黑，但不是纯黑：`#050707` / `#070909`。
- 暖白：`#f1ede5`。
- 强调红：`#ee3e35`。
- 科技蓝：`#76aaff`。
- About 与 Contact 使用暖白背景形成节奏反差。
- 边框应细、低对比，避免大量高亮描边和发光卡片。

### 6.2 字体

- 英文展示字体：Barlow Condensed。
- 中文字体：Noto Sans SC / PingFang SC 回退。
- Hero 姓名和英文大标题应保持窄体、巨幅、编辑感。
- 字体通过 Google Fonts `@import` 加载；离线时会使用系统回退字体。

### 6.3 动效职责

- `LightRays`：只承担 Hero 的环境光，不要铺满所有区块。
- `TargetCursor`：只响应 `.cursor-target` 元素。
- `ScrollFloat`：用于主要英文区块标题。
- `FadeContent`：用于区块进入视口时的节奏控制。
- `GlareHover`：仅用于项目主图。
- Hero 背景图有非常缓慢的漂移动画。
- `prefers-reduced-motion` 下必须关闭或极大缩短动画。
- 粗指针设备上隐藏自定义光标。

### 6.4 已修复的细节

- `CountUp` 会生成嵌套 `span`。Hero 数字和 Profile 数据必须使用 `strong > span { color: inherit; font: inherit; }`，否则数字会错误继承标签样式。
- Hero 的 `700万+` 必须保持一行，不能在动画过程中折行。
- `ScrollFloat` 已把普通空格转换为不换行空格，确保 `SELECTED WORK` 不会变成 `SELECTEDWORK`。不要回退该修复。

## 7. 内容真值

### 7.1 身份与联系信息

- 姓名：张瑞
- 身份：AI 产品技术运营与客户经理
- 手机：186 0936 6869
- 电话链接：`tel:+8618609366869`
- 邮箱：2256178941@qq.com
- 邮件链接：`mailto:2256178941@qq.com`
- 地理状态：Based in China / Open to opportunities

这些是用户提供的真实资料。修改、隐藏或公开更多个人信息前，应先获得用户明确要求。不要自行补充地址、身份证、学校、时间、薪资或其他未在当前页面出现的信息。

### 7.2 项目顺序与链接

1. 粤港澳大湾区架构师峰会官网
   - 产品负责人 / 独立开发者 · 2026
   - 累计承接 1,700+ 人报名
   - 链接：https://ruitcarch.cloud/
2. 腾讯 OPC 社区官方平台
   - 产品负责人 / 核心开发者 · 2026
   - 链接：https://cloud.tencent.com/opc
3. AI 战略指标管理系统
   - 产品负责人 / 主导开发者 · 2026—至今
   - 稳定服务 1,280 名教师
   - 链接：https://sism.blackevil.cn/login

页面数组中原始 `projects` 顺序与最终展示顺序不同；`Work()` 中通过：

```js
const ordered = [projects[1], projects[0], projects[2]]
```

把峰会项目设为首个 Featured 项目。若继续调整项目，建议直接把数据结构改成最终显示顺序，减少认知负担，但必须保证页面内容不发生意外变化。

### 7.3 当前量化指标

- 700万+：专项全网曝光
- 9K+：产品下载与深度使用
- 5万+：活动官网累计访问
- 100万+：Agent 专家模式调用

这些数字来自当前作品集内容。下一个 AI 不应自行优化、四舍五入或改写，除非用户提供新资料。

## 8. 视觉参考与资产来源

用户选择的第三套设计方向：

```text
/Users/raelzhang/.codex/generated_images/01a07852-f5ca-7d92-b6c6-c29d963e356d/exec-33c605ed-f517-4e93-8f38-7493022fe053.png
```

Hero 原始生成素材：

```text
/Users/raelzhang/.codex/generated_images/01a07852-f5ca-7d92-b6c6-c29d963e356d/exec-ae480397-fde3-44a0-82fe-1065eccb9004.png
```

浏览器验收截图：

```text
/tmp/zhangrui-option3-desktop-final.png
/tmp/zhangrui-option3-projects.png
/tmp/zhangrui-option3-mobile.png
/tmp/zhangrui-option3-comparison-final.png
```

注意：`/tmp` 文件可能在重启后消失，长期验收依据以 `design-qa.md`、仓库内 `qa/` 和当前页面为准。如需长期保留第三版截图，应复制到 `qa/` 并更新 `design-qa.md`。

## 9. 响应式与可访问性现状

- 桌面重点验收尺寸：1440 × 1024。
- 移动端已在 390 × 844 下检查。
- 移动端无横向溢出：`innerWidth = 390`，`scrollWidth = 390`。
- 1100 px 和 760 px 设有主要断点。
- 链接支持键盘聚焦，使用蓝色 focus outline。
- 项目图片有描述性 `alt`。
- 装饰性 Hero 图使用空 `alt`，LightRays 容器不承载内容。
- 后续如增加菜单，需要补充移动端可访问导航；当前移动端隐藏中间导航，只保留品牌和联系入口。

## 10. 工作区与版本控制注意事项

当前工作区不是干净状态，包含此前迭代形成的已修改、新增和删除文件。它们都应视为用户当前成果：

- 不要执行 `git reset --hard`、`git checkout -- .`、大范围删除或覆盖。
- 不要随意恢复已删除的 `portrait.webp`；照片是按用户要求移除的。
- `dist/` 当前包含最近构建产物，并伴随旧哈希文件删除和新哈希文件新增。
- 继续开发前先运行 `git status --short`，只修改与当前需求直接相关的文件。
- 如需清理未使用组件，应先确认用户是否希望做代码清理；不要把清理与视觉修改混在一起。

## 11. 当前已知限制

- 项目内容目前只有概览，没有独立项目详情页或弹窗。
- 项目图片已可用，但未来仍可替换成更真实、更高分辨率的项目截图。
- Header 是 Hero 内部的绝对定位导航，不是全程吸顶导航。
- Google Fonts 依赖网络；完全离线时视觉会使用回退字体。
- `LightRays` 使用 WebGL，低性能设备依赖 reduced-motion / coarse-pointer 降级，但尚未实现按帧率自动降级。
- 当前内容直接写在 `src/main.jsx`，尚未抽成 JSON、CMS 或独立数据文件。
- 还没有单元测试或端到端测试，主要依靠 Vite 构建、浏览器交互和视觉 QA。

## 12. 推荐的下一步优先级

### P1：用户下一轮最可能需要的优化

1. 收集并替换三个项目的真实高清截图。
2. 为每个项目增加详情页或展开层，补充背景、职责、方法、结果和复盘。
3. 根据用户反馈微调 Hero 动效强度、标题位置和首屏信息密度。
4. 检查全部量化指标与最新简历是否 1:1 一致。

### P2：体验完善

1. 增加移动端导航菜单。
2. 增加当前区块导航状态。
3. 为项目链接增加更明确的外链提示。
4. 优化 WebGL 低性能降级和图片预加载。

### P3：工程化

1. 把 `projects`、`capabilities` 和个人资料抽到单独数据文件。
2. 清理确认不用的旧组件与依赖。
3. 增加 Playwright smoke test。
4. 若用户明确要求，再进行正式部署和域名配置；当前仅保证本地预览。

## 13. 每次修改后的验收清单

1. 运行 `npm run build`，必须无错误。
2. 在 `http://localhost:5173/` 检查 Hero 完整显示。
3. 等数字动画结束，确认 `700万+` 单行显示。
4. 检查 `SELECTED WORK` 空格正确。
5. 鼠标悬停项目图，确认扫光和图片缩放不过度。
6. 鼠标悬停 `.cursor-target`，确认只有一种自定义光标反馈。
7. 点击所有导航锚点。
8. 点击三个项目外链时，只验证链接目标；不要在第三方页面执行提交或登录动作。
9. 在 390 px 宽度确认无横向滚动。
10. 检查控制台 warning/error。
11. 如发生视觉变化，更新 `design-qa.md` 并保存新的对比截图。

## 14. 给下一个 AI 的建议起始指令

可以把下面这段作为续开发提示词：

```text
请先完整阅读项目根目录的 PROJECT_HANDOFF.md 和 design-qa.md，再查看 git status。当前主实现位于 src/main.jsx 和 src/styles.css。保留用户选择的第三套电影感视觉方向、现有真实内容、无证件照策略，以及 TargetCursor + LightRays + ScrollFloat + FadeContent + GlareHover 的职责边界。不要恢复 SplashCursor，不要清理或覆盖用户已有改动。完成本轮需求后运行 npm run build，并在桌面端和 390px 移动端做视觉与控制台验收；若视觉发生变化，同步更新 design-qa.md。
```

## 15. 完成定义

一次后续迭代只有在以下条件同时满足时才算完成：

- 用户本轮要求已落实到代码或内容。
- 没有擅自改写真实经历、数据或个人信息。
- PC 与移动端布局均可用。
- 动效没有相互冲突，也没有明显影响内容阅读。
- `npm run build` 通过。
- 浏览器无新增警告或错误。
- 相关交接和 QA 文档已同步更新。
