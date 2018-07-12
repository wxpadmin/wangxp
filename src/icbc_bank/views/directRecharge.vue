<template>
    <div>
        <div class="directBox">
            <heading :name="name"></heading>
            <!--流量直充-->
            <div class="extractModule" v-show="iscanuse">
                <div class="phoneBox">
                    <input type="tel" maxlength="13" placeholder="请输入11位手机号码" v-model="phone_number" @focus="isEmpty=true" id="telNum">
                    <div class="belong_name" :class="{'red':isRed}">{{addr}}</div>
                    <div class="empty_phone_num" v-if="isEmpty" @click="empty()"></div>
                </div>
                <div class="selectBox">
                    <!--静态流量包-->
                    <ul class="clearfix" v-if="list.length<=0">
                        <li class="discount" v-for="(item,_index) in list_static" :class="{'active':_index==index}">
                            <div class="flow">{{item.package}}</div>
                            <p class="prize">{{item.price}}元</p>
                        </li>
                    </ul>
                    <!--动态流量包-->
                    <ul class="select clearfix">
                        <li v-for="(item,_index) in list" @click="Choice(_index)" :class="{'active':_index==index}">
                            <div class="flow">{{item.packageSize |filter_pkg}}</div>
                            <p class="prize">{{item.discountPrice|filter_money}}</p>
                        </li>
                    </ul>
                </div>
                <div class="btBox clearfix">
                    <div class="money-box">
                        <!--原金额-->
                        <p class="money">{{money|filter_money}}</p>
                        <!--范围-->
                        <p class="range">全国可用，即时生效，当月有效</p>
                    </div>
                    <p class="buyBtn" :class="{active:isCharge}" @click="charge()">购买</p>
                </div>
            </div>
            <!--记录-->
            <p class="directRechargeList" v-if="isDirectRechargeList">
                <router-link :to="{ path: '/directRechargeList',query:{order_type:1}}">流量直充记录</router-link>
            </p>
            <loading v-show="loading"></loading>
        </div>
    </div>

</template>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../assets/css/common";
    .directBox{
        width: 100%;
        height: 100%;
        position: relative;
        left:0;
        top:0;
    }
    .col-money-red {
        color: $color-red;
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
            padding-top: 0.5rem;
            background-color: $color-white;
            border-bottom: 1px solid $color-border;
            ul {
                margin-bottom: 0.12rem;
                li {
                    width: 2.1rem;
                    height: 1rem;
                    border-radius: 3px;
                    margin: 0 0 0.4rem 0.25rem;
                    float: left;
                    text-align: center;
                    position: relative;
                    border:1.5px solid $color-font;
                    color: $color-font;
                    .flow {
                        font-size: 0.36rem;
                        line-height: 0.7rem;
                    }
                    .prize{
                        font-size: 0.24rem;
                        line-height: 0.1rem;
                    }
                    &.discount{
                        border:1.5px solid $color-border;
                        color: $color-border;

                    }
                    &.active{
                        border:1.5px solid $color-red;
                        color:$color-red;
                        background-color: $color-red-opacity;
                    }
                    &.canuse{
                        border:1.5px solid $color-font;
                        color:$color-font;
                    }
                }
                &.select{
                    max-height: 7rem;
                    overflow-y: auto;
                    -webkit-overflow-scrolling: touch;
                }
            }

        }
        .btBox {
            width: 100%;
            padding: 0.3rem;
            position: relative;
            background-color: $color-white;
            .money-box{
                float: left;
                .money {
                    font-size: 0.36rem;
                    padding-bottom: 0.16rem;
                    color: $color-red;
                }
                .range{
                    font-size: 0.24rem;
                    color: $color-font;
                }
            }
            .buyBtn {
                float: right;
                margin-right: 0.6rem;
                font-size: 0.36rem;
                width: 1.8rem;
                height: 0.88rem;
                border-radius: 0.05rem;
                text-align: center;
                line-height: 0.88rem;
                background-color: $color-red;
                color: $color-white;
                opacity: 0.4;
                &.active{
                    opacity: 1;
                }
            }
        }
    }
    .directRechargeList{
        width: 100%;
        text-align: center;
        position: relative;
        font-size: .28rem;
        padding-bottom: .4rem;
        padding-top: 1rem;
        a{
            color: $color-red;
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
       if(this.$route.query.phone_number){
          this.phone_number = this.$route.query.phone_number.replace(/(\d{3})(\d{4})(\d{4})/,'$1 $2 $3')
       }else{
          this.phone_number = localStorage.getItem('phone_number').replace(/(\d{3})(\d{4})(\d{4})/,'$1 $2 $3')
       }
    },
    data () {
      return {
        loading:false,
        name:'流量直充',
        phone_number:'', //手机号码,
        list:[],  //流量包列表
        list_static: [
            {package:'10M',price:'2.85'},
            {package:'30M',price:'4.75'},
            {package:'70M',price:'9.50'},
            {package:'150M',price:'19.00'},
            {package:'300M',price:'20.00'},
            {package:'500M',price:'28.50'},
            {package:'1G',price:'47.50'},
            {package:'2G',price:'66.50'},
            {package:'3G',price:'99.50'}
        ],
        belong_name:'', //手机号码归属地
        area_name:'',
        addr:'',
        money:'2.85',
        index: 0,
        iscanuse:true, //手机充值
        isDirectRechargeList:true, //流量直充记录
        isCharge:false,
        isRed:false,
        isDicount:false,
        isSucc:false, //提交成功
        isFlowBalance:true,
        isEmpty:false,
        package_size:'',
      }
    },
    methods: {
        getTrafficList () {
            this.loading = true
            let tel = this.phone_number.replace(/ /ig, '');
            this.$http.get('/api/icbc/qry/package/recharge', {
                params: {
                    phone_number: tel
                }
            }).then(function (res) {
                this.loading = false
                console.log('--------/api/icbc/qry/package/recharge---------')
                if (res.data.status == 0) {
                    this.isCharge = true
                    this.isRed = false
                    this.list = res.data.packageData
                    this.belong_name = res.data.belongName
                    this.area_name = res.data.areaName
                    this.addr = this.addr = res.data.areaName.replace(/\s.+$/,"")+res.data.belongName.replace("中国","")
                    this.money = this.list[0].discountPrice,
                    this.package_size = this.list[0].packageSize
                }
            }.bind(this))
            .catch(function () {
                this.loading = false
            }.bind(this))
        },
        Choice(i) {
            this.index = i
            this.money = this.list[i].discountPrice,
            this.package_size = this.list[i].packageSize
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
                this.index = 0
                this.isCharge = false //提取流量按钮置灰
                this.addr = '请输入正确的手机号码'
                this.isRed = true
                this.isEmpty = true

            }
        },
        charge (){
            if(this.isCharge){
                this.$router.push({ path: 'confirmOrder', query: {
                    phone_number: this.phone_number.replace(/ /ig, ''),
                    package_size: this.package_size,
                    belong_name : this.belong_name,
                    area_name: this.area_name,
                    money: this.money
                }})
            }

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

