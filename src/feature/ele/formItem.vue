<template>
  <el-input v-if="item.type === 'input'" :model-value="value" @update:modelValue="forwardEvent"
    :placeholder="placeholder" :disabled="item.disabled" />
  <el-switch v-else-if="item.type === 'switch'" :size="item.size || defaultSize" :model-value="value"
    @update:modelValue="forwardEvent" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { formItem } from '@/types'
import { getCurrentSize } from '@/config/ui';
const { item } = withDefaults(defineProps<{ item: formItem; value: any }>(), {
  value: ''
})

const placeholder = computed(() => {
  let placeholder = item.placeholder
  switch (item.type) {
    case 'input':
      placeholder = placeholder || `请输入${item.label}`
      break
  }
  return placeholder
})
const emits = defineEmits(['input'])
function forwardEvent(event: unknown) {
  emits('input', {
    event,
    field: item.field
  })
}

const defaultSize = computed(() => {
  return getCurrentSize()
})
</script>
