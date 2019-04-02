<template>
  <v-layout row wrap justify-center>
    <v-flex xs5>
      <v-card>
        <v-card-title>
          <v-layout justify-center>
            <h3 class="headline">Setting System</h3>
          </v-layout>
        </v-card-title>
        <v-card-text class="pb-0">
          <v-switch
              v-model="setting.title_check"
              label="title_check"
              color="red"
              hide-details
          ></v-switch>
          <v-switch
              v-model="setting.content_check"
              label="content_check"
              color="red"
              hide-details
          ></v-switch>
          <v-switch
              v-model="setting.images_check"
              label="images_check"
              color="red"
              hide-details
          ></v-switch>
          <v-switch
              v-model="setting.link_check"
              label="link_check"
              color="red"
              hide-details
          ></v-switch>
          <v-switch
              v-model="setting.scripts_check"
              label="scripts_check"
              color="red"
              hide-details
          ></v-switch>
          <v-text-field
            v-model="setting.refesh_time"
            label="Refesh time"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-layout justify-center>
            <v-btn color="success"
              @click="settiming()">
              Save
            </v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: 'Setting',
  mounted() {
    this.sockets.subscribe('getSetting', data => {
      console.log(data)
    })
  },
  data() {
    return {

    }
  },
  computed: {
    setting: {
      get: function(){
        return this.$store.state.setting
      },
      set: function(val){
        this.$store.commit('setSetting', val)
      }
    }
  },
  methods: {
    settiming(){
      console.log(this.setting)
    }
  },
}
</script>