<template>
  <div id="app">
    <Navbar/>
    <router-view></router-view>
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
  margin-top: 0;
  background: url('./assets/background.png') no-repeat;
  width: 100%;
  font-family: -apple-system,BlinkMacSystemFont,SF Pro Text,segoe ui,helvetica neue,helvetica,ubuntu,roboto,noto,arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
