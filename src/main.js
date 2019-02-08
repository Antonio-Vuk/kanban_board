import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import * as firebase from 'firebase'
import { store } from './store'
import AlertCmp from './components/Shared/alert.vue'

Vue.config.productionTip = false
Vue.component('app-alert', AlertCmp)

new Vue({
  render: function (h) { return h(App) },
  router,
  store,
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAOT3CYuJvLCSkBD5_JCSPTwJgmIvtOtV8',
      authDomain: 'kanbanboard-b5dba.firebaseapp.com',
      databaseURL: 'https://kanbanboard-b5dba.firebaseio.com',
      projectId: 'kanbanboard-b5dba',
      storageBucket: 'kanbanboard-b5dba.appspot.com',
      messagingSenderId: '1056473351117'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.$store.dispatch('autoSignIn', user)
      }
    })
  },
}).$mount('#app')
