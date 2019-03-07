<template>
  <div id="app" class="container-fluid">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons">
    <md-toolbar class="md-primary" style="position: fixed;z-index: 3;">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title"><router-link :to="'/'" class="text-white nounderline">Web Mon</router-link></span>

      <div class="md-toolbar-section-end">
        <router-link :to="'list'" class="text-white"><md-button >Lists</md-button></router-link>
      </div>
    </md-toolbar>
        <md-drawer :md-active.sync="showNavigation" style="min-height: 100vh;position: fixed;z-index: 999;">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Web Mon</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <md-icon>web</md-icon>
          <span class="md-list-item-text">Defacement Mon</span>
        </md-list-item>

        <md-list-item>
          <md-icon>event_available</md-icon>
          <span class="md-list-item-text">Available Mon</span>
        </md-list-item>

      </md-list>
    </md-drawer>

    <md-content class="wrapper">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </md-content>
  </div>
</template>

<script>
  import 'vue-material/dist/vue-material.min.css'
  import 'vue-material/dist/theme/default.css'
  import 'bootstrap/dist/css/bootstrap.min.css'
  export default {
    name: 'client',
    data: () => ({
      showNavigation: false,
      showSidepanel: false
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

  .wrapper {
    position: relative;
    top: 2.5rem;
    padding-top: 1.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-bottom: 5rem;
  }

  .md-list-item:hover {
    cursor: pointer;
  }
  .nounderline {
    text-decoration: none !important
  }
</style>
