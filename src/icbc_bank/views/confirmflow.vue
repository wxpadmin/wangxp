<template>
    <div>
        <heading :name="name"></heading>
        <!-- <div class="title">
            <router-link to="buyflow" class="go-back">
                <i></i>
            </router-link>
            <p class="tit-name">{{name}}</p>
        </div> -->
        <!--确认订单页面-->
        <div class="extract">
            <div class="confirmList">
                <ul>
                    <li class="clearfix">
                        <p>流量大小</p>
                        <span>{{package_size |filter_pkg}}</span>
                    </li>
                    <li class="clearfix">
                        <p>支付方式</p>
                        <span>工银e支付</span>
                    </li>
                    <li class="clearfix">
                        <p>流量价格</p>
                        <span class="col-money-red">{{money|filter_money}}</span>
                    </li>
                     <li class="clearfix">
                        <p>优惠券</p>
                       <b>></b>
                       <span class="col-money-red col-money-red_s" @click.stop = "chooseCoupon" v-if = "size > 0 && !money_size">您有{{size}}张可用优惠券</span>
                       <span class="col-money-red_s" v-if = "size <= 0 && !money_size">无</span>
                       <span class="col-money-red col-money-red_s" v-if = "money_size" @click.stop = "chooseCoupon">{{money_size}}元代金券 -{{money_size | toFixed2}}元</span>
                    </li>
                     <li class="clearfix">
                        <p>支付金额</p>
                        <span v-if = "!money_size" class="col-money-red">{{money|toFixed2}}元</span>
                        <!-- <span v-else class="col-money-red" v-html= "(money-money_size) > 0 ? money-money_size +'.00 元': 0+' 元'">{{money}}.00元</span> -->
                        <span v-else class="col-money-red">{{price}}</span>
                    </li>
                </ul>
            </div>
            <div class="payBox clearfix">
                <!--不使用券-->
                <p>需付金额:
                    <span v-if = "!money_size">{{money|toFixed2}} 元</span>
                    <span v-else>{{price}}</span>
                </p>
                <div class="payBtn" @click="pay">支付</div>
            </div>
        </div>
        <!--确认弹窗-->
        <div class="alertmask" v-show="alertmask">
            <div class="alertbox">
                <div class="order">
                    支付中
                </div>
                <div class="btnbox">
                    <span @click="goState()">支付遇到问题</span>
                    <span @click="goState()">支付成功</span>
                </div>
            </div>
        </div>
        <loading v-show="loading"></loading>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../assets/css/common";
    .title{
        width: 100%;
        height:0.84rem;
        text-align: center;
        line-height: 0.84rem;
        position: relative;
        background-color: $color-white;
        border-bottom: 1px solid $color-border;
        .go-back{
            width: 0.6rem;
            height:100%;
            position: absolute;
            left: 0;
            top:0;
            i{
                width: 0.20rem;
                height:0.34rem;
                position: absolute;
                left:0.25rem;
                top:0.22rem;
                background: url(../assets/images/icon-go-back-red.png) no-repeat;
                background-size:100% 100%;
            }
        }
        .tit-name{
            font-size: 0.36rem;
        }
        .showTool-Bar{
            width: 0.8rem;
            height:100%;
            position: absolute;
            right: 0;
            top:0;
            i{
                width: 0.44rem;
                height:0.10rem;
                position: absolute;
                right:0.3rem;
                top:0.39rem;
                background: url(../assets/images/share_bar.png) no-repeat;
                background-size:100% 100%;
            }
        }
    }


    .col-money-red {
        color: $color-red;
    }
    
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
            font-size: 0.36rem;
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
                    color: $color-font;
                    border-left:1px solid $color-boder;
                }
            }
        }
    }
    .extract{
        overflow: hidden;
        .confirmList ul{
            width:100%;
            background: $color-white;
            font-size: 0.3rem;
            margin-bottom: 0.3rem;
            margin-top: 0.3rem;
            li{
                width: 100%;
                height: 1rem;
                line-height: 1rem;
                border-top: 1px solid $color-border;
                color: $color-font;
                padding-left: 0.3rem;
                p{
                    float: left;
                }
                span{
                    display: block;
                    float: right;
                    padding-right: 0.55rem;
                }
                b{
                    float: right;
                    padding-right: 0.55rem;
                }
            }
            .col-money-red_s{
                padding-right: 0.2rem;
            }
        }
        .payBox {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 1rem;
            line-height: 1rem;
            color: $color-font;
            border-top:1px solid $color-border;
            background-color: $color-white;
            p {
                height: 100%;
                width: 4.92rem;
                padding-left:0.3rem;
                float: left;
                font-size: 0.30rem;
                span {
                    color: $color-red;
                }
            }
            .payBtn {
                height: 100%;
                width: 2.18rem;
                float: right;
                background-color: $color-red;
                color: $color-white;
                font-size: 0.32rem;
                text-align: center;
            }
        }

    }


</style>
<script>
  import loading from '../components/loading'
  import heading from '../components/heading.vue'
  import {Spinner, Toast} from 'mint-ui';
  import '../assets/js/jquery-2.1.1.min.js'
  export default {
    mounted () {
        this.package_size = this.$route.query.package_size;
        this.money = this.$route.query.money;
        this.money_size = this.$route.query.money_size;
        this.id = this.$route.query.id;
        if(this.$route.query.order_id){
            this.alertmask = true;
        }
        this.getData();
    },
    data () {
      return {
        loading:false,
        name:'订单确认',
        package_size:'',
        money:'',
        alertmask:false,  //支付确认
        size:0,
        page_number:1,
        page_size:10,
        money_size:0,
        id:"",
        // price:
      }
    },
    computed:{
        price(){
            
            if(this.money-this.money_size > 0){
                let num = (this.money-this.money_size).toString().indexOf(".")
                    
                    // return (this.money-this.money_size).toFixed(2)+"元"

                if(num){
                    return (this.money-this.money_size).toFixed(2)+"元"
                }else{
                    return this.money-this.money_size+".00元"
                }
            }else{
                return 0+' 元'
            }
        }
    },
    methods: {
        //优惠券
        getData(){
            this.$http.get("/api/icbc/flow/couponlist?coupon_status=1&coupon_scene=3&page_number="+this.page_number+"&page_size="+this.page_size+"&package_size="+this.money).then((res) => {
                this.size = res.data.data.rows;
            })
        },
        chooseCoupon(){
            this.$router.push({ path: 'usecoupon',query: {
                coupon_scene:3,
                money:this.money,
                package_size:this.package_size,
                id:this.id
            }})
        },
        pay (){
            let _this = this
            this.loading = true
            let url = '/api/icbc/buy/extract/flow'
            // if(this.package_size == '1'){
            //     url = '/api/icbc/buy/score/extract/flow'
            // }
            this.$http.post(url,{
               coupon_user_info_id: this.id,
               package_size:this.package_size
            }).then(function (res) {
                // setTimeout(()=>{
                //     this.$router.push({ path: 'flowstatus', query: {
                //         order_id: res['data']['data']['order_id'],
                //         result: 1
                //     }})
                // },500)
                setTimeout(function(){
                    _this.loading = false;
                },20000)
                console.log('---------/api/icbc/buy/extract/flow---------');
                if(res.data.status == 2){
                    let param = []
                    for(let i in res.data.data.data.data){
                        param.push({name:i,value:res.data.data.data.data[i]})
                    }
                    this.Post(res.data.data.data.post_url,param)
                }
            }.bind(this))
            .catch(function (err) {
                this.loading = false
            }.bind(this))
        },
        Post(URL, PARAMTERS) {
            //创建form表单
            var temp_form = document.createElement("form");
            temp_form.action = URL;
            //如需打开新窗口，form的target属性要设置为'_blank'
            temp_form.target = "_self";
            temp_form.method = "post";
            temp_form.style.display = "none";
            //添加参数
            for (var item in PARAMTERS) {
                var opt = document.createElement("textarea");
                opt.name = PARAMTERS[item].name;
                opt.value = PARAMTERS[item].value;
                temp_form.appendChild(opt);
            }
            document.body.appendChild(temp_form);
            //提交数据
            temp_form.submit();
        },
        goState (){
            if(this.$route.query.order_id){
                this.$router.push({ path: 'flowstatus', query: {
                    order_id: this.$route.query.order_id,
                    result: this.$route.query.result
                }})
            }
        }
      },
    components:{
        loading,
        heading
    }
  }
</script>

