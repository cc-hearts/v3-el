import { paginationBase } from '@/types'
import { Get, Post, Delete, Put } from '@/utils/request'
import type { requestTableData } from '@/types/baseResponse'
import { addDictInstance } from '@/types/dict'
const token = '900da29ea2a68d8963f1c624f259b255'
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

export function updateDict(data) {
  return Put(`api/dict/updateDict`, data, {
    headers: {
      token: token
    }
  })
}

export function updateDictMap(data) {
  return Put(`api/dict/updateDictMap`, data, {
    headers: {
      token: token
    }
  })
}

export function deleteDict(id: number) {
  return Delete(
    `api/dict/deleteDict/${id}`,
    {},
    {
      headers: {
        token: token
      }
    }
  )
}

export function deleteDictMap(id: number) {
  return Delete(
    `api/dict/deleteDictMap/${id}`,
    {},
    {
      headers: {
        token: token
      }
    }
  )
}
