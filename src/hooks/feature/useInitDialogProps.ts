import { callback } from '@/types/base'
import { reactive, watch } from 'vue'

type dialogType = 'add' | 'edit'
const useInitDialogProps = (title: string, width?: string, cancelText?: string, submitText?: string) => {
  const data: {
    title: string
    modelValue: boolean
    row: Record<string, unknown> | null
    type: dialogType
    width?: string
    cancelText?: string
    submitText?: string
  } = {
    title,
    modelValue: false,
    type: 'add',
    row: null
  }
  //TODO: 待优化
  if (width !== void 0) {
    Reflect.set(data, 'width', width)
  }
  if (cancelText !== void 0) {
    Reflect.set(data, 'cancelText', cancelText)
  }
  if (submitText !== void 0) {
    Reflect.set(data, 'submitText', submitText)
  }
  const dialogProps = reactive(data)

  function toggleDialogVisible() {
    dialogProps.modelValue = !dialogProps.modelValue
  }

  function handleChange(title: string = '', type: dialogType = 'add', row: typeof data['row'] = null): void {
    dialogProps.title = title
    dialogProps.type = type
    dialogProps.row = row
  }

  function handleDialogAdd(title: string) {
    handleChange(title)
    toggleDialogVisible()
  }

  function handleDialogEdit(title: string, row: Record<string, unknown>): void {
    handleChange(title, 'edit', row)
    toggleDialogVisible()
  }

  function watchHiddenInitStatus(callback: callback = handleChange) {
    watch(
      () => dialogProps.modelValue,
      (bool) => {
        if (!bool) {
          callback()
        }
      }
    )
  }

  return { dialogProps, toggleDialogVisible, handleDialogAdd, handleDialogEdit, watchHiddenInitStatus }
}

export default useInitDialogProps
