<template>
	<div class="nav-bar">
		<div class="nav-back-btn">
			<div class="arrow-box" @click = "goBack">
        		<b class="left"><i class="left-arrow1"></i><i class="left-arrow2"></i></b>
    		</div>
		</div>
    	<div class="nav-title">
    		{{title}}
    	</div>
    	 <div class="navbar-right">
    	 	<slot></slot>
         </div>
	</div>
</template>
<script>
	// 组件接收参数
	// 	title:导航条标题，
	// 	@goback:点击返回按钮触发的回调
	// 	path:点击返回按钮的路径（默认为退回上一页）

	export default{
		props:{
			title:{
				type:String,
				default:"标题"
			},
			path:{
				type:String,
				default:""
			}
		},
		methods:{
			goBack(){
				this.$emit('goback')
				if(this.path){
					window.location.href = this.path
				}else{
					window.history.go(-1)
				}
			}
		}
	}
</script>
<style type="text/css">
	.nav-bar{
		width: 100%;
	    height: .84rem;
	    text-align: center;
	    line-height: .84rem;
	    position: relative;
	    background-color: #fff;
	    border-bottom: 1px solid #d5d5d5;
	}

	.nav-back-btn{
	    float: left;
	    display: inline-block;
		height: 100%;
		margin-left: .1rem;
	}
	.nav-title{
    	display: inline-block;
    	margin-left: -.3rem;
    	font-size: .36rem;
    }
    .navbar-right{
    	display: inline-block;
    	position: absolute;
    	right: .1rem;
    }
	 .arrow-box{
        display: inline-block;
        float: left;
        width:.2rem;
        height:.2rem;
        left:0;
        top: 50%;
	    position: relative;
	    margin-top: -10px;        
	    z-index: 2;/*兼容ie8-*/
    }
    .left-arrow1,.left-arrow2{
        width:0;
        height:0;
        display:block;
        position:absolute;
        left:0;
        top:0;
        z-index:5;/*兼容ie8-*/
        border-top:8px transparent dashed;
        border-left:8px transparent dashed;
        border-bottom:8px transparent dashed;
        border-right:8px white solid;
        overflow:hidden;
    }
    .left-arrow1{
        border-right:8px #e42f46 solid;
    }
    .left-arrow2{
        left:3px;/*重要*/
        border-right:8px white solid;
    }
    
</style>