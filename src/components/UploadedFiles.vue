<template>
    <div class="uploadedfiles-container" v-if="uploaded_files.length > 0">
        <p style="font-size: 20px; font-weight: 700">历史上传文件</p>
        <a-table :columns="columns"
            :rowKey="file => file.recode.recode"
            :dataSource="uploaded_files"
            :pagination=false
        >
        <template slot="recode" slot-scope="recode">
            <a v-on:click="gotoedit(recode.recode)" v-if="!recode.isExpired">{{recode.recode}}</a>
            <span v-else>{{recode.recode}}</span>
        </template>
        <template slot="download_url" slot-scope="download_url">
            <a v-on:click="gotodownload(download_url)" v-if="download_url != null">提取</a>
            <span v-else>提取</span>
        </template>
        <template slot="remain_time" slot-scope="remain_time">
            <span v-if="remain_time != null">{{remain_time}}</span>
            <span v-else>已过期</span>
        </template>
        <template slot="delete" slot-scope="code">
            <a v-on:click="showmodal(code.recode)" v-if="!code.isExpired"><font-awesome-icon icon="trash"/></a>
            <a v-on:click="removels(code.recode)" style="color: red" v-else><font-awesome-icon icon="minus-circle"/></a>
        </template>
        </a-table>
        <a-modal
            title="确定删除"
            :visible="modal_visible"
            @ok="deletefile(to_delete_recode)"
            @cancel="modalcancel"
            >
            <p>您确定要删除该文件嘛，这不仅会删除历史记录，也将无法提取该文件</p>
        </a-modal>
    </div>
</template>

<script>
const columns = [{
    title: '提取码',
    dataIndex: 'recode',
    width: '20%',
    scopedSlots: { customRender: 'recode' },
}, {
    title: '提取地址',
    dataIndex: 'download_url',
    width: '20%',
    scopedSlots: { customRender: 'download_url' },
}, {
    title: '有效时间剩余',
    dataIndex: 'remain_time',
    width: '20%',
    scopedSlots: { customRender: 'remain_time' },
},{
    title: '',
    dataIndex: 'code',
    width: '10%',
    scopedSlots: { customRender: 'delete'},
}]
import _global from '../Global.vue'
export default {
    name: "UploadedFiles",
    data() {
        return {
            uploaded_files: [],
            modal_visible: false,
            to_delete_recode: '',
            columns,
        }
    },
    mounted() {
        var localStorage = window.localStorage
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i)
            if (key.indexOf("recode-") == 0) {
                var value = JSON.parse(localStorage.getItem(key))
                var recode = value.recode
                var download_url = "/download/" + value.recode
                var createdAt = value.createdAt
                // var download_count = value.downcount
                var expire_time = value.expiretime
                var remain_time = createdAt + expire_time * 60 * 60 * 1000 - Date.parse(new Date())
                if (remain_time < 0) {
                    this.uploaded_files.push({'recode': {'recode': recode, 'isExpired': true}, 'download_url': null, 'remain_time': null, 'code': {'recode': recode, 'isExpired': true}, 'createdAt': null}) 
                }
                else {
                    var remain_hour = parseInt(remain_time / 1000 / 60 / 60).toString()
                    var remain_min = Math.round(remain_time / 1000 / 60 % 60).toString()
                    this.uploaded_files.push({'recode': {'recode': recode, 'isExpired': false}, 'download_url': recode, 'remain_time': remain_hour + '小时' + remain_min + '分钟', 'code': {'recode': recode, 'isExpired': false}, 'createdAt': createdAt})
                } 
            }
        }
        this.uploaded_files.sort(this.compare("createdAt"))
    },
    methods: {
        gotoedit(recode) {
            this.$router.push({path: '/recode', query: {code: recode}})
        },

        gotodownload(recode) {
            this.$router.push('/download/' + recode)
        },

        showmodal(recode) {
            this.modal_visible = true
            this.to_delete_recode = recode
        },

        modalcancel() {
            this.modal_visible = false
        },

        removels(recode) {
            window.localStorage.removeItem("recode-" + recode)
            for (var i = 0; i < this.uploaded_files.length; i++) {
                if (this.uploaded_files[i].code.recode == recode) {
                    this.uploaded_files.splice(i, 1)
                    break
                }
            }
        },

        deletefile(recode) {
            var user_token = JSON.parse(window.localStorage.getItem("recode-" + recode)).owner_token
            var xhr = new XMLHttpRequest()
            var that = this
            xhr.open("POST", _global.domain_url + "delete/" + recode)
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE) {
                    if (xhr.status == 200) {
                        that.modal_visible = false
                        window.localStorage.removeItem("recode-" + recode)
                        for (var i = 0; i < that.uploaded_files.length; i++) {
                            if (that.uploaded_files[i].code.recode == recode) {
                                that.uploaded_files.splice(i, 1)
                                break
                            }
                        }
                        that.to_delete_recode = ''
                        that.$message.success('删除成功')
                    }
                }
            }
            xhr.send(JSON.stringify({"user_token": user_token}))
        },

        compare(pro) { 
            return function (obj1, obj2) { 
                var val1 = obj1[pro]; 
                var val2 = obj2[pro]; 
                if (val1 < val2 ) { //正序
                    return 1; 
                } else if (val1 > val2 ) { 
                    return -1; 
                } else { 
                    return 0; 
                } 
            } 
        }
    }
}
</script>

<style>
@import './UploadedFiles.css';
</style>
