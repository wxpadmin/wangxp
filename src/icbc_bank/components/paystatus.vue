<template>
    <div class="pay">
        <!--订单详情-->
        <div class="payBox">
            <div class="statusBox">
                <div class="payicon" :class="item|filter_orderstatus"></div>
                <p class="paytext">{{item|filter_ordertext}}</p>
            </div>
            <ul class="infoBox">
                <li class="clearfix" v-if="item.order_type == 1">
                    <p class="label">充值号码</p>
                    <p class="num">{{item.phone_number}}</p>
                </li>
                <li class="clearfix">
                    <p class="label">流量规格</p>
                    <p class="num">{{item.package_size|filter_pkg}}</p>
                </li>
                <li class="clearfix">
                    <p class="label">充值时间</p>
                    <p class="num">{{item.create_time}}</p>
                </li>
                <li class="clearfix">
                    <p class="label">订单号</p>
                    <p class="num">{{item.order_id}}</p>
                </li>
            </ul>
            <ul class="infoBox infoBoxMoney">
                <li class="clearfix">
                    <p class="label">流量价格</p>
                    <p class="num">{{item.money|filter_money}}</p>
                </li>
                 <li class="clearfix" v-if="item.coupon_type">
                    <p class="label">使用优惠券</p>
                    <p class="num">{{item.coupon_score}}元代金券 -{{item.coupon_score.toFixed(2)}}元</p>
                </li>
                <li class="clearfix">
                    <p class="label">实付金额</p>
                    <p class="num">{{item.money_cash.toFixed(2)}}元</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../assets/css/common";
    .col-money-yellow{
        color: #ff9d4d;
    }
    .pay {
        .payBox{

            .statusBox{
                width:100%;
                height:2.32rem;
                padding-top: 0.78rem;
                text-align: center;
                background: $color-white;
                .payicon{
                    width:0.96rem;
                    height:0.96rem;
                    background-size: 100% 100%;
                    margin:0 auto 0.44rem;
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
                    &.paying{
                        background-image: url(../assets/images/pay/icon-paying.png);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                    }
                    &.wait{
                        background-image: url(../assets/images/pay/icon-wait.png);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                    }
                    &.closed{
                        background-image: url(../assets/images/pay/icon-closed.png);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                    }
                    &.paied{
                        background-image: url(../assets/images/pay/icon-paied.png);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                    }

                    &.return{
                        background-image: url(../assets/images/pay/icon-refunded.png);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                    }

                }
                p{
                    width:100%;
                    font-size: 0.36rem;
                    color: $color-font;
                    text-align: center;
                }
                span{
                    width:100%;
                    display: block;
                    font-size: 0.28rem;
                    color: $color-font;
                    line-height:0.66rem;
                    padding-bottom: 0.21rem;
                }
            }
            .infoBox{
                width:100%;
                color: $color-font;
                overflow: hidden;
                background: $color-white;
                li{
                    border-top: 0.5px solid $color-border;
                    line-height: 0.9rem;
                    line-height:0.9rem;
                    .label{
                        width:30%;
                        float: left;
                        padding-left: 0.3rem;
                        font-size: 0.28rem;
                    }
                    .num{
                        text-align: right;
                        float: right;
                        padding-right: 0.43rem;
                        font-size: 0.32rem;
                    }
                }

            }
            .infoBoxMoney{
                margin-top:0.2rem;
                li:nth-child(1){
                    border-top: none;
                }
                li:nth-child(2){
                    .num{
                        color:#e42f46
                    }
                }
            }
            .couponBox{
                width:7.2rem;
                color: $color-font;
                line-height:0.8rem;
                padding-bottom: 0.2rem;
                margin-left: 0.3rem;
                .label{
                    width:30%;
                    float: left;
                    font-size: 0.28rem;
                }
                .num{
                    text-align: right;
                    width:40%;
                    float: right;
                    padding-right: 0.43rem;
                    font-size: 0.28rem;

                }
            }
            .finishBtn{
                width:5.7rem;
                height:0.88rem;
                background: #54b3d0;
                margin:0.4rem auto;
                color: #fff;
                font-size: 0.32rem;
                text-align: center;
                line-height: 0.88rem;
                border-radius: 0.05rem;
            }
        }

    }

</style>
<script>
  export default {
    props: ['item'],
    // computed:{
    //     price(){
    //         if(this.item.money-this.item.coupon_score > 0){
    //             let num = (this.item.money-this.item.coupon_score).toString().indexOf(".")
    //             if(num){
    //                 return (this.item.money-this.item.coupon_score).toFixed(2)+"元"
    //             }else{
    //                 return this.item.money-this.item.coupon_score+".00元"
    //             }
    //         }else{
    //             return 0+' 元'
    //         }
    //     }
    // }
  }
</script>


