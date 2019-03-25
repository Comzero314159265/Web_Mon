<template>
 <div>
    <v-layout row wrap mt-5>
      <v-flex xs12>
        <v-toolbar style="z-index:1;">
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
        v-bind:key="item.id"
        v-bind:class="getCols()" px-1 py-1>
        <v-card>
          <!-- screenshot -->
          <v-img :src="imageUrl(item.current)">
          </v-img>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="viewWeb(item.url)">
              <v-icon>fullscreen</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    
    <!-- Modal -->
    <v-dialog
      v-model="dialog"
      scrollable
      width="500">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
        List of websites
        </v-card-title>
        <v-card-text style="max-height: 300px;">
          <v-layout row wrap>
            <v-flex xs-10>
              <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
              ></v-text-field>
              <v-divider></v-divider>
              <v-checkbox 
                v-model="items" 
                v-for="item in filteredList" 
                :label="item.name" 
                v-bind:key="item.id"
                :value="item"
                hide-details
                @change="saveItem">
              </v-checkbox>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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

      <v-btn
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
      </v-btn>
  </div>
</template>
<script>
  import WebsitesService from '@/services/WebsitesService'
  import Store from '@/services/Store'

  export default {
    name: 'Home',
    mounted() {
      this.fetch()
    },
    data() {
      return {
        fab: false,
        fabadd: false,
        loading: false,
        meassage: '',
        successAlert: false,
        errorAlert: false,
        dialog: false,
        search: '',
        cols: 3,
        items: []
      }
    },
    computed: {
      filteredList () {
        return this.websites.filter(item => {
          return item.name.toLowerCase()
          .includes(this.search.toLowerCase())
        })
      },
      websites() {
        return Store.state.websites
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
      fetch(){
        try{
          Store.commit('updateLoading',true)
          let temps = (localStorage.getItem('items'))
          if(temps)
            this.items = JSON.parse(temps)
        }catch(error){
          Store.commit('updateMessage',error)
          Store.commit('updateErrorAlert',true)
        }finally{
          Store.commit('updateLoading',false)
        }
      },
      saveItem(){
        localStorage.setItem('items', JSON.stringify(this.items))
      },
      imageUrl (url) {
        if(url){
          return 'http://localhost:3000/screenshot/' + url
        }else{
          return './image-not-found.png'
        }
      },

      getCols(){
        return 'xs' + (12 / this.cols)
      },

      viewWeb (url) {
        var params = [
          'height=' + screen.availHeight,
          'width=' + screen.availWidth,
          'fullscreen=yes'
          ].join(',')
          var popup = window.open(url, 'popup_window', params)
          popup.moveTo(0, 0)
      }
    },
  }
</script>
<style>
  #create .v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }
</style>