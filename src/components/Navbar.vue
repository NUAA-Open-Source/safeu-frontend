<template>
    <div id="navbar">
        <v-toolbar>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title>
                <v-avatar
                    slot="activator"
                    size="36px"
                >
                    <img src="../assets/nuaa_logo.jpeg"/>
                </v-avatar>
                safeu 云U盘</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat>更多项目</v-btn>
            <v-btn flat>关于我们</v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style>
#navbar {
    width: 100%;
    height: 60px;
}

#nuaa-logo {

}

</style>