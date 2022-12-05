import type { size as _size } from '@/types/base'

export const PAGE_SIZE = 'pageSize'

export const OFFSET = 'offset'

export const size: _size = 'small'

export const isSmall = () => size === 'small'

export const getCurrentSize = () => {
  return size
}
