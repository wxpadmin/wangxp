<template>
    <div class="wrap">
        <pop-up-double
                :title="title"
                :content="content"
                :close-text="closeText"
                :sure-text="sureText"
                :showpopup="showpopup"
                @close-btn="closeBtn"
                @popup-show="popupShow"
                @sure-btn="showBtn"
        >
            <div class="noamend" v-if="pstatus">
                确认后将不可更改
            </div>
        </pop-up-double>
        <pop-up-single
            :title1="title1"
            :content1="content1"
            :sure-text1="sureText1"
            :showpopupsingle="showpopupsingle"
            @popup-show-single="popshowSingle"
            @sure-btn-single="surebtnSingle"
        ></pop-up-single>
        <heading :name="name" v-if="!isWeiXin()"></heading>
        <div class="content">
            <div class="nochoose" v-if="nochoose">
                <img src="http://img02.ruwe.cn/group1/M00/03/36/ChiijVsaPLqAB_rIAAAJVemB9FU494.png" alt="">
                <p>我支持的球队：</p>
                <div class="greychoose">未加入</div>
            </div>
            <div class="header" v-else>
                <img src="http://img02.ruwe.cn/group1/M00/03/36/ChiijVsaPLqAB_rIAAAJVemB9FU494.png" alt="">
                <p>我支持的球队：</p>
                <img :src="user_support_team.icon" alt="" @click="goOpenbox">
                <p>{{user_support_team.name}}</p>
            </div>
<!--            <div class="middle">
                <p>支持球队</p>
                <p class="left_1" style="padding-left: .6rem">金球数</p>
                <p  style="padding-left: .3rem">排名</p>
                <p>参加活动</p>
            </div>-->
            <ul class="countryList">
                <li v-for="(item,index) in teamList">
                    <p class="teamNum">{{index + 1}}.</p>
                    <div class="teamWrap">
                        <div class="widthCommon imgP">
                            <img :src="item.icon" alt="">
                            <p class="pstyle">{{item.name}}</p>
                        </div>
                        <p class="widthCommon left_1">{{item.glod_boll_val ? item.glod_boll_val : 0}}金球</p>
                        <p class="widthCommon">{{item.grade == 1 ? '冠军' : (item.grade == 0 ?  ' ' : item.grade+ '强')}}</p>
                        <div class="widthCommon">
                            <div class="commonbtncss" :class="item.status ==1 ? 'greybtn' : 'redbtn'" @click="choose(item)">{{chooseTeam(item.id,item.status)}}</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import heading from '../../components/heading.vue'
    import popUpDouble from '../../components/popUpDouble.vue'
    import popUpSingle from '../../components/popUpSingle.vue'
    export default {
        mounted () {
          this.getList()
        },
        data () {
            return{
                name : '球队金球排行榜',
                nochoose : false, //true为未选择球队，false为已选择球队
                teamList : [],  // 球队列表
                user_support_team : {},  // 我支持的球队
                text : '',
                title : '温馨提示',
                title1 : '温馨提示',
                content :'',
                content1 : '',
                closeText : '关闭',
                sureText : '确认',
                sureText1 : '知道了',
                showpopup : false,
                pstatus : false,
                showpopupsingle : false,
                id : ''
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
            choose (item) {
                if (JSON.stringify(this.user_support_team) == '{}') { // 未选择球队
                    if (item.status == 0) {
                        this.content = `您确认支持${item.name}队么？`
                        this.showpopup = true
                        this.pstatus = true
                        this.id = item.id
                    }else {
                        return
                    }
                }else {//已选择球队
                    if (this.user_support_team.ball_team_id == item.id) {//点击的为自己选择的球队，跳转进入支持
                        this.$router.push({name : 'openbox',query : {team_id : this.user_support_team.ball_team_id}})
                    }else if (item.status == 0){
                        this.content1 = '每个用户只能选择一个球队'
                        this.showpopupsingle = true
                    }else {
                        return
                    }
                }
            },
            getList () {
                this.$axios.get("/api/worldcup/team/list",{},(res)=>{
                    this.teamList = res.teams
                    this.user_support_team = res.user_support_team
                    if (JSON.stringify(this.user_support_team )== "{}") {
                        this.nochoose = true
                    }else {
                        this.nochoose = false
                    }
                })
            },
            chooseTeam (id,status) {
                if (JSON.stringify(this.user_support_team )== "{}") {
                    if (status == 1) {
                        return this.text = '淘汰'
                    }else {
                        return this.text = '+加入'
                    }
                }else {
                    if (id == this.user_support_team.ball_team_id){
                        return this.text = '进入支持'
                    }
                    if (status == 1) {
                        return this.text = '淘汰'
                    }else {
                        return this.text = '+加入'
                    }
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
            showBtn () {
                 this.$axios.post("/api/worldcup/option/team",{team_id :this.id},(res)=>{
                     this.showpopup = false
                     this.getList()
                 },(err)=>{
                     this.showpopup = false
                 })
            },
            goOpenbox () {
                this.$router.push({name : 'openbox',query : {team_id : this.user_support_team.ball_team_id}})
            }
        },
        components : {
            heading,
            popUpDouble,
            popUpSingle
        }
    }
</script>
<style lang="scss" scoped>
    .wrap{
        width: 100%;
        background-color: #fff;
        .noamend{
            font-size: .28rem;
            color: #333333;
            letter-spacing: 0;
            line-height: .3rem;
            margin-top: .2rem;
            text-align: center;
        }
        .content{
            width: 100%;
            background-color: #fff;
            padding: .3rem .3rem 0;
            box-sizing: border-box;
            .greychoose{
                width: 1.16rem;
                height:.46rem;
                background: #DDDDDD;
                text-align: center;
                line-height: .46rem;
                color: #FFFFFF ;
                font-size: .25rem;
            }
            .header,.nochoose{
                height:1.32rem;
                display: flex;
                align-items: center;
                padding-bottom: .3rem;
                border-bottom: 1px solid #EEEEEE;
                box-sizing: content-box;
                p:nth-of-type(1){
                    font-size: .3rem;
                    color: #333333;
                    letter-spacing: 0;
                }
                p:nth-of-type(2){
                    font-size: .26rem;
                    color: #333333;
                    letter-spacing: 0;
                }
                img:nth-of-type(1){
                     margin-right: .22rem;
                     margin-left: .37rem;
                 }
                img:nth-of-type(2){
                    width: .84rem;
                    height:.56rem;
                    margin-right: .3rem;
                    margin-left: .38rem;
                }
            }
            /*.middle{
                width: 100%;
                height:.7rem;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #EEEEEE;
                padding-left: .55rem;
                justify-content: space-around;
                p{
                    width: 25%;
                    text-align: center;
                    font-size: .3rem;
                    color: #333333;
                    letter-spacing: 0;
                }
            }*/
            .left_1{
                width: 15%;
            }
            .countryList{
                background-color: #fff;
                li{
                    height:1.06rem;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid #EEEEEE;
                    justify-content: space-around;
                    .teamNum{
                        width: .55rem;
                    }
                    .widthCommon{
                        width: 25%;
                        text-align: center;
                    }
                    .teamWrap{
                        width: 100%;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                    }
                    .imgP{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 35%;
                        img{
                            width: .62rem;
                        }
                        .pstyle{
                            width: 65%;
                        }
                    }
                    .commonbtncss{
                        width: 1.16rem;
                        height:.46rem;
                        text-align: center;
                        line-height: .46rem;
                        border-radius: 5px;
                        font-size: .24rem;
                        color: #FFFFFF;
                        letter-spacing: 0;
                        margin:0 auto;
                    }
                    .redbtn{
                        background: #E42F46;
                    }
                    .greybtn{
                        background: #DDDDDD;
                    }
                    p{
                        font-size: .24rem;
                        color: #333333;
                        letter-spacing: 0;
                    }
                    img{
                        width: .62rem;
                        height:.42rem;
                    }
                }

            }
        }
    }
</style>
