const privateConfig = require('./private.config.js')

module.exports = {
  mode: 'universal',
  env: {
    prod: privateConfig.prod
  },

  /*
  ** 全局样式
  */
  css: [
    // '~/assets/style/app.styl'
    'vuetify/dist/vuetify.css',
    '~/assets/sass/app.scss'
  ],

  /*
  ** 配置的所有插件会在 Nuxt.js 应用初始化之前被加载导入，ssr 如果值为 false，该文件只会在客户端被打包引入。
  */
  plugins: [
    { src: '~/plugins/vuetify.js' },
    { src: '~/plugins/i18n.js' },
    { src: '@/plugins/vue-extend.js' },
    { src: './plugins/lazyload.js', ssr: false },
    { src: './plugins/toast.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  router: {
    middleware: 'i18n',
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    },
    extendRoutes(routes) {}
  },
  // 使用渲染缓存
  render: {
    bundleRenderer: {
      cache: require('lru-cache')({
        max: 1000,
        maxAge: 1000 * 60 * 15
      })
    }
  },
  /*
  ** Build configuration
  */
  build: {
    // analyze: true,
    // publicPath: 'https://cdn.nuxtjs.org', // 当运行 nuxt build 时，.nuxt/dist/ 目录内的内容会被上传至指定的 CDN 路径。
    postcss: {
      // plugins: {
      //   'postcss-custom-properties': {
      //     warnings: false
      //   }
      // }
    },
    vendor: [ // webpack4 出现所以废除该 API 
      '@/plugins/vuetify',
      '@/plugins/i18n',
      '@/plugins/toast',
      '@/plugins/vue-extend',
      'axios',
      'lodash'
    ],
    // 单独提取 css
    extractCSS: true,
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (ctx.isClient) {
        config.resolve.alias['vue'] = 'vue/dist/vue.js';
      }
    },
    // 为 JS 和 Vue 文件定制 babel 配置。https://nuxtjs.org/api/configuration-build/#analyze
    babel: {
      plugins: [
        '@babel/plugin-transform-runtime' // https://www.babeljs.cn/docs/plugins/transform-runtime/
      ]
    },
    styleResources: {
      scss: './assets/sass/init.scss',
      options: {}
    }
  },
  /*
  ** 页面 header
  */
  head: {
    title: 'nuxt',
    htmlAttrs: {
      xmlns: 'http://www.w3.org/1999/xhtml'
    },
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'cleartype', content: 'on' },
      { 'http-equiv': 'x-dns-prefetch-control', content: 'on' },
      { name: 'MobileOptimized', content: '320' },
      { name: 'HandheldFriendly', content: 'True' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { name: 'apple-mobile-web-app-title', content: 'Surmon.me' },
      { name: 'apple-touch-icon', content: '/static/icon.png' },
      { name: 'msapplication-TileImage', content: '/static/icon.png' },
      { name: 'msapplication-TileColor', content: '#0088f5' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' },
      // { hid: 'keywords', name: 'keywords', content: 'xxx,xxx' },
      // { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      // { rel: 'dns-prefetch', href: '//xxx.com' }, // dns 预读取，缩短加载延迟 https://developer.mozilla.org/zh-CN/docs/Controlling_DNS_prefetching
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ],
    // 所有页面都会加载以下 js
    script: [
      /*
      {
        body: true,
        async: 'async',
        type: 'text/javascript',
        src: '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
      },
      {
        body: true,
        type: 'text/javascript',
        innerHTML: `
        (adsbygoogle = window.adsbygoogle || []).push({
          google_ad_client: 'ca-pub-4710915636313788',
          enable_page_level_ads: false
        });`
      }
      */
    ],
    noscript: [
      { innerHTML: 'This website requires JavaScript.' }
    ],
    __dangerouslyDisableSanitizers: ['script'] // 阻止对 script 标签内内容转义
  },

  /*
  ** 页面加载条样式
  */
  loading: {
    color: '#0088f5'
  }
}
