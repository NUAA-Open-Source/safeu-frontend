<template>
  <div id="app">
    <router-view></router-view>
    <footer>
      <div style="text-align: left; margin: 10px 4% 2px" class="link-container">
        <a href="https://a2os.club"><img style="height: auto; width: 112px" src="https://ftp.a2os.club/img/a2os.png"></a>
        <a>使用条款</a>
        <a>隐私政策</a>
        <a>关于</a>
        <a>Cookie</a>
      </div>
      <div style="text-align: center; margin: 2px 0px 10px">
        <p>&copy; a2os.club 2018-2019 All rights reserved</p>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: "app"
};
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
  background: url("./assets/background.png") no-repeat;
  width: 100%;
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.link-container a{
  margin:0px 1% 0px;
  color: rgb(109, 109, 109);
  font-weight: bold;
}
</style>
