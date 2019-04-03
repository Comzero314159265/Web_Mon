<template>
  <v-app>
    <div id="app">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons">
        <transition name="fade">
          <!-- <toolbar v-if="show" /> -->
          <div v-if="show">
            <toolbar  />
          </div>
        </transition>
      <v-layout
        wrap
        style="height: 100%;z-index:999;">
        <v-container fluid mt-0>
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
  import Toolbar from '@/components/Toolbar'
  import Drawer from "@/components/Drawer"

  export default {
    name: 'client',
    components:{
      Toolbar,
      Drawer
    },
    mounted() {
      window.addEventListener('mousemove', this.mousemove)
      this.$store.commit('setLoading', true)
      this.sockets.subscribe('websitesUpdate', function(data){
        this.$store.commit('setWebsites', data)
        this.$store.commit('setLoading', false)
        console.log(data)
        // console.log('updated ...' + new Date().toLocaleString())
      })
      this.sockets.subscribe('getSetting', data => {
        this.$store.commit('setSetting', data)
      })
      setTimeout(() => { this.$store.commit('setLoading', false) }, 10000)
    },
    computed: {
      websites: {
        get: function () {
          return this.$store.state.websites
        },
        set: function (val) {
          this.$store.commit('setWebsites', val)
        }
      },
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
      mousemove: function (event) {
        if (event.clientY < 50){
          this.show = true
        } else {
          this.show = false
        }
      }
    },
    data() {
      return {
        show: false
      }
    },
  }
</script>

<style>
  .nounderline {
    text-decoration: none !important
  }

  .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter-active {
    transition: opacity 1s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .text--white {
    color: white!important;
  }
</style>
