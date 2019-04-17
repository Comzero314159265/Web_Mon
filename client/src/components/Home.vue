<template>
 <div>
    <v-layout row wrap>
      <v-flex xs12>
        <v-toolbar style="z-index:1;">
          <h3> Anomaly  <span class="red--text">{{ alertItem }}</span> / <span class="red--text">{{ items.length }}</span> Sites </h3>
          <v-spacer></v-spacer>
          <v-speed-dial
          v-model = "fab"
          :right = true
          :top = true
          :direction = "'bottom'"
          :transition = "'slide-y-reverse-transition'"
          floating
          data-v-step="1"
          >
          <template v-slot:activator>
          <v-btn
              v-model = "fab"
              color="primary"
              dark
              fab>
            <v-icon>view_module</v-icon>
            <v-icon>view_module</v-icon>
            </v-btn>
          </template>
          <v-btn
          fab
          dark
          color="white"
          class="black--text"
          @click="cols = 1">
          1
          </v-btn>
          <v-btn
          fab
          dark
          color="white"
          class="black--text"
          @click="cols = 2">
          2
          </v-btn>
          <v-btn
          fab
          dark
          color="white"
          class="black--text"
          @click="cols = 3">
          3
          </v-btn>
          <v-btn
          fab
          dark
          color="white"
          class="black--text"
          @click="cols = 6">
          6
          </v-btn>
          </v-speed-dial>
        </v-toolbar>
      </v-flex>
    </v-layout>
    <v-layout row wrap mt-1>
      <!-- Website items -->
      <v-flex v-for="item in items"
        v-bind:key="item.id"
        v-bind:class="getCols()" px-1 py-1>
        <v-hover>
        <v-card class="link" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
          <!-- screenshot -->
          <div @click="openDetail(item)">
          <v-img :src="'http://localhost:3000/screenshot/'+(item.screenshot)" 
            v-bind:class="[item.level > 1 ? 'alert' : '']">
            <v-layout
              right
              fill-height
              pa-3
              red--text
            >
            </v-layout>
          </v-img>
          </div>
          <v-card-actions >
            <h3>{{ item.name.toUpperCase() }}</h3>
            <!-- <v-spacer></v-spacer  >
            <v-btn @click="viewWeb(item.url)" relative>
              <v-icon >fullscreen</v-icon>
            </v-btn> -->
          </v-card-actions>
          <v-progress-linear value="100" class="my-0" :color="getClass(item)" :indeterminate="getLevel(item)"></v-progress-linear>
        </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
  export default {
    name: 'Home',
    mounted() {
      this.cols = localStorage.getItem('cols')
    },
    data() {
      return {
        fab: false
      }
    },
    computed: {
      alertItem () {
        return this.items.filter(web => web.level > 0).length
      },
      items: {
        get: function() { return this.$store.state.websites },
        set: function(val) { this.$store.commit('setWebsites', val) }
      },
      cols: {
          get: function() {
            return this.$store.state.cols
          },
          set: function(val) {
            this.$store.commit('setCols', val)
            localStorage.setItem('cols', val)
          }
        }
    },
    watch: {
      dialog (val){
        if(!val){
          this.saveItem()
        }
      }
    },
    methods: {
      openDetail(web){
        // this.$store.commit('setDetail', web)
        if(web.stable && web.current){
          this.$router.push({ name: 'Detail', query: { web_id: web.id }})
        }else{
          this.$store.commit('setMessage', 'Updating ...')
          this.$store.commit('setErrorAlert', true)
        }
        
      },
      getCols(){
        return 'xs' + Math.floor(12 / this.cols)
      },
      getClass(web){
        if (web.level == 3) {
          return '#d50000'
        } else if (web.level == 2) {
          return '#fb8c00'
        } else if (web.level == 1) {
          return '#ffd54f'
        } else {
          return '#66bb6a'
        }
      },
      getLevel(web){
        if (web.level > 0) {
          return true
        } else {
          return false
        }
      }
    },
  }
</script>
<style scope>
  #create .v-speed-dial {
    position: absolute!important;
  }

  #create .v-btn--floating {
    position: relative!important;
  }

  .alert {
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
  }

  .link:hover {
    cursor: pointer;
  }
</style>