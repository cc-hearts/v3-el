<template>
  <Drawer :size="width" :model-value="modelValue" @update:model-value="toggleVisible">
    <div class="operation-wrapper">
      <Button type="primary" @click="handleDialogAdd('新增字典项')">添加字典项</Button>
    </div>
    <TableView :border="true" :pageProps="searchObj" :columns="tableData.columns" :dataSource="tableData.list"
      :total="tableData.total" align="left">
      <template #status="{ row }">
        <el-switch :model-value="Boolean(row.status)" @change="handleChangeSwitch($event, row)" />
      </template>
      <template #operation="{ row }">
        <TableOperation title="是否删除该字典项" @edit="handleDialogEdit('编辑字典项', row)" @delete="handleDelete(row)" />
      </template>
    </TableView>
    <AddDictMapDialog v-bind="dialogProps" :code="(props.row?.code as string)" @cancel="toggleDialogVisible"
      @refresh="refreshSysDictMapList" />
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
const props = withDefaults(defineProps<{ modelValue: boolean; width?: string; row: Record<string, unknown> | null }>(), {
  modelValue: false,
  row: null,
  width: '50%'
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
        useAddRow(columns, { fixed: 'right', width: '150px' })
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

<style lang="scss">
@use '@/assets/scss/variables/_variable.scss';

.el-drawer__header {
  margin-bottom: 0;
  padding: 0.8rem;
  border-bottom: 1px solid var(--#{variable.$prefix}-drawer-header-border,var(--#{variable.$prefix}-btn-br-default));
}
</style>