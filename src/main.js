// import Vue from 'vue'
// import { message, Table } from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";
import '@babel/polyfill'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import VueRouter from 'vue-router'
import VueQriously from 'vue-qriously'

Vue.use(VueQriously)
Vue.use(VueRouter)
Vue.use(antd)
library.add(faCloudUploadAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Vue.config.productionTip = false
const DownloadView = () => import(/* webpackChunkName: "group-foo" */ './DownloadView.vue')
const HomeView = () => import(/* webpackChunkName: "group-foo" */ './HomeView.vue')
const UploadView = () => import(/* webpackChunkName: "group-foo" */ './UploadView.vue')
const UploadedRecodeView = () => import(/* webpackChunkName: "group-foo" */ './UploadedRecodeView.vue')
const FilelistView = () => import(/* webpackChunkName: "group-foo" */ './FilelistView.vue')

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
  router: router,
  render: h => h(App),
}).$mount('#app')
