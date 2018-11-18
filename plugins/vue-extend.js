import Vue from 'vue'
import filters from '~/filters'
import EmptyBox from '~/components/common/empty'
import InfiniteLoading from 'vue-infinite-loading'

// filters
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

// components
Vue.component(EmptyBox.name, EmptyBox)
Vue.component('InfiniteLoading', InfiniteLoading)

// mixins
Vue.mixin({
  computed: {}
})
