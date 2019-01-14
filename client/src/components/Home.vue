<template>
    <div class="container-fluid">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
            integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-4 my-2" v-bind:class="[ item == 3 ? 'col-4' : item == 4 ? 'col-3' : 'col-6']" v-for="(item, index) in this.websites" v-bind:key="item.id">
                        <fullscreen ref="fullscreen" @change="fullscreenChange">
                            <md-card>
                                <md-card-media>
                                    <div class="embed-responsive embed-responsive-16by9" style="overflow: hidden;">
                                        <vue-friendly-iframe :src='item.url' sandbox></vue-friendly-iframe>
                                    </div>                    
                                </md-card-media>

                                <md-card-expand>
                                    <md-card-actions md-alignment="space-between">
                                    <div class="">
                                        Source : <a href="" id="websrc">{{ item.url }}</a>
                                    </div>
                                        <md-button>
                                                <md-button class="md-icon-button" @click="toggle(index)">
                                                    <md-icon>fullscreen</md-icon>
                                                </md-button>
                                        </md-button>
                                    </md-card-actions>
                                </md-card-expand>
                            </md-card>
                        </fullscreen>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                            <div class="viewport">
      <md-toolbar :md-elevation="1">
        <span class="md-title">Full</span>
      </md-toolbar>

      <md-list class="md-double-line">
        <md-subheader>Phone</md-subheader>

        <md-list-item>
          <md-icon class="md-primary">phone</md-icon>

          <div class="md-list-item-text">
            <span>(650) 555-1234</span>
            <span>Mobile</span>
          </div>

          <md-button class="md-icon-button md-list-action">
            <md-icon>sms</md-icon>
          </md-button>
        </md-list-item>

        <md-list-item class="md-inset">
          <div class="md-list-item-text">
            <span>(650) 555-1234</span>
            <span>Mobile</span>
          </div>

          <md-button class="md-icon-button md-list-action">
            <md-icon>sms</md-icon>
          </md-button>
        </md-list-item>

        <md-divider></md-divider>
        <md-subheader>Email</md-subheader>

        <md-list-item>
          <md-icon class="md-primary">email</md-icon>

          <div class="md-list-item-text">
            <span>aliconnors@example.com</span>
            <span>Personal</span>
          </div>
        </md-list-item>

        <md-list-item class="md-inset">
          <div class="md-list-item-text">
            <span>ali_connors@example.com</span>
            <span>Work</span>
          </div>
        </md-list-item>
      </md-list>
    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
    crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"
    crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k"
    crossorigin="anonymous"></script>

<script>
    import fullscreen from 'vue-fullscreen'
    import Vue from 'vue'
    Vue.use(fullscreen)
    export default {
        name: 'Home',
        methods: {
            toggle: function(index) {
                this.$refs['fullscreen'][index].toggle() // recommended
                // this.fullscreen = !this.fullscreen // deprecated
            },
            fullscreenChange: function(fullscreen) {
                this.fullscreen = fullscreen
            }
        },
        data() {
            return {
                fullscreen: false,
                websites: [
                    { id:1, name:'etda', url:'https://www.blognone.com' },
                    { id:2, name:'etda', url:'https://www.set.or.th/' },
                    { id:3, name:'etda', url:'https://mdbootstrap.com/plugins/vue/iframe//' },
                    { id:4, name:'etda', url:'https://etda.or.th' },
                ],
                item: 2
            }
        }
    }
</script>