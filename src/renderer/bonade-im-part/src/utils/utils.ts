/**
 * @param {String} key 要验证的key值
 * @param {String|Number} value 要验证的值
 * @param {Array} list 用来验证的列表
 * @description 验证value是否存在在当前数组对象列表中
 */
export const hasValue = (key: string | number, value: string | number, list: any): boolean => {
    if (list.length <= 0) return false
    for (let i in list) {
        if (list[i][key] === value) return true
    }

    return false
}