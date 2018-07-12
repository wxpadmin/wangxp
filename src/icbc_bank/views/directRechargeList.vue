<template>
    <div>
        <div class="flowRechargeList">
            <heading :name="name"></heading>
            <div class="flowRecharge">
                <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
                    <ul class="rechargeList" v-infinite-scroll="loadMore" infinite-scroll-disabled="scroll" infinite-scroll-distance="100">
                        <li class="clearfix" v-for="(item, index) in scoreList" @click="goDetails(item)">
                            <div class="recharge_tit">
                                <div class="retit_left">{{orderName}}：{{item.order_id}}</div>
                                <div class="retit_right"  :class="payStatus[item.pay_status]">
                                    {{item |filter_pay_sec}}<i>
                                    ></i></div>
                            </div>
                            <div class="recharge_con clearfix">
                                <div class="recon_time">
                                    <span>{{item.create_time|filter_week}}</span>
                                    <span>{{item.create_time|filter_dateformat}}</span>
                                </div>
                                <div class="recon_text">{{item.package_size | filter_pkg}}{{item.belong_name}}流量充值</div>
                                <!--<div class="recon_icon" :class="payStatus[item.pay_status]">{{item.pay_status}}</div>-->
                                <div class="recon_icon" :class="filter_orderstatus(item)"></div>
                            </div>
                        </li>
                        <nomore v-if="noMore" ></nomore>
                    </ul>
                    <div slot="top" class="mint-loadmore-top" top-pull-text="下拉刷新">
                        <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">下拉刷新</span>
                        <span v-show="topStatus === 'loading'">加载中，请稍候...</span>
                    </div>
                </mt-loadmore>
            </div>
            <loading v-show="loading"></loading>
            <nomsg v-show="noData" :msg="'暂无数据'"></nomsg>
        </div>
    </div>
</template>
<script>
  import {InfiniteScroll, Spinner, Toast,Loadmore} from 'mint-ui';
  import loading from '../components/loading'
  import heading from '../components/heading'
  import nomore from '../components/nomore'
  import nomsg from '../components/nomsg'
  export default {
    data () {
      return {
        pageNum: 0,
        scroll:false,
        loading: false,
        noData: false,
        noMore: false,
        scoreList: [],
        name:"",
        orderName:"",
        payStatus: {
          0: 'none', 1: 'succ', 2: 'fail', 3: 'retu',4 : 'close'
        },
        topStatus:''
      }
    },
    mounted () {
        this.order_type = this.$route.query.order_type;
        if(this.order_type == 3){
            this.name = "充值记录";
            this.orderName = "账户充值"
        }else{
            this.name = "直充记录"
            this.orderName = "流量充值"
        }
        console.log(this.order_type)
    },
    methods: {
        handleTopChange(status) {
            this.topStatus = status;
        },
        loadTop() {
            let This = this;
            // 加载更多数据
            setTimeout(function(){
                This.$refs.loadmore.onTopLoaded()
                This.noMore = false
                This.loading = true
                This.scoreList = []
                This.pageNum = 1
                This.init(This.pageNum)
            },2000)
        },
        init () {
           let that = this
           that.loading = true
           that.$http.get('/api/icbc/order/list', {
               params: {
                   page_number:that.pageNum,
                   page_size:10,
                   order_type:this.order_type
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
                   if (res.data.data.rows == 0){
                       //没有数据 显示
                       that.noData = true
                       return
                   }
                   //当前页码大于总页码时
                   if(that.pageNum > parseInt(res.data.data.total)){
                       //无限加载打开 fasle打开 true关闭
                       that.scroll = true
                       that.allLoaded = true
                       //没有更多 显示
                       that.noMore = true
                       return
                   }
                   //list不为空的情况下
                   if (res.data.data.list && res.data.data.list.length > 0) {
                       let result = res.data.data.list
                        // 拼接下数组
                       that.scoreList = that.scoreList.concat(result)
                       that.scroll = false
                   } else {
                        //没有更多 显示
                       that.noMore = true
                   }
               } else {
                   Toast(res.data.message)
               }
            }, function (res) {
                    that.loading = false
                    Toast(res.data.message)
            })
        },
        loadMore() {
            this.scroll = true
            this.pageNum++
            console.log('this.pageNum==='+this.pageNum)
            this.init(this.pageNum)
        },
        goDetails(data){
            this.$router.push({ name: 'paystatus', query: { order_id: data.order_id}})
        },
        filter_orderstatus(obj){ // 查询状态
            let value
            switch (obj.pay_status){
              case 0:
                value = '';//未支付
                break;
              case 1:
                value = 'paied';//支付成功
                switch (obj.recharge_status){
                  case 0:
                    value = 'wait';//待充值
                    break;
                  case 1:
                    value = 'wait';//流量充值中
                    break;
                  case 2:
                    value = 'succ';//充值成功
                    break;
                  case 3:
                    value = 'fail';//充值失败
                    break;
                }
                break;
              case 2:
                value = '';// 支付失败
                break;
              case 3:
                value = 'return';// 已退还
                break;
              case 4:
                value = 'closed';// 交易关闭
                break;
            }
            return value
          }
    },
    components: {
      loading,
      heading,
      nomore,
      nomsg
    }
  }


</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../assets/css/common';

    .mint-loadmore-top{
        font-size: 0.3rem;
        color: $color-font-sec;
    }
    .flowRechargeList{
        width: 100%;
        height:100%;
        display: flex;
        flex-direction:column;
        position: relative;
    }
    .flowRecharge {
        width: 100%;
        flex: 1;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        .rechargeList {
            min-height: 11.5rem;
            li {
                width: 100%;
                height: 2rem;
                background-color: $color-white;
                overflow: hidden;
                margin-bottom: 0.2rem;
                .recharge_tit {
                    width: 100%;
                    height: 0.7rem;
                    line-height: 0.7rem;
                    border-bottom: 0.5px solid $color-border;
                    .retit_left {
                        float: left;
                        color: $color-font;
                        font-size: 0.24rem;
                        margin-left: 0.24rem;
                    }
                    .retit_right {
                        float: right;
                        font-size: 0.24rem;
                        margin-right: 0.24rem;
                        &.succ {
                            color: $color-font-sec;
                        }
                        &.fail {
                            color: $color-font-sec;
                        }
                        &.rech {
                            color: $color-font-sec;
                        }
                        &.retu {
                            color: $color-font-sec;
                        }
                        &.close {
                            color: $color-font-sec;
                        }
                        &.none {
                            color: $color-red;
                        }
                        i {
                            font-weight: 700;
                        }
                    }
                }
                .recharge_con {
                    .recon_time {
                        width: 15%;
                        margin-top: 0.3rem;
                        float: left;
                        color: $color-font-sec;
                        span {
                            display: block;
                            text-align: center;
                        }
                        span:nth-child(1){
                            font-size: 0.28rem;
                        }
                        span:nth-child(2){
                            font-size: 0.22rem;
                        }
                    }
                    .recon_text {
                        float: left;
                        line-height: 0.7rem;
                        font-size: 0.3rem;
                        color: $color-font;
                        width: 60%;
                        text-align: left;
                        margin-top: 0.28rem;
                        margin-bottom: 0.28rem;
                        margin-left: 0.3rem;
                    }
                    .recon_icon {
                        width: 1.07rem;
                        height: 1.07rem;
                        margin-right: 0.3rem;
                        margin-top: 0.1rem;
                        float: right;
                        &.succ { //充值成功
                            background-image: url(../assets/images/icon-success.png);
                            background-repeat: no-repeat;
                            background-size: 100% 100%;
                        }
                        &.fail { // 充值失败
                            background-image: url(../assets/images/icon-fail.png);
                            background-repeat: no-repeat;
                            background-size: 100% 100%;
                        }
                        &.wait { //充值中
                            background-image: url(../assets/images/icon-recharge.png);
                            background-repeat: no-repeat;
                            background-size: 100% 100%;
                        }
                        &.return { // 已退还
                            background-image: url(../assets/images/icon-return.png);
                            background-repeat: no-repeat;
                            background-size: 100% 100%;
                        }
                        &.none { //
                        }
                        &.closed { // 已关闭
                        }
                    }
                }
            }
        }
    }
</style>

