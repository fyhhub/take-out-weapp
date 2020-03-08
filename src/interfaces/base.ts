export interface JSONResponse<T> {
  code: number
  message: string
  result: T
}
