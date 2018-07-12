<template>
	<div>
        <heading :name="'优惠券'"></heading>
		<div class="content">
			<div class="no-coupon"  @click ="choose({},-1)">
				<span>不使用优惠券</span>
				<div class="choose"  :class = "selectId == -1 ? 'active' : ''"></div>
			</div>
			<div class="coupon-list">
				<ul>
					<pull-refresh ref = "pullRefresh" :loading = "loading" :nomore = "nomore" @loadmore = "loadMore">
						<li v-for = "(key,ind) in dataList" @click ="choose(key,key.id)">
							<div class="left">
								<p>{{key.coupon_score}}<span>元</span></p>
								<p>{{key.package_size | filter_size}}</p>
							</div>
							<div class="right">
								<p class="use-place">{{key.coupon_scene | filter_type}}</p>
								<p class="coupon-name">代金券 <span>爱享流量专享</span></p>
								<p class="coupon-date">有限期：{{key | filter_time}}</p>
							</div>
							<!-- active -->
							<div :class="selectId == key.id ? 'radio active' : 'radio'"></div>
						</li>
					</pull-refresh>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
    import heading from '../../components/heading.vue'
	import { postVailableCoupon } from '../../api/api'
	import NProgress from 'nprogress';
	import  moment from 'moment'
	export default{
		mounted(){
			this.money = this.$route.query.money;
			this.package_size = this.$route.query.package_size;
			this.coupon_scene = this.$route.query.coupon_scene;
			if(this.$route.query.phone_number){
				this.phone_number = this.$route.query.phone_number;
				this.belong_name = this.$route.query.belong_name;
				this.area_name = this.$route.query.area_name;
			}

			if(this.$route.query.id){
				this.selectId = this.$route.query.id
			}
			this.getCouponList()
			var now = moment().format("x");
		},
		data(){
			return {
				order_id:"",
				selected:"",
				good_id:"",
				couponList:[],
				dataList:[],
				selectId:-1,
				page_number:1,
				page_size:10,
				loading:false,
				nomore:false,
				phone_number:"",
				belong_name:"",
				area_name:"",
				money_size:null,
				coupon_scene:0,
				noSele:false
			}
		},
		methods:{
			loadMore(){
                this.loading = true
				this.page_number ++ 
				this.getCouponList()
            },
			choose(key,id){
				this.selectId = id;
				if(key){
					this.money_size = key.coupon_score;
				}
				let query = {}
				if(this.phone_number){
					if(!key){
						query = {
							package_size : this.package_size,
							money : this.money,
							id : id,
							phone_number:this.phone_number,
							belong_name:this.belong_name,
							area_name:this.area_name
						}
					}else{
						query = {
							package_size : this.package_size,
							money : this.money,
							money_size : this.money_size,
							id : id,
							phone_number:this.phone_number,
							belong_name:this.belong_name,
							area_name:this.area_name
						}
					}
					setTimeout(()=>{
						this.$router.push({ path: 'confirmOrder',query: query})
					},500)
				}else{
					if(!key){
						query = {
							package_size : this.package_size,
							money : this.money,
							id : id
						}
					}else{
						query = {
							package_size : this.package_size,
							money : this.money,
							money_size : this.money_size,
							id : id
						}
					}
					
					setTimeout(()=>{
						this.$router.push({ path: 'confirmflow',query: query})
					},500)
				}
				// var query = {
				// 	good_id:this.good_id
				// }
				// if(id){
				// 	query = {
				// 		card_id:coupon.card_id,
				// 		couponid:coupon.id,
				// 		discount:coupon.coupon_score,
				// 		good_id:this.good_id
				// 	}
				// }
				// this.selected = id
				// setTimeout(()=>{
				// 	this.$router.push({ path: 'confirmflow',query: query})
				// },500)
			},
			getCouponList(){
				
				this.$http.get("/api/icbc/flow/couponlist?coupon_status=1&coupon_scene="+this.coupon_scene+"&page_number="+this.page_number+"&page_size="+this.page_size+"&package_size="+this.money).then((res) => {
					console.log(res)
					this.loading = false;
                    let list = res.data.data.list;
                    if(list.length == 0 ){
                        this.nomore = true
                    }
					this.dataList = this.dataList.concat(list);
					
				})
				// let params = {
				// 	order_id:this.order_id
				// }
        		// NProgress.start()
				// postVailableCoupon(params).then((res)=>{
                //     NProgress.done()
                //     this.couponList = res['data']
				// })
			}			
		},
		components: {
		    heading
		}
	}
</script>
<style  lang="less" scoped>
	.coupon-list{
		background: #fff;
		padding: .3rem;
		li{
			width:6.1rem;
			height:1.9rem;
			background:url(../../assets/images/short.png) no-repeat;
			background-size: 100% 100%;
			margin-bottom:0.5rem;
			color:#fff;
			display: flex;
			position: relative;
			
			.left{
				width:2rem;
				text-align:center;
				padding-top:0.5rem;

				p:nth-of-type(1){
					width:100%;
					font-size:0.6rem;
					margin-bottom:0.1rem;
				}
				p:nth-of-type(2){
					width:100%;
					font-size:0.18rem;
					margin-top:-0.06rem;
				}
			}
			.right{
				flex:1;
				padding:0.2rem 0 0 0.15rem;
				p:nth-of-type(1){
					margin:0;
				}
				p:nth-of-type(2){
					font-size:0.6rem;
					position: relative;
					span{
						width:2rem;
						height:0.58rem;
						font-size:0.24rem;
						padding-left:0.05rem;
						position: absolute;
						top:20%;
						left:1.8rem;
						display: flex;
						align-items: center;
						word-break:break-all;
					}
				}
				p:nth-of-type(3){
					font-size:0.18rem;
				}
			}
		}
		.radio{
			width: 0.4rem;
	        height: 0.4rem;
	        background: url("../../assets/images/cards-unchecked.png") no-repeat;
			background-size: 100% 100%;
			position:absolute;
			right:-0.8rem;
			top:0.8rem;
		}
		.active{
	        background: url("../../assets/images/cards-checked.png") no-repeat;
            background-size: 100% 100%;
        }
		// .active{
		// 	width:6.66rem;
		// 	background:url(../../assets/images/con_2.png) no-repeat;
		// 	background-size: 100% 100%;
		// }
		
		
	}



	.content{
		.no-coupon{
			margin-top: .3rem;
			padding: .3rem;
			font-size: .3rem;
			// line-height: 1rem;
			background: #ffffff;
			.choose{
	            width: 0.4rem;
	            height: 0.4rem;
	            background: url("../../assets/images/cards-unchecked.png") no-repeat;
	            background-size: 100% 100%;
	            // margin: 0.8rem 0 0 0.2rem;
	            display: inline-block;
	            float: right;
	            &.active{
	                background: url("../../assets/images/cards-checked.png") no-repeat;
	                background-size: 100% 100%;
	            }
	        }
		}
	 	// .coupon-list{
	    //     padding: .3rem;
	    //     .coupon-box{
	    //         float: left;
	    //         width:6.1rem;
	    //         height: 1.9rem; 
	    //         color: #ffffff;
	    //         margin-bottom: .3rem;
	    //         background: url('../../assets/images/coupon-bg-1.png') no-repeat;
	    //         background-size: 100% 100%;
	    //     }
	    //       .left{
	    //           float: left;
	    //           width: 1.7rem;
	    //           .money{
	    //             display: inline-block;
	    //             margin-left: .19rem;
	    //             margin-top: .5rem;
	    //             font-size: .66rem;
	    //             width: 1.2rem;
	    //         	text-align:center;
	    //           }
	    //           .use-rule{
	    //             text-align: center;
	    //             font-size: .18rem;
	    //             margin-top:-.16rem;
	    //           }
	    //       }
	    //       .right{
	    //           float: left;
	    //           margin-left: .35rem;
	    //           width: 3.9rem;
	    //           .use-place{
	    //             display: inline-block;
	    //             padding: .01rem .1rem;
	    //             margin-top: .12rem;
	    //             border: 1px solid #ffffff;
	    //             border-radius: 5px;
	    //             font-size: .16rem;
	    //           }
	    //           .coupon-name{
	    //             font-size: .5rem;
	    //             margin-top: .08rem;
	    //           }
	    //           .coupon-date{
        //     		font-size: .16rem;
	    //             line-height: .3rem;
	    //           }
	    //       }
	    //       .choose-box{
	    //             height: 1.9rem;
	    //             float: right;
	    //       }
	    //       .choose{
	    //       	position: relative;
    	// 		top: 50%;
    	// 		margin-top:-.2rem;
	    //         width: 0.4rem;
	    //         height: 0.4rem;
	    //         background: url("../../assets/images/cards-unchecked.png") no-repeat;
	    //         background-size: 100% 100%;
	    //         display: inline-block;
	    //         float: right;
	    //         &.active{
	    //             background: url("../../assets/images/cards-checked.png") no-repeat;
	    //             background-size: 100% 100%;
	    //         }
	    //     }
	    // }

	}
</style>