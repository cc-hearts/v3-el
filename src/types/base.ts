import { PAGE_SIZE, OFFSET } from '@/config/base'
export interface paginationBase {
  [PAGE_SIZE]: number
  [OFFSET]: number
}

export type callback = (...args: any[]) => any