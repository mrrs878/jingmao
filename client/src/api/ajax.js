import axios from 'axios'
import router from '../route/router'

axios.interceptors.request.use(
  config => {
    if (localStorage.token) {
      config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  res => {
    if (res.data.code === 500) {
      return Promise.reject(res)
    }
    return res
  },
  err => {
    if (err.response.status === 401) {
      router.replace('/')
    }
    return Promise.reject(err.response.data)
  }
)

export default function ajax(url = '', data = {}, config = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    let promise = {}

    switch (method) {
      case 'GET':
        let dataStr = ''
        Object.keys(data).forEach(key => {
          dataStr += `${key}=${data[key]}&`
        })
        if (dataStr !== '') {
          dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
          url = `${url}?${dataStr}`
        }
        promise = axios.get(url, config)
        break
      case 'POST':
        promise = axios.post(url, data, config)
        break
      case 'DELETE':
        promise = axios.delete(url, data, config)
        break
      case 'PUT':
        promise = axios.put(url, data, config)
        break
      default:
        break
    }

    promise
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}
