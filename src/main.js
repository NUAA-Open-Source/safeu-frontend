import Vue from 'vue'
import './plugins/vuetify'
import Vuetify from 'vuetify'
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import App from './App.vue'
import UploadView from './UploadView.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueRouter from 'vue-router'

Vue.use(Antd)
Vue.use(Vuetify)
Vue.use(VueRouter)
library.add(faCloudUploadAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

let router = new VueRouter({
  routes: [
    {path: '/', component: UploadView},
  ],
  mode: 'history',
})

new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app')
