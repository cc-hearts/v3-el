import { reactive } from 'vue'

const useInitFormProps = <M extends Record<string, any>, T extends unknown>(mode: M, wrapper: T[] = [], rules: Record<string, unknown> = {}) => {
  const formProps = reactive({
    mode: mode || {},
    wrapper,
    rules
  })

  function handleChangeFormValue(data: { event: unknown; field: keyof typeof mode }) {
    const { field, event } = data
    Reflect.set(formProps.mode, field, event)
  }
  return { formProps, handleChangeFormValue }
}
export default useInitFormProps
