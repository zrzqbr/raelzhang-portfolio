import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { ArrowLeft, ArrowRight, ArrowUpRight, ChatCircleDots, EnvelopeSimple, GithubLogo, Phone } from '@phosphor-icons/react'
import FadeContent from './components/FadeContent'
import FieldGallery from './components/FieldGallery'
import GlareHover from './components/GlareHover'
import LightRays from './components/LightRays'
import MediaLightbox from './components/MediaLightbox'
import TargetCursor from './components/TargetCursor'
import './styles.css'

const fullFromThumb = src => src.replace('/gallery-thumbs/', '/gallery/')
const shots = (folder, names, alt) => names.map(name => ({
  src: `/gallery/${folder}/${name}`,
  thumb: `/gallery-thumbs/${folder}/${name}`,
  alt,
}))

const projects = [
  {
    index: '01',
    title: '腾讯 OPC 社区官方平台',
    meta: '产品负责人 / 核心开发者 · 2026',
    copy: '从业务需求、角色与激励机制出发，搭建园区榜单、OPC 价值榜、专家咨询与积分体系，让社区服务从人工协同走向产品化运营。',
    image: '/project-opc-live.webp',
    tag: 'COMMUNITY / PRODUCT',
    href: 'https://cloud.tencent.com/opc',
    domain: 'cloud.tencent.com/opc',
    stats: [['3 类', '核心角色'], ['4 大', '产品模块'], ['10 城', '线上线下联动']],
  },
  {
    index: '02',
    title: '2026腾讯云粤港澳大湾区架构师峰会官网',
    meta: '产品负责人 / 独立开发者 · 2026',
    copy: '将报名入口升级为品牌官网与数字化会务系统，打通报名、通知、签到与数据复盘，累计承接 1,700+ 人报名。',
    image: '/project-summit-live.webp',
    tag: 'EVENT / GROWTH',
    href: 'https://ruitcarch.cloud/',
    domain: 'ruitcarch.cloud',
    stats: [['1,700+', '真实报名'], ['5 万+', '官网访问'], ['35%', '报名量提升']],
  },
  {
    index: '03',
    title: 'AI 战略指标管理系统',
    meta: '产品负责人 / 主导开发者 · 2026—至今',
    copy: '深入两校区 8 个学院完成需求调研，将 AI 填报、自动预警与 RAG 问数融入管理流程，稳定服务 1,280 名教师。',
    image: '/project-ai-live.webp',
    tag: 'AI / RAG / WORKFLOW',
    href: 'https://sism.blackevil.cn/login',
    domain: 'sism.blackevil.cn',
    stats: [['1,280', '服务教师'], ['30%', '查询提速'], ['10 万', '合作资金']],
  },
  {
    index: '04',
    title: '腾讯云架构师技术同盟圈层运营系统',
    meta: '产品设计 / 圈层运营 · 2026—至今',
    copy: '围绕约 2,000 名企业架构师建立统一成员档案与分层运营体系，连接内容策略、活动参与、贡献积分与后台管控。在成员授权及合规边界内，对社群业务讨论进行关键词、主题与活跃度分析，识别技术关注、合作需求和运营信号，辅助制定文章选题、专家共创与圈层触达策略。',
    image: '/project-architect-ops-redacted.webp',
    tag: 'COMMUNITY OPS / CRM',
    href: 'https://txalliance.cn/login?next=%2Fadmin%2Fai',
    domain: 'txalliance.cn · AI 数据助手',
    stats: [['2,000+', '架构师档案'], ['积分制', '贡献激励'], ['全周期', '后台管控']],
  },
]

const engineeringProjects = [
  {
    step: '01',
    label: 'REAL BUSINESS SYSTEM',
    title: '峰会官网及运营后台',
    copy: '覆盖品牌官网、活动报名、短信验证、渠道追踪、数据统计、导出与运营后台，形成从需求拆解到线上交付的完整业务系统。后台涉及真实报名数据，仅展示能力，不公开访问凭证。',
    image: '/project-summit-live.webp',
    href: 'https://ruitcarch.cloud/',
    cta: '访问项目官网',
    proof: ['实际业务运行', '全栈交付', '数据化运营'],
  },
  {
    step: '02',
    label: 'AI AGENT TOOLING',
    title: 'SummitFlow MCP',
    copy: '把报名统计、论坛与渠道分析、网站健康检查、代码审查、质量检查、Git 提交及受控发布，封装成 AI Agent 可直接调用的工具，并加入权限控制与操作审计。',
    image: '/project-summitflow.webp',
    href: 'https://github.com/zrzqbr/summitflow-mcp-demo',
    cta: '查看 GitHub 项目',
    proof: ['MCP Server', '权限控制', '操作审计'],
  },
  {
    step: '03',
    label: 'CONTENT DELIVERY',
    title: '长图报告生成 Skill',
    copy: '将项目汇报、活动复盘和数据报告的长图生产流程沉淀为可复用 AI Skill，并通过行宽校验、像素越界扫描、异常输入测试与视觉衔接检测完成交付前自检。',
    image: '/project-longform.webp',
    href: 'https://github.com/zrzqbr/longform-report-skill',
    cta: '查看 GitHub 项目',
    proof: ['参数化生成', '12 组异常测试', '四层交付自检'],
  },
]

const experiences = [
  {
    index: '01',
    period: '2026.03—至今',
    organization: '腾讯 CSIG',
    role: 'AI 产品技术运营',
    type: 'INTERNSHIP / AI PRODUCT GROWTH',
    summary: '围绕 WorkBuddy、QClaw 等 AI 产品，负责区域拓展、客户技术赋能、内容增长及企业技术圈层运营，推动产品从用户体验走向企业采购与规模化应用。',
    tags: ['区域增长', '客户技术赋能', '企业专家圈层', '内容与直播'],
    results: [
      ['10 城 · 1.1万+', '区域用户覆盖'],
      ['9K+', '下载或深度体验'],
      ['500+', '政企采购线索'],
      ['50 万元', '单笔企业订单'],
      ['2 个月', '公众号 5K → 1.4 万'],
    ],
  },
  {
    index: '02',
    period: '2025.07—2025.12',
    organization: '腾讯云',
    role: '数据库产品运营',
    type: 'INTERNSHIP / DEVELOPER ECOSYSTEM',
    summary: '围绕 TDSQL 与 OpenTenBase，负责技术内容建设、开发者增长、企业客户 PoC 验证及国产数据库产品准入支持。',
    tags: ['OpenTenBase', '开发者增长', 'PoC 验证', '国测申报'],
    results: [
      ['3 个月', 'GitHub Star +450'],
      ['10 万+', '教程阅读量'],
      ['10+ 场', '技术活动'],
      ['1,000+', '开发者与企业用户'],
      ['30+ 份', '技术文档优化'],
    ],
  },
]

const heroHighlights = [
  {
    index: '01',
    title: '业务拓展与商业转化',
    product: 'WorkBuddy 区域增长',
    points: ['覆盖10城、1.1万+用户', '沉淀500+政企采购线索', '支撑50万元订单，技术培训转化10万元+'],
  },
  {
    index: '02',
    title: '技术产品与解决方案',
    product: '业务系统 · AI Agent · MCP · AI Skill',
    points: ['业务需求转化为产品方案', '完成全栈开发与Agent落地', '交付MCP工具及可复用AI Skill'],
  },
  {
    index: '03',
    title: '内容运营与用户增长',
    product: 'WorkBuddy · 腾讯云AI社区 · OpenTenBase',
    points: ['直播场均5.6万+，累计增粉2万+', '产品频道从0增长至5000+', '公众号5千→1.4万，GitHub Star +450'],
  },
]

const heroPreview = [
  ['/gallery-thumbs/instructor-featured/01.jpg', '对外技术分享'],
  ['/gallery-thumbs/instructor/01.webp', '对外技术分享'],
  ['/gallery-thumbs/instructor/02.webp', '对外技术分享'],
  ['/gallery-thumbs/summit-salon/01.webp', '企业决策圈层运营'],
  ['/gallery-thumbs/video/poster-01.jpg', '企业决策圈层运营'],
  ['/gallery-thumbs/honors/03.jpg', '个人荣誉'],
  ['/gallery-thumbs/honors/02.jpg', '个人荣誉'],
  ['/gallery-thumbs/ai-practice/01.jpg', 'AI实践项目设计'],
  ['/gallery-thumbs/ai-skills/01.jpg', 'AI实践项目设计'],
]

const internshipStories = [
  {
    index: '01',
    company: '腾讯 CSIG · AI产品技术运营',
    period: '2026.03—至今',
    product: 'WorkBuddy',
    title: 'WorkBuddy 区域增长与商业转化',
    summary: '以腾讯龙虾区域增长专项为获客入口，负责城市项目交付、客户线索沉淀及企业采购转化。',
    points: ['策划并交付10场WorkBuddy产品体验活动，覆盖全国10城、1.1万+用户，推动9K+用户下载或深度体验', '在杭州等城市独立担任项目PM，协同腾讯云合作伙伴完成客户触达、产品演示和项目交付，沉淀500+政企采购线索，潜在采购意向规模达5亿元', '协同直销、KA及渠道团队推进需求确认、产品试用和商务跟进，支撑单笔50万元企业订单交付，并推动全国首个WorkBuddy OPC社区成立'],
    metrics: [['9K+', '下载或深度体验'], ['500+', '政企采购线索'], ['50万元', '企业订单']],
    images: shots('tencent-growth', ['09.webp', '02.webp', '03.webp', '04.webp', '05.webp', '06.webp'], '腾讯龙虾区域增长专项活动现场'),
  },
  {
    index: '02',
    company: '腾讯 CSIG · AI产品技术运营',
    period: '2026',
    product: 'WorkBuddy / QClaw',
    title: '客户技术赋能与产品验证',
    summary: '围绕客户从产品认知、场景验证到采购决策的关键节点，通过技术培训、行业分享和Agent场景建设推动产品落地。',
    points: ['担任华东师范研究院OPC训练营WorkBuddy技术讲师，通过产品讲解、场景配置和实操演示，推动培训需求转化为10万元企业采购订单', '受邀参加GOPS全球运维大会等行业活动，围绕QClaw、WorkBuddy及Agent应用场景开展技术分享，带动200+企业用户下载试用', '针对内容创作、视频剪辑和资料管理等需求，上线6项Agent专家模式，累计调用100万+次；结合用户反馈推动WorkBuddy“资料库”等功能迭代'],
    metrics: [['10万元', '培训转化采购'], ['200+', '下载试用'], ['100万+', 'Agent累计调用']],
    images: [
      ...shots('instructor', ['04.webp', '01.webp'], '技术分享与客户赋能现场'),
      ...shots('instructor-featured', ['01.jpg'], '对外技术分享海报'),
    ],
  },
  {
    index: '03',
    company: '腾讯 CSIG · AI产品技术运营',
    period: '2026',
    product: 'WorkBuddy / 腾讯云AI社区',
    title: '内容矩阵与用户增长',
    summary: '围绕产品功能、应用场景和客户案例，建设公众号、腾讯频道及官方直播协同的内容增长体系。',
    points: ['负责腾讯云AI社区公众号选题策划和内容运营，围绕产品功能、实操教程及客户案例产出30+篇内容，两个月内推动公众号关注量由5千增长至1.4万', '从0搭建WorkBuddy腾讯频道，持续沉淀产品教程、功能解读和场景案例，推动频道成员增长至3千+，形成可持续触达用户的官方内容阵地', '兼任WorkBuddy官方技术主播，完成5场产品直播，通过功能演示、场景拆解和实时答疑帮助用户理解产品价值，场均观看5.6万+，累计新增粉丝2万+'],
    metrics: [['5.6万+', '直播场均观看'], ['2万+', '直播累计增粉'], ['30+篇', 'AI产品文章']],
    images: shots('tencent-growth', ['01.webp', '07.webp', '08.webp', '10.webp', '11.webp'], '腾讯云AI内容传播与活动现场'),
  },
  {
    index: '04',
    company: '腾讯 CSIG · 企业技术专家运营',
    period: '2026',
    product: '腾讯云TVP / 腾讯云架构师技术同盟',
    title: '企业技术决策圈层运营',
    summary: '面向企业架构师和技术决策者，建立从技术活动、私域连接到成员沉淀和客户经营的圈层运营链路。',
    points: ['策划并落地18场技术沙龙、峰会及行业交流活动，通过线上私域连接深圳、成都、长沙等地区1000+名企业架构师和技术决策者，推动100+人进入核心技术圈层', '协同FDE、产品、研发及行业专家策划10场技术议题，将产品能力、行业趋势和企业实践转化为面向技术决策者的专业内容，持续强化用户关系与品牌影响力', '搭建峰会报名门户与专家运营后台，打通渠道归因、成员建档、签到核销和复盘分析，形成企业技术活动全流程数字化运营能力；累计沉淀1700+用户报名及参会数据，报名规模较过往同类活动提升35%，为销售侧客户分层和持续经营提供数据支撑'],
    metrics: [['18场', '线下技术活动'], ['1,000+', '技术决策者'], ['1,700+', '活动报名']],
    images: [
      ...shots('summit-salon', ['01.webp', '02.webp'], '腾讯云架构师技术圈层活动现场'),
      ...shots('video', ['poster-01.jpg', 'poster-02.jpg', 'poster-03.jpg', 'poster-04.jpg'], '腾讯云架构师技术圈层活动现场'),
    ],
  },
  {
    index: '01',
    company: '腾讯云 · 数据库产品运营',
    period: '2025.07—2025.12',
    product: 'OpenTenBase / TDSQL',
    title: '技术内容与开发者增长',
    summary: '针对数据库产品理解门槛高、部署资料分散的问题，建设开发者内容和自助检索体系。',
    points: ['策划版本解读、部署教程、客户案例和兼容适配内容，搭建技术专区及RAG知识库，为开发者和销售、售前提供可复用资料', '联合高校教师共建数据库教材，拓展校园开发者触达渠道；三个月内推动GitHub Star增长450+、教程阅读量达到10万+', '从社区及内容反馈中沉淀20项产品建议，推动优化30+份技术文档，为产品迭代和客户沟通提供支持'],
    metrics: [['+450', '3个月GitHub Star'], ['10万+', '教程阅读量'], ['30+份', '技术文档优化']],
    images: shots('instructor', ['02.webp', '07.webp', '08.webp'], 'OpenTenBase开发者活动现场'),
  },
  {
    index: '02',
    company: '腾讯云 · 数据库产品运营',
    period: '2025.07—2025.12',
    product: 'OpenTenBase / TDSQL',
    title: '客户PoC与项目推进',
    summary: '通过技术活动获取企业线索，并结合客户业务场景协同研发推进产品验证和部署。',
    points: ['依托开放原子大会、城市行及年度峰会等10+场活动，触达1000+名开发者和企业用户，完成线索收集、需求识别及分层跟进', '协同研发完成源码编译、多节点集群部署、兼容适配和性能压测，将客户需求转化为可验证的PoC方案', '对接四川银行国产数据库替代需求，参与技术验证、适配评估和方案沟通，推动产品由试用验证进入项目落地阶段'],
    metrics: [['10+场', '技术活动'], ['1,000+', '用户触达'], ['企业级', 'PoC验证']],
    images: shots('instructor', ['03.webp', '05.webp', '06.webp'], 'OpenTenBase客户技术验证与项目交流'),
  },
]

function Header() {
  return (
    <header className="site-header shell">
      <a className="brand cursor-target" href="#home" aria-label="返回首页"><b>ZR</b><span>张瑞</span></a>
      <nav aria-label="主导航">
        <a className="cursor-target" href="#experience">实习经历</a>
        <a className="cursor-target" href="#work">项目作品</a>
        <a className="cursor-target" href="#field">项目现场</a>
        <a className="cursor-target" href="#engineering">开源项目</a>
      </nav>
    </header>
  )
}

function PreviewRail({ items }) {
  const railRef = useRef(null)
  const pausedRef = useRef(false)
  const hoverRef = useRef(false)
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0, moved: false })
  const [preview, setPreview] = useState(null)

  const moveRail = direction => {
    const rail = railRef.current
    if (!rail) return
    const half = rail.scrollWidth / 2
    const distance = Math.min(420, rail.clientWidth * 0.72)
    if (direction < 0 && rail.scrollLeft < distance) rail.scrollLeft = half
    if (direction > 0 && rail.scrollLeft + distance >= half) {
      rail.scrollTo({ left: 0, behavior: 'smooth' })
      return
    }
    rail.scrollBy({ left: direction * distance, behavior: 'smooth' })
  }

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return undefined
    const start = event => {
      if (event.button !== 0) return
      pausedRef.current = true
      dragRef.current = { active: true, startX: event.clientX, startScroll: rail.scrollLeft, moved: false }
      rail.classList.add('dragging')
    }
    const move = event => {
      const drag = dragRef.current
      if (!drag.active) return
      const delta = event.clientX - drag.startX
      if (Math.abs(delta) > 4) drag.moved = true
      rail.scrollLeft = drag.startScroll - delta
      event.preventDefault()
    }
    const stop = () => {
      if (!dragRef.current.active) return
      dragRef.current.active = false
      rail.classList.remove('dragging')
      pausedRef.current = hoverRef.current
    }
    rail.addEventListener('pointerdown', start)
    window.addEventListener('pointermove', move, { passive: false })
    window.addEventListener('pointerup', stop)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame
    let previousTime = performance.now()
    const autoplay = currentTime => {
      const elapsed = Math.min(currentTime - previousTime, 40)
      previousTime = currentTime
      if (!pausedRef.current) {
        const half = rail.scrollWidth / 2
        const speed = half / 24000
        rail.scrollLeft += speed * elapsed
        if (rail.scrollLeft >= half) rail.scrollLeft -= half
      }
      frame = window.requestAnimationFrame(autoplay)
    }
    if (!reducedMotion) frame = window.requestAnimationFrame(autoplay)
    return () => {
      rail.removeEventListener('pointerdown', start)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', stop)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])
  const openPreview = (src, label) => {
    if (dragRef.current.moved) return
    pausedRef.current = true
    setPreview({ src: fullFromThumb(src), label, alt: label })
  }
  const renderSequence = (copy, prioritize = false) => <div className="hero-preview-sequence">{items.map(([src, label], index) => <button type="button" className="hero-preview-card cursor-target" key={`${copy}-${src}-${index}`} onClick={() => openPreview(src, label)}>
    <img src={src} alt={label} loading={prioritize && index < 2 ? 'eager' : 'lazy'} fetchPriority={prioritize && index < 2 ? 'high' : 'low'} decoding="async" draggable="false" />
    <span>{label}</span>
  </button>)}</div>
  return <>
    <div className="hero-preview-head"><span>项目现场速览</span><div><small>拖动浏览 · 点击放大</small><button type="button" onClick={() => moveRail(-1)} aria-label="向左浏览"><ArrowLeft size={17} /></button><button type="button" onClick={() => moveRail(1)} aria-label="向右浏览"><ArrowRight size={17} /></button></div></div>
    <div ref={railRef} className="hero-preview-rail" onMouseEnter={() => { hoverRef.current = true; pausedRef.current = true }} onMouseLeave={() => { hoverRef.current = false; if (!dragRef.current.active) pausedRef.current = false }} onClickCapture={event => { if (dragRef.current.moved) { event.preventDefault(); event.stopPropagation(); dragRef.current.moved = false } }}>
      <div className="hero-preview-track">{renderSequence('primary', true)}{renderSequence('duplicate')}</div>
    </div>
    <MediaLightbox item={preview} onClose={() => { setPreview(null); pausedRef.current = hoverRef.current }} />
  </>
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-visual" aria-hidden="true">
        <img src="/hero-horizon.webp" alt="" loading="eager" fetchPriority="high" decoding="async" />
        <LightRays raysOrigin="top-right" raysColor="#6da9ff" raysSpeed={0.28} lightSpread={0.62} rayLength={1.35} fadeDistance={1.05} saturation={0.72} followMouse mouseInfluence={0.035} noiseAmount={0.02} distortion={0.015} className="hero-rays" />
      </div>
      <Header />
      <div className="hero-inner shell">
        <div className="hero-layout">
          <FadeContent className="hero-copy" duration={0.9} blur>
            <p className="eyebrow">PORTFOLIO / 2026</p>
            <h1><span>张</span><em>瑞</em></h1>
            <h2>业务拓展 · 技术产品 · 内容增长</h2>
            <div className="hero-roles" aria-label="核心实习经历">
              <span><b>2026—至今</b>腾讯 CSIG · AI 产品技术运营</span>
              <span><b>2025</b>腾讯云 · 数据库产品运营</span>
            </div>
          </FadeContent>
          <FadeContent className="hero-highlights" duration={0.8} delay={0.12}>
            {heroHighlights.map(item => <article className="hero-highlight" key={item.index}>
              <h3><span>{item.index}</span>{item.title}</h3>
              <p>{item.product}</p>
              <ul>{item.points.map(point => <li key={point}>{point}</li>)}</ul>
            </article>)}
          </FadeContent>
          <FadeContent className="hero-preview" duration={0.8} delay={0.18}>
            <PreviewRail items={heroPreview} />
          </FadeContent>
        </div>
      </div>
    </section>
  )
}

function SectionHeading({ index, title, subtitle }) {
  return (
    <div className="section-heading">
      <p><span>{index}</span>{title}</p>
      <h2>{subtitle}</h2>
    </div>
  )
}

function ProjectCard({ project, featured = false }) {
  return (
    <FadeContent className={`project-row ${featured ? 'featured' : ''}`} blur duration={0.85} threshold={0.16}>
      <div className="project-copy">
        <p className="project-label"><span>{project.index}</span>{project.tag}</p>
        <h3>{project.title}</h3>
        <p className="project-meta">{project.meta}</p>
        <p className="project-description">{project.copy}</p>
        <div className="project-stats">{project.stats.map(([value, label]) => <span key={label}><b>{value}</b>{label}</span>)}</div>
        <a className="project-link cursor-target" href={project.href} target="_blank" rel="noreferrer">
          <span><small>访问项目官网</small>{project.domain}</span><ArrowUpRight size={17} weight="light" />
        </a>
      </div>
      <a className="project-visual cursor-target" href={project.href} target="_blank" rel="noreferrer" aria-label={`查看${project.title}`}>
        <GlareHover width="100%" height="100%" background="#090c0f" borderRadius="0" borderColor="rgba(255,255,255,.08)" glareColor="#8bbcff" glareOpacity={0.2} glareAngle={-35} glareSize={220} transitionDuration={900}>
          <img src={project.image} alt={`${project.title}项目视觉`} loading="lazy" fetchPriority="low" decoding="async" />
          <span className="project-view">VIEW / {project.index}</span>
        </GlareHover>
      </a>
    </FadeContent>
  )
}

function Work() {
  const ordered = [projects[0], projects[1], projects[3], projects[2]]
  return <section className="work section" id="work"><div className="shell"><SectionHeading index="02" title="SELECTED WORK" subtitle="精选项目" /><div className="project-list">{ordered.map((project, index) => <ProjectCard key={project.index} project={project} featured={index === 0} />)}</div></div></section>
}

function StoryCarousel({ images, product }) {
  const [index, setIndex] = useState(0)
  const [preview, setPreview] = useState(null)
  const pausedRef = useRef(false)
  const previewOpenRef = useRef(false)
  const count = images.length
  const current = images[index] || images[0]
  const go = direction => setIndex(value => (value + direction + count) % count)

  useEffect(() => {
    if (count < 2) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = window.setInterval(() => {
      if (!pausedRef.current) go(1)
    }, 4200)
    return () => window.clearInterval(timer)
  }, [count])

  if (!current) return null
  return (
    <figure className="story-visual" onMouseEnter={() => { pausedRef.current = true }} onMouseLeave={() => { if (!previewOpenRef.current) pausedRef.current = false }}>
      <button type="button" className="story-visual-frame cursor-target" onClick={() => { previewOpenRef.current = true; pausedRef.current = true; setPreview(current) }} aria-label={`放大${current.alt}`}>
        <img src={current.thumb || current.src} alt={current.alt} loading="lazy" fetchPriority="low" decoding="async" />
      </button>
      <figcaption><span>{product}</span><small>{String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')} · 点击放大</small></figcaption>
      {count > 1 && <>
        <button type="button" className="story-visual-nav prev" onClick={event => { event.stopPropagation(); go(-1) }} aria-label="上一张"><ArrowLeft size={16} /></button>
        <button type="button" className="story-visual-nav next" onClick={event => { event.stopPropagation(); go(1) }} aria-label="下一张"><ArrowRight size={16} /></button>
      </>}
      <MediaLightbox item={preview} onClose={() => { previewOpenRef.current = false; setPreview(null); pausedRef.current = false }} />
    </figure>
  )
}

function StoryCard({ story }) {
  return <FadeContent className="story-row" duration={0.8} threshold={0.12}>
        <div className="story-copy">
          <div className="story-kicker"><span>项目 {story.index}</span><small>{story.period}</small></div>
          <strong className="story-product">{story.product}</strong>
          <h3>{story.title}</h3>
          <p className="story-summary">{story.summary}</p>
          <ol>{story.points.map(point => <li key={point}>{point}</li>)}</ol>
          <div className="story-metrics">{story.metrics.map(([value, label]) => <div key={label}><b>{value}</b><span>{label}</span></div>)}</div>
        </div>
        <StoryCarousel images={story.images} product={story.product} />
      </FadeContent>
}

function CareerIndex() {
  return <section className="career-index section" id="experience"><div className="shell">
    <SectionHeading index="01" title="EXPERIENCE" subtitle="实习经历" />
    <div className="career-lead"><p>两段腾讯实习，覆盖AI产品商业化增长、技术产品交付、开发者运营与企业客户验证。</p><span>2025—2026 / TENCENT</span></div>
    <div className="internship-route">
      {experiences.map((experience, roleIndex) => {
        const stories = roleIndex === 0 ? internshipStories.slice(0, 4) : internshipStories.slice(4)
        return <section className="career-role-block" key={experience.index}>
          <FadeContent className="career-role" duration={0.7} threshold={0.12}>
            <div className="career-role-meta"><span>{roleIndex === 0 ? '当前实习' : '过往实习'}</span><b>{experience.period}</b></div>
            <div>
              <h3>{experience.organization} · {experience.role}</h3>
              <p className="career-role-summary">{experience.summary}</p>
              <strong>{experience.tags.join(' · ')}</strong>
            </div>
          </FadeContent>
          <div className="career-role-stories">{stories.map(story => <StoryCard story={story} key={`${experience.organization}-${story.title}`} />)}</div>
        </section>
      })}
    </div>
  </div></section>
}

function Engineering() {
  return <section className="engineering section" id="engineering"><div className="shell">
    <SectionHeading index="04" title="AI ENGINEERING" subtitle="从业务系统到开源能力" />
    <div className="engineering-intro">
      <p>三个项目不是彼此孤立的作品，而是一条从真实业务、AI 工具化到内容传播的完整链路。</p>
      <div className="engineering-flow" aria-label="项目关系">
        <span>业务场景</span><ArrowRight size={18} /><span>Agent 工具</span><ArrowRight size={18} /><span>内容交付</span>
      </div>
    </div>
    <div className="engineering-grid">
      {engineeringProjects.map(project => <FadeContent className="engineering-card" key={project.step} blur duration={0.75} threshold={0.12}>
        <a className="engineering-cover cursor-target" href={project.href} target="_blank" rel="noreferrer" aria-label={`查看${project.title}`}>
          <img src={project.image} alt={`${project.title}代表页面`} loading="lazy" fetchPriority="low" decoding="async" />
          <span>{project.step}</span>
        </a>
        <div className="engineering-body">
          <p className="engineering-label">{project.label}</p>
          <h3>{project.title}</h3>
          <p className="engineering-copy">{project.copy}</p>
          <div className="engineering-proof">{project.proof.map(item => <span key={item}>{item}</span>)}</div>
          <a className="engineering-link cursor-target" href={project.href} target="_blank" rel="noreferrer">
            {project.href.includes('github.com') && <GithubLogo size={17} weight="fill" />}{project.cta}<ArrowUpRight size={16} />
          </a>
        </div>
      </FadeContent>)}
    </div>
    <p className="engineering-summary"><b>完整闭环</b><span>峰会系统提供真实业务场景，SummitFlow MCP 将研发与运营动作工具化，长图 Skill 再把成果转化为可汇报、可传播的内容。</span></p>
  </div></section>
}

function Fieldwork() {
  return <section className="field section" id="field"><div className="shell"><SectionHeading index="03" title="FIELDWORK" subtitle="项目现场" /><FieldGallery /></div></section>
}

function Contact() {
  return <footer className="site-contact" id="contact"><div className="shell site-contact-inner">
    <div><p className="eyebrow">CONTACT</p><h2>联系方式</h2><p>欢迎就产品、解决方案、AI应用及相关机会进行交流。</p></div>
    <div className="contact-list">
      <a className="cursor-target" href="mailto:2256178941@qq.com"><EnvelopeSimple size={21} weight="light" /><span><small>邮箱</small>2256178941@qq.com</span></a>
      <a className="cursor-target" href="tel:+8618609366869"><Phone size={21} weight="light" /><span><small>电话</small>186 0936 6869</span></a>
      <div><ChatCircleDots size={21} weight="light" /><span><small>微信</small>请通过邮箱或电话获取</span></div>
      <a className="cursor-target" href="https://github.com/zrzqbr" target="_blank" rel="noreferrer"><GithubLogo size={21} weight="light" /><span><small>GitHub</small>github.com/zrzqbr</span></a>
    </div>
  </div></footer>
}

function App() {
  return <main><TargetCursor spinDuration={2.8} hideDefaultCursor parallaxOn cursorColor="#f5f0e6" cursorColorOnTarget="#ef4038" /><Hero /><CareerIndex /><Work /><Fieldwork /><Engineering /><Contact /></main>
}

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
