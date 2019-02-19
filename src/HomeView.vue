<template>
    <div id="homeview">
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
}
</script>
<style>
#homeview {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>

