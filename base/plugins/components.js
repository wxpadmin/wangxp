
// 全局公用组件可在此次全局注册

import navbar from "../../components/navbar.vue"
import pullRefresh from "../../components/pullRefresh.vue"

const components = {
	navbar,
	pullRefresh,
	install(Vue){
        Vue.component('navbar', navbar)
        Vue.component('pull-refresh', pullRefresh)
	}
}

module.exports = components
