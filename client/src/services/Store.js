import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    websites: [],
    message: '',
    loading: false,
    errorAlert: false,
    successAlert: false,
    drawer: false,
    cols: 3,
    detail: null
  },
  mutations: {
    updateWebsites (state, payload) {
      state.websites = payload
    },
    updateMessage (state, msg) {
      state.message = msg
    },
    updateLoading(state, loading) {
      state.loading = loading
    },
    updateErrorAlert(state, errorAlert) {
      state.errorAlert = errorAlert
    },
    updateSuccessAlert(state, successAlert) {
      state.successAlert = successAlert
    },
    setDrawer(state, payload){
      state.drawer = payload
    },
    setCols(state, payload){
      state.cols = payload
    },
    setDetail(state, payload){
      state.detail = payload
    }
  }
})

export default store