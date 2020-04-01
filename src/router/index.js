import Vue from 'vue'
import VueRouter from 'vue-router'
import NoteList from '../components/NoteList.vue'
import TodoList from '../components/TodoList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'NoteList',
    component: NoteList
  },
  {
    path: '/:id',
    name: 'TodoList',
    component: TodoList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
