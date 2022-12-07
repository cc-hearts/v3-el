<template>
  <el-table :data="dataSource" :border="border" v-loading="loading">
    <template v-for="item in columns">
      <el-table-column
        :prop="item.field"
        :label="item.title"
        :width="item.width"
        :align="item.align || 'center'"
        :header-align="item.align || 'center'"
        :fixed="item.fixed ? item.fixed : false"
      >
        <template v-if="item.slot" #default="{ $index, column, row }">
          <slot :name="item.slot && item.slot.name" :$index="$index" :column="column" :row="row"></slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script setup lang="ts">
import type { tableProps } from '@/types/index'
withDefaults(
  defineProps<{
    columns: tableProps['columns']
    dataSource: tableProps['dataSource']
    border?: tableProps['border']
    align?: tableProps['align']
    loading?: tableProps['loading']
  }>(),
  {
    columns() {
      return []
    },
    dataSource() {
      return []
    },
    border: false,
    align: 'left',
    loading: false
  }
)
</script>

<style></style>
