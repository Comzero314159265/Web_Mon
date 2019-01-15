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
                            <div class="" style="position:fixed;top:50%;left:50%;right:50%;bottom:50%;z-index: 99;">
                                <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate" v-if="loading"></md-progress-spinner>
                            </div>
                            <div class="my-2 px-1" v-bind:class="[ col == 1 ? 'col-md-12' : col == 2 ? 'col-md-6' : col == 3 ? 'col-md-4' : 'col-md-2']"
                                v-for="(item, index) in this.websites" v-bind:key="item.id">
                                <fullscreen ref="fullscreen" @change="fullscreenChange">
                                    <md-card>
                                        <md-card-media-cover md-solid>
                                            <md-card-media>
                                                <div class="embed-responsive embed-responsive-16by9" style="min-height: 150px;">
                                                    <vue-friendly-iframe :src='item.url'></vue-friendly-iframe>
                                                </div>
                                            </md-card-media>

                                            <md-card-area>
                                                <md-card-actions md-alignment="space-between">
                                                    <p>source: <a :href=item.url class="text-white">{{ item.name }}</a></p>
                                                    <md-button class="md-icon-button md-raised md-primary" v-on:click="deleteweb(item)">
                                                        <md-icon>delete</md-icon>
                                                    </md-button>
                                                    <md-button class="md-icon-button md-raised md-primary" v-on:click="editweb(item);showDialog=true;">
                                                        <md-icon>edit</md-icon>
                                                    </md-button>
                                                    <md-button class="md-icon-button" @click="toggle(index)">
                                                        <md-icon>fullscreen</md-icon>
                                                    </md-button>
                                                </md-card-actions>
                                            </md-card-area>
                                        </md-card-media-cover>
                                    </md-card>
                                </fullscreen>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <md-button class="md-fab" style="position:fixed;bottom:5%;right:5%;" v-on:click="clearForm();showDialog=true;edit=false">
            <md-icon>add</md-icon>
        </md-button>

        <div>
            <md-dialog :md-active.sync="showDialog" md-dynamic-height style="width:40%;">
                <div class="px-3">
                    <form novalidate class="row" @submit.prevent="validateWebsite">
                        <md-card class="col-md-12">
                            <md-card-header>
                                <div class="md-title">Add Website</div>
                            </md-card-header>

                            <md-card-content>
                                <div class="row">
                                    <div class="col-md-12">
                                        <md-field :class="getValidationClass('name')">
                                            <label for="name">Name</label>
                                            <md-input name="name" id="name" autocomplete="given-name" v-model="form.name"
                                                :disabled="sending" />
                                            <span class="md-error" v-if="!$v.form.name.required">The name is
                                                required</span>
                                        </md-field>
                                    </div>
                                </div>

                                <md-field :class="getValidationClass('url')">
                                    <label for="url">Url</label>
                                    <md-input type="url" name="url" id="url" autocomplete="url" v-model="form.url" />
                                    <span class="md-error" v-if="!$v.form.url.required">The url is required</span>
                                    <span class="md-error" v-if="!$v.form.url.url">Invalid url</span>

                                </md-field>
                            </md-card-content>

                            <md-card-actions>
                                <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                                <md-button type="submit" class="md-primary" :disabled="sending">Add Website</md-button>
                            </md-card-actions>
                        </md-card>
                    </form>
                </div>
            </md-dialog>
        </div>

        <md-snackbar :md-active.sync="websiteSaved">The user {{ lastWebsite }} was saved with success!</md-snackbar>
        <md-snackbar :md-active.sync="responseError">{{ errormsg }}</md-snackbar>

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
    import WebsitesService from '@/services/WebsitesService'
    import {
        validationMixin
    } from 'vuelidate'
    import {
        required,
        url
    } from 'vuelidate/lib/validators'

    Vue.use(fullscreen)
    export default {
        name: 'Home',
        mixins: [validationMixin],
         mounted() {
            //this.loading = true
            this.fetchdata()
        },
        methods: {
            fetchdata: async function() {
                this.websites = (await WebsitesService.index()).data
                this.loading = false
            },
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
            add: async function () {
                try {
                    var temp = null
                    if (this.edit) {
                        temp = (await WebsitesService.put(this.form))
                    } else {
                        temp = (await WebsitesService.post(this.form))
                    }
                    this.lastWebsite = temp.data.name
                    this.websiteSaved = true
                    this.showDialog = false
                    clearForm()
                    fetchdata()
                } catch (error) {
                    if (error && error.response) {
                        console.log(JSON.stringify(error))
                        let errormsg = ''
                        error.response.data.error.forEach(element => {
                            errormsg += element.message
                        })
                        this.errormsg = (errormsg)
                        this.responseError = true
                    }

                }
            },
            editweb: function (website) {
                this.clearForm()
                this.form = Object.assign({}, website)
                this.edit = true
            },
            deleteweb: async function (website) {
                let temp = Object.assign({}, website)
                let res = null
                try {
                    res = await WebsitesService.delete(temp)
                    this.lastWebsite = temp.data.name
                    this.websiteSaved = true
                } catch (err) {
                    if (error && error.response) {
                        console.log(JSON.stringify(error))
                        let errormsg = ''
                        error.response.data.error.forEach(element => {
                            errormsg += element.message
                        })
                        this.errormsg = (errormsg)
                        this.responseError = true
                    }
                }

            },
            getValidationClass(fieldName) {
                const field = this.$v.form[fieldName]
                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },
            clearForm() {
                this.$v.$reset()
                this.form.name = null
                this.form.url = null
            },
            validateWebsite() {
                this.$v.$touch()

                if (!this.$v.$invalid) {
                    this.add()
                }
            }
        },
        data() {
            return {
                fullscreen: false,
                col: 3,
                websites: null,
                loading: false,
                showDialog: false,
                responseError: false,
                websiteSaved: false,
                errormsg: null,
                lastWebsite: null,
                edit: false,
                form: {
                    name: null,
                    url: null,
                },
                sending: false
            }
        },
        validations: {
            form: {
                name: {
                    required
                },
                url: {
                    required,
                    url
                }
            }
        }
    }
</script>