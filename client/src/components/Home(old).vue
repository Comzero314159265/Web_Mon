<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <md-toolbar :md-elevation="1" style="z-index: 2;">
                        <md-speed-dial class="md-top-right" md-direction="bottom">
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
                    <div class="container-fluid mx-5">
                        <div class="row">
                            <div class="" style="position:fixed;top:50%;left:50%;right:50%;bottom:50%;z-index: 99;">
                                <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate" v-if="loading"></md-progress-spinner>
                            </div>
                            <div class="my-2 px-1" v-bind:class="[ col == 1 ? 'col-md-12' : col == 2 ? 'col-md-6' : col == 3 ? 'col-md-4' : 'col-md-2']"
                                v-for="(item, index) in items" v-bind:key="item.id">
                                    <md-card>
                                        <!-- TODO: Classify Class of Danger -->
                                        <md-card-media-cover md-solid v-bind:class="[ item.level == 0 ? 'normalClass' : item.level == 1 ? 'cautionClass' : item.level == 2 ? 'warningClass' : item.level == 3 ? 'dangerClass' : '']">
                                            <md-card-media>
                                                <div v-on:click="open(item.url)" class="hover">
                                                    <div class="" style="min-height: 150px;">
                                                        <img :src=' imgDefault || "http://localhost:3000/screenshot/"+item.current'
                                                            alt="" class="img-fluid" />
                                                    </div>
                                                    <h1 class="text-danger">{{ item.class }}</h1>
                                                </div>
                                            </md-card-media>

                                            <md-card-area>
                                                <md-card-actions md-alignment="space-between">
                                                    <p>source: <a :href=item.url class="text-white">{{ item.name }}</a></p>
                                                    <md-button class="md-icon-button" @click="deleteItem(index)">
                                                        <md-icon>delete</md-icon>
                                                    </md-button>
                                                    <md-button class="md-icon-button" v-on:click="open(item.url)">
                                                        <md-icon>fullscreen</md-icon>
                                                    </md-button>
                                                </md-card-actions>
                                            </md-card-area>
                                        </md-card-media-cover>
                                    </md-card>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <md-dialog :md-active.sync="showDialog">
            <md-list>
                <md-subheader>List of websites</md-subheader>
                <md-list-item v-for="website in websites" v-bind:key="website.id">
                    <md-checkbox v-model="temps" v-bind:key="website.id" v-on:change="update" :value=website />
                    <span class="md-list-item-text">{{ website.name }} ({{ website.url }})</span>
                </md-list-item>

            </md-list>
        </md-dialog>

        <md-button class="md-fab" style="position:fixed;bottom:3%;right:3%;" @click="showDialog = true">
            <md-icon>add</md-icon>
        </md-button>

        <md-snackbar :md-active.sync="responseSuccess" class="bg-primary">{{ message }}</md-snackbar>
        <md-snackbar :md-active.sync="responseError" class="bg-danger">{{ errormsg }}</md-snackbar>

    </div>
</template>

<script>
    import WebsitesService from '@/services/WebsitesService'

    export default {
        name: 'Home',
        mounted() {
            this.fetchdata()
            this.interval = setInterval(this.update, this.refeshTime)
        },
        methods: {
            update(){
                if (this.temps.length > 0){
                    this.items = this.temps
                    this.loading = true
                    this.imgDefault = 'http://localhost:3000/screenshot/image-not-found.png'
                    Promise.all(this.temps.map(x => WebsitesService.show(x.id))).then(v => {
                        this.items = v.map(x => x.data)
                        this.imgDefault = ''
                        this.loading = false
                    })
                }else{
                    this.items = []
                }
            },
            fetchdata: async function () {
                this.loading = true
                try {
                    this.websites = (await WebsitesService.index()).data
                } catch (error) {
                    this.loading = false
                }
            },
            changecols: function (col) {
                this.col = col
            },
            open: function (url) {
                var params = [
                    'height=' + screen.availHeight,
                    'width=' + screen.availWidth,
                    'fullscreen=yes'
                ].join(',')
                var popup = window.open(url, 'popup_window', params)
                popup.moveTo(0, 0)
            },
            addItem: function () {
                this.temps.push(this.websites[0])
            },
            deleteItem: function (index) {
                this.temps.splice(index, 1)
                this.items.splice(index, 1)
            }
        },
        data() {
            return {
                fullscreen: false,
                col: 3,
                responseError: false,
                responseSuccess: false,
                errormsg: null,
                message: null,
                loading: false,
                showDialog: false,
                interval: null,
                refeshTime: 1000 * 60 * 5,
                items: [],
                temps: [],
                websites: [],
                imgDefault: ''
            }
        }
    }
</script>

<style>
    .hover:hover {
        cursor: pointer;
    }

    .dangerClass {
        box-shadow: 0 0 10px 1px red;
        transition: 0.3s;
    }

    .warningClass {
        box-shadow: 0 0 10px 1px orange;
        transition: 0.3s;
    }

    .cautionClass {
        box-shadow: 0 0 10px 1px yellow;
        transition: 0.3s;
    }

    .normalClass {
        box-shadow: 0 0 10px 1px green;
        transition: 0.3s;
    }

    .md-action {
        padding: 0!important;
    }
</style>