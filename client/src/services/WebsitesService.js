import Api from '@/services/Api'

export default {
  index () {
    return Api().get('website')
  },
  post(website) {
    return Api().post('website',website)
  },
  put(website) {
    return Api().put('website',website)
  },
  delete(website){
    return Api().delete('website',website)
  }
}