<template>
  <div>
      <heading :name="'红包领取'" path = "/icbc_bank/index.html"></heading>
      <div class="content_box">
          <div class="title">成功领取</div>
          <div class="content" v-if="prize_type != 3">
              {{package}}
          </div>
          <div class="content_1" v-else>
		 	<div class="left">
				<span>{{couponInfo.coupon_type | filterCouponType}}</span>
				<p>{{couponInfo.coupon_score}}<span>元</span></p>
				<p>{{couponInfo.package_size | filter_size}}</p>
			</div>
			<div class="right">
				<span>{{couponInfo.coupon_scene| filter_type}}</span>
				<p>代金券<span>爱享流量专享</span></p>
				<p>{{couponInfo  | couponTime}}</p>
			</div>
          </div>
          <div class="text" v-if="prize_type != 3">领取的流量已存入您的流量账户，可返回首页查看</div>
          <div class="text" v-else>代金券已放入您的优惠券列表中，请及时使用</div>
      </div>
      <div class="btn_box" @click="btnClick">
          返回
      </div>
  </div>
</template>
<script>
    import heading from '../../components/heading.vue'
    export default{
        data(){
            return{
                package:this.$route.query.packagesize,
                prize_type:this.$route.query.prize_type,
                coupon_id:this.$route.query.coupon_id,
                couponInfo:{}
            }
        },
        methods:{
            btnClick(){
                this.$router.push({path:'index'})
            },
            getCouponInfo(){

                this.$axios.get('/api/icbc/coupon/user/info',{coupon_id:this.coupon_id},(data)=>{
                    this.couponInfo = data
                },(err)=>{
                    this.$Toast.show('对不起，您来晚了')
                })
            }
        },
        components:{
			heading,
        },
        mounted(){
            if(this.prize_type == '3'){
                this.getCouponInfo()
            }
        }
       
    }
</script>
<style lang="less" scoped>
    .content_box{
        width:100%;
        background:#fff;
        padding:0.2rem 0 0.6rem;
        
    }
    .title{
        width:2.6rem;
        height: 1.5rem;
        background:url("../../assets/images/title.png") no-repeat;
        background-size:100% 100%;
        margin:0 auto;
        color:#fff;
        font-size:0.38rem;
        line-height: 2.1rem;
        padding-left:1.7rem;
    }
    .content{
        width:6rem;
        height:1.9rem;
        background:url("../../assets/images/bg.png") no-repeat;
        background-size:100% 100%;
        margin:0.35rem auto 0;
        font-size:0.6rem;
        color:#fff;
        line-height: 1.9rem;
        padding-left:.8rem;
        text-align: center;
    }
    .content_1{
			width:6.18rem;
			height:1.9rem;
			background:url(../../assets/images/short.png) no-repeat;
			background-size: 100% 100%;
			margin:0.35rem auto 0;
			color:#fff;
			display: flex;
            position: relative;
            
			.left,.right{
				width:1.5rem;
				padding:0.18rem 0.2rem ;
				&>span{
					height:0.32rem;
					display: inline-block;
					font-size:0.18rem;
					padding:0 0.1rem;
					border:2px solid #fff;
					border-radius:0.25rem;
                    text-align:center;
                    line-height: 0.32rem;
                    line-height: 0.34rem;
				}
				p:nth-of-type(1){
                    width:100%;
                    height:0.78rem;
                    line-height: 0.85rem;
                    font-size:0.6rem;
                    padding-top:0.08rem;
					margin:0 0.3rem;
					span{
						font-size:0.24rem;
						margin-left:0.15rem;
					}
				}
				p:nth-of-type(2){
					width:100%;
					font-size:0.18rem;
					margin-top:-0.06rem;
				}
			}
			.left{
                p:nth-of-type(1){
                   margin-bottom:0.04rem;
                }
                p:nth-of-type(2){
                    width:1.6rem;
                }
            }
			.right{
                flex:1;
				&>span{
					border-radius:0.1rem;
				}
				p:nth-of-type(1){
					margin:0.03rem 0;
                }
                p:nth-of-type(2){
					
				}

			}
			.top{
				background:url(../../assets/images/tit_1.png) no-repeat;
				background-size: 100% 100%;
				font-size:0.2rem;
				position: absolute;
				left:4.6rem;
				top:-0.2rem;
				padding:0.1rem;
				padding-right:0.2rem;
			}
			.topMax{
				left:4.9rem;
			}
			.activeBg{
				background:url(../../assets/images/tit_2.png) no-repeat;
				background-size: 100% 100%;
			}
		
    }
    .text{
        width:100%;
        text-align:center;
        margin-top:0.5rem;
        color:rgb(153,153,153);
        font-size:0.24rem;
    }
    .btn_box{
        width:6.3rem;
        height: 0.9rem;
        background: #f3112e;
        margin:0 auto;
        color:#fff;
        text-align: center;
        font-size:0.38rem;
        line-height:0.9rem;
        border-radius:0.15rem;
        margin:0.6rem;
    }
</style>