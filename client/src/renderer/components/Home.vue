<template>
  <div id="container">
    <div class="row pt-5">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-4" v-for="(screen, index) in displays">
            <md-card>
              <md-card-media-cover md-solid>
                <a href="">
                <md-card-media>
                  <div class="embed-responsive embed-responsive-16by9" style="min-height: 150px;">
                    <!-- <vue-friendly-iframe :src="'localhost:3000/?url=' + item.url"></vue-friendly-iframe> -->
                  </div>
                </md-card-media>
                </a>

                <md-card-area>
                  <md-card-actions md-alignment="space-between">
                    <p>Screen : <a href="" class="text-white">{{ index + 1 }}</a></p>
                    <md-button class="md-icon-button" v-on:click="addWindow(index)">
                      <md-icon>add</md-icon>
                    </md-button>
                  </md-card-actions>
                </md-card-area>
              </md-card-media-cover>
            </md-card>
          </div>
        </div>
      </div>
    </div>
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
                      <md-input name="name" id="name" autocomplete="given-name" v-model="form.name" :disabled="sending" />
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

    <md-button class="md-fab" style="position:fixed;bottom:3%;right:3%;"  v-on:click="clearForm();showDialog=true;">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script>
  import {
    validationMixin
  } from 'vuelidate'
  import {
    required,
    url
  } from 'vuelidate/lib/validators'
  import WebsitesService from '@/services/WebsitesService'
  const electron = require('electron')
  const BrowserWindow = electron.remote.BrowserWindow

  export default {
    name: 'Home',
    mixins: [validationMixin],
    mounted () {
      this.webfeteh()
    },
    methods: {
      addWindow: function (index) {
        let window = new BrowserWindow({
          x: this.displays[index].bounds.x,
          y: this.displays[index].bounds.y,
          width: this.displays[index].workAreaSize.width,
          height: this.displays[index].workAreaSize.height,
          center: true,
          webPreferences: {
            nodeIntegration: false
          }
        })
        let url = this.popweb()
        window.loadURL(url)
      },
      popweb () {
        if (this.count === this.websites.length) {
          this.count = 0
        }
        return this.websites[this.count++].url
      },
      webfeteh: async function () {
        this.websites = (await WebsitesService.index()).data
        this.loading = false
      },
      getValidationClass: function (fieldName) {
        const field = this.$v.form[fieldName]
        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.name = null
        this.form.url = null
      },
      validateWebsite () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.add()
        }
      }
    },
    data: function () {
      return {
        count: 0,
        websites: [],
        displays: electron.screen.getAllDisplays(),
        showDialog: false,
        sending: false,
        form: {
          name: null,
          url: null
        }
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