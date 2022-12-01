<template>
  <el-button type="primary" size="small" @click="handleEmits('edit')"> {{ editText }}</el-button>
  <el-button type="danger" size="small" @click="handleEmits('delete')"> {{ deleteText }} </el-button>
</template>

<script setup lang="ts">
const emits = defineEmits(['edit', 'delete'])
function handleEmits(type: 'edit' | 'delete') {
  emits(type)
}

withDefaults(defineProps<{ editText?: string; deleteText?: string }>(), { editText: '编 辑', deleteText: '删 除' })
</script>

<style></style>
