<template>
    <div>
        <navbar :title="'还信用卡'"></navbar>
        <div class="goChage">
        	<div class="chage_bank" v-if="data.card_info">
        		<div id=""></div>
        		<div id="">
        			<p>{{data.card_info.bank_card_name}}</p>
        			<p><span style="margin-right: 0.42rem;">{{data.card_info.bank_user_name}}</span><span>尾号{{data.card_info.bank_card_number}}</span></p>
        		</div>
        		<div @click="off = true">删除</div>
        	</div>
        	<div class="conters">
        		<p>当前可使用账户流量最大额<span id="">{{flow}}</span>M<span @click="all()">全额还款</span></p>
        		<!-- <p>可还信用卡金额<span>{{all_money}}</span>元<i class="questionIcon" @click = "showRule">?</i></p> -->
        		<p>可还信用卡金额<span>{{all_money}}</span>元</p>

        	</div>
        	 <div class="chage_conter">
            	<ul>
            		<li><span>输入还款流量：</span><input type="number" id="" @input="inputs()"  onkeyup="this.value=this.value.replace(/[^\d]/g,'') "  v-model="card_mark" value="" placeholder="请输入100的倍数"/><span>M</span></li>
            		<li><span>可还款金额：</span><input type="text" readonly="readonly"  @input="inputs()" v-model="amount" value="" :placeholder="placeholder"/><span>元</span></li>
            	</ul>
            </div>
            <p v-if="hint_words" class="assertion">{{hint_words}}</p>
            <div class="chage_btn" @click="refund()"  v-if="btn">立即还款</div>
            <div class="color" v-if="!btn">立即还款</div>
            <router-link :to="{ name: 'buyflowtest',query:{score:scores}}" class="detailed-list">
            	<p class="pay">流量不足？<span>去积分兑换/购买流量</span></p>
            </router-link>
            <div class="hint">
            	<h2>温馨提示：</h2>
            	<p>1.流量还信用卡到账时间可能有1-3天的时间延时，请耐心等待。最终以信用卡发卡行查询结果或通知为准；</p>
            	<p>2.如因信用卡还款通道问题导致还款失败，扣除的流量会第一时间退回到您的流量账户，敬请谅解；</p>
            	<p>3、流量可还款金额随政策变化浮动，具体以页面显示金额为准；</p>
            	<p>4、本服务由北京若为信息技术有限公司提供。若您在还款过程中遇到任何问题，请咨询客服热线4008796969，客服人员将真诚为您解答。</p>
            </div>
        </div>
        <div v-show="affirm" class="shade-hint">
        	<div class="information">
        		<h3>
        			确认订单
        			<!--<span @click="off_pop()"></span>-->
        		</h3>
        		<p><span id="">扣除流量额：</span><span id="">{{card_mark}}M</span></p>
        		<p><span id="">还信用卡额：</span><span id="">{{amount}}元</span></p>
        		<p><span id="" @click="call_off()">取消</span><span id="" @click="go_money">确定还款</span></p>
        	</div>
        </div>
        <div v-show="off" class="shade-hint">
        	<div class="information">
        		<h3>
        			删除此卡
        			<!--<span @click="off_pop()"></span>-->
        		</h3>
        		<p>删除后，下次为此信用卡还款需要重新输入所需信息。</p>
        		<div><span id="" @click="del()">确定删除</span><span @click="call_off()" id="">取消</span></div>
        	</div>
        </div>
        <div v-show="isShowRule" class="shade-hint">
        	<div class="information">
        		<h3>
        			注意
        			<!--<span @click="off_pop()"></span>-->
        		</h3>
        		<p>这里是文案</p>
        		<div><span class="ruleClose" @click="hideRule()">知道了</span></div>
        	</div>
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
       this.card_id = this.$route.query.card_id
       this.status = this.$route.query.status
       if(this.status == 1){
//     		this.$Toast.show('信用卡添加成功，可进行还款',2000)
       }
       this.init()
    },
    data () {
      return {
        loading:false,
        title:'流量换好礼',
        affirm:false,
        off:false,
        card_mark:'',//卡号
        hint_words:'',//输入时的提示
        flow:'',//等前账户最大额
        card_id:'',
        all_money:'',
        data:'',
		amount:'',
		placeholder:'',
		btn:false,
		status:'',
		scores:'',
		isShowRule:false,
      }
    },
    methods: {
        init(){
              this.$axios.get('/api/icbc/creditcard/repayment/info',{
              	id:this.card_id
              },(res,data)=>{
					this.data = res
					this.score()
			  },(err)=>{
			  	console.log(err)
			  })
        },
        score(){
        	this.$axios.get('/api/icbc/user/info',{},(res)=>{
        		this.flow = res.score
        		this.scores = res.score
        		this.flow =parseInt(this.flow/this.data.flow_divisor)*this.data.flow_divisor
				this.all_money =(this.flow*this.data.flow_rate).toFixed(2)
				this.placeholder = "今日剩余还款额度"+(this.data.available_repayment_value).toFixed(2)
        	})
        },
        //确认还款
        go_money(){
        	this.$axios.post('/api/icbc/creditcard/repayment',{id:this.card_id,money:this.amount,flow:this.card_mark},(res)=>{
				this.$router.push({name:'statusSucc',query:{
					status:1,
					bank:this.data.card_info.bank_card_name,
					name:this.data.card_info.bank_user_name,
					num:this.data.card_info.bank_card_number,
					money:this.amount,
					flow:this.card_mark
				}})
			},(err)=>{
				this.affirm = false
				this.$router.push({name:'statusSucc',query:{
					status:2,
					bank:this.data.card_info.bank_card_name,
					name:this.data.card_info.bank_user_name,
					num:this.data.card_info.bank_card_number,
					money:this.amount,
					flow:this.card_mark
				}})
			})
        },
        //删除信用卡
        del(){
        	this.$axios.post('/api/icbc/user/unbinding/creditcard',{id:this.card_id},(res)=>{
        			this.$Toast.show('此信用卡已删除',2000)
					this.$router.push({path:'credit',query:{
						status:'1'
					}})
			},()=>{

			})

        },
        //全部还款
        all(){
        	console.log( this.flow)
        	this.card_mark =parseInt(this.flow)
        	this.amount  = this.all_money
        	this.inputs()
        },
        //关闭
        off_pop(){
        	this.off = false,
        	this.affirm = false
        },
        //取消
        call_off(){
        	this.off = false,
        	this.affirm = false
        },
        //立即还款按钮
        refund(){
        	if(this.amount>this.data.available_repayment_value){
        		this.btn = false
        		this.$Toast.show('已经超过本次还款的最大额度',2000)
        	}
        	if (this.btn) {
        		this.affirm = true

        	}
//      	this.$router.push({path:'statusSucc'})
        },
        inputs(){
        	if(this.card_mark % 100 != 0){
        		this.btn = false
        		this.hint_words = '还款流量必须为100的整数倍'
        	}else if(this.card_mark > this.flow){
        		this.btn = false
        		this.hint_words = '输入流量值超出账户流量最大额'
        	}else if(this.card_mark == '' || this.card_mark < 0){
        		this.btn = false
        		this.hint_words = ''
        		this.amount = ''
        		this.card_mark = ''
        	}else if(this.card_mark == 0){
        		this.btn = false
        		this.hint_words = ''
        		this.amount = '0.00'
        	}else{
        		this.btn = true
        		this.amount = (this.card_mark*this.data.flow_rate).toFixed(2)
        		this.hint_words = ''
        	}
        },
        showRule(){
        	this.isShowRule = true
        },
        hideRule(){
        	this.isShowRule = false
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
/*输入流量时的提示*/
	.assertion{
		font-family: PingFangSC-Regular;
		font-size: 0.24reem;
		color: #E42F46;
		letter-spacing: 0;
		margin: 0.2rem 0 0 0.3rem;
	}
	/*遮罩提示*/
	.shade-hint{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.4);
		position: fixed;
		top:0;
		z-index: 100;
		.information{
			width: 5.4rem;
			height: 3.4rem;
			background: #FFFFFF;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			border-radius: 0.1rem;
			h3{
				height: 0.88rem;
				width: 100%;
				line-height: 0.9rem;
				text-align: center;
				border-bottom: 1px solid #EFEFEF;
				font-family: PingFangSC-Regular;
				font-size: 0.32rem;
				color: #333333;
				letter-spacing: -0.55px;
				span{
					display: block;
					width: 0.3rem;
					height: 0.3rem;
					background: url('../../assets/images/credit/close.png') no-repeat;
					background-size:100% ;
					position: absolute;
					top: 0.3rem;
					right: 0.3rem;
				}
			}
			p{
				font-family: 'PingFangSC-Regular';
				font-size: 0.28rem;
				color: #333333;
				letter-spacing: -0.48px;
				padding: 0 0.3rem;
				margin-top: 0.3rem;
				span:nth-child(2){

				}
			}
			p:nth-child(2){
				span:nth-child(2){
					float: right;
				}
			}
			p:nth-child(3){
				span:nth-child(2){
					float: right;
				}
			}
			p:nth-child(4){
				position: absolute;
				bottom: 0;
				width: 100%;
				line-height: 0.86rem;
				padding: 0;
				border-top: 1px solid #EFEFEF;
				font-size:0.28rem ;
				span{
					display: block;
					width: 49.5%;
					text-align: center;
					float: left;
				}
				span:nth-child(2){
					border-left: 1px solid #EFEFEF;
					color: #E42F46;
				}
			}
			div{
				position: absolute;
				bottom: 0;
				width: 100%;
				line-height: 0.86rem;
				padding: 0;
				border-top: 1px solid #EFEFEF;
				font-size:0.28rem ;
				span{
					display: block;
					width: 49.5%;
					text-align: center;
					float: left;
				}
				span:nth-child(1){
					border-right: 1px solid #EFEFEF;
					color: #E42F46;
				}
			}
		}
	}
	/*从这开始*/
	.goChage{
		width: 100%;
		height: 100%;
		.chage_bank{
			width: 100%;
			height: 1.8rem;
			background: #FFFFFF;
			div:nth-child(1){
				float: left;
				width: 1.2rem;
				height: 1.2rem;
				background: url('../../assets/images/logo.png') no-repeat;
				background-size:100% ;
				margin: 0.3rem 0 0 0.3rem;
			}
			div:nth-child(2){
				float: left;
				margin-left: 0.3rem;
				p:nth-child(1){
					font-family: '.PingFang-SC-Medium';
					font-size: 0.32rem;
					color: #333333;
					letter-spacing: -0.55px;
					margin: 0.35rem 0 0.31rem 0;
				}
				p:nth-child(2){
					font-family: '.PingFang-SC-Medium';
					font-size: 0.24rem;
					color: #333333;
					letter-spacing: -0.55px;
				}
			}
			div:nth-child(3){
				width: 1rem;
				height: 0.4rem;
				float: right;
				background: url('../../assets/images/credit/del.png') no-repeat;
				background-size:100% ;
				font-size: 0.24rem;
				color: #E42F46;
				line-height: 0.4rem;
				text-align: center;
				margin: 0.7rem 0.3rem 0 0;
			}
		}
		.conters{
			width: 100%;
			p{
				font-family: '.PingFangSC-Regular';
				font-size: 0.24rem;
				color: #999999;
				letter-spacing: 0;
				span:nth-child(1){
					color:#E42F46;
				}
				span:nth-child(2){
					color:#64AAEF;
					margin-left: 0.22rem;
				}
			}
			p:nth-child(1){
				padding:0.21rem 0.22rem  0.04rem 0.3rem;
			}
			p:nth-child(2){
				padding:0.05rem 0 0.24rem 0.3rem;
			}
		}
		.chage_conter{
			width: 100%;
			background: #FFFFFF;
			ul{
				li{
					width: 100%;
					height: 1.14rem;
					position: relative;
					border-top: 1px solid #EFEFEF;
					font-size: 0.3rem;
					span:nth-child(1){
						float: left;
						display: block;
						width: 30%;
						line-height: 1.14rem;
						font-family: PingFangSC-Regular;
						font-size: 0.3rem;
						color: #666666;
						margin-left: 0.3rem;
					}
					span:nth-child(3){
/*						width: 75%;*/
						height: 0.60rem;
						float: right;
						line-height: 1.15rem;
						padding-right:0.28rem ;
						color: #666666;
					}
					input{
						width: 57%;
						height: 1.14rem;
						/*float: right;*/
						font-family: 'PingFangSC-Regular';
						font-size: 0.3rem;
						color: #666666;
						/*margin-right: 0.15rem;*/
						text-align: right;
					}
				}
			}
		}
		.chage_btn{
			width: 6.9rem;
			height: 0.88rem;
			margin:0.6rem auto;
			text-align: center;
			line-height: 0.88rem;
			background: #E42F46;
			font-size: 0.32rem;
			color: #FFFFFF;
			letter-spacing: -0.55px;
			margin-bottom: 0.3rem;
			border-radius: 0.09rem;
		}
		.pay{
			width: 100%;
			text-align: center;
			font-size: 0.2rem;
			color: #999999;
			letter-spacing: 0;
			span:nth-child(1){
				color: #64AAEF;
			}
		}
		.hint{
			width: 6.50rem;
			margin:1.8rem auto;
			h2{
				font-family: '.PingFangSC-Regular';
				font-size: 0.24rem;
				color: #999999;
				margin-bottom: 0.2rem;
			}
			p{
				font-family: '.PingFangSC-Regular';
				font-size: 0.24rem;
				color: #999999;
				line-height: 0.48rem;
			}
		}
	}
	::-webkit-input-placeholder {
	    font-family: 'PingFangSC-Regular';
		font-size: 0.3rem;
		color: #999999;
		letter-spacing: 0;
		text-align: right;
	}
	.color{
		width: 6.9rem;
			height: 0.88rem;
			margin:0.6rem auto;
			text-align: center;
			line-height: 0.88rem;
			background: #CCCCCC;
			font-size: 0.32rem;
			color: #FFFFFF;
			letter-spacing: -0.55px;
			margin-bottom: 0.3rem;
			border-radius: 0.09rem;
	}
	.questionIcon{
		display:inline-block;
		background-color: #CCCCCC;
		color:#fff;
		text-align: center;
		width:.25rem;
		height: .25rem;
		line-height: .25rem;
		border-radius: 50%;
		margin-left: .2rem;
	}
	.ruleClose{
		width:100% !important;
	}
</style>

