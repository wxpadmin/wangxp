<template>
    <div>
        <heading :name="name"></heading>
        <!--确认订单页面-->
        <div class="extract">
            <div class="confirmList">
                <ul>
                    <li class="clearfix">
                        <p>充值号码</p>
                        <span>{{phone_number}}</span>
                    </li>
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
                        <span v-if = "!money_size" class="col-money-red">{{money|toFixed2}} 元</span>
                        <!-- <span v-else class="col-money-red" v-html= "(money-money_size) > 0 ? money-money_size +'.00 元': 0+' 元'">{{money}}.00元</span> -->
                        <span v-else class="col-money-red">{{price}}</span>
                    </li>
                </ul>
            </div>
            <div class="payBox clearfix">
                <!--不使用券-->
                <p>需付金额:
                    <span v-if = "!money_size">{{money|toFixed2}}元</span>
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

    .confirmList ul{
        width:100%;
        background: $color-white;
        font-size: 0.3rem;
        margin-bottom: 0.3rem;
        margin-top: 0.3rem;
        li{
            height: 1rem;
            line-height: 1rem;
            border-top: 0.5px solid $color-border;
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
        background-color: $color-white;
        border-top:0.5px solid $color-border;
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

</style>
<script>
  import loading from '../components/loading'
  import heading from '../components/heading.vue'
  import {Spinner, Toast} from 'mint-ui';
  import '../assets/js/jquery-2.1.1.min.js'
  export default {
    mounted () {
        this.phone_number = this.$route.query.phone_number.replace(/(\d{3})(\d{4})(\d{4})/,'$1 $2 $3')
        this.belong_name = this.$route.query.belong_name
        this.area_name = this.$route.query.area_name
        this.package_size = this.$route.query.package_size
        this.money = this.$route.query.money
        this.money_size = this.$route.query.money_size
        this.id = this.$route.query.id
        if(this.$route.query.order_id){
            this.alertmask = true
        }
        this.getData()
    },
    data () {
      return {
        loading:false,
        name:'订单确认',
        phone_number:'', //手机号码,
        belong_name:'', //手机号码归属地
        area_name:'',
        package_size:'',
        money:'',
        alertmask:false,  //支付确认
        page_number:1,
        page_size:10,
        size:0,
        money_size:0,
        id:"",
      }
    },
    computed:{
        price(){
            if(this.money-this.money_size > 0){
            let num = (this.money-this.money_size).toString().indexOf(".")
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

        //点击优惠券
        chooseCoupon(){
            this.$router.push({ path: 'usecoupon',query: {
                phone_number: this.phone_number,
                package_size:this.package_size,
                money:this.money,
                belong_name: this.belong_name,
                area_name:this.area_name,
                coupon_scene:2,
                id:this.id
            }})
        },
        //请求数据
        getData(){
            this.$http.get("/api/icbc/flow/couponlist?coupon_status=1&coupon_scene=2&page_number="+this.page_number+"&page_size="+this.page_size+"&package_size="+this.money).then((res) => {
                this.size = res.data.data.rows;
                console.log(res)
            })
        },
        pay (){
            let _this = this
            this.loading = true
            this.$http.post('/api/icbc/recharge/order',{
               phone_number: this.phone_number.replace(/ /ig, ''),
               coupon_user_info_id: this.id,
               package_size: this.package_size,
               belong_name: this.belong_name,
               area_name:this.area_name
            }).then(function (res) {
                setTimeout(function(){
                    _this.loading = false;
                },2000)
                console.log('---------/api/icbc/recharge/order---------');
                if(res.data.status == 2){
                    let param = []
                    for(let i in res.data.data.data.data){
                        param.push({name:i,value:res.data.data.data.data[i]})
                    }
                    console.log(param)
                    this.Post(res.data.data.data.post_url,param)
                }else if (res.data.status == 0) {
                    let dataJson = res.data.data
                    this.$router.push({ path: 'paystatus', query: {
                        order_id: dataJson.order_id,
                        result: this.$route.query.result
                    }})
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
                this.$router.push({ path: 'paystatus', query: {
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

