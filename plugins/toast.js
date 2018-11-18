// toast插件
import 'vue2-toast/lib/toast.css'
import Vue from 'vue'
import Toast from 'vue2-toast'

Vue.use(Toast, {
  type: 'center',
  duration: 3000,
  wordWrap: true
})
