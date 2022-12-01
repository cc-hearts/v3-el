<template>
  <Drawer :model-value="modelValue" @update:model-value="toggleVisible"> 123 </Drawer>
</template>

<script setup lang="ts">
import { Drawer } from '@/feature/index'
import { useToggleVisible } from '@/hooks/ele/useToggleVisible'
const props = withDefaults(defineProps<{ modelValue: boolean }>(), {
  modelValue: false
})
const emits = defineEmits(['update:modelValue'])
const toggleVisible = useToggleVisible(emits, props)
</script>

<style></style>
