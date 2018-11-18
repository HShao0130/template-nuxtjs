export default ({ isHMR, req, route, store, app }) => {
  if (isHMR) return

  if (req) {
    if (route.name) {
      const { headers } = req
      let locale = null

      if (headers.cookie) {
        const cookies = headers.cookie
          .split(/[;] */)
          .reduce((result, pairStr) => {
            const arr = pairStr.split('=')
            if (arr.length === 2) result[arr[0]] = arr[1]
            return result
          }, {})

        locale = cookies.locale
      }

      if (!locale) {
        locale = app.i18n.fallbackLocale
      }

      store.commit('i18n/setLocale', locale)
      app.i18n.locale = locale
    }
  }
}
