<template>
  <v-app>
    <div id="app">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons">
        <transition name="fade">
        <toolbar v-if="show" />
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
    created() {

    },
    mounted() {
      window.addEventListener('mousemove', this.mousemove);
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

<style scope>
  .nounderline {
    text-decoration: none !important
  }

  .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
