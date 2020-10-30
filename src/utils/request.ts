import axios from 'axios'
import { Modal } from 'antd';
import NProgress from 'nprogress'
import { get } from "./storage";
// create an axios instance
const service = axios.create({
    baseURL: process.env.REACT_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})
// request interceptor
service.interceptors.request.use(
    config => {
        NProgress.start();
        let token = get('token')
        config.headers['Authorization'] = 'Bearer ' + token;
        return config
    },
    error => {
        NProgress.done();
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        NProgress.done();
        if (response.status === 200) {
            if (window.location.pathname !== '/login') {
                if (response.data.code === 4003) {
                    Modal.error({
                        title: '你没有权限访问'
                    })
                    setTimeout(() => {
                        window.location.href = '/login'
                    }, 1000)
                }
            }
            return response;
        } else {
            Modal.error({
                title: '网络请求错误'
            });
            return Promise.reject(new Error('Error'))
        }
    },
    error => {
        Modal.error({
            title: '网络请求错误'
        });
        NProgress.done();
        return Promise.reject(error)
    }
)

export default service
