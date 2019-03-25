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
  },
  mutations: {
    updateWebsites (state, value) {
      state.websites = value
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
    }
  }
})

export default store