import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CounterIncrement from '../views/CounterIncrement.vue'
import CounterDecrement from '../views/CounterDecrement.vue'
import NewsList from '../views/NewsList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/increment',
    name: 'CounterIncrement',
    component: CounterIncrement
  },
  {
    path: '/decrement',
    name: 'CounterDecrement',
    component: CounterDecrement
  },
  {
    path: '/news',
    name: 'NewsList',
    component: NewsList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
