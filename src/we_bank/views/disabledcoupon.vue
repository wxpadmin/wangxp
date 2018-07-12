<template>
    <div class="wrap">
        <ul v-if="list.length >= 1">
            <pull-refresh ref = "pullRefresh" :nomore = "nomore" @loadmore = "loadMore" >
                <li v-for="item in list">
                    <div class="fl center-box">
                            <img :src="item.card_min_img" alt="">
                            <div class="content">
                                <p class="title">{{item.card_title}}</p>
                            </div>
                    </div>
                    <div class="fr right-box">
                        <router-link class="geted" to="">{{item.card_status | card_status}}</router-link>
                    </div>
                </li>
            </pull-refresh>
        </ul>
        <div class="nomore" v-else>
                暂时没有礼券哟
        </div>
    </div>
</template>
<script>
    export default {
        mounted () {
            document.title=  '不可用礼券';
            this.info()
        },
        data () {
            return {
                list : [],
                page_size:10,
                page_number:1,
                nomore:false,
            }
        },
        methods : {
            info () {
                this.$axios.get('/api/wzyz/cards/card_list',{type : 2,page_size:this.page_size, page_number:this.page_number,},(res)=>{
                    if (res['list'].length == 0){
                        this.nomore = true
                    }
                    this.list = this.list.concat(res.list)
                })
            },
            loadMore () {
                this.page_number ++
                this.info()
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .wrap{
        width: 100%;
        padding: 0.3rem 0.2rem 0;
        .nomore{
            text-align: center;
            margin-top: 50%;
        }
        .pull-refresh{
            min-height: 100%;
        }
        ul{
            height: 100%;
            li{
                width: 100%;
                height:1.7rem;
                background-image: url("../assets/images/coupon.png");
                background-size: 100% 100%;
                position: relative;
                margin-bottom: 0.3rem;
                position: relative;
                .center-box{
                    height:1.7rem;
                    position: relative;
                    a{
                        width: 100%;
                        height: 100%;
                        display: block;
                    }
                }
                img{
                    width: 0.8rem;
                    height:0.8rem;
                    border-radius: 50%;
                    display: inline-block;
                    position: absolute;
                    top:50%;
                    margin-top: -0.4rem;
                    margin-left: 0.2rem;
                }
                .content{
                    display: inline-block;
                    margin-left: 1.6rem;
                    height:100%;
                    padding-top: 0.36rem;
                    p{
                        font-size: 0.28rem;
                    }
                    .title{
                        color: #272727;
                    }
                    .status{
                        color: #777777;
                        margin-top: 0.28rem;
                    }
                }
                .right-box{
                    position: absolute;
                    right:0;
                    top:1rem;
                    a{
                        width: 1.2rem;
                        height:0.48rem;
                        font-size: 0.28rem;
                        border-radius: 8px;
                        margin-right: 0.2rem;
                        float: left;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .geted { // 已获取
                        background-color: #f8f8f8;
                        color: #ccc;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>

