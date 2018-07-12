<template>
    <div class="wrap">
        <heading :name="name" v-if="!isWeiXin()"></heading>
        <pop-up-single
            :title1="title1"
            :content1="content1"
            :sure-text1="sureText1"
            :showpopupsingle = 'showpopupsingle'
            @popup-show-single="popshowSingle"
            @sure-btn-single="surebtnSingle"
        ></pop-up-single>
        <pop-up-double
                :title="title"
                :content="content"
                :close-text="closeText"
                :sure-text="sureText"
                :showpopup="showpopup"
                @close-btn="closeBtn"
                @popup-show="popupShow"
                @sure-btn="showBtn"
        >
            <div class="noamend">
                {{shotText}}
            </div>
        </pop-up-double>
        <div class="bg">
            <div class="detail">
                <img :src="team_info.icon" alt="">
                <p>{{team_info.name}}</p>
                <p>{{team_info.count_val}}球</p>
            </div>
            <div class="box" @click="openBox">
                <p>开启</p>
            </div>
            <p class="count">今日免费开启 {{count ? count : '0'}} 次</p>
            <div class="line">
                <img src="http://img02.ruwe.cn/group1/M00/02/E0/ChmdplsaPBuAQdxWAAAAb72gBeM446.png" alt="">
            </div>
            <div class="fanslist">
                <p class="redtitle">当前粉丝排行榜</p>
                    <ul class="ranking" v-if="fansList.length > 0" v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
                            <li v-for="item in fansList">
                                <p>NO.{{item.index}}</p>
                                <p>{{item.phone_number}}</p>
                                <p>{{item.glod_ball_val}}球</p>
                            </li>
                            <div class="no_more" v-if="allLoaded">
                                没有更多数据
                            </div>
                    </ul>
                    <div class="nomore" v-else>
                        暂时没有记录!
                    </div>
            </div>
            <div class="ball"></div>
            <div class="activerules">
                <div class="leftbox" @click="goLotteryrecord">
                    <p>参与记录</p>
                    <img src="http://img02.ruwe.cn/group1/M00/03/36/ChiijVsaPAGAMXzDAAAAg_a93KM528.png" alt="">
                </div>
                <div @click="goActiveinstructions">
                    <p>活动说明</p>
                    <img src="http://img02.ruwe.cn/group1/M00/03/36/ChiijVsaPAGAMXzDAAAAg_a93KM528.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import heading from '../../components/heading.vue'
    import popUpSingle from '../../components/popUpSingle.vue'
    import popUpDouble from '../../components/popUpDouble.vue'
    import { InfiniteScroll } from 'mint-ui';
    export default {
        mounted () {
            this.team_id = this.$route.query.team_id
            this.getList()
        },
        data () {
            return {
                team_id : '',
                ajaxLock : true,
                shotText : '',
                title : '温馨提示',
                content : '免费机会已用完',
                closeText : '关闭',
                sureText : '确认',
                showpopup : false,
                name : '粉丝金球排行榜',
                team_info : '',
                fansList: [],
                count : '',
                sureText1 : '知道了',
                title1 : '为球队加油！',
                content1 : '',
                showpopupsingle : false,
                nomore:false,
                page : 1,
                queryLoading: false,
                moreLoading: false,
                allLoaded: false,
            }
        },
        methods : {
            isWeiXin () {
                var ua = window.navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    return true;
                } else {
                    return false;
                }
            },
            loadMore () {
/*                if(this.allLoaded){
                    this.moreLoading = true;
                    return;
                }*/
                this.page ++
                this.getList()
            },
            getList () {
                this.$axios.get('/api/worldcup/support/team',{team_id : this.team_id,page : this.page},(res)=>{
                    this.team_info = res.team_info
                    this.fansList = this.fansList.concat(res['golden_ball_order'])
                    if (res['golden_ball_order'].length == 0) {
                        this.nomore = true
                        this.allLoaded = true
                        this.moreLoading = true;
                    }
                    this.count = res.count
                })
            },
            openBox () {
                this.sureText = '确定'
                if (this.count > 0) {
                    this.$axios.get('/api/worldcup/open/box',{type : ''},(res)=>{
                        this.showpopupsingle = true
                        this.content1 = `恭喜您抽中${res.prize_value}球,我的排名${res.order}名`
                        this.fansList = []
                        this.page = 0
                        this.allLoaded = false
                        this.moreLoading = false
                    })
                }else {
                    this.showpopup = true
                    this.shotText = '需扣除10M爱享流量再开一次宝箱'
                    this.content = '免费机会已用完'
                }
            },
            goLotteryrecord () {
                this.$router.push({name : 'lotteryrecord'})
            },
            goActiveinstructions () {
                this.$router.push({name : 'activeinstructions'})
            },
            popshowSingle () {
                this.showpopupsingle = false
                this.fansList = []
                this.page = 0
                this.allLoaded = false
                this.moreLoading = false
                this.loadMore()
            },
            surebtnSingle () {
                this.showpopupsingle = false
                this.fansList = []
                this.page = 0
                this.allLoaded = false
                this.moreLoading = false
                this.loadMore()
            },
            closeBtn () {
                this.showpopup = false
                this.fansList = []
                this.page = 0
                this.allLoaded = false
                this.moreLoading = false
                this.loadMore()
            },
            popupShow () {
                this.showpopup = false
                this.fansList = []
                this.page = 0
                this.allLoaded = false
                this.moreLoading = false
                this.loadMore()
            },
            popshowSingle () {
                this.showpopupsingle = false
                this.fansList = []
                this.page = 0
                this.allLoaded = false
                this.moreLoading = false
                this.loadMore()
            },
            showBtn () { // 消耗10M流量开宝箱
                if (this.sureText == '去购买') {
                    this.showpopup = false
                    var scroll = window.localStorage.getItem('score')
                    if (this.isWeiXin()) {
                        window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.icbc.elife'
                    }else {
//                        window.location.href = location.protocol + "//"+location.host + "/icbc_bank/#/buyflowtest?score=" + scroll
                        this.$router.push({name : 'buyflowtest',query:{score : scroll,isbanner : true}})
                    }
                }else{
                  if (this.ajaxLock) {
                      this.ajaxLock = false
                      this.$axios.get('/api/worldcup/open/box',{type : 'consume'},(res)=>{
                          this.showpopup = false
                          this.showpopupsingle = true
                          this.content1 = `恭喜您抽中${res.prize_value}球,我的排名${res.order}名`
                          this.page = 0
                          this.fansList = []
                          this.allLoaded = false
                          this.moreLoading = false
                          this.loadMore()
   /*                       this.fansList = []
                          this.allLoaded = false
                          this.page = 1
                          this.getList()*/
                          this.ajaxLock = true
                      },(err)=>{
                          this.showpopup = true
                          this.content = '爱享流量账户余额不足'
                          this.shotText = '快去购买流量吧'
                          this.sureText = '去购买'
                          this.ajaxLock = true
                          this.page = 0
                          this.fansList = []
                          this.allLoaded = false
                          this.moreLoading = false
                          this.loadMore()
 /*                         this.fansList = []
                          this.allLoaded = false
                          this.page = 1
                          this.getList()*/
                      })
                  }
                }
            }
        },
        components : {
            heading,
            popUpSingle,
            popUpDouble,
        }
    }
</script>
<style lang="scss" scoped>
    .wrap{
        width: 100%;
        .no_more{
            width: 100%;
            text-align: center;
            color: #999;
            font-size: 0.3rem;
            margin-top: 0.1rem;
        }
        .nomore{
            text-align: center;
            margin-top: 50%;
            margin-left: -1.83rem;
        }
        .noamend{
            font-size: .28rem;
            color: #333333;
            letter-spacing: 0;
            line-height: .3rem;
            margin-top: .2rem;
            text-align: center;
        }
        .bg{
            position: relative;
            width: 100%;
            height:100%;
            background: url("http://img02.ruwe.cn/group1/M00/03/37/ChiijVsiVGyAdgFPAACnJMA_6v0969.png") no-repeat;
            background-size: 100% 100%;
            padding-top: .8rem;
        }
        .detail{
            width: 100%;
            padding:0 .6rem 0 1.36rem;
            display: flex;
            box-sizing: border-box;
            img{
                width: .62rem;
                height:.42rem;
            }
            p{
                color: #fff;
                font-size: .28rem;
            }
            p:nth-of-type(1){
                width: 1.7rem;
                margin-left: .6rem;
            }
            p:nth-of-type(2){
                width: 40%;
                text-align: right;
            }
        }
        .box{
            width: 3rem;
            height:2.16rem;
            margin:.38rem auto 0;
            background: url("http://img02.ruwe.cn/group1/M00/03/36/ChiijVsaPD-AHAtsAAAQdJz_3uM902.png");
            background-size: 100% 100%;
            text-align: center;
            padding-top: 1.48rem;
            box-sizing: border-box;
            p{
                font-size: .28rem;
                color: #FF0000;
                letter-spacing: 0;
            }
        }
        .count{
            font-size: .28rem;
            color: #FFFFFF;
            letter-spacing: 0;
            text-align: center;
            margin-top: .3rem;
        }
        .line{
            width: 5.04rem;
            margin: .3rem auto 0;
            img{
                width: 100%;
            }
        }
        .fanslist{
            padding-top: .2rem;
            .redtitle{
                text-align: center;
                font-size: .28rem;
                color: #FF0000;
                letter-spacing: 0;
            }
            .ranking{
                height:4.5rem;
                margin-top: .3rem;
                overflow: scroll;
                -webkit-overflow-scrolling: touch;
                color: #fff;
                font-size: .24rem;
                color: #FFFFFF;
                letter-spacing: 0;
                padding-left: 1.38rem;
                padding-right: .6rem;
                li{
                    display: flex;
                    margin-bottom: .3rem;
                }
                p:nth-of-type(1){
                    width: 15%;
                }
                p:nth-of-type(2){
                    padding-left: .3rem;
                    width: 30%;
                }
                p:nth-of-type(3){
                    width: 40%;
                    text-align: right;
                }
            }
        }
        .ball{
            position: absolute;
            background-image: url("http://img02.ruwe.cn/group1/M00/02/E0/ChmdplsiU1aAGToLAAASnP8NWcQ282.png");
            background-size: 100% 100%;
            width: 1.57rem;
            bottom: .33rem;
            left: .41rem;
            height:1.57rem
        }
        .activerules{
            position: absolute;
            bottom: 1.11rem;
            right:1.01rem;
            display: flex;
            div{
                display: flex;
                align-items: center;
            }
            .leftbox{
                margin-right: .7rem;
            }
            p{
                font-size: .28rem;
                color: #FF0000;
                letter-spacing: 0;
                margin-right: .2rem;
            }
            img{
                width: .4rem;
                height:.21rem;
            }
        }
    }
</style>
