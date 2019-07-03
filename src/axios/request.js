import axios from 'axios'
// import $store from '@/store/index'
// baseUrl引入：
import { baseUrl } from '@/config/env'

// create an axios instance
const baseConfig = {
  baseURL: baseUrl, // api的base_url
  withCredentials: true,
  timeout: 10000, // request timeout
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     Accept: 'application/json'
  //   },
  headers: {
    'Content-Type': 'application/json',
    'auth_key': 'c592e5258fdb11e99e34a44cc8015d9f',
    'token': 'd1b592f5ca6041b19547060f279e1be1'
  }
}

const service = axios.create(baseConfig)

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// respone interceptor
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
