<template>
    <div class="wrap">
        <div class="shade" v-if="isShow">
            <div class="content">
                <p>有折礼券购买须知</p>
                <p>有折礼券购买成功后不支持退货退款</p>
                <div class="btncss" @click="shadeHide">知道了</div>
            </div>
        </div>
        <img class="header" :src="goodsUrl">
        <div class="product-title">
            <p class="p-left fl">{{goodsName}}</p>
            <div class="fr">
                <p class="p-right">{{salePrice}}元</p>
                <p class="market-price">市场价:{{marketPrice}}元</p>
            </div>
        </div>
        <div class="line"></div>
        <div class="presentation">
            <p class="trademark"><span>品牌介绍</span></p>
            <p ref="pcontent"></p>
        </div>
        <div class="bot-line"></div>
        <div class="buy" @click="buyCoupon">购买</div>
    </div>
</template>
<script>
    export default {
        mounted () {
            this.card_id = this.$route.query.card_id
            this.info()
            let u = navigator.userAgent;
            let isAnd = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            this.isAndroid=isAnd
            var _self = this
            this.$nextTick(function(){

                var top =  $('.buy')[0].offsetTop
                $(window).on("resize",function(){
                    var nowTop = $('.buy')[0].offsetTop
                    if(nowTop < top && nowTop != 0){
                        _self.logoShow = false
                    }else{
                        _self.logoShow = true

                    }
                });
            })
        },
        data () {
            return {
                card_id : '',
                goodsName : '',
                salePrice : '',
                marketPrice : '',
                goodsDesc : '',
                goodsUrl : '',
                ajaxLock : true,
                isShow : false
            }
        },
        methods : {
            info () {
                this.$axios.get('/api/stable/cards/cards/item', {card_id : this.card_id},(res)=>{
                    this.goodsName = res.goodsName
                    document.title = this.goodsName
                    this.salePrice = res.salePrice
                    this.marketPrice = res.marketPrice
                    this.goodsDesc = res.goodsDesc
                    this.$refs.pcontent.innerHTML = this.goodsDesc
                    try {
                        this.goodsUrl = JSON.parse(res.goodsPicUrl).goodsUrl
                    }catch (err) {
                        console.log(err)
                    }
                })
            },
            async shadeHide () {
                this.isShow = false
                if (!this.ajaxLock){
                    return
                }
                this.ajaxLock = false
                await this.$axios.post('/api/wzyz/cards/create/blessing/order',{card_id : this.card_id},(res)=>{
                    console.log(res)
                },(err)=>{
                    this.ajaxLock = true
                    let urlcode = decodeURIComponent(err.data.payUrl)
                    window.location.href = urlcode
                    //window.location.replace(urlcode)
                })
            },
            async buyCoupon () {
                if (!window.localStorage.getItem('Login')) {
                    console.log('iddidididdi')
                    window.localStorage.setItem('Login','login')
                    this.isShow = true
                }else {
                    this.isShow = false
                    if (!this.ajaxLock){
                        return
                    }
                    this.ajaxLock = false
                    this.$axios.post('/api/wzyz/cards/create/blessing/order',{card_id : this.card_id},(res)=>{
                        console.log(res)
                    },(err)=>{
                        this.ajaxLock = true
                        let urlcode = decodeURIComponent(err.data.payUrl)
                        window.location.href = urlcode
                        //window.location.replace(urlcode)
                    })
                }
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .wrap{
        width: 100%;
        background-color: #fff;
        /*overflow-y: scroll;*/
        overflow:auto;
        // -webkit-overflow-scrolling:touch;
        .shade{
            width: 100%;
            height:100%;
            background-color: rgba(0,0,0,0.8);
            position: fixed;
            z-index:10000;
            .content{
                position: absolute;
                top:4.38rem;
                left: 0;
                right:0;
                margin:0 auto;
                width: 6rem;
                height:3.9rem;
                background-color: rgb(255,255,255);
                border-radius: 0.16rem;
                padding-top: 0.68rem;
                text-align: center;
                p:nth-of-type(1){
                    font-size: 0.32rem;
                    color: rgb(39,39,39);
                    font-weight: 700;
                }
                p:nth-of-type(2){
                    font-size: 0.3rem;
                    color: rgb(153,153,153);
                    margin: 0.32rem auto 0.8rem;
                }
                .btncss{
                    width: 5.22rem;
                    height:0.88rem;
                    text-align: center;
                    line-height: 0.88rem;
                    margin:0 auto;
                    background-color: rgb(249,192,92);
                    color: rgb(255,255,255);
                    font-size: 0.32rem;
                    border-radius: 0.44rem;
                }
            }
        }
        .header{
            width: 100%;
            height:2.3rem;
            /*background-color: red;*/
            margin-bottom: 0.5rem;

        }
        .product-title{
            width: 100%;
            height: 1.8rem;
            padding: 0 0.4rem;
        }
        .fr{
            text-align: right;
            p:nth-of-type(1){
                font-size: 0.32rem;
                color: #ff3942;
            }
            p:nth-of-type(2){
                font-size: 0.24rem;
                color: #777;
                margin-top: 0.3rem;
                text-decoration: line-through;
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
            p:nth-of-type(2){
                font-size: 0.26rem;
                color: #272727;
            }
        }
        .bot-line{
            width: 100%;
            height: 0.5rem;
            background-color: #f7f7f7;
        }
        .buy{
            width: 100%;
            height:1rem;
            position: fixed;
            bottom:0;
            background-color: #f9c05c;
            line-height: 1rem;
            text-align: center;
            font-size: 0.32rem;
            color: #fffefe;
        }
    }
</style>
<style type="text/css">
    pre{
        white-space: pre-wrap;
        word-wrap: break-word;
    }
    h2{
        font-weight: normal;
    }
    img{
        max-width: 100%;
    }
</style>
