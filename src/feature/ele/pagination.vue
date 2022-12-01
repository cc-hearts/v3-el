<template>
  <el-pagination v-bind="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>

<script setup lang="ts">
import { useTableBasePagination } from '@/hooks/index'
import { PAGE_SIZE, OFFSET } from '@/config/base'
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

<style></style>
