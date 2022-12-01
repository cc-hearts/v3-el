<template>
  <Button @click="handleDialogAdd('添加字典')">添加字典</Button>
  <TableView :border="true" :pageProps="searchObj" :columns="tableData.columns" :dataSource="tableData.list" :total="tableData.total" align="left">
    <template #status="{ row }">
      <el-switch :model-value="Boolean(row.status)" @change="handleChangeSwitch($event, row)" />
    </template>
    <template #operation="{ row }">
      <div>
        <el-button type="success" size="small" @click="handleChange('字典项管理', row)">字典项管理</el-button>
        <TableOperation @edit="handleDialogEdit('编辑字典', row)" @delete="handleDelete(row)" />
      </div>
    </template>
  </TableView>
  <AddDictMapDrawer v-bind="drawerProps" @update:model-value="toggleDrawerVisible" />
  <AddDictDialog v-bind="dialogProps" @cancel="toggleDialogVisible" @refresh="refreshPages" />
</template>

<script setup lang="ts">
import { Button } from '@/components/index'

import { useInitPagination, useAddRow } from '@/hooks/index'
import { getDictList } from '@/apis/dict'
import { onMounted, reactive, ref } from 'vue'
import AddDictMapDrawer from '@/pages/dict/components/addDictMapDrawer.vue'
import AddDictDialog from '@/pages/dict/components/addDictDialog.vue'
import TableView from '@/feature/ele/tableView.vue'
import { TableOperation } from '@/feature/index'
import { useInitDrawerProps, useInitDialogProps } from '@/hooks/index'
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
const { dialogProps, toggleDialogVisible, handleDialogAdd, handleDialogEdit } = useInitDialogProps('新增字典')
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
  data.status = Number(bool)
}

function handleDelete(data) {}
</script>

<style></style>
