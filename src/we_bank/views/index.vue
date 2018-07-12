<template>
    <div class="wrap">
        <ul>
            <router-link :to="{name: 'mycoupon'}">
                <li style="width: 100%;height: 3rem;background-color: #4caf50">2</li>
            </router-link>
            <li style="width: 100%;height: 3rem;background-color: #4caf50">1</li>
            <li style="width: 100%;height: 3rem;background-color: #4caf50">1</li>
            <li style="width: 100%;height: 3rem;background-color: #4caf50">1</li>
            <li style="width: 100%;height: 3rem;background-color: #4caf50">1</li>
            <li style="width: 100%;height: 3rem;background-color: #4caf50">1</li>
            <li style="width: 100%;height: 3rem;background-color: #4caf50">1</li>
            <router-link to="/mycoupon">
                <li style="width: 100%;height: 3rem;background-color: #4caf50">2</li>
            </router-link>
            <li style="width: 100%;height: 3rem;background-color: #4caf50">1</li>
        </ul>
        <div class="bot" style="width: 100%;height: 1rem;position: fixed;bottom: 0;background-color: red"></div>
    </div>
</template>
<script>
    export default {

    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .wrap {
        width: 100%;
        padding-top: 0.51rem;
        background-color: #fff;
        /*overflow-y: scroll;*/
        overflow:scroll;
        -webkit-overflow-scrolling:touch;
        .header {
            width: 100%;
            padding: 0 0rem 0 0.29rem;
            position: relative;
            .icon {
                width: 0.1rem;
                height: 0.3rem;
                background-color: #557bc7;
                margin-right: 0.2rem;
                display: inline-block;
                border-radius: 0.02rem;
            }
            p {
                display: inline-block;
                font-size: 0.38rem;
                color: #272727;
            }
            .astyle {
                width: 2.1rem;
                height: 0.56rem;
                color: #eda62c;
                font-size: 0.28rem;
                background-color: #fef9ee;
                border-radius: 0.28rem;
                margin-right: 0.2rem;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                span {
                    width: 0.13rem;
                    height: 0.24rem;
                    background-image: url("../assets/images/icon.png");
                    background-size: 100% 100%;
                    display:block;
                    margin-left: 0.2rem;
                }
            }
            .swiper-ul {
                padding: 0.5rem 0 0.4rem 0;
                width: 100%;
                height: 2.6rem;
            }
            .swiper {
                width: 2.95rem;
                border-radius: 0.1rem;
                padding: 0.3rem 0 0 0.2rem;
                p {
                    display: block;
                }
                img {
                    width: 0.6rem;
                    height: 0.6rem;
                    border-radius: 50%;
                    display: inline-block;
                }
                .vessel{
                    width: 2.95rem;
                    height:100%;
                    background-image: url("../assets/images/shade.png");
                    position: absolute;
                    top:0;
                    left:0;
                    border-radius: 0rem;
                }
                div {
                    display: inline-block;
                    width: 65%;
                    vertical-align: middle;
                    margin-left: 0.2rem;
                    p {
                        font-size: 0.3rem;
                        color: #fff;
                    }
                }
            }
            li:nth-of-type(3n+1) {
                background-image: linear-gradient(to right, #ffaa57, #fe5d76);
            }
            li:nth-of-type(3n+2) {
                background-image: linear-gradient(to right, #9c5bfe, #3990fe);
            }
            li:nth-of-type(3n) {
                background-image: linear-gradient(to right, #49c6b0, #86dc83);
            }
        }
        .gray-line {
            width: 100%;
            height: 0.2rem;
            background-color: #f7f7f7;
        }
        .nav-ul {
            padding: 0 0.3rem;
            margin: 0.36rem 0 0;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            li {
                font-size: 0.28rem;
                color: #c7c7c7;
                padding-bottom: 0.36rem;
                &.active {
                    color: #557bc7;
                    border-bottom: 3px solid #557bc7;
                }
            }
        }
        .products {
            width: 100%;
            //padding: 0 0.3rem;
            display: flex;
            flex-wrap: wrap;
            .pro-detail {
                width: 50%;
                height: 1.8rem;
                border-right: 1px solid #eee;
                border-bottom: 1px solid #eee;
                position: relative;
                overflow: hidden;
                .big_shade{
                    width: 100%;
                    height:100%;
                    position: absolute;
                    top:0;
                    left:0;
                }
                div {
                    width: 50%;
                }
                .fl {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    max-height: 0.9rem;
                    font-size: 0.26rem;
                    color: #272727;
                    font-weight: bold;
                    text-align: center;
                }
                p:nth-of-type(2) {
                    margin-top: 0.2rem;
                    color: #eda62c;
                }
                .img-right {
                    width: 100%;
                    height: 1.8rem;
                    img {
                        width: 100%;
                        height: 1.78rem;
                    }
                }
            }
        }
    }
</style>
