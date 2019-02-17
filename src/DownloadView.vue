<template>
    <div id="downloadview">
        <Download :code="this.$route.params.recode"/>
    </div>
</template>

<script>
import Download from './components/Download.vue'
export default {
    name: 'downloadview',
    components: {
        Download,
    },
}
</script>
<style>
#downloadview {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>

