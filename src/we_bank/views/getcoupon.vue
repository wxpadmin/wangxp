<template>
    <div class="wrap">
        <div class="header">
            <img :src="head_img_url ? head_img_url : 'https://img.ruwe.cn/group1/M00/02/5C/Chmdplpuu56AUW7eAAAih5NviKw078.jpg'" alt="">
            <p class="p-coupon">{{model.name}}<span>赠送了您一张微众有折礼券</span></p>
        </div>
        <div class="content">
            <img :src="model.card_obj.card_min_img"  alt="">
            <div class="con">
                <div class="title">{{model.card_obj.card_title}}</div>
                <div class="price">{{model.card_obj.card_price}}元<span class="line-through">{{model.card_obj.market_price}}元</span></div>
            </div>
        </div>
        <div class="footer-btn" :class="{disabled :false}" v-if="model.my_receive ==0" @click="getBtn('礼券领取成功')">立即领取</div>
        <div class="footer-btn" :class="{disabled : true}" v-if="model.my_receive ==1" @click="showAlert('您已经领取过该礼券')">已领取</div>
        <div class="footer-btn" :class="{disabled : true}" v-if="model.my_receive ==2" @click="showAlert('礼券已被其他好友抢先领取')" >已被领取</div>
        <div class="top-show" v-if="redshow">{{text}}</div>
        <div class="top-show" v-if="show" :class="{disabled : false}">{{text}}</div>
        <router-link to="mycoupon" class="p-footer">
            查看我的有折礼券
        </router-link>
    </div>
</template>
<script>
    export default {
        mounted () {
            document.title = '有折礼券'
            this.uuid = this.$route.query.uuid
            this.getinfo()
            /*0未领取  1 自己领取  2 被别人领取*/
        },
        data () {
            return {
                show : false,
                successed : true,
                uuid : '',
                head_img_url : '',
                model :{card_obj:{}},
                redshow : false
            }
        },
        methods : {
            getBtn (text) {
                this.$axios.post('/api/wzyz/cards/give/receive',{give_id : this.uuid},(res)=>{
                    this.redshow = true
                    this.text = text
                    setTimeout( () =>{
                        this.redshow = false;
                    },2000)
                    this.getinfo()
                },(err)=>{
                    this.show = true
                    this.text = '礼券已被其他好友抢先领取'
                    setTimeout( () =>{
                        this.show = false;
                    },2000)
                    this.getinfo()
                })
            },
            getinfo () {
                this.$axios.get('/api/wzyz/cards/give/get',{give_id : this.uuid},(res)=>{
                    this.model = res
                    this.head_img_url = res.head_img_url
                })
            },
            showAlert(text){
                this.text = text;
                this.show = true;
                setTimeout( () =>{
                    this.show = false;
                },2000)
            }
    }
    }
</script>
<style lang="scss" scoped>
    .wrap{
        width: 100%;
        background-color: #fff;
        .header{
            width: 100%;
            padding:0.28rem 0 0.28rem 0.24rem ;
            img{
                width: 0.68rem;
                border-radius: 50%;
                background-color: red;
                height:0.68rem;
                display: inline-block;
                vertical-align: middle;
            }
            .p-coupon{
                display: inline-block;
                vertical-align: middle;
                margin-left: 0.24rem;
                color: #282828;
                span{
                    color: #db8622;
                    margin-left: 0.15rem;
                }
            }
        }
        .content{
            width: 7.1rem;
            height:2rem;
            background-image: linear-gradient(to right , #ffaa57, #fe5d76);
            margin:0 auto;
            padding: 0.3rem 0 0 0.2rem;
            border-radius: 8px;
            margin-bottom: 0.6rem;
            img{
                width: 1.15rem;
                height:1.15rem;
                background-color: red;
                display: inline-block;
                vertical-align: middle;
                border-radius: 50%;
            }
            .con{
                display: inline-block;
                margin-left: 0.3rem;
                position: absolute;
                padding-top: 0.1rem;
                border-radius: 8px;
                .title{
                    font-size: 0.32rem;
                    max-height: 0.9rem;
                    color: #fff;
                    overflow: hidden;
                    margin-bottom: 0.1rem;
                }
                .price{
                    font-size: 0.36rem;
                    color: #fff;
                }
                .line-through{
                    font-size: 0.26rem;
                    color: #ccc;
                    text-decoration: line-through;
                    vertical-align: text-bottom;
                    margin-left: 0.2rem;
                }
            }
        }
        .footer-btn{
            width: 3.4rem;
            height:0.88rem;
            margin:0 auto;
            border-radius: 44px;
            border:2px solid #eda62c;
            line-height: 0.87rem;
            text-align: center;
            font-size: 0.3rem;
            color: #eda62c;
            &.disabled {
                border:2px solid #c7c7c7;
                color: #c7c7c7;
            }
        }
        .top-show{
            width: 100%;
            height:0.7rem;
            position: fixed;
            top:0;
            background-color: #ff6168;
            font-size: 0.3rem;
            color: #fff;
            line-height:0.7rem;
            text-align: center;
            &.disabled{
                background-color: #ccc;
            }
        }
        .p-footer{
            width: 100%;
            ;display: block;
            font-size: 0.26rem;
            text-align: center;
            margin-top: 0.3rem;
            color:  #557bc7;
        }
    }
</style>
