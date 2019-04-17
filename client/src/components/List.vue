<template>
  <v-layout row wrap justify-center>
    <v-flex xs10 text-md-center>
      <v-card>
        <v-card-title primary-title>
          <v-layout row wrap justify-center>
            <h2>List of Site</h2>
          </v-layout>
        </v-card-title>
      </v-card>
    </v-flex>
    <v-flex xs10>
      <v-data-table 
      :headers="headers"
      :items="websites"
      disable-initial-sort
      class="elevation-1 text-md-center">
        <template v-slot:items="website" >
          <td >{{ website.item.id }}</td>
          <td>{{ website.item.name }}</td>
          <td>{{ website.item.url }}</td>
          <td >
            <v-btn @click="edit(website.item);editDialog = true">
              <v-icon>
                edit
              </v-icon>
            </v-btn>
            <v-btn @click="currentWeb = Object.assign({}, website.item);confirmDialog = true;">
              <v-icon>
                delete
              </v-icon>
            </v-btn>

          </td>
        </template>
      </v-data-table>
      <v-btn
        v-model="fab"
        color="primary"
        dark
        fab
        fixed
        bottom
        right
        @click="clear();editDialog=true;"
        >
      <v-icon>add</v-icon>
      </v-btn>


      <!-- Edit Dialog -->
      <v-dialog v-model="editDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Website</span>
          </v-card-title>
          <v-card-text>
            <form>
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex md12>
                  <v-text-field 
                  label="Name*"
                  :error-messages="nameErrors"
                  required 
                  v-model="name"
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex md12>
                  <v-text-field 
                  label="Url*"
                  :error-messages="urlErrors"
                  required 
                  v-model="url"
                  @input="$v.url.$touch()"
                  @blur="$v.url.$touch()">
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            </form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="clear">
              Clear
            </v-btn>
            <v-btn @click="submit">
              {{ editing ? 'Update' : 'Add Website' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Confirm Dialog -->
      <v-dialog v-model="confirmDialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Confirm Dialog</v-card-title>
          <v-card-text>
            Do you want to delete this?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="confirmDialog = false">Disagree</v-btn>
            <v-btn color="green darken-1" flat @click="deleteWeb">Agree</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


    </v-flex>
    
  
  </v-layout>

</template>
<script>
import WebsitesService from '@/services/WebsitesService'
import Store from '@/services/Store'
import {
  validationMixin
} from 'vuelidate'
import {
  required,
  url
} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    name: { required },
    url: { required, url }
  },
  mounted() {
  },
  data() {
    return {
      headers: [
        {text: 'ID', align: 'center', value: 'id'},
        {text: 'Name', align: 'center', value: 'name'},
        {text: 'Url', align: 'center', value: 'url'},
        {text: 'Action', align: 'center', value: ''},
      ],
      fab: false,
      confirmDialog: false,
      editDialog: false,
      pickItem: {
        name: null,
        url: null
      },
      name: null,
      url: null,
      id: null,
      editing: false,
      currentWeb: null
    }
  },
  methods: {
    async deleteWeb() {
      try{
        (await WebsitesService.delete(this.currentWeb))
        Store.commit('setMessage', 'Data Deleted !!!')
        Store.commit('setSuccessAlert',true)
        this.update()
      }catch(error){
        Store.commit('setMessage',error)
        Store.commit('setErrorAlert',true)
      }finally{
        this.confirmDialog = false
      }
    },
    submit(){
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.save()
      }
    },
    clear(){
      this.$v.$reset()
      this.id = null
      this.name = null
      this.url = null
      this.editing = false
    },
    edit(website){
      this.clear()
      this.name = website.name
      this.url = website.url
      this.id = website.id
      this.pickItem = Object.assign({}, { id:website.id , name:website.name, url:website.url })
      this.editing = true
    },
    async save(){
      try {
        Store.commit('setLoading',true)
        let item = {
          name: this.name,
          url: this.url
        }
        if(this.id){
          item.id = this.id
        }

        if (this.editing) {
          (await WebsitesService.put(item))
          Store.commit('setMessage', 'Data Updated !!!')
        } else {
          let website = (await WebsitesService.post(item)).data
          this.$socket.emit('updateSingleWebsite', website)
          Store.commit('setMessage', 'Data Saved !!!')
        }
        Store.commit('setSuccessAlert',true)
        this.update()
      }catch(error){
        Store.commit('setMessage',error)
        Store.commit('setErrorAlert',true)
      }finally{
        Store.commit('setLoading',false)
        this.editDialog = false
      }
    },
    async update () {
        try {
          this.loading = true
          Store.commit('setWebsites', (await WebsitesService.index()).data)
          this.$socket.emit('addWebsite')
        } catch (error) {
          this.meassage = error
          this.errorAlert = true
        } finally {
          this.loading = false
        }
    }
  },
  computed: {
    websites() {
      return Store.state.websites
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    urlErrors () {
      const errors = []
      if (!this.$v.url.$dirty) return errors
      !this.$v.url.required && errors.push('Url is required.')
      !this.$v.url.url && errors.push('Invalid url format')
      return errors
    }
  },
}
</script>
