import { reactive } from 'vue'

const useInitDrawerProps = (title: string, appendToBody = false) => {
  const drawerProps = reactive<{ title: string; modelValue: boolean; appendToBody: boolean; row: Record<string, unknown> | null }>({
    title,
    modelValue: false,
    appendToBody,
    row: null
  })

  function toggleDrawerVisible() {
    drawerProps.modelValue = !drawerProps.modelValue
  }

  function handleChange(title: string, row: typeof drawerProps['row'] = null) {
    drawerProps.title = title
    drawerProps.row = row
    toggleDrawerVisible()
  }

  // function handleAdd(title: string) {
  //   handleChange(title)
  //   toggleDrawerVisible()
  // }

  // function handleEdit(title: string, data: Record<string, unknown>) {
  //   handleChange(title, data)
  //   toggleDrawerVisible()
  // }

  return { drawerProps, toggleDrawerVisible, handleChange }
}
export default useInitDrawerProps
