import { useEffect, useRef, useState } from 'react'
import MagicBento from './MagicBento'
import { galleryModules, itemsFor } from '../gallery'
import './FieldGallery.css'

const pad = n => String(n).padStart(2, '0')
export default function FieldGallery() {
  const [category, setCategory] = useState(0)
  const [subCategory, setSubCategory] = useState(0)
  const [selected, setSelected] = useState(null)
  const dialog = useRef(null)
  const module = galleryModules[category]
  const activeSubgroup = module.subgroups?.[subCategory]
  const items = itemsFor(module, subCategory)
  useEffect(() => {
    if (selected === null) return
    const el = dialog.current
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    el.showModal()
    return () => { el.close(); document.body.style.overflow = overflow; previous?.focus() }
  }, [selected])
  return <div className="field-layout">
    <div className="field-modules" aria-label="项目现场分类">
      {galleryModules.map((m, i) => <button type="button" key={m.key} aria-pressed={category === i}
        className={`field-module ${category === i ? 'active' : ''}`} onClick={() => { setCategory(i); setSubCategory(0); setSelected(null) }}>
        <span>{m.title}</span><small>{pad(m.count)}</small>
      </button>)}
    </div>
    {module.subgroups && <div className="field-submodules" aria-label={`${module.title}二级分类`}>
      {module.subgroups.map((subgroup, i) => <button type="button" key={subgroup.key} aria-pressed={subCategory === i}
        className={`field-submodule ${subCategory === i ? 'active' : ''}`} onClick={() => { setSubCategory(i); setSelected(null) }}>
        <span>{subgroup.title}</span><small>{pad(subgroup.count)}</small>
      </button>)}
    </div>}
    <div className="field-collection-heading"><h3>{activeSubgroup?.title || module.title}</h3><span>{activeSubgroup?.count || module.count} 件记录 · 点击查看完整内容</span></div>
    <MagicBento key={module.key} items={items} textAutoHide enableStars enableSpotlight enableBorderGlow
      enableTilt enableMagnetism clickEffect spotlightRadius={300} particleCount={12} glowColor="132, 0, 255"
      renderCard={(item, index) => <button type="button" className="field-photo"
        aria-label={`查看${item.title}第 ${item.number} ${item.kind === 'video' ? '段视频' : '张图片'}`} onClick={() => setSelected(index)}>
        <img src={item.thumb} alt={`${item.title} · ${item.number}`} loading="lazy" fetchPriority="low" decoding="async" />
        <span className="field-photo-caption"><span>{item.kind === 'video' ? '▷ 播放短片' : '↗ 查看原图'}</span><span>{pad(item.number)}</span></span>
      </button>} />
    {selected !== null && <dialog ref={dialog} className="field-dialog" onCancel={() => setSelected(null)}
      onClick={e => { if (e.target === e.currentTarget) setSelected(null) }} aria-label={items[selected].title}>
      <button type="button" className="field-close" autoFocus onClick={() => setSelected(null)} aria-label="关闭预览">关闭 ×</button>
      {items[selected].kind === 'video'
        ? <video key={items[selected].src} src={items[selected].src} poster={items[selected].poster} controls playsInline preload="metadata" />
        : <img src={items[selected].src} alt={`${items[selected].title} · ${selected + 1}`} decoding="async" />}
      <p>{items[selected].title} / {pad(selected + 1)}</p>
    </dialog>}
  </div>
}
