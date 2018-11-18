import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: store.state.i18n.locale,
    fallbackLocale: 'zh',
    messages: {
      zh: require('~/static/locales/zh.json'),
      en: require('~/static/locales/en.json')
    }
    // path(link) {
    //   console.log(this.locale, this.fallbackLocale)
    //   if (this.locale === this.fallbackLocale) {
    //     return `/${link}`
    //   }
    //   return `/${this.locale}/${link}`
    // }
  })
}
