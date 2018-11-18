import axios from 'axios'
import Vue from 'vue'
import Toast from 'vue2-toast'
import privateConfig from '../private.config'
Vue.use(Toast, {
  type: 'center',
  duration: 3000,
  wordWrap: true
})
const vue = new Vue()
const $toast = vue.$toast

// API 服务器地址
const apiPath = privateConfig.apiPath

// axios 默认配置
axios.defaults.timeout = 60000
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// 请求时的拦截器
axios.interceptors.request.use(
  config => {
    // 这里可以加一些动作, 比如来个进度条开始动作
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 请求完成后的拦截器
axios.interceptors.response.use(
  response => response,
  error => {
    // 这里我们把错误信息捕捉, 后面就不需要写 catch 了
    return Promise.resolve(error.response)
  }
)

function checkStatus(response) {
  // 如果 http 状态码正常, 则直接返回数据
  if (response.status === 200 || response.status === 304) {
    // 这里, 如果不需要除 data 外的其他数据, 可以直接 return response.data, 这样可以让后面的代码精简一些
    if (response.data.code === 200) {
      return {
        code: response.data.code,
        data: response.data.data
      }
    }
    return {
      code: response.data.code,
      data: response.data.message
    }
  }
  // 异常状态下, 把错误信息返回去
  return {
    code: response.status,
    data: response.statusText
  }
}

// 处理来自后端的错误
function checkCode(res) {
  if (res.code !== 200) {
    // 默认 toast 显示错误信息
    $toast(`${res.code}. ${res.message}`)
  }
  return res
}

/**
 * 封装好的 post 和 get 方法
 * @params {String} url -- 请求路径
 * @params {Object} data  -- 请求所带的参数
 * @returns {Promise} -- 返回一个 promise 对象
 */

export default {
  post(url, data) {
    return axios({
      method: 'post',
      url: apiPath + url,
      data: data,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
      .then(checkStatus)
      .then(res => {
        return checkCode(res)
      })
  },
  get(url, params) {
    return axios({
      method: 'get',
      url: apiPath + url,
      params
    })
      .then(checkStatus)
      .then(res => {
        return checkCode(res)
      })
  }
}
