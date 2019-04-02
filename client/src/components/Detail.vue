<template>
  <div>
    <v-layout row wrap  justify-center>
      <v-flex xs10 px-1>
        <h3 class="text-md-center headline">Change contents: {{ website.name }}</h3>
        <v-card>
          <v-card-text>
            <v-layout row wrap justify-center>
              <v-flex xs12 px-2 py-2>
                <div ref="showDiff" class="diffPanel"></div>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
let Diff = require('diff')
export default {
  mounted() {
    this.website = this.$route.params.web
    this.getDiff()
    // console.log(this.$refs)
    this.sockets.subscribe('getAvailable', data => {
      this.data = data
    })
  },
  watch: {
    $route (to){
      if(to && to.name == 'Detail'){
        this.getDiff()
      }
      
    }
  },
  methods: {
    getDiff() {
      this.website = this.$route.params.web
      this.$socket.emit('getAvailable', this.website.id)
      this.$refs.showDiff.innerHTML = ''
      let display = this.$refs.showDiff
      let fragment = document.createDocumentFragment()
      let diff = Diff.diffWords(this.website.stable, this.website.current)
      for (var i=0; i < diff.length; i++) {
        if (diff[i].added && diff[i + 1] && diff[i + 1].removed) {
          let swap = diff[i];
          diff[i] = diff[i + 1];
          diff[i + 1] = swap;
        }

        let node;
        if (diff[i].removed) {
          node = document.createElement('del');
          node.appendChild(document.createTextNode(diff[i].value));
        } else if (diff[i].added) {
          node = document.createElement('ins');
          node.appendChild(document.createTextNode(diff[i].value));
        } else {
          node = document.createTextNode(diff[i].value);
        }
        fragment.appendChild(node);
      }
      display.appendChild(fragment)
    }
  },
  data() {
    return {
      website: {
        name: '',
        stable: '',
        current: ''
      },
      test: '',
      display: null,
      fragment: null,
      data: null
    }
  }
}
</script>

<style>
  del {
    text-decoration: none;
    color: #b30000;
    background: #fadad7;
    word-wrap: break-word;
  }
  ins {
    background: #eaf2c2;
    color: #406619;
    text-decoration: none;
    word-wrap: break-word;
  }
  .diffPanel{
    word-wrap: break-word;
  }
</style>
