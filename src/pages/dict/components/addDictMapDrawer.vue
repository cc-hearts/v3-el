<template>
  <Drawer :model-value="modelValue" @update:model-value="toggleVisible">
    <Button @click="handleDialogAdd('新增字典项')">添加字典项</Button>
    <TableView :border="true" :pageProps="searchObj" :columns="tableData.columns" :dataSource="tableData.list" :total="tableData.total" align="left">
      <template #status="{ row }">
        <el-switch :model-value="Boolean(row.status)" @change="handleChangeSwitch($event, row)" />
      </template>
      <template #operation="{ row }">
        <TableOperation title="是否删除该字典项" @edit="handleDialogEdit('编辑字典项', row)" @delete="handleDelete(row)" />
      </template>
    </TableView>
    <AddDictMapDialog v-bind="dialogProps" :code="(props.row?.code as string)" @cancel="toggleDialogVisible" @refresh="refreshSysDictMapList" />
  </Drawer>
</template>

<script setup lang="ts">
import { Drawer } from '@/feature/index'
import { useToggleVisible } from '@/hooks/ele/useToggleVisible'
import { Button } from '@/components/index'
import { TableOperation, TableView } from '@/feature/index'
import { useAddRow, useInitDialogProps, useInitPagination } from '@/hooks'
import { reactive, watch } from 'vue'
import { deleteDictMap, getDictMapList, updateDictMap } from '@/apis/dict'
import AddDictMapDialog from './addDictMapDialog.vue'
import { successTip } from '@/utils'
const props = withDefaults(defineProps<{ modelValue: boolean; row: Record<string, unknown> | null }>(), {
  modelValue: false,
  row: null
})

const searchObj = useInitPagination()

const tableData = reactive<any>({
  list: [],
  total: 0,
  columns: []
})

function getData() {
  if (props.row && 'code' in props.row) {
    const dictKey = props.row['code'] as string
    getDictMapList(Object.assign({}, searchObj, { dictKey })).then((res) => {
      if (res.data) {
        const { list, total, columns } = res.data
        useAddRow(columns)
        tableData.list = list
        tableData.total = total
        tableData.columns = columns
      }
    })
  }
}
watch(
  () => props.modelValue,
  (bool) => {
    if (bool) {
      getData()
    } else {
      // TODO: 清除副作用
    }
  }
)

function refreshSysDictMapList() {
  searchObj.offset = 1
  getData()
}

const emits = defineEmits(['update:modelValue'])
const toggleVisible = useToggleVisible(emits, props)

const { dialogProps, toggleDialogVisible, handleDialogAdd, handleDialogEdit, watchHiddenInitStatus } = useInitDialogProps('新增字典项')
watchHiddenInitStatus()

function handleChangeSwitch(bool: boolean, data: typeof tableData['list']) {
  updateDictMap({ id: data.id, status: Number(bool) }).then((res) => {
    successTip(res.message)
    getData()
  })
}

function handleDelete({ id }: { id: number }) {
  deleteDictMap(id).then((res) => {
    successTip(res.message)
    refreshSysDictMapList()
  })
}
</script>

<style></style>
