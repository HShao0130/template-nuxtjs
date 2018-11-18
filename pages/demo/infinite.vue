<template>
  <div class="infinite">
    <v-card
      v-for="item in list" 
      :key="item.id"
      class="list-item">
      <!-- 使用 vuetify 自带图片组件可以实现懒加载 -->
      <!-- <v-img
        :lazy-src="lazyImg"
        :src="item.image"
        aspect-ratio="2.75"/> -->

      <!-- 否则自己自定义 -->
      <div 
        v-lazy:background-image="item.image" 
        class="imgbox item-image"/>

      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{ item.title }}</h3>
          <div>{{ item.cparagraph }}</div>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-btn 
          flat 
          color="orange">Share</v-btn>
        <v-btn 
          flat 
          color="orange">Explore</v-btn>
      </v-card-actions>
    </v-card>
    <no-ssr>
      <infinite-loading @infinite="infiniteHandler" />
    </no-ssr>
  </div>
</template>

<script>
import { demoApi } from '@/api/demo'
const lazyImg = require('~/assets/img/loading.gif')

export default {
  head() {
    return {
      title: 'infinite scroll',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '' },
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  data() {
    return {
      page: 1,
      pageSize: 10,
      lazyImg: lazyImg,
      list: []
    }
  },
  methods: {
    async infiniteHandler($state) {
      const { code, data } = await demoApi.list({
        page: this.page,
        pageSize: this.pageSize
      })
      if (code === 200) {
        if (data.array.length) {
          this.page += 1
          this.list.push(...data.array)
          $state.loaded()
        } else {
          $state.complete()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item {
  margin-bottom: 20px;
  .item-image {
    width: 100%;
    padding-top: 40%;
  }
}
</style>
