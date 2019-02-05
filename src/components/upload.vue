<template>
    <a id="selectfiles" v-bind:class="['upload-container', fileList.length == 0 ? 'justify-content-center' : 'justify-content-space-between']">
        <div class="upload-nofiles-container" v-if="fileList.length == 0">
            <font-awesome-icon icon="cloud-upload-alt" size="4x"/>
            <p class="upload-tip">拖拽上传</p>
            <p class="upload-tip">单次最多上传 20 个文件，总大小不超过 50M</p>
            <p class="browse-button">浏览文件夹</p>
        </div>
        <div class="upload-files-container" v-else>
            <div class="upload-files">
                <div class="upload-files-item" v-for="item in fileList" v-bind:key="item.id">
                    <div class="upload-files-item-left">
                        <img v-if="showPreview" :src="item.data_base64" style="width: 36px" />
                    </div>
                    <div class="upload-files-item-right">
                        <p>{{item.name}}</p>
                        <div class="upload-files-item-progress">
                            <div class="progress-bar" v-bind:ref="'progress_'+item.id" style="width: 0">
                            </div>
                            <span v-bind:ref="'progress_txt_'+item.id">{{Math.floor(item.size/1024) + 'KB'}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="browse-more-button-container" v-if="fileList.length != 0">
            <p class="browse-button">继续添加</p>
            <button class="start-upload-button" v-on:click.stop="$event.preventDefault();uploader.start()">开始上传</button>
        </div>
    </a>
</template>

<script>
    import plupload from 'plupload'
    export default {
        name: "upload",
        data() {
            return {
                fileList: [],
                fileUUIDList: [],
                ossFile: '',
                accessid: '',
                accesskey: '',
                callbackbody: '',
                host: '',
                policyBase64: '',
                signature: '',
                filename: '',
                expire: 0,
                now: Date.parse(new Date()) / 1000,
                uploader: null,
                uploadMethod: '',
                g_object_name: '',
            };
        },
        props: {
            uploadTitle: {
                default: 'sfs-vue-upload'
            },
            ossDir: {
                default: 'user-dir-prefix/'
            },
            useRealName: {
                default: true
            },
            showUI: {
                default: true
            },
            showPreview: {
                default: true
            },
            showProgress: {
                default: true
            },
            authServerUrl: {
                default: ''
            },
            extensions: {
                default: 'jpg,png,jpeg,doc,xls,docx,pdf,ppt,pptx'
            },
            maxSize: {
                default: '500mb'
            },
            prevent_duplicates: {
                default: true
            },
            onBeforeUpload: {
                default: Function
            },
            onFilesAdded: {
                default: Function
            },
            onFileUploaded: {
                default: Function
            },
            onUploadComplete: {
                default: Function
            },
            onSuccess: {
                default: Function
            },
            onError: {
                default: Function
            },
            onProgress: {
                default: Function
            },
            onInit: {
                default: Function
            },
        },
        beforeCreate() {
        },
        mounted() {
            this.upload()
        },
        methods: {
            handleChange(info) {
                const status = info.file.status;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    this.$message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    this.$message.error(`${info.file.name} file upload failed.`);
                }
            },
            removeFile(e) {
                let uid = e.target.dataset.uid
                for (var i = 0; i < this.fileList.length; i++) {
                    if(this.fileList[i].id === uid)
                    {
                        this.uploader.removeFile(this.fileList[i])
                        this.fileList.splice(i,1)
                    }
                }
            },
            sendRequest() {
                const xmlhttp = new XMLHttpRequest();
                xmlhttp.open('GET', this.authServerUrl, false);
                xmlhttp.send(null);
                return xmlhttp.responseText;
            },
            getSignature() {
                // 可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
                this.now = Date.parse(new Date()) / 1000;
                if (this.expire < this.now + 3) {
                    const body = this.sendRequest();
                    const e = eval;
                    const obj = e(`(${body})`);
                    this.host = obj.host;
                    this.policyBase64 = obj.policy;
                    this.accessid = obj.accessid;
                    this.signature = obj.signature;
                    this.expire = parseInt(obj.expire, 10);
                    this.callbackbody = obj.callback;
                    this.key = this.g_object_name;
                    return true;
                }
                return false;
            },
            randomString(len = 32) {
                const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
                const maxPos = chars.length;
                let pwd = '';
                for (let i = 0; i < len; i += 1) {
                    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
                }
                return pwd;
            },
            getSuffix(filename) {
                const pos = filename.lastIndexOf('.');
                let suffix = '';
                if (pos !== -1) {
                    suffix = filename.substring(pos);
                }
                return suffix;
            },
            calculateObjectName(filename) {
                if (this.useRealName === true) {
                    this.g_object_name = this.ossDir + `${filename}`;
                } else if (this.useRealName === false) {
                    const suffix = this.getSuffix(filename);
                    this.g_object_name = this.ossDir + this.randomString(10) + suffix;
                }
                return this.g_object_name;
            },
            setUploadParam(up, file, ret) {
                let filename = file.name
                if (ret === false) {
                    this.getSignature();
                }
                if (filename !== '') {
                    file.oss_name = this.calculateObjectName(filename);
                }
                const newMultipartParams = {
                    key: this.g_object_name,
                    policy: this.policyBase64,
                    OSSAccessKeyId: this.accessid,
                    // 让服务端返回200,不然，默认会返回204
                    success_action_status: '200',
                    signature: this.signature,
                    callback: this.callbackbody,
                }
                up.setOption({
                    url: "http://" + this.host,
                    multipart_params: newMultipartParams,
                });
                up.start();
            },
            jumpToRecodeDiplay(recode) {
                this.$router.push({path: '/recode', query: {code: recode}})
            },
            upload() {
                let that = this
                let myPlupload = new plupload.Uploader({
                    runtimes: 'html5,flash,silverlight,html4',
                    browse_button: 'selectfiles',
                    multi_selection: true,
                    container: that.$refs.container,
                    url: 'http://oss.aliyuncs.com',
                    filters: {
                        mime_types: [{
                            title: '允许上传文件类型',
                            extensions: that.extensions,
                        }],
                        // 最大只能上传200mb的文件
                        max_file_size: that.maxSize,
                        // 不允许队列中存在重复文件
                        prevent_duplicates: that.prevent_duplicates,
                    },
                    init: {
                        PostInit: () => {
                            that.uploader = myPlupload
                            that.onInit(myPlupload)
                        },
                        FilesAdded: (up, files) => {
                            let fileTotal = files.total
                            let idx = 0
                            plupload.each(files, (file) => {
                                idx++
                                function result_call() {
                                    that.fileList.push(_file)
                                    if (idx === fileTotal)
                                        that.onFilesAdded(up, files)
                                }
                                let _file = file
                                let ext = file.type
                                let ext_arr = ext.split("\/")
                                const icon_default = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAFTUlEQVR4Xu2cOW8UQRCFq20CEo7/QAIREqwl+AMQIAEBFgIyTokjhcyBM0gNSFwhIGQCTGQRkoBghUQCJPwGroQAbyMHNrOeZUo91QU7259D1/Qxb16/97pn7CD8FI1AKPruuXmBAIWTAAJAgMIRKPz2UQAIUDgChd8+CgABCkeg8NtHASDAaASu9OOOOJBZCXJWRHaMC04LN87km8rsEZHZw3/vb/G5yOJS0nhXrj5Iut754s8S5X6YksWFXvg8aqyRCnCxHw+EgTwNQbY4TzC5ewiQDJlIlO+DKZm93QsvNrauEeDimzgTRF6GIJtbDOXeBAK0gzhG+Tm1SfYt7Anvqz3UCHDpbXwWRI60G8a/FQRoj3EUWbo1E45qBPgaRLa1H8a3JQRoj28U+XZrJmxvJMDltzG2H8K/JQSwYXxzJgypfs0CJooADilfg3/MdgG16UKAKiQttnkQQEPAuZ5kASgACpD7oEfjNxagIWSsowA2AMkAZICCdgHaYnHICFiABrqxnmQB2lgQoP5V8ESdA0CAwncBEAACNHIAC8ACcp8TEAI12TXWk0KgwwrXpg8BNISMdQhgA5CDIA6CCjoIwgIK3wVAAAiQO+VrDkwI1BAy1pNCoDaWg0JAAA10Yx0C2AAsaxegYYUCcBKYOyNgAdqqM9axABuAWEAVPyxgwi3A4QFr6w8L0BAy1pMsAAJwEJQ75Gn8RQE0hIx1FMAGYFkhEAvAArCAYQ6oChA/nh/rPw+XuV82DXTeBsr8pnzzc+gp7Lrb/D0ABKig3uavhyGAA22rXaIAJoBRACwAC1jngMcuAQswKZTeGAvQMWq4oiwL8FjhGvwogIaQsZ6iABCgBjYKUIWkzTZP4y8KoCFkrKMAJgBRABSgoG0gGaDwDKCJpQdByAAa6sZ6SgbQhoIA9W8CeRnEyyBeB69xoM02EQvQdNdYxwJMAJa1DdSgIgNMeAbweMAaqbAADSFjPcUCIEDh5wAQAAL866+C+SjUqPBqcyxAhajpgrJ2AVhA4RagrRUPgrAL0FA31lMsQBsKAkz4OQAEwAIaOYACoADZt4lkAE13jXUygAlAtoF8E8g3gescaPO+X1t/WICGkLGeYgEeIU+bPgTQEDLWIYAJQDIAGYAMQAb4swqG2LD665P9e2P9UejD669MEjjU2CEjnLq2P9/8HHp61DvXrAAQoIJ6i10CBHBgbbVLFMAGMApQxQ8LqL8LwAKwAELgGgfIADa/8WidlAEcJF67J0KghpCxDgFsAJYVAlGAGlsggPNRMBZgUyi1NRagQtR4AQqAAnAUvM4Bh4yABdgUSm2dZAFabxCAk8DcXwWjANqqM9ZRABuAZYVADSssAAvAAjaskol6G+iwwjVRIQNoCBnrSRkAAnAUnFviNf6iABpCxjoKYAOwrF0AFoAFYAHDHChLATS1dFAIMoAGurGelAG0sSAAB0G5LQIF0FadsY4C2AAkA1TxwwKwACyAdwE2Td3QuvMZ4ET/7tcgYVtWVDJ2lpQBHCReu5VxJkCU+O1x7/z26j2M+v8AyyJyULvR/1WHACbklx71zh1tJMDxdw92T68MXkuQzaahnBpDgJbARvkZpqf3Ptxz+kMjAVaLx/t3DkzHsCghbG05nFszCNAC2ig/VsLg2JPehRcbW9csYO2CE/07O0Wm5kKMh8aJCBAghQDxS5SwLDKYf9y78GlUy78SIGUYru0uAhCgu88uy8whQBYYu9sJBOjus8sycwiQBcbudgIBuvvssswcAmSBsbudQIDuPrssM4cAWWDsbicQoLvPLsvMfwNbZaq9FnonjQAAAABJRU5ErkJggg=='
                                if(that.showPreview){
                                    let _fileExt = ext_arr[0]
                                    if(_fileExt === 'image')
                                    {
                                        let reader = new FileReader()
                                        reader.onload = (e) => {
                                            let result = e.target.result
                                            _file.data_base64 = result
                                            result_call()
                                        }
                                        reader.readAsDataURL(file.getNative())
                                    }else if(_fileExt === 'video')
                                    {
                                        _file.data_base64 = 'data:image/png;base64,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'
                                        result_call()
                                    }else{
                                        _file.data_base64 = icon_default
                                        result_call()
                                    }
                                }else{
                                    _file.data_base64 = icon_default
                                    result_call()
                                }
                            })
                        },
                        BeforeUpload: (up, file) => {
                            that.setUploadParam(myPlupload, file, false)
                            that.onBeforeUpload(up, file)
                        },
                        UploadProgress: (up, file) => {
                            that.$refs['progress_' + file.id][0].style.width = file.percent + '%'
                            that.$refs['progress_txt_' + file.id][0].innerHTML = file.percent + '%'
                            if(file.percent === 100)
                            {
                                that.$refs['progress_txt_' + file.id][0].innerHTML = '完成'
                            }
                            that.onProgress(file.id, file.percent)
                        },
                        FileUploaded: (up, file, info) => {
                            that.fileUUIDList.push(JSON.parse(info.response).uuid)
                            that.onFileUploaded(up, file, info)
                        },
                        UploadComplete: (up, files) => {
                            var xhr = new XMLHttpRequest()
                            xhr.open("POST", "", true)
                            xhr.onreadystatechange = function() {
                                if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                                    var recode = JSON.parse(xhr.response).recode
                                    that.jumpToRecodeDiplay(recode)
                                }
                            }
                            xhr.send(JSON.stringify({"files": that.fileUUIDList}))
                            that.onUploadComplete(up, files)
                        },
                        Error: (up, err) => {
                            that.onError(up, err)
                        },
                    },
                })
                myPlupload.init()
            },
        },
    };
</script>
<style>
    @import './upload.css';
</style>