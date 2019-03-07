<template>
  <div>
    <md-table>
      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Url</md-table-head>
        <md-table-head>Action</md-table-head>
      </md-table-row>

      <md-table-row v-for="(web) in websites" v-bind:key="web.id">
        <md-table-cell md-numeric>{{ web.id }}</md-table-cell>
        <md-table-cell>{{ web.name }}</md-table-cell>
        <md-table-cell>{{ web.url }}</md-table-cell>
        <md-table-cell>
          <md-button class="md-icon-button" v-on:click="editweb(web);showDialog=true;">
            <md-icon>edit</md-icon>
          </md-button>
          <md-button class="md-icon-button" v-on:click="confirmshow = true;currentWeb = web">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

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
              <md-button type="submit" class="md-primary" :disabled="sending">{{ edit ? 'Update' : 'Add Website' }}</md-button>
            </md-card-actions>
          </md-card>
        </form>
      </div>
    </md-dialog>

    <md-dialog-confirm :md-active.sync="confirmshow" md-title="Do you want to delete this?" md-confirm-text="Delete"
      md-cancel-text="Cancel" @md-confirm="deleteweb()" />

    <md-snackbar :md-active.sync="websiteSaved" class="bg-primary">{{ message }}</md-snackbar>
    <md-snackbar :md-active.sync="responseError" class="bg-danger">{{ errormsg }}</md-snackbar>

    <md-button class="md-fab" style="position:fixed;bottom:3%;right:3%;" v-on:click="clearForm();showDialog=true;edit=false">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>
<script>
  import WebsitesService from '@/services/WebsitesService'
  import Home from './Home.vue';
  import {
    validationMixin
  } from 'vuelidate'
  import {
    required,
    url
  } from 'vuelidate/lib/validators'

  export default {
    name: 'List',
    mixins: [validationMixin],
    data: function () {
      return {
        websites: [],
        showDialog: false,
        edit: false,
        sending: false,
        message: null,
        errormsg: null,
        websiteSaved: false,
        responseError: false,
        confirmshow: false,
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
    },
    mounted() {
      this.fetchdata()
    },
    methods: {
      fetchdata: async function () {
        this.websites = (await WebsitesService.index()).data
      },
      clearForm() {
        this.$v.$reset()
        this.form.name = null
        this.form.url = null
      },
      getValidationClass(fieldName) {
        const field = this.$v.form[fieldName]
        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      validateWebsite() {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.add()
        }
      },
      add: async function () {
        try {
          var temp = null
          if (this.edit) {
            temp = (await WebsitesService.put(this.form))
          } else {
            temp = (await WebsitesService.post(this.form))
          }
          this.message = 'Update ' + temp.data.name + ' successfully'
          this.websiteSaved = true
          this.showDialog = false
          this.clearForm()
          this.fetchdata()
          Home.data().websites = this.websites
        } catch (error) {
          if (error && error.response) {
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
      deleteweb: async function () {
        try {
          (await WebsitesService.delete(this.currentWeb))
          this.message = 'Delete data successfully'
          this.websiteSaved = true
          this.showDialog = false
          this.clearForm()
          this.fetchdata()
        } catch (error) {
          if (error && error.response) {
            let errormsg = ''
            error.response.data.error.forEach(element => {
              errormsg += element.message
            })
            this.errormsg = (errormsg)
            this.responseError = true
          }

        }


      },

    }
  }
</script>