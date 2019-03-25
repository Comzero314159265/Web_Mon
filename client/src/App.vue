<template>
  <v-app>
    <div id="app">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons">
      <v-toolbar dark color="primary" style="position: fixed;z-index:2;">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <router-link :to="'/'" class="nounderline white--text"><v-toolbar-title >Web Mon</v-toolbar-title></router-link>
        <v-spacer></v-spacer>
        <router-link :to="'list'" class="white--text nounderline"><v-toolbar-title class="white--text">List</v-toolbar-title></router-link>
      </v-toolbar>

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

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <router-link v-for="item in items"
          :key="item.title" :to="item.links" class="nounderline text-dark">
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        </router-link>
      </v-list>
      
    </v-navigation-drawer>
  </v-layout>
  </div>
  </v-app>
</template>

<script>
  import 'vuetify/dist/vuetify.min.css'
  import Store from '@/services/Store'
  import WebsitesService from '@/services/WebsitesService'

  export default {
    name: 'client',
    mounted() {
      this.fetch()
    },
    computed: {
      loading(){
        return Store.state.loading
      },
      meassage(){
        return Store.state.message
      },
      errorAlert : {
        get: function () {
          return Store.state.errorAlert
        },
        set: function (value) {
          Store.state.errorAlert = value
        }
      },
      successAlert : {
        get: function () {
          return Store.state.successAlert
        },
        set: function (value) {
          Store.state.successAlert = value
        }
      }
    },
    methods: {
     async fetch() {
      try {
          Store.commit('updateLoading', true)
          Store.commit('updateWebsites', (await WebsitesService.index()).data)
        } catch (error) {
          Store.commit('updateMessage', error)
          Store.commit('updateErrorAlert', true)
        } finally {
          Store.commit('updateLoading', false)
      }
     } 
    },
    data: () => ({
      drawer: false,
      items: [
        { title: 'Defacement Mon', icon: 'web' , links: '/'},
        { title: 'Available Mon', icon: 'event_available', links: ''},
        { title: 'Setting', icon: 'settings', links: 'Setting'},
      ]
    })
  }
</script>

<style>
  .container-fluid{
    padding-left: 0!important;
    padding-right: 0!important;
  }
  .page-container {
    min-height: 100vh;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(#000, .12);
  }
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }

  /* .wrapper {
    position: relative;
    top: 2.5rem;
    padding-top: 1.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-bottom: 5rem;
  } */

  .md-list-item:hover {
    cursor: pointer;
  }
  .nounderline {
    text-decoration: none !important
  }
</style>
