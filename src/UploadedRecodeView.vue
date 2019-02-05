<template>
    <div id="uploadedrecodeview">
        <Navbar/>
        <RecodeDisplay v-bind:recode="this.$route.query.code"/>
    </div>
</template>
<script>
import Navbar from './components/Navbar.vue'
import RecodeDisplay from './components/RecodeDisplay.vue'
export default {
    name: 'uploadedrecodeview',
    components: {
        Navbar,
        RecodeDisplay,
    },
    mounted() {
        
    },
    created() {
        console.log(this.$route.query)
    }
}
</script>
<style>
#uploadedrecodeview {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>