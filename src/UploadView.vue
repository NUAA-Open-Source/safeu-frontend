<template>
    <div id="uploadview">
        <upload/>
    </div>
</template>
<script>
import upload from './components/upload.vue'

export default {
    name: 'uploadview',
    components: {
        upload,
    },
    mounted() {
        this.$event("upload", this.$route.query.from)
    }
}
</script>
<style>
#uploadview {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #2c3e50;
}
</style>
