<template>
    <div class="download-container">
        <p class="download-top-hint">输入提取码</p>
        <input class="download-recode-input" v-model="recode">
        <input type="password" class="download-password-input" v-if="needpassword" v-model="password" placeholder="输入密码">
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
                        console.log(xmlhttp.response)
                        var token = JSON.parse(xmlhttp.response).token
                        var filelist = JSON.parse(xmlhttp.response).items
                        window.localStorage.setItem('token', token)
                        that.$router.push({path: '/filelist', query: {filelist: filelist}})
                    } else if (xmlhttp.status === 401) {
                        that.needpassword = true
                        console.log(xmlhttp.response)
                        var error = JSON.parse(xmlhttp.response).error
                        
                        if (error == "Cannot get the password") {
                            that.$message.info("该文件加密，请输入密码")
                        } else if (error == "The password is not correct") {
                            that.$message.error("密码输入错误")
                        }
                        
                        console.log(xmlhttp.response)
                        console.log(that.needpassword)
                    } else if (xmlhttp.status === 404) {
                        that.$message.error("提取码错误")
                        console.log(xmlhttp.response)
                    }
                }
            }
            if (that.needpassword) {
                console.log(password)
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

