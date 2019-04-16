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
                        <img v-if="showPreview" :src="item.data_base64" style="width: 36px; height: 36px;" />
                    </div>
                    <div class="upload-files-item-right">
                        <p>{{item.name}}</p>
                        <div class="upload-files-item-progress">
                            <div class="progress-bar" v-bind:ref="'progress_'+item.id" style="width: 0">
                            </div>
                            <span v-bind:ref="'progress_txt_'+item.id">{{Math.floor(item.size/1024) + 'KB'}}</span>
                        </div>
                    </div>
                    <a  v-on:click.stop="removeFile" :data-uid="item.id" class="upload-files-remove-btn"><img
                        :data-uid="item.id"
                        src="http://ninjiacoder.oss-cn-beijing.aliyuncs.com/remove.png"/>
                    </a>

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
    import _global from '../Global.vue'
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
                uploader: null,
                sizeTotal: 0,
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
                default: _global.api_url + 'upload/policy'
            },
            maxSize: {
                default: '50mb'
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
            var dropbox = document.querySelector('.upload-container')
            dropbox.addEventListener('dragenter', this.onDrag, false)
            dropbox.addEventListener('dragover', this.onDrag, false)
            dropbox.addEventListener('drop', this.onDrop, false)
        },
        methods: {
            onDrag(e) {
                e.stopPropagation()
                e.preventDefault() 
            },
            onDrop(e) {
                e.stopPropagation()
                e.preventDefault()
                var files = e.dataTransfer.files
                for (var i = 0; i != files.length; i++) {
                    this.uploader.addFile(files[i])
                }
            },
            handleChange(info) {
                const status = info.file.status;
                if (status !== 'uploading') {
                }
                if (status === 'done') {
                    this.$message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    this.$message.error(`${info.file.name} file upload failed.`);
                }
            },
            removeFile(e) {
                e.preventDefault()
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
                const xhr = new XMLHttpRequest();
                xhr.open('GET', this.authServerUrl, false);
                xhr.send(null);
                return xhr.responseText;
            },
            getSignature() {
                // 可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
                this.now = Date.parse(new Date()) / 1000;
                if (this.expire < this.now + 3) {
                    const body = this.sendRequest();
                    const e = eval;
                    const obj = e(`(${body})`);
                    this.host = obj.host;
                    this.ossDir = obj.dir;
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
                this.$notification.open({
                    message: '上传成功',
                    description: '您上传的该文件默认有效期为 8 小时，可下载 10 次。若需更改，可点击"自定义设置"进行更改',
                    icon: <a-icon type="smile" style="color: #108ee9" />,
                });
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
                            var idx = 0
                            var countStatus = false
                            var sizeStatus = false
                            plupload.each(files, (file) => {
                                idx++
                                that.sizeTotal += file.size/1024/1024
                                function result_call() {
                                    if (that.fileList.length >= 20) {
                                        that.uploader.removeFile(file)
                                        countStatus = true
                                        return
                                    } else {
                                        countStatus = false
                                    }
                                    if (that.sizeTotal >= 50) {
                                        that.uploader.removeFile(file)
                                        sizeStatus = true
                                        that.sizeTotal -= file.size/1024/1024
                                       return
                                    } else {
                                        sizeStatus = false
                                    }
                                    that.fileList.push(_file)
                                    if (idx === fileTotal)
                                        that.onFilesAdded(up, files)
                                }
                                let _file = file
                                let ext = file.type
                                let ext_arr = ext.split("\/")
                                let file_ext = _file.name.split('.').splice(-1)[0]
                                const icon_default = 'http://ninjiacoder.oss-cn-beijing.aliyuncs.com/default_upload_icon/default.png'
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
                                    } else if (file_ext == 'pdf'){
                                        _file.data_base64 = 'http://ninjiacoder.oss-cn-beijing.aliyuncs.com/default_upload_icon/pdf.png'
                                        result_call()
                                    } else if (['doc', 'docx'].indexOf(file_ext) != -1) {
                                        _file.data_base64 = 'http://ninjiacoder.oss-cn-beijing.aliyuncs.com/default_upload_icon/doc.png'
                                        result_call()
                                    } else if (['xls', 'xlsx'].indexOf(file_ext) != -1) {
                                        _file.data_base64 = 'http://ninjiacoder.oss-cn-beijing.aliyuncs.com/default_upload_icon/xls.png'
                                        result_call()
                                    } else if (['ppt', 'pptx'].indexOf(file_ext) != -1) {
                                        _file.data_base64 = 'http://ninjiacoder.oss-cn-beijing.aliyuncs.com/default_upload_icon/ppt.png'
                                        result_call()
                                    } else if (file_ext == 'zip') {
                                        _file.data_base64 = 'http://ninjiacoder.oss-cn-beijing.aliyuncs.com/default_upload_icon/zip.png'
                                        result_call()
                                    } else if (file_ext == 'rar') {
                                        _file.data_base64 = 'http://ninjiacoder.oss-cn-beijing.aliyuncs.com/default_upload_icon/rar.png'
                                        result_call()
                                    } else {
                                        _file.data_base64 = icon_default
                                        result_call()
                                    }
                                } else{
                                    _file.data_base64 = icon_default
                                    result_call()
                                }
                            })
                            if (countStatus == true) {
                                that.$message.error("您上传的文件数量太多")
                            }
                            if (sizeStatus == true) {
                                that.$message.error('您上传的文件太大，无法上传')
                            }
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
                            var csrf_token = sessionStorage.getItem('csrf_token')
                            var xhr = new XMLHttpRequest()
                            xhr.withCredentials = true
                            xhr.open("POST", _global.api_url + "upload/finish", true)
                            xhr.onreadystatechange = function() {
                                if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                                    var recode = JSON.parse(xhr.response).recode
                                    var owner_token = JSON.parse(xhr.response).owner
                                    var expire_time = "8"
                                    var download_count = "10"
                                    window.localStorage.setItem("recode-" + recode, JSON.stringify({'recode': recode, 'owner_token': owner_token, 'downcount': download_count, 'expiretime': expire_time, 'createdAt': Date.parse(new Date())}))
                                    that.jumpToRecodeDiplay(recode) 
                                }
                            }
                            xhr.setRequestHeader("X-CSRF-TOKEN", csrf_token)
                            xhr.send(JSON.stringify({"files": that.fileUUIDList}))
                            that.onUploadComplete(up, files)
                        },
                        Error: (up, err) => {
                            if (err.code == -600) {
                                that.$message.error('您上传的文件太大，无法上传')
                            }
                            that.onError(up, err)
                        },
                    },
                })
                myPlupload.init()
                that.uploader = myPlupload
            },
        },
    };
</script>
<style>
    @import './upload.css';
</style>