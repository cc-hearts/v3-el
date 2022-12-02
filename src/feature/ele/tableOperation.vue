<template>
  <el-button type="primary" size="small" @click="handleEmits('edit')"> {{ editText }}</el-button>
  <el-popconfirm
    :width="width"
    :confirm-button-text="confirmBtnText"
    :cancel-button-text="cancelBtnText"
    :icon="InfoFilled"
    icon-color="#626AEF"
    :title="title"
    @confirm="handleEmits('delete')"
  >
    <template #reference>
      <el-button type="danger" size="small"> {{ deleteText }} </el-button>
    </template>
  </el-popconfirm>
</template>

<script setup lang="ts">
import { InfoFilled } from '@element-plus/icons-vue'

const emits = defineEmits(['edit', 'delete'])
function handleEmits(type: 'edit' | 'delete') {
  emits(type)
}

withDefaults(
  defineProps<{ width?: string | number; editText?: string; deleteText?: string; confirmBtnText?: string; cancelBtnText?: string; title?: string }>(),
  {
    editText: '编 辑',
    deleteText: '删 除',
    confirmBtnText: '确 认',
    cancelBtnText: '取 消',
    title: '是否删除?'
  }
)
</script>

<style></style>
