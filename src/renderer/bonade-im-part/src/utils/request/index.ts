import axios from 'axios'
import { Notification } from 'element-ui';
import { AxiosPromise, AxiosBaseConfig, Method } from './types'
import { baseConfig } from './config'


class AxiosRequest {
    constructor() { }

    // 拦截器
    private interceptor(instance: any) {
        // 请求前
        instance.interceptors.request.use((c: any) => {
            return c;
        }, (err: any) => {
            return Promise.reject(err)
        })


        // 请求后
        instance.interceptors.response.use((res: any) => {
            return res
        }, (err: any) => {
            Notification.error({
                title: "请求失败",
                message: err,
                position: "bottom-right"
            });
            return Promise.reject(err)
        })
    }

    // 有data -> post/put/patch
    private HasData(method: Method, url: string, data?: any, config?: AxiosBaseConfig) {
        const o = Object.assign(config || {}, { method, url, data })
        return this.request(o)
    }

    // 没有data -> get/delete/head
    private NoneData(method: Method, url: string, config?: AxiosBaseConfig) {
        const o = Object.assign(config || {}, { method, url })
        
        return this.request(o)
    }



    // 请求方法
    // axios.request(config)
    // axios.get(url[, config])
    // axios.delete(url[, config])
    // axios.head(url[, config])
    // axios.post(url[, data[, config]])
    // axios.put(url[, data[, config]])
    // axios.patch(url[, data[, config]])
    public request(options: AxiosBaseConfig) {
        const instance = axios.create()
        options = Object.assign(baseConfig, options)
        this.interceptor(instance)
        return instance(options)
    }

    public get(url: string, config?: AxiosBaseConfig) {
        return this.NoneData('get', url, config)
    }

    public delete(url: string, config?: AxiosBaseConfig) {
        return this.NoneData('delete', url, config)
    }

    public head(url: string, config?: AxiosBaseConfig) {
        return this.NoneData('head', url, config)
    }

    public post(url: string, data?: any, config?: AxiosBaseConfig) {
        return this.HasData('post', url, config)
    }

    public put(url: string, data?: any, config?: AxiosBaseConfig) {
        return this.HasData('put', url, config)
    }

    public patch(url: string, data?: any, config?: AxiosBaseConfig) {
        return this.HasData('patch', url, config)
    }



    // 并发
    public all(...request: any[]) { }
}


const api = new AxiosRequest()
export default api