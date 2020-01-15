import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import chart from 'chart.js';

const fb = require('./plugins/firebaseConfig.js')


Vue.config.productionTip = false

let app
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    new Vue({
      el: '#app',
      router,
      store,
      vuetify,
      chart,
      render: h => h(App)
    })  
  }
})
