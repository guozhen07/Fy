import Axios from 'axios'

const HTTP = Axios.create({
  timeout: 10000
})

// 请求拦截器
HTTP.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

// 返回拦截器
HTTP.interceptors.response.use((res) => {
  return res
}, (error) => {
  return Promise.reject(error)
})

export default HTTP
