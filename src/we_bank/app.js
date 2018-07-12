import Vue from 'vue'
import './filter'
import router from './router'
import App from './main'
import '../../base/js/rem.js'
import '../../base/css/reset.css'
import '../../base/js/swiper-3.4.2.min.js'
import '../../base/css/swiper-3.4.2.min.css'
//toast 中间层
import Toast from "../../base/plugins/toast.js"
import Components from "../../base/plugins/components.js"
import Axios from "../../base/plugins/axios.js"
import Wx from "../../base/Wx.js"
//银联sdk

Vue.prototype.axiosHeader = {
	"business-id":'10000017',
    "action" : "card",
    "test" : "1"
}

Vue.use(Toast)
Vue.use(Components)
Vue.use(Axios)

//事件转发器
Vue.prototype.hub=new Vue();


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
