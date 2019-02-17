<template>
    <div id="homeview">
        <Home :code="this.$route.params.recode"/>
    </div>
</template>

<script>
import Home from './components/Home.vue'
export default {
    name: 'homeview',
    components: {
        Home,
    },
}
</script>
