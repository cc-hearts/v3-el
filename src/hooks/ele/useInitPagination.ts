import { computed, reactive } from 'vue'

import { PAGE_SIZE, OFFSET, isSmall } from '@/config/ui'
import { paginationBase } from '@/types'

export default function useInitPagination(pageSize = 10, offset = 1) {
  const searchObj = reactive({ [PAGE_SIZE]: pageSize, [OFFSET]: offset })
  return searchObj
}

export function useTableBasePagination(data: { pageProps: paginationBase; total: number; layout?: string; small?: boolean; background?: boolean }) {
  const pagination = computed(() => {
    return {
      [PAGE_SIZE]: data.pageProps[PAGE_SIZE],
      [OFFSET]: data.pageProps[OFFSET],
      layout: data.layout || 'total, sizes, prev, pager, next, jumper',
      total: data.total,
      small: data.small || isSmall(),
      background: data.background || true
    }
  })

  function handleSizeChange() {}

  function handleCurrentChange() {}

  return { pagination, handleSizeChange, handleCurrentChange }
}
