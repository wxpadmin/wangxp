<template>
    <div id = "wrap_box">
        <heading :name="name"></heading>
        <!--购买流量-->
        <div class="extractModule" v-show="iscanuse">
            <div class="myflow">
                您当前流量账户余额：{{score}}M
            </div>
            <div class="selectBox">
                <!--静态流量包-->
                <ul class="clearfix">
                    <li v-for="(item,_index) in list_static" :class="{'active':_index==index}" @click="Choice(_index)">
                        <div v-if = "item.icon" class="active-icon"  :class="{'active-icon-yellow':_index==index}"></div>
                        <div class="flow">{{item.package}}M</div>
                        <p class="prize">值{{item.price |filter_money}}</p>
                    </li>
                </ul>
            </div>
            <div class="btn_box">
                <a href="javascript:;" class="charge" @click="buy">确定</a>
            </div>
            <div class="tipBox">
                流量说明： <br>
                <p>1、账户充值成功后，存入您的流量账户，系统自动更新流量账户余额；</p>
                <p>2、充值成功后，账户充值记录可在收支明细内查看；</p>
                <p>3、充值的流量可用于手机充值、兑换其他商品、给好友发流量红包等，享有多种权益；</p>
                <p>4、账户充值成功后，暂不支持退货。</p>
            </div>
        </div>
        <router-link class="sufficient" :to="{ path: '/directRechargeList',query:{order_type:3}}" tag = "div">账户充值记录</router-link>
        <!-- <div class="sufficient">账户充值纪录</div> -->
        <loading v-show="loading"></loading>
    </div>
</template>
<script>
  import loading from '../components/loading'
  import heading from '../components/heading.vue'
  import {InfiniteScroll, Spinner, Toast} from 'mint-ui';
  import '../assets/js/jquery-2.1.1.min.js'
  export default {
    mounted () {
       this.score = this.$route.query.score
       if(this.$route.query.phone_number){
          this.phone_number = this.$route.query.phone_number.replace(/(\d{3})(\d{4})(\d{4})/,'$1 $2 $3')
       }else{
          this.phone_number = localStorage.getItem('phone_number').replace(/(\d{3})(\d{4})(\d{4})/,'$1 $2 $3')
       }
    },
    data () {
      return {
        loading:false,
        name:'账户充值',
        phone_number:'', //手机号码,
        score:'',
        list_static: [
            {package:'50',price:'5'},
            {package:'80',price:'8'},
            {package:'100',price:'10'},
            {package:'300',price:'30'},
            {package:'500',price:'50',icon:true},
            {package:'1000',price:'100',icon:true}
        ],
        money:'5',
        package_size:'50',
        index: 0,
        iscanuse:true, //手机充值
        isSucc:false, //提交成功
      }
    },
    methods: {
        Choice(i) {
            this.index = i
            this.money = this.list_static[i].price
            this.package_size = this.list_static[i].package
        },
        buy (){
            this.$router.push({ path: 'confirmflow', query: {
                package_size: this.package_size,
                money:this.money
            }})
        }
      },
    components:{
        loading,
        heading
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../assets/css/common";
    .sufficient{
        width:100%;
        text-align:center;
        color: #e42f46;
        font-size:0.28rem;
        position: fixed;
        bottom:0.2rem;
    }
    #wrap_box{
        width:100%;
        height:auto;
        padding-bottom:0.8rem;
    }
    .col-money-red {
        color: $color-red;
    }
    .extractModule {
        overflow: hidden;
        height: 100%;
        .myflow {
            width: 100%;
            padding-top: 0.5rem;
            padding-left: 0.3rem;
            color: $color-font;
            font-size: 0.3rem;
            text-align: left;
        }
        .selectBox {
            width: 100%;
            padding-top: 0.5rem;
            ul {
                width: 7rem;
                margin: 0 auto;
                li {
                    width: 3.2rem;
                    height: 1.5rem;
                    border-radius: 4px;
                    float: left;
                    text-align: center;
                    position: relative;
                    border:2px solid $color-red;
                    color: $color-red;
                    margin-bottom: 0.3rem;
                    .flow {
                        font-size: 0.4rem;
                        line-height: 1rem;
                    }
                    .prize{
                        font-size: 0.3rem;
                        line-height: 0.1rem;
                    }
                    &.active{
                        border:2px solid $color-red;
                        color:$color-white;
                        background-color: $color-red;
                    }
                }
                li:nth-child(odd){
                    margin-right: 0.3rem;
                }
            }
        }
        .btn_box{
            width: 100%;
            margin-top:0.4rem;
            padding-bottom: 0.4rem;
            .charge{
                width: 6.9rem;
                height: 0.88rem;
                line-height: 0.88rem;
                margin: 0.3rem auto 0;
                border-radius: 3px;
                background-color: $color-red;
                color: $color-white;
                text-align: center;
                display: block;
                font-size: 0.36rem;
            }
        }
        .tipBox {
            width: 6.9rem;
            margin: 0 auto;
            font-size: 0.28rem;
            line-height: 0.52rem;
            color: $color-font-sec;
        }
    }
    .active-icon{
        background: url('../assets/images/red-icon.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        height:.4rem;
        width: 1rem;
        position: absolute;
        right:0;
        float: right;
    }
    .active-icon-yellow{
        background: url('../assets/images/red-icon-active.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
</style>