import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import router from './router'
import { TUser } from '@/types'

// 请求拦截器
axios.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    // 抓取 token（从状态管理中读取 token）
    let user: TUser = window.localStorage.getItem('user')
    user = user ? JSON.parse(user) : ''

    // 将 token 携带到请求头
    config.headers = {
      token: user?.token
    }
    // config.headers = {
    //   token: 'eyjhbgclsjdflkjadjfoshiguasiufhksadhfiuasfksadifhsadifhsadiuhfius'
    // }

    // 显示 loading

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  (response: AxiosResponse<any>): AxiosResponse<any> => {
    // 如果 token 过期，跳转到登录页，并保留当前地址
    if (response.data.err === 2 && !router.currentRoute.fullPath.includes('/login')) {
      router.push({
        path: '/login',
        query: {
          path: router.currentRoute.fullPath
        }
      })
    }

    // 关闭 loading

    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

// 对外暴露 axios
export default axios
