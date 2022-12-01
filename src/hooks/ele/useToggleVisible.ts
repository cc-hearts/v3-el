export const useToggleVisible = <U extends Record<string, unknown>>(
  emits: (event: any, ...args: any[]) => void,
  props: U,
  _visible: keyof U = 'modelValue',
  _events: string = 'update:modelValue'
) => {
  return function () {
    emits(_events, props[_visible])
  }
}
