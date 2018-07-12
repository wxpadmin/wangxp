<template>
    <div>
        <navbar :title="'添加信用卡'"></navbar>
        <!--首页-->
        <div class="add">
        	<!--头部-->
            <div class="banner">
            	支持银行：目前仅支持工商银行信用卡还款
            </div>
            <!--添加信用卡信息-->	
            <div class="add_conter">
            	<ul>
            		<li><span>信用卡号：</span><input type="text" id="" @input="exchage()" @blur="blur_num()"  maxlength="19" v-model="card_num" value="" placeholder="请输入正确的工商银行卡号"/><img v-if="card_num.length>0" @click="empty()" :src="urls"/></li>
            		<li><span>银行：</span><span id="" :class="btn?'':'red'">{{bank}}</span></li>
            		<li><span>持卡人：</span><input type="text" v-model="name" @input="exchage()" placeholder="请输入与卡号匹配的姓名"/></li>
            	</ul>
            </div>
            <p class="add_bottom">请确保持卡人姓名填写正确，否则还款不成功</p>
            <div class="btn" v-show="!btn">
            	确认
            </div>
            <div class="btn_red" @click="affirm()"  v-show="btn">
            	确认
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
       this.score = this.$route.query.score
    },
    data () {
      return {
        loading:false,
        title:'流量换好礼',
        btn:false,
        urls:require('../../assets/images/credit/icon-del.png'),
        card_num:'',
        man:'',
        bank:'',
        name:'',
        id:''
      }
    },
    methods: {
    	
        affirm(){
        	let num = this.card_num?this.card_num.replace(/ /ig, ''):''
			if (this.btn && this.name) {
				this.$axios.post('/api/icbc/user/binding/creditcard',{card_number:num,bank_user_name:this.name},(res,data)=>{
				console.log(data)
				if (data.status == 0) {
					this.$Toast.show('信用卡添加成功，可进行还款',2000)
					this.$router.push({path:'goChage',query:{
						card_id:data.data.id,
						status:'1'
					}})
				}
				},(err)=>{
					console.log(err)
					this.$Toast.show(err.message)
				})
			}
        },
        exchage(){
//      	onkeyup="this.value=this.value.replace(,'') "
			var tast = /[0-9,\s]/g
			if (tast.test(this.card_num)) {
				
			}else{
				this.card_num = ''
			}
        	this.card_num=this.card_num.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/,'$1 $2 $3 $4')
			this.card_num=this.card_num.replace(/(\d{4})(?=[^\s])/,'$1 ');
			this.name = this.name.replace(/[^\u4E00-\u9FA5]/g,'')
        },
        blur_num(){
        	let num =  /^[0-9]{14,}$/
			if (num.test(this.card_num.replace(/ /ig, ''))) {
				this.$axios.get('/api/icbc/verify/creditcardnumber',{card_number:this.card_num.replace(/ /ig, '')},(res,data)=>{
					console.log(data.bank_name)
					this.bank = data.message.bank_name
					this.id = data.message.id
					this.btn = true
				},(err)=>{
					console.log(err)
					this.bank = '暂不支持该银行'
					this.btn = false
				})
			}else if(this.card_num.replace(/ /ig, '').length<=14){
				this.btn = false
				this.card_num=this.card_num.replace(/[^\d]/g,'')
				this.bank = '请输入完整卡号'
			}else{
				this.btn = false
				this.card_num=this.card_num.replace(/[^\d]/g,'')
				this.bank = ''
			}
        },
        empty(){
        	this.card_num = ''
        	this.btn = false
        	this.bank = ''
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
	.add{
		.banner{
			font-family: '.PingFangSC-Regular';
			font-size: .243rem;
			color: #E42F46;
			letter-spacing: 0;
			margin: 0.3rem 0 0.3rem 0.3rem;
		}
		.add_conter{
			width: 100%;
			background: #FFFFFF;
			ul{
				li{
					width: 100%;
					height: 1.14rem;
					position: relative;
					border-top: 1px solid #DDDDDD;
					span:nth-child(1){
						float: left;
						display: block;
						width: 25%;
						line-height: 1.14rem;
						font-family: PingFangSC-Regular;
						font-size: 0.3rem;
						color: #666666;
						margin-left: 0.3rem;
					}
					span:nth-child(2){
						width: 65%;
						height: 0.73rem;
						float: right;
						line-height: 1.14rem;
					}
					img{
						width: 0.3rem;
						height: 0.3rem;
						position: absolute;
						top: 0.44rem;
						right: 0.25rem;
					}
					input{
						width: 65%;
						height: 1.14rem;
						float: right;
						font-family: 'PingFangSC-Regular';
						font-size: 0.3rem;
						color: #333333;
					}
				}
			}
		}
		.add_bottom{
			font-family: 'PingFangSC-Regular';
			font-size: 0.2rem;
			color: #E42F46;
			letter-spacing: 0;
			margin:0.2rem 0 0 0.3rem;
		}
		.btn{
			width: 6.9rem;
			height: 0.88rem;
			background: #CCCCCC;
			border-radius: 0.09rem;
			text-align: center;
			line-height: 0.88rem;
			color: #FFFFFF;
			margin:0.6rem auto;
			font-size: 0.32rem;
		}
	}
	::-webkit-input-placeholder {
	    font-family: 'PingFangSC-Regular';
		font-size: 0.3rem;
		color: #999999;
		letter-spacing: 0
	}
	.btn_red{
			width: 6.9rem;
			height: 0.88rem;
			background: #E42F46;
			border-radius: 0.09rem;
			text-align: center;
			line-height: 0.88rem;
			color: #FFFFFF;
			margin:0.6rem auto;
			font-size: 0.32rem;
	}
	.colors{
		font-family: 'PingFangSC-Regular';
		font-size: 0.24rem;
		color: #999999;
		letter-spacing: 0
	}
	.red{
		color: #E42F46!important;
	}
</style>

