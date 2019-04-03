<template>
  <div>
    <v-layout row wrap  justify-center>
      <v-flex xs10>
        <v-card>
          <v-card-text>
            <canvas ref="chartAvailable"></canvas>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
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
import AvailableService from '@/services/AvailableService'
import chart from 'chart.js'
import moment from 'moment'
export default {
  mounted() {
    this.website = this.$route.params.web
    this.getDiff()
    this.plot()
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
            label: 'response time(' + this.website.name + ')',
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
      availables: null
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
