import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Restaurants from '../views/Search_Restaurants.vue'
import Show from '../views/ShowRestaurantsLists.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
   path: '/signup',
   name: 'Signup',
   component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/search_restaurants',
    name: 'Search Restaurants',
    component: Restaurants
  },
  {
    path: '/ShowRestaurantsLists',
    name: 'Show Restaurants Lists',
    component: Show
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
