import { objectToParams } from './shard'
import type { BaseResponse } from '@/types/baseResponse'
enum requestType {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}
const successCode = [200, 0]
export type params = Record<string, any>
type postType = 'application/x-www-form-urlencoded' | 'application/json' | 'multipart/form-data'
const urlArray = ['http://localhost:3363/']
const baseUrl = urlArray[0]

function isSpecifyResponseType(contentType: string, reg: RegExp): boolean {
  return reg.test(contentType)
}
// TODO: Blob ArrayBuffer formData 的判断
// type requestBodyType = ArrayBuffer | Blob | FormData | string | Record<string, any>
// function isResponseText(contentType: string): boolean {
//   return isSpecifyResponseType(contentType, /text\/html/)
// }

function isResponseJson(contentType: string): boolean {
  return isSpecifyResponseType(contentType, /application\/json/)
}

function requestInterface(data: RequestInit) {
  const token = localStorage.getItem('token')
  if (token) {
    !data.headers && (data.headers = {})
    Reflect.set(data.headers, 'TOKEN', token)
  }
}

function request<T>(url = '', data: RequestInit = { method: 'GET' }): Promise<BaseResponse<T>> {
  const pathUrl = baseUrl + url
  // 请求拦截
  requestInterface(data)
  return new Promise((resolve, reject) => {
    fetch(pathUrl, data)
      .then((response) => {
        const ContentType = response.headers.get('content-type') || ''
        if (isResponseJson(ContentType)) {
          return response.json()
        }
        return response.text()
      })
      .then((jsonData) => {
        // 全局状态判断
        try {
          const val: BaseResponse<T> = jsonData
          // 判断状态码
          if (successCode.includes(Number(val.code))) {
            resolve(val)
          } else {
            // 失败之后的判断等
            if (val.code === 401) {
              window.localStorage.removeItem('token')
              // history.push('/login');
              return
            }
            return reject(val)
          }
        } catch (e) {
          // string
          console.log(pathUrl, jsonData, e)
          resolve(jsonData)
        }
      })
      .catch((e) => {
        console.log(e)
      })
  })
}

function requestMethod<T>(url: string, type: requestType, requestInit: RequestInit): Promise<BaseResponse<T>> {
  return request(url, Object.assign({ method: type }, requestInit))
}

function forwardRequest<T>(url: string, requestInit: RequestInit = {}, ContentType?: postType, type?: requestType): Promise<BaseResponse<T>> {
  requestInit.headers = Object.assign({}, requestInit.headers || {}, {
    'Content-Type': ContentType
  })
  return request(url, Object.assign({ method: type || requestType.POST }, requestInit))
}

function getFullPath(params: params | undefined, url: string): string {
  let enCodeParams = objectToParams(params)
  enCodeParams = enCodeParams.trim() !== '' ? `?${enCodeParams}` : ''
  return url + enCodeParams
}

function forwardObject(params: params | undefined, requestInit: RequestInit = {}) {
  try {
    requestInit.body = JSON.stringify(params)
  } catch (err) {
    console.log('Post params error:', err)
  }
}

export function Get<T, U extends params = params>(url: string, params?: U, requestInit: RequestInit = {}): Promise<BaseResponse<T>> {
  const fullPath = getFullPath(params, url)
  return requestMethod(fullPath, requestType.GET, requestInit)
}

export function Post<T, U extends params = params>(url: string, params?: U, requestInit: RequestInit = {}): Promise<BaseResponse<T>> {
  forwardObject(params, requestInit)
  return forwardRequest(url, requestInit, 'application/json')
}
export function Put<T, U extends params = params>(url: string, params?: U, requestInit: RequestInit = {}): Promise<BaseResponse<T>> {
  forwardObject(params, requestInit)
  return forwardRequest(url, requestInit, 'application/json', requestType.PUT)
}

export function Delete<T, U extends params = params>(url: string, params?: U, requestInit: RequestInit = {}): Promise<BaseResponse<T>> {
  const fullPath = getFullPath(params, url)
  return requestMethod(fullPath, requestType.DELETE, requestInit)
}

export function FormDataPost<T>(url: string, params?: params, requestInit: RequestInit = {}): Promise<BaseResponse<T>> {
  // formData形式
  const fullPath = getFullPath(params, url)
  return forwardRequest(fullPath, requestInit, 'application/x-www-form-urlencoded')
}
export function MultiPost<T>(url: string, params?: params, requestInit: RequestInit = {}): Promise<BaseResponse<T>> {
  // new FormData形式
  const formData = new FormData()
  if (params) {
    Object.keys(params).forEach((key) => {
      formData.append(key, params[key])
    })
  }
  requestInit.body = formData
  return forwardRequest(url, requestInit, 'multipart/form-data')
}
