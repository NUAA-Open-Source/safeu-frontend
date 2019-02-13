<template>
    <div class="container">
        <div class="recode-container" v-if="!is_more_setting">
            <p class="recode-top-hint">您的提取码</p>
            <div class="recode-input-row">
                <input id="recode-box" class="recode-box" v-model="new_recode" :disabled="!is_editting_recode" @focus="inputonfocus"/>
                <a v-on:click="editrecode" v-if="!is_editting_recode">修改</a>
                <a v-on:click="finisheditrecode" v-else>完成</a>
            </div>
            <vue-qr :text="qrcode_url" style="margin-top: 8px"></vue-qr>
            <p>您可以保存或分享此二维码</p>
            <a v-on:click="moresetting">> 更多设置</a>
        </div>
        <div class="more-setting-container" v-else>
            <p class="setting-top-hint">自定义设置</p>
            <p class="setting-title">加密<input type="checkbox" v-model="is_need_password" style="margin-left: 8px;"></p>
            <input class="setting-password-input" type="password" placeholder="请输入加密密码" v-model="password" v-if="is_need_password">
            <button class="setting-back-btn" v-on:click="back">返回</button>
            <button class="setting-confirm-btn" v-on:click="submit">确定</button>
        </div>
    </div>
    
</template>

<script>
    import VueQr from 'vue-qr';
    import _global from '../Global.vue'
    export default {
        components: {VueQr},
        name: 'RecodeDisplay',
        props: {
            recode: String,
        },
        data() {
            return {
                qrcode_url: "http://192.168.2.186:8080/download/" + this.recode,
                is_editting_recode: false,
                is_more_setting: false,
                is_need_password: false,
                password: '',
                new_recode: this.recode,
            }
        },
        mounted() {
            this.$notification.open({
                message: '上传成功',
                description: '您上传的文件默认可下载 10 次，如需修改可至更多设置中',
                icon: <a-icon type="smile" style="color: #108ee9" />,
                });
        },
        methods: {
            editrecode() {
                this.is_editting_recode = true
            },

            inputonfocus() {
                this.alert_style = 0;
            },

            finisheditrecode() {
                this.is_editting_recode = false
                var that = this
                if (this.recode != this.new_recode) {
                    var xhr = new XMLHttpRequest()
                    var user_token = window.localStorage.getItem('owner_token')
                    xhr.open("POST", _global.domain_url + "recode/" + this.recode, true)
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == XMLHttpRequest.DONE) {
                            if (xhr.status == 200) {
                                that.$message.success('设置成功');
                            } else if (xhr.status == 400) {
                                if (JSON.parse(xhr.response).message == "reCode Repeat") {
                                    that.$message.error('该提取码已存在')
                                } else {
                                    that.$message.error('设置失败')
                                }
                            }
                        }
                        console.log(xhr.response)
                    }
                    xhr.send(JSON.stringify({"new_re_code": this.new_recode, "user_token": user_token}))
                }
            },

            moresetting() {
                this.is_more_setting = true
            },
            
            back() {
                this.is_more_setting = false
            },

            submit() {
                var xhr = new XMLHttpRequest()
                var sha256 = require("js-sha256").sha256
                var password_sha256 = sha256(this.password)
                var that = this
                var user_token = window.localStorage.getItem('owner_token')
                xhr.open("POST", _global.domain_url + "password/" + this.new_recode, true)
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == XMLHttpRequest.DONE) {
                        if (xhr.status == 200) {
                            that.$message.success('设置成功')
                            that.is_more_setting = false
                        }
                    }
                }
                xhr.send(JSON.stringify({"user_token":user_token, "Auth": password_sha256}))
            }
        }
    }
</script>

<style>
@import './RecodeDisplay.css'
</style>
