<template>
    <div class="wrap">
        <h1>有折礼券使用说明</h1>
        <h3 class="buy">购买礼券</h3>
        <div>
            <p>1.礼券购买可以使用有折进行购买，具体以购买支付页面为准。</p>
            <p>2.礼券购买成功后，可以在有折礼券商城点击我的礼券进行查看并使用，也可以在个人中心点击我的礼券进行查看并使用。</p>
            <!-- <p>3.购买成功的礼券，<span>获取前，可将此礼券转赠给微信好友。</span></p> -->
        </div>
        <!-- <h3 class="give">转赠</h3>
        <div class="p-wrap">
            <p>1.购买成功的礼券，可以进行转赠给微信好友。</p>
            <p>2.好友领取成功后，可继续转赠或直接获取使用。</p>
            <p>3.转赠的礼券在24小时内好友未领取，自动退回我的礼券中。</p>
        </div> -->
        <h3 class="reveice">获取</h3>
        <div class="p-reveice">
            <p>1.购买成功的礼券，可以进行获取，获取成功后，券码或券密会展示出来，您可凭借此券码或券密到相关网站或商家进行使用，具体使用流程请查看礼券的使用介绍。</p>
            <!-- <p>2.礼券一旦“获取”，则只能自己使用，不能再进行转赠。</p> -->
            <p>2.礼券一旦“获取”，则只能自己使用。</p>
        </div>
        <p class="rules">如发现客户有恶意作弊等行为，微众有折有权处理客户账户内的礼券并取消相关活动资格，最终解释权归微众有折所有。</p>
    </div>
</template>
<script>
    export default {
        beforeRouteEnter (to, from, next) {
            window.scrollTo(0,0)
            next()
        },
        mounted () {
            document.title = '使用说明'
        }
    }
</script>
<style lang="scss" scoped>
    .wrap{
        width: 100%;
        padding: 0.55rem 0.3rem 0;
        background-color: #fff;
        h1{
            font-size: 0.48rem;
            color: #272727;
        }
        h3{
            font-size: 0.26rem;
            background-color: #fe747e;
            color: #fff;
            text-align: center;

        }
        .buy{
            margin: 0.6rem 0 0.16rem;
            width: 1.28rem;
            height:0.42rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        p{
            font-size: 0.22rem;
            color: #000;
            margin-bottom: 0.17rem;
            line-height: 0.4rem;
            span{
                color: #000;
                font-size: 0.26rem;
                font-weight: bold;
            }
        }
        .give{
            margin-top:0.6rem;
            width: 0.8rem;
            height:0.43rem;
            z-index: 1;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .p-wrap{
            background-color: #fff3ea;
            margin-top: -0.21rem;
            padding: 0.35rem 0.4rem 0.2rem;
            margin-bottom: 0.4rem;
        }
        .reveice{
            width: 0.8rem;
            height:0.43rem;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1;
            position: relative;
        }
        .p-reveice{
            background-color: #fff3ea;
            margin-top: -0.21rem;
            padding: 0.35rem 0.4rem 0.2rem;
            margin-bottom: 0.6rem;
        }
        .rules{
            padding: 0 0.4rem;
            color: #777;
        }
    }
</style>
