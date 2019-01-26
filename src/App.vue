<template>
  <div id="app">
    <Navbar/>
    <upload/>
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue'
import upload from './components/upload.vue'
export default {
  name: 'app',
  components: {
    Navbar,
    upload,
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
