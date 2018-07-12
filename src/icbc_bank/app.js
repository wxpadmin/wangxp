import Promise from 'es6-promise';
import Vue from 'vue'
import './filter'
import './directive'
import router from './router'
import App from './main'
import '../../base/js/rem.H5.js'
import './assets/js/hybrid_app'
import './assets/css/reset.scss'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import {Toast} from 'mint-ui';
import components from "../../base/plugins/components";
import toast from "../../base/plugins/toast.js"
import Axios from "../../base/plugins/axios.js"
Promise.polyfill()
Vue.prototype.$http = axios

axios.defaults.timeout = 30000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;';           //配置请求头
axios.defaults.headers['action'] = 'flow'; 
axios.defaults.headers['business-id'] = '10000003';  

Vue.use(MintUI)
Vue.use(components)
Vue.use(toast)
Vue.use(Axios)
//POST传参序列化(添加请求拦截器)
// axios.interceptors.request.use((config) => {
//   //在发送请求之前做某件事
//   if(config.method  === 'post'){
//     config.data = qs.stringify(config.data);
//   }
//   return config;
// },(error) =>{
//   Toast("错误的传参");
//   return Promise.reject(error);
// });

// //返回状态判断(添加响应拦截器)
// axios.interceptors.response.use((res) =>{
//   //对响应数据做些事
//   console.log(res.data.status)
//   console.log(res)
//   if(res.data.status){
//     // _.toast(res.data.msg);
//     //Toast(res.data.msg);
//     return Promise.reject(res);
//   }
//   return res;
// }, (error) => {
//   Toast("网络异常");
//   return Promise.reject(error);
// });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
