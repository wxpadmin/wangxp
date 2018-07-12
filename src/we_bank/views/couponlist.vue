<template>
    <div class="wrap">
        <ul>
            <li v-for="item in list">
                <router-link :to="{name : 'buycoupon' , query : {card_id : item.id}}">
                    <img :src="JSON.parse(item.goodsPicUrl).logoUrl ? JSON.parse(item.goodsPicUrl).logoUrl : 'https://img.ruwe.cn/group1/M00/02/67/ChiijVpVzi-AIWwsAAAWioIBQW0241.jpg'">
                    <div class="content">
                        <div class="title">{{item.goodsName}}</div>
                        <div class="price">{{item.salePrice}}元<span class="line-through">{{item.marketPrice}}元</span></div>
                    </div>
                    <div class="btn">立即购买</div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        beforeRouteEnter (to, from, next) {
            window.scrollTo(0,0)
            next()
        },
        mounted () {
            this.category_id = this.$route.query.id
            this.name = this.$route.query.name
            document.title = this.$route.query.name
            this.info()
        },
        data () {
            return {
                category_id : '',
                list : [],
                name : ''
            }
        },
        methods : {
            info () {
                this.$axios.get('/api/stable/cards/cards/list',{category_id : this.category_id},(res)=> {
                    /*for(var i in res.list)
                    {
                        try {
                            res.list[i].goodsPicUrl = JSON.parse(res.list[i].goodsPicUrl)
                          /!*  if (res.list[i].goodsPicUrl.goodsUrl) {
                                res.list[i].goodsPicUrl = {"goodsUrl":"","logoUrl":"https://img.ruwe.cn/group1/M00/02/67/ChiijVpVzi-AIWwsAAAWioIBQW0241.jpg"}
                            }*!/
                        }catch (err){
                            console.log(err)
                            res.list[i].goodsPicUrl = {"goodsUrl":"","logoUrl":"https://img.ruwe.cn/group1/M00/02/67/ChiijVpVzi-AIWwsAAAWioIBQW0241.jpg"}
                        }
                    }*/
                    this.list = res.list
                    console.log(this.list)
                })
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .wrap{
        width: 100%;
        color : #fff;
        padding: 0.2rem 0.2rem 0;
        ul{
            a{
                width: 100%;
                height:100%;
                display: block;
            }
            li{
                position: relative;
                width: 100%;
                height:2.1rem;
                background-image: linear-gradient(to right, #ffaa57, #fe5d76);
                padding: 0.3rem 0 0 0.2rem;
                border-radius:8px;
                margin-bottom: 0.3rem;

                img{
                    width: 1.15rem;
                    height:1.15rem;
                    border-radius: 50%;
                    display: inline-block;
                }
                .content{
                    display: inline-block;
                    margin-left: 0.3rem;
                    position: absolute;
                    .title{
                        width: 5.4rem;
                        overflow: hidden;
                        text-overflow : ellipsis;
                        font-size: 0.32rem;
                        max-height: 0.9rem;
                        color: #fff;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    .price{
                        font-size: 0.36rem;
                        color: #fff;
                        margin-top: 0.3rem;
                    }
                    .line-through{
                        font-size: 0.26rem;
                        color: #ccc;
                        text-decoration: line-through;
                        vertical-align: text-bottom;
                        margin-left: 0.2rem;
                    }
                }
                .btn{
                    width: 1.8rem;
                    height:0.6rem;
                    border-radius: 30px;
                    color: #eda62c;
                    background-color: #fff;
                    margin-top: -0.3rem;
                    position: absolute;
                    top:50%;
                    right:0.3rem;
                    text-align: center;
                    font-size: 0.28rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
            li:nth-of-type(3n+1){
                background-image: linear-gradient(to right, #ffaa57, #fe5d76);
            }
            li:nth-of-type(3n+2){
                background-image: linear-gradient(to right, #9c5bfe, #3990fe);
            }
            li:nth-of-type(3n){
                background-image: linear-gradient(to right, #49c6b0, #86dc83);
            }
        }
    }
</style>
