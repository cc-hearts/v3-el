<template>
  <div class="pagination-wrapper">
    <el-pagination v-bind="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>

</template>

<script setup lang="ts">
import { useTableBasePagination } from '@/hooks/index'
import { PAGE_SIZE, OFFSET } from '@/config/ui'
import type { paginationProps } from '@/types/index'
// vue3 暂不支持从外引入全部的类型定义
const props = withDefaults(defineProps<{ pageProps: paginationProps['pageProps']; total: paginationProps['total'] }>(), {
  total: 0,
  pageProps() {
    return {
      [PAGE_SIZE]: 10,
      [OFFSET]: 1
    }
  }
})

const { pagination, handleSizeChange, handleCurrentChange } = useTableBasePagination(props)
</script>

<style lang="scss" scoped>
.pagination-wrapper {
  & > div {
    justify-content: right;
    padding: 1rem 1.5rem 0 0;
  }
}
</style>
