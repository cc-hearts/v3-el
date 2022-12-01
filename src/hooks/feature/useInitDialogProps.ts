import { reactive } from 'vue'
const useInitDialogProps = (title: string, width?: string, cancelText?: string, submitText?: string) => {
  const data: { title: string; modelValue: boolean; row: Record<string, unknown> | null; width?: string; cancelText?: string; submitText?: string } = {
    title,
    modelValue: false,
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

  function handleChange(title: string, row: typeof data['row'] = null): void {
    dialogProps.title = title
    dialogProps.row = row
  }

  function handleDialogAdd(title: string) {
    handleChange(title)
    toggleDialogVisible()
  }

  function handleDialogEdit(title: string, row: Record<string, unknown>): void {
    handleChange(title, row)
    toggleDialogVisible()
  }

  return { dialogProps, toggleDialogVisible, handleDialogAdd, handleDialogEdit }
}

export default useInitDialogProps
