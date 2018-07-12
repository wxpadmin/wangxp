import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 创建一个路由器实例
// 并且配置路由规则
import Index from "../views/index.vue"
import Area from '../views/area.vue'
import Areaother from '../views/areaother.vue'
import Mycoupon from '../views/mycoupon.vue'

const route = new VueRouter({
  routes: [
      {path: '/', redirect: '/index'},
      {
        name: 'index', path: '/index', component: Index
      },
      {
        name: 'areaother', path: '/areaother', component: Areaother
      },
      {
          name: 'area', path: '/area', component: Area
      },
      {
          name: 'mycoupon', path: '/mycoupon', component: Mycoupon
      }
  ]
})


export default route
