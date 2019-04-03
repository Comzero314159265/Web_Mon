<template>
  <div>
    <v-layout row wrap  justify-center mb-1>
      <v-flex xs10>
        <v-card>
          <v-card-title>
            <v-layout justify-center>
              <h3 class="text-md-center headline">Website available: {{ website.name }}</h3>
            </v-layout>
          </v-card-title>
          <v-card-text>
            <canvas ref="chartAvailable"></canvas>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap  justify-center my-2>
      <v-flex xs10>
        <v-card>
          <v-card-title>
            <v-layout justify-center>
              <h3 class="text-md-center headline">Change contents: {{ website.name }}</h3>
            </v-layout>
          </v-card-title>
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
    <v-speed-dial
      v-model="fab"
      fixed
      bottom
      right
      :direction="'top'"
      :open-on-hover="hover"
      >
      <template v-slot:activator>
        <v-btn
            v-model="fab"
            color="blue darken-2"
            dark
            fab
          >
          <v-icon>more_horiz</v-icon>
        </v-btn>
      </template>
      <v-btn
        dark
        fab
        color="blue lighten-2"
        @click="openWeb()"
      >
      <v-icon>remove_red_eye</v-icon>
      </v-btn>
      <v-btn
        color="blue lighten-2"
        dark
        fab
        @click="setStable()"
      >
      <v-icon>update</v-icon>
      </v-btn>
    </v-speed-dial>

  </div>
</template>
<script>
let Diff = require('diff')
import AvailableService from '@/services/AvailableService'
import chart from 'chart.js'
import moment from 'moment'
export default {
  mounted() {
    this.website = this.$route.params.web
    this.getDiff()
    this.plot()
    this.sockets.subscribe('setStable', () => {
      this.$store.commit('setMessage', 'Verson up to date!!!')
      this.$store.commit('setSuccessAlert', true)
      this.plot()
      this.getDiff()
    })
  },
  watch: {
    $route (to){
      if(to && to.name == 'Detail'){
        this.getDiff()
        this.plot()
      }
      
    }
  },
  methods: {
    async plot() {
      if(!this.website){
        this.$router.replace('/')
        return
      }
      let availables = (await AvailableService.show(this.website.id)).data
      let data = []
      for (const key in availables) {
        if (availables.hasOwnProperty(key)) {
          const item = availables[key]
          let date = moment(item.updatedAt).valueOf()
          let value = item.responseTime
          data.push({ t: date, y: value })
          
        }
      }
      let ctx = this.$refs.chartAvailable.getContext('2d')
      let cfg = {
        type: 'bar',
        data: {
          datasets: [{
            label: 'Response time(' + this.website.name + ')',
            backgroundColor: 'rgba(255, 99, 132, .5)',
            borderColor: 'rgb(255, 99, 132)',
            data: data,
            type: 'line',
            pointRadius: 0,
            fill: false,
            lineTension: 0,
            borderWidth: 2
          }]
        },
        options: {
          scales: {
            xAxes: [{
              type: 'time',
              distribution: 'series',
              ticks: {
                source: 'data',
                autoSkip: true
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Response time (ms)'
              }
            }]
          }
        },
        tooltips: {
          intersect: false,
          mode: 'index',
          callbacks: {
            label: function(tooltipItem, myData){
              let label = myData.datasets[tooltipItem.datasetIndex].label || ''
              if(label){
                label += ': '
              }
              label += parseFloat(tooltipItem.value).toFixed(2)
              return label
            }
          }
        }
      }
      new chart(ctx, cfg)
    },
    async getDiff() {
      this.website = this.$route.params.web
      if(!this.website){
        this.$router.replace('/')
        return
      }
      this.$refs.showDiff.innerHTML = ''
      let display = this.$refs.showDiff
      if(this.website.stable != null && this.website.current != null){
        let fragment = document.createDocumentFragment()
        let diff = Diff.diffLines(this.website.stable, this.website.current)
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
    openWeb() {
      if(this.website) {
        let url = this.website.url
        var params = [
          'height=' + screen.availHeight,
          'width=' + screen.availWidth,
          'fullscreen=yes'
        ].join(',')
        var popup = window.open(url, 'popup_window', params)
        popup.moveTo(0, 0)
      }
    },
    setStable() {
      if(this.website) {
        this.$socket.emit('setStable', this.website.id)
      }
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
      data: null,
      availables: null,
      fab: false,
      hover: false
    }
  }
}
</script>

<style scope>
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

  #create .v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }
</style>
