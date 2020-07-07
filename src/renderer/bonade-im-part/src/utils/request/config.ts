import { AxiosBaseConfig } from './types'

enum URL {
    dev = 'http://dev',
    pro = 'http://pro'
}

// 默认配置
export const baseConfig: AxiosBaseConfig = {
    method: 'get',  // 请求方法
    url: '',   // 请求地址
    baseURL: process.env.NODE_ENV == 'development' ? URL.dev : URL.pro, // 请求前缀
    proxy: {},  // 跨域代理
    params: {}, // url参数
    data: {}, // body参数
    timeout: 10000,  // 超时时间
    headers: {},   // 请求头
    responseType: 'json' // 服务器响应类型
}