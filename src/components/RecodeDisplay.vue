<template>
    <div class="out-container">
        <div class="recode-container">
            <p class="recode-top-hint">您的提取码</p>
            <div class="recode-input-row">
                <span class="recode-box" v-clipboard:copy="new_recode" v-clipboard:success="copysuccess" v-clipboard:error="copyerror" v-if="!is_editting_recode">{{new_recode}}</span>    
                <input id="recode-box" class="recode-box" v-model="new_recode" @focus="inputonfocus" v-else/>
                <a v-on:click="editrecode" v-if="!is_editting_recode">修改</a>
                <a v-on:click="finisheditrecode" v-else>完成</a>
            </div>
            <p style="font-size: 12px; color: grey; margin: 8px 0" v-if="!is_editting_recode">点击提取码一键复制</p>
            <p style="font-size: 12px; color: grey; margin: 8px 0" v-else>*仅允许 a-z, A-Z, 0-9, 下划线和短横线</p>
            <qriously :text="qrcode_url" :size="160" style="margin-top: 8px"/>
            <p>您可以保存或分享此二维码</p>
            <details>
                <summary id="custom-settings">点此进行自定义设置</summary>
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
                </div>
            </details>
            <a href="/" class="back-btn">返回</a>
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
                qrcode_url: "/download/" + this.recode,
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
            }
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
            },

            inputonfocus() {
                this.alert_style = 0;
            },

            finisheditrecode() {
                if (this.new_recode == '') {
                    this.$message.error('提取码不能为空')
                    this.new_recode = this.recode
                    return
                }
                this.is_editting_recode = false
                var that = this
                if (this.recode != this.new_recode) {
                    var xhr = new XMLHttpRequest()
                    var user_token = JSON.parse(window.localStorage.getItem('recode-'+ this.recode)).owner_token
                    xhr.open("POST", _global.domain_url + "recode/" + this.recode, true)
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == XMLHttpRequest.DONE) {
                            if (xhr.status == 200) {
                                var uploadedinfo = JSON.parse(window.localStorage.getItem("recode-" + that.recode))
                                var createdAt = uploadedinfo.createdAt
                                var owner_token = uploadedinfo.owner_token
                                var href = window.location.href
                                window.history.pushState({}, 0, href.split('code=')[0] + "code=" + that.new_recode)
                                window.localStorage.removeItem("recode-" + that.recode)
                                window.localStorage.setItem("recode-" + that.new_recode, JSON.stringify({"recode": that.new_recode, "owner_token": owner_token, "createdAt": createdAt, "editedAt": Date.parse(new Date())}))
                                that.recode = that.new_recode
                                that.$route.query.code = that.new_recode
                                that.$message.success('设置成功');
                            } else if (xhr.status == 400) {
                                if (JSON.parse(xhr.response).message == "reCode Repeat") {
                                    that.new_recode = that.recode
                                    that.$message.error('该提取码已存在')
                                } else {
                                    that.new_recode = that.recode
                                    that.$message.error('设置失败')
                                }
                            }
                        }
                    }
                    xhr.send(JSON.stringify({"new_re_code": this.new_recode, "user_token": user_token}))
                }
            },

            submit() {
                var xhr_password = new XMLHttpRequest()
                var xhr_downloadcount = new XMLHttpRequest()
                var xhr_expiretime = new XMLHttpRequest()
                var sha256 = require("js-sha256").sha256
                var password_sha256 = this.password == "" ? "" : sha256(this.password)
                var that = this
                var user_token = JSON.parse(window.localStorage.getItem('recode-' + this.recode)).owner_token
                xhr_password.open("POST", _global.domain_url + "password/" + this.recode, true)
                xhr_downloadcount.open("POST", _global.domain_url + "downCount/" + this.recode, true)
                xhr_expiretime.open("POST", _global.domain_url + "expireTime/" + this.recode, true)
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
                            that.$message.error('密码设置失败')
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
                            that.$message.error('下载次数设置失败')
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
                            that.$message.error('有效期设置失败')
                        }
                    }
                }
                xhr_password.send(JSON.stringify({"user_token":user_token, "Auth": password_sha256}))
                xhr_downloadcount.send(JSON.stringify({"new_down_count": parseInt(that.download_count), "user_token": user_token}))
                xhr_expiretime.send(JSON.stringify({"user_token": user_token, "new_expire_time": parseInt(that.expire_time)}))
            }
        }
    }
</script>

<style>
@import './RecodeDisplay.css';
</style>
