<template>
  <v-app>
    <div id="app">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons">
      <toolbar />
      <v-layout
        wrap
        style="height: 100%;z-index:999;">
        <v-container fluid mt-3>
          <keep-alive>
            <router-view/>
          </keep-alive>
        <div style="position:fixed;top:50%;left:50%;right:50%;bottom:50%;z-index: 99;">
          <v-progress-circular
            :size="100"
            color="primary"
            indeterminate
            v-if="loading"
          ></v-progress-circular>
        </div>
          <v-snackbar
          color="success"
          v-model="successAlert"
          :timeout="6000">
          {{ meassage }}
          <v-btn
            flat
            @click="successAlert = false"
          >
          close
          </v-btn>
        </v-snackbar>

        <v-snackbar
          color="error"
          v-model="errorAlert"
          :timeout="6000">
          {{ meassage }}
          <v-btn
            flat
            @click="errorAlert = false"
          >close</v-btn>
        </v-snackbar>
        </v-container>

        <Drawer />
      </v-layout>
  </div>
  </v-app>
</template>

<script>
  import 'vuetify/dist/vuetify.min.css'
  import WebsitesService from '@/services/WebsitesService'
  import Toolbar from '@/components/Toolbar'
  import Drawer from "@/components/Drawer"

  export default {
    name: 'client',
    components:{
      Toolbar,
      Drawer
    },
    mounted() {
      // this.fetch()
      this.sockets.subscribe('websitesUpdate', function(data){
        console.log('updating ...' + new Date().toLocaleString())
        this.$store.commit('updateLoading', true)
        this.$store.commit('updateWebsites', data)
        this.$store.commit('updateLoading', false)
      })
    },
    computed: {
      loading(){
        return this.$store.state.loading
      },
      meassage(){
        return this.$store.state.message
      },
      errorAlert : {
        get: function () {
          return this.$store.state.errorAlert
        },
        set: function (value) {
          this.$store.state.errorAlert = value
        }
      },
      successAlert : {
        get: function () {
          return this.$store.state.successAlert
        },
        set: function (value) {
          this.$store.state.successAlert = value
        }
      }
    },
    methods: {
    }
  }
</script>

<style scope>
  .nounderline {
    text-decoration: none !important
  }
</style>
