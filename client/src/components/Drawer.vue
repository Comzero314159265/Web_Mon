<template>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary>
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
            :key="item.title" :to="item.links" class="nounderline black--text" v-bind:class="[item.disabled ? 'disabled' : '']">
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
</template>
<script>
export default {
  name: 'drawer',
  data() {
    return {
      items: [
          { title: 'Defacement Mon', icon: 'web' , links: '/'},
          { title: 'Available Mon', icon: 'event_available', links: '/Available', disabled: true},
          { title: 'Setting', icon: 'settings', links: '/Setting'},
        ]  
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
<style scope>
  .router-link-active {
    color: black!important;
  }
  .router-link-exact-active {
    color: #1976d2!important;
  }
  .disabled {
    color: gray!important;
  }
</style>
