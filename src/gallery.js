// 展示分类可以合并多个素材目录，保留原始路径并支持图片和视频混排。
const group = (key, title, sources) => ({
  key, title, sources, count: sources.reduce((total, source) => total + source.count, 0),
})
const nestedGroup = (key, title, subgroups) => ({
  key, title, subgroups, count: subgroups.reduce((total, subgroup) => total + subgroup.count, 0),
})
export const galleryModules = [
  // 对外技术分享优先展示：最新城市行海报、原有演讲海报与现场照片。
  group('instructor', '对外技术分享', [
    { key: 'instructor-featured', count: 1, type: 'image', ext: 'jpg' },
    { key: 'instructor', count: 8, type: 'image', order: [1, 4, 2, 3, 5, 6, 7, 8] },
  ]),
  nestedGroup('ai-course', 'AI 实践项目设计', [
    group('ai-practice', 'AI 实践项目', [{ key: 'ai-practice', count: 4, type: 'image', ext: 'jpg' }]),
    group('ai-skills', 'Skill 课程项目', [{ key: 'ai-skills', count: 9, type: 'image', ext: 'jpg' }]),
    group('ai-opc-training', 'OPC 训练营培训', [{ key: 'ai-opc-training', count: 12, type: 'image', ext: 'jpg' }]),
    group('ai-product-design', 'AI 产品设计', [{ key: 'ai-product-design', count: 2, type: 'image', ext: 'jpg' }]),
    group('ai-case-1', '案例产出 01', [{ key: 'ai-case-1', count: 5, type: 'image', ext: 'jpg' }]),
    group('ai-case-2', '案例产出 02', [{ key: 'ai-case-2', count: 9, type: 'image', ext: 'jpg' }]),
    group('ai-case-3', '案例产出 03', [{ key: 'ai-case-3', count: 5, type: 'image', ext: 'jpg' }]),
    group('ai-case-4', '案例产出 04', [{ key: 'ai-case-4', count: 7, type: 'image', ext: 'jpg' }]),
  ]),
  group('summit-salon', '企业决策圈层运营（腾讯云TVP/腾讯云架构师技术同盟）', [
    { key: 'summit-salon', count: 2, type: 'image' },
    { key: 'video', count: 4, type: 'video' },
  ]),
  // 展示顺序：HCIE、挑战杯一等奖、华为 ICT 一等奖，其他荣誉顺延。
  group('honors', '个人荣誉', [
    { key: 'honors', count: 4, type: 'image', ext: 'jpg', order: [3, 2, 4, 1] },
    { key: 'honors-more', count: 12, type: 'image', ext: 'jpg' },
  ]),
  group('campus-lab', '校园经历', [{ key: 'campus-lab', count: 5, type: 'image' }]),
]

export function itemsFor(module, subgroupIndex = 0) {
  const collection = module.subgroups?.[subgroupIndex] || module
  return collection.sources.flatMap(source => Array.from({ length: source.count }, (_, i) => {
    const n = String(source.order?.[i] ?? i + 1).padStart(2, '0')
    return {
      src: `/gallery/${source.key}/${n}.${source.type === 'video' ? 'mp4' : (source.ext || 'webp')}`,
      thumb: source.type === 'video'
        ? `/gallery-thumbs/${source.key}/poster-${n}.jpg`
        : `/gallery-thumbs/${source.key}/${n}.${source.ext || 'webp'}`,
      poster: source.type === 'video' ? `/gallery-thumbs/${source.key}/poster-${n}.jpg` : undefined,
      kind: source.type, title: collection.title,
    }
  })).map((item, i) => ({ ...item, number: i + 1 }))
}
