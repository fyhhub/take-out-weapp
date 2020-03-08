import { catchError } from './toast'


export function catchAsyncError(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
  const oldValue = descriptor.value
  descriptor.value = async function () {
    try {
      return await oldValue.apply(this, arguments)
    } catch (error) {
      catchError(error)
    }
  }
  return descriptor
}
