export interface columns {
  width?: number | string
  title: string
  field: string
  align?: 'left' | 'center' | 'right'
  slot?: { name: string }
}

export interface tableProps<T = any> {
  columns: Array<columns>
  dataSource: Array<T>
  border: boolean
  align: 'left' | 'center' | 'right'
}
