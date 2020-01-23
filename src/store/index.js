import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
  },
  mutations: {
  
  },
  actions: {
    changeState() {
      this.state.loggedIn = true
    },
    logout() {
      firebase.auth().signOut()
      .then((user) => {
          this.state.loggedIn = false
          this.$router.replace('/home')

      })
  },
    getUsers() {
      // get usernames for v-select options
      fireDb.collection('users').get()
      .then(snapshot => {
          if (snapshot.empty) {
          console.log('No matching documents.');
          return;
          }  
          snapshot.forEach(doc => {
              this.users.push((doc.id, '=>', doc.data().Name))
          });
      })
      .catch(err => {
          console.log('Error getting documents', err);
      });
    }
  },
  modules: {
  }
})
