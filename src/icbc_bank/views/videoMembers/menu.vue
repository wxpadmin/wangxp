<template>
    <div>
        <heading :name="name"></heading>
        <!--首页-->
        <div class="menuModule">
            <div class="recordBox">
                <router-link to="/vmRecordList">流量兑换记录</router-link>
            </div>
            <span v-for = "item in typeList" v-if = "item.iconUrl">
                <router-link :to="{path: '/cardList', query: {id:item.id,title:item.name}}">
                    <div class="exchangeBtn">
                        <img :src="item.iconUrl">
                        <div class="word-box">
                           <p>{{item.name}}</p>
                           <span>{{item.categoryDesc}}</span> 
                        </div>
                    </div>
                </router-link>
            </span>
        </div>
        <loading v-show="loading"></loading>
    </div>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../assets/css/common";
    .menuModule{
        width:100%;
        .recordBox{
            width:100%;
            height:0.8rem;
            line-height: 0.8rem;
            display: flex;
            justify-content:flex-end;
            a{
                display: block;
                font-size: 0.28rem;
                color: #e42f46;
                padding:0 0.32rem;
            }
        }
        .exchangeBtn{
            width:100%;
            height:3rem;
            // background: url("../../assets/images/videoMembers/rukou@2x.jpg")no-repeat;
            // background-size: 100% 100%;
            color: #fff;
            text-align: center;
            margin-bottom: .3rem;
            img{
                height:3rem;
            }
            .word-box{
                margin-top: -3rem;
            }
            p{
                line-height: 0.55rem;
                font-size: 0.55rem;
                padding:0.93rem 0 0.3rem;
            }
            span{
                display: block;
                font-size: 0.3rem;
            }
        }

    }

</style>
<script>
  import loading from '../../components/loading'
  import heading from '../../components/heading.vue'
  import {InfiniteScroll, Spinner, Toast} from 'mint-ui';
  import '../../assets/js/jquery-2.1.1.min.js'

  // var typeListJson = require("../../assets/typeList.json")
  export default {
    mounted () {
       this.score = this.$route.query.score
       this.getTypeList()

       // if(this.$route.query.phone_number){
       //    this.phone_number = this.$route.query.phone_number.replace(/(\d{3})(\d{4})(\d{4})/,'$1 $2 $3')
       // }else{
       //    this.phone_number = localStorage.getItem('phone_number').replace(/(\d{3})(\d{4})(\d{4})/,'$1 $2 $3')
       // }
    },
    data () {
      return {
        loading:false,
        name:'流量换好礼',
        typeList:[],
        // typeListJson:typeListJson,
        order:{},
        category_id:"cc6563eb-9a4e-424e-a70b-1750b815f556"
      }
    },
    methods: {
        getTypeList(){
              let params = {
                action:"flow",
                category_id:this.category_id,
                type:2
              }
              this.$http.get('/api/stable/cards/category/list',{params:params}).then((res)=>{
                    this.typeList = res['data']['data']
              })
        },
        // showChoice () {
        //     if(this.isCharge){
        //         this.alertmask = true
        //         this.packageSizeInfo = this.list_static[this.index].package
        //     }
        // },
        // charge (value){
        //     this.loading = true
        //     this.alertmask = false
        //     this.$http.post('/api/icbc/extract/recharge',{
        //        phone_number: this.phone_number.replace(/ /ig, ''),
        //        package_size: this.packageSizeInfo,
        //        belong_name: this.belong_name,
        //        area_name:this.area_name,
        //     }).then(function (res) {
        //         this.loading = false;
        //         console.log('---------/api/icbc/extract/recharge---------');
        //         if (res.data.status == 0) { //流量提取成功
        //             this.isSucc = true
        //             this.name='提交成功'
        //             this.iscanuse = false
        //             this.order =  res.data.data
        //             this.isTipbox = false
        //         }else if(res.data.status == 1){//流量提取失败
        //             Toast(res.data.message)
        //             this.iscanuse = true
        //         }
        //     }.bind(this))
        //     .catch(function (res) {
        //         this.loading = false
        //     }.bind(this))
        // }
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

