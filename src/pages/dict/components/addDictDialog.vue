<template>
  <Dialog v-bind="props" @cancel="handleCancel" @submit="handleSubmit">
    <FormWrapper ref="form" v-bind="formProps" @change="handleChangeFormValue" />
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog, FormWrapper } from '@/feature/index'
import { useInitFormProps, useWatchDialogHiddenClear, useEchoFormDialogData } from '@/hooks/index'
import { ref } from 'vue'
import type { formInstance } from '@/types/index'
import { addDict, updateDict } from '@/apis/dict'
import { successTip } from '@/utils'
const props = withDefaults(
  defineProps<{
    title: string
    modelValue: boolean
    row: Record<string, unknown> | null
    width?: string
    type?: 'add' | 'edit'
    cancelText?: string
    submitText?: string
  }>(),
  {
    modelValue: false,
    row: null,
    type: 'add'
  }
)

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
useWatchDialogHiddenClear(() => props.modelValue, false, formProps.mode, { status: true })

useEchoFormDialogData(
  () => props.type,
  'edit',
  formProps.mode,
  () => props.row || {},
  { status: (num) => Boolean(num) }
)

function handleSubmit() {
  form.value?.handleSubmit().then(() => {
    const isEdit = !!(props.type === 'edit')
    ;(isEdit ? updateDict : addDict)(
      Object.assign({}, formProps.mode, { status: Number(formProps.mode.status), id: isEdit ? props.row?.id : void 0 })
    ).then((res) => {
      successTip(res.message)
      emits('refresh')
      handleCancel()
    })
  })
}
</script>
