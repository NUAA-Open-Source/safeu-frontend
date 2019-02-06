<template>
    <div class="download-container">
        <p class="download-top-hint">输入提取码</p>
        <input class="download-input" v-model="recode">
        <button class="download-button" v-on:click="display()">提取</button>
    </div>
</template>

<script>
export default {
    name: "download",
    data() {
        return {
            recode: '',
        }
    },
    methods: {
        display() {
            var sha256 = require("js-sha256").sha256
            var password_sha256 = sha256(this.recode)
            this.sendValidationRequest(password_sha256)
        },

        sendValidationRequest(password) {
            const xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", "", true)
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200) {
                    var token = JSON.parse(xmlhttp.response).token
                    var file_items = JSON.parse(xmlhttp.response).items
                    window.localStorage.setItem('token', token)
                    this.$router.push({path: '/filelist', query: {files: file_items}})
                }
            }
            xmlhttp.send(JSON.stringify({"password": password}))
        }
    }
}
</script>

<style>
@import './Download.css';
</style>

