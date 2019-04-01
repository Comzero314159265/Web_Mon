<template>
 <div>
    <v-layout row wrap>
      <v-flex xs12>
        <v-toolbar style="z-index:1;">
          <h3> Your page on monitor <span class="red--text">{{ alertItem }}</span> / <span class="red--text">{{ items.length }}</span> page </h3>
          <v-spacer></v-spacer>
          <v-speed-dial
          v-model = "fab"
          :right = true
          :top = true
          :direction = "'bottom'"
          :transition = "'slide-y-reverse-transition'"
          >
          <template v-slot:activator>
          <v-btn
              color="primary"
              dark
              fab>
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
        v-bind:key="item.screenshot"
        v-bind:class="getCols()" px-1 py-1>
        <v-hover>
        <v-card class="link" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
          <!-- screenshot -->
          <div @click="openDetail(item)">
          <v-img :src="'http://localhost:3000/screenshot/'+(item.screenshot)" 
            v-bind:class="[item.name == 'etda' ? 'alert' : 'normal']">
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
            <h4>{{ item.name }}</h4>
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

      <!-- <v-btn
        v-model="fab"
        color="primary"
        dark
        fab
        fixed
        bottom
        right
        @click="dialog = true"
      >
      <v-icon>add</v-icon>
      </v-btn> -->
  </div>
</template>
<script>
  export default {
    name: 'Home',
    mounted() {
      this.$store.commit('updateLoading', true)
      this.sockets.subscribe('websitesUpdate', function(data){
        // console.log('updating ...' + new Date().toLocaleString())
        this.items = data
        this.$store.commit('updateLoading', false)
        console.log('updated ...' + new Date().toLocaleString())
      })
    },
    data() {
      return {
        fab: false
      }
    },
    computed: {
      alertItem () {
        return this.items.filter(web => web.name == 'etda').length
      },
      filteredList () {
        return this.websites.filter(item => {
          return item.name.toLowerCase()
          .includes(this.search.toLowerCase())
        })
      },
      items: {
        get: function() { return this.$store.state.websites },
        set: function(val) { this.$store.commit('updateWebsites', val) }
      },
      cols: {
          get: function() {
            return this.$store.state.cols 
          },
          set: function(val) {
            this.$store.commit('setCols', val)
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
        this.$store.commit('setDetail', web)
        this.$router.push('Detail')
      },
      getCols(){
        return 'xs' + Math.floor(12 / this.cols)
      },
      viewWeb (url) {
        var params = [
          'height=' + screen.availHeight,
          'width=' + screen.availWidth,
          'fullscreen=yes'
          ].join(',')
          var popup = window.open(url, 'popup_window', params)
          popup.moveTo(0, 0)
      },
      getClass(web){
        if (web.name == 'etda') {
          return 'red'
        } else {
          return 'green'
        }
      },
      getLevel(web){
        if (web.name == 'etda') {
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
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }

  .alert {
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
  }

  .link:hover {
    cursor: pointer;
  }
</style>