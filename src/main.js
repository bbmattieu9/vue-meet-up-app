// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { store } from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import AlertCmp from './components/Shared/Alert.vue'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, { theme: {
  primary: '#ee44aa',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
        firebase.initializeApp({
          apiKey: "AIzaSyCImVzRhIERGuZu4J0bcidNmPsb-SxSSsU",
          authDomain: "vueauth-2aa04.firebaseapp.com",
          databaseURL: "https://vueauth-2aa04.firebaseio.com",
          projectId: "vueauth-2aa04",
          storageBucket: "vueauth-2aa04.appspot.com",
          messagingSenderId: "332941882526"
        })
        this.$store.dispatch('loadMeetups')
  }
})
