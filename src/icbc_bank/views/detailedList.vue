<template>
    <div>
        <div class="detList">
            <heading :name="'收支明细'"></heading>
            <div class="header_tab">
                <span @click="toggle(index,index)" v-for="(tab,index) in tabs"
                      :class="{on:isOn===index}">{{tab.text}}</span>
            </div>
            <div class="detbox">
                <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
                    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="scroll" infinite-scroll-distance="100">
                        <li class="clearfix" v-for="(item, index) in scoreList">
                            <div class="det_top">
                                <h5 class="det_tit">{{item.desc | filter_phone_num}}</h5>
                                <div class="flow_type" :class="item.type ? 'flow_income' : 'flow_pay'">{{item.type ? '+' :'-'}}{{item.score}}M
                                </div>

                            </div>
                            <div class="det_bottom">
                                <p class="det_time">{{item.create_time}}</p>
                                <div class="flow_num" v-show="listView">{{item|filter_detaillist}}</div>
                            </div>
                        </li>
                        <!--<p v-show="scroll" class="page-infinite-loading">-->
                            <!--<mt-spinner type="fading-circle"></mt-spinner>-->
                            <!--加载中...-->
                        <!--</p>-->
                        <nomore v-if="noMore" ></nomore>
                    </ul>
                    <div slot="top" class="mint-loadmore-top" top-pull-text="下拉刷新">
                        <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">下拉刷新</span>
                        <span v-show="topStatus === 'loading'">加载中，请稍候...</span>
                    </div>
                </mt-loadmore>
                <nomsg v-show="noData" :msg="'暂无记录'"></nomsg>
            </div>
        </div>
        <v-loading v-show="isLoading"></v-loading>
    </div>
</template>
<script>
  import {InfiniteScroll, Spinner, Toast, Loadmore} from 'mint-ui';
  import VLoading from '../components/loading'
  import heading from '../components/heading'
  import nomore from '../components/nomore'
  import nomsg from '../components/nomsg'
  export default {
    mounted(){

    },
    data () {
      return {
        topStatus:'',
        listView: 0,
        scoreList:[],
        pageNum: 0,
        noData:false, // 没有数据
        noMore:false, //没有更多了
        isLoading:false, // 控制loading
        scroll:false, // 控制下拉数据的
        allLoaded:false,
        isOn: 0,
        tabs:[
            {
                text: '流量收入'
            },
            {
                text: '流量支出'
            }
        ]
      }
    },
    methods:{
       toggle (i,type) {
         this.scoreList = [];
         this.pageNum = 1
         this.isOn = i
         this.listView = type
         this.noMore = false
         this.noData = false
         this.isLoading = true
         this.init(this.pageNum)
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
                This.isLoading = true
                This.scoreList = []
                This.pageNum = 1
                This.init(This.pageNum)
            },2000)
        },
       init () {
           let that = this
           that.isLoading = true
           that.$http.get('/api/icbc/user/score/list', {
               params: {
                   type:that.listView,
                   page_number:that.pageNum,
                   page_size:10
               }
           }).then(function (res) {
               let list = res.data;
               that.isLoading = false
               console.log('---------/api/icbc/user/score/list----------')
               //请求成功
               if (res.data.status == 0) {
                   //关闭loading
                   that.isLoading = false
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
                    that.isLoading = false
                    Toast(res.data.message)
            })
        },
        loadMore() {
            this.scroll = true
            console.log("执行loadMore")
            this.pageNum++
            this.init(this.pageNum)
        }
    },
    components:{
      VLoading,
      heading,
      nomsg,
      nomore

    }
  }



</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../assets/css/common';
    .page-infinite-loading{
        text-align: center;
        color: $color-font-sec;
        padding-bottom: 0.05rem;
        height: 0.5rem;
        line-height: 1rem;
        font-size: 0.32rem;
        font-weight: normal;
        div{
            display: inline-block;
            vertical-align: middle;
            margin-right: 0.05rem;;
        }
    }
    .mint-loadmore-top{
        color: $color-boder;
        font-size: 0.3rem;
    }
    .detList {
        width: 100%;
        background-color: $color-white !important;
        height:100%;
        display: flex;
        flex-direction:column;
        position: relative;
        .header_tab {
            width: 100%;
            height: 0.88rem;
            display: flex;
            border-bottom: 1px solid $color-border;
            span {
                display: block;
                flex: 1;
                color: $color-font;
                font-size: 0.3rem;
                line-height: 0.88rem;
                text-align: center;
                &.on {
                    color: $color-red;
                }
            }
        }
        .detbox {
            width: 100%;
            flex: 1;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            ul {
                width: 7.2rem;
                margin-left: 0.3rem;
                min-height: 10rem;
                li {
                    border-bottom: 0.5px solid $color-boder;
                    padding-bottom: 0.2rem;
                    width: 100%;
                    height: 1.06rem;
                    .det_top {
                        width: 100%;
                        margin-top: 0.24rem;
                        font-weight: normal;
                        height: 0.4rem;
                        h5 {
                            font-size: 0.28rem;
                            float: left;
                        }
                        .flow_type {
                            font-size: 0.32rem;
                            float: right;
                            margin-right: 0.3rem;
                        }
                        .flow_income {
                            color: #3bd57c;
                        }
                        .flow_pay {
                            color: #e44648;
                        }
                    }
                    .det_bottom {
                        width: 100%;
                        margin-top: 0.24rem;
                        font-size: 0.28rem;
                        .det_time {
                            color: $color-font-sec;
                            float: left;
                        }
                        .flow_num {
                            float: right;
                            margin-right: 0.3rem;
                            color: $color-font;
                        }
                    }
                }
            }
        }
    }
</style>

