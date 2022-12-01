<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import {
  onMounted,
  reactive,
  withDefaults,
  ref
} from 'vue'
type typeClick = 'primary' | 'dashed' | 'danger' | 'default' | 'flat'

type size = 'mini' | 'small' | 'default' | number

type classBtnType = typeClick extends typeClick ? `btn__${typeClick}` : never
interface Props {
  type?: typeClick
  disabled?: boolean
  size?: size
}

const clickType = ref<classBtnType>()

const emit = defineEmits(['click'])

// 设置默认值的情况
const props = withDefaults(defineProps<Props>(), {
  size: 'small',
  type: 'default',
  disabled: false
})

const style = reactive<
    {
      '--x': string
      '--y': string
      '--fontSize': string
    } & CSSProperties
    >({
  '--fontSize': '1em',
  '--x': '',
  '--y': ''
})

function btnClick(e: MouseEvent) {
  if (props.disabled) return

  const target = e.target as HTMLButtonElement
  if (target) {
    style['--x'] = e.offsetX + 'px'
    style['--y'] = e.offsetY + 'px'
  }
  emit('click', e)
}

onMounted(() => {
  clickType.value = `btn__${props.type || 'default'}`
})
</script>

<template>
  <button
      :class="['btn', clickType, props.disabled ? 'btn--disabled' : '']"
      ref="btn"
      @click="btnClick"
      :style="style"
      :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss">
@import "@/assets/scss/components/button/_button.scss";
</style>
