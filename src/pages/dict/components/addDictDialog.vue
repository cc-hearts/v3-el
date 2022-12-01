<template>
  <Dialog v-bind="props" @cancel="handleCancel" @submit="handleSubmit">
    <FormWrapper ref="form" v-bind="formProps" @change="handleChangeFormValue" />
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog, FormWrapper } from '@/feature/index'
import { useInitFormProps } from '@/hooks/index'
import { ref } from 'vue'
import type { formInstance } from '@/types/index'
import { addDict } from '@/apis/dict'
import { successTip } from '@/utils'
const props = withDefaults(defineProps<{ title: string; modelValue: boolean; row: Record<string, unknown> | null; width?: string; cancelText?: string; submitText?: string }>(), {
  modelValue: false,
  row: null
})

const form = ref<formInstance | null>(null)

const { formProps, handleChangeFormValue } = useInitFormProps({ code: '', name: '', status: true }, [
  { field: 'code', label: '字典编码', type: 'input' },
  { field: 'name', label: '字典名称', type: 'input' },
  { field: 'status', label: '是否启用', type: 'switch' }
])

const emits = defineEmits(['cancel', 'refresh'])
function handleCancel() {
  emits('cancel')
}

function handleSubmit() {
  form.value?.handleSubmit().then(() => {
    addDict(Object.assign({}, formProps.mode, { status: Number(formProps.mode.status) })).then((res) => {
      successTip(res.message)
      emits('refresh')
      handleCancel()
    })
  })
}
</script>
