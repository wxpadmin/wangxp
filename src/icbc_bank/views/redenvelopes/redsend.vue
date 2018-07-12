`<template>
    <div class="red_send">
        <heading :name="'发红包'"></heading>
        <div class="user_score">用户余额：{{score}}M</div>

        <div class="red_count">
            <div class="left">红包个数</div>
            <div class="center">
                <input type="tel" placeholder="1-100" v-model="quantity"  maxlength="3">
            </div>
            <div class="right">个</div>
        </div>
        <div class="red_type" v-if="isOrdinary">当前为普通红包，<span @click="change">改为拼手气红包</span></div>
        <div class="red_type" v-if="!isOrdinary">当前为拼手气红包，<span @click="change">改为普通红包</span></div>
        <div class="red_count" >
            <div class="left" v-if="isOrdinary">单个流量</div>
            <div class="left" v-if="!isOrdinary">总流量</div>
            <div class="center">
                <input v-if="isOrdinary" type="tel" placeholder="" v-model="amount"  maxlength="5">
                <input v-if="!isOrdinary" type="tel" placeholder="10以上" v-model="amount"  maxlength="5">
            </div>
            <div class="right">M</div>
        </div>
        <div class="red_tips">
            <div class="left">留言：</div>
            <div class="right">
                <textarea placeholder="恭喜发财" v-model="blessing" @click="blessing=='恭喜发财'?blessing='':blessing=blessing" maxlength="50"></textarea>
            </div>
        </div>
        <div class="red_freeze">{{sum}}M</div>
        <div class="red_btn" :class="{active:isSend}" @click="send">立即发红包</div>
        <!--确认弹窗-->
        <div class="alertmask" v-show="alertmask">
            <div class="alertbox">
                <div class="order">
                    流量余额不足，是否去购买？
                </div>
                <div class="btnbox">
                    <span @click="alertmask=false">取消</span>
                    <span @click="goBuyflow()">去购买</span>
                </div>
            </div>
        </div>
        <!--分享弹窗-->
        <div class="share" v-if="isShare">
            <!--<div class="share_top" :class="{active:isShare}"></div>-->
            <!--<div class="share_text" :class="{active:isShare}"></div>-->
            <div class="con">
                <a href="javascript:;" class="close_box" @click="closeShare">
                    <p class="close" ></p>
                </a>
                <img class="head" :src="red_img_logo?red_img_logo:red_open_logo">
                <div class="red_title">流量红包已包好</div>
                <div class="red_text">立即发给好友吧!</div>
                <div class="send" @click="share"></div>
            </div>
        </div>
        <loading v-show="loading"></loading>
    </div>
</template>
<script>
    import loading from '../../components/loading'
    import heading from '../../components/heading'
    import {Toast} from 'mint-ui'
    export default {
        mounted(){
            this.getUseInfo()
        },
        data (){
            return {
               loading:false,
               score:0,
               phone_number:'',
               alertmask:false,
               isOrdinary:false,
               type:1,
               blessing:'恭喜发财',//标语
               amount:'', //流量
               quantity:'', //红包个数
               isSend:false,
               sum:0,
               isShare:false,
               info:{
                    content:'',
                    order_id:''
               },
               red_open_logo: require('../../assets/images/head_logo.png'),
                red_img_logo:''
            }
        },
        components:{
            loading,
            heading
        },
        methods:{
            getUseInfo(){
               this.loading = true
               this.$http.get('/api/icbc/user/info')
               .then(function (res) {
                 this.loading = false
                 console.log('---------user/info---------')
                  if (res.data.status == 0) {
                     this.score = res.data.data.score
                     this.phone_number = res.data.data.phone_number
                      this.red_img_logo = res.data.data.head_img_url
                  }
               }.bind(this))
               .catch(function (err) {
                   this.loading = false
               }.bind(this))
            },
            change(){
                this.isOrdinary = !this.isOrdinary
                //普通红包
                if(this.isOrdinary){
                    this.type = 0
                    if(this.amount.length == 0){
                        this.sum = 0
                        this.isSend = false
                        return this.amount = ''
                    }
                    if(!parseInt(this.amount)){
                        this.sum = 0
                        this.isSend = false
                        return this.amount = '';
                    }
                    if(this.quantity.length == 0){
                        this.sum = 0
                        this.isSend = false
                        return this.quantity = ''
                    }
                    if(!parseInt(this.quantity)){
                        this.sum = 0
                        this.isSend = false
                        return this.quantity = '';
                    }
                    this.sum = parseInt(this.amount)*parseInt(this.quantity)
                }else{
                    //拼手气
                    this.type = 1
                    if(this.amount.length == 0){
                        this.sum = 0
                        this.isSend = false
                        return this.amount = ''
                    }
                    if(!parseInt(this.amount)){
                        this.sum = 0
                        this.isSend = false
                        return this.amount = '';
                    }
                    if(this.quantity.length == 0){
                        this.sum = 0
                        this.isSend = false
                        return this.quantity = ''
                    }
                    if(!parseInt(this.quantity)){
                        this.sum = 0
                        this.isSend = false
                        return this.quantity = '';
                    }
                    this.sum = parseInt(this.amount)
                }
            },

            send (){
                if(!this.isSend){
                    return
                }
                if( this.quantity*this.amount<10){
                    return Toast('总流量不能小于10M');
                }

                if(this.type==1){
                    if( this.amount>5000){
                        return Toast('总流量不能大于5000M');
                    }
                    if(this.quantity>parseInt(this.amount)&&this.quantity<100){
                        return Toast('红包个数不能大于'+parseInt(this.amount)+'个');
                    }

                }else if(this.type==0){
                    if( this.quantity*this.amount>5000){
                        return Toast('总流量不能大于5000M');
                    }
                }
                if(this.quantity>100){
                    return Toast('红包总个数不能大于100个');
                }

                if(this.sum>this.score){
                    this.loading = false
                    this.alertmask = true
                    return
                }
                //创建红包
                this.loading = true
                this.$http.post('/api/icbc/redpacket/create',{
                   type: this.type,
                   quantity: this.quantity,
                   amount: this.amount,
                   blessing: this.blessing
                }).then(function (res) {
                    this.loading = false;
                    console.log('---------/api/icbc/redpacket/create---------');
                    if(res.data.status == 0){
                        this.info.content = this.blessing
                        this.info.order_id = res.data.data
                        this.info.amount = this.amount
                        console.log(this.info.content)
                        console.log(this.info.order_id)
                        //分享红包显示
                        this.isShare = true
                        console.log('http://'+window.location.host+'/api/icbc/redirect?redirect_url='+encodeURIComponent('/icbc_bank/index.html#/redopen?id='+this.info.order_id))
                    }else{
                         Toast(res.data.message)
                    }
                }.bind(this))
                .catch(function (err) {
                    this.loading = false

                }.bind(this))

            },
            share(){
                shareRed(this.info)
            },
            goBuyflow(){
                this.$router.push({ path: 'buyflow', query: {
                    score:this.score
                }})
            },
            closeShare(){
                let that = this
                Toast('红包已包好，可在“已发出记录”中继续发送或24小时后退回')
                that.$router.push({ path: 'redindex'})
            }
        },
        watch:{
            'amount': function(){
                if(this.amount.length == 0){
                    this.sum = 0
                    this.isSend = false
                    return this.amount = ''
                }
                 if(!parseInt(this.amount)){
                    this.sum = 0
                    this.isSend = false
                    return this.amount = '';
                }
                this.amount = parseInt(this.amount)
                if(this.amount&&this.quantity){
                    this.isSend = true
                    if(this.type == 0){
                        this.sum = parseInt(this.amount)*parseInt(this.quantity)
                    }else if(this.type == 1){
                        this.sum = parseInt(this.amount)
                    }
                }else{
                    this.sum = 0
                    this.isSend = false
                }
            },
            'quantity':  function(){
                if(this.quantity.length == 0){
                    this.sum = 0
                    this.isSend = false
                    return this.quantity = ''
                }
                if(!parseInt(this.quantity)){
                    this.sum = 0
                    this.isSend = false
                    return this.quantity = '';
                }

                this.quantity = parseInt(this.quantity)
                if(this.amount&&this.quantity){
                    this.isSend = true
                    if(this.type == 0){
                        this.sum = parseInt(this.amount)*parseInt(this.quantity)
                    }else if(this.type == 1){
                        this.sum = parseInt(this.amount)
                    }
                }else{
                    this.sum = 0
                    this.isSend = false
                }
            }
        }

    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../../assets/css/common';
    .red_send{
        .alertmask{
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 9999;
            background-color: rgba(0,0,0,0.38);
            .alertbox{
                width: 5.4rem;
                height: 3rem;
                position: absolute;
                left:50%;
                top:50%;
                margin-left: -2.7rem;
                margin-top: -1.5rem;
                background-color: $color-white;
                color: $color-font;
                border-radius: 0.1rem;
                font-size: 0.32rem;
                .order{
                    width:100%;
                    height: 2rem;
                    line-height: 2rem;
                    text-align: center;
                    border-bottom: 1px solid $color-border;
                    margin: 0 auto;
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
                        color: $color-red;
                        border-left:1px solid $color-boder;
                    }
                }
            }
        }
        .user_score{
            text-align: center;
            font-size: 0.28rem;
            color: #333333;
            line-height: 1rem;
        }
        .red_count{
            background: white;
            height: 1rem;
            margin: 0 0.3rem;
            border-radius: 3px;
            display:flex;
            .left{
                font-size: 0.28rem;
                line-height: 1rem;
                color: #333333;
                margin-left: 0.3rem;

            }
            .center{
                flex:1;
                margin-right: 0.2rem;

                input{
                    width: 100%;
                    display: block;
                    height: 1rem;
                    font-size: 0.28rem;
                    text-align: right;

                }
            }
            .right{
                font-size: 0.28rem;
                line-height: 1rem;
                color: #333333;
                margin-right: 0.3rem;
            }
            &red_count:nth-child(2){
                transform: translateX(-100%);
            }

        }
        .red_type{
            height: 0.66rem;
            color: #333333;
            font-size: 0.24rem;
            margin-left: 0.3rem;
            line-height: 0.66rem;
            span{
                color: $color-red;
            }
        }
        .red_tips{
            background: white;
            height: 1.28rem;
            margin: 0 0.3rem;
            margin-top: 0.3rem;
            border-radius: 3px;

            display:flex;
            font-size: 0.28rem;
            color: #333333;
            .left{
                margin: 0.2rem 0.1rem 0 0.3rem;
            }
            .right{
                flex: 1;
                margin-right:0.2rem;
                margin-top:0.2rem;
                textarea{
                    font-size: 0.28rem;
                    color: #999999;
                    border: none;
                    width: 100%;
                    height: 0.88rem;

                }

            }

        }
        .red_freeze{
            font-size: 0.6rem;
            line-height: 1.66rem;
            text-align: center;
            color: #333333;
        }
        .red_btn{
            width: 85%;
            background: #e64358;
            margin: 0 auto;
            font-size: 0.36rem;
            color: white;
            line-height: 1rem;
            border-radius: 3px;
            text-align: center;
            opacity: 0.4;
            &.active{
                opacity: 1;
            }
        }
        .share{
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 9999;
            background-color: rgba(0,0,0,0.38);
            .share_top{
                width:1.06rem;
                height:1.22rem;
                transform: translateX(200px);
                float: right;
                position: absolute;
                right: 1.10rem;
                top: 1.60rem;
                background: url("../../assets/images/red/share_top.png") no-repeat;
                background-size: 100% 100%;
                &.active{
                    animation:move 1.2s forwards;
                    @keyframes move {
                        0% {
                            transform: translateX(-200px);
                        }
                        100% {
                            transform: translateX(0px);
                        }
                    }

                }
            }
            .share_text{
                width:6.38rem;
                height:1.12rem;
                margin: 3.5rem auto 0;
                background: url("../../assets/images/red/share_text.png") no-repeat;
                background-size: 100% 100%;
                opacity: 0;
                &.active{
                    animation:opacity 1.2s forwards 0.6s;
                    @keyframes opacity {
                        0% {
                            opacity: 0;
                        }
                        100% {
                            opacity: 1;
                        }
                    }

                }
            }
            .con{
                margin: 1.88rem auto;
                width: 77.6%;
                height: 8.8rem;
                background-image: url('../../assets/images/red/red_open_bg.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                position:relative;
                overflow:hidden;
                .close_box{
                    display: block;
                    position:absolute;
                    right: 0rem;
                    top:0rem;
                    width:0.8rem;
                    height:0.8rem;
                    .close{
                        width: 0.23rem;
                        height: 0.23rem;
                        background: url("../../assets/images/red/bg-close-btn.png")no-repeat;
                        background-size: 100% 100%;
                        margin-top: 0.3rem;
                        margin-left: 0.2rem;
                    }
                }
                .head{
                    width: 1rem;
                    height: 1rem;
                    position:absolute;
                    top:0.75rem;
                    left:50%;
                    margin-left: -0.5rem;
                    border-radius: 3px;
                }
                .red_title{
                    width: 85%;
                    font-size: 0.32rem;
                    color: #ffe2b1;
                    text-align: center;
                    margin: 2.5rem auto 0;
                }
                .red_text{
                    font-size: 0.32rem;
                    color: #ffe2b1;
                    text-align: center;
                    padding: 0px 0.5rem;
                    margin-top: 0.4rem;
                }
                .send{
                    height: 2rem;
                    width: 2rem;
                    position: absolute;
                    bottom:1.9rem;
                    left:50%;
                    margin-left: -1rem;
                    background:url('../../assets/images/red/red_send_share.png') no-repeat;
                    background-size: 100% 100%;
                    animation: send_scale 4s infinite;
                    @keyframes send_scale {
                        0% {
                            transform: scale(1,1);

                        }
                        50% {
                            transform: scale(1.1,1.1);

                        }
                        100% {
                            transform: scale(1,1);

                        }
                    }
                }

            }
        }

    }
</style>
