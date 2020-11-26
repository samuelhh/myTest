import Vue from 'vue'
import VueRouter from 'vue-router'
import { _import } from "@/utils/tools"
import Layout from "@/layout"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect:'/home',
    children:[
      {
        path:"home",
        component:_import("home")
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: _import("about")
  }
]

const router = new VueRouter({
  routes
})

export default router
