import Vue from 'vue'
import App from './App.vue'
import { MY_API_KEY } from "./myApiKey"
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: MY_API_KEY,
    libraries: 'places',
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')


