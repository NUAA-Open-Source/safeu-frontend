<template>
  <div class="home-container">
    <div class="intro">
      <p class="intro-title name">SafeU</p>
      <p class="intro-title">好用、快捷、安全</p>
      <p class="intro-title">的文件分享服务</p>
    </div>
    <div class="intro-sub">
      <p class="intro-subtitle">我们提供了非常高效及安全的文件传输服务，完胜并取代 90% 的 U 盘应用场景</p>
      <div class="buttons-container">
        <a class="main-upload-buttons" v-on:click="gotoupload"><font-awesome-icon icon="arrow-alt-circle-up" size="1x"/> 上传</a>
        <a class="main-download-buttons" v-on:click="gotodownload"><font-awesome-icon icon="arrow-alt-circle-down" size="1x"/> 下载</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home',
  methods: {
    gotoupload() {
      this.$router.push({path: '/upload'})
    },

    gotodownload() {
      this.$router.push({path: '/download'})
    }
  }
}
</script>
<style>
@import "./Home.css";
</style>