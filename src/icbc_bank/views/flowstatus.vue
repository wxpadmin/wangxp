<template>
    <div>
        <div class="title">
            <div class="go-back" @click="goIndex">
                <i></i>
            </div>
            <p class="tit-name">{{name}}</p>
            <!--<div class="showTool-Bar">-->
            <!--<i></i>-->
            <!--</div>-->
        </div>
        <div class="flowstatus">
            <div class="flowicon" :class="{succ:isSucc,fail:!isSucc}"></div>
            <p v-if="isSucc">支付成功</p>
            <p v-if="!isSucc">支付失败</p>
            <span v-if="isSucc">完成后，流量充入您的流量“账户余额”内</span>
            <span v-if="!isSucc">请返回首页，重新下单</span> 
        </div>
        <div class="btn_box">
            <a href="javascript:;" class="charge" @click='goIndex()'>返回</a>
        </div>
        <loading v-show="loading" ></loading>
        <div class="alert_box" v-if="isShow">
            <span @click = "isShow = !isShow"></span>
            <div class="bg_box">
                <p v-if = " orderInfo && orderInfo.money && orderInfo.money >= 100">获得工商银行免费赠送的红包，价值10-30元，点击领取有惊喜！</p>
                <p v-if = "orderInfo &&orderInfo.money && orderInfo.money >=50  && orderInfo.money< 100 ">获得工商银行免费赠送的红包，价值5-20元，点击领取有惊喜！</p>
                <div class="btn" @click="getCliak">立即领取</div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../assets/css/common";
    .title{
        width: 100%;
        height:0.84rem;
        text-align: center;
        line-height: 0.84rem;
        position: relative;
        background-color: $color-white;
        border-bottom: 1px solid $color-border;
        .go-back{
            width: 0.6rem;
            height:100%;
            position: absolute;
            left: 0;
            top:0;
            i{
                width: 0.20rem;
                height:0.34rem;
                position: absolute;
                left:0.25rem;
                top:0.22rem;
                background: url(../assets/images/icon-go-back-red.png) no-repeat;
                background-size:100% 100%;
            }
        }
        .tit-name{
            font-size: 0.36rem;
        }
        .showTool-Bar{
            width: 0.8rem;
            height:100%;
            position: absolute;
            right: 0;
            top:0;
            i{
                width: 0.44rem;
                height:0.10rem;
                position: absolute;
                right:0.3rem;
                top:0.39rem;
                background: url(../assets/images/share_bar.png) no-repeat;
                background-size:100% 100%;
            }
        }
    }
    .flowstatus {
        width: 100%;
        background-color: $color-white;
        overflow: hidden;
        border-bottom: 1px solid $color-border;
        .flowicon {
            width: 1.45rem;
            height: 1.45rem;
            margin: 0.8rem auto 0.5rem;
            &.succ{
                background-image: url(../assets/images/pay/icon-succ.png);
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
            &.fail{
                background-image: url(../assets/images/pay/icon-fail.png);
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
        }
        p{
            width: 100%;
            font-size: 0.36rem;
            color: $color-font;
            text-align: center;
        }
        span{
            width: 100%;
            display: block;
            text-align: center;
            font-size: 0.28rem;
            color: $color-font-sec;
            margin-top: 0.4rem;
            padding-bottom: 0.6rem;
        }
    }
    .btn_box{
        width: 100%;
        padding-top: 0.4rem;
        .charge{
            width: 6.90rem;
            height: 1rem;
            line-height: 1rem;
            margin: 0.6rem auto 0;
            border-radius: 0.1rem;
            background-color: $color-red;
            color: $color-white;
            text-align: center;
            display: block;
            font-size: 0.36rem;
        }
    }
    .alert_box{
        width:100%;
        height:100%;
        background:rgba(0,0,0,.5);
        position: absolute;
        top:0;
        &>span{
            width:0.5rem;
            height: 0.5rem;
            display: inline-block;
            position: absolute;
            top:1.9rem;
            right:1.35rem;
        }
        .bg_box{
            width:6.4rem;
            height:5.07rem;
            background: url("../assets/images/alertBg.png") no-repeat;
            background-size:100% 100%;
            margin: 1.5rem auto;
            font-size:0.28rem;
            p{
                width:4.4rem;
                padding:2.6rem 0 0 0.9rem;;
                margin-left:0.2rem;
            }
        }
        .btn{
            width:3.5rem;
            height: 0.6rem;
            background: url("../assets/images/button.png") no-repeat;
            background-size:100% 100%;
            color:#fff;
            font-size:0.28rem;
            text-align: center;
            line-height: 0.6rem;
            margin:0.3rem 0 0 1.42rem;;
        }
    }
</style>
<script>
  // import {Toast} from 'mint-ui';
  import paystatus from '../components/paystatus.vue'
  import loading from '../components/loading'
  import heading from '../components/heading.vue'
  export default{
    mounted(){
      this.order_id = this.$route.query.order_id;
      this.result = this.$route.query.result;

      this.init()
    },
    data(){
      return {
        name:'订单详情',
        order_id: '', //订单号
        loading:false,
        dataList:[],
        result:'',// 结果
        bBtn:false, // 是否成功,
        isSucc:true,
        isShow:false,
        orderInfo:{},
        lottery_id:""
      }
    },
    methods:{
      init(){
        this.loading = true
        if(this.result == 1){
            this.isSucc = true
            this.getOrderInfo(()=>{
                this.getReward()
            })
            // await this.getOrderInfo()
            // await this.getReward()
        }else{
            this.isSucc = false
        }
        this.loading = false
      },
      //弹出框点击立即领取
      getCliak(){
        let params = {
             lottery_id:this.lottery_id,
             order_id:this.order_id,
        }
        this.$axios.get('/api/icbc/orders/lottery/hit',params,(data)=>{
            let query = {
                packagesize:data['name'],
                prize_type:data['prize_type'],
                coupon_id:data['coupon_user_id']?data['coupon_user_id']:''
            }
            this.$router.push({path:'getSucc',query:query})
         },(err)=>{
            this.$Toast.show('对不起，您来晚了')
            this.isShow = false
         })
      },
      goIndex(){
        this.$router.push({ path: 'index'})
      },
      getOrderInfo(callback){
         let params = {
            order_id:this.order_id,
         }
        this.$axios.get('/api/icbc/order/info',params,(res)=>{
            this.orderInfo = res

            if(res.money >= 100){
                this.lottery_id = 'ad41596b-0658-11e8-942b-525400c599cf'
            }else if(50<= res.money < 100){
                this.lottery_id = 'a042f943-0658-11e8-942b-525400c599cf'
            }else{
                this.lottery_id = ""
            }
            //测试环境
            // if(res.money >= 100){
            //     this.lottery_id = '1f5fb906-058d-11e8-81d8-00163e2e2531'
            // }else if(50<= res.money < 100){
            //     this.lottery_id = '3adddb67-6rr4-11e7-ae46-525400c599cf'
            // }else{
            //     this.lottery_id = ""
            // }
            


            callback && callback()
         })
      },
      getReward(){
        if(!this.lottery_id){
            return 
        }

        let params = {
             lottery_id:this.lottery_id,
             order_id:this.order_id,
        }
        this.$axios.get('/api/icbc/orders/lottery/check',params,(res)=>{
            this.isShow = true
         })
      },
    },
    // mounted () {
    //     // setTimeout(() => {
    //     //     this.isShow = true;
    //     // },500)
    // },
    components: {
      paystatus,
      loading,
      heading
    }
  }
</script>
