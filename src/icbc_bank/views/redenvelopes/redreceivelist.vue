<template>
    <div>
        <div class="red_recive_list">
            <heading :name="'已获得红包'"></heading>
            <div class="red-title">
                已领取红包{{rows}}个
            </div>
            <div class="detbox">
                <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
                    <ul class="rechargeList" v-infinite-scroll="loadMore" infinite-scroll-disabled="scroll" infinite-scroll-distance="100">
                        <li class="item" v-for="item in scoreList">
                            <div class="left">
                                <img :src="item.head_img_url?item.head_img_url:red_img_logo">
                            </div>
                            <div class="center">
                                <div class="title">{{item | filter_real_name}}分享红包</div>
                                <div class="time">{{item.create_time}}</div>
                            </div>
                            <div class="right">+{{item.amount|filter_pkg}}</div>
                        </li>
                        <nomore v-if="noMore" ></nomore>
                    </ul>
                    <div slot="top" class="mint-loadmore-top" top-pull-text="下拉刷新">
                        <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">下拉刷新</span>
                        <span v-show="topStatus === 'loading'">加载中，请稍候...</span>
                    </div>
                </mt-loadmore>
                <nomsg v-show="noData" :msg="'暂无记录'"></nomsg>
            </div>
            <loading v-show="loading"></loading>
        </div>
    </div>

</template>
<script>
    import {InfiniteScroll, Spinner, Toast, Loadmore} from 'mint-ui';
    import loading from '../../components/loading'
    import heading from '../../components/heading'
    import loadinglist from '../../components/loadinglist'
    import nomsg from '../../components/nomsg'
    import nomore from '../../components/nomore'
    export default {
        mounted(){

        },
        data (){
            return {
                topStatus:'',
                scroll:false, // 控制下拉数据的
                allLoaded:false,
                topStatus:'',
                scoreList:[],
                rows:0,
                pageNum: 0,
                noData:false, // 没有数据
                noMore:false,
                loading:false, // 控制loading
                red_img_logo: require('../../assets/images/head_logo.png'),

            }
        },
        components:{
            loading,
            heading,
            loadinglist,
            nomsg,
            nomore
        },
        methods:{
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
                this.loading = true
                this.$http.get('/api/icbc/get/redpacket/list', {
                    params: {
                        page_number:this.pageNum,
                        page_size:10
                    }
                }).then(function (res) {
                    let list = res.data;
                    that.loading = true
                    console.log('---------/api/icbc/get/redpacket/list----------')
                    console.log(JSON.stringify(list))
                     if (res.data.status == 0) {
                       //关闭loading
                       that.loading = false
                       //当总条为0时
                       that.rows = res.data.data.rows
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
                this.init(this.pageNum)
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../../assets/css/common';
    .mint-loadmore-top{
        color: $color-boder;
        font-size: 0.3rem;
    }
    .red_recive_list{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction:column;
        position: relative;
        .red-title{
            font-size: 0.24rem;
            height: 0.8rem;
            line-height: 0.8rem;
            color: #999999;
            padding-left: 0.3rem;
        }
        .detbox{
            width: 100%;
            flex: 1;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            background-color: $color-white !important;
            ul{
                min-height: 10rem;
                .item{
                    display:flex;
                    background:#fff;
                    padding:0.2rem 0px;
                    border-bottom:1px solid #eee;
                    .left{
                        margin:0 0.3rem;
                        width: 0.7rem;
                        height: 0.7rem;
                        img{
                            width: 100%;
                            display: block;
                        }
                    }
                    .center{
                        flex:1;
                        .title{
                            font-size: 0.3rem;
                            color: #333333;
                        }
                        .time{
                            font-size: 0.24rem;
                            color: #999999;
                        }
                    }
                    .right{
                        font-size: 0.3rem;
                        color: #28ac3e;
                        line-height: 0.7rem;
                        margin-right: 0.3rem;
                    }

                }

            }
        }
    }

</style>
