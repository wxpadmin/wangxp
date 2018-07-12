<template>
    <div class="red_open">
        <heading :name="'工行红包'"></heading>
        <div class="con">
            <!--<p class="close"></p>-->
            <img class="head" :src="head_img_url?head_img_url:red_img_logo">
            <div class="red_title">来自{{objData |filter_real_name}}的流量红包</div>
            <div class="red_text">{{blessing}}</div>
            <div class="open" @click="open"></div>
        </div>
        <loading v-show="loading"></loading>
    </div>
</template>
<script>
    import loading from '../../components/loading.vue';
    import heading from '../../components/heading.vue';
    export default {
        mounted(){
            this.id = this.$route.query.id
            console.log(this.id)
            this.getRedInfo()

        },
        data (){
            return {
                id:'',
                loading:false,
                blessing:'',
                red_img_logo: require('../../assets/images/head_logo.png'),
                head_img_url:'',
                objData:{}
            }
        },
        components:{
            loading,
            heading
        },
        methods:{
            open(){
                this.$router.push({ path: 'redreceive', query: {
                    id:this.id,
                }})
            },
            getRedInfo(){
               this.loading = true
               this.$http.get('/api/icbc/redpacket/get',{
                   params: {
                        id: this.id
                   }
               })
               .then(function (res) {
                 this.loading = false
                 console.log('---------/api/icbc/redpacket/get---------')
                  if (res.data.status == 0) {
                      this.objData = res.data.data
                      this.phone_number = res.data.data.my_phone_number
                      this.blessing = res.data.data.blessing
                      this.head_img_url =  res.data.data.head_img_url
                      if(res.data.data.my_receive && this.phone_number){
                         this.$router.push({ path: 'redreceive', query: {
                             id:this.id
                         }})
                      }else{
                          setTimeout(() =>{
                              this.init()
                          },300)
                      }
                  }
               }.bind(this))
               .catch(function (err) {
                   this.loading = false
               }.bind(this))
            },
            init(){
                let _this = this
                var option =  {
                    title: '工行爱享生活，红包能拆出流量？能，快来拆', // 分享标题 主标题:工行爱享生活，红包能拆出流量？能，快来拆
                    desc: _this.blessing, // 分享描述  副标题: 恭喜发财
                    link: location.protocol + "//"+location.host+'/api/icbc/redirect?redirect_url='+encodeURIComponent('/icbc_bank/index.html#/redopen?id='+_this.id),
                    imgUrl: 'http://img.ruwe.cn/group1/M00/01/66/ChmdpllxZeOAO1mkAAAkqTYMnEI691.jpg', // 分享图标
                    success: function () {// 用户确认分享后执行的回调函数
                        //alert('分享成功')
                    },
                    cancel: function () {// 用户取消分享后执行的回调函
                        //alert('分享失败')
                    }
                };
                var option2 =  {
                    title: '工行爱享生活，红包能拆出流量？能，快来拆', // 分享标题 主标题:工行爱享生活，红包能拆出流量？能，快来拆
                    desc:  _this.blessing, // 分享描述  副标题: 恭喜发财
                    link: location.protocol + "//"+location.host+'/api/icbc/redirect?redirect_url='+encodeURIComponent('/icbc_bank/index.html#/redopen?id='+_this.id),
                    imgUrl: "http://img.ruwe.cn/group1/M00/01/66/ChmdpllxZeOAO1mkAAAkqTYMnEI691.jpg", // 分享图标
                    success: function () {// 用户确认分享后执行的回调函数
                        //alert('分享成功')

                    },
                    cancel: function () {// 用户取消分享后执行的回调函
                        //alert('分享失败')
                    }
                };
                if(wx.index_init_status){
                    wx.onMenuShareTimeline(option);
                    wx.onMenuShareAppMessage(option2);
                }else{
                    wx.ready(function(){
                        setTimeout(function () {
                            wx.onMenuShareTimeline(option);
                            wx.onMenuShareAppMessage(option2);
                        },300);
                    })

                }
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .red_open{
        background-image: url('../../assets/images/red/red_bg.jpg') ;
        background-size: 100% 100%;
        min-height: 10rem;
        .con{
            margin: 1.28rem auto;
            width: 77.6%;
            height: 8.8rem;
            background-image: url('../../assets/images/red/red_open_bg.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            position:relative;
            border-radius: 0.15rem;
            overflow:hidden;
            .close{
                position:absolute;
                width: 0.23rem;
                height: 0.23rem;
                top:0.3rem;
                right: 0.3rem;
                background: url("../../assets/images/red/bg-close-btn.png")no-repeat;
                background-size: 100% 100%;
            }
            .head{
                width: 1rem;
                height: 1rem;
                position:absolute;
                top:0.75rem;
                left:50%;
                margin-left: -0.5rem;
                border-radius: 3px;
            }
            .red_title{
                width: 85%;
                margin-top: 2.5rem;
                font-size: 0.36rem;
                color: #ffe2b0;
                text-align: center;
                margin: 2.5rem auto 0;
            }
            .red_text{
                font-size: 0.26rem;
                color: #ffe2b0;
                text-align: center;
                padding: 0px 0.5rem;
                margin-top: 0.4rem;
            }
            .open{
                height: 2rem;
                width: 2rem;
                position: absolute;
                bottom:1.9rem;
                left:50%;
                margin-left: -1rem;
                background-image: url('../../assets/images/red/red_open_s.png');
                background-size: 100% 100%;
                animation: scale 4s infinite;
                @keyframes scale {
                    0% {
                        transform: scale(1,1);
                        background-image: url('../../assets/images/red/red_open_s.png');
                    }
                    50% {
                        transform: scale(1.1,1.1);
                        background-image: url('../../assets/images/red/red_open_b.png');
                    }
                    100% {
                        transform: scale(1,1);
                        background-image: url('../../assets/images/red/red_open_s.png');
                    }
                }
            }

        }

    }
</style>
