# 张瑞个人作品集｜完整 AI 开发交接文档

> 最后更新：2026-09-17  
> 当前线上版本：发布中，以本次 `main` 最新提交为准。  
> 个人站 CDN / HTTPS 已切到线上。标题层级、职位去重与高清图随本次发布上线。  
> 本文是后续 AI 的**唯一当前态说明**。`PROJECT_HANDOFF.md` 与 `HANDOFF_NEXT.md` 记录的是较早阶段的决策，内容有部分过期，只可作为历史参考。

## 1. 项目目的与内容边界

这是张瑞的个人作品集，用于向 HR、销售负责人、售前/FDE 负责人展示以下能力：

- 业务拓展与商业转化：WorkBuddy 区域增长、企业线索、采购转化。
- 技术产品与解决方案：业务系统、AI Agent、MCP、AI Skill、全栈交付。
- 内容运营与用户增长：官方直播、公众号、腾讯频道、OpenTenBase 开发者增长。

页面所有人物履历、数据、项目链接均应以用户后续明确提供的信息为准。不要自行增加学校、住址、身份证、薪资、账号凭据或未经确认的项目成果。

## 2. 当前线上入口

| 项目 | 地址 | 说明 |
| --- | --- | --- |
| 正式网站 | https://raelzhang.ruitcarch.cloud/ | 当前生产环境，HTTPS 正常 |
| GitHub 仓库 | https://github.com/zrzqbr/raelzhang-portfolio | `main` 为生产源分支 |
| 本地开发 | http://localhost:5173/ | Vite 开发服务器 |
| 原峰会站 | https://ruitcarch.cloud/ | 独立站点，**不得改动** |

个人站 CDN 已接入（2026-09-17）：

- 加速域名 `raelzhang.ruitcarch.cloud`：腾讯云 CDN，网页小文件 / 中国境内 / 自有源 `150.158.77.134` / 回源 HOST 为该子域名 / HTTPS 回源。
- DNSPod `raelzhang` 已改为 CNAME `raelzhang.ruitcarch.cloud.cdn.dnsv1.com`（TTL 600）。不要改回 A 记录，除非用户明确要求下线 CDN。
- CDN HTTPS 证书：`arrGMpqA`，已部署成功，到期 2026-12-16。源站仍保留 Let's Encrypt / Certbot。
- 已开启：HTTPS 服务、HTTP/2、强制 HTTP→HTTPS（302）。未开 QUIC。日累计流量封顶 5GB。
- 不要改峰会站 `ruitcarch.cloud` / `www.ruitcarch.cloud` 的 CDN 或 DNS。

## 3. 本地项目位置与启动方式

项目绝对路径：

```text
/Users/raelzhang/Documents/Codex/2026-09-07/6-codex-skill-codex-workflow-github/outputs/zhangrui-portfolio
```

常用命令：

```bash
npm install
npm run dev
npm run build
npm run preview
```

`npm run build` 是发布前必须执行的检查。`dist/` 为构建产物，已在 `.gitignore` 中排除，不应提交到 Git。

## 4. Git / GitHub 状态

```text
远程名称：origin
远程地址：git@github.com:zrzqbr/raelzhang-portfolio.git
默认分支：main
当前提交：ab7bcdde68857dd060aeb4f5a6e041cf7db53b59
```

关键提交记录：

```text
ab7bcdd Optimize media loading and gallery performance
301bcff Complete portfolio and prepare production deployment
a3880ce Add React Bits inspired motion system
bb29f50 Build initial personal portfolio
```

日常提交建议：

```bash
git status --short
git add -A
git commit -m "Describe the user-requested change"
git push origin main
```

不要执行 `git reset --hard`、`git checkout -- .`、强制推送或批量清理素材。该仓库包含大量用户提供的原始展示素材，删除前要先确认具体目标。

## 5. 技术栈

- React 19 + Vite 8，JavaScript 与普通 CSS。
- `@phosphor-icons/react`：图标。
- GSAP / Motion：入场和滚动动效。
- OGL：`LightRays` Hero 环境光。
- 本地化 React Bits 风格组件：`TargetCursor`、`MagicBento`、`FadeContent`、`GlareHover`、`ScrollFloat`。

不要同时启用 `TargetCursor` 与 `SplashCursor`。用户认为双鼠标动效过重；当前只保留 TargetCursor。

## 6. 当前页面结构

渲染顺序见 `src/main.jsx`：

```text
App
├── TargetCursor
├── Hero（姓名、三项核心能力、项目现场速览）
├── CareerIndex（01 实习经历）
├── Work（02 精选项目）
├── Fieldwork（03 项目现场）
├── Engineering（04 从业务系统到开源能力）
└── Contact（联系方式）
```

页面锚点：

```text
#home        首页
#experience  实习经历
#work        精选项目
#field       项目现场
#engineering 开源能力
```

当前对外联系方式：

```text
姓名：张瑞
邮箱：2256178941@qq.com
电话：186 0936 6869
GitHub：https://github.com/zrzqbr
```

不要在网站中增加身份证号码、详细地址、微信号或账号密码。

## 7. 关键文件地图

| 文件 | 职责 |
| --- | --- |
| `src/main.jsx` | 页面结构、Hero 三块文案、实习经历、精选项目、工程项目、联系方式 |
| `src/styles.css` | 全局视觉、布局、响应式、全局动效与 `content-visibility` 性能策略 |
| `src/gallery.js` | 项目现场分类、素材路径、缩略图与视频海报映射 |
| `src/components/FieldGallery.jsx` | MagicBento 照片墙、分类切换、图片/视频 Dialog 预览 |
| `src/components/FieldGallery.css` | 项目现场照片墙布局与移动端规则 |
| `src/components/MagicBento.*` | 图片卡片的聚光、边框、倾斜与磁吸互动 |
| `src/components/LightRays.*` | Hero 光线效果 |
| `src/components/TargetCursor.*` | 自定义目标光标 |
| `public/gallery/` | 高清原图与视频；仅用户点击预览时加载原图/视频 |
| `public/gallery-thumbs/` | 1440px 缩略图；用于照片墙与首屏轮播 |
| `public/hero-horizon.webp` | 已优化的 Hero 背景图 |
| `public/project-*-live.webp` | 精选项目与工程项目配图 |
| `design-qa.md` | 较早阶段验收历史，不是最新部署说明 |

## 8. 视觉与内容红线

- 风格：暗色、克制、电影感、编辑感；避免把页面改成常见 SaaS 渐变卡片模板。
- 主色：黑色背景、暖白正文、信号红强调、少量科技蓝。
- 无证件照，禁止未经用户同意重新加人像或头像。
- 标题层级：姓名 > 中文章节 > 实习职位 > 单个项目 > 正文。英文章节名只作小标注。正文可略放大，但不得超过上一层标题。
- 「腾讯 CSIG · AI 产品技术运营」只出现两次：首屏一次，实习经历第一段一次。项目卡不要再重复职位。
- 桌面版心约 1700px；必须同时检查桌面和移动端。
- 图片应按比例展示；缩略图可裁切，但 Dialog 必须显示完整高清图。
- 所有新增交互需支持 `prefers-reduced-motion`，移动端不要依赖悬停。

## 9. 素材与性能策略（2026-09-17 已实施）

问题背景：原素材中有大量 1–1.7MB 的海报和项目图，首屏轮播曾把两组所有图片都设为 eager，导致渲染与下载明显变慢。

已完成的优化：

1. 图库高清图重新压缩：约 `63.4MB → 31.2MB`。
2. 新增 `public/gallery-thumbs/`：缩略图用于列表和轮播。2026-09-17 已从桌面原图重出，最长边改为 **1440px**，避免 Retina 照片墙发糊。
3. Hero 背景从 PNG 改为 WebP：约 `1.56MB → 48KB`。
4. 首屏轮播仅优先加载前两张；其余使用 `loading="lazy"`、`decoding="async"` 与低优先级。
5. 项目图、实习图、工程图均为延迟加载。
6. 视频不在列表预加载；用户点开预览后才加载 MP4，列表只加载海报缩略图。
7. 非首屏 `.section` 使用 `content-visibility: auto`，减少首屏布局与绘制压力。
8. 生产 Nginx 为图片和视频设置 7 天浏览器缓存；构建后的 `/assets/` 设置 30 天不可变缓存。

已验证的生产首屏：

```text
总传输约 1MB
媒体传输约 0.75MB
Hero 使用 /hero-horizon.webp
桌面端无横向溢出
```

继续开发时：

- 照片墙卡片请使用 `item.thumb`，不要改回 `item.src`。
- Dialog 图片使用 `item.src`，视频使用 `item.src` + `item.poster`。
- 新增素材时必须同时生成对应缩略图（最长边 1440px，不要再压回 720px），并更新 `src/gallery.js`。
- 从桌面原图重出时不要放大：原图只有 1024 就保持 1024。原图很大时全图最长边不超过 2560。
- 不要把视频改为自动播放或首屏预加载。

## 10. 服务器与网络信息

| 项目 | 当前信息 |
| --- | --- |
| 云厂商 | 腾讯云轻量应用服务器 Lighthouse |
| 实例 ID | `lhins-eqnwz6ci` |
| 实例名 | 宝塔Linux面板-XDIQ |
| 地域 | 上海二区（控制台 `rid=4`） |
| 公网 IPv4 | `150.158.77.134` |
| 操作系统 | OpenCloudOS 9 |
| Web 服务器 | Nginx 1.26.3 |
| 个人站发布根目录 | `/srv/raelzhang` |
| 当前个人站软链接 | `/srv/raelzhang/current` |
| 当前线上 release | `/srv/raelzhang/releases/ab7bcdd` |
| 原峰会站根目录 | `/srv/tcarch/current`，严禁改动 |
| Nginx 站点配置 | `/etc/nginx/conf.d/raelzhang.conf` |
| TLS 证书 | `/etc/letsencrypt/live/raelzhang.ruitcarch.cloud/` |

访问权限模型：

- SSH 别名：`myserver`；当前部署用户为 `txa_deployer`。
- 该 SSH 用户不能直接改 `/etc/nginx` 或 `/srv/raelzhang` 的发布软链接。
- 需要 root 的操作通过腾讯云控制台的“轻量应用服务器 → 宝塔Linux面板-XDIQ → 执行命令”完成；控制台执行命令默认 root。
- 绝不把 root 密码、SSH 私钥、GitHub Token、控制台 Cookie 或任何登录凭据写入仓库或交接文档。

## 11. DNS、HTTPS 与缓存配置

DNSPod：

```text
根域名：ruitcarch.cloud
主机记录：raelzhang
类型：CNAME
记录值：raelzhang.ruitcarch.cloud.cdn.dnsv1.com
TTL：600
备注：张瑞个人作品集
```

证书：

```text
边缘（CDN）：arrGMpqA，腾讯云托管，到期 2026-12-16
源站（Nginx）：Let's Encrypt / Certbot，路径 /etc/letsencrypt/live/raelzhang.ruitcarch.cloud/，到期 2026-12-16，已设自动续期
```

Nginx 行为：

- `http://raelzhang.ruitcarch.cloud` 301 跳转至 HTTPS。
- HTTPS 静态根目录为 `/srv/raelzhang/current`。
- SPA 路由回退：`try_files $uri $uri/ /index.html`。
- `/assets/`：30 天、`public, immutable`。
- 图片与视频：7 天、`public`。

不要改动 `tcarch.conf`、`tencent-channel.conf` 或它们的 SSL 配置；个人站只维护 `raelzhang.conf`。

## 12. 后续发布流程

### A. 本地构建与 Git 提交

```bash
npm run build
git status --short
git add -A
git commit -m "Describe change"
git push origin main
git rev-parse --short HEAD
```

将最后的短提交号称为 `<release>`。不要使用未提交的工作区内容作为正式发布版本。

### B. 上传构建产物到服务器临时目录

```bash
ssh myserver 'mkdir -p /tmp/raelzhang-<release>'
rsync -az --delete dist/ myserver:/tmp/raelzhang-<release>/
ssh myserver 'test -f /tmp/raelzhang-<release>/index.html && du -sh /tmp/raelzhang-<release>'
```

### C. 在腾讯云控制台原子发布

进入“执行命令”，以 root 执行。替换 `<release>` 后：

```bash
set -euo pipefail
release=<release>
install -d -m 755 /srv/raelzhang/releases
if [ ! -d /srv/raelzhang/releases/$release ]; then
  mv /tmp/raelzhang-$release /srv/raelzhang/releases/$release
fi
chown -R root:root /srv/raelzhang/releases/$release
find /srv/raelzhang/releases/$release -type d -exec chmod 755 {} +
find /srv/raelzhang/releases/$release -type f -exec chmod 644 {} +
ln -sfn /srv/raelzhang/releases/$release /srv/raelzhang/current
/usr/sbin/nginx -t
systemctl reload nginx
readlink -f /srv/raelzhang/current
```

说明：新文件完整上传到临时目录后才移动进 release，并通过软链接切换，因此不会出现半上传状态。若 Nginx 检查失败，立即停止，不要 reload。

### D. 发布验收

```bash
curl --noproxy '*' -I https://raelzhang.ruitcarch.cloud/
curl --noproxy '*' -I https://raelzhang.ruitcarch.cloud/hero-horizon.webp
git ls-remote origin refs/heads/main
```

浏览器至少检查：

- 首页、实习经历、精选项目、项目现场、工程能力和联系方式都能打开。
- 项目现场切换分类正常，图片可以放大，视频可手动播放。
- 移动端无横向滚动。
- 控制台无新增报错。

## 13. 回滚方式

先查看已有版本：

```bash
ssh myserver 'find /srv/raelzhang/releases -mindepth 1 -maxdepth 1 -type d -printf "%f\n" | sort'
```

然后只在腾讯云 root “执行命令”中切回指定、已经验证存在的 release：

```bash
set -euo pipefail
target=301bcff
test -f /srv/raelzhang/releases/$target/index.html
ln -sfn /srv/raelzhang/releases/$target /srv/raelzhang/current
/usr/sbin/nginx -t
systemctl reload nginx
```

不要删除 release，除非用户明确要求并确认保留版本范围。

## 14. 待续开发注意事项

1. 用户持续迭代文案与项目照片。改文字前优先让用户确认“最终文字版本”，再修改页面。
2. 用户非常在意：字体字号、模块间距、照片比例、首屏信息层级、移动端适配。
3. 用户不喜欢冗长、内部汇报式文案；作品集应让外部招聘者一眼看懂项目、角色、成果。
4. 项目现场是已完成的 MagicBento 照片墙，不要未经要求改回多套混杂轮播。
5. 所有公开项目链接均可能要求登录；站点只展示公开链接，不要把后台密码、管理地址或真实报名数据写入网页或仓库。
6. 个人站 CDN 已上线。发布新版本后如静态资源未更新，到腾讯云 CDN 刷新对应 URL；不要改峰会站 CDN。源站证书继续用 Certbot 续期，边缘证书 `arrGMpqA` 到期前在 SSL 控制台续期并重新部署到该 CDN 域名。

## 15. 交接启动清单

下一个 AI 开始工作时按以下顺序执行：

1. 阅读本文，再读 `src/main.jsx`、`src/gallery.js`、`src/styles.css`。
2. 执行 `git status --short`；确认是否有用户未提交的改动。
3. 执行 `npm run build`；不要直接从记忆修改页面。
4. 在本地确认改动后再提交并推送 GitHub。
5. 只有用户要求发布时，严格按第 12 节发布；绝不触碰 `/srv/tcarch`。
