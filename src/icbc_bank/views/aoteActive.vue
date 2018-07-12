<template>
	<div class="activity-body">
        <heading :name="'爱享流量'"></heading>
		<div class="activityContent">
		
		</div>
	</div>
	
</template>
<script>
    import heading from '../components/heading.vue'
	export default {
		mounted(){
			var _hmt = _hmt || [];
			(function() {
			  var hm = document.createElement("script");
			  hm.src = "https://hm.baidu.com/hm.js?64eb7d13a6feeb295893d6809b7eb513";
			  var s = document.getElementsByTagName("script")[0]; 
			  s.parentNode.insertBefore(hm, s);
			})();
		},
		 components:{
            heading
        },
	}
</script>
<style lang="less" scoped>
	.activity-body{
		height: 100%;
	}
	.activityContent{
		background: url('../assets/images/active_bg.png');
		background-size: 100% 100%;
		width: 100%;
		height: 12.5rem;
	}
</style>