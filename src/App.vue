<template>
  <div id="app">
    <Navbar/>
    <div class="app-container">
      <router-view></router-view>
    </div>
    <div class="footer">
      <div class="link-container">
        <a v-on:click="gototerms">使用条款</a>
        <a v-on:click="gotoprivacy">隐私政策</a>
        <a v-on:click="gotoabout">关于</a>
      </div>
      <div style="text-align: center; margin: 2px 0px 10px">
        <p>&copy; <a href="https://a2os.club" style="color: #2c3e50;">A²OS</a> 2018-2019 All rights reserved.</p>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue'
import _global from './Global.vue'
export default {
  name: 'app',
  components: {
    Navbar,
  },
  mounted() {
    this.$axios.defaults.withCredentials = true
    this.$axios.get(_global.domain_url + "csrf")
    .then(function(response) {
      var csrf_token = response.headers["x-csrf-token"]
      sessionStorage.setItem("csrf_token", csrf_token)
    })
    this.$axios.get(_global.behavior_domain_url + "csrf")
    .then(function(response) {
      var csrf_token = response.headers["x-csrf-token"]
      sessionStorage.setItem("behavior_csrf_token", csrf_token)
    })
  },
  methods: {
    gototerms() {
      this.$router.push({path: '/terms'})
    },

    gotoprivacy() {
      this.$router.push({path: '/privacy'})
    },

    gotoabout() {
      this.$router.push({path: '/about'})
    },
  }
}
</script>
<style>
body {
  position: absolute;
  margin: 0;
  padding: 0;
  border: 0;
}
#app {
  position: absolute;
  min-height: calc(100vh-0px);
  display: flex;
  flex-direction: column;
  margin-top: 0;
  background: url('./assets/background.svg') no-repeat;
  background-size: 100%;
  width: 100%;
  font-family: -apple-system,BlinkMacSystemFont,SF Pro Text,segoe ui,helvetica neue,helvetica,ubuntu,roboto,noto,arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  flex: 1;
}
.link-container a{
  margin:0px 1% 0px;
  color: rgb(109, 109, 109);
  font-weight: bold;
}
@media (min-width: 700px) {
  .link-container {
    margin-left: 40px;
    margin-bottom: 20px;
  }
}
@media (max-width: 700px) {
  .link-container {
    text-align:center;
    margin-bottom: 20px;
  }  
}
</style>
