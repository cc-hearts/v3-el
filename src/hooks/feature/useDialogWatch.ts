import { callback } from '@/types/base'
import { watch } from 'vue'
function clearModeData(mode: Record<string, any>, defaultMode: Record<string, unknown> = {}) {
  Object.keys(mode).forEach((key) => {
    switch (Object.prototype.toString.call(mode[key])) {
      case '[object Object]':
        mode[key] = clearModeData(mode[key], defaultMode)
        break
      case '[object Array]':
        mode[key] = defaultMode[key] ?? []
        break
      case '[object Date]':
      case '[object String]':
        mode[key] = defaultMode[key] ?? ''
        break
      case '[object Number]':
        mode[key] = defaultMode[key] ?? 0
        break
      case '[object Boolean]':
        mode[key] = defaultMode[key] ?? false
        break
      case '[object Map]':
        mode[key].clear()
        break
      case '[object Set]':
        mode[key].clear()
        break
    }
  })
}
export const useWatchDialogHiddenClear = <T>(
  watcher: () => T,
  bool: T,
  mode: Record<string, unknown>,
  defaultMode?: Record<string, unknown>,
  callback?: callback
) => {
  watch(watcher, (res: T) => {
    if (res === bool) {
      ;(callback ?? clearModeData)(mode, defaultMode)
    }
  })
}
function setFormData(mode: Record<string, unknown>, formData: Record<string, unknown>, filterData: Record<string, callback>) {
  Object.keys(formData).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(mode, key)) {
      mode[key] = key in filterData ? filterData[key](formData[key]) : formData[key]
    }
  })
}
export const useEchoFormDialogData = <T>(
  watcher: () => T,
  val: T,
  mode: Record<string, unknown>,
  getFormData: () => Record<string, unknown> = () => ({}),
  filterData: Record<string, callback> = {},
  callback?: callback
) => {
  watch(watcher, (res) => {
    if (res === val) {
      const formData = getFormData()
      ;(callback ?? setFormData)(mode, formData, filterData)
    }
  })
}
