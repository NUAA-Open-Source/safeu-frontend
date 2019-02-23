<template>
    <div id="filelistview">
        <div class="filelist-container">
            <p class="filelist-container-title">文件列表</p>
            <div class="filelist-item">
                <input type="checkbox" v-model="is_all_selected" @change="selectall" style="margin-right: 8px">
                全选
            </div>
            <div class="filelist-item" v-for="item in filelist" :key="item.ID">
                <input type="checkbox" :value="{'host': item.Host, 'name': item.OriginalName}" v-model="selected_files">
                <div class="download-files-item-left">
                    <img :src="item.image" />
                </div>
                <div class="download-files-item-name">
                    <p style="margin-bottom: 0">{{item.OriginalName}}</p>
                </div>
                <div class="download-files-item-btn">
                    <a v-on:click="downloadfile(item.Host, item.OriginalName, item.Type, false)">下载</a>
                </div>
            </div>
            <div class="zip-download-row">
                <button class="zip-download-btn" v-on:click="zippart" v-if="!is_zip_loading">打包下载</button>
                <button class="zip-downloading-btn" v-else><a-spin />正在打包中...</button>
            </div>
        </div>
    </div>
</template>

<script>
import _global from './Global.vue'
export default {
    name: 'filelistview',
    data() {
        return {
            is_all_selected: false,
            is_zip_loading: false,
            filelist: JSON.parse(window.sessionStorage.getItem('filelist')),
            recode: this.$route.query.recode,
            selected_files: [],
            selected_files_handled: [],
        }
    },
    created() {
        for (var file of this.filelist) {
            let file_ext = file.OriginalName.split('.').splice(-1)[0]
            if (file_ext == 'pdf'){
                file.image = 'https://ninjiacoder.oss-cn-beijing.aliyuncs.com/default_upload_icon/pdf.png'
            } else if (['doc', 'docx'].indexOf(file_ext) != -1) {
                file.image = 'https://ninjiacoder.oss-cn-beijing.aliyuncs.com/default_upload_icon/doc.png'
            } else if (['xls', 'xlsx'].indexOf(file_ext) != -1) {
                file.image = 'https://ninjiacoder.oss-cn-beijing.aliyuncs.com/default_upload_icon/xls.png'
            } else if (['ppt', 'pptx'].indexOf(file_ext) != -1) {
                file.image = 'https://ninjiacoder.oss-cn-beijing.aliyuncs.com/default_upload_icon/ppt.png'
            } else if (file_ext == 'png') {
                file.image = 'https://ninjiacoder.oss-cn-beijing.aliyuncs.com/default_upload_icon/png.png'
            } else if (file_ext == 'jpg') {
                file.image = 'https://ninjiacoder.oss-cn-beijing.aliyuncs.com/default_upload_icon/jpg.png'
            } else if (file_ext == 'zip') {
                file.image = 'https://ninjiacoder.oss-cn-beijing.aliyuncs.com/default_upload_icon/zip.png'
            } else if (file_ext == 'rar') {
                file.image = 'https://ninjiacoder.oss-cn-beijing.aliyuncs.com/default_upload_icon/rar.png'
            } else {
                file.image = 'https://ninjiacoder.oss-cn-beijing.aliyuncs.com/default_upload_icon/default.png'
            }
        }
    },
    watch: {
        'selected_files': function() {
            if (this.selected_files.length == this.filelist.length) {
                this.is_all_selected = true
            } else {
                this.is_all_selected = false
            }
        }
    },
    methods: {
        selectall() {
            if (this.is_all_selected) {
                var selected_files = []
                for (var item of this.filelist) {
                    selected_files.push({'host': item.Host, 'name': item.OriginalName})
                }
                this.selected_files = selected_files
            } else {
                this.selected_files = []
            }
        },

        handlefilelist(filelist) {
            for (file in filelist) {
                var name = file.OriginalName
                var ext = name.split('.').splice(-1)[0]
            }
        },

        downloadfile(url, filename, filetype, iszip) {
            var xhr = new XMLHttpRequest()
            xhr.open("GET", url)
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xhr.responseType = "blob";
            var that = this
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    that.is_zip_loading = false
                    var b = that.getBrowser();
                    if (b=="IE"){
                        var file = new Blob([xhr.response], { type: filetype });
                        window.navigator.msSaveBlob(file, filename);
                    } else {
                        var link = document.createElement('a');
                        var file = new Blob([xhr.response], { type: filetype });
                        link.href = window.URL.createObjectURL(file);
                        link.download = filename;
                        document.body.appendChild(link)
                        link.click(); 
                    }
                }
            }
            xhr.addEventListener("loadend", function(ev) {
                if (iszip) {
                    var xhr = []
                    var urls = []
                    for (var i in that.selected_files_handled) {
                        xhr[i] = new XMLHttpRequest()
                        urls[i] = _global.domain_url + "downCount/" + that.recode + "?bucket=" + that.selected_files_handled[i].bucket + "&path=" + that.selected_files_handled[i].path
                        xhr[i].open("GET", urls[i], true)
                        xhr[i].send()
                    }
                } else {
                    var bucket = url.split("://")[1].split(".")[0]
                    var path = url.split("://")[1].split(".").splice(1).join(".").split("/").slice(1).join("/")
                    var downcounturl = _global.domain_url + "downCount/" + that.recode + "?bucket=" + bucket + "&path=" + path
                    var xhr = new XMLHttpRequest()
                    xhr.open("GET", downcounturl, true)
                    xhr.send()
                }
            });
            xhr.send()
        },

        zippart() {
            if (this.selected_files.length == 0) {
                this.$message.error('请选择需要打包的文件')
                return
            }
            this.is_zip_loading = true
            var xhr = new XMLHttpRequest()
            var items = []
            var full = false
            var that = this
            if (this.selected_files.length == this.filelist.length) {
                full = true
            }
            for (var file of this.selected_files) {
                var protocol = file.host.split("://")[0]
                var url = file.host.split("://")[1]
                var bucket = url.split(".")[0]
                var endpoint = url.split(".").splice(1).join(".").split("/")[0]
                var path = url.split(".").splice(1).join(".").split("/").slice(1).join("/")
                var original_name = file.name
                items.push({"protocol": protocol, "bucket": bucket, "endpoint": endpoint, "original_name": original_name, "path": path})
            }
            this.selected_files_handled = items
            var token = window.localStorage.getItem('token')
            xhr.open("POST", _global.domain_url + "item/" + this.recode)
            xhr.setRequestHeader("Token", token);
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status == 200) {
                        var zip_url = JSON.parse(xhr.response).url
                        var url_pieces = zip_url.split("/")
                        var name = url_pieces[url_pieces.length - 1]
                        that.downloadfile(zip_url, name, '', true)
                    } else {
                        that.is_zip_loading = false
                        that.$message.error('打包失败')
                    }
                }
            }
            xhr.send(JSON.stringify({"re_code": this.recode, "full": full, "items": items}))
        },
        
        getBrowser() {  
            var ua = window.navigator.userAgent;  
            //var isIE = window.ActiveXObject != undefined && ua.indexOf("MSIE") != -1;  
            var isIE = !!window.ActiveXObject || "ActiveXObject" in window;
            var isFirefox = ua.indexOf("Firefox") != -1;  
            var isOpera = window.opr != undefined;  
            var isChrome = ua.indexOf("Chrome") && window.chrome;  
            var isSafari = ua.indexOf("Safari") != -1 && ua.indexOf("Version") != -1;  
            if (isIE) {  
                return "IE";  
            } else if (isFirefox) {  
                return "Firefox";  
            } else if (isOpera) {  
                return "Opera";  
            } else if (isChrome) {  
                return "Chrome";  
            } else if (isSafari) {  
                return "Safari";  
            } else {  
                return "Unkown";  
            }  
        }  
    }
}
</script>

<style>
    @import './assets/css/FilelistView.css';
</style>
