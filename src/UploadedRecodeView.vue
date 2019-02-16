<template>
    <div id="uploadedrecodeview">
        <Navbar/>
        <RecodeDisplay v-bind:recode="this.$route.query.code" v-if="is_user_authored"/>
        <RecodeUnauthored v-else/>
    </div>
</template>
<script>
import Navbar from './components/Navbar.vue'
import RecodeDisplay from './components/RecodeDisplay.vue'
import RecodeUnauthored from './components/RecodeUnauthored.vue'
export default {
    name: 'uploadedrecodeview',
    components: {
        Navbar,
        RecodeDisplay,
        RecodeUnauthored,
    },
    data() {
        return {
            is_user_authored: window.localStorage.getItem("recode-" + this.$route.query.code) != null ? true : false,
        }
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
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>