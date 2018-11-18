// 图片懒加载库
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

const loading = require('../assets/img/loading.gif')
const error = require('../assets/img/404.png')

Vue.use(VueLazyload, {
  preLoad: 1.3,
  throttleWait: 200,
  listenEvents: ['scroll'],
  error: error,
  loading: loading,
  attempt: 1
})
