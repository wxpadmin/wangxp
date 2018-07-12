<template>
    <div class="wrap">
        <heading :name="name" v-if="!isWeiXin()"></heading>
        <ul v-if="dataList.length > 0">
                <li v-if="divide_equally">
                    <div class="head">
                        <p>使用场景：爱享流量-流量提取</p>
                        <p @click="goIndex">去查看 ></p>
                    </div>
                    <div class="content">
                        <p>{{data[0].score}}M爱享流量余额</p>
                        <p>获奖时间：{{data[0].create_time}}</p>
                    </div>
                </li>
                <li v-for="item in dataList" @click="goIcbcBank(item.coupon_scene)">
                    <div class="head">
                        <p>使用场景：爱享流量-{{item.coupon_scene | filter_coupon1}}</p>
                        <p>去查看 ></p>
                    </div>
                    <div class="content">
                        <p>{{item.coupon_name}}</p>
                        <p>有效期：{{item.use_start_time}}－{{item.use_end_time}}</p>
                        <p>获奖时间：{{item.create_time}}</p>
                    </div>
                </li>
        </ul>
        <div class="nomore" v-else >
            暂时没有记录！
        </div>
    </div>
</template>
<script>
    import heading from '../../components/heading.vue'
    export default {
        beforeRouteEnter (to, from, next) {
            window.scrollTo(0,0)
            next()
        },
        mounted () {
            this.getList()
        },
        data () {
            return {
                name : '获奖记录',
                nomore:false,
                divide_equally : false,
                data : '',
                dataList : []
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
            goIcbcBank (coupon_scene) {
                if (this.isWeiXin()) {
                    window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.icbc.elife'
                }else {
                    if (coupon_scene == 2) {
//                        window.location.href = location.protocol + "//"+location.host + '/icbc_bank/#/directRecharge'
                        this.$router.push({name : 'directRecharge'})
                    }else if (coupon_scene == 3) {
//                        window.location.href = location.protocol + "//"+location.host + "/icbc_bank/#/buyflowtest?score=" + window.localStorage.getItem('score')
                        this.$router.push({name : 'buyflowtest',query : {score : window.localStorage.getItem('score'),isbanner : true}})
                    }
                }
            },
            goIndex () {
                if (this.isWeiXin()) {
                    window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.icbc.elife'
                }else {
                    this.$router.push({name : 'index'})
                }
            },
            getList () {
                this.$axios.get('/api/worldcup/award/logs',{},(res)=>{
                    if (res[0].type == 9) {
                        this.divide_equally = true
                        this.data = res
                        this.dataList = res.slice(1)
                    }else{
                        this.divide_equally = false
                        this.dataList = res
                    }
                })
            }
        },
        components : {
            heading,
        }
    }
</script>
<style lang="scss" scoped>
    .wrap{
        width: 100%;
        .nomore{
            text-align: center;
            margin-top: 50%;
            color: #333;
            font-size: 0.3rem;
        }
        ul{
            height:100%;
            padding-top: .2rem;
            li{
                box-sizing: border-box;
                width: 100%;
                padding: 0 .3rem;
                background-color: #fff;
                margin-bottom: .3rem;
                .head{
                    height:.7rem;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #eee;
                    p:nth-of-type(1){
                        font-size: .24rem;
                        color: #333333;
                        letter-spacing: 0.02px;
                    }
                    p:nth-of-type(2){
                        font-size: .24rem;
                        color: #999999;
                        letter-spacing: -0.58px;
                    }
                }
                .content{
                    background-color: #fff;
                    padding: .17rem 0 .23rem 0;
                    p:nth-of-type(1){
                        font-size: .3rem;
                        color: #E42F46;
                        letter-spacing: 0.02px;
                    }
                    p:nth-of-type(2){
                        font-size: .22rem;
                        color: #666666;
                        letter-spacing: 0.02px;
                        margin-top: .14rem;
                        margin-bottom: .2rem;
                    }
                    p:nth-of-type(3){
                        font-size: .18rem;
                        color: #999999;
                        letter-spacing: 0.02px;
                    }
                }
            }
        }
    }
</style>
