<template>
    <div>
        <div class="redeemcode">
            <heading :name="name"></heading>
            <header>
                <i class="code-icon"></i>
            </header>
            <section>
                <input type="text" v-model="code" maxlength="8" placeholder="请输入兑换码">
                <div class="exchange_btn" @click="bindCoupon" :class="{active:isActive}">立即兑换</div>
<!--                <div style="margin-top: 2rem;width: 1rem;height: 1rem;float: left" @click="test1"></div>
                <div style="margin-top: 2rem;width: 1rem;height: 1rem;float: right" @click="test2"></div>-->
            </section>
            <!--确认弹窗-->
            <div class="alertmask" v-show="alertmask">
                <div class="alertbox">
                    <div class="logo"></div>
                    <div class="box">
                        <div class="size">
                            {{package_size}}M流量
                        </div>
                        <p>已存入您的[流量账户]</p>
                        <div class="btn" @click="share()">炫耀一下</div>
                        <router-link :to="{ name: 'index'}" >返回首页>> </router-link>
                    </div>
                </div>
            </div>
            <div class="go-share" v-show="isShare">
                <div class="top"></div>
            </div>
            <loading v-show="loading"></loading>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @import '../assets/css/common';
    .redeemcode{
        width: 100%;
        height: 100%;
        position: relative;
        min-height: 10rem;
        left:0;
        top:0;
        background-color: $color-bgc;
        overflow: hidden;
        header{
            width: 100%;
            .code-icon{
                display: block;
                background: url(../assets/images/bg-redeemcode.png) no-repeat;
                width: 3.10rem;
                height:2.75rem;
                background-size: 100% 100%;
                margin-left: 2.38rem;
                margin-top: 0.58rem;
            }
        }
        section{
            input{
                width: 6.3rem;
                height:0.9rem;
                outline: none;
                margin:0.4rem auto 0;
                background-color:$color-white;
                border-radius: 3px;
                border: 1px solid #dddddd;
                text-align: center;
                display: block;
                font-size: 0.30rem;
                -webkit-appearance: none;
            }
            .exchange_btn{
                width: 6.3rem;
                height:0.88rem;
                line-height: 0.88rem;
                text-align: center;
                background-color: $color-red;
                opacity: 0.4;
                margin:0.4rem auto 0;
                color: #ffffff;
                border-radius: 3px;
                font-size: 0.36rem;
                &.active{
                    opacity: 1;
                }
            }

        }
        .alertmask{
            width: 100%;
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 9999;
            background-color: rgba(0,0,0,0.38);
            .alertbox{
                width: 6.06rem;
                height: 4.7rem;
                position: absolute;
                left:50%;
                top:24%;
                margin-left: -3.03rem;
                .logo{
                    width: 100%;
                    height:1.07rem;
                    background: url("../assets/images/code_succ.png") no-repeat;
                    background-size: 100% 100%;
                    position: absolute;
                    z-index: 99;
                }
                .box{
                    width:5rem;
                    height:100%;
                    background-color: $color-white;
                    border-radius: 5px;
                    margin: 0 auto;
                    text-align: center;
                    .size{
                        padding-top: 1.4rem;
                        color: $color-red;
                        font-size: 0.4rem;
                        margin: 0 auto;
                    }
                    p{
                        font-size: 0.28rem;
                        margin-top: 0.2rem;
                        color: $color-font-sec;
                    }
                    .btn{
                        width: 3.5rem;
                        height:0.7rem;
                        text-align: center;
                        line-height: 0.7rem;
                        color: $color-white;
                        font-size: 0.32rem;
                        margin: 0.44rem auto 0;
                        background-color: $color-red;
                        border-radius: 3px;
                    }
                    a{
                        display: block;
                        font-size: 0.28rem;
                        margin-top: 0.5rem;
                        color: #0bc1fe;
                    }
                }

                .btnbox{
                    display: flex;
                    font-size: 0.30rem;
                    line-height: 0.6rem;
                    text-align: center;
                    margin-top: 0.2rem;
                    span{
                        display: block;
                        flex:1;
                        height: 0.54rem;
                    }
                    span:nth-child(1){
                        color: $color-font-sec;
                    }
                    span:nth-child(2){
                        color: $color-font;
                        border-left:1px solid $color-boder;
                    }
                }
            }
        }
        .go-share {
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 9999;
            background-color: rgba(0, 0, 0, 0.78);
        }
        .top {
            width: 3.37rem;
            height: 2.27rem;
            transform: translateX(200px);
            float: right;
            position: absolute;
            right: 0.62rem;
            top: 0.48rem;
            background: url('../assets/images/share/wx-share.png') no-repeat;
            background-size: 100% 100%;
            animation: move 1.2s forwards;
        }
        @keyframes move {
            0% {
                transform: translateY(-200px);
            }
            100% {
                transform: translateY(0px);
            }
        }
    }
</style>
<script>
    import loading from '../components/loading.vue'
    import heading from '../components/heading.vue'
    import {InfiniteScroll, Spinner, Toast, Loadmore} from 'mint-ui'
    export default {
        data (){
            return {
               loading:false,
               name:'流量兑换码',
               isActive:false,
               code:'',
               alertmask:false,
               package_size:'',
               isShare:false
            }
        },
        components:{
            loading,
            heading
        },
        watch:{
            'code':function(){
                this.isActive=this.code.length==8?true:false;
            },
        },
        methods:{
            test1 () {
//                window.location.href = 'https://gprstst.ruwe.cn/icbc_bank/#/index'
                this.$router.push({name : 'signin'})

            },
            test2 () {
//                window.location.href = 'https://gprstst.ruwe.cn/icbc_world_cup/#/index'
                this.$router.push({name : 'worldcupindex'})
            },
            bindCoupon(){
                if(!this.code){
                    return Toast('请输入兑换码');
                }
                if(this.code.length<8){
                    return Toast('请输入正确的兑换码');
                }
                this.loading = true
                this.$http.get('/api/icbc/bind/coupon/batch?code='+this.code)
                .then(function (res) {
                    this.loading = false
                    Toast(res.data.message)
                    if (res.data.status == 0) {
                        this.alertmask = true
                        this.package_size = res.data.data.package_size
                        setTimeout(() =>{
                            this.init()
                        },300)
                    }
                }.bind(this))
                .catch(function (res) {
                    this.loading = false
                }.bind(this))
            },
            share(){
                if(this.isWeiXin()){
                    //微信中
                    this.alertmask = false
                    this.isShare = true
                }else{
                    //app中
                    shareRedeem(this.package_size)
                }
            },
            isWeiXin() {
                var ua = window.navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    return true;
                } else {
                    return false;
                }
            },
            init(){
                let _this = this
                var option =  {
                    title: '我在工商银行免费获得'+_this.package_size+'M流量-全国三网通用', // 分享标题 主标题:我在工商银行免费获得388M全国、三网流量
                    desc: "60万G免费流量，等你来拿！", // 分享描述  副标题: 60万G免费流量，等你来拿
                    link: location.protocol + "//"+location.host+'/api/icbc/redirect?redirect_url='+encodeURIComponent('/icbc_bank/index.html#/share?size='+_this.package_size),
                    imgUrl: 'https://img.ruwe.cn/group1/M00/01/6A/ChmdplmvVrKAMZhBAAAUmMsl6hw743.jpg', // 分享图标
                    success: function () {// 用户确认分享后执行的回调函数
                        _this.isShare = false
                        //alert('分享成功')
                    },
                    cancel: function () {// 用户取消分享后执行的回调函
                        //alert('分享失败')
                    }
                };
                var option2 =  {
                    title: '我在工商银行免费获得'+_this.package_size+'M流量-全国三网通用', // 分享标题 主标题:我在工商银行免费获得388M全国、三网流量
                    desc: "60万G免费流量，等你来拿！", // 分享描述  副标题: 60万G免费流量，等你来拿
                    link: location.protocol + "//"+location.host+'/api/icbc/redirect?redirect_url='+encodeURIComponent('/icbc_bank/index.html#/share?size='+_this.package_size),
                    imgUrl: "https://img.ruwe.cn/group1/M00/01/6A/ChmdplmvVrKAMZhBAAAUmMsl6hw743.jpg", // 分享图标
                    success: function () {// 用户确认分享后执行的回调函数
                        //alert('分享成功')
                        _this.isShare = false
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

        }
    }
</script>
