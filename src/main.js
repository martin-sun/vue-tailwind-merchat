import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './utils/filter'


Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.mixin({
  methods: {
    capitalizeFirstLetter: str => str.charAt(0).toUpperCase() + str.slice(1),
    correctImageUrl: (url, style) => {
      if (!url) return ''
      var pattern = new RegExp('[http|https]://')
      if (!url.match(pattern)) {
        url = 'http://overseas-1252412068.costj.myqcloud.com' + url
      }
      var cosPattern = new RegExp('1252412068')
      if (style && url.match(cosPattern)) {
        url = url.replace('1252412068.costj', '1252412068.pictj')
        url = url.replace('1252412068.cosca', '1252412068.picca')
        url = url + '/' + style
      }
      return url
    }
  }
})

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
