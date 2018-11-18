export const state = () => ({
  locales: [
    {
      code: 'en',
      name: 'US'
    },
    {
      code: 'zh',
      name: '中文'
    }
  ],
  locale: 'zh'
})

export const mutations = {
  setLocale(state, locale) {
    if (state.locales.find(el => el.code === locale)) {
      state.locale = locale
    }
  }
}
