
// 获取
export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (error) {
    return res
  }
}
// 修改
export function setItem (key, value) {
  if (typeof value === 'object') { // 复合数据类型
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}

// 删除本地存储其中一个
export function removeItem (key) {
  window.localStorage.removeItem(key)
}

// 删除所有本地存储
export function clearItem () {
  window.localStorage.clearItem()
}
