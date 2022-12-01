import type { columns } from '@/types/ele/table'
export default function useAddRow<T extends Array<columns>>(rows: T) {
  rows.push({ field: '_operation', title: '操作',  slot: { name: 'operation' } })
}
