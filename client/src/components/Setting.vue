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
                    <v-layout justify-center>
            <v-flex xs8>
          <v-switch
              v-model="setting.titleCheck"
              label="Title Check"
              color="red"
              hide-details
          ></v-switch>
            </v-flex></v-layout>
                    <v-layout justify-center>
            <v-flex xs8>
          <v-switch
              v-model="setting.contentCheck"
              label="Content Check"
              color="red"
              hide-details
          ></v-switch>
            </v-flex></v-layout>
                    <v-layout justify-center>
            <v-flex xs8>
          <v-switch
              v-model="setting.imagesCheck"
              label="Images Check : not available"
              color="red"
              hide-details
              disabled
          ></v-switch>
            </v-flex></v-layout>
                    <v-layout justify-center>
            <v-flex xs8>
          <v-switch
              v-model="setting.linkCheck"
              label="Link Check : not available"
              color="red"
              disabled
              hide-details
          ></v-switch>
            </v-flex></v-layout>
          <v-layout justify-center>
          <v-flex xs8>
          <v-switch
              v-model="setting.scriptsCheck"
              label="Scripts Check : not available"
              color="red"
              disabled
              hide-details
          ></v-switch>
          </v-flex>
          </v-layout>
          <v-layout justify-center pt-1>
            <v-flex xs8>
            <v-text-field
            v-model="setting.refeshTime"
            label="Refesh Time (Min)"
            required
          ></v-text-field>
            </v-flex>
          </v-layout>

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
    this.sockets.subscribe('setSetting', data => {
      this.setting = data
      this.$store.state.message = 'Data updated!!!'
      this.$store.state.successAlert = true
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
      // console.log(this.setting)
      this.$socket.emit('setSetting', this.setting)
    }
  },
}
</script>