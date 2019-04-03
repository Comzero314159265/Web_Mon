<template>
  <v-toolbar dark color="primary" style="position: relative;z-index:2;">
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <router-link :to="'/'" class="nounderline text--white">
      <v-toolbar-title>Web Mon</v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
    <router-link :to="'list'" class="white--text nounderline">
      <v-toolbar-title class="white--text">List</v-toolbar-title>
    </router-link>
  </v-toolbar>
</template>
<script>
export default {
  name: 'toolbar',
  created() {
  },
  data() {
    return {
      
    }
  },
  computed: {
    drawer: {
      get: function(){ return this.$store.state.drawer},
      set: function(val){ this.$store.commit('setDrawer', val)}
    }
  },

}
</script>
<style>
 .text--white {
   color: white!important;
 }
</style>
