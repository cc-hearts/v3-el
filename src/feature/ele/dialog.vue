<template>
  <el-dialog :model-value="modelValue" :title="title" :width="width" :before-close="handleCancel">
    <slot></slot>
    <template #footer>
      <slot name="footer">
        <span class="dialog-footer">
          <el-button @click="handleCancel">{{ cancelText }}</el-button>
          <el-button type="primary" @click="handleSubmit"> {{ submitText }} </el-button>
        </span>
      </slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ modelValue: boolean; title: string; width?: string; cancelText?: string; submitText?: string }>(), {
  width: '40%',
  cancelText: '取消',
  submitText: '确定'
})

const emits = defineEmits(['cancel', 'submit'])

function handleCancel() {
  emits('cancel')
}
function handleSubmit() {
  emits('submit')
}
</script>

<style></style>
