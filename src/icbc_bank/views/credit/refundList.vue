<template>
    <div>
        <navbar :title="'还款记录'"></navbar>
        <!--首页-->
        <div v-if='data' class="refund-List">
      		<div v-for="item,index in data" class="list">
      			<h3>{{index}}</h3>
      			<ul>
	      			<li v-for="_data,index in item">
	      				<router-link :to="{ name: 'restatus',query:{id:_data.id}}">	
	      					<div class="list-left">
	      						<p>{{_data.bank_card_name}}—{{_data.bank_user_name}}（尾号{{_data.bank_card_number}}）</p>
	      						<p><span style="margin-right: 0.2rem;">{{_data.create_time | math_year}}</span><span>{{_data.create_time | filter_week}}</span></p>
	      					</div>
	      					<div class="list-right">
	      						<p>{{_data.money | filter_money_icon}}</p>
	      						<p :class="order_status(_data.recharge_status)">{{_data | filter_status}}</p>
	      					</div>
	      				</router-link>
	      			</li>	
      			</ul>
      		</div>
        </div>
        <div v-else class="nomal">暂无还款信息</div>
        <!--<loading v-show="loading"></loading>-->
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
       this.score = this.$route.query.score
       this.getList()
    },
    data () {
      return {
        loading:false,
        title:'流量换好礼',
        status:1,
        page_number:1,
        nomore:false,
        data:'',
        conter:''
      }
    },
    methods: {
        getList(){
              this.$axios.get('/api/icbc/user/repayment/record/list',{},(res)=>{
              	console.log(res)
              	this.data = res
              })
        },
        order_status(data){
        	let value = ''
        	switch (data){
		        case 0:
				  value = '';//待充值
				  break;
			    case 1:
				  value = 'wait';//待充值
				  break;
			    case 2:
				  value = 'succ';//充值成功
				  break;
			    case 3:
				  value = 'fail';//充值失败
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

	.nomal{
		width: 100%;
		height: 1.5rem;
		line-height: 1.5rem;
		text-align: center;
		font-size: 0.3rem;
	}
	.refund-List{
		width: 100%;
		height: 100%;
		.list{
			h3{
				font-family: '.PingFangSC-Regular';
				font-size: 0.28rem;
				color: #E53953;
				margin:0.4rem 0 0.1rem 0.27rem;
			}
			ul{
				width: 100%;
				background: #ffffff;
				li{
					width: 100%;
					height: 1.2rem;
					border-bottom: 1px solid #EFEFEF;
					.list-left{
						width: 70%;
						float:left;
						margin-left:0.1rem;
						p:nth-child(1){
							font-family: '.PingFangSC-Regular';
							font-size: 0.28rem;
							color: #333333;
							margin: 0.2rem 0 0.16rem 0;
						}
						p:nth-child(2){
							font-family: '.PingFangSC-Regular';
							font-size: 0.22rem;
							color: #999999;
						}
					}
					.list-right{
						width: 20%;
						float:right;
						margin-right:0.3rem;
						p:nth-child(1){
							text-align: right;
							font-family: '.PingFangSC-Regular';
							font-size: 0.28rem;
							color: #333333;
							margin: 0.2rem 0 0.10rem 0;
						}
						p:nth-child(2){
							text-align: right;
							font-family: '.PingFangSC-Regular';
							font-size: 0.28rem;
							color: #999999;
						}
					}
				}
			}
		}
	}
	.succ{
		color: #28AC3E!important;
	}
	.fail{
		color: #E42F46!important;
	}
	.wait{
		color: #FF8700!important;
	}
</style>

