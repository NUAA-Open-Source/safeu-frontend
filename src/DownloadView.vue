<template>
    <div id="downloadview">
        <Navbar/>
        <Download :code="this.$route.params.recode"/>
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Download from './components/Download.vue'
export default {
    name: 'downloadview',
    components: {
        Navbar,
        Download,
    },
}
</script>
