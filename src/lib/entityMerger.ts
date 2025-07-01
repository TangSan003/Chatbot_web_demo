import { EntityInfo } from './entityExtractor'

export function mergeEntitiesToString(entities: EntityInfo): string {
  const entries = Object.entries(entities)
    .filter(([_, value]) => value !== null)
    .map(([key, value]) => `${key}: ${value}`)

  return entries.length > 0 ? entries.join('\n') : 'Không có thông tin chi tiết'
}
