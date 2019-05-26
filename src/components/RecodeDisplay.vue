<template>
    <div class="out-container">
        <div class="recode-container">
            <h1 class="recode-top-hint">您的提取码</h1>
            <div class="recode-input-row">
                <span class="recode-box" v-clipboard:copy="new_recode" v-clipboard:success="copysuccess" v-clipboard:error="copyerror" v-if="!is_editting_recode">{{new_recode}}</span>
                <input id="recode-box" class="recode-box" v-model="new_recode" @focus="inputonfocus" @keyup="adaptinput" @keyup.enter="finisheditrecode" v-else/>
                <a v-on:click="editrecode" v-if="!is_editting_recode">修改</a>
                <a v-on:click="finisheditrecode" v-else>完成</a>
            </div>
            <p style="font-size: 12px; color: grey; margin: 8px 0" v-if="!is_editting_recode">点击提取码一键复制</p>
            <p style="font-size: 12px; color: grey; margin: 8px 0" v-else>&nbsp;</p>
            <button class="copy-downloadurl-btn" v-clipboard:copy="'https://safeu.a2os.club/download/' + new_recode + '?from=copyurl'" v-clipboard:success="copysuccess" v-clipboard:error="copyerror">拷贝链接</button>
            <a-tooltip trigger="hover" overlayClassName="overlay" placement="bottom" style="margin-top: 12px">
                <a href="#">分享二维码</a>
                <div slot="title" style="background: white; width: 100%; height: 100%;">
                    <qriously slot="title" :value="qrcode_url" :size="160" style="margin-top: 8px"/>
                    <p style="color: gray; text-align: center; font-size: 12px;">保存分享二维码</p>
                </div>
            </a-tooltip>
        </div>
        <div class="vertical-divider"></div>
        <div class="recode-container">
            <h1 class="recode-top-hint">自定义设置</h1>
            <div class="more-setting-container">
                <p class="setting-title">加密<input type="checkbox" v-model="is_need_password" style="margin-left: 8px;"></p>
                <div class="setting-password-input-row" v-if="is_need_password">
                    <input class="setting-password-input" :type="is_show_password ? 'text' : 'password'" placeholder="请输入加密密码" v-model="password">
                    <a v-on:click="showpassword">
                        <font-awesome-icon :icon="is_show_password ? 'eye-slash' : 'eye'"/>
                    </a>
                </div>
                <p class="setting-title" style="margin-top: 12px">下载次数</p>
                <div class="download-count-btn-group">
                        <a-radio-group buttonStyle="solid" v-model="download_count">
                        <a-radio-button class="download-count" value="1">1 次</a-radio-button>
                        <a-radio-button class="download-count" value="10">10 次</a-radio-button>
                        <a-radio-button class="download-count" value="20">20 次</a-radio-button>
                        <a-radio-button class="download-count" value="50">50 次</a-radio-button>
                    </a-radio-group>
                </div>
                <p class="setting-title" style="margin-top: 12px">有效期</p>
                <div class="expire-time-btn-group">
                        <a-radio-group buttonStyle="solid" v-model="expire_time">
                        <a-radio-button class="expire-time" value="4">4 小时</a-radio-button>
                        <a-radio-button class="expire-time" value="8">8 小时</a-radio-button>
                        <a-radio-button class="expire-time" value="12">12 小时</a-radio-button>
                        <a-radio-button class="expire-time" value="24">24 小时</a-radio-button>
                    </a-radio-group>
                </div>
                <button class="setting-confirm-btn" v-on:click="submit">确定</button>
                <a class="back-btn" v-on:click="back">返回</a>
            </div>
        </div>
        </div>
</template>

<script>
    import _global from '../Global.vue'
    export default {
        name: 'RecodeDisplay',
        props: {
            recode: String,
        },
        data() {
            return {
                qrcode_url: "/download/" + this.recode + "?from=qrcode",
                is_editting_recode: false,
                is_show_password: false,
                is_need_password: JSON.parse(window.localStorage.getItem("recode-" + this.recode)).password != null && JSON.parse(window.localStorage.getItem("recode-" + this.recode)).password != "",
                password: JSON.parse(window.localStorage.getItem("recode-" + this.recode)).password == null  ? "" : JSON.parse(window.localStorage.getItem("recode-" + this.recode)).password,
                new_recode: this.recode,
                download_count: JSON.parse(window.localStorage.getItem("recode-" + this.recode)).downcount == null ? "10" : JSON.parse(window.localStorage.getItem("recode-" + this.recode)).downcount,
                expire_time: JSON.parse(window.localStorage.getItem("recode-" + this.recode)).expiretime == null ? "8" : JSON.parse(window.localStorage.getItem("recode-" + this.recode)).expiretime,
                downcount_setting_status: 0,
                expiretime_setting_status: 0,
                password_setting_status: 0,
            }
        },
        watch: {
            'is_need_password': function() {
                if (!this.is_need_password) {
                    this.password = ""
                }
            },
        },
        methods: {
            copysuccess() {
                this.$message.success("复制成功")
            },

            copyerror() {
                this.$message.error("复制失败，请手动复制")
            },

            showpassword() {
                this.is_show_password = !this.is_show_password
            },

            editrecode() {
                this.is_editting_recode = true
                adaptinput()
            },

            inputonfocus() {
                this.alert_style = 0;
            },

            back() {
                this.$event("recode_display_backbtn")
                this.$router.push({path: '/'})
            },

            adaptinput() {
                var input = document.getElementsByClassName("recode-box")[0]
                var text = input.value
                var textLength = 40
                for (var i = 0; i < text.length; i++) {
                    if (text.charCodeAt(i) < 256) {
                        textLength += 20
                    } else {
                        textLength += 40
                    }
                }
                input.style.width = textLength.toString() + "px"
            },

            finisheditrecode() {
                if (this.new_recode == '') {
                    this.$message.error('提取码不能为空')
                    this.new_recode = this.recode
                    return
                }
                this.is_editting_recode = false
                var that = this
                var csrf_token = sessionStorage.getItem("csrf_token")
                if (this.recode != this.new_recode) {
                    var xhr = new XMLHttpRequest()
                    xhr.withCredentials = true
                    var user_token = JSON.parse(window.localStorage.getItem('recode-'+ this.recode)).owner_token
                    xhr.open("POST", _global.api_url + "recode/" + this.recode, true)
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == XMLHttpRequest.DONE) {
                            if (xhr.status == 200) {
                                var uploadedinfo = JSON.parse(window.localStorage.getItem("recode-" + that.recode))
                                var href = window.location.href
                                window.history.pushState({}, 0, href.split('code=')[0] + "code=" + that.new_recode)
                                uploadedinfo.editedAt = Date.parse(new Date())
                                uploadedinfo.recode = that.new_recode
                                window.localStorage.removeItem("recode-" + that.recode)
                                window.localStorage.setItem("recode-" + that.new_recode, JSON.stringify(uploadedinfo))
                                that.recode = that.new_recode
                                that.$route.query.code = that.new_recode
                                that.$message.success('设置成功');
                            } else if (xhr.status == 400) {
                                if (JSON.parse(xhr.response).err_code == 20307) {
                                    that.new_recode = that.recode
                                    var error_code = JSON.parse(xhr.response).err_code
                                    that.$error(error_code)
                                } else {
                                    that.new_recode = that.recode
                                    var error_code = JSON.parse(xhr.response).err_code
                                    that.$error(error_code)
                                }
                            }
                        }
                    }
                    xhr.setRequestHeader("X-CSRF-TOKEN", csrf_token)
                    var sha256 = require("js-sha256").sha256
                    var password_sha256 = this.password == "" ? "" : sha256(this.password)
                    xhr.send(JSON.stringify({"new_re_code": this.new_recode, "user_token": user_token, "auth": password_sha256}))
                }
            },

            submit() {
                var csrf_token = sessionStorage.getItem("csrf_token")
                var xhr_password = new XMLHttpRequest()
                xhr_password.withCredentials = true
                var xhr_downloadcount = new XMLHttpRequest()
                xhr_downloadcount.withCredentials = true
                var xhr_expiretime = new XMLHttpRequest()
                xhr_expiretime.withCredentials = true
                var sha256 = require("js-sha256").sha256
                var password_sha256 = this.password == "" ? "" : sha256(this.password)
                var that = this
                var user_token = JSON.parse(window.localStorage.getItem('recode-' + this.recode)).owner_token
                xhr_password.open("POST", _global.api_url + "password/" + this.recode, true)
                xhr_downloadcount.open("POST", _global.api_url + "downCount/" + this.recode, true)
                xhr_expiretime.open("POST", _global.api_url + "expireTime/" + this.recode, true)
                xhr_password.onreadystatechange = function() {
                    if (xhr_password.readyState == XMLHttpRequest.DONE) {
                        if (xhr_password.status == 200) {
                            that.password_setting_status = 1
                            var uploadedinfo = JSON.parse(window.localStorage.getItem("recode-" + that.recode))
                            uploadedinfo.password = that.password
                            uploadedinfo.editedAt = Date.parse(new Date())
                            window.localStorage.setItem("recode-" + that.recode, JSON.stringify(uploadedinfo))
                            if (that.password_setting_status == 1 && that.downcount_setting_status == 1 && that.expiretime_setting_status == 1) {
                                that.$message.success('设置成功')
                                that.password_setting_status = 0
                                that.downcount_setting_status = 0
                                that.expiretime_setting_status = 0
                            }
                        } else {
                            var error_code = JSON.parse(xhr.response).err_code
                            that.$error(error_code)
                        }
                    }
                }
                xhr_downloadcount.onreadystatechange = function() {
                    if (xhr_downloadcount.readyState == XMLHttpRequest.DONE) {
                        if (xhr_downloadcount.status == 200) {
                            that.downcount_setting_status = 1
                            var uploadedinfo = JSON.parse(window.localStorage.getItem("recode-" + that.recode))
                            uploadedinfo.downcount = that.download_count
                            uploadedinfo.editedAt = Date.parse(new Date())
                            window.localStorage.setItem("recode-" + that.recode, JSON.stringify(uploadedinfo))
                            if (that.password_setting_status == 1 && that.downcount_setting_status == 1 && that.expiretime_setting_status == 1) {
                                that.$message.success('设置成功')
                                that.password_setting_status = 0
                                that.downcount_setting_status = 0
                                that.expiretime_setting_status = 0
                            }
                        } else {
                            var error_code = JSON.parse(xhr.response).err_code
                            that.$error(error_code)
                        }
                    }
                }
                xhr_expiretime.onreadystatechange = function() {
                    if (xhr_expiretime.readyState == XMLHttpRequest.DONE) {
                        if (xhr_expiretime.status == 200) {
                            that.expiretime_setting_status = 1
                            var uploadedinfo = JSON.parse(window.localStorage.getItem("recode-" + that.recode))
                            uploadedinfo.expiretime = that.expire_time
                            uploadedinfo.editedAt = Date.parse(new Date())
                            window.localStorage.setItem("recode-" + that.recode, JSON.stringify(uploadedinfo))
                            if (that.password_setting_status == 1 && that.downcount_setting_status == 1 && that.expiretime_setting_status == 1) {
                                that.$message.success('设置成功')
                                that.password_setting_status = 0
                                that.downcount_setting_status = 0
                                that.expiretime_setting_status = 0
                            }
                        } else {
                            var error_code = JSON.parse(xhr.response).err_code
                            that.$error(error_code)
                        }
                    }
                }
                xhr_password.setRequestHeader("X-CSRF-TOKEN", csrf_token)
                xhr_password.send(JSON.stringify({"user_token":user_token, "Auth": password_sha256}))
                xhr_downloadcount.setRequestHeader("X-CSRF-TOKEN", csrf_token)
                xhr_downloadcount.send(JSON.stringify({"new_down_count": parseInt(that.download_count), "user_token": user_token}))
                xhr_expiretime.setRequestHeader("X-CSRF-TOKEN", csrf_token)
                xhr_expiretime.send(JSON.stringify({"user_token": user_token, "new_expire_time": parseInt(that.expire_time)}))
            }
        }
    }
</script>

<style>
@import './RecodeDisplay.css';
</style>
