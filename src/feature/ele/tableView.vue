<template>
  <Table :columns="props.columns" :data-source="dataSource" :align="props.align" :border="props.border" :loading="props.loading">
    <template v-for="n in slotsKeys" v-slot:[n]="data">
      <slot :name="n" v-bind="data"></slot>
    </template>
  </Table>
  <Pagination :page-props="props.pageProps" :total="props.total" />
</template>

<script setup lang="ts">
import Table from './table.vue'
import Pagination from './pagination.vue'
import { PAGE_SIZE, OFFSET } from '@/config/ui'
import type { tableViewProps } from '@/types/index'
import { reactive, useSlots } from 'vue'

const slots = useSlots()
const slotsKeys = reactive(Object.keys(slots))

const props = withDefaults(
  defineProps<{
    pageProps: tableViewProps['pageProps']
    total: tableViewProps['total']
    columns: tableViewProps['columns']
    dataSource: tableViewProps['dataSource']
    align?: tableViewProps['align']
    border?: tableViewProps['border']
    loading?: tableViewProps['loading']
  }>(),
  {
    total: 0,
    align: 'left',
    border: false,
    pageProps() {
      return {
        [PAGE_SIZE]: 10,
        [OFFSET]: 1
      }
    },
    columns() {
      return []
    },
    dataSource() {
      return []
    }
  }
)
</script>

<style></style>
