<template>
    <div class="wrap">
        <div class="header">
            <p class="send-gift">您的礼券礼物已包好，立即发送给好友</p>
            <div class="coupon-gift">
                <img :src="card_min_img">
                <p>{{card_title}}</p>
            </div>
        </div>
        <input type="text" maxlength="100" class="title" placeholder="小小心意，请别嫌弃~" v-model="blessing">
        <div class="send" @click="shadeShow">
            发送
        </div>
        <p class="send-back">
            24小时未被领取，自动退回您的礼券账户
        </p>
        <div v-if="shade" class="shade">
            <div></div>
        </div>
    </div>
</template>
<script>
    export default {
        beforeRouteEnter (to, from, next) {
            window.scrollTo(0,0)
            next()
        },
        mounted () {
            this.card_title = this.$route.query.card_title
            this.id = this.$route.query.id
            this.card_min_img = this.$route.query.card_min_img
            document.title = '转赠'
        },
        data () {
            return {
                shade : false,
                blessing : '',
                id: '',
                card_title :'',
                uuid : '',
                card_min_img : ''
            }
        },
        methods : {
            shadeShow () {
                this.blessing = this.blessing == '' ? '小小心意，请别嫌弃~' : this.blessing
                this.$axios.post('/api/wzyz/cards/give/pack',{id : this.id,blessing : this.blessing},(res,ctx)=>{
                    this.uuid = ctx.data
                    this.shade = true
                    if (this.uuid) {
                        this.share()
                    }
                })
            },
            share () {
                var info = {
                    title: '送你一张微众有折礼券，超好用！',
                    desc: this.blessing ? this.blessing : '小小心意，请别嫌弃~',
                    link: '/api/wzyz/cards/give/redirect?uuid=' + this.uuid,
                    imgUrl: 'https://img.ruwe.cn/group1/M00/02/5B/Chmdplpq9MeAcX6RAAAH1xPFnCk647.png'
                };
                _Wx.share(info,()=>{
                    this.$Toast.show('分享成功')
                    setTimeout(()=>{
                        window.history.go(-1)
                    },2000)
                })
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .wrap{
        width: 100%;
        background-color: #fff;
        .header{
            width: 100%;
            height:3.6rem;
            background-image: url("../assets/images/givecoupon.png");
            background-size: 100% 100%;
            padding-top: 0.6rem;
            margin-bottom: 0.22rem;
            .send-gift{
                font-size: 0.28rem;
                color: #272727;
                margin:0 0 0.32rem 0.44rem;
            }
            .coupon-gift{
                width: 7.1rem;
                height:2rem;
                background-image: linear-gradient(to right , #ffaa57, #fe5d76);
                margin:0 auto;
                padding: 0.3rem 0 0 0.2rem;
                border-radius: 8px;
                img{
                    width: 1.15rem;
                    height:1.15rem;
                    display: inline-block;
                    vertical-align: middle;
                    border-radius: 0.08rem;
                }
                p{
                    display: inline-block;
                    margin-left: 0.32rem;
                    font-size: 0.32rem;
                    color: #fff;
                }
            }
        }
        .title{
            width: 6.9rem;
            height:0.88rem;
            text-align: center;
            /*line-height:1rem;*/
            padding: 0.3rem 0;
            font-size: 0.28rem;
            color: #c7c7c7;
            background-color: #f2f2f2;
            margin:0 auto 0.6rem;
            display: block;
            box-sizing: border-box;
            border: 1px solid #dbdbdb;
            border-radius: 2px;
        }
        input::-webkit-input-placeholder{
            color: #c7c7c7;
        }
        .send{
            width: 6.9rem;
            height:1rem;
            text-align: center;
            line-height: 1rem;
            color: #fff;
            font-size: 0.32rem;
            background-color: #f9c05c;
            margin:0 auto 0.25rem;
            border-radius: 0.49rem;
        }
        .send-back{
            text-align: center;
            font-size: 0.26rem;
            color: #777;
        }
        .shade{
            width: 100%;
            height:100%;
            position: absolute;
            top: 0;
            left:0;
            background-color: rgba(0,0,0,0.7);
            z-index: 999;
            div{
                width: 4.78rem;
                height:3.72rem;
                background-image: url("../assets/images/share.png");
                background-size: 100% 100%;
                position: absolute;
                top:0;
                right:0;
            }
        }
    }
</style>
