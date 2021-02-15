import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Layer from '@/components/Layer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layer',
      component: Layer
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
