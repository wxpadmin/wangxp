<template>
    <div class="posiF">
        <div class="title">
            <div class="go-back" @click="goIndex">
                <i></i>
            </div>
            <p class="tit-name">{{name}}</p>
            <!--<div class="showTool-Bar">-->
            <!--<i></i>-->
            <!--</div>-->
        </div>
        <paystatus type="fail" :item="dataList"></paystatus>
        <div class="order_box clearfix" v-if="bBtn">
            <div class="order_btn"  @click="cancleOrder">取消订单</div>
            <div class="order_btn active"  @click="pay">立即付款</div>
        </div>
        <loading v-show="loading"></loading>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../assets/css/common";
    .posiF{
        position: fixed;
        left: 0;
        top: 0;
    }
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
    .order_box {
        width: 6.8rem;
        margin: 0.5rem auto 0;
        .order_btn {
            float: left;
            width: 3.12rem;
            height: 0.88rem;
            line-height: 0.88rem;
            text-align: center;
            color: $color-red;
            font-size: 0.3rem;
            border-radius: 0.08rem;
            border: 1.5px solid $color-red;
            &.active {
                color: $color-white;
                background-color: $color-red;
            }
        }
        .order_btn:nth-child(2) {
            float: right;
            margin-right: 0rem;
        }
    }
</style>
<script>
  import {Toast} from 'mint-ui';
  import paystatus from '../components/paystatus.vue'
  import loading from '../components/loading'
  import heading from '../components/heading.vue'
  export default{
    mounted(){
      this.order_id = this.$route.query.order_id;
      this.result = this.$route.query.result;
      this.init()
    },
    data(){
      return {
        order_id: '', //订单号
        loading:false,
        dataList:[],
        result:'',// 结果
        bBtn:false, // 是否成功,
        name:'订单详情'
      }
    },
    methods:{
      init(){
        this.loading = true

        this.$http.get('/api/icbc/order/info', {
            params: {
                order_id:this.order_id
            }
        }).then(function (res) {
            this.loading = false
            console.log('--------/api/icbc/order/info---------')
            this.dataList = res.data.data
            if(this.result == 1){
                this.dataList.pay_status == 1
            }
            if(res.data.data.pay_status==0){
              this.bBtn = true // 显示下面按钮
            }else{
              this.bBtn = false // 隐藏下面按钮
            }
        }.bind(this))
        .catch(function (err) {
            this.loading = false
        }.bind(this))
      },
      cancleOrder(){ //取消订单
        this.loading = true
        this.$http.get('/api/icbc/cancle/order', {
            params: {
                order_id:this.order_id
            }
        }).then(function (res) {
            this.loading = false
            console.log('--------/api/icbc/cancle/order---------')
            this.loading = false
            if (res.data.status == 0) {
              Toast('成功取消订单')
              this.init()
            }else{
              Toast(res.data.message)
            }
        }.bind(this))
        .catch(function (err) {
            this.loading = false
        }.bind(this))
      },
      pay(){ //支付订单
        this.loading = true
        this.$http.get('/api/icbc/again/pay',{
          params: {
            order_id: this.order_id
          }
        }).then(function (res){
            console.log(res)
           this.loading = false
           if(res.data.status == 2){//流量提取不足，充值后
            let param = []
            for(let i in res.data.data.data.data){
              param.push({name:i,value:res.data.data.data.data[i]})
            }
            console.log(param)
            this.Post(res.data.data.data.post_url,param)
          }else{ //流量提取成功
            Toast(res.data.message)
//            this.$router.push({ name: 'orderDetails', query: { order_id: res.data.data.order_id,result:100}})
          }
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
      goIndex(){
        if(this.result == 1){
            this.$router.push({ path: 'index'})
        }else{
             window.history.go(-1)
        }

      }
    },
    components: {
      paystatus,
      loading,
      heading
    }
  }
</script>
