import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'

function App() {
  return (
    <main>
      <section className="hero" id="home">
        <div className="hero-media" aria-hidden="true">
          <video autoPlay muted loop playsInline preload="metadata">
            <source src="/ambient-tech.mp4" type="video/mp4" />
          </video>
        </div>
        <nav className="nav shell" aria-label="主导航">
          <a className="brand" href="#home" aria-label="返回首页">ZR<span>®</span></a>
          <div className="nav-links">
            <a href="#profile">关于</a>
            <a href="#work">项目</a>
            <a href="#strengths">能力</a>
          </div>
          <a className="contact-link" href="#contact">联系我 <span>↗</span></a>
        </nav>

        <div className="hero-content shell">
          <div className="eyebrow"><span /> AI PRODUCT · TECH OPERATIONS · CLIENT SUCCESS</div>
          <h1>让技术被理解，<br />让产品被<span>真正使用。</span></h1>
          <div className="hero-bottom">
            <p>我是张瑞，一名有技术背景的 AI 产品技术运营与客户经理。<br />连接产品、用户与商业结果，把复杂问题推进到真实落地。</p>
            <a className="circle-cta" href="#work" aria-label="查看精选项目">↓</a>
          </div>
        </div>
        <div className="hero-index">PORTFOLIO / 2026</div>
      </section>

      <section className="profile section shell" id="profile">
        <div className="section-mark">01 / PROFILE</div>
        <div className="profile-grid">
          <div className="portrait">
            <img src="/portrait.webp" alt="张瑞个人照片" />
            <div className="portrait-caption">OPEN TO 2027 CAMPUS OPPORTUNITIES</div>
          </div>
          <div className="profile-copy">
            <p className="kicker">关于我</p>
            <h2>从技术理解出发，<br />用运营驱动增长。</h2>
            <p className="intro">软件工程与 AI 应用背景，现于腾讯参与 AI 产品增长、内容运营与企业技术圈层建设。既能拆解用户需求、设计运营路径，也能把想法做成可验证的产品和线上系统。</p>
            <div className="facts">
              <div><span>教育</span><strong>电子科技大学成都学院<br />软件工程 · 前 5%</strong></div>
              <div><span>方向</span><strong>AI 产品运营<br />技术产品 / 客户成功</strong></div>
              <div><span>联系</span><strong>2256178941@qq.com<br />186 0936 6869</strong></div>
            </div>
          </div>
        </div>
        <div className="metrics" aria-label="核心项目数据">
          <div><strong>700万<sup>+</sup></strong><span>专项全网曝光</span></div>
          <div><strong>9K<sup>+</sup></strong><span>产品下载与深度使用</span></div>
          <div><strong>5万<sup>+</sup></strong><span>活动官网累计访问</span></div>
          <div><strong>100万<sup>+</sup></strong><span>Agent 专家模式调用</span></div>
        </div>
      </section>

      <section className="work section" id="work">
        <div className="shell section-head">
          <div className="section-mark">02 / SELECTED WORK</div>
          <h2>把业务问题，做成<br />可运行的产品。</h2>
        </div>
        <div className="project-list shell">
          <ProjectCard
            index="01"
            title="腾讯 OPC 社区官方平台"
            meta="产品负责人 / 核心开发者 · 2026"
            copy="从业务需求、角色与激励机制出发，搭建园区榜单、OPC 价值榜、专家咨询与积分体系，让社区服务从人工协同走向产品化运营。"
            href="https://cloud.tencent.com/opc"
            className="project-a"
          />
          <ProjectCard
            index="02"
            title="粤港澳大湾区架构师峰会官网"
            meta="产品负责人 / 独立开发者 · 2026"
            copy="将简单报名入口升级为品牌官网与数字化会务系统，打通报名、通知、签到与数据复盘，累计承接 1,700+ 人报名。"
            href="https://ruitcarch.cloud/"
            className="project-b"
          />
          <ProjectCard
            index="03"
            title="AI 战略指标管理系统"
            meta="产品负责人 / 主导开发者 · 2026—至今"
            copy="深入两校区 8 个学院完成需求调研，将 AI 填报、自动预警与 RAG 问数融入管理流程，稳定服务 1,280 名教师。"
            href="https://sism.blackevil.cn/login"
            className="project-c"
          />
        </div>
      </section>

      <section className="strengths section shell" id="strengths">
        <div className="section-mark">03 / CAPABILITIES</div>
        <div className="section-head compact">
          <h2>复合能力，<br />端到端推进。</h2>
          <p>我关注的不是单点交付，而是从发现问题到形成增长、产品与客户价值的完整闭环。</p>
        </div>
        <div className="strength-grid">
          <Strength number="01" title="技术产品化" copy="理解 AI、云计算与 Web 技术，能完成需求分析、产品设计，并快速做出可验证的原型或线上系统。" />
          <Strength number="02" title="增长与内容运营" copy="将复杂技术转译为产品教程、客户案例和活动体验，用内容、渠道与数据复盘推动认知和转化。" />
          <Strength number="03" title="客户沟通与洞察" copy="面向 CEO、CTO、CIO 与架构师建立长期沟通，识别技术选型、业务增长和采购决策中的真实需求。" />
          <Strength number="04" title="复杂项目推进" copy="协调产品、研发、市场、合作伙伴与供应商，拆解目标、管理风险，让方案从讨论走到上线和复盘。" />
        </div>
      </section>

      <footer className="contact" id="contact">
        <div className="shell contact-inner">
          <div className="section-mark">04 / CONTACT</div>
          <p>寻找 AI 产品运营、技术产品与客户成功方向的机会</p>
          <a className="contact-title" href="mailto:2256178941@qq.com">一起做点<br /><span>真实有用的事。</span></a>
          <div className="contact-footer">
            <a href="mailto:2256178941@qq.com">2256178941@qq.com ↗</a>
            <a href="tel:+8618609366869">+86 186 0936 6869</a>
            <span>ZHANG RUI · 2026</span>
          </div>
        </div>
      </footer>
    </main>
  )
}

function ProjectCard({ index, title, meta, copy, href, className }) {
  return (
    <article className={`project-card ${className}`}>
      <div className="project-visual" aria-hidden="true"><span>{index}</span><i /></div>
      <div className="project-content">
        <div className="project-meta">{meta}</div>
        <h3>{title}</h3>
        <p>{copy}</p>
        <a href={href} target="_blank" rel="noreferrer">查看项目 <span>↗</span></a>
      </div>
    </article>
  )
}

function Strength({ number, title, copy }) {
  return (
    <article className="strength-card">
      <span>{number}</span>
      <h3>{title}</h3>
      <p>{copy}</p>
    </article>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>,
)
