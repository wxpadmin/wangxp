<template>
    <div>
        <div class="bindPhone">
            <heading :name="'爱享流量'"></heading>
            <div class="bindPhone-info-box">
                <p class="bindPhone-info">为方便账户流量在APP的正常使用,</p>
                <p class="bindPhone-info">请与您在“工银e生活”APP内登陆／注册的手机号保持一致。</p>
            </div>
            <input type="tel" v-model="phone_number" maxlength="11" placeholder="请输入手机号码">
            <div class="bindPhone-btn" @click="maskShow()" :class="{active:isActive}">确定</div>
            <div class="alertmask" v-show="alertmask">
                <div class="alertbox">
                    <div class="tit">温馨提示</div>
                    <div class="box">
                        <div class="phone">已输入手机号码：<span>{{phone_number}}</span></div>
                        <p style="margin-top: 0.4rem">如果输入手机号码与您在[工银e生活]</p>
                        <p>APP内登录/注册手机号码不一致</p>
                        <p>将影响流量使用</p>
                    </div>
                    <div class="btnbox">
                        <span @click="maskHide()">重新输入</span>
                        <span @click="bindPhone()">确认</span>
                    </div>
                </div>
            </div>
            <loading v-show="loading"></loading>
        </div>


    </div>
</template>

<script>
    import loading from '../components/loading.vue'
    import heading from '../components/heading.vue'
    import {Toast} from 'mint-ui'
    export default {
        components: {
            loading,
            heading
        },
        mounted() {

        },
        data() {
            return {
                phone_number:'',
                isActive:false,
                loading:false,
                alertmask:false
            }
        },
        methods: {
            maskShow(){
                if(!this.phone_number){
                    return Toast('手机号码不能为空');
                }
                if(this.phone_number.length<11){
                    return Toast('请输入正确的手机号码');
                }
                if (this.phone_number.length == 11) {
                    let myreg = /^((13[4-9])|(147)|(15[0-2,7-9])|(178)|(18[2-4,7-8]))+\d{8}$/
                    let myreg1 = /^((13[0-2])|(145)|(15[5-6])|(17[5-6])|(18[5-6]))+\d{8}$/
                    let myreg2 = /^((133)|(149)|(153)|(17[3,7])|(18[0-1,9]))+\d{8}$/
                    //let myreg3 = /^(17[0-2])+\d{8}$/
                    if (!myreg.test(this.phone_number) && !myreg1.test(this.phone_number) && !myreg2.test(this.phone_number)) {

                        return Toast('请输入正确的手机号码');
                    }
                }
                this.alertmask = true

            },
            maskHide(){
                this.alertmask = false
                this.phone_number = ''
            },
            bindPhone(){
                this.loading = true
                this.$http.get('/api/icbc/wx/bind/phone_number?phone_number='+this.phone_number)
                    .then(function (res) {
                        this.loading = false
                        Toast(res.data.message)
                        if (res.data.status == 0) {
                            setTimeout(() =>{
                                this.$router.push({ path: 'index'})
                            },1000)
                        }
                    }.bind(this))
                    .catch(function (res) {
                        this.loading = false
                    }.bind(this))
            },
        },
        watch:{
            'phone_number':function(){
                this.isActive=this.phone_number.length==11?true:false;
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import '../assets/css/common';
    .bindPhone{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        .bindPhone-info-box{
            margin-top: 1rem;
            .bindPhone-info{
                color: #333333;
                font-size: 0.24rem;
                width: 100%;
                text-align: center;
                line-height: 0.5rem;
            }
        }
        .alertmask{
            width: 100%;
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 99;
            background-color: rgba(0,0,0,0.38);
            .alertbox{
                width: 6.06rem;
                height: 5.3rem;
                position: absolute;
                left:50%;
                top:24%;
                margin-left: -3.03rem;
                color: #333333;
                background-color: #ffffff;
                border-radius: 4px;
                text-align: center;
                overflow: hidden;
                .tit{
                    width: 100%;
                    height: 1.1rem;
                    line-height: 1.1rem;
                    font-size: 0.46rem;
                    color: #fff;
                    background-color: $color-red;;
                }
                .box{
                    width: 100%;
                    margin-top: 0.5rem;
                    text-align: center;
                    .phone{
                        font-size: 0.3rem;
                        span{
                            font-size: 0.46rem;
                            color: $color-red;
                        }
                    }
                    p{
                        width: 95%;
                        margin: 0.1rem auto 0;
                        font-size: 0.28rem;
                        color: #999;
                    }
                }

                .btnbox{
                    display: flex;
                    font-size: 0.34rem;
                    line-height: 1rem;
                    text-align: center;
                    margin-top: 0.3rem;
                    border-top:1px solid $color-boder;
                    span{
                        display: block;
                        flex:1;
                        height: 1rem;
                    }
                    span:nth-child(1){
                        color: $color-font-sec;
                    }
                    span:nth-child(2){
                        color: $color-red;
                        border-left:1px solid $color-boder;
                    }
                }
            }
        }
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
        .bindPhone-btn{
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
</style>
