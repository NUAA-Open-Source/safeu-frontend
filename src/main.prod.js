// import Vue from 'vue'
// import { message, Table, Radio, notification, Modal, Icon, Tooltip} from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";
import '@babel/polyfill'
import App from './App.vue'
import VueClipboard from 'vue-clipboard2'
import { library, icon } from '@fortawesome/fontawesome-svg-core'
import { faCloudUploadAlt, faCommentDots, faEye, faEyeSlash, faTrash, faArrowAltCircleDown, faArrowAltCircleUp, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import VueRouter from 'vue-router'
import VueQriously from 'vue-qriously'
import axios from 'axios'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import _global from './Global.vue'

Vue.use(VueQriously)
// Vue.use(notification)
// Vue.use(Modal)
// Vue.use(Icon)
// Vue.use(message)
// Vue.use(Radio)
// Vue.use(Table)
// Vue.prototype.$message = message
// Vue.prototype.$notification = notification
Vue.prototype.$axios = axios
Vue.use(VueClipboard)
Vue.use(VueRouter)
Vue.use(antd)
library.add(faCloudUploadAlt, faCommentDots, faEye, faEyeSlash, faTrash, faArrowAltCircleDown, faArrowAltCircleUp, faMinusCircle)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.prototype.$event = function(event_name, from) {
    from = typeof from !== "undefined" ? from : null
    const xhr = new XMLHttpRequest()
    xhr.withCredentials = true
    xhr.open("POST", _global.behavior_api_url + "event", true)
    xhr.setRequestHeader("X-CSRF-TOKEN", sessionStorage.getItem("behavior_csrf_token"))
    if (from == null) {
      xhr.send(JSON.stringify({"name": event_name}))
    } else {
      xhr.send(JSON.stringify({"event": {"name": event_name, "src": from}}))
    }
  }

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
  router: router,
  render: h => h(App),
}).$mount('#app')

Sentry.init({
    dsn: 'https://4443b7d10fec41a98326d1012c416c7b@sentry.io/1437455',
    integrations: [
      new Integrations.Vue({
        Vue,
        attachProps: true,
      }),
    ],
  });