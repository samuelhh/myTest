import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import { Message } from 'element-ui'
// import { getStorage } from '@/utils/storage'
// import { clearLocalStorage } from '@/utils/tools'
// import appSettings from '@/config/settings'

const config = {
    // baseURL: appSettings.baseUrl,
    baseURL:'',
    transformResponse: [function (data) {
        return data
    }],
    paramsSerializer: (params) => {
        return qs.stringify(params)
    },
    timeout: 50000,
    withCredentials: true,
    responseType: 'json',
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: 2000,
    validateStatus: (status) => {
        return status >= 200 && status < 510
    }
}

const service = axios.create(config);
// let loadinginstace;

// http请求拦截器
service.interceptors.request.use(config => {
    //loadinginstace = Loading.service({ fullscreen: true })
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDc2NzE5ODUsInVzZXIiOiJ7XCJjbGFzc0lkXCI6MCxcImNsYXNzTmFtZVwiOlwiXCIsXCJyb2xlQ29kZVwiOlwic3VwZXJfYWRtaW5cIixcInNjaG9vbElkXCI6MCxcInNjaG9vbE5hbWVcIjpcIlwiLFwidXNlcklkXCI6MTAwMDAwMDAwMDAwMDAwMDAwLFwidXNlckxvZ2luXCI6XCJhZG1pbmlzdHJhdG9yXCIsXCJ1c2VyTmFtZVwiOlwi57O757uf566h55CG5ZGYXCIsXCJ1c2VyVHlwZVwiOjB9In0.HsXHtBb2MeBtYvcMUBNXBGXwXOcHDNbJuHcfrHCDwSc";
    if (token) {
        // config.headers.common.Authorization = 'Bearer ' + token
        config.headers.common.token = token
    }
    //下载文件处理  
    if (config.download) {
        config.responseType = 'blob';
    }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // config.headers['Set-Cookie'] = 'SameSite=None; Secure'
    config.transformRequest = [function (data) {
        // 在请求之前对data传参进行格式转换
        data = qs.stringify(data)
        return data
    }]
    return config
}, error => {
    //console.log(error)
    //loadinginstace.close()
    Message.error({ message: '加载超时' })
    return Promise.reject(error)
})


// http响应拦截器
service.interceptors.response.use(response => {
    // console.log(response)
    //loadinginstace.close()
    if (response.status === 429) { //频繁请求处理
        response = {
            data: {
                code: 429,
                msg: '请勿频繁重复点击'
            }
        }
        return response
    }
    switch (response.status) {
        case 401:
            //token 过期
            Message({
                type: "error",
                showClose: false,
                message: '未授权，请重新登录！',
                duration: 1500,
                onClose: function () {
                    //清空浏览器数据
                    // clearLocalStorage();
                    router.replace({
                        path: '/login'
                    })
                }
            })
            break;
        case 403:
            //没有页面操作权限，直接跳转到404页面
            Message({
                type: "error",
                showClose: false,
                message: '很抱歉,您没有该页面的操作权限！',
                duration: 100,
                onClose: function () {
                    router.replace({
                        path: '/',
                    })
                }
            })
            break;

        default:
            break;
    }
    return response
}, error => {
    // loadinginstace.close()
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '错误请求'
                break
            case 401:
                error.message = '未授权，请重新登录'
                break
            case 403:
                error.message = '拒绝访问'
                break
            case 404:
                error.message = '请求错误，未找到该资源'
                break
            case 405:
                error.message = '请求方法为允许'
                break
            case 408:
                error.message = '请求超时'
                break
            case 500:
                error.message = '服务端错误'
                break
            case 501:
                error.message = '网络未实现'
                break
            case 502:
                error.message = '网络错误'
                break
            case 503:
                error.message = '服务不可用'
                break
            case 504:
                error.message = '网络超时'
                break
            case 505:
                error.message = 'http版本不支持该请求'
                break
            default:
                error.message = `连接错误${error.response.status}`
        }
    } else {
        error.message = '网络出现问题，请稍后再试！'
    }
    Message.error({ message: error.message })

    return Promise.reject(error)

})

export default service