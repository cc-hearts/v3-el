import { paginationBase } from '@/types'
import { Get } from '@/utils/request'
import type { requestTableData } from '@/types/baseResponse'
export function getDictList(data: paginationBase) {
  return Get<requestTableData>('api/dict/getDictList', data, {
    headers: {
      token: 'a46143ad1efb3e0e001584eecfd82abf'
    }
  })
}
