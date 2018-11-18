<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex
      xs12
      sm8
      md6>
      <p>当前语言 {{ locale }}：{{ $t('hello.text') }}</p>
      <div>
        <v-btn 
          color="success" 
          @click="setLocale('zh')">中文</v-btn>
        <v-btn 
          color="info" 
          @click="setLocale('en')">英文</v-btn>
        <v-btn
          color="primary"
          nuxt 
          to="/">返回</v-btn>  
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Cookie from 'js-cookie'

export default {
  head() {
    return {
      title: 'i18n',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '' },
        { hid: 'description', name: 'description', content: '' }
      ]
    }
  },
  computed: {
    locale() {
      return this.$store.state.i18n.locale
    }
  },
  methods: {
    setLocale(locale) {
      Cookie.set('locale', locale)
      location.reload()
    }
  }
}
</script>
