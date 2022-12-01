<template>
  <Button @click="handleAddDict">添加字典</Button>
  <TableView :border="true" :pageProps="searchObj" :columns="tableData.columns" :dataSource="tableData.list" :total="tableData.total" align="left">
    <template #status="{ row }">
      <el-switch :model-value="Boolean(row.status)" @change="handleChangeSwitch($event, row)" />
    </template>
    <template #operation="{ row }">
      <el-button type="primary" size="small" @click="handleEdit(row)"> 编 辑 </el-button>
      <el-button type="danger" size="small" @click="handleDelete(row)"> 删 除 </el-button>
    </template>
  </TableView>
  <AddDictMapDrawerVue v-model="visible" />

</template>

<script setup lang="ts">
import { Button } from '@/components/index'
import TableView from '@/feature/ele/tableView.vue'
import { useInitPagination, useAddRow } from '@/hooks/index'
import { getDictList } from '@/apis/dict'
import { onMounted, reactive, ref } from 'vue'
import AddDictMapDrawerVue from './pages/dict/components/addDictMapDrawer.vue'
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

const visible = ref(false)

onMounted(() => {
  getDictList(searchObj).then((res) => {
    if (res.data) {
      const { list, total, columns } = res.data
      useAddRow(columns)
      tableData.columns = columns
      tableData.total = total
      tableData.list = list
    }
  })
})

function handleChangeSwitch(bool: boolean, data: typeof tableData['list']) {
  data.status = Number(bool)
}
function handleAddDict() {
  visible.value = !visible.value
}
function handleEdit(data) {}
function handleDelete(data) {}
</script>

<style></style>
