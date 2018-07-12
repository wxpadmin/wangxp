<template>
    <div class="wrap">
        <heading :name="name" v-if="!isWeiXin()"></heading>
        <div class="bg">
            <img id="bg" src="https://img02.ruwe.cn/group1/M00/03/37/ChiijVsiUqiAGfAMAAG8Kos8WN8416.png" alt="" onclick="return false">
            <img src="http://img02.ruwe.cn/group1/M00/02/E0/ChmdplsaO9CASWDGAAAOfQehlAc062.png" alt="" @click="participationBtn">
            <img src="http://img02.ruwe.cn/group1/M00/02/E0/ChmdplsaPNyAKNSoAAAOX1tbMYY182.png" alt=""  @click="activeInstructions">
            <img src="http://img02.ruwe.cn/group1/M00/03/36/ChiijVsaPPeAMVShAAAP4wN9wrY130.png" alt="" @click="winningRecord">
        </div>

        <pop-up-single
            :title1="title1"
            :content1="content1"
            :sure-text1="sureText1"
            :showpopupsingle="showpopupsingle"
            @popup-show-single="popshowSingle"
            @sure-btn-single="surebtnSingle"
        ></pop-up-single>
    </div>
</template>
<script>
    import heading from "../../components/heading.vue"
    import popUpSingle from "../../components/popUpSingle.vue"
    export default {
        mounted () {
            this.getInfo()
        },
        data () {
            return {
                name : '爱享世界杯',
                title1 : '温馨提示',
                content1 : '活动已结束，感谢您的关注',
                sureText1 : '知道了',
                showpopupsingle : false,
                timeout : false,  // 判断活动是否结束
                isphone : '', // 判断用户是否已绑定手机号
                routeid : ''
            }
        },
        methods : {

            isWeiXin () {
                var ua = window.navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    return true;
                } else {
                    return false;
                }
            },
            getInfo () {
                this.$axios.get('/api/worldcup/lottery/endTime',{},(res)=>{
                    window.localStorage.setItem('score',res['score'])
                    this.isphone = res['phone_number']
                },(err)=>{
                    this.timeout = true
                })
            },
            activeInstructions () {
                this.$router.push({name : 'activeinstructions'})
            },
            participationBtn (){
                if (this.isphone) {
                    if (this.timeout) {
                        this.showpopupsingle = true
                        return
                    }
                    this.$router.push({name : 'teamlist'})
                }else {
                    this.$router.push({name : 'login'})
                }
            },
            winningRecord () {
                this.$router.push({name : 'winningrecord'})
            },
            popshowSingle () {
                this.showpopupsingle = false
            },
            surebtnSingle () {
                this.showpopupsingle = false
            }
        },
        components : {
            heading,
            popUpSingle
        },
    }
</script>
<style lang="scss" scoped>
    .wrap {
        width: 100%;
        .bg{
            width: 100%;
            height:100%;
            position: relative;
            img{
                width: 100%;
                height:100%;
            }
            img:nth-of-type(2){
                width: 2.32rem;
                height:.7rem;
                position: absolute;
                top:3.97rem;
                left:0;
                right:0;
                margin:0 auto;
            }
            img:nth-of-type(3){
                width: 2.32rem;
                height:.7rem;
                position: absolute;
                top:5.01rem;
                left:0;
                right:0;
                margin:0 auto;
            }
            img:nth-of-type(4){
                width: 2.32rem;
                height:.7rem;
                position: absolute;
                top:6.05rem;
                left:0;
                right:0;
                margin:0 auto;
            }
        }
    }
</style>
