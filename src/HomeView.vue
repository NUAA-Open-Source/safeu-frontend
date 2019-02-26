<template>
    <div :id="isuploaded ? 'homeview1' : 'homeview2'">
        <Home :code="this.$route.params.recode"/>
        <UploadedFiles/>
    </div>
</template>

<script>
import Home from './components/Home.vue'
import UploadedFiles from './components/UploadedFiles.vue'
export default {
    name: 'homeview',
    components: {
        Home,
        UploadedFiles,
    },
    data() {
        return {
            isuploaded: false,
        }
    },
    mounted() {
        var localStorage = window.localStorage
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i)
            if (key.indexOf("recode-") == 0) {
                this.isuploaded = true
                break
            }
        }
    }
}
</script>
<style>
@media (max-width: 700px) {
    #homeview1 {
        width: 100%;
        height: 100%;
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }    

    #homeview2 {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }    
}

@media (min-width: 700px) {
    #homeview1 {
        width: 100%;
        height: 100%;
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #homeview2 {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}
</style>

