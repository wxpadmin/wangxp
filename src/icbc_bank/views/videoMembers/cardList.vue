<template>
	<div>
        <heading :name="headerTitle"></heading>
        <div class="list-content">
        	<div class="list-item" v-for = "item in cardList" >
                <router-link :to="{path: '/VMexchange', query: {id:item.id,category_id:category_id}}">
	        		<img v-if = "item.categoryGoodsUrl" :src="item.categoryGoodsUrl" class="list-item-bg">
	        		<img :src="cccImg" v-else  class="list-item-bg">
	        		<div class="list-detail">
	        			 <p>{{item.goodsName}}</p>
	        			 <p class="card-price">
                       		 <span v-if = "item.salePrice">{{item.salePrice | filter_M}}M</span>
                       		 <span v-if = "item.marketPrice" class="card-market">市场参考价：{{item.marketPrice | filter_M}}元</span>
	        			 </p>
	        		</div>
        		</router-link>
        	</div>
        </div>
	</div>
</template>
<script>

  	import heading from '../../components/heading'

  	// var  cardListJson = require("../../assets/cardList.json")

	export default {
		mounted(){
			this.headerTitle = this.$route.query.title
			this.category_id = this.$route.query.id
			this.getCardList()
			// this.cardListJson  = cardListJson
		},
		data(){
			return {
				headerTitle:"视频",
				cardList:[],
				cardListJson:{},
				cccImg:"http://img.ruwe.cn/group1/M00/01/6C/Chmdplnde86AR-IIAACYetLIuzs300.png"
			}
		},
		methods:{
			getCardList(){
				 this.$http.get('/api/stable/cards/cards/list',{params:{category_id:this.category_id,action :'flow'}}).then((res)=>{
                    this.cardList = res['data']['data']['list']
              	 })
			},
		},
		components: {
	      heading,
	    }
	}
</script>
<style lang="less" scoped>
	.list-content{
		padding: .18rem;
		font-size: .36rem;
		color: #ffffff;
		.list-item{
			margin-bottom: .13rem;
			.list-item-bg{
				width: 7.16rem;
				height: 2.06rem;
				left: 0;
			}
			.list-detail{
				position: relative;
				z-index: 10;
				// width: 100%;
				padding: .56rem 0 .56rem 2.52rem;
				text-align: left;
				margin-top: -2.06rem;
				color: #ffffff;
				width: 60%;
				p:nth-of-type(1){
					width: 60%;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
			}
			.card-price{
				font-size: .32rem;
				color:#e42f46;
				margin-top: .1rem;
			}
			.card-market{
				font-size: .18rem;
				color: #999999;
				display: inline-block;
				margin-left: .5rem;
				text-decoration: line-through;
			}
		}
	}
</style>
