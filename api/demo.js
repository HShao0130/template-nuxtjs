import request from '@/utils/request'

export const demoApi = {
  // 列表
  list(data) {
    return request.get('/mock/5ab24b2f69c2923075ef5ed8/example/list', data)
  }
}
