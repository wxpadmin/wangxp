<template>
    <div class="wrap">
        <heading :name="name" v-if="!isWeiXin()"></heading>
        <div class="bg">
            <div class="content">
                <p class="p1">活动规则</p>
                <p>1.活动时间：2018年6月11日-7月16日</p>
                <p>2.球队粉丝组团客户登录我行工银e生活APP，进入爱享流量平台，选择支持的球队（每个注册用户仅能选择一个球队），组成球队粉丝团。</p>
                <p>3.流量开金球宝箱客户每天可免费开启2次金球宝箱，每次可获得1-50个金球值，后续每10M爱享流量值开启1次。同时，用户可通过在爱享流量分享流量红包，每领取1人可获赠1次免费次数。</p>
                <p>4.金球榜奖励</p>
                <p>发奖说明：以赛程阶段结束后下一个工作日中午12点的排名数据进行发奖，节假日顺延。赛程阶段及奖励详见下文</p>
                <p>小组赛阶段：对金球值排行榜前10名的球队粉丝团进行奖励，其中，个人排行榜前100名可获得1G全国流量包（爱享流量1G流量直充满47.5元立减47.5元券）；其他用户可获赠面额5-30元爱享流量帐户充值优惠券1张（满减券）。 </p>
                <p>1/8淘汰赛阶段：对晋级8强的球队粉丝团进行奖励，其中，个人排行榜前100名可获得1G全国流量包（爱享流量1G流量直充满47.5元立减47.5元券）；其他用户可获赠面额5-30元爱享流量帐户充值优惠券1张（满减券）。</p>
                <p>1/4淘汰赛阶段：对晋级4强的球队粉丝团进行奖励，其中，个人排行榜前100名，可获得1G全国流量包（爱享流量1G流量直充满47.5元立减47.5元券）；其他用户可获赠面额5-30元爱享流量帐户充值优惠券1张（满减券）。</p>
                <p class="pstyle">半决赛阶段：对晋级半决赛的2支球队粉丝团进行奖励，其中，个人排行榜前100名可获得1G全国流量包（爱享流量1G流量直充满47.5元立减47.5元券）；其他用户可获赠面额5-30元爱享流量帐户充值优惠券1张（满减券）。</p>
                <img src="http://img02.ruwe.cn/group1/M00/02/E0/ChmdplsiU1aAGToLAAASnP8NWcQ282.png" alt="">
                <p class="pfloat">决赛阶段：对夺冠球队粉丝团进行奖励，其中，个人排行榜前100名，可获得3个1G全国流量包（爱享流量1G流量直充满47.5元立减47.5元券）；同时，冠军队粉丝团用户均分百万金额的礼券与百万爱享流量值的奖励。</p>
            </div>
        </div>
    </div>
</template>
<script>
    import heading from "../../components/heading.vue"
    export default {
        data () {
            return {
                ball : require('../../assets/images/worldcupimg/ball.png'),
                name : '活动说明'
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
        },
        components : {
            heading
        }
    }
</script>
<style lang="scss" scoped>
    .wrap{
        width: 100%;
        .bg{
            width: 100%;
            /*height:100%;*/
            background: url("http://img02.ruwe.cn/group1/M00/03/37/ChiijVsiVGyAdgFPAACnJMA_6v0969.png") no-repeat;
            background-size: 100% 100%;
            .content{
                padding-bottom: 1.5rem;
                padding-top: .74rem;
                width: 5.5rem;
                color: #fff;
                margin:0 auto;
                p{
                    margin-bottom: .24rem;
                    font-size: .18rem;
                }
                .p1{
                    margin-bottom: .4rem;
                }
                p:nth-of-type(1){
                    text-align: center;
                    font-size: .36rem;
                }
                img{
                    width: 1.57rem;
                    float: left;
                    margin-left: -1rem;
                }
                .pfloat{
                    margin-bottom: 0;
                    margin-top: -.5rem;
                }
                .pstyle{
                    margin-bottom: .74rem;
            }
            }
        }
    }


</style>
