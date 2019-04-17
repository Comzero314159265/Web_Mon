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
    detail: null,
    setting: {
      contentCheck: null,
      imagesCheck: null,
      linkCheck: null,
      refeshTime: null,
      scriptsCheck: null,
      titleCheck: null,
    }
  },
  mutations: {
    setWebsites (state, payload) {
      state.websites = payload
    },
    setMessage (state, msg) {
      state.message = msg
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setErrorAlert(state, errorAlert) {
      state.errorAlert = errorAlert
    },
    setSuccessAlert(state, successAlert) {
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
    },
    setSetting(state, payload){
      state.setting = payload
    }
  }
})

export default store