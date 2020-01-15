import firebase from 'firebase';
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import AddPost from '../views/AddPosts.vue'

Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
    routes: [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/add-post',
    name: 'addPosts',
    component: AddPost,
  },
  {
    path: '/add-hours',
    name: 'addHours',
    component: () => import('../views/AddHours.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  }
]
})

// router.beforeEach((to, from, next) => {
//   let currentUser = firebase.auth().currentUser
//   let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

//   if (requiresAuth && !currentUser) {
//     next('/home');
//   } else if (requiresAuth && currentUser) {
//     next();
//   } else {
//     next();
//   }
// })

export default router;
