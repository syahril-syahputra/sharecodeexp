export function checkValue(val) {
  return val ? val : '-'
}

export function timeoutPromise(ms, promise) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('promise timeout'))
    }, ms)
    promise.then(
      (res) => {
        clearTimeout(timeoutId)
        resolve(res)
      },
      (err) => {
        clearTimeout(timeoutId)
        reject(err)
      }
    )
  })
}

export function getValue(val) {
  if (typeof val == 'object') {
    return val.value
  } else if (typeof val == 'string') {
    return val
  } else {
    return ''
  }
}