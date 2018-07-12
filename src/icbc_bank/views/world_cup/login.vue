<template>
    <div class="wrap">
        <pop-up-single
                :title1="title1"
                :content1="content1"
                :sure-text1="sureText1"
                :showpopupsingle="showpopupsingle"
                @popup-show-single="popshowSingle"
                @sure-btn-single="surebtnSingle"
        >
            <div slot="header" class="noamend">
                如不是自己绑定请联系客服
            </div>
            <div slot="footer" class="noamend">
                400-879-6969
            </div>
        </pop-up-single>
        <heading :name="name" v-if="!isWeiXin()"></heading>
        <div class="content">
            <div class="title">
                手机验证
            </div>
            <p class="ptext">为方便账户流量在APP的正常使用，请与您在"工银e生活"APP内登录/注册的手机号保持一致</p>
            <div class="phoneNumber">
                <p class="area_code">+86</p>
                <input class="phone" maxlength="13" type="tel" placeholder="请输入绑定领奖手机号" @input="phonechange" v-model="phone_number" v-if="!isphone">
                <input class="phone" maxlength="13" type="tel"  :placeholder="isphone" disabled v-else>
            </div>
            <p class="pred" v-if="isphone">手机号已绑定</p>
            <div class="verification" v-if="!isphone">
                <p class="verification_code">验证码</p>
                <input class="code" type="tel" placeholder="请输入短信验证码" v-model="code" maxlength="6" @input="codeChange">
                <div class="getCode" :class="{'greycode' : !isCode,'redcode' : isCode}" v-if="timer==0" @click="getCode">
                    获取验证码
                </div>
                <div class="getCode greycode" v-else>
                    {{timer}}s
                </div>
            </div>
            <div class="btn" :class="{'greybtn' : !isBtnClick,'redbtn' : isBtnClick}" @click="btnSubmit">
                登录
            </div>
        </div>
        <div class="footer">
            <p>由[若为口粮]提供短信验证服务</p>
            <p>由北京若为信息技术有限公司提供技术支持，如有疑问，请咨询客服：400-879-6969 。</p>
        </div>
    </div>
</template>
<script>
    import heading from "../../components/heading.vue"
    import popUpSingle from "../../components/popUpSingle.vue"
    export default {
        mounted () {
            this.getphone()
        },
        data () {
            return {
                title1 : '温馨提示',
                sureText1 : '知道了',
                content1 : '',
                showpopupsingle : false,
                name : "爱享世界杯",
                phone_number : '',
                code : '',
                isBtnClick : false,
                isCode : false,
                timer : 0,
                ajaxLock : true,
                isphone : ''
            }
        },
        methods : {
            getphone () {
                this.$axios.get('/api/worldcup/lottery/endTime',{},(res)=>{
                    this.isphone = res['phone_number'].replace(/(\d{3})(\d{4})(\d{4})/,'$1 $2 $3')
                })
            },
            isWeiXin () {
                var ua = window.navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    return true;
                } else {
                    return false;
                }
            },
            phonechange () {
                //验证是否为手机号
//                var phonereg = /^[1][3,4,5,7,8][0-9]{9}$/;
                var phonereg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
                // 手机号后加空格
                if (this.phone_number.length == 4) {
                    if (this.phone_number.substring(3, 4) != ' ') {
                        this.phone_number = this.phone_number.substring(0, 3) + ' ' + this.phone_number.substring(3, 4);
                    } else {
                        this.phone_number = this.phone_number.substring(0, 3);
                    }
                }
                if (this.phone_number.length == 9) {
                    if (this.phone_number.substring(8, 9) != ' ') {
                        this.phone_number = this.phone_number.substring(0, 8) + ' ' + this.phone_number.substring(8, 9);
                    } else {
                        this.phone_number = this.phone_number.substring(0, 8);
                    }
                }
                if (this.phone_number.length == 13) {
                    if (this.code.length == 6) {
                        this.ajaxLock = true
                        this.isBtnClick = true
                    }
                    if (!phonereg.test(this.phone_number.replace(/\s+/g, ""))) {
                        this.$Toast.show('请输入正确的手机号')
                        this.isCode = false
                        this.isBtnClick = false
                        return
                    }else {
                        this.isCode = true
                    }
                }else {
                    this.isBtnClick = false
                    this.isCode = false
                }
            },
            getCode () {
                if (this.isCode) {
                    this.$axios.post('/api/sms/get_sms_code',{phone_number : this.phone_number.replace(/\s+/g, "")},(res)=>{
                        this.$Toast.show('短信验证码已发送')
                        this.setCaptchaTimer()
                    },(err)=>{
                        this.$Toast.show(err.message)
                    })
                }else {
                    return
                }
            },
            codeChange () {
                var phonereg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
                if (phonereg.test(this.phone_number.replace(/\s+/g, "")) && this.code.length == 6 && this.phone_number.length == 13) {
                    this.ajaxLock = true
                    this.isBtnClick = true
                }else {
                    this.isBtnClick = false
                }
            },
            async btnSubmit () {
                if (this.ajaxLock) {
                    this.ajaxLock = false
                    this.$axios.get('/api/icbc/wx/bind/phone_number',{phone_number : this.phone_number.replace(/\s+/g, ""), code : this.code},(res)=>{
                        this.$Toast.show(res.message)
                        this.ajaxLock = true
                        this.$router.push({name : 'index'})
                    },(err)=>{
                        if (err.status == 1 ) {
                            this.$Toast.show(err.message)
                            this.isBtnClick = false
                        }else {
                            this.showpopupsingle = true
                            this.content1 = '该手机号已绑定其他账户请更换手机'
                        }
                    })
                }
            },
            setCaptchaTimer () {
                this.timer = 60
                var t = setInterval(()=>{
                    this.timer --
                    if(this.timer == 0 ){
                        window.clearInterval(t)
                    }
                },1000)
            },
            popshowSingle () {
              this.showpopupsingle = false
            },
            surebtnSingle () {
                this.showpopupsingle = false
            }

        },
        components : {
            heading,
            popUpSingle
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .wrap{
        width: 100%;
        background-color: #fff;
        position: relative;
        .noamend{
            font-size: .28rem;
            color: #333333;
            letter-spacing: 0;
            line-height: .3rem;
            margin-top: .2rem;
            text-align: center;
        }
        .content{
            width: 100%;
            /*padding: 0 0.7rem;*/
            box-sizing: border-box;
            padding-left: .7rem;
            .title{
                color: #333333;
                font-size: .46rem;
                letter-spacing: -1.5px;
                margin:.2rem 0;
            }
            .ptext{
                width: 4.65rem;
                font-size: .24rem;
                color: #666666;
                margin-bottom: .3rem;
            }
            .pred{
                font-size: .24rem;
                color: red;
                margin-top: .2rem;
            }
            .phoneNumber{
                width: 6.2rem;
                height:.88rem;
                .area_code{
                    float: left;
                    display: inline-block;
                    line-height: .88rem;
                    font-size: .24rem;
                    color: #333333;
                    letter-spacing: -0.78px;
                    width: 1.19rem;
                    text-align: center;
                    background: #F2F2F2;
                    border-radius: 9px 0 0 9px;
                    border-right: 1px solid #ddd;
                }
                .phone{
                    width: 4.83rem;
                    line-height: 0.3rem;
                    height:0.88rem;
                    float: left;
                    display: inline-block;
                    background: #F2F2F2;
                    text-indent: .5rem;
                    border-radius: 0 9px 9px 0;
                }
            }
            .verification{
                height:.88rem;
                margin-top:.4rem;
                .verification_code{
                    float: left;
                    display: inline-block;
                    line-height: .88rem;
                    font-size: .24rem;
                    color: #333333;
                    letter-spacing: -0.78px;
                    width: 1.19rem;
                    text-align: center;
                    background: #F2F2F2;
                    border-radius: 9px 0 0 9px;
                    border-right: 1px solid #ddd;
                }
                .code{
                    width: 2.8rem;
                    line-height: 0.3rem;
                    height:0.88rem;
                    float: left;
                    display: inline-block;
                    background: #F2F2F2;
                    text-indent: .5rem;
                    border-radius: 0 9px 9px 0;
                }
                input::-webkit-input-placeholder{
                    font-size: .24rem;
                    color: #BBBBBB;
                    letter-spacing: -0.78px;
                }
            }
            .getCode{
                width: 2rem;
                height:.88rem;
                border-radius: 9px;
                font-size: .32rem;
                color: #FFFFFF;
                letter-spacing: -1.04px;
                text-align: center;
                line-height: .88rem;
                float: left;
                display: inline-block;
                margin-left: .1rem;
            }
            .greycode {
                background: #D5D5D5;
            }
            .redcode {
                background: #E42F46;
            }
            .btn{
                margin-top: .6rem;
                width: 6.2rem;
                height:.88rem;
                text-align: center;
                line-height: .88rem;
                border-radius: 9px;
                font-size: .32rem;
                color: #FFFFFF;
                letter-spacing: -1.04px;
            }
            .greybtn{
                background: #D5D5D5;
            }
            .redbtn{
                background: #E42F46;
            }
            input::-webkit-input-placeholder{
                font-size: .24rem;
                color: #BBBBBB;
                letter-spacing: -0.78px;
            }
        }
        .footer{
            width: 6.5rem;
            height:1.85rem;
            color: #999;
            font-size: .24rem;
            letter-spacing: 0.02px;
            line-height: .4rem;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            margin: 0 auto;
            text-align: center;
        }
    }
</style>
