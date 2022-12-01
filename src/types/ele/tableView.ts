import type { paginationProps } from './pagination'
import type { tableProps } from './table'
import type { mergeObject } from '@/types/utils'
export type tableViewProps = mergeObject<paginationProps, tableProps>
