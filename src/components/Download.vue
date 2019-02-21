<template>
    <div class="download-container">
        <p class="download-top-hint">输入提取码</p>
        <input class="download-recode-input" v-model="recode" @keyup.enter="display">
        <input type="password" class="download-password-input" v-if="needpassword" v-model="password" placeholder="输入密码" @keyup.enter="display">
        <button class="download-button" v-on:click="display()">提取</button>
    </div>
</template>

<script>
import _global from '../Global.vue'
export default {
    name: "download",
    props: {
        code: {
            default: ''
        }
    },
    data() {
        return {
            recode: this.code,
            needpassword: false,
            password: '',
        }
    },
    methods: {
        display() {
            var sha256 = require("js-sha256").sha256
            var password_sha256 = sha256(this.password)
            this.sendValidationRequest(password_sha256)
        },

        sendValidationRequest(password) {
            const xmlhttp = new XMLHttpRequest();
            var that = this
            xmlhttp.open("POST", _global.domain_url + "validation/" + this.recode, true)
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                    if  (xmlhttp.status == 200) {
                        var token = JSON.parse(xmlhttp.response).token
                        var filelist = JSON.parse(xmlhttp.response).items
                        window.localStorage.setItem('token', token)
                        window.sessionStorage.setItem('filelist', JSON.stringify(filelist))
                        that.$router.push({path: '/filelist', query: {recode: that.recode}})
                    } else if (xmlhttp.status === 401) {
                        that.needpassword = true
                        var error = JSON.parse(xmlhttp.response).error
                        
                        if (error == "Cannot get the password") {
                            that.$message.info("该文件加密，请输入密码")
                        } else if (error == "The password is not correct") {
                            that.$message.error("密码输入错误")
                        }
                        
                    } else if (xmlhttp.status === 404) {
                        that.$message.error("提取码错误")
                    }
                }
            }
            if (that.needpassword) {
                xmlhttp.send(JSON.stringify({"password": password}))
            } else {
                xmlhttp.send(null)
            }
        },

        setNeedPasswordTrue() {
            this.needpassword = true
        }
    }
}
</script>

<style>
@import './Download.css';
</style>

