import { PAGE_SIZE, OFFSET } from '@/config/ui'
export interface paginationBase {
  [PAGE_SIZE]: number
  [OFFSET]: number
}

export type callback = (...args: any[]) => any


export type size = 'small' | 'default' | 'large'