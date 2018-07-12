<template>
    <div class="vmRecord">
        <heading :name="name"></heading>
        <!--首页-->
        <div class="exchangeBox">
            <div class="infoBox">
                <div class="title">
                    兑换的产品
                    <p>{{data.card_title}}</p>
                </div>
                <div class="title">
                    消耗流量值
                    <p>{{data.card_price}}M</p>
                </div>
            </div>
            <div class="codeBox">
                <span v-if ="data.code">
                  <div v-if = "cardCode[0]">券码：<span >{{cardCode[0]}}</span></div>
                  <div v-if = "cardCode[1]">券密：<span >{{cardCode[1]}}</span></div>
                    <div v-if="short_url"><span>链接：</span><span><a style="color: #148fb6" :href="short_url">{{short_url}}</a></span></div>
                </span>
                <div v-if ="data.card_status == '6'">
                  <span >刮码中</span>
                </div>
            </div>
            <div class="greyBar"></div>
            <div class="tipBox">
                <h4>券码使用有效期：</h4>
                <span v-if = "data.end_time">
                  <p>截止至{{data.end_time}}</p>
                  <h4>使用说明：</h4>
                </span>
                <span v-else>
                    暂无
                </span>
                <div>
                    <div v-html = "rule"></div>
                </div>
            </div>
        </div>
        <loading v-show="loading"></loading>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../assets/css/common";
    .vmRecord{
        .exchangeBox{
            background: #fff;
            .topBar{
                height:0.5rem;
                color: #999;
                font-size: 0.24rem;
                text-align: right;
                padding-right: 0.25rem;
                line-height: 0.5rem;
            }
            .infoBox{
                border-top:$border-grey;
                background: #fff;
                padding-left: 0.3rem;
                .title{
                    height: 0.9rem;
                    line-height: 0.9rem;
                    font-size: 0.3rem;
                    color: #333;
                    padding-right: 0.3rem;
                    border-bottom: $border-grey;
                    display: flex;
                    justify-content: space-between;

                }
            }
            .greyBar{
                background: #f5f5f5;
                height:0.2rem;
                border-top: $border-grey;
                border-bottom: $border-grey;
            }
            .codeBox{
                width:6.9rem;
                // height:1.2rem;
                margin:0.3rem auto;
                background: url("../../assets/images/videoMembers/bg-pink.png")no-repeat;
                background-size: 100% 100%;
                padding-top: 0.2rem;
                padding-bottom: 0.2rem;
                div{
                    width:6.15rem;
                    height: 1rem;
                    background:#f4f4f4 ;
                    font-size: 0.32rem;
                    color: #333;
                    text-align: center;
                    line-height: 1rem;
                    margin:0 auto;
                }
            }
            .tipBox {
                background: #fff;
                padding:0.1rem 0.3rem 0.3rem;
                line-height: 0.50rem;
                h4{
                    font-size: 0.28rem;
                    color: #333;
                }
                p{
                    color: #999;
                    font-size: 0.24rem;
                }
            }
            .exchangeBtn{
                width:6.3rem;
                height:0.88rem;
                background: #fb919e;
                color: #fff;
                line-height: 0.88rem;
                text-align: center;
                margin:0 auto;
                font-size: 0.33rem;
                border-radius: 0.05rem;
            }
        }
    }
</style>
<script>
  import loading from '../../components/loading'
  import heading from '../../components/heading.vue'

  export default {
    mounted () {
      this.id = this.$route.query.id
      this.init()
    },
    data () {
      return {
        id:"",
        data:{},
        rule:"",
        redeem_content: '',
        tipsType: '',
        exchange_condition: '',
        redeem_code: '',
        loading: false,
        name: '流量兑换记录',
        effective_Date: '流量兑换记录',
        cardCode:[],
          short_url:''
      }
    },
    methods: {
      // choiceTipsType(num){ // 查询提示类型
      //   if (num ==3){
      //     this.tipsType = 'tengxun'
      //   }else if (num ==2){
      //     this.tipsType = 'youku'
      //   }else if (num ==1){
      //     this.tipsType = 'aiqiyi'
      //   }
      // },
      // init () {
      //   let that = this
      //   that.loading = true
      //   that.$http.get('/api/icbc/flow/consume/record/detail/'+that.$route.query.order_id, {
      //   }).then(function (res) {
      //     let list = res.data;
      //     that.loading = false
      //     console.log('---------/api/icbc/order/list----------')
      //     //请求成功
      //     if (res.data.status == 0) {
      //       //关闭loading
      //       that.loading = false
      //       //当总条为0时
      //      that.redeem_content = res.data.data.redeem_content;
      //      that.exchange_condition = res.data.data.exchange_condition;
      //      that.redeem_code = res.data.data.redeem_code;
      //      that.effective_Date = res.data.data.effective_Date.substring(0,10);
      //      that.choiceTipsType(res.data.data.goods_type)
      //     } else {
      //       Toast(res.data.message)
      //     }
      //   }, function (res) {
      //     that.isLoading = false
      //     Toast(res.data.message)
      //   })
      // },
      init(){
        this.isLoading = true
        this.$http.get('/api/stable/card/flow/order/item',{params:{id:this.id}}).then((res)=>{
            this.data = res['data']['data']
            this.rule =res['data']['data']['card_content']
            if (this.data.code_url){
                this.short_url  = this.data.code_url
            }
            this.cardCode = this.data.code?this.data.code.split(','):[]
            this.isLoading = false
        })
      },
    },
    components: {
      loading,
      heading
    },
  }
</script>

