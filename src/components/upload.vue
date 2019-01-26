<template>
    <div class="sfs-upload-box">
        <h4 v-show="uploadTitle">{{uploadTitle}}</h4>
        <div class="sfs-vue-oss_file_box_control" v-show="showUI">
            <a id="selectfiles" href="" class="sfs-ali-vue-a">选择文件</a>
            <a @click="uploader.start()" v-if="fileList.length > 0" class="sfs-ali-vue-a">开始上传</a>
        </div>
        <div v-show="showProgress">
            <div ref="ossFiles" class="sfs-vue-oss_file_box">
                <transition-group name="list" tag="div" style="width: 100%">
                    <div class="sfs-vue-ali-item list-item" v-for="item in fileList" v-bind:key="item.id" >
                        <div class="sfs-vue-ali-item__info">
                            <img v-if="showPreview" :src="item.data_base64"  />
                            <span class="sfs-vue-ali-item__name">{{item.name}}</span>
                        </div>
                        <div class="sfs-vue-ali-progress">
                            <div class="sfs-vue-ali-progress-bar" v-bind:ref="'progress_'+item.id" style="width: 0">
                            </div>
                            <span v-bind:ref="'progress_txt_'+item.id">{{Math.floor(item.size/1024) + 'KB'}}</span>

                        </div>
                        <a  @click="removeFile" :data-uid="item.id" class="sfs-vue-oss_file_box_close"><img
                                :data-uid="item.id"
                                src="data:image/png;base64,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"/>
                        </a>
                    </div>
                </transition-group>
            </div>
            <div ref="container"></div>
        </div>
    </div>
</template>

<script>
    import plupload from 'plupload'
    export default {
        name: "upload",
        data() {
            return {
                fileList: [],
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
                default: 'http://106.14.124.144:2368'
            },
            extensions: {
                default: 'jpg,png,jpeg,mp4,mov,MP4,MOV'
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
                    url: this.host,
                    multipart_params: newMultipartParams,
                });
                up.start();
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
                            console.log('sfs-vue-aliyun-upload-init')
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
                            that.onFileUploaded(up, file, info)
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
    .sfs-upload-box{
        display: block;
        box-sizing: border-box;
        padding: 0.5rem 0;
    }
    .sfs-vue-oss_file_box {
        text-align: center;
        box-sizing: border-box;
        padding: 0.5rem 0;
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;
    }
    .sfs-vue-oss_file_box_control {
        border-bottom: 1px dashed #eaeaea;
        padding-bottom: 0.5rem;
        display: flex;
        flex-flow: row;
    }
    h4 {
        display: inline-block;
        padding: 0.4rem 0.2rem;
        margin: 0;
        width: 100%;
    }
    .sfs-ali-vue-a {
        display: flex;
        flex: 1;
        text-align: center;
        justify-content: center;
        text-decoration: none;
        font-size: 9pt;
        padding: 0.2rem 0.5rem;
        margin-left: 0.1rem;
        margin-right: 0.1rem;
        cursor: pointer;
        border-radius: 4px;
        color: #666;
        font-weight: bold;
        border: 0.09rem solid #666;
        flex-flow: column;
        transition: background 0.6s;
        -moz-transition: background 0.6s;	/* Firefox 4 */
        -webkit-transition: background 0.6s;	/* Safari 和 Chrome */
        -o-transition: background 0.6s;	/* Opera */
    }
    .sfs-ali-vue-a:hover{
        color: #000;
        font-weight: 600;
        border: 0.09rem solid #000;
        background: yellow;
    }
    .sfs-vue-ali-item .sfs-vue-oss_file_box_close {
        color: #FF0000;
        cursor: pointer;
        text-align: center;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3rem;
    }
    .sfs-vue-ali-item .sfs-vue-oss_file_box_close:hover {
        transform:rotate(-25deg);
        -ms-transform:rotate(-25deg); 	/* IE 9 */
        -moz-transform:rotate(-25deg); 	/* Firefox */
        -webkit-transform:rotate(-25deg); /* Safari 和 Chrome */
        -o-transform:rotate(-25deg); 	/* Opera */
    }
    .sfs-vue-ali-item .sfs-vue-oss_file_box_close img {
        max-width: 100%;
    }
    .sfs-vue-ali-item {
        font-size: 9pt;
        font-weight: bold;
        min-height: 1rem;
        border: 1px solid rgba(0, 0, 0, 0.05);
        border-radius: 5px;
        background: #fafafa;
        padding: 0.2rem 0.8rem;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.2rem;
        width: 100%;
        box-sizing: border-box;
    }
    .sfs-vue-ali-item__info{
        display: flex;
        flex-flow: row;
        max-width: 60%;
        width: 60%;
        align-items: center;
        overflow: hidden;
    }
    .sfs-vue-ali-item__info img{
        width: 2rem;height: 2rem;
        padding: 0.2rem;
        background: #fefefe;
        text-align: center;
    }
    .sfs-vue-ali-item__name{
        display: block;
        padding: 0.2rem;
        color: #666;
        flex: 2;
    }
    .sfs-vue-ali-item__size{
        color: #72bde5;
    }
    .sfs-vue-ali-item a {
        width: 80%;
        overflow-y:hidden;
        text-align: left;
    }
    .sfs-vue-ali-progress {
        width: 98%;
        margin-left: 1%;
        margin-right: 1%;
        margin-bottom: 0;
        overflow: hidden;
        background-color: #f5f5f5;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
        display: flex;
        position: relative;
    }
    .sfs-vue-ali-progress-bar {
        background-color: rgb(84, 185, 249);
        background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.14902) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.14902) 50%, rgba(255, 255, 255, 0.14902) 75%, transparent 75%, transparent);
        background-size: 20px 20px;
        box-shadow: rgba(0, 0, 0, 0.14902) 0 -1px 0 0 inset;
        box-sizing: border-box;
        color: rgb(255, 255, 255);
        justify-content: center;
        align-content: center;
        align-items: center;
        align-self: center;
        float: none;
        font-size: 12px;
        height: 15px;
        text-align: center;
        transition-delay: 0s;
        transition-duration: 0.6s;
        transition-property: width;
        transition-timing-function: ease;
        position: relative;
        width: 100%;
    }
    .sfs-vue-ali-progress span{
        display: inline-block;
        width: 100%;
        text-align: center;
        position: absolute;
        left: 0;
        bottom: 0;
        color: #fafafa;
        text-shadow: #000 1px 1px 1px;
    }
    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }
    .list-enter, .list-leave-to {
        opacity: 0;
    }
</style>