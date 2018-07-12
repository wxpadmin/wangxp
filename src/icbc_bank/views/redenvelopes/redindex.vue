<template>
    <div class="red_index">
        <heading :name="'红包'"></heading>
        <img class="red_logo" src="../../assets/images/red/redsend.png">
        <router-link :to="{ name: 'redsend'}" class="detailed-list">
            <div class="send_btn">我要发红包</div>
        </router-link>

        <div class="tips">未领取的红包，24小时退还</div>
        <div class="footer">
            <div class="left">
                <router-link :to="{ name: 'redsendlist'}" class="detailed-list">
                    已发出红包
                </router-link>
            </div>
            <div class="center">
                |
            </div>
            <div class="right">
                <router-link :to="{ name: 'redreceivelist'}" class="detailed-list">
                    已获得红包
                </router-link>
            </div>

        </div>
        <loading v-show="loading"></loading>
    </div>
</template>
<script>
    import loading from '../../components/loading.vue'
    import heading from '../../components/heading.vue'
    export default {
        mounted(){

        },
        data (){
            return {
               loading:false,
               score:0,
               phone_number:''
            }
        },
        components:{
            loading,
            heading
        },
        methods:{
            getUseInfo(){
               this.loading = true
               this.$http.get('/api/icbc/user/info')
               .then(function (res) {
                 this.loading = false
                 console.log('---------user/info---------')
                  if (res.data.status == 0) {
                     this.score = res.data.data.score
                     this.phone_number = res.data.data.phone_number
                  }
               }.bind(this))
               .catch(function (err) {
                   this.loading = false
               }.bind(this))
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../../assets/css/common';
    .red_index{
        position:relative;
        .red_logo{
            height: 2.34rem;
            position:relative;
            margin: 0.7rem auto;
        }
        .send_btn{
            height: 0.88rem;
            line-height: 0.88rem;
            text-align: center;
            font-size: 0.36rem;
            color: #ffffff;
            background: $color-red;
            width: 84%;
            margin: 0px auto;
            border-radius: 3px;
        }
        .tips{
            font-size: 0.28rem;
            color: #999999;
            text-align: center;
            margin-top: 0.4rem;
        }
        .footer{
            font-size: 0.3rem;


            display: flex;
            position:absolute;
            bottom:0.5rem;
            width:100%;
            .detailed-list{
                color: #445893;
            }
            .left{
                flex: 1;
                text-align: right;
            }
            .center{
                margin:0px 0.22rem;
                color: #445893;
            }
            .right{
                flex: 1;
                text-align: left;
            }
        }

    }
</style>
