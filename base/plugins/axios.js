import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


var Axios = {}



Axios.install = function(Vue){
	var host = ""
	if(Vue.prototype.axiosHost){
		 host = Vue.prototype.axiosHost
	}

	//配置默认请求头
	if(Vue.prototype.axiosHeader){
		let axiosHeader  = Vue.prototype.axiosHeader
		for(var key in axiosHeader){
			axios.defaults.headers.post[key] = axiosHeader[key];           //配置请求头
			axios.defaults.headers.get[key] = axiosHeader[key];           //配置请求头
		}
	}

	Vue.prototype.$axios ={

  		//get请求
		get(url,params,success,error,catchErr){
	    	NProgress.start()
			return axios.get( host + url,{params:params}).then(function(response){

	        	NProgress.done()

				var _ctx = response['data']

				if(_ctx['status'] == 0){
			    	success && success (_ctx['data']?_ctx['data']:_ctx,_ctx)
				}else{
					error && error (_ctx)
				}

			}) .catch(function(err){
				catchErr && catchErr()
	        	NProgress.done()

			    console.log(err)

			});
		},
		//post请求
		post(url,params,success,error,catchErr){
			NProgress.start()
			return axios.post( host + url,params).then(function(response){

	        	NProgress.done()

				var _ctx = response['data']

				if(_ctx['status'] == 0){
			    	success && success (_ctx['data']?_ctx['data']:_ctx,_ctx)
				}else{
					error && error (_ctx)
				}

			}) .catch(function(err){
				catchErr && catchErr()
	        	NProgress.done()

			    console.log(err)
			    
			});
		}

	}
}

export default Axios;
