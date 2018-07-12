<template>
    <div class="vmExchangeModule">
        <heading :name="name"></heading>
        <!--首页-->
        <div class="exchangeBox">
           <!--  <div class="topBar">
                流量余额：{{flowNum}}M
            </div> -->
            <!-- <div class="cardBox">
                <div class="title">
                    会员类型：
                </div>
                <ul class="cardList">
                    <li  v-for="(item,_index) in list_static" @click="Choice(item.goodsType,_index)" :class="checkClass(item.goodsType,_index)">
                        <div class="info">
                            <h4>{{item.goodsName}}</h4>
                            <p>{{item.exchangeConditionDesc}}</p>
                        </div>
                        <div class="type">{{item.cardDesc}}</div>
                        <div class="border"></div>
                    </li>
                </ul>
            </div> -->
            <div class="cardBanner">
                <img v-if = "data.categoryGoodsUrl" :src="data.categoryGoodsUrl" class="list-item-bg">
                <img v-if = "!data.categoryGoodsUrl" :src="JSON.parse(data.goodsPicUrl).goodsUrl" class="list-item-bg">
                <div class="list-detail">
                     <p>{{data.goodsName}}</p>
                </div>
            </div>
            <div class="cardBox">
                 <div class="list-detail">
                     <p>{{data.goodsName}}</p>
                     <p class="card-price">
                        <span v-if = "data.salePrice"><span class="price-title">流量价:</span>{{data.salePrice | filter_M}}M</span>
                        <span v-if = "data.marketPrice" class="card-market">市场参考价：{{data.marketPrice | filter_M}}元</span>
                     </p>
                </div>
            </div>
            <div class="tipBox" v-if='isTipbox'>
                <!-- <h4>商品使用有效期：</h4>
                <p>截止至{{effectiveuseDate.substring(0,10)}}</p> -->
                <h4>使用说明：</h4>
                <div>
                    <div v-html = "data.goodsDesc"></div>
                </div>
            </div>
            <div class="exchangeBtnBox">
                <div class="exchangeBtn" @click="submit">立即兑换</div>
                <!-- <div class="exchangeBtn on"  v-show="bSubmit" @click="submit" >{{needFlowNum}}M流量兑换</div> -->
            </div>
        </div>

        <!--确认弹窗-->
        <div class="alertmask" v-show="alertmask">
            <div class="alertbox">
                <div class="order">
                   <!--您的流量账户余额不足，赞赞 <br>流量再兑换吧-->
                    {{errMsg}}
                </div>
                <div class="btnbox">
                    <span @click="alertmask=false">知道了</span>
                </div>
            </div>
        </div>
        <div class="submitInfo" v-show="isSucc">
            <div class="process">
                <dl>
                    <dt class="num">️</dt>
                    <dd class="line red"></dd>
                    <dd class="text active">选择需要充值的手机号和具体流量包</dd>
                </dl>
                <dl>
                    <dt class="num"></dt>
                    <dd class="line"></dd>
                    <dd class="text_two active">{{order.create_time}}<br>流量充值申请提交成功，请耐心等待</dd>
                </dl>
                <dl>
                    <dt class="num"></dt>
                    <dd class="text">充值成功，流量充值到账后运营商短信通知为准</dd>
                </dl>
            </div>
            <div class="order_info">
                <div class="clearfix">
                    <p>充值号码</p>
                    <span>{{order.phone_number}}</span>
                </div>
                <div class="clearfix">
                    <p>流量大小</p>
                    <span>{{order.package_size | filter_pkg}}</span>
                </div>

            </div>
            <div class="finishbox">
                <router-link to="/index" class="finish">完成</router-link>
            </div>
        </div>
        <loading v-show="loading"></loading>
    </div>
</template>

<script>
  import loading from '../../components/loading'
  import heading from '../../components/heading.vue'
  import {InfiniteScroll, Spinner, Toast} from 'mint-ui';
  import '../../assets/js/jquery-2.1.1.min.js'

  var  cardListJson = require("../../assets/cardList.json")

  export default {
    mounted () {
      this.id = this.$route.query.id
        this.category_id = this.$route.query.category_id

      this.init()
      this.banner = cardListJson[this.id]?cardListJson[this.id].imgurl:"group1/M00/01/6C/Chmdplnde86AR-IIAACYetLIuzs300.png"
    },
    data () {
      return {
        id:"",
        data:{},
        banner:"",
        errMsg:'',
        flowNum:'0', // 流量余额
        tipsType:'', // 提示类型
        effectiveuseDate: '',
        needFlowNum: '', // 需要流量数
        loading: false,
        name: '流量换好礼',
        list_static: [],
        belong_name: '', //手机号码归属地
        area_name: '',
        addr: '',
        packageSizeInfo: '',
        iscanuse: true, //手机充值
        alertmask: false, //提取时的弹窗
        isCharge: false,  //兑换按钮
        isRed: false,     //手机号下方的提示语
        isSucc: false, //提交成功
        isTipbox: true,
        isFlowBalance: true,
        isEmpty: false,
        index: -1,
        bSubmit: false,
        order: {},
        category_id:"",
        cccImg:"http://img.ruwe.cn/group1/M00/01/6C/Chmdplnde86AR-IIAACYetLIuzs300.png"
      }
    },
    methods: {
      // checkClass(i,_index){
      //   let _class = '';
      //   if (i ==3){
      //     _class = 'tengxun'
      //   }else if (i ==2){
      //     _class = 'youku'
      //   }else if (i ==1){
      //     _class = 'aiqiyi'
      //   }
      //   if(_index==this.index){
      //     _class+=' active'
      //   }
      //   return _class
      // },
//       init () {
//         let that = this
// //        that.loading = true
//         that.$http.get('/api/icbc/member/type', {
//         }).then(function (res) {
//           let list = res.data;
//           that.loading = false
//           console.log('---------/api/icbc/order/list----------')
//           //请求成功
//           if (res.data.status == 0) {
//             //关闭loading
//             that.loading = false
//             //当总条为0时
//             that.flowNum = res.data.data.score;
//             that.list_static = res.data.data.list;
//             that.effectiveuseDate = that.list_static[0].effectiveuseDate
//             let num = that.list_static[0].goodsType
//             // that.choiceTipsType(num)
//           } else {
//             that.flowNum = res.data.data.score?res.data.data.score:0;
//             that.tipsType = 'tengxun'
//             Toast(res.data.message)
//           }
//         }, function (res) {
//           that.isLoading = false
//           Toast(res.data.message)
//         })
//       },
      // choiceTipsType(num){ // 查询提示类型
      //   if (num ==3){
      //     this.tipsType = 'tengxun'
      //   }else if (num ==2){
      //     this.tipsType = 'youku'
      //   }else if (num ==1){
      //     this.tipsType = 'aiqiyi'
      //   }
      // },
      // Choice(type,i) {
      //   this.bSubmit = true;
      //   this.index = i
      //   console.log(this.list_static[i].effectiveuseDate)
      //   this.effectiveuseDate = this.list_static[i].effectiveuseDate
      //   this.needFlowNum = this.list_static[i].exchangeCondition
      //   this.id = this.list_static[i].id
      //   this.choiceTipsType(type)
      // },
      init(){
        this.$http.get('/api/stable/cards/cards/item',{params:{card_id:this.id,category_id:this.category_id}}).then((res)=>{
            this.data = res['data']['data']
        })
      },
      submit(){//兑换
        this.loading = true
        let that = this
        that.$http.get('/api/stable/cards/flow/order', {params: {
          card_id: that.id,
          category_id:that.category_id
        }
        }).then(function (res) {
          let list = res.data;
          that.loading = false
          console.log('---------/api/icbc/order/list----------')
          //请求成功
          if (res.data.status == 0) {
            //关闭loading
            that.loading = false
            //当总条为0时
            // that.$router.push({name: 'VMsucc', query: {goodsName: res.data.data.goodsName,exchangeCondition: res.data.data.exchangeCondition,exchangeCode: res.data.data.exchangeCode,}})
            that.$router.push({name: 'VMsucc', query: {id:res.data.data.id}})

          } else {
//            Toast(res.data.message)
            that.alertmask = true
            that.errMsg = res.data.message;
          }
        }, function (res) {
          that.isLoading = false
          Toast(res.data.message)
        })
      },
    },
    components: {
      loading,
      heading
    },
    watch: {
      'phone_number': function () {
        this.tel_change()
      }
    }
  }
</script>
<style type="text/css">
    .tipBox img {
        width: 100%;
    }
    .tipBox{
        font-size: .26rem !important;
    }
</style>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../assets/css/common";
    .vmExchangeModule{
        .exchangeBox{
            height: 100%;
            .topBar{
                height:0.5rem;
                color: #999;
                font-size: 0.24rem;
                text-align: right;
                padding-right: 0.25rem;
                line-height: 0.5rem;
            }
            .cardBox{
                border-top:$border-grey;
                background: #fff;
                .title{
                    height: 0.9rem;
                    line-height: 0.9rem;
                    font-size: 0.3rem;
                    color: #333;
                    padding-left: 0.3rem;
                    border-bottom: $border-grey;
                }
                .cardList{
                    overflow: hidden;
                    border-bottom: $border-grey;
                    margin-bottom: 0.2rem;
                    padding-top: 0.3rem;
                    display: flex;
                    justify-content:flex-start ;
                    flex-wrap:wrap;
                    li{
                        margin:0 0.1rem 0.3rem 0.3rem;
                        width:3rem;
                        height:1.8rem;
                        border-radius: 0.16rem;
                        color:#fff;
                        display: flex;
                        justify-content: space-between;

                        .info{
                            width:2.04rem;
                            padding:0.3rem 0 0 0.2rem;
                            h4{
                                font-size: 0.24rem;
                                line-height: 0.24rem;
                                font-weight: bold;
                            }
                            p{
                                font-size: 0.2rem;
                                line-height: 0.34rem;
                            }
                        }
                        .type{
                            writing-mode: vertical-lr;
                            font-weight: bold;
                            font-size: 0.24rem;
                            height:1.44rem;
                            width:0.74rem;
                            margin-top: 0.18rem;
                            text-align: center;
                            line-height: 0.74rem;
                            letter-spacing: 0.1rem;
                            border-left: $border-white;
                        }
                    }
                    li.aiqiyi{
                        background: url("../../assets/images/videoMembers/bg-card-green.jpg")no-repeat;
                        background-size: 100% 100%;
                    }
                    li.tengxun{
                        background: url("../../assets/images/videoMembers/bg-card-yellow.jpg")no-repeat;
                        background-size: 100% 100%;
                    }
                    li.youku{
                        background: url("../../assets/images/videoMembers/bg-card-blue.jpg")no-repeat;
                        background-size: 100% 100%;
                    }
                    li.active{
                        position: relative;
                        box-shadow:  0 0.05rem 0.25rem #000;
                        .border{
                            border:0.03rem solid #d82d43;
                            border-radius: 0.16rem;
                            position: absolute;
                            left:-0.12rem;
                            top:-0.12rem;
                            right:-0.12rem;
                            bottom:-0.12rem;
                            background: url("../../assets/images/videoMembers/icon-selected.png")no-repeat;
                            background-size: 0.4rem 0.4rem;
                            background-position-x:96%;
                            background-position-y:94%;
                        }
                    }
                }

            }
            .tipBox {
                background: #fff;
                padding:0.1rem 0.3rem 2rem;
                line-height: 0.50rem;
                margin-top:.2rem;
                h4{
                    font-size: 0.36rem;
                    color: #333;
                }
                p{
                    color: #999;
                    font-size: 0.24rem;
                }
            }
            .exchangeBtnBox{
                width:100%;
                height: 0.88rem;
                padding:0.5rem 0;
                position: fixed;
                left: 0;
                bottom: 0;

                .exchangeBtn{
                    width:6.3rem;
                    height:0.88rem;
                    // background: #fb919e;
                    background: #e42f46;

                    color: #fff;
                    line-height: 0.88rem;
                    text-align: center;
                    margin:0 auto;
                    font-size: 0.33rem;
                    border-radius: 0.05rem;
                }
                .exchangeBtn.on{
                    background: #e42f46;
                }
            }

        }
    }

//弹窗
    .alertmask {
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        background-color: rgba(0, 0, 0, 0.38);
        .alertbox {
            width: 5.4rem;
            position: absolute;
            left: 15%;
            top: 27%;
            background-color: $color-white;
            color: $color-font;
            border-radius: 0.1rem;
            padding-top:0.6rem ;
            .order {
                width: 4.1rem;
                line-height: 0.53rem;
                padding-bottom: 0.4rem;
                border-bottom: 0.5px solid $color-border;
                margin: 0 auto;
                font-size: 0.30rem;
                text-align:center;
                .info {
                    p {
                        float: left;
                        margin-top: 0.38rem;
                        margin-left: 0.1rem;
                    }
                    span {
                        display: block;
                        float: right;
                        margin-top: 0.38rem;
                        margin-right: 0.1rem;
                    }
                }
            }
            .btnbox {
                font-size: 0.32rem;
                color: #e42f46;
                height:1rem;
                text-align: center;
                line-height: 1rem;

            }
        }
    }

    .submitInfo {
        width: 100%;
        padding-top: 0.7rem;
        font-size: 0.32rem;
        .process {
            width: 6.7rem;
            margin: 0 auto;
            dl {
                position: relative;
                left: 0;
                top: 0;
                .num {
                    width: 0.4rem;
                    height: 0.4rem;
                    background-color: $color-boder;
                    color: $color-white;
                    text-align: center;
                    line-height: 0.4rem;
                    border-radius: 50%;

                }

                .line {
                    width: 0.04rem;
                    height: 0.9rem;
                    background-color: $color-boder;
                    margin-left: 0.18rem;
                }
                .text, .text_two {
                    font-size: 0.28rem;
                    color: $color-font-sec;
                    position: absolute;
                    left: 0.75rem;
                    top: 0rem;
                }
                .text_two {
                    top: -0.25rem
                }
                .active {
                    color: $color-font;
                }
                .red {
                    background-color: #fc4e64;
                    color: $color-white;
                }
            }
            dl:nth-child(1) .num {
                background: url(../../assets/images/icon_charge1.png);
                background-size: 100% 100%;
            }
            dl:nth-child(2) .num {
                background: url(../../assets/images/icon_charge2.png);
                background-size: 100% 100%;
            }
            dl:nth-child(3) .num {
                background: url(../../assets/images/icon_charge3.png);
                background-size: 100% 100%;
            }
        }
        .order_info {
            width: 6.7rem;
            margin: 0.62rem auto 0;
            div {
                color: $color-font;
                font-size: 0.32rem;
                width: 100%;
                height: 1rem;
                line-height: 1rem;
                border-top: 1px solid $color-boder;
                p {
                    float: left;
                }
                span {
                    float: right;
                }
            }
        }
        .finishbox {
            .finish {
                width: 6.7rem;
                height: 0.88rem;
                line-height: 0.88rem;
                margin: 0.6rem auto 0;
                border-radius: 0.1rem;
                background-color: $color-red;
                color: $color-white;
                text-align: center;
                display: block;
                font-size: 0.36rem;
            }
        }
    }
     //ccc
    .cardBanner{
        font-size: .36rem;
        color: #ffffff;
        margin-bottom: .13rem;
        padding:.18rem;
        padding-left:.28rem;
        .list-item-bg{
            width: 7rem;
            height: 2.06rem;
            left: 0;
        }
        .list-detail{
            position: relative;
            z-index: 10;
            // width: 100%;
            padding: .86rem 0 .56rem 2.52rem;
            text-align: left;
            margin-top: -2.06rem;
        }
    }
    .cardBox{
        .list-detail{
            font-size: .36rem;
            color: #000000;
            position: relative;
            z-index: 10;
            // width: 100%;
            padding: .32rem 0 .32rem .28rem;
            text-align: left;
            // margin-top: -2.06rem;
        }
        .card-price{
            font-size: .32rem;
            color:#e42f46;
            margin-top: .1rem;
            .price-title{
                font-size:.22rem;
            }
        }
        .card-market{
            font-size: .18rem;
            color: #999999;
            display: inline-block;
            margin-left: .5rem;
            text-decoration: line-through;
        }
    }
</style>

