import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import drop from '@/page/drop.vue'
import test from '@/page/test.vue'
import testTwo from '@/page/testTwo.vue'
import homeContent from '@/page/homeContent.vue'
import allSort from '@/page/allSort.vue'
import tab from '@/page/tab.vue'
import leftSlider from '@/page/leftSlider.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/drop',
      name: 'drop',
      component: drop
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/testTwo',
      name: 'testTwo',
      component: testTwo
    },
    {
      path: '/homeContent',
      name: homeContent,
      component: homeContent
    },
    {
      path: '/allSort',
      name: allSort,
      component: allSort
    },
    {
      path: '/tab',
      name: tab,
      component: tab
    },
    {
      path: '/leftSlider',
      name: leftSlider,
      component: leftSlider
    }
  ]
})
