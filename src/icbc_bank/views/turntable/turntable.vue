<template>
    <div>
        <heading :name="'大转盘'"></heading>

        <div class="mode">
            <img :src="bg" alt="" id="bg">
            <!--<img class="slogan" :src="sloganImg">-->
            <div class="recordBtn " :class="news?'on':''" @click="gorecord">
                中奖记录
            </div>
            <section class="popClosed" v-if="popup_closed">
                <p>{{closedText}}</p>
                <div class="btn" @click="closepopup">确定</div>
            </section>
            <div class="popConfrim"  v-if="popup_confrim" >
                <p>本次需消耗10M流量</p>
                <div class="btnBox clearfix">
                    <div class="confirmBtn" @click="closepopup">取消</div>
                    <div class="viewBtn r" @click="draw">确定</div>
                </div>
            </div>
            <div class="popNomore" v-if="popup_nomore"  >
                <p>账户余额不足，还需{{lackNum}}M流量，是否去购买？</p>
                <div class="btnBox clearfix">
                    <div class="confirmBtn" @click="closepopup">取消</div>
                    <div class="viewBtn r" @click="goBuy">去购买</div>
                </div>
            </div>
            <div class="popupModule" v-if="popup" @click="closepopup">

            </div>
            <section class="popWin"  v-if="popup_win" style="">
                <div class="redBox"></div>
                <div class="title">
                    恭喜中奖
                </div>
                <div class="info">
                    获得{{flowNum}}，已存放在您的流量账户
                </div>
                <div class="btnBox clearfix">
                    <div class="viewBtn " @click="gorecord">去看看</div>
                    <div class="confirmBtn r" @click="closepopup">再转一次</div>
                </div>
            </section>
            <section class="popLose"  v-if="popup_lose" style="">
                <div class="redBox"></div>
                <div class="title">
                    谢谢参与
                </div>
                <div class="info center">
                    继续努力，还差一点就中了
                </div>
                <div class="confirmBtn" @click="closepopup">确定</div>
            </section>

            <main>
                <div class="accountBbalance">
                    <p>账户余额</p>
                    <div>{{score}}M</div>
                </div>

                <div id="toast" v-if="seen">
                    <div class="toastText">{{msg}}</div>
                </div>
                <div class="lotModule js-lotModule ">
                    <img :src="opcImg" alt="" class="bg-opc">
                    <div class="lottery">
                        <section class="lottery_zhuan">
                            <img :src="turnplate" alt="" class="turnplate">
                            <div class="turnplate">
                                <div class="light tf">
                                    <img id="turntableimg" class="turntableimg" src="../../assets/images/turntable/lottery_prize.png"/>
                                </div>
                            </div>
                            <img :src="rotateImg" id="rotate" class="rotate" @click="openConfrim" v-if="bOpen">
                            <img :src="rotateImg" id="rotate" class="rotate"  v-if="!bOpen">
                            <div></div>
                        </section>
                        <div class="dialShadow"></div>
                    </div>
                </div>
                <div class="playRule" >
                    <div class="title"><i></i>玩法规则<i></i></div>
                    <ul>
                        <li>1、转大奖活动时间：2018.04.28—2018.05.31</li>
                        <li>2、活动期间，有流量的客户都可以参与活动，每次抽奖，需要消耗10M流量</li>
                        <li>3、奖品共有六个奖项：</li>
                        <li class="textIn">一等奖:1000M</li>
                        <li class="textIn">二等奖:500M</li>
                        <li class="textIn">三等奖:200M</li>
                        <li class="textIn">四等奖:10M</li>
                        <li class="textIn">五等奖:5M</li>
                        <li class="textIn">六等奖:谢谢参与</li>
                        <li>4、抽中的流量奖品直接存入您的流量账户内；</li>
                        <li>5、不按照活动规则参与大转盘活动的用户，获得的奖品平台将收回；</li>
                        <li>6、抽中的奖品使用规则详情请查看《流量细则》说明。</li>
                    </ul>
                </div>

                <!--loading-->
                <div class="loader_mask" v-if="loader">
                    <div class="load-container loadAnimation">
                        <div class="loader">loading</div>
                    </div>
                </div>
                <!--loading-->
            </main>

        </div>
    </div>

</template>
<script type="text/ecmascript-6">
  import heading from '../../components/heading.vue'
  import '../../assets/js/rem.js'
  import $ from 'jquery'
  import '../../assets/js/awardRotate'
  import '../../assets/js/scroll'
  export default{
    mounted () {
      let u = navigator.userAgent;
      let isAnd = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      this.isAndroid = isAnd
      this.getUseInfo();
//      this.check() // 查询
//      rollList();
//      function rollList() {
//        //中奖名单滚动数值
//        $('.winListBox').myScroll({
//          speed: 80, //数值越大，速度越慢
//          rowHeight: $('.phone').height()//li的高度
//        });
//      }
    },
    data () {
      return {
        score:0, // 剩余流量数
        lackNum:5, // 缺少流量数
        popup_confrim:false, // 剩余流量数
        popup_closed:false, // 剩余流量数
        closedText:'', // 活动状态弹窗
        flowNum:'',// 中奖流量
        popup_win: false, // 活动规则弹窗
        popup_nomore: false, // 活动规则弹窗
        popup_lose: false, // 活动规则弹窗
        bRotate: '', // 转盘锁
        tel: '', // 手机号
        seen: false,  // 控制toast显示
        msg: '请稍后重试', // toast信息
        loader: false,
        news: false,
        bwin: false, // 是否中奖
        lotteryTime: 1, // 抽奖次数
        popupmsg: '后台中奖文案',
        popup: false, // 弹窗
        isAndroid: false,// 是否是安卓
         bOpen: false,// 是否活动开始
        rotateImg: require('../../assets/images/turntable/lottery_draw.png'),
//        sloganImg: require('../../assets/images/turntable/bg-slogan.png'),
        opcImg: require('../../assets/images/turntable/bg-opc.png'),
        bg: require('../../assets/images/turntable/bg-main.jpg'),
        turnplate: require('../../assets/images/turntable/lottery_round.png'),
      }
    },
    methods: {
      openConfrim(){
        if (this.bRotate) {
          return
        }
        this.popup=true;
        this.popup_confrim=true;
      },
      check () {
//        this.loader = true
        this.$http.get('/api/lottery/hxbank/user/info/100018', { // 查询接口
          params: {}
        }).then((res) => {
//          console.log(res.data.result)
          if (res.data.result.list) {
            this.news = true
          }
          this.lotteryTime = res.data.result.count
          this.loader = false
        })
      },
      toast (msg) {
        this.msg = msg
        this.seen = true
        let self = this
        setTimeout(function () {
//          console.log('111')
          self.seen = false
        }, 2000)
      },
      gorecord(){
        this.$router.push('drawRecord')
      },
      goBuy(){
        this.$router.push({ name: 'buyflow',query:{score:this.score}})
      },
      getUseInfo(){ //查询
        this.loading = true
        this.$http.get('/api/icbc/lottery/get?id=c3b6f351-0caf-11e8-976a-00e04c976859')
          .then(function (res) {
            this.loading = false
            console.log('---------user/info---------')
            console.log(res.data.data.status)
            if (res.data.data.status == 0) { //未开始
              this.popup=true;
              this.popup_closed = true;
              this.closedText = '活动未开始'
            }else if(res.data.data.status == 1){//开始
                this.bOpen = true
            }else if(res.data.data.status == 2){// 已结束
              this.popup_closed = true;
              this.closedText = '活动已结束'
            }
            this.score = res.data.data.user_score

          }.bind(this))
          .catch(function (err) {
//            this.loading = false
          }.bind(this))
      },
      rotate () { // 抽奖
        this.closepopup();
        $('#turntableimg').rotate({
          angle: 0,
          animateTo: 6800,
          duration: 18000
        })
//        this.rotateFn(22.5, '0')
        this.bRotate = true
        this.$http.get('/api/icbc/lottery/hit', { // 抽奖接口
          params: {
            id: 'c3b6f351-0caf-11e8-976a-00e04c976859'
          }
        }).then(function (res) {

          let self = this
          if (res.data.status === 0) {
            let index = res.data.data.name
//              console.log(index)
            switch (index) { // http://app.m.ruowei.cn/
              case '谢谢参与':
                this.rotateFn(60, '谢谢参与')
                break
              case '10M':
                this.rotateFn(120, '10M')
                break
              case '5M':
                this.rotateFn(180, '5M')
                break
              case '1000M':
                this.rotateFn(240, '1000M')
                break
              case '500M':
                this.rotateFn(300, '500M')
                break
              case '200M':
                this.rotateFn(360, '200M')
                break
            }
//            this.score =res.data.data.score

            let _this = this
            setTimeout(function () {
              _this.score =res.data.data.score
            },8000)
          } else{
            this.bRotate = false
            $('#turntableimg').stopRotate() // popup(data.msg)
            if(res.data.status === 1){
              if(res.data.message === '余额不足'){
                this.popup = true;
                this.popup_nomore = true;
                this.score =res.data.data.score;
                this.lackNum = 10-res.data.data.score;
                return;
              }
            }
            this.popup = false
            console.log(res.data)
            this.toast(res.data.message)

          }
        }.bind(this))
      .catch(function (err) {
//          this.loading = false
        }.bind(this))
      },
      rotateFn (angles, txt) {
        $('#turntableimg').stopRotate()
        let self = this
        $('#turntableimg').rotate({
          angle: 0,
          animateTo: angles + 1080,
          duration: 8000,
          callback: function () {
//            console.log('jinle')
            console.log(txt)
            self.bRotate = false
            if (txt === '谢谢参与') {
              self.popup = true
              self.popup_lose = true
            } else if (txt === '10M') {
              self.popup = true
              self.popup_win = true
              self.flowNum = '10M流量'
            } else if (txt === '5M') {
              self.popup = true
              self.flowNum = '5M流量'
              self.popup_win = true
            } else if (txt === '1000M') {
              self.popup = true
              self.popup_win = true
              self.flowNum = '1000M流量'
            } else if (txt === '500M') {
              self.popup = true
              self.popup_win = true
              self.flowNum = '500M流量'
            } else if (txt === '200M') {
              self.popup = true
              self.popup_win = true
              self.flowNum = '200M流量'
            }

          }
        })
      },
      draw () { // 点击抽奖
        if (this.bRotate) {
          return
        }
        if(this.score>10){
          this.score = this.score-10
        }
        this.rotate() // 抽奖
        // this.test(0)
      },
      closepopup (){
        this.popup_win=false;
        this.popup_closed=false;
        this.popup_confrim=false
        this.popup_nomore= false
        this.popup_lose= false
        this.popup = false
      }
    },
    components:{
      heading
    }
  }
</script>
<style rel="stylesheet" lang="scss">
    @import '../../assets/css/reset.scss';
    .popNomore{
        display: block;
        z-index: 199;
        width:5.11rem;
        height:3.02rem;
        background: #fff;
        border-radius: 0.1rem;
        position: fixed;
        left:1.19rem;
        top:3.32rem;
        p {
            width: 4.1rem;
            margin:0 auto;
            font-size: 0.32rem;
            color:rgb(12,12,40);
            text-align: left;
            padding-top: 0.62rem;
            line-height: 0.56rem;
        }
        .btnBox {
            position: absolute;
            left: 0.3rem;
            bottom: 0.16rem;
            width: 4.51rem;
            height: 0.66rem;
            border-top: 0.01rem solid rgb(202, 202, 202);
            line-height: 0.66rem;
            font-size: 0.32rem;
            padding-top: 0.17rem;
            color: #fff;
            margin: 0 auto;
            text-align: center;
            display: flex;
            justify-content: space-between;

            div {
                width: 49.5%;
                height: 0.75rem;
                line-height: 0.75rem;
                font-size: 0.32rem;
                color: rgb(34, 34, 34);
                text-align: center;
                /*background: #f55b75;*/
            }
            div.r {
                color: rgb(228, 47, 70);
                border-left: 0.01rem solid rgb(202, 202, 202);
            }
        }
    }
    .popClosed{
        z-index: 199;
        width:5.11rem;
        height:3.02rem;
        background: #fff;
        border-radius: 0.1rem;
        position: fixed;
        left:1.19rem;
        top:3.32rem;
        p {
            width: 100%;
            font-size: 0.32rem;
            color:rgb(12,12,40);
            text-align: center;
            padding-top: 0.18rem;
            line-height: 1.78rem;
        }
        div{
            margin:0 auto;
            width:4.15rem;
            border-top: 0.01rem solid rgb(202,202,202);
            color: rgb(228,47,70);
            font-size: 0.36rem;
            padding-top: 0.33rem;
            line-height: 0.36rem;
            text-align: center;
        }
    }
    .popConfrim{
        display: block;
        z-index: 100;
        width:5.11rem;
        height:3.02rem;
        background: #fff;
        border-radius: 0.1rem;
        position: fixed;
        left:1.19rem;
        top:3.32rem;
        p {
            width: 4.1rem;
            margin:0 auto;
            font-size: 0.32rem;
            color:rgb(12,12,40);
            text-align: center;
            padding-top: 0.62rem;
            line-height: 0.56rem;
        }
        .btnBox {
            position: absolute;
            left: 0.3rem;
            bottom: 0.16rem;
            width: 4.51rem;
            height: 0.66rem;
            border-top: 0.01rem solid rgb(202, 202, 202);
            line-height: 0.66rem;
            font-size: 0.32rem;
            padding-top: 0.17rem;
            color: #fff;
            margin: 0 auto;
            text-align: center;
            display: flex;
            justify-content: space-between;

            div {
                width: 49.5%;
                height: 0.75rem;
                line-height: 0.75rem;
                font-size: 0.32rem;
                color: rgb(34, 34, 34);
                text-align: center;
                /*background: #f55b75;*/
            }
            div.r {
                color: rgb(228, 47, 70);
                border-left: 0.01rem solid rgb(202, 202, 202);
            }
        }
    }

    .playRule{
        color: #fff;
        width:6.11rem;
        margin:0 auto;

        .title{
            margin:0 auto;
            width:6.11rem;
            height:0.32rem;
            font-size: 0.32rem;
            color: #fff;
            text-align: center;
            display: flex;
            justify-content:space-between;
            padding-top: 0.58rem;
            i{
                height: 0.2rem;
                width:1.96rem;
                border-bottom:0.02rem solid rgb(255,249,214);

            }
        }
        ul{
            padding-top: 0.36rem;
            width:100%;
            li{
                width:100%;
                font-size: 0.28rem;
                line-height: 0.54rem;
                text-align: left;
            }
            .textIn{
                text-indent: 2em;
            }
        }
    }

    .mode {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .mode #bg {
        width: 100%;
    }
    .accountBbalance{
        width:100%;
        font-size: 0.32rem;
        color: #fff;
        text-align: center;

        p{
            height:0.32rem;
        }
        div{
            font-size: 0.4rem;
            display: inline-block;
            padding:0 0.3rem;
            height:0.67rem;
            line-height: 0.67rem;
            background: rgba(0,0,0,.3);
            border-radius: 1rem;
            margin:0.22rem auto 0.41rem;
        }
    }

    .recordBtn {
        /*width: 1.5rem;*/
        font-size: 0.3rem;
        color: rgb(255, 236, 73);
        width: 20%;
        /*height:0.55rem;*/
        height: 2.9%;
        position: absolute;
        /*top: 0.36rem;*/
        /*right: 0.33rem;*/
        top: 2%;
        right: 4.3%;
    }


    .lotModule {
        width: 100%;
        /*height: 3.5rem;*/
        /*background: red;*/
        /*margin-top: -0.57rem;*/
        margin-bottom: -17%;
        position: relative;
    }

    .lotModule .bg-opc {
        width: 100%;
    }

    /*抽奖主页面*/
    .lottery {
        width: 100%;
        position: absolute;
        top: 0rem;
        left: 0;
        /*background: red ;*/
    }

    .lottery_zhuan {
        /*width: 6.3rem;*/
        width: 83%;
        /*height: 6.3rem;*/
        position: relative;
        left: 0;
        top: 0;
        margin: 0 auto;
        z-index: 1;
    }

    .turnplate {
        width: 100%;
        height: 100%;
        display: block;
        margin: 0rem auto 1.5rem;
        /*background: url(../../assets/images/turntable/lottery_round.png) no-repeat;*/
        /*background-size: 100% 100%;*/
        /*position: relative;*/
    }

    .light {
        width: 95%;
        height: 95%;
        position: absolute;
        top: 52.5%;
        left: 52.5%;
        margin-left: -50%;
        margin-top: -50%;
        background: url(../../assets/images/turntable/light_red.png) 0 0 no-repeat;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
    }

    .tf {
        -webkit-animation: light 1s linear infinite;
        animation: light 1s linear infinite;
        -webkit-backface-visibility: hidden;
    }

    .turntableimg {
        width: 90%;
        /* height: 5.48rem; */
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -45%;
        margin-top: -45%;
    }

    .rotate {
        /*background: url("../../assets/images/turntable/lottery_draw.png")no-repeat;*/
        /*background-size: 100% 100%;*/
        /*width: 1.62rem;*/
        width: 18%;
        /*height: 2.09rem;*/
        height: 24%;
        position: absolute;
        top: 53%;
        left: 54%;
        /*margin-left: -0.81rem;*/
        margin-left: -13%;
        margin-top: -18%;
        /*margin-top: -1.1rem;*/
    }

    /*动画*/

    @-webkit-keyframes light {
        0% {
            background: url(../../assets/images/turntable/light_red.png) no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
        }
        50% {
            background: url(../../assets/images/turntable/light_white.png) no-repeat;
            background-size: 100% 100%;
            -webkit-background-size: 100% 100%;
        }
        100% {
            background: url(../../assets/images/turntable/light_red.png) no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
        }
    }

    @keyframes light {
        0% {
            background: url(../../assets/images/turntable/light_red.png) no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
        }
        50% {
            background: url(../../assets/images/turntable/light_white.png) no-repeat;
            background-size: 100% 100%;
            -webkit-background-size: 100% 100%;
        }
        100% {
            background: url(../../assets/images/turntable/light_red.png) no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
        }
    }

    #id {
        width: 100%;
    }

    /*popup*/
    .popupModule {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .6);
        z-index: 99;
    }

    .popNoTime {
        width: 5.5rem;
        height: 3.1rem;
        background: #fff;
        background-size: 100% 100%;
        position: fixed;
        left: 1rem;
        top: 3.7rem;
        z-index: 99;
        border-radius: 0.1rem;
        .info {
            width: 100%;
            line-height: 0.3rem;
            font-size: 0.3rem;
            color: #333;
            margin: 1rem 0 0.6rem;
            text-align: center;
        }
        .winBox {
            width: 4.72rem;
            height: 0.66rem;
            line-height: 0.66rem;
            font-size: 0.32rem;
            color: #fff;
            margin: 0 auto;
            text-align: center;
            display: flex;
            justify-content: space-between;
            div {
                width: 2.18rem;
                height: 0.68rem;
                line-height: 0.68rem;
                font-size: 0.3rem;
                color: #fff;
                margin: 0 auto;
                text-align: center;
                background: #f55b75;
                border-radius: 1rem;
            }
        }
    }

    .popNoWin {
        width: 5.5rem;
        height: 3.1rem;
        background: #fff;
        background-size: 100% 100%;
        position: fixed;
        left: 1rem;
        top: 3.7rem;
        z-index: 99;
        border-radius: 0.1rem;
        .info {
            width: 100%;
            line-height: 0.48rem;
            font-size: 0.3rem;
            color: #333;
            margin: 0.66rem 0 0.4rem;
            text-align: center;
        }
        .confirmBtn {
            display: block;
            width: 2.2rem;
            height: 0.68rem;
            line-height: 0.68rem;
            font-size: 0.3rem;
            border-radius: 1rem;
            color: #fff;
            margin: 0 auto;
            text-align: center;
            background: #f55b75;
        }
    }
    .popRule {
        width: 6.1rem;
        height: 8.75rem;
        background: #fff;
        background-size: 100% 100%;
        position: fixed;
        left: 0.7rem;
        top: 1.52rem;
        z-index: 99;
        border-radius: 0.1rem;
        .title{
            width:100%;
            font-size: 0.26rem;
            line-height: 0.26rem;
            color: #333;
            text-align: center;
            padding:0.34rem 0 0.26rem;
        }
        ul {
            width: 5.4rem;
            line-height: 0.4rem;
            font-size: 0.24rem;
            color: #333;
            margin: 0 auto 0.4rem;
            text-align: left;
            li{
                width:100%;
                margin-bottom: 0.08rem;

            }
        }
        .confirmBtn {
            display: block;
            width: 2.2rem;
            height: 0.68rem;
            line-height: 0.68rem;
            font-size: 0.3rem;
            border-radius: 1rem;
            color: #fff;
            margin: 0 auto;
            text-align: center;
            background: #f55b75;
        }
    }

    .popWin {
        width: 5.11rem;
        height: 3.62rem;
        /*background: url("../../assets/images/turntable/bg-alert.png")no-repeat;*/
        background: #fff;
        position: fixed;
        left: 1.19rem;
        top: 3.42rem;
        z-index: 99;
        border-radius: 0.1rem;

        .redBox {
            width: 1.42rem;
            height: 1.48rem;
            background: url("../../assets/images/turntable/bg-redBox.png") no-repeat;
            background-size: 100% 100%;
            position: absolute;
            left: 0.13rem;
            top: -0.75rem;
            z-index: 100;
        }
        .title {
            width: 100%;
            height: 0.84rem;
            font-size: 0.41rem;
            line-height: 0.84rem;
            color: #fff;
            margin: 0 0 0.39rem;
            text-align: center;
            background: rgb(228, 47, 70);
            background-size: 100% 100%;
            border-radius: 0.1rem 0.1rem 0 0;
        }
        .info {
            width: 3.5rem;
            line-height: 0.57rem;
            font-size: 0.32rem;
            color: rgb(13, 12, 40);
            margin: 0 auto 0.2rem;
            text-align: left;
        }
        .info.center {
            line-height: 1.1rem;
            text-align: center;

        }
        .btnBox {
            position: absolute;
            left: 0.3rem;
            bottom: 0.16rem;
            width: 4.51rem;
            height: 0.66rem;
            border-top: 0.01rem solid rgb(202, 202, 202);
            line-height: 0.66rem;
            font-size: 0.32rem;
            padding-top: 0.17rem;
            color: #fff;
            margin: 0 auto;
            text-align: center;
            display: flex;
            justify-content: space-between;

            div {
                width: 49.5%;
                height: 0.75rem;
                line-height: 0.75rem;
                font-size: 0.32rem;
                color: rgb(34, 34, 34);
                text-align: center;
                /*background: #f55b75;*/
            }
            div.r {
                color: rgb(228, 47, 70);
                border-left: 0.01rem solid rgb(202, 202, 202);
            }
        }
    }

    .popLose {
        width: 5.11rem;
        height: 3.62rem;
        /*background: url("../../assets/images/turntable/bg-alert.png")no-repeat;*/
        background: #fff;
        position: fixed;
        left: 1.19rem;
        top: 3.42rem;
        z-index: 99;
        border-radius: 0.1rem;

        .redBox {
            width: 1.42rem;
            height: 1.48rem;
            background: url("../../assets/images/turntable/bg-redBox.png") no-repeat;
            background-size: 100% 100%;
            position: absolute;
            left: 0.13rem;
            top: -0.75rem;
            z-index: 100;
        }
        .title {
            width: 100%;
            height: 0.84rem;
            font-size: 0.41rem;
            line-height: 0.84rem;
            color: #fff;
            margin: 0 0 0.39rem;
            text-align: center;
            background: rgb(228, 47, 70);
            background-size: 100% 100%;
            border-radius: 0.1rem 0.1rem 0 0;
        }
        .info {
            width: 3.5rem;
            line-height: 0.57rem;
            font-size: 0.28rem;
            color: rgb(13, 12, 40);
            margin: 0 auto 0.2rem;
            text-align: left;
        }
        .info.center {
            line-height: 1rem;
            text-align: center;

        }
        .confirmBtn{
            position: absolute;
            left: 0.3rem;
            bottom: 0.16rem;
            width: 4.51rem;
            height: 0.66rem;
            border-top: 0.01rem solid rgb(202, 202, 202);
            line-height: 0.66rem;
            font-size: 0.32rem;
            padding-top: 0.17rem;
            color: #2a2a2a;
            margin: 0 auto;
            text-align: center;
            /*font-size: 0.14rem;*/

        }
    }

    /*未关注*/
    .mask {
        width: 100%;
        min-height: 16rem;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.58);
        z-index: 1;
        overflow: hidden;
    }

    body {
        /*background: #6F1794;*/
    }

    /*header {*/
    /*width: 100%;*/
    /*height: 7.05rem;*/
    /*!*background: url("../../assets/images/turntable/bg-headerIndex.jpg") no-repeat;*!*/
    /*background-size: 100% 100%;*/
    /*}*/

    main {
        width: 100%;
        padding-bottom: 0.3rem;
        background-size: 100% 100%;
        position: absolute;
        top: 3.87rem;
        background: url(../../assets/images/turntable/bg-main-1.jpg) repeat-y;
        background-size: 100% 100%;
        .btnBox {
            width: 5.93rem;
            display: flex;
            margin: 0 auto;
            text-align: center;
            position: relative;
            z-index: 2;
            justify-content: space-between;
            div {
                background: url("../../assets/images/turntable/button_green.png") no-repeat;
                background-size: 100% 100%;
                width: 2.6rem;
                height: 0.78rem;
                font-size: 0.3rem;
                color: #32ba6e;
                text-align: center;
                line-height: 0.78rem;

            }
        }

        .winModule {
            width: 6.22rem;
            margin: 0.57rem auto 0;
            border: 0.04rem solid #ffe750;
            border-radius: 0.1rem;
            background: #fff;
            padding-top: 0.44rem;
            position: relative;
            .title {
                width: 2.89rem;
                height: 0.64rem;
                font-size: 0.28rem;
                color: #ffe750;
                text-align: left;
                text-indent: 0.78rem;
                line-height: 0.64rem;
                background: url("../../assets/images/turntable/bg_winList_title.png") no-repeat;
                background-size: 100% 100%;
                position: absolute;
                left: 1.79rem;
                top: -0.37rem;
            }
            .winListBox {

                height: 2.69rem;
                height: 2.05rem;
                margin-top: 0.44rem;
                overflow: hidden;

                margin: 0 auto;
                color: #f2496d;
                ul {
                    width: 100%;
                    li {
                        width: 5.71rem;
                        font-size: 0.24rem;
                        line-height: 0.52rem;
                        margin: 0 auto;
                        color: #f2496d;
                    }

                }
                p {
                    width: 50%;
                    float: left;
                }
                p.num {
                    text-align: right;
                }
            }
        }

    }


    main .remainingTimes {
        width: 100%;
        height: 0.34rem;
        color: #fff;
        font-size: 0.34rem;
        margin: 0 auto;
        text-align: center;
        line-height: 0.34rem;
        padding: 0.14rem 0 0.18rem;

        span {
            color: #f2496d;
        }
    }


    /*toast弹窗star*/
    #toast {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        text-align: center;
        font-size: 0.35rem;
        z-index: 999;
    }

    .toastText {
        color: #fff;
        background: rgba(0, 0, 0, 0.5);
        margin: 5rem auto 0;
        display: inline-block;
        padding: 0.25rem;
        border-radius: 0.15rem;
    }

    /*toast弹窗end*/

    /*loading*/
    .loader_mask {
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
    }

    .show {
        display: block;
    }

    .load-container {
        width: 1.8rem;
        height: 1.8rem;
        float: right;
        position: fixed;
        left: 50%;
        top: 40%;
        margin-left: -0.9rem;
        margin-top: -0.9rem;
        overflow: hidden;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: rgba(0, 0, 0, 0.48);
        border-radius: 0.2rem;
        z-index: 10000;
    }

    .load-container a:link,
    .load-container a:visited {
        position: absolute;
        bottom: 0.03rem;
        font-size: 0.115rem;
        text-align: center;
        left: 0;
        right: 0;
        text-decoration: none;
        color: #315590;
    }

    .load-container a:link:hover,
    .load-container a:visited:hover {
        text-decoration: underline;
    }

    .loader {
        -webkit-transform: translateZ(0);
        -moz-transform: translateZ(0);
        -ms-transform: translateZ(0);
        -o-transform: translateZ(0);
        transform: translateZ(0);
    }

    .loadAnimation .loader {
        margin: 0.8rem auto;
        font-size: 0.1rem;
        width: 0.25rem;
        height: 0.22rem;
        border-radius: 50%;
        position: relative;
        text-indent: -9999rem;
        -webkit-animation: loadAnimation 1.1s infinite ease;
        animation: loadAnimation 1.1s infinite ease;
    }

    @-webkit-keyframes loadAnimation {
        0%,
        100% {
            box-shadow: 0em -2.6em 0em 0em #fff, 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.5), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7);
        }
        12.5% {
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.7), 1.8em -1.8em 0 0em #fff, 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5);
        }
        25% {
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.5), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7), 2.5em 0em 0 0em #fff, 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
        }
        37.5% {
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5), 2.5em 0em 0 0em rgba(255, 255, 255, 0.7), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
        }
        50% {
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.5), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7), 0em 2.5em 0 0em #fff, -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
        }
        62.5% {
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.5), 0em 2.5em 0 0em rgba(255, 255, 255, 0.7), -1.8em 1.8em 0 0em #fff, -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
        }
        75% {
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.5), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7), -2.6em 0em 0 0em #fff, -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
        }
        87.5% {
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.5), -2.6em 0em 0 0em rgba(255, 255, 255, 0.7), -1.8em -1.8em 0 0em #fff;
        }
    }

    @keyframes loadAnimation {
        0%,
        100% {
            box-shadow: 0em -2.6em 0em 0em #fff, 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.5), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7);
        }
        12.5% {
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.7), 1.8em -1.8em 0 0em #fff, 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5);
        }
        25% {
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.5), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7), 2.5em 0em 0 0em #fff, 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
        }
        37.5% {
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5), 2.5em 0em 0 0em rgba(255, 255, 255, 0.7), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
        }
        50% {
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.5), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7), 0em 2.5em 0 0em #fff, -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
        }
        62.5% {
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.5), 0em 2.5em 0 0em rgba(255, 255, 255, 0.7), -1.8em 1.8em 0 0em #fff, -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
        }
        75% {
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.5), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7), -2.6em 0em 0 0em #fff, -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
        }
        87.5% {
            box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.5), -2.6em 0em 0 0em rgba(255, 255, 255, 0.7), -1.8em -1.8em 0 0em #fff;
        }
    }

    /*loading*/
</style>
