<template>
    <div id="filelistview">
        <Navbar/>
        <div class="filelist-container">
            <p class="filelist-container-title">文件列表</p>
            <div class="filelist-item">
                <input type="checkbox" v-model="is_all_selected" @change="selectall" style="margin-right: 8px">
                全选
            </div>
            <div class="filelist-item" v-for="item in filelist" :key="item.ID">
                <input type="checkbox" :value="{'host': item.Host, 'name': item.OriginalName}" v-model="selected_files">
                <div class="download-files-item-left">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAFTUlEQVR4Xu2cOW8UQRCFq20CEo7/QAIREqwl+AMQIAEBFgIyTokjhcyBM0gNSFwhIGQCTGQRkoBghUQCJPwGroQAbyMHNrOeZUo91QU7259D1/Qxb16/97pn7CD8FI1AKPruuXmBAIWTAAJAgMIRKPz2UQAIUDgChd8+CgABCkeg8NtHASDAaASu9OOOOJBZCXJWRHaMC04LN87km8rsEZHZw3/vb/G5yOJS0nhXrj5Iut754s8S5X6YksWFXvg8aqyRCnCxHw+EgTwNQbY4TzC5ewiQDJlIlO+DKZm93QsvNrauEeDimzgTRF6GIJtbDOXeBAK0gzhG+Tm1SfYt7Anvqz3UCHDpbXwWRI60G8a/FQRoj3EUWbo1E45qBPgaRLa1H8a3JQRoj28U+XZrJmxvJMDltzG2H8K/JQSwYXxzJgypfs0CJooADilfg3/MdgG16UKAKiQttnkQQEPAuZ5kASgACpD7oEfjNxagIWSsowA2AMkAZICCdgHaYnHICFiABrqxnmQB2lgQoP5V8ESdA0CAwncBEAACNHIAC8ACcp8TEAI12TXWk0KgwwrXpg8BNISMdQhgA5CDIA6CCjoIwgIK3wVAAAiQO+VrDkwI1BAy1pNCoDaWg0JAAA10Yx0C2AAsaxegYYUCcBKYOyNgAdqqM9axABuAWEAVPyxgwi3A4QFr6w8L0BAy1pMsAAJwEJQ75Gn8RQE0hIx1FMAGYFkhEAvAArCAYQ6oChA/nh/rPw+XuV82DXTeBsr8pnzzc+gp7Lrb/D0ABKig3uavhyGAA22rXaIAJoBRACwAC1jngMcuAQswKZTeGAvQMWq4oiwL8FjhGvwogIaQsZ6iABCgBjYKUIWkzTZP4y8KoCFkrKMAJgBRABSgoG0gGaDwDKCJpQdByAAa6sZ6SgbQhoIA9W8CeRnEyyBeB69xoM02EQvQdNdYxwJMAJa1DdSgIgNMeAbweMAaqbAADSFjPcUCIEDh5wAQAAL866+C+SjUqPBqcyxAhajpgrJ2AVhA4RagrRUPgrAL0FA31lMsQBsKAkz4OQAEwAIaOYACoADZt4lkAE13jXUygAlAtoF8E8g3gescaPO+X1t/WICGkLGeYgEeIU+bPgTQEDLWIYAJQDIAGYAMQAb4swqG2LD665P9e2P9UejD669MEjjU2CEjnLq2P9/8HHp61DvXrAAQoIJ6i10CBHBgbbVLFMAGMApQxQ8LqL8LwAKwAELgGgfIADa/8WidlAEcJF67J0KghpCxDgFsAJYVAlGAGlsggPNRMBZgUyi1NRagQtR4AQqAAnAUvM4Bh4yABdgUSm2dZAFabxCAk8DcXwWjANqqM9ZRABuAZYVADSssAAvAAjaskol6G+iwwjVRIQNoCBnrSRkAAnAUnFviNf6iABpCxjoKYAOwrF0AFoAFYAHDHChLATS1dFAIMoAGurGelAG0sSAAB0G5LQIF0FadsY4C2AAkA1TxwwKwACyAdwE2Td3QuvMZ4ET/7tcgYVtWVDJ2lpQBHCReu5VxJkCU+O1x7/z26j2M+v8AyyJyULvR/1WHACbklx71zh1tJMDxdw92T68MXkuQzaahnBpDgJbARvkZpqf3Ptxz+kMjAVaLx/t3DkzHsCghbG05nFszCNAC2ig/VsLg2JPehRcbW9csYO2CE/07O0Wm5kKMh8aJCBAghQDxS5SwLDKYf9y78GlUy78SIGUYru0uAhCgu88uy8whQBYYu9sJBOjus8sycwiQBcbudgIBuvvssswcAmSBsbudQIDuPrssM4cAWWDsbicQoLvPLsvMfwNbZaq9FnonjQAAAABJRU5ErkJggg==" style="width: 36px" />
                </div>
                <div class="download-files-item-name">
                    <p style="margin-bottom: 0">{{item.OriginalName}}</p>
                </div>
                <div class="download-files-item-btn">
                    <a v-on:click="downloadfile(item.Host, item.OriginalName)">下载</a>
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
import Navbar from './components/Navbar.vue'
import _global from './Global.vue'
export default {
    name: 'filelistview',
    components: {
        Navbar,
    },
    data() {
        return {
            is_all_selected: false,
            is_zip_loading: false,
            filelist: this.$route.query.filelist,
            recode: this.$route.query.filelist[0].ReCode,
            selected_files: [],
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

        downloadfile(url, filename) {
            var xhr = new XMLHttpRequest()
            xhr.open("GET", url)
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xhr.responseType = "blob";
            var that = this
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    that.is_zip_loading = false
                    var link = document.createElement('a');
                    var file = new Blob([xhr.response], { type: '' });
                    link.href = window.URL.createObjectURL(file);
                    link.download = filename;
                    link.click(); 
                }
            }
            xhr.addEventListener("loadend", function(ev) {
                console.log("下载完成")
            });
            xhr.send()
        },

        zippart() {
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
            var token = window.localStorage.getItem('token')
            xhr.open("POST", _global.domain_url + "item/" + this.recode)
            xhr.setRequestHeader("Token", token);
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    var zip_url = JSON.parse(xhr.response).url
                    var url_pieces = zip_url.split("/")
                    var name = url_pieces[url_pieces.length - 1]
                    that.downloadfile(zip_url, name)
                }
            }
            xhr.send(JSON.stringify({"re_code": this.recode, "full": full, "items": items}))
        },
        
        zipall() {

        }
    }
}
</script>

<style>
    @import './assets/css/FilelistView.css';
</style>
