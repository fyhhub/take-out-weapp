export function check(res: any) {
  if (!res) {
    throw new Error('data error')
  }
  if (res.errMsg && res.errMsg.indexOf('ok') > -1) {
    return true
  } else {
    throw new Error(res.errMsg)
  }
}
export function validate(res: any) {
  return res && res.data && res.data.code === 200
}
