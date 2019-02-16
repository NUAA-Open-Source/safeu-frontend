<template>
    <div id="uploadview">
        <upload/>
        <UploadedFiles/>
    </div>
</template>
<script>
import Navbar from './components/Navbar.vue'
import upload from './components/upload.vue'
import UploadedFiles from './components/UploadedFiles.vue'

export default {
    name: 'uploadview',
    components: {
        Navbar,
        upload,
        UploadedFiles,
    }
}
</script>
<style>
#uploadview {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
