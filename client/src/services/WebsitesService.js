import Api from '@/sevices/Api'

export default {
  index () {
    return Api().get('websites')
  }
}