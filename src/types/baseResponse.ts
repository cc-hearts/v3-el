export interface BaseResponse<T> {
  code: number
  message: string
  data?: T
  path?: string
  timestamp?: string
}
export interface requestTableData<T = any> {
  columns: Array<{ field: string; title: string }>
  total: number
  list: T
}
