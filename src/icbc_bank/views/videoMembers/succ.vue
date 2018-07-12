<template>
    <div class="vmSucc">
        <heading :name="name"></heading>
        <!--首页-->
        <div class="header">
            <div class="icon"></div>
            <h4>兑换成功</h4>
            <p>视频会员兑换成功，可在"流量兑换记录"内<br>实时查看此订单</p>
        </div>
        <div class="exchangeBox">
            <div class="infoBox">
                <div class="title">
                    兑换的产品：
                    <p>{{data.card_title}}</p>
                </div>
                <div class="title">
                    消耗的流量值：
                    <p>{{data.card_price}}M</p>
                </div>
            </div>
            <div class="codeBox">
                <div>
                	<span>券码：{{coupon}}</span>
                </div>
                <div v-if="couponpassword">
                	<span>{{passwordId}} :{{couponpassword}}</span>
                </div>
                <div v-if="short_url">
                    <span>链接：<a style="color: #148fb6" :href="short_url">{{short_url}}</a></span>
                </div>
            </div>
        </div>
        <router-link to="/index" >
            <div class="redBtn">完成</div>
        </router-link>


        <loading v-show="loading"></loading>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../assets/css/common";

    .vmSucc {
        .header {
            padding-top: 0.76rem;
            background: #fff;
            .icon {
                width: 1rem;
                height: 1rem;
                background: url("../../assets/images/videoMembers/icon-succ.png") no-repeat;
                background-size: 100% 100%;
                margin: 0 auto 0.46rem;
            }
            h4 {
                font-size: 0.36rem;
                color: #333;
                text-align: center;
                line-height: 0.36rem;
                padding-bottom: 0.27rem;
            }
            p {
                font-size: 0.28rem;
                color: #999;
                line-height: 0.45rem;
                padding-bottom: 0.17rem;
                text-align: center;

            }
        }
        .exchangeBox {
            background: #fff;
            padding-bottom: 0.3rem;
            .topBar {
                height: 0.5rem;
                color: #999;
                font-size: 0.24rem;
                text-align: right;
                padding-right: 0.25rem;
                line-height: 0.5rem;
            }
            .infoBox {
                border-top: $border-grey;
                background: #fff;
                padding-left: 0.3rem;
                .title {
                    height: 0.9rem;
                    line-height: 0.9rem;
                    font-size: 0.3rem;
                    color: #333;
                    padding-right: 0.3rem;
                    border-bottom: $border-grey;
                    display: flex;
                    justify-content: space-between;

                }
            }

            .codeBox {
                width: 6.9rem;
                /*height: 1.2rem;*/
                margin: 0.3rem auto 0;
                background: url("../../assets/images/videoMembers/bg-pink.png") no-repeat;
                background-size: 100% 100%;
                padding-top: 0.2rem;
                padding-bottom: 0.2rem;
                div {
                    width: 6.15rem;
                    height: 1rem;
                    background: #f4f4f4;
                    font-size: 0.32rem;
                    color: #333;
                    text-align: center;
                    line-height: 1rem;
                    margin: 0 auto;
                }
            }

            .tipBox {
                background: #fff;
                padding: 0.1rem 0.3rem 0.3rem;
                line-height: 0.50rem;
                h4 {
                    font-size: 0.28rem;
                    color: #333;
                }
                p {
                    color: #999;
                    font-size: 0.24rem;
                }
            }
            .exchangeBtn {
                width: 6.3rem;
                height: 0.88rem;
                background: #fb919e;
                color: #fff;
                line-height: 0.88rem;
                text-align: center;
                margin: 0 auto;
                font-size: 0.33rem;
                border-radius: 0.05rem;
            }
        }
        .redBtn {
            font-size: 0.36rem;
            line-height: 0.87rem;
            text-align: center;
            color: #fff;
            border-radius: 0.04rem;
            background: #e42f46;
            height: 0.87rem;
            width: 6.3rem;
            margin: 0.6rem auto 0;
        }
    }


</style>
<script>
  import loading from '../../components/loading'
  import heading from '../../components/heading.vue'
  import {InfiniteScroll, Spinner, Toast} from 'mint-ui';
  import '../../assets/js/jquery-2.1.1.min.js'
  export default {
    mounted () {
      // this.goodsName = this.$route.query.goodsName
      // this.exchangeCondition = this.$route.query.exchangeCondition
      // this.exchangeCode = this.$route.query.exchangeCode
      this.id = this.$route.query.id
      this.getDetail()
    },
    data () {
      return {
        id:"",
        loading: false,
        data:{},
        name:'兑换成功',
        code:'',
        codeArr:[],
        coupon : '', // 卡券
        couponpassword : '', //券密
        passwordId : '', //  显示卡密/地址
          short_url:''
      }
    },
    methods: {
        getDetail(){
            this.$http.get('/api/stable/card/flow/order/item',{params:{id:this.id}}).then((res)=>{
                this.data = res['data']&&res['data']['data']?res['data']['data']:{}
                this.code = this.data.code
                if (this.data.code_url){
                    this.short_url  = this.data.code_url
                }
                if (this.code) {
                	this.codeArr = this.code.split(',')
                	if (this.codeArr.length == 1) {
                        this.coupon = this.codeArr[0]
                        this.couponpassword = ''
                    }else {
                        this.coupon = this.codeArr[0]
                        this.couponpassword = this.codeArr[1]
                         if (this['couponpassword'].indexOf('http') == -1) {
                            this.passwordId = '券密'
                            this.ahref = ''
                        }else {
                            this.passwordId = '地址'
                            this.ahref = this.couponpassword
                        }
                    }
                }else{
                	this.coupon = '刮码中'
                }
            })
        }
    },
    components: {
      loading,
      heading
    }
  }
</script>

