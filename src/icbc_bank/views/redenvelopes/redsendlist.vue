<template>
    <div>
        <div class="red_recive_list">
            <heading :name="'已发出红包'"></heading>
            <div class="red-title">
                已发出红包{{rows}}个
            </div>
            <div class="detbox">
                <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
                    <ul class="rechargeList" v-infinite-scroll="loadMore" infinite-scroll-disabled="scroll" infinite-scroll-distance="100">
                        <li v-for="item in scoreList" @click="goredsdetails(item.id)">
                            <div class="center">
                                <div class="title">我</div>
                                <div class="time">{{item.create_time}}</div>
                            </div>
                            <div class="right">
                                <div class="title">-{{item.amount}}M</div>
                                <div class="time" v-if="item.status == 0&& item.quantity == item.used_num">已领完</div>
                                <div class="time" v-if="item.status == 0&& item.quantity != item.used_num">已领取{{item.used_num}}/{{item.quantity}}</div>
                                <div class="time" v-if="item.status == 1">已过期</div>
                            </div>
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
                loading:false // 控制loading
            }
        },
        components:{
            loading,
            heading,
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
                that.loading = true
                that.$http.get('/api/icbc/send/redpacket/list', {
                    params: {
                        page_number:that.pageNum,
                        page_size:10
                    }
                }).then(function (res) {
                    let list = res.data;
                    that.loading = false
                    console.log('---------/api/icbc/send/redpacket/list----------')
                     //请求成功
                    if (res.data.status == 0) {
                       //关闭loading
                       that.loading = false
                       //当总条为0时
                       that.rows = res.data.data.rows
                       if (res.data.data.rows ==0){
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
            },
            goredsdetails(id){
                this.$router.push({ path: 'redsdetails', query: {
                    id: id
                }})
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
        min-height: 10rem;
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
            ul{
                min-height: 10rem;
                background-color: $color-white;
                li{
                    display:flex;
                    height: 0.7rem;
                    padding:0.2rem 0px;
                    border-bottom:1px solid #eee;
                    margin-left:0.3rem;
                    .center{
                        flex:1;
                        .title{
                            font-size: 0.3rem;
                            color: #333333;
                            display: block;
                            line-height: 0px;
                            margin-top: 0.2rem;
                        }
                        .time{
                            font-size: 0.24rem;
                            margin-top: 0.2rem;
                            color: #999999;
                        }
                    }
                    .right{
                        text-align:right;
                        margin-right:0.3rem;
                        .title{
                            font-size: 0.3rem;
                            color: #e42f46;
                            line-height: 0px ;
                            margin-top: 0.2rem;
                        }
                        .time{
                            font-size: 0.24rem;
                            margin-top: 0.2rem;
                            color: #999999;
                        }
                    }
                }
                li:active{
                    background-color: rgba(0,0,0,0.1);
                }
            }
        }


    }
</style>
