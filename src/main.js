import Vue from 'vue'
import './plugins/vuetify'
import Vuetify from 'vuetify'
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(Antd)
Vue.use(Vuetify)
library.add(faCloudUploadAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
