<template>
    <div class="recode-container">
        <p class="recode-top-hint">您的提取码</p>
        <div class="recode-box">
            {{recode}}
        </div>
        <vue-qr text="https://www.baidu.com"></vue-qr>
        <p>您可以保存或分享此二维码</p>
    </div>
</template>

<script>
    import VueQr from 'vue-qr';
    export default {
        components: {VueQr},
        name: 'RecodeDisplay',
        props: {
            recode: String,
        }
    }
</script>

<style>
@import './RecodeDisplay.css'
</style>
