export interface formItem {
  slot?: string
  field: string
  label: string
  type: 'input' | string
  disabled?: boolean
  placeholder?: string
}

export interface formWrapper {
  mode: Record<string, unknown>
  rules: Record<string, unknown>
  wrapper: Array<formItem>
  labelWidth: number
}

export interface formInstance {
  handleSubmit: (...args: any[]) => Promise<Record<string, unknown>>
}
