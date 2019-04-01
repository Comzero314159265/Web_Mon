<template>
  <div>
    <v-layout row wrap>
      <v-flex xs6 px-1>
        <h3 class="text-md-center headline">Stable version</h3>
        <v-card>
          <v-card-text>
            <p>{{ detail.stable }}</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6 px-1>
        <h3 class="text-md-center headline">Current version</h3>

        <v-card>
          <v-card-text>
            <p>{{ detail.current }}</p>
          </v-card-text>
        </v-card>
        
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  computed: {
    detail: {
      get: function(){ return this.$store.state.detail },
      set: function(val){ return this.$store.commit('setDetail', val) }
    }
  },
}
</script>