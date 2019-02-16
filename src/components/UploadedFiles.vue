<template>
    <div class="uploadedfiles-container" v-if="uploaded_files.length > 0">
        <a-table :columns="columns"
            :rowKey="file => file.recode"
            :dataSource="uploaded_files"
            :pagination=false
        >
        <template slot="recode" slot-scope="recode">
            <a :href="'/recode?code='+recode">recode</a>
        </template>
        <template slot="download_url" slot-scope="download_url">
            <a :href="download_url">提取</a>
        </template>
        </a-table>
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
}]
export default {
    name: "UploadedFiles",
    data() {
        return {
            uploaded_files: [],
            columns,
        }
    },
    mounted() {
        var localStorage = window.localStorage
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i)
            if (["token", "owner_token"].indexOf(key) == -1) {
                var value = JSON.parse(localStorage.getItem(key))
                var recode = value.recode
                var download_url = "/download/" + value.recode
                this.uploaded_files.push({'recode': recode, 'download_url': download_url})
            }
        }
    },
}
</script>

<style>
@import './UploadedFiles.css';
</style>