<template>
    <div>
        <div class="wrap">
            <div class="title">
                <div class="go-back" @click="back_app">
                    <i></i>
                </div>
                <p>爱享流量</p>
            </div>
            <header class="header-slider">
                <div class="header-rule clearfix" @click="goRule">
                    <i></i>
                    <span>流量细则</span>
                </div>
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                         <div class="swiper-slide">
                          <router-link :to="{ name: 'buyflowtest',query:{score:score,isbanner:true}}">
                            <img :src="banner4" width="100%">
                          </router-link>
                        </div>

                         <div class="swiper-slide">
                             <router-link :to="{ name: 'credit'}">
                                 <img :src="credit_banner" width="100%">
                             </router-link>
                        </div>
                        <div class="swiper-slide">
                            <router-link :to="{ name: 'worldcupindex'}">
                                <img src="https://img02.ruwe.cn/group1/M00/02/E0/ChmdplsjkN2AU3oWAADbCpL3DMc960.png" width="100%">
                            </router-link>
                        </div>
                        <div class="swiper-slide">
                            <router-link :to="{ name: 'worldcupindex'}">
                                <img src="https://img02.ruwe.cn/group1/M00/02/E1/Chmdpls2DoeAWhv3AAKiU3UBE88744.jpg" width="100%">
                            </router-link>
                        </div>
                       <!--  <div class="swiper-slide">
                            <router-link to="aoteactive">
                              <img :src="banner3" width="100%">
                            </router-link>
                        </div> -->
                       <!--  <div class="swiper-slide">
                            <router-link to="aoteactive">
                              <img :src="banner3" width="100%">
                            </router-link>
                        </div> -->
                       <!--  <div class="swiper-slide" >
                          <a href="https://m.10010.com/sma/kouliangcard/html/kouliangtemple.html?randomCode=OxwPWC" style="display:inline-block;height:100%;width:100%;">
                            <img :src="banner2"  width="100%">
                          </a>
                        </div> -->
                    </div>
                    <!-- 分页器 -->
                    <!-- <div class="swiper-pagination"></div> -->
                </div>
            </header>
            <section class="user-info">
                <h3>流量余额</h3>
                <p class="flow">{{score|filter_length_pkg}}</p>
                <router-link :to="{ name: 'detailedList'}" class="detailed-list">
                    流量收支明细
                </router-link>
            </section>
            <section class="col-nav">
                <ul class="clearfix">
                    <li>
                        <router-link :to="{ name: 'directRecharge',query:{phone_number:phone_number}}" class="detailed-list">
                            <span class="column-icon"></span>
                            <div>
                                <h6>流量直充</h6>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'buyflowtest',query:{score:score}}" class="detailed-list">
                            <span class="column-icon"></span>
                            <div>
                                <h6>账户充值</h6>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'charge',query: {score:score,phone_number:phone_number,expired_scores:expired_scores}}" class="detailed-list">
                            <span class="column-icon"></span>
                            <div>
                                <h6>提取流量</h6>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'redeemcode'}" class="detailed-list">
                            <span class="column-icon"></span>
                            <div>
                                <h6>流量兑换码</h6>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'VMindex'}" class="detailed-list">
                            <span class="column-icon"></span>
                            <div>
                                <h6>流量换好礼</h6>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'redindex'}" class="detailed-list">
                            <span class="column-icon"></span>
                            <div>
                                <h6>发红包</h6>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'credit'}" class="detailed-list">
                            <span class="column-icon"></span>
                            <div>
                                <h6>还信用卡</h6>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <!-- v-if = "number > 0" -->
                        <span class = "number" v-if = "number > 0">{{number}}</span>
                        <router-link :to="{ name: 'couponcard'}" class="detailed-list">
                            <span class="column-icon"></span>
                            <div>
                                <h6>我的优惠券</h6>
                            </div>
                        </router-link>
                    </li>
            </section>
            <!--<div class="kong"></div>-->
            <section class="activity-box">
                <h5><span></span>活动推荐</h5>
                <div class="activity">
                    <div @click="goActive" style="display:none"></div>
                    <div @click="goDraw" style="display:none"></div>
                    <div @click="goWorldCup"></div>
                    <div  @click="goSign" v-show="isWeiXin()"></div>
                    <div @click="goAddress"></div>
                    <!--&lt;!&ndash; 隐藏入口 &ndash;&gt;-->
                    <!--&lt;!&ndash; <router-link :to="{ name: 'buyflowtest',query:{score:score}}" class="detailed-list">-->
                      <!--<div style="display:inline-block;width:2rem;height:2rem;position:absolute;left:0;margin-top:.5rem;background:rgba(0,0,0,0)"></div>-->
                    <!--</router-link> &ndash;&gt;-->
                    <!--&lt;!&ndash; <router-link :to="{ name: 'credit'}" class="detailed-list">-->
                      <!--<div style="display:inline-block;width:2rem;height:2rem;position:absolute;right:0;margin-top:.5rem;background:rgba(0,0,0,0)"></div>-->
                    <!--</router-link> &ndash;&gt;-->
                </div>
            </section>
            <loading v-show="loading"></loading>
        </div>
    </div>
</template>
<script>
    import loading from '../components/loading.vue'
    import '../assets/js/swiper-3.4.2.min.js'
    export default {
        mounted(){
            const mySwiper = new Swiper ('.swiper-container', {
                loop: true,
                // 如果需要分页器
                pagination: '.swiper-pagination',
                autoplay: '3000',
                autoplayDisableOnInteraction : false,
            });
            this.getUseInfo()
            if(this.isWeiXin()){
                this.banner = require('../assets/images/wx-banner-hd.jpg')
            }else{
                this.banner = require('../assets/images/app-banner-hd.jpg')
            };
            // this.$axios.get("/icbc/flow/couponcount",{},(res,rex) => {
            //     console.log(rex)
            // })
            // this.$axios.get('icbc/flow/couponcount',{},(res,rex)=>{
            //         console.log(rex)
            //     },(err)=>{
            //         console.log(err)
            //     })
            this.$http.get("/api/icbc/flow/couponcount").then((res) => {
                this.number = res.data.data.coupon_count
            })
        },
        data (){
            return {
               loading:false,
               score:0,
               phone_number:'',
               banner:require('../assets/images/app-banner.jpg'),
               banner3:require('../assets/images/active_banner.jpg'),
               banner2:require('../assets/images/banner2.jpg'),
               banner4:require('../assets/images/banner5.png'),
                credit_banner:require('../assets/images/credit_banner.jpg'),
               number:0,
                expired_scores:0,
            }
        },
        components:{
            loading
        },
        methods:{
            goWorldCup () {
                this.$router.push({name : 'worldcupindex'})
            },
            goSign () {
                this.$router.push({name : 'signin'})
            },
            isWeiXin(){
                let ua = window.navigator.userAgent.toLowerCase()
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                    return true
                }else{
                    return false
                }
            },
            getUseInfo(){
               this.loading = true
               this.$http.get('/api/icbc/user/info')
               .then(function (res) {
                 this.loading = false
                  if (res.data.status == 0) {
                     this.score = res.data.data.score
                     this.expired_scores = res.data.data.expired_scores
                     this.phone_number = res.data.data.phone_number
                      if(!this.phone_number){
                          this.$router.push({ name: 'login'})
                      }
                     if(/1\d{10}/.test(this.phone_number)){
                        localStorage.setItem('phone_number',this.phone_number)
                     }
                  }
               }.bind(this))
               .catch(function (err) {
                   this.loading = false
               }.bind(this))
            },
            back_app() {
                hybrid_app.back()
            },
            goRule(){
                this.$router.push({ path: 'usageRules'})
            },
            goActive(){
                this.$router.push({ path: 'activity'})
            },
            goDraw(){
                this.$router.push({ path: 'turntable'})
            },
            goAddress () {
                window.location.href='https://mp.weixin.qq.com/s/cJ4tKo0cvQbLptTTCMvnvg'
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../assets/css/common';
  @import '../assets/css/swiper-3.4.2.min.css';
  .wrap{
      width: 100%;
      position: relative;
      min-height: 12.1rem;
      left:0;
      top:0;
      background-color: #fff;
      .title {
          width: 100%;
          height: 0.84rem;
          text-align: center;
          line-height: 0.84rem;
          position: relative;
          font-size: 0.36rem;
          background-color: #fff;
          border-bottom: 0.5px solid #f5f5f5;
          .go-back {
              width: 0.6rem;
              height: 100%;
              position: absolute;
              left: 0;
              top: 0;
              i {
                  width: 0.19rem;
                  height: 0.36rem;
                  position: absolute;
                  left: 0.25rem;
                  top: 0.22rem;
                  background: url(../assets/images/icon-go-back-red.png) no-repeat;
                  background-size: 100% 100%;
              }
          }
      }

      .header-slider{
          width: 100%;
          position: relative;
          .header-rule{
              display: flex;
              position: absolute;
              top:0.2rem;
              right: 0.25rem;
              z-index: 999;
              i{
                  display: block;
                  width:0.24rem;
                  height: 0.24rem;
                  background: url(../assets/images/icon-rule.png) no-repeat;
                  background-size: 100% 100%;
                  margin-top: 0.05rem;
              }
              span{
                  font-size: 0.24rem;
                  color: #fff;
                  margin-left: 0.1rem;
              }
          }
      }
      .swiper-slide{
          height:3.2rem;
          img{
              width:100%;
              height:100%;
          }
      }
      .kong{
          width:100%;
          height:0.24rem;
          background: #f3f3f3;
      }
      .user-info{
          width: 7.1rem;
          height:2.2rem;
          background-color: #fff;
          border-radius:6px;
          margin-left:0.2rem;
          margin-top:-0.5rem;
          text-align: center;
          color: #333;
          box-shadow: 2px 2px 5px #ccc;
          overflow: hidden;
          background:url(../assets/images/topBg.png) no-repeat;
          background-color: #fff;
          background-size:100% 40%;
          background-position: 0% 100%;
          position: absolute;
          z-index:10;
          h3{
              font-size: 0.28rem;
              margin-top: 0.3rem;
          }
          .flow{
              font-size: 0.60rem;
              margin: 0.02rem 0;
              font-family: '微软雅黑'!important;
          }
          a{
              display: block;
              color: #e42f46;
              width: 2.02rem;
              border-radius: 0.3rem;
              margin: 0rem auto 0;
              font-size: 0.28rem;
              text-decoration:underline;
          }
      }
      .col-nav{
          width: 100%;
          background-color: #fff;
          margin-top: 1.85rem;
          padding-bottom: 0.25rem;
          ul{
              li{
                  width:1.63rem;
                  height:1.63rem;
                  margin-left:0.2rem;
                  float: left;
                  margin-top: 0.2rem;
                  position: relative;
                  border-radius:0.06rem;
                  a{
                      .column-icon{
                          width: 0.8rem;
                          height:0.8rem;
                          display: block;
                          margin: 0.25rem auto 0;
                      }
                      div{
                          h6{
                              width: 100%;
                              text-align: center;
                              font-size: 0.22rem;
                              color: #333;
                              margin-top: 0.14rem;
                          }
                      }
                  }
              }
              .number{
                  width:0.26rem;
                  height: 0.26rem;
                  line-height:  0.26rem;
                  display: inline-block;
                  background:red;
                  border-radius:50%;
                  color:#fff;
                  text-align:center;
                  font-size:0.18rem;
                  position:absolute;
                  right:0.1rem;
                  top:0.1rem;
              }
              li:nth-child(1) {
                  /*margin-left: 0.7rem;*/
                  background: #f5f3ff;
                  .column-icon{
                      background: url(../assets/images/img_1.png) no-repeat;
                      background-size: 100% 100%;
                  }
              }
              li:nth-child(2) {
                  /*margin-left: 1.2rem;*/
                  background: #e9faf4;
                  .column-icon{
                      background: url(../assets/images/img_2.png) no-repeat;
                      background-size: 100% 100%;
                  }
              }
              li:nth-child(3) {
                  /*margin-left: 1.2rem;*/
                  background: #e7f3f5;
                  .column-icon{
                      background: url(../assets/images/img_3.png) no-repeat;
                      background-size: 100% 100%;
                  }
              }
              li:nth-child(4) {
                  /*margin-left: 0.7rem;*/
                  background: #e9faf4;
                  .column-icon{
                      background: url(../assets/images/img_4.png) no-repeat;
                      background-size: 100% 100%;
                  }
              }
              li:nth-child(5) {
                  /*margin-left: 1.2rem;*/
                  background: #fef8dc;
                  .column-icon{
                      background: url(../assets/images/img_5.png) no-repeat;
                      background-size: 100% 100%;
                  }
              }
              li:nth-child(6) {
                  /*margin-left: 1.2rem;*/
                  background: #fef5f8;
                  .column-icon{
                      background: url(../assets/images/img_6.png) no-repeat;
                      background-size: 100% 100%;
                  }
              }

              li:nth-child(7) {
                  /*margin-left: 1.2rem;*/
                  background: #fef5f6;
                  .column-icon{
                      background: url(../assets/images/img_7.png) no-repeat;
                      background-size: 100% 100%;
                  }
              }
              li:nth-child(8) {
                  /*margin-left: 1.2rem;*/
                  background: #fef8ea;
                    .column-icon{
                        background: url(../assets/images/img_8.png) no-repeat;
                        background-size: 100% 100%;
                }
              }
          }
      }
      .activity-box{
          width: 100%;
          background-color: #fff;
          margin-top: 0.14rem;
          h5{

              color:#444444;
              font-size: 0.28rem;
              padding:0.2rem 0.2rem;;
              span{
                  width:0.05rem;
                  height:0.25rem;;
                  display: inline-block;
                  background: #ff7777;
                  margin-right:0.16rem;
              }
          }
          .activity{
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              padding-bottom: 0.5rem;
              div{
                  height:2rem;
                  margin-bottom: .2rem;
              }
              div:nth-child(1){
                  width: 3.45rem;
                  margin-left: 0.30rem;
                  background: url(../assets/images/footer_1.png) no-repeat;
                  background-size: 100% 100%;
              }
              div:nth-child(2){
                  width: 3.45rem;
                  margin-left: 0.15rem;
                  background: url(../assets/images/footer_2.png) no-repeat;
                  background-size: 100% 100%;
              }
              div:nth-child(5){
                  width: 3.45rem;
                  margin-left: 0.15rem;
                  background: url(../assets/images/address.png) no-repeat;
                  background-size: 100% 100%;
              }
              div:nth-child(4){
                  width: 3.45rem;
                  margin-left: 0.15rem;
                  background: url(https://img02.ruwe.cn/group1/M00/02/E0/ChmdplsjkDWAQMyzAABDUUhfBPY732.png) no-repeat;
                  background-size: 100% 100%;
              }
              div:nth-child(3){

                  width: 3.45rem;
                  margin-left: 0.15rem;
                  background: url(https://img02.ruwe.cn/group1/M00/03/37/ChiijVsjkJWALoe1AABPrObIZnE676.png) no-repeat;
                  background-size: 100% 100%;
              }
          }
      }
  }

</style>
