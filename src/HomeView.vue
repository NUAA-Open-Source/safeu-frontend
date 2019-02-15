<template>
    <div id="homeview">
        <Navbar/>
        <Home :code="this.$route.params.recode"/>
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Home from './components/Home.vue'
export default {
    name: 'homeview',
    components: {
        Navbar,
        Home,
    },
}
</script>
