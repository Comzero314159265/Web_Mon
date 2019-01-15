<template>
    <div class="container-fluid">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
            integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <md-toolbar :md-elevation="1" style="z-index: 2;">
                        <md-speed-dial class="md-top-right" md-direction="bottom" md-event="click">
                            <md-speed-dial-target class="md-primary">
                                <md-icon>view_module</md-icon>
                            </md-speed-dial-target>

                            <md-speed-dial-content>
                                <md-button class="md-icon-button" v-on:click="changecols(1)">
                                    1
                                </md-button>

                                <md-button class="md-icon-button" v-on:click="changecols(2)">
                                    2
                                </md-button>

                                <md-button class="md-icon-button" v-on:click="changecols(3)">
                                    3
                                </md-button>

                                <md-button class="md-icon-button" v-on:click="changecols(6)">
                                    6
                                </md-button>

                            </md-speed-dial-content>
                        </md-speed-dial>
                    </md-toolbar>
                    <div class="container">
                        <div class="row">
                            <div class="my-2 px-1" v-bind:class="[ col == 1 ? 'col-md-12' : col == 2 ? 'col-md-6' : col == 3 ? 'col-md-4' : 'col-md-2']"
                                v-for="(item, index) in this.websites" v-bind:key="item.id">
                                <fullscreen ref="fullscreen" @change="fullscreenChange">
                                    <md-card>
                                        <md-card-media-cover md-solid>
                                            <md-card-media >
                                                <div class="embed-responsive embed-responsive-16by9" style="min-height: 150px;">
                                                    <vue-friendly-iframe :src='item.url'></vue-friendly-iframe>
                                                </div>
                                            </md-card-media>

                                            <md-card-area>
                                                <md-card-actions md-alignment="space-between">
                                                    <p>source: <a :href=item.url>{{  item.name }}</a></p>
                                                    <md-button class="md-icon-button" @click="toggle(index)">
                                                        <md-icon>fullscreen</md-icon>
                                                    </md-button>
                                                </md-card-actions>
                                            </md-card-area>
                                        </md-card-media-cover>
                                    </md-card>
<!-- 
                                    <md-card>
                                        <md-card-media>
                                            <div class="embed-responsive embed-responsive-16by9" style="overflow: hidden;">
                                                <vue-friendly-iframe :src='item.url' sandbox></vue-friendly-iframe>
                                            </div>
                                        </md-card-media>

                                        <md-card-expand>
                                            <md-card-actions md-alignment="space-between">
                                                <md-button>
                                                    <md-button class="md-icon-button" @click="toggle(index)">
                                                        <md-icon>fullscreen</md-icon>
                                                    </md-button>
                                                </md-button>
                                            </md-card-actions>
                                        </md-card-expand>
                                    </md-card> -->
                                </fullscreen>
                            </div>
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
        mounted() {
            alert()
        },
        methods: {
            toggle: function (index) {
                this.$refs['fullscreen'][index].toggle() // recommended
                // this.fullscreen = !this.fullscreen // deprecated
            },
            fullscreenChange: function (fullscreen) {
                this.fullscreen = fullscreen
            },
            changecols: function (col) {
                this.col = col
            },
            fetch: function () {
                
            }
        },
        data() {
            return {
                fullscreen: false,
                col: 3,
                websites: [{
                        id: 1,
                        name: 'etda',
                        url: 'https://www.blognone.com'
                    },
                    {
                        id: 2,
                        name: 'etda',
                        url: 'https://www.set.or.th/'
                    },
                    {
                        id: 3,
                        name: 'etda',
                        url: 'https://mdbootstrap.com/plugins/vue/iframe//'
                    },
                    {
                        id: 4,
                        name: 'etda',
                        url: 'https://www.etda.or.th'
                    },
                ],
                item: 2
            }
        }
    }
</script>