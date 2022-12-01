export type mergeObject<T, U> = {
  [k in keyof T | keyof U]: k extends keyof T ? T[k] : k extends keyof U ? U[k] : undefined
}
