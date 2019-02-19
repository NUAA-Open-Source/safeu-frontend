<template>
  <div id="app">
    <div class="app-container">
      <Navbar/>
      <router-view></router-view>
    </div>
    <div class="footer">
      <div style="text-align: left; margin: 10px 4% 2px" class="link-container">
        <a>使用条款</a>
        <a>隐私政策</a>
        <a>关于</a>
        <a>Cookie</a>
      </div>
      <div style="text-align: center; margin: 2px 0px 10px">
        <p>&copy; a2os.club 2018-2019 All rights reserved</p>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue'
export default {
  name: 'app',
  components: {
    Navbar,
  },
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
  width: 100%;
  font-family: -apple-system,BlinkMacSystemFont,SF Pro Text,segoe ui,helvetica neue,helvetica,ubuntu,roboto,noto,arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.app-container {
  flex-grow: 1;
}
.link-container a{
  margin:0px 1% 0px;
  color: rgb(109, 109, 109);
  font-weight: bold;
}
</style>
