<template>
<div>
    <heading :name="'中奖记录'"></heading>
    <div class="recordModule">
        <div class="popupModule" v-if="popup" @click="closepopup">

        </div>
        <div class="popupModule-confrim-shadow" v-if="popup_con" @click="closepopup_con">
        </div>
        <section class="popupModule-confrim" id="popup-confrim" v-if="popup_con">
            <div class="title">
                充值确认
            </div>
            <ul class="infoBox">
                <li><p>向签约手机:</p><span>{{phone_number}}</span></li>
                <li><p>充值:</p><span>{{prize_name}}</span></li>
                <li><p>当前日期:</p><span>{{now_time}}</span></li>
            </ul>
            <div class="tips">温馨提示:请避免在月末2天充值</div>
            <div class="btnBox">
                <p @click="closepopup_con">取消</p>
                <p @click="toRecharge">确定</p>
            </div>
        </section>
        <ul class="dataList">
            <li v-for="item in recordList" @click="confirm(item)">
                <div class="infoBox clearfix">
                    <div class="dateBox">
                        <div class="week">{{item.create_time | filter_week}}</div>
                        <div class="dateNum">{{item.create_time.substr(0, 10)}}</div>
                    </div>
                    <div class="info">
                        <div style="display: inline-block;text-align: left;">
                            <div class="name">{{item.prize_name}}</div>
                            <div class="phone" v-if="item.prize_name == '谢谢参与'?false:true">
                                限手机{{item.phone_number ? item.phone_number : '133XXXXXXXX'}}使用
                            </div>
                        </div>
                    </div>
                    <div  class="status on"><i></i></div>
                </div>
            </li>
        </ul>
        <p class="nodata" v-if="nodata">还没有中奖哦</p>
        <div id="toast" v-if="seen">
            <div class="toastText">{{msg}}</div>
        </div>
        <!--loading-->
        <div class="loader_mask" v-if="loader">
            <div class="load-container loadAnimation">
                <div class="loader">loading</div>
            </div>
        </div>
        <!--loading-->
    </div>
</div>

</template>
<script type="text/ecmascript-6" >
  import heading from '../../components/heading.vue'
  import '../../assets/js/rem.js'
  import  moment from 'moment'

  export default{
    mounted () {
      this.check()
//      this.loader = true
    },
    data () {
      return {
        nodata: false,// 暂无记录
        block: false,// 充值锁
        seen: false,// toast
        popup: false, // 弹窗
        popup_con: false, // 确认弹窗
        recordList: [], // 记录列表
        loader: false,
        phone_number: '13389938844', // 是否是流量
        prize_name: '50M流量', // 是否是流量
        now_time: '2013年12月11日', // 是否是流量
        activity_status: '', // 是否是流量
        id: '', // 是否是流量
        bFlow: true, // 是否是流量
//        img1:require('')
      }
    },
    methods: {
      check_activity_status (item) { // 查询状态
        if (item.prize_name == '谢谢参与') {
          return ''
        } else {
          if (item.activity_status == 0) {
            return '充值'
          } else {
            return '已充值'
          }
        }
      },
      check_class (item) { // 查询状态
            return 'on'
      },
      filter_dateformat(time) {
        return moment(time).format('MM-DD');
      },
      confirm(item){ //
        this.$router.push({ name: 'detailedList'})
      },
      toRecharge (item) { // 点击充值
        this.closepopup_con()
        if (this.block) {
          return
        }
//        this.loader = true
        if (this.activity_status == 0) {
          this.block = true
          //            return '充值'
          this.$http.post('/api/lottery/hxbank/gain/100018', { // 充值
            id: this.id
          }, {emulateJSON: true}).then((res) => {
            if (res.data.status == 0) {
              console.log('充值成功')
              this.popup = true
              this.block = false
            } else {
              this.toast(res.data.msg)
              this.block = false
            }
            this.loader = false
          })
        } else {
          this.loader = false
          return '已充值'
        }

      },
      check () {
//        this.loader = true
        this.$http.get('/api/icbc/lottery/my/records?id=c3b6f351-0caf-11e8-976a-00e04c976859', { // 查询抽奖列表
          params: {}
        }).then(function (res) {
          if (res.data.status == 0) {
            this.loader = false
            if (res.data.data.length == 0) {
              this.nodata = true
            } else {
              this.recordList = res.data.data
            }
          } else {
            this.loader = false
          }
        }.bind(this))
      .catch(function (err) {
//            this.loading = false
        }.bind(this))
      },
      toast (msg) {
        this.msg = msg
        this.seen = true
        let self = this
        setTimeout(function () {
          console.log('111')
          self.seen = false
        }, 2000)
      },
      closepopup (){
        this.popup = false
//        window.location.reload()
      },
      closepopup_con (){ // 关掉确认弹窗
        this.popup_con = false
      },
      openPopup(){ // 打开弹窗
        this.popup = true
        this.popup_con = false

      }
    },
    components:{
      heading
    }
  }
</script>
<style rel="stylesheet" lang="scss" scoped>
    @import '../../assets/css/reset.scss';

    .recordModule {
        width: 100%;
        height: 100%;
        background: #f1f1f1;
    }

    .nodata {
        width: 7.5rem;
        font-size: 0.52rem;
        text-align: center;
        position: fixed;
        left: 0;
        top: 4rem;
        color: #999;
    }

    .bg {
        width: 100%;
        height: 12.06rem;
        background: #f1f1f1;
        background-size: 100% 100%;
        /*position: absolute;*/
        left: 0;
        top: 0;
    }

    .dataList {
        padding-top: 0.1rem;
        position: relative;
        z-index: 1;
        min-height: 12.02rem;
        /*background: url("../assets/img/bg-record.jpg")no-repeat;*/
        /*background-size: 100% 100%;*/
        font-size: 0.28rem;
        color: #333;
        li {
            width: 100%;
            margin-left:0.07rem;
            border-left:0.06rem solid #e9596b;
            height: 1.11rem;
            margin-top: 0.2rem;
            background: #fff;

            .infoBox {
                width: 100%;
                height: 1.03rem;
                display: flex;
                overflow: hidden;
                /*padding-top: 0.1rem;*/

                .dateBox{
                    padding-left: 0.3rem;
                    color: #bbb;
                    font-size: 0.28rem;
                    .week {
                        width: 100%;
                        line-height: 0.28rem;
                        padding: 0.2rem 0 0.1rem;
                    }
                    .dateNum {
                        color: #bababa;
                        font-size: 0.24rem;
                        line-height: 0.3rem;
                    }
                }
                .info {
                    flex: 1;
                    text-align: center;
                    padding: 0rem 0 0.12rem;
                    color: #333;

                    .name {
                        line-height: 1.11rem;
                    }
                }
                .status {
                    line-height: 1.3rem;
                    padding-right: 0.41rem;
                    width: 12%;
                    text-align: center;
                    color: #dbdbdb;
                    font-size: 0.28rem;
                }
                .status.on {
                    float: right;
                    line-height: 1.3rem;
                    color: #f2496d;
                    position: relative;
                    i{
                        width: 0.14rem;
                        height:0.26rem;
                        background: url("../../assets/images/turntable/icon-enter.png")no-repeat;
                        background-size: 100% 100%;
                        position: absolute;
                        right:0.3rem;
                        top:0.4rem;
                    }
                }
            }
        }
    }

    .recordModule{
        /*popup*/
        .popupModule {
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, .6);
            z-index: 99;
            .popup {
                width: 5.5rem;
                height: 3.4rem;
                background: #fff;
                position: fixed;
                left: 1rem;
                top: 3.19rem;
                z-index: 99;
                border-radius: 0.1rem;

                .info {
                    width: 4.4rem;
                    line-height: 0.48rem;
                    font-size: 0.28rem;
                    color: #2a2a2a;
                    margin: 0.59rem auto 0.4rem;
                    text-align: center;
                    height: auto;
                }
                .btn {
                    display: block;
                    width: 2.2rem;
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


        /*popup-confirm*/

        .popupModule-confrim-shadow {
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, .6);
            z-index: 99;
        }
        .popupModule-confrim {
            width: 5.5rem;
            height: 5.3rem;

            background: #fff;
            border-radius: 0.1rem;
            position: fixed;
            left: 1rem;
            top: 2.2rem;
            z-index: 99;

            .title {
                height:1.38rem;
                width: 100%;
                font-size: 0.38rem;
                line-height: 1.38rem;
                color: #fff;
                text-align: center;
                /*background: url("../../assets/images/turntable/bg-popwin.png") no-repeat;*/
                background-size: 100% 100%;
            }
            .infoBox {
                width: 4.8rem;
                font-size: 0.3rem;
                color: #666;
                margin: 0.4rem 0 0.24rem;
                padding-left: 0.36rem;
                height: auto;

                li {
                    line-height: 0.5rem;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;

                }
                p {
                    text-align: left;
                    display: inline;
                }
                span {
                    text-align: right;
                }
            }
            .tips {
                width: 3.9rem;
                font-size: 0.24rem;
                color: #f2556e;
                padding-left: 0.9rem;
                text-align: center;
                margin-bottom: 0.34rem;
                white-space: nowrap;
            }
            .btnBox {
                width: 4.72rem;
                height: 0.66rem;
                line-height: 0.66rem;
                font-size: 0.32rem;
                color: #fff;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                p {
                    width: 2.2rem;
                    text-align: center;
                    background: #f55b75;
                    border-radius: 1rem;
                }
            }

        }
    }


    body {
        background: #f1f1f1;
    }
</style>
