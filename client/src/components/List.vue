<template>
  <v-layout row wrap mt-5>
    <v-flex xs12>
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
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex md12>
                  <v-text-field label="Name*" required v-model="pickItem.name"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex md12>
                  <v-text-field label="Url*" required v-model="pickItem.url"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="editDialog = false;">
              Close
            </v-btn>
            <v-btn @click="save()">
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

export default {
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
      editing: false,
      currentWeb: null
    }
  },
  methods: {
    async deleteWeb() {
      try{
        (await WebsitesService.delete(this.currentWeb))
        Store.commit('updateMessage', 'Data Deleted !!!')
        Store.commit('updateSucessAlert',true)
        this.update()
      }catch(error){
        Store.commit('updateMessage',error)
        Store.commit('updateErrorAlert',true)
      }finally{
        this.confirmDialog = false
      }
    },
    clear(){
      this.pickItem.id = null
      this.pickItem.name = null
      this.pickItem.url = null
      this.editing = false
    },
    edit(website){
      this.clear()
      this.pickItem = Object.assign({}, website)
      this.editing = true
    },
    async save(){
      if(!this.pickItem.name || !this.this.url)
        return 
      try {
        var temp = null
        Store.commit('updateLoading',true)
        if (this.editing) {
          temp = (await WebsitesService.put(this.pickItem))
          if(temp)
            Store.commit('updateMessage', 'Data Updated !!!')
        } else {
          temp = (await WebsitesService.post(this.pickItem))
          if(temp)
            Store.commit('updateMessage', 'Data Saved !!!')
        }
        // console.log(temp)
        Store.commit('updateSuccessAlert',true)
        this.update()
      }catch(error){
        Store.commit('updateMessage',error)
        Store.commit('updateErrorAlert',true)
      }finally{
        Store.commit('updateLoading',false)
        this.editDialog = false
      }
    },
    async update () {
        try {
          this.loading = true
          Store.commit('updateWebsites', (await WebsitesService.index()).data)
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
    }
  },
}
</script>
