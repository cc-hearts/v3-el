<template>
  <el-drawer :model-value="modelValue" :title="title" :append-to-body="true" :before-close="toggleVisible">
    <slot></slot>
  </el-drawer>
</template>

<script setup lang="ts">
import { useToggleVisible } from '@/hooks/ele/useToggleVisible'
const props = withDefaults(defineProps<{ modelValue: boolean; title?: string; appendToBody: boolean }>(), {
  modelValue: false,
  title: '',
  appendToBody: false
})
const emits = defineEmits(['update:modelValue'])
const toggleVisible = useToggleVisible(emits, props)
</script>

<style></style>
