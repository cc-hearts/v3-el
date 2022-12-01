import { paginationBase } from '@/types'
import { Get, Post } from '@/utils/request'
import type { requestTableData } from '@/types/baseResponse'
import { addDictInstance } from '@/types/dict'
const token = '97ffdff3e77875bdfb7e5abebba97392'
export function getDictList(data: paginationBase) {
  return Get<requestTableData>('api/dict/getDictList', data, {
    headers: {
      token
    }
  })
}

export function getDictMapList(data: paginationBase & { dictKey: string }) {
  return Get<requestTableData>('api/dict/getDictMapList', data, {
    headers: {
      token
    }
  })
}

export function addDict(data: addDictInstance) {
  return Post('api/dict/addDict', data, {
    headers: {
      token: token
    }
  })
}

export function addDictMap(data) {
  return Post('api/dict/addDictMap', data, {
    headers: {
      token: token
    }
  })
}
