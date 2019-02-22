import Vue from 'vue'
import { message, Table, Radio, notification, Modal, Icon } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import App from './App.vue'
import VueClipboard from 'vue-clipboard2'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCloudUploadAlt, faCommentDots, faEye, faEyeSlash, faTrash, faArrowAltCircleDown, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueRouter from 'vue-router'
import VueQriously from 'vue-qriously'

Vue.use(VueQriously)
Vue.use(notification)
Vue.use(Modal)
Vue.use(Icon)
Vue.use(message)
Vue.use(Radio)
Vue.use(Table)
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.use(VueClipboard)
Vue.use(VueRouter)
library.add(faCloudUploadAlt)
library.add(faCommentDots)
library.add(faEye)
library.add(faEyeSlash)
library.add(faTrash)
library.add(faArrowAltCircleDown)
library.add(faArrowAltCircleUp)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Vue.config.productionTip = false
const DownloadView = () => import(/* webpackChunkName: "group-foo" */ './DownloadView.vue')
const HomeView = () => import(/* webpackChunkName: "group-foo" */ './HomeView.vue')
const UploadView = () => import(/* webpackChunkName: "group-foo" */ './UploadView.vue')
const UploadedRecodeView = () => import(/* webpackChunkName: "group-foo" */ './UploadedRecodeView.vue')
const FilelistView = () => import(/* webpackChunkName: "group-foo" */ './FilelistView.vue')
const Terms = () => import(/* webpackChunkName: "group-foo" */ './Terms.vue')
const Privacy = () => import(/* webpackChunkName: "group-foo" */ './Privacy.vue')
const About = () => import(/* webpackChunkName: "group-foo" */ './About.vue')

let router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/download', component: DownloadView},
    {path: '/download/:recode', component: DownloadView},
    {path: '/filelist', component: FilelistView},
    {path: '/upload', component: UploadView},
    {path: '/', component: HomeView},
    {path: '/recode', component: UploadedRecodeView},
    {path: '/terms', component: Terms},
    {path: '/privacy', component: Privacy},
    {path: '/about', component: About},
  ],
})

new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app')
