<template>
    <div>
        <navbar :title="'还款详情'"></navbar>
        <!--首页-->
        <div class="details">
      		<div class="details-top">
      			<div id="" style="width: 100%; height: 0.8rem;"></div>
      			<p :class="status==1?'succ':'fail'"></p>
      			<p>{{txt}}</p>
      			<p>{{txte}}</p>
      		</div>
      		<ul class="details-bottom">
      			<li><span>还款至：</span><span class="two_span">{{bank}}&nbsp;-<span class="over">{{name}}</span>(&nbsp;尾号{{num}}&nbsp;)</span></li>
      			<li><span>还款金额：</span><span class="two_span" style="color: #F45F63;">{{money | filter_money_icon}}</span></li>
      			<li><span>支付流量：</span><span class="two_span">{{flow}}M   </span></li>
      		</ul>
      		<router-link :to="{ name: 'index',query:{}}" class="detailed-list">
	      		<div class="gobank">
	      			完成
	      		</div>
      		</router-link>
        </div>
        <loading v-show="loading"></loading>
    </div>
</template>
<style type="text/css">
	.nav-title{
    	display:block!important;
    }
</style>

<script>
  import loading from '../../components/loading'  
  export default {
    mounted () {
       this.bank = this.$route.query.bank
       this.name = this.$route.query.name
       this.num = this.$route.query.num
       this.money = this.$route.query.money
       this.flow = this.$route.query.flow
       this.status = this.$route.query.status
       if(this.status == 1){
       		this.txt = '流量支付成功'
       		this.txte = '还款需求已提交到银行，请耐心等待'
       }else{
       		this.txt = '还款失败'
       		this.txte = '抱歉，您的还款失败，已扣除的流量5分钟内返回您的流量账户余额内，请稍后重试'
       }
    },
    data () {
      return {
        loading:false,
        title:'流量换好礼',
        bank:'',
        name:'',
        num:'',
        money:'',
        flow:'',
        status:'',
        txt:'',
        txte:''
      }
    },
    methods: {
        getTypeList(){
              this.$axios.get('/api/icbc/member/type')
        },
      },
    components:{
        loading,
    },
    watch:{
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.succ{
	background: url('../../assets/images/pay/icon-succ.png') no-repeat;
	background-size:100% ;
}
.fail{
	background: url('../../assets/images/pay/icon-fail.png') no-repeat;
	background-size:100% ;
}
	.details{
		width: 100%;
		height: 100%;
		.details-top{
			width: 100%;
			height: 3.89rem;
			background: #FFFFFF;
			p:nth-child(2){
				width: 0.96rem;
				height: 0.96rem;
				margin:0rem 0 0.3rem 3.27rem;
			}
			p:nth-child(3){
				width: 100%;
				font-family: 'PingFangSC-Regular';
				font-size: 0.36rem;
				color: #333333;
				letter-spacing: 0.03px;
				text-align: center;
				margin-bottom: 0.2rem;
			}
			p:nth-child(4){
				width: 80%;
				font-family: 'PingFangSC-Regular';
				font-size: 0.24rem;
				color: #999999;
				letter-spacing: 0.03px;
				text-align: center;
				margin: 0 auto;
			}
		}
		.details-bottom{
			width: 100%;
			background: #FFFFFF;
			li{
				width: 100%;
				height: 1.14rem;
				border-top:1px solid #EFEFEF ;
				line-height: 1.14rem;
				.over{
					/*float: right;*/
					display: inline-block;
					width: 1.5rem;
					 overflow: hidden;
					 text-overflow:ellipsis;
					 white-space: nowrap;
					font-size: .3rem;
					margin-left: 0!important;
					text-align: center;
				}
				span:nth-child(1){
					margin-left: 0.3rem;
					font-family: 'PingFangSC-Regular';
					font-size: .3rem;
					color: #666666;
					
				}
				.two_span{
					float: right;
					margin-right: 0.3rem;
					font-family: 'PingFangSC-Regular';
					font-size: .3rem;
					color: #666666;
					display: flex;
				}
				
			}	
		}
		.gobank{
			width: 6.9rem;
			height: 0.88rem;
			margin:0.6rem auto;
			text-align: center;
			line-height: 0.88rem;
			font-size: 0.32rem;
			color: #FFFFFF;
			background: #E42F46;
			border-radius: 0.09rem
		}
	}
</style>

