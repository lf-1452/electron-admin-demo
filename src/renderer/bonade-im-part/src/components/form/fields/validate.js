export function isMobileNumber(rule, value, callback) {
  if (!value) {
    return new Error('请输入电话号码')
  } else {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    const isPhone = reg.test(value)
    value = Number(value) // 转换为数字
    if (typeof value === 'number' && !isNaN(value)) { // 判断是否为数字
      value = value.toString() // 转换成字符串
      if (value.length < 0 || value.length > 12 || !isPhone) { // 判断是否为11位手机号
        callback(new Error('手机号码格式如:138xxxx8754'))
      } else {
        callback()
      }
    } else {
      callback(new Error('请输入电话号码'))
    }
  }
}

export function isTelOrFax(rule, value, callback) {
  if (!value) {
    callback()
  } else {
    const reg = /^(\d{3,4}-)?\d{7,8}$/
    const isTel = reg.test(value)
    if (value.length < 10 || value.length > 13 || !isTel) { // 判断传真字符范围是在10到13
      callback(new Error('座机或传真格式如:0376-1234567'))
    } else {
      callback()
    }
  }
}

export default {
  phone: [{
    validator: isMobileNumber,
    trigger: 'blur'
  }],
  landLine: [{
    validator: isTelOrFax,
    trigger: 'blur'
  }],
  email: [{
    type: 'email',
    message: '请输入正确的邮箱地址',
    trigger: ['blur', 'change']
  }]
}
