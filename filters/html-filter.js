// 首字母大写
export const firstUpperCase = str => {
  return !str
    ? str
    : str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase())
}
