<template>
    <div>
        <navbar :title="'还款详情'"></navbar>
        <!--首页-->
        <div class="details">
      		<div class="details-top">
      			<div id="" style="width: 100%; height: 0.8rem;"></div>
      			<p :class="order_status(data.recharge_status)"></p>
      			<p>{{txt}}</p>
      			<p>{{status_txt}}</p>
      		</div>
      		<ul class="details-bottom">
      			<li><span>还款至：</span><span  class="two_spans">{{data.bank_card_name}}&nbsp;-<span  class="over">{{data.bank_user_name}}</span>(&nbsp;尾号{{data.bank_card_number}}&nbsp;)</span></li>
      			<li><span>还款金额：</span><span style="color: #F45F63;">{{data.money | filter_money_icon}}</span></li>
      			<li><span>提交时间：</span><span>{{data.create_time}}</span></li>
      			<li><span>订单号：</span><span>{{data.order_id}}</span></li>
      			<li><span>支付流量：</span><span>{{data.score}}M   </span></li>
      		</ul>
      		<router-link :to="{ name: 'index',query:{}}" class="detailed-list">
	      		<div class="gobank">
	      			返回
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
       this.id = this.$route.query.id
       console.log(this.order_status())
       this.getTypeList()
    },
    data () {
      return {
        loading:false,
        title:'流量换好礼',
        status:2,
        txt:'',
        status_txt:'',
        id:'',
        data:''
      }
    },
    methods: {
        getTypeList(){
              this.$axios.get('/api/icbc/user/repayment/record/detail',{id:this.id},(res)=>{
              	this.data = res
              })
        },
        order_status(data){
        	let value = ''
        	switch (data){
        		case 0:
		          value = '';
		          this.txt = ''
		          this.status_txt = ''
		          break;
		        case 1:
		          value = 'wait';//待充值
		          this.txt = '还款中',
		          this.status_txt = '还款申请已提交，请耐心等待'
		          break;
		        case 2:
		          value = 'succ';//充值成功
		          this.txt = '还款成功'
		          this.status_txt = '信用卡还款成功'
		          break;
		        case 3:
		          value = 'err';//充值失败
		          this.txt = '还款失败'
		          this.status_txt = '已将支付流量退还到您的账户中'
		          break;
		         
		     }
        	return value
        }
      },
    components:{
        loading,
    },
    watch:{
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
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
				width: 100%;
				font-family: 'PingFangSC-Regular';
				font-size: 0.24rem;
				color: #999999;
				letter-spacing: 0.03px;
				text-align: center;
			}
		}
		.details-bottom{
			width: 100%;
			background: #FFFFFF;
			li{
				width: 100%;
				height: 1.14rem;
				border-top:1px solid #DDDDDD ;
				line-height: 1.14rem;
				.over{
					display: inline-block;
					width: 1.5rem;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					font-size: .3rem;
					margin-left: 0!important;
					text-align: center;
					letter-spacing: 0.03px;
				}
				span:nth-child(1){
					margin-left: 0.3rem;
					font-family: 'PingFangSC-Regular';
					font-size: .3rem;
					color: #666666;
					letter-spacing: 0.03px;
				}
				span:nth-child(2){
					float: right;
					margin-right: 0.3rem;
					font-family: 'PingFangSC-Regular';
					font-size: .3rem;
					color: #666666;
					letter-spacing: 0.03px;
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
	.succ{
		background: url('../../assets/images/pay/icon-succ.png') no-repeat;
		background-size:100% ;
	}
	.err{
		background: url('../../assets/images/pay/icon-fail.png') no-repeat;
		background-size:100% ;	
	}
	.wait{
		background: url('../../assets/images/pay/icon-wait.png') no-repeat;
		background-size:100% ;
	}
</style>

