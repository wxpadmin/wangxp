<template>
    <div>
        <div class="red_reveive">
            <heading :name="'工行红包'"></heading>
            <div class="receivelist_head">
                <div class="receive_bg"></div>
                <div class="receive_icon">
                    <img :src="head_img_url?head_img_url:red_img_logo">
                </div>
                <h6 class="send_name">{{objData | filter_real_name}}的红包</h6>
                <p class="send_content">{{blessing}}</p>
            </div>
            <p class="receive_total" v-if="isEnd == 0">已领取{{quantityRemain}}/{{quantityTotal}}个,未领完 <span @click="share_again()">继续发送</span></p>
            <p class="receive_total" v-else-if="isEnd == 1&&quantityRemain == quantityTotal">{{quantityRemain}}/{{quantityTotal}}个 已领完 <i>已过期</i></p>
            <p class="receive_total" v-else-if="isEnd == 1&&quantityRemain != quantityTotal">已领取 {{quantityRemain}}/{{quantityTotal}}个  <i>已退还</i></p>
            <p class="receive_total" v-else-if="isEnd == 3">{{quantityRemain}}/{{quantityTotal}}个 已领完</p>
            <div class="det" v-if="quantityRemain">
                <ul>
                    <li class="clearfix" v-for="item in scoreList">
                        <div class="receive_logo">
                            <img :src="item.head_img_url?item.head_img_url:red_img_logo">
                        </div>
                        <div class="receive_con">
                            <p class="tel">{{item | filter_real_name}}</p>
                            <p class="time">{{item.create_time}}</p>
                        </div>
                        <div class="receive_flownum">
                            +{{item.amount}}M
                        </div>
                    </li>
                    <nomore v-if="noMore"></nomore>
                </ul>
            </div>

        </div>
        <loading v-show="loading"></loading>
    </div>
</template>
<script>
    import {InfiniteScroll, Spinner, Toast, Loadmore} from 'mint-ui';
    import loading from '../../components/loading.vue'
    import heading from '../../components/heading.vue'
    import nomore from '../../components/nomore'
    export default {
        mounted(){
            this.info.order_id = this.$route.query.id
            this.getRedInfo()
        },
        data (){
            return {
               loading:false,
               noMore:false,
               scoreList:[],
               amount:'',
               blessing:'',
               amountTotal:'',
               amountRemain:'',
               quantityTotal:'',
               quantityRemain:'',
               red_img_logo: require('../../assets/images/head_logo.png'),
               head_img_url:'',
               isEnd:'',
               info:{
                    content:'',
                    order_id:''
               },
               objData:{}
            }
        },
        methods:{
           getRedInfo(){
               this.loading = true
               this.$http.get('/api/icbc/redpacket/get',{
                   params: {
                        id: this.info.order_id
                   }
               })
               .then(function (res) {
                 this.loading = false
                 console.log('---------/api/icbc/redpacket/get----2342344-----')
                  if (res.data.status == 0) {
                     this.objData = res.data.data
                     var amountScores = 0;
                     for(let item of res.data.data.receives){
                        amountScores += item.amount
                     }
                     this.head_img_url = res.data.data.head_img_url
                     this.blessing = res.data.data.blessing
                     this.amountTotal = res.data.data.amount
                     this.info.content = this.blessing
                     this.info.amount = res.data.data.amount
                     this.amountRemain = amountScores
                     this.quantityTotal = res.data.data.quantity
                     this.quantityRemain = res.data.data.receives.length
                     this.scoreList = res.data.data.receives
                     this.isEnd = res.data.data.status
                      //已领取的红包等于总的红包
                     if(this.quantityRemain == this.quantityTotal){
                        this.isEnd = 3
                     }
                  }else{
                      Toast(res.data.message)
                  }
               }.bind(this))
               .catch(function (err) {
                   this.loading = false
               }.bind(this))
            },
            share_again(){
                shareRed(this.info)
            }
        },
        components:{
            loading,
            heading,
            nomore
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../../assets/css/common';
    .red_reveive{
        width: 100%;
        position: relative;
        left:0;
        top:0;
        .receivelist_head{
            color: $color-font;
            text-align: center;
            padding-bottom: 0.2rem;
            background-color: $color-white;
            .receive_bg{
                width: 100%;
                height: 2.82rem;
                background: url(../../assets/images/red/receivelist_head.png);
                background-size: 100% 100%;
            }
            .receive_icon{
                width: 1.12rem;
                height: 1.12rem;
                border-radius: 5px;
                position:absolute;
                left:50%;
                top:1.8rem;
                margin-left: -0.6rem;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
            .send_name{
                font-size: 0.3rem;
                margin-top: -0.4rem;
                font-weight: bold;
            }
            .send_content{
                font-size: 0.24rem;
                margin-top: 0.2rem;
            }
            .send_size{
                font-size: 0.74rem;
                font-weight: bold;
            }
            .send_prompt{
                font-size: 0.24rem;
                color: $color-font-sec;
            }
        }
        .receive_total{
            height:0.6rem;
            line-height:0.6rem;
            font-size: 0.24rem;
            color: $color-font-sec;
            padding-left: 0.3rem;
            margin-top:0.1rem;
            span{
                float: right;
                margin-right: 0.3rem;
                color: $color-red;
            }
            i{
                float: right;
                margin-right: 0.3rem;
            }
        }
        .det{

            ul{
                width: 100%;
                min-height: 3.4rem;
                overflow-x: hidden;
                overflow-y: auto;
                background-color: $color-white;
                li{
                    width: 100%;
                    height: 1.1rem;
                    border-bottom: 1px solid $color-border;
                    .receive_logo{
                        width: 0.7rem;
                        height: 0.7rem;
                        border-radius: 5px;
                        overflow: hidden;
                        float: left;
                        margin-top: 0.2rem;
                        margin-left: 0.3rem;
                        img{
                            width: 100%;
                            display: block;
                        }
                    }
                    .receive_con{
                        margin-left: 0.3rem;
                        float: left;
                        .tel{
                            margin-top: 0.2rem;
                            font-size: 0.28rem;
                            color: $color-font;
                        }
                        .time{
                            margin-top: 0.02rem;
                            font-size: 0.22rem;
                            color: $color-font-sec;
                        }
                    }
                    .receive_flownum{
                        float: right;
                        line-height: 1.1rem;
                        color: #28ac3e;
                        font-size: 0.3rem;
                        margin-right: 0.3rem;
                    }
                }
            }
        }
    }


</style>
