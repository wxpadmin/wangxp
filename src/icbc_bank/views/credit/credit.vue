<template>
    <div>
        <navbar :title="'还信用卡'"></navbar>
        <!--首页-->
        <div class="credit">
        	<!--头部图片-->
            <div class="banner"></div>
            <!--信用卡展示-->	
            <div class="card_list">
            	<ul>
            		<li v-if="data.length > 0" v-for="item,index in data">
            			<router-link :to="{ name: 'goChage',query:{card_id:item.id}}">
	            			<div id=""></div>
	            			<div id="">
	            				<p>{{item.bank_card_name}}</p>
	            				<p><span>{{item.bank_user_name}}</span><span style="margin-left: 0.24rem;">尾号{{item.bank_card_number}}</span></p>
	            			</div>
	            			<div id=""></div>
	            		</router-link>	
            		</li>
            	</ul>
            </div> 
            	
             
            <!--添加信用卡-->
            <!--<router-link :to="{ name: 'addCard'}">-->
	            <div class="add_card"  v-if="data.length < 5" @click="add_card()">
	            	<span id=""></span>
	            	<span id="">添加工商银行信用卡</span>	
	            </div>
	           
	         <p class="shade"></p>   	
	            
            <!--</router-link>-->
            <router-link :to="{ name: 'refundList'}">
            	<p class="refundList"><span id=""></span><span id="">还款记录</span></p>
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
       this.status = this.$route.query.status
       //信用卡是否删除
       if(this.status == 1){
//     	this.$Toast.show('此信用卡已删除',2000)
       }
       this.init()
       
    },
    data () {
      return {
        loading:false,
        title:'流量换好礼',
        status:'',
        data:''
      }
    },
    methods: {
        init(){
            this.$axios.get('/api/icbc/user/creditcards/list',{name:Math.random()},(res)=>{
				this.data = res
				console.log(res)
				console.log(this.data.length)
			})
        },
        add_card(){
        	this.$router.push({name:'addCard'})
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
	.credit{
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		.banner{
			width: 100%;
			height: 2.6rem;
			background: url('../../assets/images/banner.png');
			background-size:100% ;
		}
		.card_list{
			width: 100%;
			ul{
				width: 100%;
				li{
					width: 6.9rem;
					height: 1.8rem;
					margin:0.28rem auto;
					background: #E42F46;
					border-radius: 0.2rem;
					div:nth-child(1){
						float: left;
						width: 1.2rem;
						height: 1.2rem;
						background: url('../../assets/images/logo.png');
						background-size:100% ;
						margin: 0.3rem 0 0 0.3rem;
					}
					div:nth-child(2){
						float: left;
						color: #FFFFFF;
						width: 65%;
						p:nth-child(1){
							font-family: '.PingFang-SC-Medium';
							font-size: 0.32rem;
							color: #FFFFFF;
							letter-spacing: -0.55px;
							margin: 0.3rem 0 0.31rem 0.3rem;
						}
						p:nth-child(2){
							font-family: '.PingFang-SC-Medium';
							font-size: 0.24rem;
							color: #FFFFFF;
							letter-spacing: -0.55px;
							margin-left: 0.3rem;
						}
					}
					div:nth-child(3){
						width: 0.19rem;
						height: 0.34rem;
						float: right;
						background: url('../../assets/images/credit/icbc-gobank.png') no-repeat;
						background-size:100% 100% ;
						margin: 0.73rem 0.44rem 0 0;
					}
				}
			}
		}
		.add_card{
			width: 6.9rem;
			height: 0.88rem;
			border: 1px solid #999999;
			border-radius: 1rem;
			margin:0.3rem auto;
			display: flex;
			/*justify-content: space-around;*/
			align-items: center;
			span:nth-child(1){
				display: block;
				float: left;
				width: 0.22rem;
				height: 0.22rem;
				background: url('../../assets/images/credit/icon-add.png');
				background-size:100% ;
				margin-left: 1.68rem;
				margin-right: 0.2rem;
			}
			span:nth-child(2){
				float: left;
				display: block;
				font-family: '.PingFangSC-Regular';
				font-size: 0.3rem;
				color: #999999;
			}
		}
		.refundList{
			position: fixed;
			bottom: 0.3rem;
			left: 2.95rem;
			span:nth-child(1){
				display: block;
				width: 0.28rem;
				height: 0.28rem;
				background: url('../../assets/images/credit/refund-List.png');
				background-size:100% ;
				float: left;
				margin-top: 0.05rem;
				margin-right: 0.2rem;
			}
			span:nth-child(2){
				display: block;
				font-family: '.PingFangSC-Regular';
				font-size: 0.28rem;
				color: #64AAEF;
				float: left;
			}
		}
	}
	
	
	
</style>
<style type="text/css">
	.shade{
		width: 100%;
			/*width: 6.9rem;*/
			height: 0.88rem;
			background: #FFFFFF;
		}
</style>

