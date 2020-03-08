export function processImage(src) {
  return src === ',' ? '' : src.slice(0, src.indexOf(','))
}

export function processMetre(m) {
  if (m > 999) {
    return `${(m / 1000).toFixed(2)}km`
  } else {
    return `${m}m`
  }
}

export function processDistanceTime(s) {
  if (s < 3600) {
    return `${Math.floor(s / 60)}分钟`
  } else if (s >= 3600) {
    return `${(s / 3600).toFixed(1)}小时`
  }
}

export function processSomeImages(src): string[] {
  if (!src) return []
  src = src.slice(0, -1)
  return src.split(',')
}
