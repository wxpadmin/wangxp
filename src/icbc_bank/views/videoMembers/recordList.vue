<template>
    <div>
        <div class="vmRecordList">
            <heading :name="'流量兑换记录'"></heading>
            <div class="numBar">共{{rows}}条兑换记录</div>
            <div class="flowRecharge">
                <ul class="rechargeList" >
                    <pull-refresh :loading = "loading" :nomore = "nomore" @loadmore = "loadmore">
                        <li class="" v-for="(item, index) in scoreList" @click="goDetails(item)">
                            <div class="namedate">
                                <div class="name">{{item.card_title}}</div>
                                <div class="date">兑换时间：{{(item.create_time+'').substring(0,10)}}</div>
                            </div>
                            <div class="numbtn">
                                <div class="num">{{item.card_price}}M</div>
                                <div class="infoBtn">查看详情 <i>&gt</i></div>
                            </div>
                        </li>
                    </pull-refresh>
                </ul>
            </div>
            <loading v-show="loading"></loading>
            <!--<nomsg v-show="scoreList.length == 0" :msg="'暂无数据'"></nomsg>-->
        </div>
    </div>
</template>
<script>
  import {InfiniteScroll, Spinner, Toast,Loadmore} from 'mint-ui';
  import loading from '../../components/loading'
  import heading from '../../components/heading'
  import nomore from '../../components/nomore'
  import nomsg from '../../components/nomsg'
  import pullRefresh from "../../../../components/pullRefresh.vue";

  export default {
    data () {
      return {
        pageNum: 1, //
        rows: 0, // 总条数
        scroll:false,
        loading: false,
        noData: false,
        noMore: false,
        scoreList: [],
        payStatus: {
          0: 'none', 1: 'succ', 2: 'fail', 3: 'retu',4 : 'close'
        },
        topStatus:'',
        pullLoad:false,
        nomore:false
      }
    },
    mounted(){
      this.init()
    },
    methods: {
      loadmore(){
        this.pageNum ++ 
        this.pullLoad = true
        this.init()
      },
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
        that.$http.get('/api/stable/card/flow/order/list', {
          params: {
            page_number:that.pageNum,
            page_size:10
          }
        }).then(function (res) {
          let data = res.data.data
          let list =data.list;
          that.loading = false
          that.pullLoad = false
          console.log('---------/api/icbc/order/list----------',res)
          //请求成功
          if (res.data.status == '0') {
            //关闭loading
                that.loading = false
                //当总条为0时
                if (list.length == 0){
                  //没有数据 显示
                  that.nomore = true
                  // that.noData = true
                  return
                }
                that.rows = data.rows
            //list不为空的情况下
                if (list.length > 0) {
                  // 拼接下数组
                  that.scoreList = that.scoreList.concat(list)
                  //已无更多情况
                  if(that.scoreList.length >= data.rows){
                      that.nomore = true
                  }
                  // that.scroll = false
                } else {
                  //没有更多 显示
                  that.noMore = true
                  that.nomore = true
                }
          } else {
            Toast(res.data.message)
          }
        }, function (res) {
          that.isLoading = false
          Toast(res.data.message)
        })
        .catch((err)=>{
        	this.loading = false
        	Toast('网络异常')
        })
      },
      loadMore() {
        this.scroll = true
        this.pageNum++
        console.log('this.pageNum==='+this.pageNum)
        this.init(this.pageNum)
      },
      goDetails(data){
        this.$router.push({ name: 'VMrecord', query: { id: data.id}})
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
      nomsg,
      pullRefresh
    }
  }


</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../../assets/css/common';

    .mint-loadmore-top{
        font-size: 0.3rem;
        color: $color-font-sec;
    }
    .vmRecordList{
        width: 100%;
        height:100%;
        display: flex;
        flex-direction:column;
        position: relative;
        .numBar{
            height:0.5rem;
            color: #999;
            padding-right:0.3rem;
            line-height: 0.5rem;
            font-size: 0.24rem;
            text-align: right;
        }

        .flowRecharge {
            width: 100%;
            flex: 1;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            .rechargeList {
                min-height: 10rem;
                li{
                    background: #fff;
                    margin-bottom: 0.22rem;
                    border-bottom: $border-grey;
                    border-top: $border-grey;
                    height:1.6rem;
                    display: flex;
                    justify-content: space-between;
                    .namedate{
                        padding-top: 0.43rem;
                        width:50%;
                        padding-left: 0.3rem;
                        .name{
                            color: #333;
                            font-size: 0.3rem;
                            padding-bottom: 0.24rem;
                            line-height: 0.3rem;
                        }
                        .date{
                            line-height: 0.24rem;
                            color: #999;
                            font-size: 0.24rem;
                        }
                    }
                    .numbtn{
                        width:50%;
                        text-align: right;
                        padding-right: 0.3rem;
                        padding-top: 0.43rem;
                        .num{
                            color: #333;
                            font-size: 0.3rem;
                            line-height: 0.3rem;
                            padding-bottom: 0.24rem;
                        }
                        .infoBtn{
                            line-height: 0.24rem;
                            color: #e42f46;
                            font-size: 0.24rem;
                            i{
                                vertical-align: 0.02rem;
                            }
                        }
                    }
                }
            }
        }

    }

</style>

