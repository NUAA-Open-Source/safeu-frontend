import Vue from 'vue'
import './plugins/vuetify'
import Vuetify from 'vuetify'
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import App from './App.vue'
import UploadView from './UploadView.vue'
import HomeView from './HomeView.vue'
import UploadedRecodeView from './UploadedRecodeView'
import DownloadView from './DownloadView.vue'
import FilelistView from './FilelistView.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueRouter from 'vue-router'

Vue.use(Antd)
Vue.use(Vuetify)
Vue.use(VueRouter)
library.add(faCloudUploadAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Vue.config.productionTip = false

let router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/download', component: DownloadView},
    {path: '/download/:recode', component: DownloadView},
    {path: '/filelist', component: FilelistView},
    {path: '/upload', component: UploadView},
    {path: '/', component: HomeView},
    {path: '/recode', component: UploadedRecodeView},
  ],
})

new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app')
