<template>
    <div id="navbar">
        <div class="logo">
            <a class="logo-name" href="/">SafeU</a>
            <div class="logo-sub">
                <p class="logo-subname">云U盘</p>
                <p class="logo-des">quick &amp; safe for share.</p>
            </div>
        </div>
        <div class="feedback">
            <a v-on:click="showfeedback"><font-awesome-icon icon="comment-dots"/> 反馈</a>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
      showfeedback() {
          this.$notification.open({
            message: '欢迎加入用户群',
            description: '欢迎加入 SafeU 用户群，您可以在群中讨论关于 SafeU 的一切，群号: 879651618',
            icon: <a-icon type="smile" style="color: #108ee9" />,
        });
      },
  }
}
</script>

<style>
@import './Navbar.css';
</style>