<template>
    <div class="wrap">
        <heading :name="name" v-if="!isWeiXin()"></heading>
        <div class="bg">
            <img src="https://img02.ruwe.cn/group1/M00/03/37/ChiijVsiUqiAGfAMAAG8Kos8WN8416.png" alt="" onclick="return false">
            <img src="http://img02.ruwe.cn/group1/M00/02/E0/ChmdplsaPGSAfCTQAAARKBbAHfI895.png" alt="" @click="singnin" onclick="return false">
            <img src="http://img02.ruwe.cn/group1/M00/02/E0/Chmdplsd1L2AXxI2AAAVnRucUSc252.png" alt="" @click="goSd" onclick="return false">
        </div>
        <pop-up-double
            :title="title"
            :content="content"
            :close-text="closeText"
            :sure-text="sureText"
            :showpopup="showpopup"
            @close-btn="closeBtn"
            @popup-show="popupShow"
            @sure-btn="showBtn"
        ></pop-up-double>
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
    import popUpSingle from '../../components/popUpSingle.vue'
    import popUpDouble from '../../components/popUpDouble.vue'
    import heading from '../../components/heading.vue'
    export default {
        mounted () {
            this.init()
        },
        data () {
            return {
                title : '签到成功',
                content : '您获得1次免费开金球宝箱的机会',
                closeText : '关闭',
                sureText : '支持球队开宝箱',
                name : '爱享世界杯签到',
                showpopup : false,
                title1 : '温馨提示',
                content1 : '今日已签过到了',
                sureText1 : '知道了',
                showpopupsingle : false,
                team_id : '',
                routerLink : '',
                isphone : '',
                timeout : false
            }
        },
        methods : {
            goSd () {
                if (this.isphone) {
                    this.$axios.get('/api/worldcup/other/redirect',{},(res)=>{
                        window.location.href = 'http://sd.auto1768.com:8205/ShengDaJQSJB/jqsjb/index.jhtm?phone_number='+ res.phone_number
                    },(err)=>{
                        //弹窗加入球队
                        if (err.status == -1) {
                            this.showpopup = true
                            this.title = '温馨提示',
                                this.content = err.message,
                                this.closeText = '关闭',
                                this.sureText = '支持球队开宝箱'
                            this.routerLink = 'teamlist'
                        }else {//绑定手机号
                            this.showpopupsingle = true
                            this.title1 = '温馨提示'
                            this.content1 = err.message
                            this.sureText1 = '知道了'
                        }
                    })
                }else {
                    this.$router.push({name : 'login'})
                }
            },
            isWeiXin () {
                var ua = window.navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    return true;
                } else {
                    return false;
                }
            },
            init () {
                this.$axios.get('/api/worldcup/lottery/endTime',{},(res)=>{
                    this.isphone = res['phone_number']
                },(err)=>{
                    this.timeout = true
                })
            },
            singnin () {
                if (this.isphone) {
                    if (this.timeout) {
                        this.showpopupsingle = true
                        this.title1 = '温馨提示'
                        this.content1 = '活动已结束，感谢您的关注'
                        this.sureText1 = '知道了'
                        return
                    }
                    this.$axios.get("/api/worldcup/user/sign",{},(res)=>{
                        this.showpopup = true
                        this.title = '签到成功',
                        this.content = '您获得1次免费开金球宝箱的机会',
                        this.closeText = '关闭',
                        this.sureText = '支持球队开宝箱'
                        if (res.team_id) {
                            this.routerLink = 'openbox'
                            this.team_id = res.team_id
                        }else {
                            this.routerLink = 'teamlist'
                        }
                    },()=>{
                        this.showpopupsingle = true
                        this.title1 = '温馨提示'
                        this.content1 = '今日已签过到了'
                        this.sureText1 = '知道了'
                    })
                }else {
                    this.$router.push({name : 'login'})
                }
            },
            closeBtn () {
                this.showpopup = false
            },
            popupShow () {
                this.showpopup = false
            },
            popshowSingle () {
                this.showpopupsingle = false
            },
            surebtnSingle () {
                this.showpopupsingle = false
            },
            showBtn () { // 支持球队开宝箱
                if (this.team_id) {
                    this.$router.push({name : this.routerLink,query:{team_id : this.team_id}})
                }else {
                    this.$router.push({name : this.routerLink})
                }
            }
        },
        components : {
            popUpDouble,
            popUpSingle,
            heading
        }
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
                width: 3.22rem;
                height:.7rem;
                position: absolute;
                top:4.05rem;
                left:0;
                right:0;
                margin:0 auto;
            }
            img:nth-of-type(3){
                width: 3.22rem;
                height:.7rem;
                position: absolute;
                top:5.11rem;
                left:0;
                right:0;
                margin:0 auto;
            }
        }
    }
</style>
