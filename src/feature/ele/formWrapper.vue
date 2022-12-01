<template>
  <el-form ref="formRef" :model="mode" :rules="rules" :label-width="labelWidth || 120">
    <template v-for="item in wrapper" :key="item.field">
      <el-form-item :path="item.field" :label="item.label">
        <template v-if="item.slot">
          <slot :name="item.slot" />
        </template>
        <template v-else>
          <FormItem :item="item" :value="mode[item.field]" @input="forwardEvent" />
        </template>
      </el-form-item>
    </template>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormItem from './formItem.vue'
import type { callback } from '@/types/base'
import type { formWrapper } from '@/types/index'
const formRef = ref<{ validate: callback } | null>(null)

const emits = defineEmits(['change'])

const { mode } = withDefaults(
  defineProps<{
    mode: formWrapper['mode']
    rules?: formWrapper['rules']
    wrapper: formWrapper['wrapper']
    labelWidth?: formWrapper['labelWidth']
  }>(),
  {
    mode() {
      return {}
    },
    rules() {
      return {}
    },
    wrapper() {
      return []
    }
  }
)

function handleSubmit() {
  return new Promise((resolve, reject) => {
    formRef.value?.validate((valid: Record<string, unknown>, isValid: boolean) => {
      if (valid) {
        resolve(mode)
        return
      }
      reject(isValid)
    })
  })
}

defineExpose({
  handleSubmit
})

function forwardEvent<T extends { event: unknown; field: string }>(data: T) {
  emits('change', data)
}
</script>

<style></style>
