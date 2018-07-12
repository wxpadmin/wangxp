<template>
    <div>
        <heading :name="'我的优惠券'"></heading>
        <div class="title_box" >
            <p v-for = "(key,index) in titText" :class = "index == activeIdx ? 'active' : ''" @click = "titClick(index)">{{key}}</p>
            
        </div>
            <ul class = "coupon-list">
                <pull-refresh ref = "pullRefresh" :loading = "loading" :nomore = "nomore" @loadmore = "loadMore" v-if = 'activeIdx == 0'>
                    <li v-for = "(key,ind) in dataList">
                        <div class="left">
                            <span>立减</span>
                            <p>{{key.coupon_score}}<span>元</span></p>
                            <p>{{key.package_size | filter_size}}</p>
                        </div>
                        <div class="right">
                            <span>{{key.coupon_scene | filter_type}}</span>
                            <p>代金券<span>爱享流量专享</span></p>
                            <p>有限期：{{key | filter_time}}</p>
                        </div>
				    </li>
                </pull-refresh>
                <pull-refresh ref = "pullRefresh" :loading = "loading" :nomore = "nomore" @loadmore = "loadMore" v-if = 'activeIdx == 1'>
                    <li class="active" v-for = "(key,ind) in dataList">
                        <!--filter_bag-->
                        <div class="top useBg">{{key | filter_coupon}}</div>
                        <div class="left">
                           <span>立减</span>
                            <p>{{key.coupon_score}}<span>元</span></p>
                            <p>{{key.package_size | filter_size}}</p>
                        </div>
                        <div class="right">
                            <span>{{key.coupon_scene | filter_type}}</span>
                            <p>代金券<span>爱享流量专享</span></p>
                            <p>有限期：{{key | filter_time}}</p>
                        </div>
                    </li>
                </pull-refresh>
                <!-- v-if = "dataList.length == 0" -->
				 
            </ul>
            <!-- <div class = "noData" v-if = "dataList.length == 0">暂时没有数据</div> -->
    </div>
</template>
<script>
    import heading from '../../components/heading.vue'
    export default {
        data(){
            return{
                titText:["可用优惠券","不可用优惠券"],
                dataList:[],
                activeIdx:0,
                loading:false,
                nomore:false,
                page_number:1,
                page_size:10,
                data : {}
            }
        },
        methods: {
            titClick(ind){
                this.dataList = [];
                this.activeIdx = ind;
                this.page_number = 1
                this.nomore = false
                this.getList()
            },
            loadMore(){
                this.loading = true
				this.page_number ++ 
				this.getList()
            },
            getList(){
                let coupon_status = this.activeIdx == 0 ? '1' : '0';
                // console.log(coupon_status)
                this.$http.get("/api/icbc/flow/couponlist?page_number="+this.page_number+"&page_size="+this.page_size+"&coupon_status="+coupon_status)
                .then((res) => {
                    console.log(res)
                    this.loading = false;
                    let list = res.data.data.list;
                    if(list.length == 0 ){
                        this.nomore = true
                    }
                    console.log(list)
                    this.dataList = this.dataList.concat(list);
                })
            }
        },
        mounted () {
            this.getList()
        },
        components:{
            heading
        }
    }
</script>
<style lang="less" scoped>
    .noData{
        width:100%;
        text-align:center;
        margin-top:3rem;
        font-size:0.3rem;
        color:#666;
    }
    .title_box{
        width:100%;
        height: 0.6rem;
        background:#fff;
        display: flex;
       
        p{
            flex:1;
            text-align:center;
            line-height: 0.6rem;
            color:#108EE9;
            border:1px solid #108EE9;
            
        }
        p:nth-of-type(1){
            border-radius:5px 0 0 5px;
        }
        p:nth-of-type(2){
            border-radius:0 5px 5px 0;
        }
        .active{
            background: #108EE9;
            color:#fff;
        }
    }
    .coupon-list{
		width:100%;
		background: #fff;
        padding:0.3rem 0 0.01rem;
        
		li{
			width:6.6rem;
            height:1.9rem;
            margin:0.5rem auto 0.3rem;
			background:url(../../assets/images/long.png) no-repeat;
			background-size: 100% 100%;
			color:#fff;
			display: flex;
			position: relative;
			.left,.right{
				width:1.5rem;
				padding:0.18rem 0.24rem ;
				&>span{
					height:0.32rem;
					display: inline-block;
					font-size:0.18rem;
					padding:0 0.1rem;
					border:2px solid #fff;
					border-radius:0.25rem;
                    text-align:center;
                    line-height: 0.32rem;
				}
				p:nth-of-type(1){
					width:100%;
                    font-size:0.6rem;
                    height:0.88rem;
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
                    height:0.7rem;
                    padding:0.18rem 0 0.03rem;;
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
                    width:4.5rem;
					margin:0.03rem 0;
                }
                p:nth-of-type(3){
					font-size:0.18rem;
				}

			}
			.top{
				background:url(../../assets/images/tit_1.png) no-repeat;
				background-size: 100% 100%;
				font-size:0.2rem;
				position: absolute;
				left:4.9rem;
				top:-0.2rem;
				padding:0.1rem;
                padding-right:0.2rem;
			}
			.useBg{
				background:url(../../assets/images/tit_2.png) no-repeat;
				background-size: 100% 100%;
			}
		}
		.active{
			width:6.66rem;
			background:url(../../assets/images/long_1.png) no-repeat;
			background-size: 100% 100%;
		}
		
		
	}
</style>


