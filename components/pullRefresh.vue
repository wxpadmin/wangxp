<template>
	<div id="pull-refresh" class="pull-refresh"  @touchmove="touchMove($event)">
		<div class="pull-content" ref = "content">
			<slot></slot>
		</div>
		<div class="pull-status">
			<span v-if = "!loading && !nomore">{{tipMsg}}</span>
			<span v-if = "loading && !nomore">{{loadingMsg}}</span>
			<span v-if = "nomore">{{nomoreMsg}}</span>
		</div>
	</div>
</template>
<script>
    export default {
        data(){
            return {
                scrolled:false
            }
        },
        props:{
            loading:{
                type:Boolean,
                default:false
            },
            nomore:{
                type:Boolean,
                default:false
            },
            tipMsg:{
                type:String,
                default:'上滑加载更多'
            },
            loadingMsg:{
                type:String,
                default:'加载中。。。'
            },
            nomoreMsg:{
                type:String,
                default:'已无更多数据'
            }
        },
        methods:{
            //重置组件状态
            reset(){
                this.scrolled = false
            },
            touchMove(e){
                if(!this.scrolled){
                    this.scrolled = true
                    this.handleScroll()
                }
            },
            handleScroll(){
                if(!this.scrolled){
                    return
                }
                var _body = document.body
                var scrollTop = _body.scrollTop
                //防止scrollTop 为 0
                if (document.documentElement && (_body.scrollTop - document.documentElement.scrollTop<=0)){
                    scrollTop = document.documentElement.scrollTop
                }
                //滚动到页面最底端
                if(_body.scrollHeight  <=  scrollTop + document.body.clientHeight){
                    if(!this.loading && !this.nomore){
                        this.$emit('loadmore')
                    }
                }
            }
        },
        mounted(){
            window.addEventListener('scroll', this.handleScroll)
        }
    }
</script>
<style type="text/css">
	.pull-refresh{
		-webkit-overflow-scrolling: touch;
		overflow: hidden;
		/*margin-bottom: .5rem;*/
	}
	.pull-status{
		width: 100%;
		height: .8rem;
		line-height: .8rem;
		text-align: center;
		/*background-color: #ffffff;*/
		background-color: rgba(0,0,0,0);
		font-size: .28rem;
		color: #666666;
	}
</style>
