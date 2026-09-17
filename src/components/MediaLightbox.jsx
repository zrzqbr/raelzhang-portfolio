import { useEffect, useRef } from 'react'

export default function MediaLightbox({ item, onClose }) {
  const dialog = useRef(null)
  useEffect(() => {
    if (!item) return undefined
    const el = dialog.current
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    el.showModal()
    return () => {
      el.close()
      document.body.style.overflow = overflow
      previous?.focus()
    }
  }, [item])
  if (!item) return null
  return (
    <dialog
      ref={dialog}
      className="media-lightbox"
      onCancel={onClose}
      onClick={event => { if (event.target === event.currentTarget) onClose() }}
      aria-label={item.label || item.alt || '图片预览'}
    >
      <button type="button" className="media-lightbox-close" autoFocus onClick={onClose} aria-label="关闭预览">关闭 ×</button>
      <img src={item.src} alt={item.alt || item.label || ''} decoding="async" />
      {(item.label || item.alt) && <p>{item.label || item.alt}</p>}
    </dialog>
  )
}
