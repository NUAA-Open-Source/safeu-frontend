<template>
  <div class="home-container">
    <div class="intro">
      <p class="intro-title name">SafeU</p>
      <p class="intro-title">隐私、安全、易用</p>
      <p class="intro-title">的文件分享服务</p>
    </div>
    <div class="intro-sub">
      <p class="intro-subtitle">使用 SafeU 存储、分享文件，设定下载次数、自毁时间，既安全又高效，可取代绝大多数U盘应用场景。</p>
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
      this.$router.push({path: '/upload', query: {from: 'homebutton'}})
    },

    gotodownload() {
      this.$router.push({path: '/download', query: {from: 'homebutton'}})
    }
  }
}
</script>
<style>
@import "./Home.css";
</style>