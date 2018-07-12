<template>
    <div>
        <div class="red_reveive" v-show="is_red_reveive">
            <heading :name="'红包'"></heading>
            <div class="receivelist_head">
                <div class="receive_bg"></div>
                <div class="receive_icon">
                    <img :src="head_img_url?head_img_url:red_img_logo">
                </div>
                <h6 class="send_name">{{ objData | filter_real_name }}的红包</h6>
                <p class="send_content">{{blessing}}</p>
                <div v-if="isEnd == 0">
                    <p class="send_size">{{amount}}M</p>
                    <p class="send_prompt">已存到您的流量账户，随存随取哦</p>
                </div>
                <div v-else-if="isEnd == 1">
                    <p class="red_info">好可惜，红包已过期</p>
                </div>
                <div v-else-if="isEnd == 3">
                    <p class="red_info">好可惜，红包已被抢光了</p>
                </div>
            </div>
            <p class="receive_total">已领取红包{{quantityRemain}}/{{quantityTotal}}个，{{amountRemain}}M/{{amountTotal}}M流量</p>
            <div class="det">
                <ul>
                    <li class="clearfix" v-for="item in scoreList">
                        <div class="receive_logo">
                            <img :src="item.head_img_url?item.head_img_url:red_img_logo">
                        </div>
                        <div class="receive_con">
                            <p class="tel">{{item | filter_real_name}}</p>
                            <p class="time">{{item.create_time}}</p>
                        </div>
                        <div class="receive_flownum">
                            +{{item.amount}}M
                        </div>
                    </li>
                    <nomore v-if="noMore" ></nomore>
                </ul>
                <div class="mark" @click="tipsStatus=1">
                    <img :src="red_img_mark">
                    <span>红包细则</span>
                </div>
            </div>
            <div class="tips_bottom clearfix">
                <div class="app_logo">
                    <img :src="app_logo">
                </div>
                <div class="app_tit">
                    工银e生活
                </div>
                <div class="go_app_btn">
                    <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.icbc.elife">使用流量</a>
                </div>
            </div>
        </div>
        <div class="tips" v-if="tipsStatus==1">
            <div class="tips_bg"></div>
            <div class="tips_con">
                <div class="red_close"  @click="tipsStatus=0"></div>
                <div class="scolle">
                    <div class="title">
                        <div class="left"></div>
                        <div class="center">红包细则</div>
                        <div class="right"></div>
                    </div>
                    <div class="text">
                        <div class="item">1.红包领取成功后，流量存入您的流量账户内，使用您输入的手机号登录“工银e生活”APP，进入流量银行进行使用。
                        </div>
                        <div class="item">2流量为全国三网流量，电信、移动、联通用户都可使用。</div>
                        <div class="item">3.流量可以给好友发红包，可以给好友充流量，可以参与抽大奖。</div>
                        <div>4.流量获取来源：<br>
                            （1）好友发放的流量红包，<br>（2）工商银行举办的其他流量活动。
                        </div>
                        <div class="item">5.如发现客户有恶意作弊等行为，工银e生活有权处理客户流量账户内的流量并取消流量相关活动资格。
                        </div>
                        <div class="item">6.最终解释权归工商银行所有。</div>
                    </div>
                </div>

            </div>

        </div>
        <loading v-show="loading"></loading>
        <div class="red_bind_phone" v-show="is_red_bind_phone">
            <heading :name="'工行红包'"></heading>
            <div class="header">
                <img :src="head_img_url?head_img_url:red_img_logo">
            </div>
            <div class="con">
                <div class="name">{{ objData | filter_real_name }}</div>
                <div class="text">给您发红包了</div>
                <input maxlength="11" placeholder="请输入领取手机号" v-model="phone_number" type="tel">
                <div class="get-btn" @click="getReceive()" :class="{active:isActive}">立即领取</div>
                <div class="mark" @click="tipsStatus=1">
                    <img :src="red_img_mark">
                    <span>红包细则</span>
                </div>
            </div>
            <div class="tips" v-if="tipsStatus==1">
                <div class="tips_bg"></div>
                <div class="tips_con">
                    <div class="red_close"  @click="tipsStatus=0"></div>
                    <div class="scolle">
                        <div class="title">
                            <div class="left"></div>
                            <div class="center">红包细则</div>
                            <div class="right"></div>
                        </div>
                        <div class="text">
                            <div class="item">1.红包领取成功后，流量存入您的流量账户内，使用您输入的手机号登录“工银e生活”APP，进入流量银行进行使用。
                            </div>
                            <div class="item">2流量为全国三网流量，电信、移动、联通用户都可使用。</div>
                            <div class="item">3.流量可以给好友发红包，可以给好友充流量，可以参与抽大奖。</div>
                            <div>4.流量获取来源：<br>
                                （1）好友发放的流量红包，<br>（2）工商银行举办的其他流量活动。
                            </div>
                            <div class="item">5.如发现客户有恶意作弊等行为，工银e生活有权处理客户流量账户内的流量并取消流量相关活动资格。
                            </div>
                            <div class="item">6.最终解释权归工商银行所有。</div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>
<script>
    import {InfiniteScroll, Spinner, Toast, Loadmore} from 'mint-ui';
    import loading from '../../components/loading.vue'
    import heading from '../../components/heading.vue'
    import loadinglist from '../../components/loadinglist'
    import nomore from '../../components/nomore'
    export default {
        mounted(){
            this.id = this.$route.query.id
            this.getRedInfo()

        },
        data (){
            return {
               loading:false,
               noMore:false,
               scoreList:[],
               tipsStatus:false,
               is_red_bind_phone:true,
               is_red_reveive:false,
               isActive:false,
               phone_number:'',
               id:'',
               objData:{},
               amount:'',
               blessing:'',
               amountTotal:'',
               amountRemain:'',
               quantityTotal:'',
               quantityRemain:'',
               red_img_logo: require('../../assets/images/head_logo.png'),
               head_img_url:'',
               red_img_mark: require('../../assets/images/red/mark.png'),
               app_logo: require('../../assets/images/red/app_logo.png'),
               isEnd:'',
            }
        },
        methods:{
           getCookie(name){
                var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
                if(arr != null) return unescape(arr[2]); return '';
           },
           setCookie(name, value, option){
               var str = name + '=' + escape(value);
               if (option) {
                   if (option.expireHours) {
                        var d = new Date();
                        d.setTime(d.getTime() + option.expireHours * 3600 * 1000);
                        str += '; expires=' + d.toGMTString();
                   }
                    if (option.path) str += '; path=' + option.path;
                    else str += '; path=/';
                    if (option.domain) str += '; domain=' + option.domain;
                    if (option.secure) str += '; true';
               }
               document.cookie = str;
           },
           getRedorBind(){
                //var phone_number = this.$route.query.phone_number||this.getCookie('tel');
                console.log(this.phone_number);
                if(this.phone_number && this.objData.my_receive) {
                    this.is_red_bind_phone = false
                    this.is_red_reveive = true
                }else if(this.phone_number && !this.objData.my_receive){
                    this.is_red_bind_phone = false
                    this.is_red_reveive = true
                    this.getReceive()
                }
           },
           getReceive(){
               let _this = this
               this.loading = true
               this.$http.get('/api/icbc/redpacket/receive',{
                   params: {
                        id: this.id,
                        phone_number:this.phone_number
                   }
               })
               .then(function (res) {
                 this.loading = false
                 console.log('---------/api/icbc/redpacket/receive---------')
                  if (res.data.status == 0) {
                      this.is_red_bind_phone = false
                      this.is_red_reveive = true
                      //this.amount = res.data.data.amount
                      this.setCookie('tel',this.phone_number,{path:'/',expireHours:24*30})
                      this.getRedInfo()
                      Toast(res.data.data.message)
                  }else{
                      Toast(res.data.message)
                  }
               }.bind(this))
               .catch(function (err) {
                   this.loading = false
               }.bind(this))
           },
           getRedInfo(){
               this.loading = true
               this.$http.get('/api/icbc/redpacket/get',{
                   params: {
                        id: this.id
                   }
               })
               .then(function (res) {
                 this.loading = false
                 console.log('---------/api/icbc/redpacket/get---------')
                  if (res.data.status == 0) {
                     var amountScores = 0;
                     for(let item of res.data.data.receives){
                        amountScores += item.amount
                     }
                     this.phone_number = res.data.data.my_phone_number
                     this.objData = res.data.data
                     this.head_img_url = res.data.data.head_img_url
                     this.blessing = res.data.data.blessing
                     this.amountTotal = res.data.data.amount
                     this.amountRemain = amountScores
                     this.quantityTotal = res.data.data.quantity
                     this.quantityRemain = res.data.data.receives.length
                     this.scoreList = res.data.data.receives
                     this.isEnd = res.data.data.status
                     if(res.data.data.my_receive){
                        this.amount = res.data.data.my_receive.amount
                     }
                     if(res.data.data.remain.quantity == 0){
                        if(res.data.data.my_receive){
                            this.isEnd = 0
                        }else{
                            this.isEnd = 3
                        }
                     }
                      setTimeout(() =>{
                          this.init()
                      },300)
                      this.getRedorBind()
                  }else{
                      Toast(res.data.message)
                  }
               }.bind(this))
               .catch(function (err) {
                   this.loading = false
               }.bind(this))
            },
            init(){
                let _this = this
                var option =  {
                    title: '工行爱享生活，红包能拆出流量？能，快来拆', // 分享标题 主标题:工行爱享生活，红包能拆出流量？能，快来拆
                    desc: _this.blessing, // 分享描述  副标题: 恭喜发财
                    link: location.protocol + "//"+location.host+'/api/icbc/redirect?redirect_url='+encodeURIComponent('/icbc_bank/index.html#/redopen?id='+_this.id),
                    imgUrl: 'http://img.ruwe.cn/group1/M00/01/66/ChmdpllxZeOAO1mkAAAkqTYMnEI691.jpg', // 分享图标
                    success: function () {// 用户确认分享后执行的回调函数
                        //alert('分享成功')
                    },
                    cancel: function () {// 用户取消分享后执行的回调函
                        //alert('分享失败')
                    }
                };
                var option2 =  {
                    title: '工行爱享生活，红包能拆出流量？能，快来拆', // 分享标题 主标题:工行爱享生活，红包能拆出流量？能，快来拆
                    desc:  _this.blessing, // 分享描述  副标题: 恭喜发财
                    link: location.protocol + "//"+location.host+'/api/icbc/redirect?redirect_url='+encodeURIComponent('/icbc_bank/index.html#/redopen?id='+_this.id),
                    imgUrl: "http://img.ruwe.cn/group1/M00/01/66/ChmdpllxZeOAO1mkAAAkqTYMnEI691.jpg", // 分享图标
                    success: function () {// 用户确认分享后执行的回调函数
                        //alert('分享成功')

                    },
                    cancel: function () {// 用户取消分享后执行的回调函
                        //alert('分享失败')
                    }
                };
                if(wx.index_init_status){
                    wx.onMenuShareTimeline(option);
                    wx.onMenuShareAppMessage(option2);
                }else{
                    wx.ready(function(){
                        setTimeout(function () {
                            wx.onMenuShareTimeline(option);
                            wx.onMenuShareAppMessage(option2);
                        },300);
                    })

                }
            }
        },
        watch:{
            'phone_number':function(){
                this.isActive=this.phone_number.length==11?true:false;
                let phone = this.phone_number
                if (phone.length == 11) {
                    let myreg = /^((13[4-9])|(147)|(15[0-2,7-9])|(178)|(18[2-4,7-8]))+\d{8}$/
                    let myreg1 = /^((13[0-2])|(145)|(15[5-6])|(17[5-6])|(18[5-6]))+\d{8}$/
                    let myreg2 = /^((133)|(149)|(153)|(17[3,7])|(18[0-1,9]))+\d{8}$/
                    let myreg3 = /^(17[0-1])+\d{8}$/
                    if (!myreg.test(phone) && !myreg1.test(phone) && !myreg2.test(phone) &&!myreg3.test(phone)) {
                        Toast('请输入正确的手机号码')
                        this.phone_number = ''
                        this.isActive = false
                    }
                }
            }
        },
        components:{
            loading,
            heading,
            loadinglist,
            nomore
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../../assets/css/common';
    .red_reveive{
        width: 100%;
        position: relative;
        left:0;
        top:0;
            .receivelist_head{
                color: $color-font;
                text-align: center;
                padding-bottom: 0.2rem;
                background-color: $color-white;
                height: 4.88rem;
                .receive_bg{
                    width: 100%;
                    height: 2.82rem;
                    background: url(../../assets/images/red/receivelist_head.png);
                    background-size: 100% 100%;
                }
                .receive_icon{
                    width: 1.12rem;
                    height: 1.12rem;
                    border-radius: 5px;
                    position:absolute;
                    left:50%;
                    top:1.8rem;
                    margin-left: -0.6rem;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                        display: block;
                    }
                }
                .send_name{
                    font-size: 0.3rem;
                    margin-top: -0.4rem;
                    font-weight: bold;
                }
                .send_content{
                    font-size: 0.24rem;
                    margin-top: 0.2rem;
                }
                .send_size{
                    font-size: 0.74rem;
                    font-weight: bold;
                }
                .send_prompt{
                    font-size: 0.24rem;
                    color: $color-font-sec;
                }
                .red_info{
                    font-size: 0.36rem;
                    color: #b6b6b6;
                    text-align: center;
                    margin-top: 0.7rem;
                }
            }
            .receive_total{
                height:0.6rem;
                line-height:0.6rem;
                font-size: 0.24rem;
                color: $color-font-sec;
                padding-left: 0.3rem;
            }
            .det{
                padding-bottom: 0.3rem;
                width: 100%;
                flex: 1;
                overflow: hidden;
                background-color: $color-white !important;
                ul{
                    width: 100%;
                    min-height: 3.4rem;
                    overflow-y: auto;
                    -webkit-overflow-scrolling: touch;
                    li{
                        width: 100%;
                        height: 1.1rem;
                        border-bottom: 1px solid $color-border;
                        .receive_logo{
                            width: 0.7rem;
                            height: 0.7rem;
                            border-radius: 5px;
                            overflow: hidden;
                            float: left;
                            margin-top: 0.2rem;
                            margin-left: 0.3rem;
                            img{
                                width: 100%;
                                display: block;
                            }
                        }
                        .receive_con{
                            margin-left: 0.3rem;
                            float: left;
                            .tel{
                                margin-top: 0.2rem;
                                font-size: 0.28rem;
                                color: $color-font;
                            }
                            .time{
                                margin-top: 0.02rem;
                                font-size: 0.22rem;
                                color: $color-font-sec;
                            }
                        }
                        .receive_flownum{
                            float: right;
                            line-height: 1.1rem;
                            color: #28ac3e;
                            font-size: 0.3rem;
                            margin-right: 0.3rem;
                        }
                    }
                }
            }
            .mark{
                text-align: center;
                font-size: 0.28rem;
                color: #445893;
                margin-top: .3rem;
                padding-bottom: 1.4rem;
                img{
                    display: inline-block;
                    position: relative;
                    height: 0.28rem;
                    top:0.03rem
                }
            }
            .tips_bottom{
                position: fixed;
                left:0;
                bottom: 0;
                width: 100%;
                height:1.3rem;
                background-color: $color-font-sec;
                .app_logo{
                    float: left;
                    margin-left: 0.5rem;
                    margin-top: 0.2rem;
                    width: 0.9rem;
                    height: 0.9rem;
                    img{
                        width: 100%;
                        display: block;
                    }
                }
                .app_tit{
                    float: left;
                    margin-top: 0.36rem;
                    margin-left: 0.4rem;
                    font-size: 0.32rem;
                    color: $color-white;
                }
                .go_app_btn{
                    width: 2.36rem;
                    height:0.8rem;
                    border: 2px solid $color-white;
                    line-height: 0.8rem;
                    font-size: 0.36rem;
                    text-align: center;
                    float: right;
                    margin-right: 0.5rem;
                    margin-top: 0.22rem;
                    border-radius: 5px;
                    a{
                        color: $color-white;
                    }
                }
            }
    }
    .tips_con{
        position: fixed;
        background: white;
        border-radius: 0.05rem;
        width: 80%;
        margin-left: 10%;
        top:2rem;
        bottom:1rem;
        border-radius: 10px;
        .red_close{
            background-image: url(../../assets/images/red/red_close.png);
            background-size: 100% 100%;
            width: 0.56rem;
            height: 0.56rem;
            position: absolute;
            right: -0.28rem;
            top: -0.28rem;
        }
        .scolle{
            height:90%;
            overflow-y:auto;
            padding-bottom:0.5rem;
            -webkit-overflow-scrolling: touch;
            .title{
                text-align: center;
                font-size: 0.36rem;
                line-height: 0.36rem;
                color: #333333;
                display: flex;
                margin:0 0.6rem;

                .left{
                    flex: 1;
                    height: 0px;
                    border-bottom: 1px solid #333333;
                    margin-top: 0.6rem;
                }
                .center{
                    margin: 0.43rem 0.36rem 0 0.36rem;

                }
                .right{
                    flex: 1;
                    height: 0px;
                    border-bottom: 1px solid #333333;
                    margin-top: 0.6rem;
                }
            }
            .text{
                font-size: 0.28rem;
                color: #333333;
                margin: 0.23rem 0.4rem 0.41rem 0.4rem;
                line-height:0.54rem;
                height:100%;
                .item{
                    margin-bottom: 0.08rem;
                }

            }
        }

    }
    .tips_bg{
        position: fixed;
        width: 100%;
        height: 100%;
        background: #000000;
        opacity: 0.4;
        left:0;
        top:0;
    }

    .red_bind_phone{
        .header{
            background-image: url(../../assets/images/red/red_head_phone.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            height: 3.05rem;
            position: relative;
            img{
                width: 1.2rem;
                height: 1.2rem;
                position: absolute;
                left: 50%;
                bottom: 0;
                margin-left: -0.6rem;
                border-radius: 5px;
            }
        }
        .con{
            height: 3rem;
            width: 84%;
            margin: 0 auto;
            text-align:center;

            .name{
                margin-top: 0.5rem;
                font-size: 0.44rem ;
                color: #333333;
                line-height:0.44rem;

            }
            .text{
                font-size: 0.3rem;
                margin-top: 0.3rem;
                color: #333333;
                line-height:0.3rem;
            }
            input{
                height: 0.88rem;
                width: 100%;
                text-align: center;
                font-size: 0.36rem;
                color: #333333;
                background-color:$color-white;
                border-radius: 3px;
                border: 1px solid #dddddd;

            }
            .get-btn{
                background: #e42f46;
                color: white;
                height: 0.88rem;
                font-size: 0.36rem;
                line-height: 0.88rem;
                margin-top: 0.4rem;
                opacity:0.4;
                border-radius: 5px;
                &.active{
                    opacity:1;
                }
            }
        }
        .mark{
            font-size: 0.28rem;
            color: #445893;
            line-height:0.28rem;
            margin-top:0.4rem;
            img{
                display: inline-block;
                position: relative;
                height: 0.28rem;
                top:0.03rem
            }
        }

        .tips_con{
            position: fixed;
            background: white;
            border-radius: 0.05rem;
            width: 80%;
            margin-left: 10%;
            top:2rem;
            bottom:1rem;
            border-radius: 10px;
            .red_close{
                background-image: url(../../assets/images/red/red_close.png);
                background-size: 100% 100%;
                width: 0.56rem;
                height: 0.56rem;
                position: absolute;
                right: -0.28rem;
                top: -0.28rem;
            }
            .scolle{
                height:90%;
                overflow-y:auto;
                padding-bottom:0.5rem;
                .title{
                    text-align: center;
                    font-size: 0.36rem;
                    line-height: 0.36rem;
                    color: #333333;
                    display: flex;
                    margin:0 0.6rem;

                    .left{
                        flex: 1;
                        height: 0px;
                        border-bottom: 1px solid #333333;
                        margin-top: 0.6rem;
                    }
                    .center{
                        margin: 0.43rem 0.36rem 0 0.36rem;

                    }
                    .right{
                        flex: 1;
                        height: 0px;
                        border-bottom: 1px solid #333333;
                        margin-top: 0.6rem;
                    }
                }
                .text{
                    font-size: 0.28rem;
                    color: #333333;
                    margin: 0.23rem 0.4rem 0.41rem 0.4rem;
                    line-height:0.54rem;
                    height:100%;
                    .item{
                        margin-bottom: 0.08rem;
                    }

                }
            }

        }
        .tips_bg{
            position: fixed;
            width: 100%;
            height: 100%;
            background: #000000;
            opacity: 0.4;
            left:0;
            top:0;
        }


    }

</style>
