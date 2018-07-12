<template>
    <div>
        <heading :name="name"></heading>
        <!--流量提取-->
        <div class="extractModule" v-show="iscanuse">
            <div class="phoneBox">
                <input type="tel" maxlength="13" placeholder="请输入11位手机号码" id="telNum" v-model="phone_number" @focus="isEmpty=true">
                <div class="belong_name" :class="{'red':isRed}">{{addr}}</div>
                <div class="empty_phone_num" v-if="isEmpty" @click="empty()"></div>
            </div>
            <div class="flow_balance" v-show="isFlowBalance">流量余额{{score}}M，本月到期{{expired_scores}}M</div>
            <div class="selectBox">
                <!--静态流量包-->
                <!--:class="{'active':_index==index, 'canuse':item.money == 0,'discount':item.money != 0}"-->
                <ul class="clearfix">
                    <li v-for="(item,_index) in list_static" :class="{'active':item.isActive == 1, 'canuse':item.isSelect == 1,'discount':item.isDisable == 1}" @click="Choice(_index)">
                        <div class="flow">{{item.package|filter_pkg}}</div>
                    </li>
                </ul>
            </div>
            <div class="btn_box">
                <a href="javascript:;" class="charge" :class="{active:isCharge}" @click='showChoice()'>确定</a>
            </div>
        </div>
        <!--流量不足-->
        <div class="notEnough" v-show="notEnough">
            <p class="flow-bal">流量余额<span>{{score}}M</span></p>
            <p class="flow-Prompt">亲爱的用户，存满100M流量再来提取吧</p>
            <router-link to="/index" class="goback">返回流量银行</router-link>
        </div>
        <div class="tipBox" v-if='isTipbox'>
            温馨提示： <br>
            <p>1.  流量提取适用于中国移动、中国电信、中国联通用户（不含虚拟运营商）流量可全国漫游（不含港澳台），支持2G/3G/4G网络。</p>
            <p>2.  受运营商限制，月初第一天和月末最后一天充值效果不稳定，建议避免这两天提取流量。</p>
            <p>3.  号码欠费、非实名制、运营商黑名单、虚拟运营商号段及部分不限流量套餐不支持充值。</p>
            <p>4.  流量充值失败，提取的流量将原路退还到流量账户。</p>
            <p>5.  流量充值成功后运营商处不支持退还，请确认后再提取。</p>
            <p>6.  流量提取成功后，仅当月有效，次月失效。</p>
        </div>
        <!--确认弹窗-->
        <div class="alertmask" v-show="alertmask">
            <div class="alertbox">
                <h2>确认订单</h2>
                <div class="order">
                    <div class="info clearfix">
                        <p>充值号码：</p>
                        <span>{{phone_number}}</span>
                    </div>
                    <div class="info clearfix">
                        <p>流量大小：</p>
                        <span>{{packageSizeInfo|filter_pkg}}</span>
                    </div>
                </div>
                <div class="btnbox">
                    <span @click="alertmask=false">再看看</span>
                    <span @click="charge()">确认</span>
                </div>
            </div>
        </div>
        <div class="submitInfo" v-show="isSucc">
            <div class="process">
                <dl>
                    <dt class="num"></dt>
                    <dd class="line red"></dd>
                    <dd class="text active">选择需要充值的手机号和具体流量包</dd>
                </dl>
                <dl>
                    <dt class="num"></dt>
                    <dd class="line"></dd>
                    <dd class="text_two active">{{order.create_time}}<br>流量充值申请提交成功，请耐心等待</dd>
                </dl>
                <dl>
                    <dt class="num"></dt>
                    <dd class="text">充值成功，流量充值到账后运营商短信通知为准</dd>
                </dl>
            </div>
            <div class="order_info">
                <div class="clearfix">
                    <p>充值号码</p>
                    <span>{{order.phone_number}}</span>
                </div>
                <div class="clearfix">
                    <p>流量大小</p>
                    <span>{{order.package_size|filter_pkg}}</span>
                </div>

            </div>
            <div class="finishbox">
                <router-link to="/index" class="finish">完成</router-link>
            </div>
        </div>
        <loading v-show="loading"></loading>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../assets/css/common";
    .col-money-yellow {
        color: #ff9d4d;
    }
    .extractModule {
        overflow: hidden;
        .phoneBox {
            width: 100%;
            height: 1.8rem;
            border-bottom: 1px solid $color-border;
            padding-bottom: 0.12rem;
            position: relative;
            background-color: $color-white;
            input {
                background: rgba(0, 0, 0, 0);
                border: none;
                outline: none;
                width: 100%;
                padding: 0.43rem 0 0 0.3rem;
                font-size: 0.46rem;
                color: $color-font;
            }
            .belong_name{
                font-size: 0.24rem;
                color: $color-font-sec;
                margin-left: 0.3rem;
            }
            .red{
                color: $color-red;
            }
            .empty_phone_num{
                width: 0.5rem;
                height:0.5rem;
                background:url("../assets/images/icon-empty.png")  no-repeat;
                background-size: 100% 100%;
                position: absolute;
                right:0.5rem;
                top:0.65rem;
                z-index: 999;
            }
        }
        .flow_balance{
            float: right;
            margin-right: 0.3rem;
            font-size: 0.24rem;
            color: $color-font-sec;
            margin-top: 0.26rem;
        }
        .selectBox {
            width: 100%;
            padding-top: 0.8rem;
            background-color: $color-white;
            border-bottom: 1px solid $color-border;
            ul {
                li {
                    width: 2.1rem;
                    height: 1rem;
                    border-radius: 3px;
                    margin: 0 0 0.5rem 0.24rem;
                    float: left;
                    text-align: center;
                    position: relative;
                    border:1.5px solid $color-border;
                    color: $color-border;
                    .flow {
                        font-size: 0.32rem;
                        line-height: 1rem;
                    }
                    &.discount{
                        border:1.5px solid $color-border;
                        color: $color-border;

                    }
                    &.active{
                        border:1.5px solid $color-red!important;
                        color:$color-red !important;
                        background-color: $color-red-opacity;
                    }
                    &.canuse{
                        border:1.5px solid $color-font;
                        color:$color-font;
                    }
                }

            }
            .select{
                max-height: 3.8rem;
                overflow-y: auto;
            }
            .discount{
                li{
                    border:2px solid $color-charge-btn !important;
                    color: $color-charge-btn !important;
                }
            }

        }
        .btn_box{
            width: 100%;
            padding-top:0.4rem;
            padding-bottom: 0.4rem;
            background-color: $color-white;
            .charge{
                width: 6.90rem;
                height: 0.88rem;
                line-height: 0.88rem;
                margin: 0 auto;
                border-radius: 0.1rem;
                background-color: $color-red;
                color: $color-white;
                text-align: center;
                display: block;
                font-size: 0.36rem;
                opacity: 0.4;
                &.active{
                    opacity: 1;
                }
            }
        }
    }
    .tipBox {
         width: 6.9rem;
         font-size: 0.26rem;
         line-height: 0.40rem;
         color: $color-font-sec;
         margin: 0.4rem auto 0;
     }
    .notEnough{
        width: 100%;
        height:5.2rem;
        padding-top: 1.30rem;
        color: $color-font;
        text-align: center;
        background-color: $color-white;
        .flow-bal{
            font-size: 0.36rem;
            margin-top:0.4rem;
            span{
                color: $color-red;
            }
        }
        .flow-Prompt{
            font-size: 0.32rem;
            margin-top: 0.4rem;
            padding-bottom: 1.06rem;
            border-bottom: 0.5px solid $color-border;
        }

        .goback{
            width: 6.30rem;
            height: 1rem;
            line-height: 1rem;
            margin: 0.6rem auto 0;
            border-radius: 0.1rem;
            background-color: $color-red;
            color: $color-white;
            text-align: center;
            display: block;
            font-size: 0.36rem;
        }
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
            width: 5.9rem;
            height: 4.10rem;
            position: absolute;
            left:50%;
            top:50%;
            margin-left: -2.95rem;
            margin-top: -2.05rem;
            background-color: $color-white;
            color: $color-font;
            border-radius: 0.1rem;
            h2{
                width: 100%;
                height: 1rem;
                line-height: 1rem;
                text-align: center;
                font-size: 0.36rem;
            }
            .order{
                width:5.1rem;
                padding-bottom: 0.4rem;
                border-top: 0.5px solid $color-border;
                border-bottom: 0.5px solid $color-border;
                margin: 0 auto;
                font-size: 0.30rem;
                .info{
                    p{
                        float: left;
                        margin-top: 0.38rem;
                        margin-left: 0.1rem;
                    }
                    span{
                        display: block;
                        float: right;
                        margin-top: 0.38rem;
                        margin-right: 0.1rem;
                    }
                }
            }
            .btnbox{
                display: flex;
                font-size: 0.32rem;
                line-height: 0.6rem;
                text-align: center;
                margin-top: 0.25rem;
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
                    border-left:0.5px solid $color-boder;
                }
            }
        }
    }
    .submitInfo{
        width: 100%;
        padding-top: 0.7rem;
        font-size: 0.32rem;
        .process{
            width: 6.7rem;
            margin: 0 auto;
            dl{
                position: relative;
                left: 0;
                top:0;
                .num{
                    width: 0.4rem;
                    height:0.4rem;
                    background-color: $color-boder;
                    color: $color-white;
                    text-align: center;
                    line-height: 0.4rem;
                    border-radius: 50%;

                }


                .line{
                    width: 0.04rem;
                    height:0.9rem;
                    background-color: $color-boder;
                    margin-left: 0.18rem;
                }
                .text,.text_two{
                    font-size: 0.28rem;
                    color:$color-font-sec ;
                    position: absolute;
                    left: 0.75rem;
                    top:0rem;
                }
                .text_two{
                    top:-0.25rem
                }
                .active{
                    color: $color-font;
                }
                .red{
                    background-color: #fc4e64;
                    color: $color-white;
                }
            }
            dl:nth-child(1) .num{
                background: url(../assets/images/icon_charge1.png);
                background-size: 100% 100%;
            }
            dl:nth-child(2) .num{
                background: url(../assets/images/icon_charge2.png);
                background-size: 100% 100%;
            }
            dl:nth-child(3) .num{
                background: url(../assets/images/icon_charge3.png);
                background-size: 100% 100%;
            }
        }
        .order_info{
            width: 6.7rem;
            margin: 0.62rem auto 0;
            div{
                color: $color-font;
                font-size:0.32rem;
                width: 100%;
                height: 1rem;
                line-height: 1rem;
                border-top: 1px solid $color-boder;
                p{
                    float: left;
                }
                span{
                    float: right;
                }
            }
        }
        .finishbox{
            .finish{
                width: 6.7rem;
                height:0.88rem;
                line-height: 0.88rem;
                margin: 0.6rem auto 0;
                border-radius: 0.1rem;
                background-color: $color-red;
                color: $color-white;
                text-align: center;
                display: block;
                font-size: 0.36rem;
            }
        }
    }

</style>
<script>
  import loading from '../components/loading'
  import heading from '../components/heading.vue'
  import {InfiniteScroll, Spinner, Toast} from 'mint-ui';
  import '../assets/js/jquery-2.1.1.min.js'
  export default {
    mounted () {
       this.score = this.$route.query.score
       this.expired_scores= this.$route.query.expired_scores
//        console.log(this.expired_scores)
       if(this.$route.query.phone_number){
          this.phone_number = this.$route.query.phone_number.replace(/(\d{3})(\d{4})(\d{4})/,'$1 $2 $3')
       }else{
          this.phone_number = localStorage.getItem('phone_number').replace(/(\d{3})(\d{4})(\d{4})/,'$1 $2 $3')
       }
    },
    data () {
      return {
          
        expired_scores:0,
        loading:false,
        name:'提取流量',
        phone_number:'', //手机号码,
        score:'', //可提取的流量包
        list_static: this.init_list(),
        belong_name:'', //手机号码归属地
        area_name:'',
        addr:'',
        packageSizeInfo:'',
        iscanuse:true, //手机充值
        notEnough:false, //流量不足
        alertmask:false, //提取时的弹窗
        isCharge:false,  //兑换按钮
        isRed:false,     //手机号下方的提示语
        isSucc:false, //提交成功
        isTipbox:true,
        isFlowBalance:true,
        isEmpty:false,
        order:{}
      }
    },
    methods: {
        init_list(){
            return [
                {package:'100',isSelect:0,isActive:0,isDisable:0},
                {package:'500',isSelect:0,isActive:0,isDisable:0},
                {package:'1024',isSelect:0,isActive:0,isDisable:0}
            ]
        },
        getTrafficList () {
            this.loading = true
            let tel = this.phone_number.replace(/ /ig, '');
            this.list_static = this.init_list();
            console.log(this.score)
            //如不超过100M 提示流量不足
            if(this.score<100){
                this.loading = false
                this.iscanuse = false
                this.notEnough = true
                return
            }else if(this.score>=100 && this.score<500){
                this.list_static[0].isActive = 1
                this.index = 0
            }else if(this.score>=500 && this.score<1024){
                this.list_static[1].isActive = 1
                this.index = 1
            }else if(this.score>=1024){
                this.list_static[2].isActive = 1
                this.list_static[1].isSelect = 1
                this.index = 2
            }
            console.log(this.list_static[2].isActive)
            console.log(this.list_static[2].isActive)
            this.$http.get('/api/icbc/qry/package/recharge', {
                params: {
                    phone_number: tel
                }
            }).then(function (res) {
                this.loading = false
                console.log('---------icbc/qry/package/recharge---------')
                if (res.data.status == 0) {
                    this.isDicount = false
                    this.isRed = false
                    this.belong_name = res.data.belongName
                    this.area_name = res.data.areaName
                    this.addr = res.data.areaName.replace(/\s.+$/,"")+res.data.belongName.replace("中国","")
                    this.isCharge = true
                }else{
                    console.log(res.data.message)
                    Toast(res.data.message)

                }
            }.bind(this))
            .catch(function () {
                this.loading = false
            }.bind(this))
        },
        Choice(i){
            if(this.list_static[i].isSelect){
                this.index = i
                if(i == 1){
                    this.list_static[1].isActive = 1;
                    this.list_static[2].isActive = 0;
                    this.list_static[2].isSelect = 1;
                }else if(i == 2){
                    this.list_static[1].isActive = 0;
                    this.list_static[2].isActive = 1;
                    this.list_static[1].isSelect = 1;
                }
            }


        },
        //清空手机号
        empty (){
            this.phone_number = ''
            this.index = -1;
            this.isDicount = true //流量包全部都置灰
            this.isCharge = false //提取流量按钮置灰
            this.addr = ''        //提示语置空
            this.isEmpty = false  //清空按钮隐藏
        },
        //手机号码间隔
        tel_change () {
            if (this.phone_number.length == 0){
                this.isEmpty = false
                this.addr = '手机号码不能为空'
                this.isRed = true
                return
            }
            let phone_number = this.phone_number;
            phone_number = phone_number.replace(/ /ig,'');
            if (phone_number.length <= 3) {

             }else if(phone_number.length<=7){
                    phone_number = phone_number.replace(/(\d{3})(\d{4})?/,'$1 $2')

             }else if(phone_number.length<=11){
                    phone_number = phone_number.replace(/(\d{3})(\d{4})?(\d{4})?/,'$1 $2 $3')
             }
            this.phone_number = phone_number

            setTimeout(function(){
                var input  = document.getElementById("telNum");
                //input.focus();
                var n = input.value.length//方法二
                input.selectionStart = n
                input.selectionEnd = n
             },30)
            let phone = this.phone_number.replace(/ /ig, '')
            if (this.phone_number.length == 13) {
                let myreg = /^((13[4-9])|(147)|(15[0-2,7-9])|(178)|(18[2-4,7-8]))+\d{8}$/
                let myreg1 = /^((13[0-2])|(145)|(15[5-6])|(17[5-6])|(18[5-6]))+\d{8}$/
                let myreg2 = /^((133)|(149)|(153)|(17[3,7])|(18[0-1,9]))+\d{8}$/
                let myreg3 = /^(17[0-2])+\d{8}$/
                if(myreg3.test(phone)){
                    this.addr = '目前暂不支持虚拟运营商号'
                    this.isRed = true
                    this.isCharge = false
                    return
                }else if (!myreg.test(phone) && !myreg1.test(phone) && !myreg2.test(phone)) {
                    this.addr = '请输入正确的手机号码'
                    this.isRed = true
                    this.isCharge = false
                    return
                }
                this.getTrafficList()
            } else {
                this.isCharge = false //提取流量按钮置灰
                this.addr = '请输入正确的手机号码'
                this.isRed = true
                this.isEmpty = true

            }
        },
        showChoice () {
            if(this.isCharge){
                this.alertmask = true
                this.packageSizeInfo = this.list_static[this.index].package
            }
        },
        charge (value){
            this.loading = true
            this.alertmask = false
            this.$http.post('/api/icbc/extract/recharge',{
               phone_number: this.phone_number.replace(/ /ig, ''),
               package_size: this.packageSizeInfo,
               belong_name: this.belong_name,
               area_name:this.area_name,
            }).then(function (res) {
                this.loading = false;
                console.log('---------/api/icbc/extract/recharge---------');
                if (res.data.status == 0) { //流量提取成功
                    this.isSucc = true
                    this.name='提交成功'
                    this.iscanuse = false
                    this.order =  res.data.data
                    this.isTipbox = false
                }else if(res.data.status == 1){//流量提取失败
                    Toast(res.data.message)
                    this.iscanuse = true
                }
            }.bind(this))
            .catch(function (res) {
                this.loading = false
            }.bind(this))
        }
      },
    components:{
        loading,
        heading
    },
    watch:{
       'phone_number':function(){
            this.tel_change()
       }
    }
  }
</script>

