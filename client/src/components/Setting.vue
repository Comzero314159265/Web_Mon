<template>
  <div>
    <v-text-field
      v-model="time"
      required
    >
    </v-text-field>
    <v-btn
    @click="settiming()">
    </v-btn>
  </div>
</template>
<script>
export default {
  name: 'Setting',
  data() {
    return {
      time: null
    }
  },
  methods: {
    settiming(){
      if (this.time) {
        (this.$socket.emit('setIntervel', this.time))
      }
    }
  },
}
</script>