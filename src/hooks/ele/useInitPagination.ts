import { computed, reactive } from 'vue'

import { PAGE_SIZE, OFFSET } from '@/config/base'
import { UI_OFFSET, UI_PAGE_SIZE } from '@/config/ui'
import { paginationBase } from '@/types'

export default function useInitPagination(pageSize = 10, offset = 1) {
  const searchObj = reactive({ [PAGE_SIZE]: pageSize, [OFFSET]: offset })
  return searchObj
}

export function useTableBasePagination(data: { pageProps: paginationBase; total: number }) {
  const pagination = computed(() => {
    return {
      [UI_PAGE_SIZE]: data.pageProps[PAGE_SIZE],
      [UI_OFFSET]: data.pageProps[OFFSET],
      layout: 'total, prev, pager, next',
      total: data.total
    }
  })

  function handleSizeChange() {}

  function handleCurrentChange() {}

  return { pagination, handleSizeChange, handleCurrentChange }
}
