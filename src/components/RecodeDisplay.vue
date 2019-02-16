<template>
    <div class="out-container">
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
            
            <p class="setting-title" style="margin-top: 12px">下载次数</p>
            <input class="setting-download-count-input" type="text" placeholder="请输入下载次数" v-model="download_count"> 
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
                qrcode_url: "/download/" + this.recode,
                is_editting_recode: false,
                is_more_setting: false,
                is_need_password: false,
                password: '',
                new_recode: this.recode,
                download_count: 10,
                downcount_setting_status: 0,
                password_setting_status: 0,
            }
        },
        created() {
            console.log(this.$refs)
        },
        watch: {
            "new_recode": function() {
                var href = window.location.href
                window.history.pushState({}, 0, href.split('code=')[0] + "code=" + this.new_recode)
            }
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
                                window.localStorage.removeItem(that.recode)
                                window.localStorage.setItem("recode-" + that.new_recode, JSON.stringify({"recode": that.new_recode, "editedAt": Date.parse(new Date())}))
                                that.recode = that.new_recode
                                that.$route.query.code = that.new_recode
                                that.$message.success('设置成功');
                            } else if (xhr.status == 400) {
                                if (JSON.parse(xhr.response).message == "reCode Repeat") {
                                    that.new_recode = that.recode
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
                var xhr_password = new XMLHttpRequest()
                var xhr_downloadcount = new XMLHttpRequest()
                var sha256 = require("js-sha256").sha256
                var password_sha256 = this.password == "" ? "" : sha256(this.password)
                var that = this
                var user_token = window.localStorage.getItem('owner_token')
                xhr_password.open("POST", _global.domain_url + "password/" + this.new_recode, true)
                xhr_downloadcount.open("POST", _global.domain_url + "downCount/" + this.new_recode, true)
                xhr_password.onreadystatechange = function() {
                    if (xhr_password.readyState == XMLHttpRequest.DONE) {
                        if (xhr_password.status == 200) {
                            that.password_setting_status = 1
                            if (that.password_setting_status == 1 && that.downcount_setting_status == 1) {
                                that.$message.success('设置成功')
                                that.is_more_setting = false    
                            }
                        } else {
                            that.$message.error('密码设置失败')
                        }
                    }
                }
                xhr_downloadcount.onreadystatechange = function() {
                    if (xhr_downloadcount.readyState == XMLHttpRequest.DONE) {
                        if (xhr_downloadcount.status == 200) {
                            that.downcount_setting_status = 1
                            if (that.password_setting_status == 1 && that.downcount_setting_status == 1) {
                                that.$message.success('设置成功')
                                that.is_more_setting = false    
                            }
                        } else {
                            that.$message.error('下载次数设置失败')
                        }
                    }
                }
                xhr_password.send(JSON.stringify({"user_token":user_token, "Auth": password_sha256}))
                xhr_downloadcount.send(JSON.stringify({"new_down_count": that.download_count, "user_token": user_token}))
            }
        }
    }
</script>

<style>
@import './RecodeDisplay.css'
</style>
