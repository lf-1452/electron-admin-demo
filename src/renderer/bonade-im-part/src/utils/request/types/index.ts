// 限定方法可选
export type Method = 'request' | 'REQUEST' |
    'get' | 'GET' |
    'delete' | 'DELETE' |
    'head' | 'HEAD' |
    'post' | 'POST' |
    'put' | 'PUT' |
    'patch' | 'PATCH'


// 请求参数
export interface AxiosBaseConfig {
    url?: string // 请求地址
    method?: Method// 请求方法
    baseURL?: string // 地址前缀
    params?: any // url参数
    data?: any // body参数
    headers?: any  // 请求头
    responseType?: XMLHttpRequestResponseType  // 服务器响应的数据类型
    timeout?: number // 超时时间
    withCredentials?: boolean // 跨域请求是否需要凭证
    proxy?: any // 
}


// 响应返回
export interface ResponseTypes {
    data: object
    status: number | string
    statusText: string
    headers: object
    config: object
}


export interface AxiosPromise extends Promise<AxiosBaseConfig> { }