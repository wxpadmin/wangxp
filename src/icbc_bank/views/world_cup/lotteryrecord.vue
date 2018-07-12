<template>
    <div class="wrap">
        <heading :name="name" v-if="!isWeiXin()"></heading>
        <mt-loadmore :auto-fill="autoFill" :bottom-distance="distance" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <ul v-if="recordList.length > 0">
                <li v-for="item in recordList">
                    <div class="leftWrap">
                        <!--<p>{{item.open_type ==1 ? '免费开启': '消耗10M流量'}}</p>-->
                        <p>{{useScene(item.open_type,item.glod_ball_val)}}</p>
                        <p>{{item.created_on}}</p>
                    </div>
                    <div class="rightWrap">获取{{item.glod_ball_val}}金球</div>
                </li>
                <div class="no_more" v-if="allLoaded">没有更多了</div>
            </ul>
            <div class="nomore" v-else>
                暂时没有记录！
            </div>
        </mt-loadmore>
    </div>
</template>
<script>
    import heading from '../../components/heading.vue'
    import { Loadmore } from 'mint-ui';
    export default{

        mounted () {
            this.getData()
        },
        data () {
            return{
                name : '参与记录',
                recordList : [],
                nomore:false,
                page : 1,
                allLoaded : false,
                bottomDropText : '',
                distance : 20,
                bottomDropText : '上拉加载更多',
                autoFill : false
            }
        },
        methods : {
            useScene (type,num) {
                if (type == 1100001) {
                   return (num == 1888 ? '购买豪华礼包' : '购买精品礼包')
                }else if(type == 1){
                    return '免费开启'
                }else {
                    return '消耗10M流量'
                }
            },
            isWeiXin () {
                var ua = window.navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    return true;
                } else {
                    return false;
                }
            },
            getData () {
               this.$axios.get("/api/worldcup/box/logs",{page : this.page},(res)=>{
                    /*this.recordList = res*/
                   if  (res.length == 0) {
                       this.nomore = true
                       this.allLoaded = true;// 若数据已全部获取完毕
                   }
                    this.recordList = this.recordList.concat(res)
                   this.$refs.loadmore.onBottomLoaded();
                },(err)=>{
                   this.allLoaded = true;// 若数据已全部获取完毕
                })
            },
            loadBottom(id) {
                this.page ++ ;
                this.getData()
            },
        },
        components : {
            heading
        }
    }
</script>
<style lang="scss" scoped>
    .wrap{
        width: 100%;
        height:100%;
        .nomore{
            text-align: center;
            margin-top: 50%;
            color: #333;
            font-size: 0.3rem;
        }
        .no_more{
            width: 100%;
            text-align: center;
            color: #999;
            font-size: 0.3rem;
            margin-top: 0.2rem;
        }
        ul{
            li{
                box-sizing: border-box;
                margin-top: .2rem;
                padding: 0 .3rem;
                width: 100%;
                height:1.32rem;
                background-color: #FFFFFF;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .leftWrap{
                    height:100%;
                    p:nth-of-type(1){
                        font-size: .26rem;
                        color: #333333;
                        letter-spacing: 0;
                        margin-top: .3rem;
                    }
                    p:nth-of-type(2){
                        font-size: .26rem;
                        color: #999999;
                        letter-spacing: 0;
                        line-height: .62rem;
                    }
                }
                .rightWrap{
                    font-size: .26rem;
                    color: #E42F46;
                    letter-spacing: 0;
                    width: 60%;
                    text-align: right;
                }
            }
        }
    }
</style>
