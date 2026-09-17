# Design QA — Option 3 cinematic portfolio

## Latest — MagicBento FIELDWORK

- Replaced the single-slide gallery with category-filtered intrinsic-ratio masonry using the official React Bits MagicBento JS-CSS registry implementation, extended with items/renderCard.
- Kept all 62 images and 4 videos, with original aspect ratios. Desktop three columns; mobile one column.
- Build passed (5044 modules). Browser checks: first category 10 cards, second category 2 cards, modal opens, Escape closes, video controls exist, 390px viewport has 390px scroll width.
- Prior gallery auto-play instructions are superseded. No auto-play in the new layout.
- Desktop screenshot captured too early during smooth scroll and is not valid gallery visual evidence; mobile evidence: /tmp/bento-mobile.png. No new full-page visual audit or console-log audit was performed for this iteration.

## Source visual truth

- Selected direction: `/Users/raelzhang/.codex/generated_images/01a07852-f5ca-7d92-b6c6-c29d963e356d/exec-33c605ed-f517-4e93-8f38-7493022fe053.png`
- Generated hero artwork: `/Users/raelzhang/.codex/generated_images/01a07852-f5ca-7d92-b6c6-c29d963e356d/exec-ae480397-fde3-44a0-82fe-1065eccb9004.png`
- Desktop implementation: `/tmp/zhangrui-option3-desktop-final.png`
- Full comparison canvas: `/tmp/zhangrui-option3-comparison-final.png`
- Focused project-section evidence: `/tmp/zhangrui-option3-projects.png`
- Mobile evidence: `/tmp/zhangrui-option3-mobile.png`
- Reference dimensions: 1487 × 1058 px. Desktop viewport: 1440 × 1024 px at 1×. Mobile viewport: 390 × 844 px at 1×.
- Compared states: settled desktop Hero with neutral pointer; Selected Work after reveal; settled narrow mobile Hero.

## Fidelity findings

- No remaining P0, P1, or P2 issues.
- Typography: Barlow Condensed and Noto Sans SC preserve the reference's compressed editorial headline, restrained Chinese body copy, and small technical labels.
- Layout: the implementation keeps the cinematic split Hero, oversized name lockup, lower proof bar, restrained brand strip, alternating project rows, light editorial About surface, capability list, and full-screen contact close. The Hero intentionally remains a full viewport because that was part of the original portfolio brief.
- Color and atmosphere: ink black, warm ivory, signal red, and deep electric blue reproduce the selected direction without the earlier overly dark and flat feel.
- Image quality: the Hero uses a purpose-made 16:9 horizon asset; project rows use the portfolio's real project artwork rather than placeholders. The portrait remains removed as requested.
- Copy: visible profile, project titles, responsibilities, metrics, and contact information preserve Zhang Rui's portfolio content.

## Fix history

- P1 — The animated Hero impact number inherited the label typography through CountUp's nested span and wrapped as a small `633万+`. Fixed the nested selector, inherited the intended display style, added no-wrap behavior, and recaptured after animation completion. Post-fix evidence shows `700万+` on one line.
- P2 — ScrollFloat split the `SELECTED WORK` heading into characters and collapsed its space. Fixed the component to render spaces as non-breaking spaces. Post-fix project evidence shows the correct heading.

## Interaction and responsive checks

- Header navigation to the Selected Work anchor was exercised successfully.
- React Bits motion is scoped by purpose: LightRays in the Hero, ScrollFloat for the section title, FadeContent for reveal timing, GlareHover for project media, and TargetCursor for interactive targets. SplashCursor is not rendered, preventing competing cursor effects and unnecessary GPU load.
- Desktop and 390 px layouts were checked. The mobile capture reports `innerWidth: 390` and `scrollWidth: 390`, with no horizontal overflow.
- Reduced-motion styles provide a static fallback.
- Browser console after clean reload: 0 warnings, 0 errors.
- Production build: passed with Vite; 5039 modules transformed.

## Residual polish

- P3 — Authentic high-resolution screenshots can replace any current project artwork later without changing the layout.

final result: passed

## Addendum — FIELDWORK gallery (2026-09-14)

- 新增「项目现场 / FIELDWORK」区块，位于「个人能力」之后、联系方式之前（section id `field`，导航序号 04）。
- 按用户素材目录的 10 个分类建成模块：AI 课程设计、企业决策圈运营峰会沙龙活动、小红书运营 1–4、校园实验室建设、腾讯龙虾区域增长专项目、讲师分享、短片剪辑。
- 每个图片模块为大图自动轮播（约 4.5s 切换、悬停/聚焦暂停、左右箭头与圆点切换、移动端左右滑）；「短片剪辑」为视频模块，抽封面 + 点击播放，不自动播放。
- 素材经统一压缩后存放在 `public/gallery/`：62 张图转 WebP（总约 14MB，最长边 1600px），4 段视频压成 H.264 720p（各约 1.6–2.6MB）并生成海报帧。
- 新组件与数据文件：`src/gallery.js`、`src/components/FieldGallery.jsx`、`src/components/FieldGallery.css`；`src/main.jsx` 中新增 `Fieldwork` 区块并挂入 `App`。
- `prefers-reduced-motion` 下关闭自动轮播；生产构建通过（5042 模块）。

## Addendum — FIELDWORK adaptive frames (2026-09-14)

- 重新调整 `FieldGallery` 的展示方式：当前图片加载后读取原始尺寸，以真实宽高比设置画框比例，图片使用 `object-fit: contain` 完整呈现，不再使用固定 16:10 舞台或模糊铺底。
- 画框高度按视口高度设上限；横图在可用列宽内展开，方图与竖图按比例缩窄并居中，边框、箭头、圆点和说明同步跟随画框，避免裁切与大片黑边。
- Grid 第二列改为 `minmax(0, 1fr)`，避免自适应画框在中等桌面宽度下撑出页面；390px 移动端验证无横向滚动。
- 已在本地开发页验证竖图（1135×1600）、方图（1024×1024）与横图（1080×720）切换，三者均完整显示；生产构建通过。
- 修复模块切换黑屏回归：当当前模块已播放到较后序号、切换到图片数量更少的模块时，先对渲染索引做边界保护，避免短暂读取不存在的轮播项；已用 10 张图片模块切到 2 张图片模块验证通过。
