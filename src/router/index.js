import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import chat from '@/components/chat'
import singup from '@/components/auth/singup'
import firebase from 'firebase'
import profile from '@/components/profile'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'chat',
      component: chat,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/singup',
      name: 'singup',
      component: singup,
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
      props: true,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
router.beforeEach((to,form,next) =>{
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    let user = firebase.auth().currentUser
    if(user){
      next()
    }else{
      next({
        name: 'login'
      })
    }
  }else{
    next()
  }
})
export default router