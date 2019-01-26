import Vue from 'vue'
import './plugins/vuetify'
import Vuetify from 'vuetify'
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import App from './App.vue'

Vue.use(Antd)
Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
