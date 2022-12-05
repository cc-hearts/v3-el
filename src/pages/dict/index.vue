<template>
  <div class="operation-wrapper">
    <Button type="primary" @click="handleDialogAdd('添加字典')">添加字典</Button>
  </div>
  <TableView :border="true" :pageProps="searchObj" :columns="tableData.columns" :dataSource="tableData.list" :total="tableData.total" align="left">
    <template #status="{ row }">
      <el-switch :model-value="Boolean(row.status)" @change="handleChangeSwitch($event, row)" />
    </template>
    <template #operation="{ row }">
      <div>
        <el-button type="success" size="small" @click="handleChange('字典项管理', row)">字典项管理</el-button>
        <TableOperation :width="180" title="是否删除该字典项？" @edit="handleDialogEdit('编辑字典', row)" @delete="handleDelete(row)" />
      </div>
    </template>
  </TableView>
  <AddDictMapDrawer v-bind="drawerProps" @update:model-value="toggleDrawerVisible" />
  <AddDictDialog v-bind="dialogProps" @cancel="toggleDialogVisible" @refresh="refreshPages" />
</template>

<script setup lang="ts">
import { Button } from '@/components/index'

import { useInitPagination, useAddRow } from '@/hooks/index'
import { deleteDict, getDictList, updateDict } from '@/apis/dict'
import { onMounted, reactive } from 'vue'
import AddDictMapDrawer from '@/pages/dict/components/addDictMapDrawer.vue'
import AddDictDialog from '@/pages/dict/components/addDictDialog.vue'
import TableView from '@/feature/ele/tableView.vue'
import { TableOperation } from '@/feature/index'
import { useInitDrawerProps, useInitDialogProps } from '@/hooks/index'
import { successTip } from '@/utils/index'
// import { useCounterStore } from './store/test'
// const counterInstance = useCounterStore()
// counterInstance.increment()
// console.log(counterInstance.count)

const searchObj = useInitPagination()

const tableData = reactive<any>({
  list: [],
  total: 0,
  columns: []
})

const { drawerProps, toggleDrawerVisible, handleChange } = useInitDrawerProps('字典项管理')
const { dialogProps, toggleDialogVisible, handleDialogAdd, handleDialogEdit, watchHiddenInitStatus } = useInitDialogProps('新增字典')

watchHiddenInitStatus()
function getData() {
  getDictList(searchObj).then((res) => {
    if (res.data) {
      const { list, total, columns } = res.data
      useAddRow(columns)
      tableData.columns = columns
      tableData.total = total
      tableData.list = list
    }
  })
}
onMounted(() => {
  getData()
})

function refreshPages() {
  searchObj.offset = 1
  getData()
}

function handleChangeSwitch(bool: boolean, data: typeof tableData['list']) {
  updateDict({ id: data.id, status: Number(bool) }).then((res) => {
    successTip(res.message)
    getData()
  })
}

function handleDelete({ id }: { id: number }) {
  deleteDict(id).then((res) => {
    successTip(res.message)
    refreshPages()
  })
}
</script>


<style lang="scss">
@import "@/assets/scss/pages/operation.scss"
</style>