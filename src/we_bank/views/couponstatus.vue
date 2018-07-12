<template>
    <div class="wrap">
        <img class="header" :src="resdata.card_hd_img">
        <div class="product-title">
            <p class="p-left">{{resdata.card_title}}</p>
            <div class="coupon" v-if = "couponpswshow">
                <p>券码:</p>
                <p id="copycoupon">
                    {{coupon[0]}}
                    <!--<span v-if="resdata.card_status == 5 && resdata.is_gain == 0" class="shade">&lt;!&ndash;浮层&ndash;&gt;
                        <span v-if="coupon[0]">生成券码中，请稍后再试</span>
                    </span>-->
                    <span v-if="flag" class="shade"><!--浮层-->
                        <span v-if="coupon[0] || (resdata.card_status == 6 && resdata.is_gain == 1)">生成券码中，请稍后再试</span>
                    </span>
                </p>
                <span  v-if="!flag" class="copy" @click="copyCoupon">复制</span>
            </div>
            <div class="password" v-if = "coupon[1]">
                <p>券密:</p>
                <p id="copypassword">
                    {{coupon[1]}}
                    <!--<span v-if="resdata.card_status == 5 && resdata.is_gain == 0" class="shade">
                        <span v-if="coupon[1]">生成券码中，请稍后再试</span>
                    </span>-->
                    <span v-if="flag && coupon[1]" class="shade">
                        <span v-if="coupon[1]">生成券码中，请稍后再试</span>
                    </span>
                </p>
                <span v-if="!flag" class="copy" @click="copyPassword">复制</span>
            </div>
            <div class="code_url" v-if = "resdata.code_url">
                <p>链接:</p>
                <p id="code_url" :href="resdata.code_url">
                    <a :href="resdata.code_url">{{resdata.code_url}}</a>
                    <!--<span v-if="resdata.card_status == 5 && resdata.is_gain == 0" class="shade">
                        <span v-if="coupon[1]">生成券码中，请稍后再试</span>
                    </span>-->
                    <span v-if="flag && resdata.code_url" class="shade">
                        <span v-if="resdata.code_url">生成券码中，请稍后再试</span>
                    </span>
                </p>
                <span v-if="!flag" class="copy" @click="copyCodeUrl">复制</span>
            </div>
            <div class="icon-right" :class="iconPic" v-if="picFlag"></div>
        </div>
        <!--<div class="btn" v-if="resdata.is_gain<1">
            <div class="left-btn fl" @click="togiveCoupon">转赠</div>
            <div class="right-btn fr" @click="gain">领取</div>
        </div>-->
        <div class="btn" v-if="(resdata.card_status == 5 && resdata.is_gain == 0) || (resdata.card_status == 6 &&resdata.is_gain == 0)">
            <div class="right-btn fl" @click="gain">获取</div>
            <!-- <div class="left-btn fr" @click="togiveCoupon(resdata)">转赠</div> -->
        </div>
        <div class="line"></div>
        <div class="time">
            <p>礼券使用有效期:</p>
            <p>{{resdata.end_time | filter_dateformat}}</p>
        </div>
        <div class="line"></div>
        <div class="presentation">
            <p class="trademark"><span>品牌介绍</span></p>
            <p class="pwidth100" ref="phtml"></p>
        </div>
    </div>
</template>
<script>
    export default {
        /*var text = document.getElementById("copycoupon");
         if (document.body.createTextRange) {
         var range = document.body.createTextRange();
         range.moveToElementText(text);
         range.select();
         } else if (window.getSelection) {
         var selection = window.getSelection();
         var range = document.createRange();
         range.selectNodeContents(text);
         selection.removeAllRanges();
         selection.addRange(range);
         this.$Toast.show('复制成功')
         } else {
         }
         document.execCommand('Copy','false',null);*/
        mounted () {
            this.pageType = this.$route.query.pageType
            this.id = this.$route.query.id
            if (this.pageType == 2) {  //领取
                let params = {
                    id : this.id
                }
                this.getList(params)
            }else  {
                let params = {
                    id : this.id
                }
                this.getList(params)
            }
        },
        data () {
            return {
                resdata : {},
                flag : true,  // 控制浮层及复制按钮、右侧状态图片的显隐 true 为显示
                btnflag : true,   // 控制领取/转赠按钮的显隐,
                coupon : '',
                password : '',
                iconPic : '',    //  卡券状态图片
                pageType : '',
                id : '',
                picFlag : false,
                spanFlag : false,
                couponpswshow :false   // 券码字段显示
            }
        },
        methods : {
            gain(){
                this.$axios.get('/api/wzyz/card/gain',{id : this.id},(res)=>{
                   this.getList({id : this.id})
                })
            },
            getList (params) {
                this.$axios.get('/api/wzyz/cards/card_info',params,(res) => {
                    this.resdata = res
                    document.title = res.card_title
                    this.$refs.phtml.innerHTML =res.card_content
                    this.coupon = res.code?res.code.split(','):[]
                    if (res.card_status == 4 ) {
                        this.flag = true
                        this.picFlag = true
                        this.iconPic = 'giving'
                        this.spanFlag = false
                        this.couponpswshow = true
                    }else if (res.card_status == 5 && res.is_gain==0) {
                        this.flag = true
                        this.couponpswshow = true
                        this.picFlag = false
                        this.spanFlag = false
                    }else if (res.card_status == 6) {
                        this.flag = true
                        this.picFlag = false
                        this.spanFlag = true
                        this.couponpswshow = true
                    }else if (res.card_status == 5 && res.is_gain==1) {
                        this.flag = false
                        this.couponpswshow = true
                        this.picFlag = true
                        this.iconPic = 'success'
                        this.spanFlag = false
                    }
                })
            },
            togiveCoupon (resdata) {
                this.$router.push({name : 'givecoupon',query : {card_title :resdata.card_title,id: resdata.id,card_min_img : resdata.card_min_img }})
            },
            /*copyCoupon () {
                var aux = document.createElement("input");
                aux.setAttribute('value',this.coupon);
                document.body.appendChild(aux);
                aux.select();
                var content = window.getSelection().toString();
                document.execCommand("copy");
                document.body.removeChild(aux);
                this.$Toast.show('复制成功')
            },*/
            copyCodeUrl () {
                var text = document.getElementById("code_url");
                if (document.body.createTextRange) {
                    var range = document.body.createTextRange();
                    range.moveToElementText(text);
                    range.select();
                } else if (window.getSelection) {
                    var selection = window.getSelection();
                    var range = document.createRange();
                    range.selectNodeContents(text);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    this.$Toast.show('复制成功')
                } else {
                }
                document.execCommand('Copy');
            },
            copyCoupon () {
                var text = document.getElementById("copycoupon");
                if (document.body.createTextRange) {
                    var range = document.body.createTextRange();
                    range.moveToElementText(text);
                    range.select();
                } else if (window.getSelection) {
                    var selection = window.getSelection();
                    var range = document.createRange();
                    range.selectNodeContents(text);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    this.$Toast.show('复制成功')
                } else {
                }
                document.execCommand('Copy');
            },
            copyPassword() {
                var text = document.getElementById("copypassword");
                if (document.body.createTextRange) {
                    var range = document.body.createTextRange();
                    range.moveToElementText(text);
                    range.select();
                } else if (window.getSelection) {
                    var selection = window.getSelection();
                    var range = document.createRange();
                    range.selectNodeContents(text);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    this.$Toast.show('复制成功')
                } else {
                }
                document.execCommand('Copy');
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/css" scoped>
    .wrap{
        width: 100%;
        background-color: #fff;
        overflow-y: auto;
        .header{
            width: 100%;
            height:2.3rem;
            background-color: red;
            margin-bottom: 0.5rem;
        }
        .time{
            padding: 0.2rem 0.4rem;
            color: #777;
            font-size: 0.26rem;
            p{
                display: inline-block;
                height:0.4rem;
                line-height:0.4rem;
            }
            p:nth-of-type(2){
                margin-left: 0.2rem;
                background-color: #f7f7f7;
                padding: 0 0.1rem;
            }
        }
        .product-title{
            width: 100%;
            //height: 1.8rem;
            padding: 0 0.4rem 0.2rem;
            font-size: 0.32rem;
            color: #272727;
            position: relative;
            .icon-right{
                width: 1.15rem;
                height:1.05rem;
                position: absolute;
                top:50%;
                margin-top: -0.52rem;
                right:0.3rem;
                background-size: 100% 100%;
                &.success{
                    background-image: url("../assets/images/get.png");
                }
                /*&.expire{
                    background-image: url("../assets/images/expire.png");
                }*/
                &.giving{
                    background-image: url("../assets/images/giving.png");
                }
            }
            .coupon{
                margin-top: 0.2rem;
                p{
                    display: inline-block;
                    font-size: 0.26rem;
                    color: #777;
                    vertical-align: middle;
                }
                .copy{
                    font-size: 0.26rem;
                    color: #557bc7;
                    margin-left: 0.25rem;
                }
                p:nth-of-type(2){
                    text-align: center;
                    line-height: 0.4rem;
                    margin-left: 0.2rem;
                    min-width: 3.35rem;
                    height: 0.4rem;
                    position: relative;
                    padding: 0 0.1rem;
                    border-radius: 3px;
                    background-color: #f7f7f7;
                    .shade{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top:0;
                        left:0;
                        background-color: #b8b8b8;
                        border-radius: 3px;
                    }
                }
            }
            .code_url{
                margin-top: 0.2rem;
                p{
                    display: inline-block;
                    font-size: 0.26rem;
                    color: #777;
                    vertical-align: middle;
                }
                .copy{
                    font-size: 0.26rem;
                    color: #557bc7;
                    margin-left: 0.25rem;
                }
                p:nth-of-type(2){
                    text-align: center;
                    line-height:0.4rem;
                    margin-left: 0.2rem;
                    min-width: 3.35rem;
                    height: 0.4rem;
                    position: relative;
                    padding: 0 0.1rem;
                    border-radius: 3px;
                    background-color: #f7f7f7;
                    a{
                        display: inline-block;
                        font-size: 0.26rem;
                        color: #148fb6;
                        vertical-align: middle;
                    }
                    .shade{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top:0;
                        left:0;
                        background-color: #b8b8b8;
                        border-radius: 3px;
                        line-height: 0.4rem;
                    }
                }
            }
            .password{
                margin-top: 0.2rem;
                p{
                    display: inline-block;
                    font-size: 0.26rem;
                    color: #777;
                    vertical-align: middle;
                }
                .copy{
                    font-size: 0.26rem;
                    color: #557bc7;
                    margin-left: 0.25rem;
                }
                p:nth-of-type(2){
                    text-align: center;
                    line-height:0.4rem;
                    margin-left: 0.2rem;
                    min-width: 3.35rem;
                    height: 0.4rem;
                    position: relative;
                    padding: 0 0.1rem;
                    border-radius: 3px;
                    background-color: #f7f7f7;
                    .shade{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top:0;
                        left:0;
                        background-color: #b8b8b8;
                        border-radius: 3px;
                        line-height: 0.4rem;
                    }
                }
            }
        }
        .btn{
            width: 100%;
            height:0.6rem;
            padding: 0 0.4rem;
            margin-bottom: 0.35rem;
            div{
                width: 3.2rem;
                height:0.6rem;
                border-radius: 8px;
                text-align: center;
                font-size: 0.28rem;
                line-height: 0.6rem;
            }
            .left-btn{
                border: 2px solid #eda62c;
                color: #eda62c;
            }
            .right-btn{
                background-color:#eda62c;
                color: #fff;
                margin-left: 0.85rem;
            }
        }

        .line{
            width: 100%;
            height:0.2rem;
            background-color: #f7f7f7;
        }
        .presentation{
            width: 100%;
            padding: 0.3rem 0.4rem 0.48rem;
            .trademark{
                width: 1.55rem;
                height:0.45rem;
                background-color: #272727;
                border-radius: 6px;
                transform:skewX(-10deg);
                -ms-transform:skewX(-10deg); 	/* IE 9 */
                -moz-transform:skewX(-10deg); 	/* Firefox */
                -webkit-transform:skewX(-10deg); /* Safari 和 Chrome */
                -o-transform:skewX(-10deg);
                color: #fff;
                font-size: 0.28rem;
                line-height: 0.45rem;
                text-align: center;
                margin-bottom: 0.25rem;
                span{
                    display: block;
                    transform:skewX(10deg);
                    -ms-transform:skewX(10deg); 	/* IE 9 */
                    -moz-transform:skewX(10deg); 	/* Firefox */
                    -webkit-transform:skewX(10deg); /* Safari 和 Chrome */
                    -o-transform:skewX(10deg);
                }
            }
           /* p:nth-of-type(2){
                font-size: 0.26rem;
                color: #272727;
            }*/
        }

    }
</style>
<style type="text/css">
    pre{
        white-space: pre-wrap;
        word-wrap: break-word;
    }
</style>

