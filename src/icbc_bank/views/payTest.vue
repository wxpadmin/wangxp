<template>
	<div class="paytest">
		<button @click = "pay">支付</button>
	</div>
</template>
<script>
	export default{
		methods:{
			pay(){
				this.$http.post('/api/icbc/buy/score/extract/flow').then((res)=>{
					let data = res['data']['data']['data']
					this.Post(data['post_url'],data['data'])
				})
			},
			Post(URL, PARAMTERS) {
		            //创建form表单
		            var temp_form = document.createElement("form");
		            temp_form.action = URL;
		            //如需打开新窗口，form的target属性要设置为'_blank'
		            temp_form.target = "_self";
		            temp_form.method = "post";
		            temp_form.style.display = "none";
		            //添加参数
		            for (var item in PARAMTERS) {
		                var opt = document.createElement("textarea");
		                opt.name = item;
		                opt.value = PARAMTERS[item];
		                temp_form.appendChild(opt);
		            }
		            document.body.appendChild(temp_form);
		            //提交数据
		            temp_form.submit();
        	}
		}
	}
</script>
<style type="text/css">
	.paytest{
		display: flex;
		height: 100%;
		margin-top: 3rem;
	}
	.paytest button {
		color: white;
		margin:auto;
		width: 3rem;
		height: 1rem;
		margin:0 auto;
		background: #666666;
	}
</style>