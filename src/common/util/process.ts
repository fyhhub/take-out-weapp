export function processImage(src) {
  return src === "," ? "" : src.slice(0, src.indexOf(","));
}

export function processMetre(m) {
  if (m > 999) {
    return `${(m / 1000).toFixed(2)}km`;
  } else {
    return `${m}m`;
  }
}

export function processDistanceTime(s) {
  if (s < 3600) {
    return `${Math.floor(s / 60)}分钟`;
  } else if (s >= 3600) {
    return `${(s / 3600).toFixed(1)}小时`;
  }
}

export function processSomeImages(src): string[] {
  if (!src) return [];
  src = src.slice(0, -1);
  return src.split(",");
}

export function formatDate(now) {
  now = parseInt(now);
  now = new Date(now)
  let year = now.getFullYear(); //取得4位数的年份
  let month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
  let date = now.getDate(); //返回日期月份中的天数（1到31）
  return year + "-" + month + "-" + date;
}
