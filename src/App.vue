<template>
  <div id="app">
    <div class="app-container">
      <Navbar/>
      <router-view></router-view>
    </div>
    <div class="footer">
      <div style="display: flex; flex-direction: row; align-items: center; margin: 10px 4% 2px" class="link-container">
        <span style="font-size: 30px; font-weight: bold; margin-right: 12px;">A²OS</span>
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
  display: flex;
  flex-direction: column;
  margin-top: 0;
  background: url('./assets/background.svg') no-repeat;
  width: 100%;
  min-height: 100%;
  font-family: -apple-system,BlinkMacSystemFont,SF Pro Text,segoe ui,helvetica neue,helvetica,ubuntu,roboto,noto,arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.app-container {
  flex: 1;
}
.link-container a{
  margin:0px 1% 0px;
  color: rgb(109, 109, 109);
  font-weight: bold;
}
</style>
