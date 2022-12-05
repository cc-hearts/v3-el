import type { columns } from '@/types/ele/table'

interface operationImpl {
  fixed?: 'left' | 'right'
  field?: string
  title?: string
  width?: number | string
  slotName?: string
}
export default function useAddRow<T extends Array<columns>>(rows: T, val: operationImpl = {}) {
  const { title = '操作', field = '_operation', slotName = 'operation', width } = val
  rows.push({ field: field, title: title!, width, slot: { name: slotName || 'operation' }, fixed: val.fixed })
}
